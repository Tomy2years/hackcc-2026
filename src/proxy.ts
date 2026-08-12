import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = request.headers.get("host") || "";

  // Check if host is 2026 subdomain (e.g. 2026.hackcc.net or 2026.localhost)
  const is2026Subdomain = host.startsWith("2026.");

  if (is2026Subdomain) {
    if (url.pathname === "/") {
      url.pathname = "/2026";
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
