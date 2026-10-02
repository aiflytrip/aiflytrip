/**
 * The one product AIFlyTrip sells in this phase. The Stripe Product/Price is
 * created by `npm run stripe:setup` (test mode) using this definition, and
 * the resulting price id goes in STRIPE_PREMIUM_PRICE_ID. The app validates
 * the live Price against these values before every checkout, so a
 * misconfigured price can't be sold by accident.
 */
export const PREMIUM_PLAN = {
  /** Stored in payments.product and Stripe metadata. */
  product: "premium_plan",
  /** Stripe Price lookup key; bump the suffix when the price changes. */
  lookupKey: "aiflytrip_premium_plan_v1",
  name: "AIFlyTrip Premium Trip Plan",
  description: "Unlocks a printable PDF of one AI-generated trip plan.",
  unitAmount: 499,
  currency: "usd",
  benefits: [
    "Printable PDF of your full day-by-day plan",
    "Flight suggestion, budget table and packing list included",
    "Yours to keep: download it as often as you like",
  ],
} as const;

/** Metadata keys written to Checkout Sessions and PaymentIntents. */
export const CHECKOUT_METADATA = {
  product: "aiflytrip_product",
  userId: "aiflytrip_user_id",
  planId: "aiflytrip_travel_plan_id",
  tripId: "aiflytrip_trip_id",
} as const;
