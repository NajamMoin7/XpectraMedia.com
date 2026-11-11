import { isAdmin } from "@/lib/server/auth";
import { clientIp, placeOrder, type PlaceOrderInput } from "@/lib/server/place-order";

/**
 * Places an order from the admin "New Order" form. Same pricing, card
 * charging and saving as the store checkout, marked as created by an admin.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return Response.json({ ok: false, message: "Not signed in." }, { status: 401 });
  }

  let body: Partial<PlaceOrderInput>;
  try {
    body = (await request.json()) as Partial<PlaceOrderInput>;
  } catch {
    return Response.json({ ok: false, message: "The order request was not readable." }, { status: 400 });
  }

  // Custom printed shirts need customer artwork, so they are ordered through
  // the shirt designer, not this form.
  if (body.lines?.some((line) => line.custom)) {
    return Response.json(
      { ok: false, message: "Custom printed shirts cannot be added from this form." },
      { status: 400 },
    );
  }

  const result = await placeOrder({
    paymentMethod: body.paymentMethod!,
    token: body.token,
    card: body.card,
    expectedTotal: Number(body.expectedTotal),
    lines: body.lines ?? [],
    customer: body.customer ?? {},
    ip: clientIp(request),
    source: "admin",
  });

  if (!result.ok) {
    const { status, ...rest } = result;
    return Response.json(rest, { status });
  }
  return Response.json(result);
}
