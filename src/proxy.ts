import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(
    "x-site-locale",
    request.nextUrl.pathname === "/" || request.nextUrl.pathname === "/sk" || request.nextUrl.pathname.startsWith("/sk/")
      ? "sk"
      : "en-GB",
  );

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};