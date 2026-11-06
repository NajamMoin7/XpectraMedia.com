import { PricingError, priceOrder, type CheckoutLine } from "@/lib/order-pricing";
import { STATE_CODES } from "@/lib/us-states";

/**
 * Charges a card through the payment gateway (NMI compatible Direct Post API).
 *
 * The browser never sees card numbers: Collect.js tokenizes them inside the
 * gateway's own iframes and hands us a single use payment token. This handler
 * re-prices the cart from the catalogue, then sends a "sale" with the token
 * and the SECRET_KEY, which never leaves the server.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface ChargeRequest {
  token: string;
  orderNumber: string;
  /** Total the customer saw, used to refuse a charge if prices moved. */
  expectedTotal: number;
  lines: CheckoutLine[];
  customer: {
    fullName: string;
    email: string;
    phone: string;
    street: string;
    apartment: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

/** Trims and caps a value before it is sent to the gateway. */
function clean(value: unknown, max = 100): string {
  return typeof value === "string" ? value.replace(/[\r\n]+/g, " ").trim().slice(0, max) : "";
}

function fail(status: number, message: string) {
  return Response.json({ ok: false, message }, { status });
}

/** Customer facing text for gateway outcomes. Raw gateway text is only logged. */
function declineMessage(responseCode: string): string {
  switch (responseCode) {
    case "200":
    case "201":
    case "202":
    case "203":
    case "204":
      return "Your card was declined. Please check the details or try a different card.";
    case "220":
    case "221":
    case "222":
    case "223":
    case "224":
    case "225":
      return "The card details could not be verified. Please check the number, expiry date and security code.";
    case "300":
      return "The payment was rejected. Please try again, or choose Cash on Delivery.";
    default:
      return "We could not complete the payment. Please try again or use a different card.";
  }
}

export async function POST(request: Request) {
  const securityKey = process.env.SECRET_KEY;
  const gatewayUrl = process.env.POST_URL;
  if (!securityKey || !gatewayUrl) {
    console.error("[checkout] SECRET_KEY or POST_URL is not configured");
    return fail(503, "Card payment is temporarily unavailable. Please choose Cash on Delivery.");
  }

  let body: ChargeRequest;
  try {
    body = (await request.json()) as ChargeRequest;
  } catch {
    return fail(400, "The payment request was not readable.");
  }

  const token = clean(body.token, 200);
  const orderNumber = clean(body.orderNumber, 40);
  if (!token || !/^[A-Za-z0-9-]+$/.test(orderNumber)) {
    return fail(400, "The payment details are incomplete. Please re-enter your card.");
  }

  const c = body.customer ?? ({} as ChargeRequest["customer"]);
  const fullName = clean(c.fullName, 80);
  const email = clean(c.email, 120);
  const state = STATE_CODES[clean(c.state, 40)];
  const zip = clean(c.zipCode, 10);
  if (fullName.length < 3 || !email.includes("@") || !state || !/^\d{5}(-\d{4})?$/.test(zip)) {
    return fail(400, "Please check your contact and shipping details.");
  }

  let order;
  try {
    order = priceOrder(Array.isArray(body.lines) ? body.lines : []);
  } catch (error) {
    if (error instanceof PricingError) return fail(400, error.message);
    throw error;
  }

  // Never charge an amount the customer did not see on screen.
  if (Math.abs(order.total - Number(body.expectedTotal)) > 0.009) {
    return Response.json(
      {
        ok: false,
        code: "TOTAL_CHANGED",
        total: order.total,
        message: `Your order total has been updated to $${order.total.toFixed(2)}. Please review your cart and try again.`,
      },
      { status: 409 },
    );
  }

  const [firstName, ...rest] = fullName.split(/\s+/);
  const lastName = rest.join(" ") || firstName;
  const address1 = clean(c.street, 100);
  const address2 = clean(c.apartment, 100);
  const city = clean(c.city, 60);
  const phone = clean(c.phone, 30);

  const params = new URLSearchParams({
    security_key: securityKey,
    type: "sale",
    payment_token: token,
    amount: order.total.toFixed(2),
    currency: "USD",
    orderid: orderNumber,
    order_description: `Xpectra Media order ${orderNumber}`,
    shipping: order.shipping.toFixed(2),
    ipaddress: clean(request.headers.get("x-nf-client-connection-ip") ?? request.headers.get("x-forwarded-for")?.split(",")[0], 45),
    first_name: firstName,
    last_name: lastName,
    address1,
    address2,
    city,
    state,
    zip,
    country: "US",
    phone,
    email,
    shipping_firstname: firstName,
    shipping_lastname: lastName,
    shipping_address1: address1,
    shipping_address2: address2,
    shipping_city: city,
    shipping_state: state,
    shipping_zip: zip,
    shipping_country: "US",
    shipping_email: email,
  });

  // Line items give the merchant a readable record in the gateway portal.
  order.lines.forEach((line, index) => {
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
    return fail(502, "We could not reach the payment processor. You have not been charged. Please try again.");
  }

  const responseCode = result.get("response_code") ?? "";
  if (result.get("response") !== "1") {
    console.warn(
      `[checkout] order ${orderNumber} not approved: response=${result.get("response")} code=${responseCode} text=${result.get("responsetext")}`,
    );
    return fail(402, declineMessage(responseCode));
  }

  return Response.json({
    ok: true,
    transactionId: result.get("transactionid") ?? "",
    authCode: result.get("authcode") ?? "",
    amount: order.total,
    subtotal: order.subtotal,
    shipping: order.shipping,
  });
}
