// Premium product definition used by scripts/stripe-setup.mjs.
// Must match src/features/premium/config.ts (enforced by a unit test).
export const PREMIUM_PRODUCT = {
  lookupKey: "aiflytrip_premium_plan_v1",
  name: "AIFlyTrip Premium Trip Plan",
  description: "Unlocks a printable PDF of one AI-generated trip plan.",
  unitAmount: 499,
  currency: "usd",
};
