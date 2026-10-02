/** Each plan is a paid Claude call: cap how many a user can start. */
export const PLAN_LIMITS = { perHour: 5, perDay: 20 } as const;
