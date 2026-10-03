import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isValidPreviewToken, PREVIEW_COOKIE } from "@/lib/registrationGate";

export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = request.headers.get("host") || "";

  // Organizer preview link for hidden registration: /apply?preview=<token>.
  // Trade the token for an httpOnly cookie, then drop it from the address bar.
  if (url.pathname === "/apply" && url.searchParams.has("preview")) {
    const token = url.searchParams.get("preview");
    url.searchParams.delete("preview");
    const response = NextResponse.redirect(url);
    if (token && isValidPreviewToken(token)) {
      response.cookies.set(PREVIEW_COOKIE, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/apply",
        maxAge: 60 * 60 * 24 * 30,
      });
    }
    return response;
  }

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
