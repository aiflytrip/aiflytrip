import "server-only";

import Stripe from "stripe";

import { getServerEnv } from "@/server/env";

let client: Stripe | undefined;

export type StripeConfig = {
  stripe: Stripe;
  priceId: string;
  webhookSecret: string | undefined;
};

/**
 * Server-only Stripe client. The secret key never leaves the server
 * (`server-only`), and env validation refuses live keys in this phase.
 * Returns undefined until STRIPE_SECRET_KEY and STRIPE_PREMIUM_PRICE_ID are set.
 */
export function getStripeConfig(): StripeConfig | undefined {
  const env = getServerEnv();
  if (!env.ok) return undefined;
  const { STRIPE_SECRET_KEY, STRIPE_PREMIUM_PRICE_ID, STRIPE_WEBHOOK_SECRET } =
    env.env;
  if (!STRIPE_SECRET_KEY || !STRIPE_PREMIUM_PRICE_ID) return undefined;

  // The SDK pins the API version it was built against (stripe@23).
  client ??= new Stripe(STRIPE_SECRET_KEY, {
    maxNetworkRetries: 2,
    timeout: 20_000,
    appInfo: { name: "AIFlyTrip" },
  });
  return {
    stripe: client,
    priceId: STRIPE_PREMIUM_PRICE_ID,
    webhookSecret: STRIPE_WEBHOOK_SECRET,
  };
}

export function isStripeConfigured(): boolean {
  return getStripeConfig() !== undefined;
}
