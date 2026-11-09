import { PricingError, priceOrder } from "@/lib/order-pricing";
import { chargeCard } from "@/lib/server/gateway";
import { createOrder, newOrderNumber, type OrderCustomer } from "@/lib/server/orders";
import type { CardPaymentRecord, CheckoutLine, PaymentMethod } from "@/lib/types";
import { STATE_CODES } from "@/lib/us-states";

/**
 * Places an order.
 *
 * Prices are recalculated from the live catalogue. Card orders are charged
 * through the gateway first. Every successful order is saved for the admin
 * panel, and the response gives the browser what the confirmation page needs.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface CheckoutRequest {
  paymentMethod: PaymentMethod;
  /** Collect.js payment token, card orders only. */
  token?: string;
  card?: { cardMasked?: string; cardType?: string };
  /** Total the customer saw, used to refuse an order if prices moved. */
  expectedTotal: number;
  lines: CheckoutLine[];
  customer: Partial<OrderCustomer>;
}

/** Trims and caps a value before it is stored or sent to the gateway. */
function clean(value: unknown, max = 100): string {
  return typeof value === "string" ? value.replace(/[\r\n]+/g, " ").trim().slice(0, max) : "";
}

function fail(status: number, message: string, extra: Record<string, unknown> = {}) {
  return Response.json({ ok: false, message, ...extra }, { status });
}

export async function POST(request: Request) {
  let body: CheckoutRequest;
  try {
    body = (await request.json()) as CheckoutRequest;
  } catch {
    return fail(400, "The order request was not readable.");
  }

  const paymentMethod = body.paymentMethod;
  if (paymentMethod !== "Credit or Debit Card" && paymentMethod !== "Cash on Delivery") {
    return fail(400, "Please choose a payment method.");
  }

  const c = body.customer ?? {};
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
    return fail(400, "Please check your contact and shipping details.");
  }

  let priced;
  try {
    priced = await priceOrder(Array.isArray(body.lines) ? body.lines : []);
  } catch (error) {
    if (error instanceof PricingError) return fail(400, error.message);
    throw error;
  }

  // Never charge or confirm an amount the customer did not see on screen.
  if (Math.abs(priced.total - Number(body.expectedTotal)) > 0.009) {
    return fail(
      409,
      `Your order total has been updated to $${priced.total.toFixed(2)}. Please review your cart and try again.`,
      { code: "TOTAL_CHANGED", total: priced.total },
    );
  }

  const orderNumber = newOrderNumber();

  let payment: CardPaymentRecord | undefined;
  if (paymentMethod === "Credit or Debit Card") {
    const token = clean(body.token, 200);
    if (!token) return fail(400, "The payment details are incomplete. Please re-enter your card.");

    const charge = await chargeCard({
      token,
      orderNumber,
      priced,
      customer,
      ip: clean(
        request.headers.get("x-nf-client-connection-ip") ??
          request.headers.get("x-forwarded-for")?.split(",")[0],
        45,
      ),
    });
    if (!charge.ok) return fail(charge.status, charge.message);

    payment = {
      transactionId: charge.transactionId,
      authCode: charge.authCode,
      cardMasked: clean(body.card?.cardMasked, 25),
      cardType: clean(body.card?.cardType, 20),
      amount: priced.total,
    };
  }

  try {
    await createOrder({ orderNumber, priced, customer, paymentMethod, payment });
  } catch (error) {
    // The customer may already have been charged, so never fail the request
    // here. The full order is written to the function log for recovery.
    console.error(
      `[checkout] order ${orderNumber} could not be saved`,
      error,
      JSON.stringify({ orderNumber, customer, paymentMethod, payment, priced }),
    );
    if (!payment) return fail(500, "We could not place your order. Please try again.");
  }

  return Response.json({
    ok: true,
    orderNumber,
    placedAt: new Date().toISOString(),
    subtotal: priced.subtotal,
    shipping: priced.shipping,
    total: priced.total,
    payment: payment ?? null,
  });
}
