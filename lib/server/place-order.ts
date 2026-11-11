import "server-only";

import { PricingError, priceOrder } from "@/lib/order-pricing";
import { chargeCard } from "@/lib/server/gateway";
import { createOrder, newOrderNumber, type OrderCustomer } from "@/lib/server/orders";
import type { CardPaymentRecord, CheckoutLine, OrderSource, PaymentMethod } from "@/lib/types";
import { STATE_CODES } from "@/lib/us-states";

/**
 * Places an order. Shared by the store checkout and the admin "New Order"
 * form so pricing, card charging and saving work the same way for both.
 *
 * Prices are recalculated from the live catalogue, card orders are charged
 * through the gateway first, and every successful order is saved.
 */

export interface PlaceOrderInput {
  paymentMethod: PaymentMethod;
  /** Collect.js payment token, card orders only. */
  token?: string;
  card?: { cardMasked?: string; cardType?: string };
  /** Total shown on screen. The order is refused if prices have moved. */
  expectedTotal: number;
  lines: CheckoutLine[];
  customer: Partial<OrderCustomer>;
  /** Client IP, passed to the gateway for fraud checks. */
  ip: string;
  source: OrderSource;
}

export type PlaceOrderResult =
  | {
      ok: true;
      orderNumber: string;
      placedAt: string;
      subtotal: number;
      shipping: number;
      total: number;
      payment: CardPaymentRecord | null;
    }
  | { ok: false; status: number; message: string; code?: string; total?: number };

/** Trims and caps a value before it is stored or sent to the gateway. */
function clean(value: unknown, max = 100): string {
  return typeof value === "string" ? value.replace(/[\r\n]+/g, " ").trim().slice(0, max) : "";
}

const fail = (status: number, message: string, extra: { code?: string; total?: number } = {}) =>
  ({ ok: false as const, status, message, ...extra });

export async function placeOrder(input: PlaceOrderInput): Promise<PlaceOrderResult> {
  const { paymentMethod } = input;
  if (paymentMethod !== "Credit or Debit Card" && paymentMethod !== "Cash on Delivery") {
    return fail(400, "Please choose a payment method.");
  }

  const c = input.customer ?? {};
  const customer: OrderCustomer = {
    fullName: clean(c.fullName, 80),
    email: clean(c.email, 120),
    phone: clean(c.phone, 30),
    altPhone: clean(c.altPhone, 30),
    street: clean(c.street, 100),
    apartment: clean(c.apartment, 100),
    city: clean(c.city, 60),
    state: clean(c.state, 40),
    zipCode: clean(c.zipCode, 10),
    notes: typeof c.notes === "string" ? c.notes.trim().slice(0, 1000) : "",
  };
  if (
    customer.fullName.length < 3 ||
    !customer.email.includes("@") ||
    !STATE_CODES[customer.state] ||
    !/^\d{5}(-\d{4})?$/.test(customer.zipCode) ||
    customer.street.length < 5 ||
    !customer.city
  ) {
    return fail(400, "Please check the contact and shipping details.");
  }

  let priced;
  try {
    priced = await priceOrder(Array.isArray(input.lines) ? input.lines : []);
  } catch (error) {
    if (error instanceof PricingError) return fail(400, error.message);
    throw error;
  }

  // Never charge or confirm an amount that was not shown on screen.
  if (Math.abs(priced.total - Number(input.expectedTotal)) > 0.009) {
    return fail(
      409,
      `The order total has been updated to $${priced.total.toFixed(2)}. Please review the items and try again.`,
      { code: "TOTAL_CHANGED", total: priced.total },
    );
  }

  const orderNumber = newOrderNumber();

  let payment: CardPaymentRecord | undefined;
  if (paymentMethod === "Credit or Debit Card") {
    const token = clean(input.token, 200);
    if (!token) return fail(400, "The payment details are incomplete. Please re-enter the card.");

    const charge = await chargeCard({ token, orderNumber, priced, customer, ip: clean(input.ip, 45) });
    if (!charge.ok) return fail(charge.status, charge.message);

    payment = {
      transactionId: charge.transactionId,
      authCode: charge.authCode,
      cardMasked: clean(input.card?.cardMasked, 25),
      cardType: clean(input.card?.cardType, 20),
      amount: priced.total,
    };
  }

  try {
    await createOrder({ orderNumber, priced, customer, paymentMethod, payment, source: input.source });
  } catch (error) {
    // The card may already have been charged, so a paid order never fails
    // here. The full order is written to the function log for recovery.
    console.error(
      `[order] ${orderNumber} could not be saved`,
      error,
      JSON.stringify({ orderNumber, customer, paymentMethod, payment, priced }),
    );
    if (!payment) return fail(500, "We could not place the order. Please try again.");
  }

  return {
    ok: true,
    orderNumber,
    placedAt: new Date().toISOString(),
    subtotal: priced.subtotal,
    shipping: priced.shipping,
    total: priced.total,
    payment: payment ?? null,
  };
}

/** Client IP as reported by Netlify, or the first forwarded address. */
export function clientIp(request: Request): string {
  return (
    request.headers.get("x-nf-client-connection-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0] ??
    ""
  ).trim();
}
