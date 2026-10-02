import { z } from "zod";

/** Mirrors supabase/config.toml: 8+ chars with lower, upper and a digit. */
export const PASSWORD_RULES =
  "At least 8 characters, with upper- and lowercase letters and a number.";

const email = z
  .string()
  .trim()
  .min(1, "Enter your email address")
  .max(254, "Email address is too long")
  .pipe(z.email("Enter a valid email address"));

const newPassword = z
  .string()
  .min(8, "Password must be at least 8 characters")
  // bcrypt (used by Supabase Auth) ignores bytes beyond 72.
  .max(72, "Password must be at most 72 characters")
  .refine(
    (value) => /[a-z]/.test(value) && /[A-Z]/.test(value) && /\d/.test(value),
    "Use upper- and lowercase letters and at least one number",
  );

export const signInSchema = z.object({
  email,
  password: z
    .string()
    .min(1, "Enter your password")
    .max(72, "Password must be at most 72 characters"),
});

export const signUpSchema = z.object({
  fullName: z.string().trim().max(120, "Name must be at most 120 characters"),
  email,
  password: newPassword,
});

export type AuthField = "email" | "password" | "fullName";
export type FieldErrors = Partial<Record<AuthField, string>>;

export function fieldErrorsFrom(error: z.ZodError): FieldErrors {
  const errors: FieldErrors = {};
  for (const issue of error.issues) {
    const field = issue.path[0] as AuthField | undefined;
    if (field && !errors[field]) errors[field] = issue.message;
  }
  return errors;
}

const DEFAULT_NEXT = "/account";

/**
 * Only allow same-origin relative paths as post-login destinations, so
 * `?next=https://evil.example` (open redirect) can't be abused.
 */
export function safeNextPath(raw: unknown, fallback = DEFAULT_NEXT): string {
  if (typeof raw !== "string" || raw.length > 2000) return fallback;
  if (!raw.startsWith("/") || raw.startsWith("//") || raw.startsWith("/\\"))
    return fallback;
  try {
    const url = new URL(raw, "http://local.invalid");
    if (url.origin !== "http://local.invalid") return fallback;
    // Never bounce back into auth pages after signing in.
    if (/^\/(login|signup|auth)(\/|$)/.test(url.pathname)) return fallback;
    return url.pathname + url.search + url.hash;
  } catch {
    return fallback;
  }
}
