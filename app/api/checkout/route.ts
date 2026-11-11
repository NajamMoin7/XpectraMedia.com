import { clientIp, placeOrder, type PlaceOrderInput } from "@/lib/server/place-order";

/** Places an order from the store checkout. See lib/server/place-order.ts. */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: Partial<PlaceOrderInput>;
  try {
    body = (await request.json()) as Partial<PlaceOrderInput>;
  } catch {
    return Response.json({ ok: false, message: "The order request was not readable." }, { status: 400 });
  }

  const result = await placeOrder({
    paymentMethod: body.paymentMethod!,
    token: body.token,
    card: body.card,
    expectedTotal: Number(body.expectedTotal),
    lines: body.lines ?? [],
    customer: body.customer ?? {},
    ip: clientIp(request),
    source: "store",
  });

  if (!result.ok) {
    const { status, ...rest } = result;
    return Response.json(rest, { status });
  }
  return Response.json(result);
}
