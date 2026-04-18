import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME, verifySession } from "@/lib/admin-auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/panel")) return NextResponse.next();

  const session = request.cookies.get(COOKIE_NAME);
  const valid = session ? await verifySession(session.value) : false;

  const isLoginPage = pathname === "/panel/login";

  if (isLoginPage) {
    // Already logged in → skip the login form and go straight to dashboard.
    if (valid) {
      return NextResponse.redirect(new URL("/panel", request.url));
    }
    return NextResponse.next();
  }

  // All other /panel/* routes require a valid session.
  if (!valid) {
    return NextResponse.redirect(new URL("/panel/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/panel", "/panel/:path*"],
};
