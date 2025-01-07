import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
export { default } from "next-auth/middleware";
export async function middleware(request) {
  const token = await getToken({ req: request });

  if (
    !token &&
    !(
      request.nextUrl.pathname.startsWith("/api/auth/signin") ||
      request.nextUrl.pathname.startsWith("/signup")
    )
  ) {
    return NextResponse.redirect(new URL("/signup", request.nextUrl));
  }

  if (
    token &&
    (request.nextUrl.pathname.startsWith("/api/auth/signin") ||
      request.nextUrl.pathname.startsWith("/signup"))
  ) {
    if (token && token.role && token.role == "admin") {
      return NextResponse.redirect(new URL("/publications", request.nextUrl));
    } else {
      return NextResponse.redirect(new URL("/borrow", request.nextUrl));
    }
  }

  if (
    token &&
    token.role &&
    token.role === "admin" &&
    request.nextUrl.pathname.startsWith("/borrow")
  ) {
    return NextResponse.redirect(new URL("/publications", request.nextUrl));
  }

  if (
    token &&
    token.role &&
    token.role === "user" &&
    (request.nextUrl.pathname.startsWith("/publications") ||
      request.nextUrl.pathname.startsWith("/dashboard") ||
      request.nextUrl.pathname.startsWith("/transactions") ||
      request.nextUrl.pathname.startsWith("/loaned"))
  ) {
    return NextResponse.redirect(new URL("/borrow", request.nextUrl));
  }
}

export const config = {
  matcher: [
    "/api/auth/signin",
    "/signup",
    "/publications",
    "/dashboard",
    "/borrow",
    "/transactions",
    "/loaned",
  ],
};
