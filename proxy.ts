import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);
  const { pathname } = request.nextUrl;

  if (
    sessionCookie &&
    [
      "/login",
      "/signup",
      "/reset-password",
      "/new-password",
      "/resend-verification",
    ].includes(pathname)
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!sessionCookie && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
