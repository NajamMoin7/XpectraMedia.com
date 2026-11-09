import { NextResponse, type NextRequest } from "next/server";

import { ADMIN_COOKIE, verifySessionToken } from "@/lib/admin-session";

/**
 * Sends anyone without a valid admin session to the login page. Admin pages,
 * actions and API routes also check the session themselves, so this is the
 * first line of defence rather than the only one.
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/admin/login") return NextResponse.next();

  const valid = await verifySessionToken(request.cookies.get(ADMIN_COOKIE)?.value);
  if (valid) return NextResponse.next();

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ ok: false, message: "Not signed in." }, { status: 401 });
  }
  const login = new URL("/admin/login", request.url);
  return NextResponse.redirect(login);
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
