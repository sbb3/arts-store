import { NextResponse } from "next/server";

export function middleware(request) {
  const path = request.nextUrl.pathname;

  const token = request.cookies.get("authjs.session-token");

  if (path === "/api/auth/signin" && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (path === "/api/auth/signout" && !token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/auth/signin", "/api/auth/signout"],
};
