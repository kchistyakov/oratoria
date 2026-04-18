import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME, verifySession } from "@/lib/admin-auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/panel") && !pathname.startsWith("/panel/login")) {
    const session = request.cookies.get(COOKIE_NAME);
    const valid = session ? await verifySession(session.value) : false;

    if (!valid) {
      const loginUrl = new URL("/panel/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/panel", "/panel/:path*"],
};
