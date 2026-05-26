import { NextRequest, NextResponse } from "next/server";
import { normalizeEnvValue } from "@/lib/env";

export const dynamic = "force-dynamic";

export function GET(request: NextRequest) {
  const requestOrigin = request.nextUrl.origin;
  const nextAuthUrl = normalizeEnvValue("NEXTAUTH_URL") || requestOrigin;
  const callbackUrl = `${nextAuthUrl}/api/auth/callback/google`;

  return NextResponse.json({
    nextAuthUrl,
    callbackUrl,
    requestOrigin,
    hasGoogleId: Boolean(process.env.GOOGLE_ID),
    hasGoogleSecret: Boolean(process.env.GOOGLE_SECRET),
    hasNextAuthSecret: Boolean(process.env.NEXTAUTH_SECRET),
  });
}
