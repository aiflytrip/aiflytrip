import type Stripe from "stripe";

import { PREMIUM_PLAN } from "@/features/premium/config";

export type PremiumPrice = {
  id: string;
  amountMinor: number;
  currency: string;
  display: string;
};

export type PriceCheck =
  { ok: true; price: PremiumPrice } | { ok: false; problem: string };

/**
 * Verifies the configured Stripe Price is exactly what we intend to sell:
 * active, one-time, test mode, and the expected amount and currency.
 */
export function checkPremiumPrice(price: Stripe.Price): PriceCheck {
  if (price.livemode)
    return { ok: false, problem: "price is a live-mode price" };
  if (!price.active) return { ok: false, problem: "price is archived" };
  if (price.type !== "one_time")
    return {
      ok: false,
      problem: `price type is ${price.type}, expected one_time`,
    };
  if (price.currency !== PREMIUM_PLAN.currency) {
    return {
      ok: false,
      problem: `currency is ${price.currency}, expected ${PREMIUM_PLAN.currency}`,
    };
  }
  if (price.unit_amount !== PREMIUM_PLAN.unitAmount) {
    return {
      ok: false,
      problem: `amount is ${price.unit_amount}, expected ${PREMIUM_PLAN.unitAmount}`,
    };
  }
  return {
    ok: true,
    price: {
      id: price.id,
      amountMinor: price.unit_amount,
      currency: price.currency.toUpperCase(),
      display: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: price.currency,
      }).format(price.unit_amount / 100),
    },
  };
}
