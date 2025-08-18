import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);

  // Normalize pathname: lowercase and remove trailing slash (except root)
  let pathname = request.nextUrl.pathname.toLowerCase();
  if (pathname !== "/" && pathname.endsWith("/")) {
    pathname = pathname.slice(0, -1);
  }

  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  if (sessionCookie && ["/login", "/signup"].includes(pathname)) {
    return NextResponse.redirect(new URL("/account", request.url));
  }

  if (!sessionCookie && pathname.startsWith("/account")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/api/auth/((?!.*\\..*|_next).*)"],
};
