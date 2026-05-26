import { NextRequest, NextResponse } from "next/server";
import { getCanonicalAppUrl, normalizeEnvValue } from "@/lib/env";

export const dynamic = "force-dynamic";

export function GET(request: NextRequest) {
  const requestOrigin = request.nextUrl.origin;
  const nextAuthUrl = getCanonicalAppUrl(requestOrigin) || requestOrigin;
  const callbackUrl = `${nextAuthUrl}/api/auth/callback/google`;
  const canonicalHost = new URL(nextAuthUrl).host;

  return NextResponse.json({
    nextAuthUrl,
    callbackUrl,
    requestOrigin,
    isCanonicalHost: request.nextUrl.host === canonicalHost,
    rawNextAuthUrl: normalizeEnvValue("NEXTAUTH_URL") || null,
    hasGoogleId: Boolean(process.env.GOOGLE_ID),
    hasGoogleSecret: Boolean(process.env.GOOGLE_SECRET),
    hasNextAuthSecret: Boolean(process.env.NEXTAUTH_SECRET),
  });
}
