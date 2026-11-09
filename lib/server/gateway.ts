import "server-only";

import type { PricedOrder } from "@/lib/order-pricing";
import type { OrderCustomer } from "@/lib/server/orders";
import { STATE_CODES } from "@/lib/us-states";

/**
 * Card sales through the payment gateway (NMI compatible Direct Post API).
 * Only a single use Collect.js payment token is sent here, never card data.
 * SECRET_KEY stays on the server.
 */

export type ChargeResult =
  | { ok: true; transactionId: string; authCode: string }
  | { ok: false; status: number; message: string };

/** Customer facing text for gateway outcomes. Raw gateway text is only logged. */
function declineMessage(responseCode: string): string {
  if (/^20[0-4]$/.test(responseCode)) {
    return "Your card was declined. Please check the details or try a different card.";
  }
  if (/^22[0-5]$/.test(responseCode)) {
    return "The card details could not be verified. Please check the number, expiry date and security code.";
  }
  if (responseCode === "300") {
    return "The payment was rejected. Please try again, or choose Cash on Delivery.";
  }
  return "We could not complete the payment. Please try again or use a different card.";
}

export async function chargeCard(input: {
  token: string;
  orderNumber: string;
  priced: PricedOrder;
  customer: OrderCustomer;
  ip: string;
}): Promise<ChargeResult> {
  const securityKey = process.env.SECRET_KEY;
  const gatewayUrl = process.env.POST_URL;
  if (!securityKey || !gatewayUrl) {
    console.error("[checkout] SECRET_KEY or POST_URL is not configured");
    return {
      ok: false,
      status: 503,
      message: "Card payment is temporarily unavailable. Please choose Cash on Delivery.",
    };
  }

  const { token, orderNumber, priced, customer, ip } = input;
  const [firstName, ...rest] = customer.fullName.split(/\s+/);
  const lastName = rest.join(" ") || firstName;
  const state = STATE_CODES[customer.state] ?? "";

  const params = new URLSearchParams({
    security_key: securityKey,
    type: "sale",
    payment_token: token,
    amount: priced.total.toFixed(2),
    currency: "USD",
    orderid: orderNumber,
    order_description: `Xpectra Media order ${orderNumber}`,
    shipping: priced.shipping.toFixed(2),
    ipaddress: ip,
    first_name: firstName,
    last_name: lastName,
    address1: customer.street,
    address2: customer.apartment,
    city: customer.city,
    state,
    zip: customer.zipCode,
    country: "US",
    phone: customer.phone,
    email: customer.email,
    shipping_firstname: firstName,
    shipping_lastname: lastName,
    shipping_address1: customer.street,
    shipping_address2: customer.apartment,
    shipping_city: customer.city,
    shipping_state: state,
    shipping_zip: customer.zipCode,
    shipping_country: "US",
    shipping_email: customer.email,
  });

  // Line items give the merchant a readable record in the gateway portal.
  priced.lines.forEach((line, index) => {
    const n = index + 1;
    params.set(`item_product_code_${n}`, line.productId);
    params.set(`item_description_${n}`, `${line.name} (${line.size}, ${line.color})`.slice(0, 100));
    params.set(`item_quantity_${n}`, String(line.quantity));
    params.set(`item_unit_cost_${n}`, line.unitPrice.toFixed(2));
  });

  let result: URLSearchParams;
  try {
    const response = await fetch(gatewayUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
      signal: AbortSignal.timeout(25_000),
      cache: "no-store",
    });
    result = new URLSearchParams(await response.text());
  } catch (error) {
    console.error("[checkout] gateway request failed", error);
    return {
      ok: false,
      status: 502,
      message: "We could not reach the payment processor. You have not been charged. Please try again.",
    };
  }

  const responseCode = result.get("response_code") ?? "";
  if (result.get("response") !== "1") {
    console.warn(
      `[checkout] order ${orderNumber} not approved: response=${result.get("response")} code=${responseCode} text=${result.get("responsetext")}`,
    );
    return { ok: false, status: 402, message: declineMessage(responseCode) };
  }

  return {
    ok: true,
    transactionId: result.get("transactionid") ?? "",
    authCode: result.get("authcode") ?? "",
  };
}
