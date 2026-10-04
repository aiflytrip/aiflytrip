import { type EmailOtpType } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";

import { safeNextPath } from "@/features/auth/lib/validation";
import { createClient } from "@/server/supabase/server";

const EMAIL_OTP_TYPES: readonly EmailOtpType[] = [
  "signup",
  "invite",
  "magiclink",
  "recovery",
  "email_change",
  "email",
];

function isEmailOtpType(value: string | null): value is EmailOtpType {
  return (
    value !== null && (EMAIL_OTP_TYPES as readonly string[]).includes(value)
  );
}

/**
 * Completes email links from Supabase Auth. Supports both formats:
 * - `?token_hash=…&type=…` (recommended email template for SSR; works even
 *   if the link is opened in a different browser)
 * - `?code=…` (PKCE redirect from the default template; same browser only)
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const next = safeNextPath(searchParams.get("next"));
  const fail = (reason: string) =>
    NextResponse.redirect(new URL(`/auth/error?reason=${reason}`, request.url));

  const supabase = await createClient();
  if (!supabase) return fail("not_configured");

  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type");
  const code = searchParams.get("code");

  let error: { code?: string; status?: number } | null = null;
  if (tokenHash && isEmailOtpType(type)) {
    ({ error } = await supabase.auth.verifyOtp({
      type,
      token_hash: tokenHash,
    }));
  } else if (code) {
    ({ error } = await supabase.auth.exchangeCodeForSession(code));
  } else {
    return fail("invalid_link");
  }

  // Link opened in a different browser from the one that signed up: the
  // email IS confirmed (Supabase verified it before redirecting here), but
  // the sign-in code can't be exchanged without that browser's verifier.
  if (error?.code === "pkce_code_verifier_not_found") {
    const login = new URL("/login", request.url);
    login.searchParams.set("confirmed", "1");
    login.searchParams.set("next", next);
    return NextResponse.redirect(login);
  }

  if (error) {
    console.error("[auth] email link verification failed", {
      code: error.code,
      status: error.status,
    });
    return fail(
      error.code === "otp_expired" || error.code === "flow_state_expired"
        ? "expired"
        : "invalid_link",
    );
  }
  return NextResponse.redirect(new URL(next, request.url));
}
