/** Each plan is a paid Claude call: cap how many a user can start. */
export const PLAN_LIMITS = { perHour: 5, perDay: 20 } as const;

/**
 * Guests (no account) plan for free, so their allowance is smaller and the
 * whole site has a daily ceiling for guest plans: each plan is a paid
 * Claude call. Supabase also rate-limits anonymous sign-ins per IP.
 */
export const GUEST_PLAN_LIMITS = {
  perHour: 2,
  perDay: 3,
  /** Site-wide plans per day after which guests are asked to sign up. */
  siteWidePerDay: 150,
} as const;
