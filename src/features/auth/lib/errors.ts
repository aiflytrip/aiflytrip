/**
 * Maps Supabase Auth error codes to messages that are safe and useful to
 * show. Unknown errors get a generic message; details stay in server logs.
 * Codes: https://supabase.com/docs/guides/auth/debugging/error-codes
 */
const MESSAGES: Record<string, string> = {
  invalid_credentials: "Incorrect email or password.",
  email_not_confirmed:
    "Please confirm your email address first. Check your inbox for the link.",
  user_already_exists:
    "An account with this email already exists. Try signing in instead.",
  email_exists:
    "An account with this email already exists. Try signing in instead.",
  weak_password:
    "That password is too weak. Use at least 8 characters with upper- and lowercase letters and a number.",
  signup_disabled: "New sign-ups are currently disabled.",
  email_provider_disabled: "Email sign-in is currently disabled.",
  over_email_send_rate_limit:
    "Too many emails sent. Please wait a few minutes and try again.",
  over_request_rate_limit:
    "Too many attempts. Please wait a few minutes and try again.",
  user_banned: "This account has been suspended.",
  otp_expired: "This link has expired. Please request a new one.",
  flow_state_expired: "This link has expired. Please try again.",
  bad_code_verifier:
    "Please open the confirmation link in the same browser you signed up with, or sign in.",
};

export const GENERIC_AUTH_ERROR = "Something went wrong. Please try again.";

export function authErrorMessage(
  error: { code?: string; status?: number } | null | undefined,
): string {
  if (!error) return GENERIC_AUTH_ERROR;
  if (error.code && MESSAGES[error.code]) return MESSAGES[error.code]!;
  if (error.status === 429) return MESSAGES.over_request_rate_limit!;
  return GENERIC_AUTH_ERROR;
}
