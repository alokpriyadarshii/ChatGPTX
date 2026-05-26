import { NextResponse, type NextRequest } from "next/server";
import { getCanonicalAppUrl } from "@/lib/env";

function isLocalHost(host: string) {
  return host.startsWith("localhost")
    || host.startsWith("127.0.0.1")
    || host.startsWith("[::1]");
}

export function middleware(request: NextRequest) {
  const canonicalUrl = getCanonicalAppUrl(request.nextUrl.origin);

  if (!canonicalUrl || isLocalHost(request.nextUrl.host)) {
    return NextResponse.next();
  }

  const canonical = new URL(canonicalUrl);

  if (request.nextUrl.host === canonical.host && request.nextUrl.protocol === canonical.protocol) {
    return NextResponse.next();
  }

  const redirectUrl = request.nextUrl.clone();
  redirectUrl.protocol = canonical.protocol;
  redirectUrl.host = canonical.host;

  return NextResponse.redirect(redirectUrl, request.method === "GET" || request.method === "HEAD" ? 308 : 307);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
