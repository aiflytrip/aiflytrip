#!/usr/bin/env node
// Creates (or finds) AIFlyTrip's premium Product + Price in Stripe TEST mode.
// Idempotent: re-running finds the existing price by its lookup key.
//
//   npm run stripe:setup
//
// Reads STRIPE_SECRET_KEY from .env.local (or the environment). Refuses live
// keys. Prints the price id to put in STRIPE_PREMIUM_PRICE_ID. Never prints keys.
import { existsSync, readFileSync } from "node:fs";

import Stripe from "stripe";

import { PREMIUM_PRODUCT } from "./premium-product.mjs";

function readKey() {
  if (process.env.STRIPE_SECRET_KEY)
    return process.env.STRIPE_SECRET_KEY.trim();
  if (!existsSync(".env.local")) return "";
  const match = readFileSync(".env.local", "utf8").match(
    /^STRIPE_SECRET_KEY=(.*)$/m,
  );
  return (match?.[1] ?? "").trim();
}

async function main() {
  const key = readKey();
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set (.env.local)");
  if (/^(sk|rk)_live_/.test(key))
    throw new Error(
      "Refusing to run with a LIVE key. Use a test key (sk_test_...).",
    );
  if (!/^(sk|rk)_test_/.test(key))
    throw new Error(
      "STRIPE_SECRET_KEY must be a Stripe test key (sk_test_...)",
    );

  const stripe = new Stripe(key, { appInfo: { name: "AIFlyTrip setup" } });
  const existing = await stripe.prices.list({
    lookup_keys: [PREMIUM_PRODUCT.lookupKey],
    active: true,
    expand: ["data.product"],
  });
  let price = existing.data[0];

  if (price) {
    console.log(
      `Found existing price for lookup key "${PREMIUM_PRODUCT.lookupKey}".`,
    );
  } else {
    const product = await stripe.products.create(
      {
        name: PREMIUM_PRODUCT.name,
        description: PREMIUM_PRODUCT.description,
        metadata: { aiflytrip_product: "premium_plan" },
      },
      {
        idempotencyKey: `aiflytrip-setup-product-${PREMIUM_PRODUCT.lookupKey}`,
      },
    );
    price = await stripe.prices.create(
      {
        product: product.id,
        unit_amount: PREMIUM_PRODUCT.unitAmount,
        currency: PREMIUM_PRODUCT.currency,
        lookup_key: PREMIUM_PRODUCT.lookupKey,
        metadata: { aiflytrip_product: "premium_plan" },
      },
      { idempotencyKey: `aiflytrip-setup-price-${PREMIUM_PRODUCT.lookupKey}` },
    );
    console.log("Created product and price in Stripe test mode.");
  }

  if (price.livemode) throw new Error("Unexpected live-mode price; aborting.");
  if (
    price.unit_amount !== PREMIUM_PRODUCT.unitAmount ||
    price.currency !== PREMIUM_PRODUCT.currency ||
    price.type !== "one_time"
  ) {
    throw new Error(
      `Existing price doesn't match the configuration (amount ${price.unit_amount} ${price.currency}, type ${price.type}). ` +
        "Archive it in the Dashboard or bump the lookup key version.",
    );
  }
  console.log(`\nSTRIPE_PREMIUM_PRICE_ID=${price.id}`);
  console.log(
    `(${(price.unit_amount / 100).toFixed(2)} ${price.currency.toUpperCase()}, one-time, test mode)`,
  );
}

main().catch((error) => {
  console.error(`stripe:setup failed: ${error.message}`);
  process.exit(1);
});
