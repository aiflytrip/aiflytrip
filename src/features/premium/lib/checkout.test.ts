import type Stripe from "stripe";
import { describe, expect, it } from "vitest";

import { CHECKOUT_METADATA, PREMIUM_PLAN } from "@/features/premium/config";
import {
  buildCheckoutParams,
  checkoutIdempotencyKey,
  currentMinuteBucket,
  interpretCheckoutSession,
  paymentStatusFromIntent,
  refundStatus,
} from "@/features/premium/lib/checkout";
import { checkPremiumPrice } from "@/features/premium/lib/price";

import { PREMIUM_PRODUCT } from "../../../../scripts/premium-product.mjs";

const USER = "11111111-1111-4111-8111-111111111111";
const PLAN = "22222222-2222-4222-8222-222222222222";
const TRIP = "33333333-3333-4333-8333-333333333333";
const PRICE = "price_test123";

const metadata = {
  [CHECKOUT_METADATA.product]: "premium_plan",
  [CHECKOUT_METADATA.userId]: USER,
  [CHECKOUT_METADATA.planId]: PLAN,
  [CHECKOUT_METADATA.tripId]: TRIP,
};

function session(
  overrides: Partial<Stripe.Checkout.Session> = {},
): Stripe.Checkout.Session {
  return {
    id: "cs_test_abc",
    object: "checkout.session",
    livemode: false,
    mode: "payment",
    status: "complete",
    payment_status: "paid",
    client_reference_id: USER,
    metadata,
    amount_total: 499,
    currency: "usd",
    line_items: {
      object: "list",
      data: [{ price: { id: PRICE }, quantity: 1 }],
      has_more: false,
      url: "",
    },
    payment_intent: {
      id: "pi_123",
      status: "succeeded",
      latest_charge: { amount: 499, amount_refunded: 0, refunded: false },
    },
    ...overrides,
  } as unknown as Stripe.Checkout.Session;
}

describe("buildCheckoutParams", () => {
  const params = buildCheckoutParams({
    priceId: PRICE,
    customerId: "cus_1",
    userId: USER,
    planId: PLAN,
    tripId: TRIP,
    siteUrl: new URL("https://aiflytrip.example"),
    minuteBucket: 29_000_000,
  });

  it("sells exactly one premium price to the linked customer", () => {
    expect(params).toMatchObject({
      mode: "payment",
      customer: "cus_1",
      client_reference_id: USER,
      line_items: [{ price: PRICE, quantity: 1 }],
      metadata,
      payment_intent_data: { metadata },
    });
  });

  it("returns to the plan with the session id placeholder", () => {
    expect(params.success_url).toBe(
      `https://aiflytrip.example/plans/${PLAN}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    );
    expect(params.cancel_url).toBe(
      `https://aiflytrip.example/plans/${PLAN}?checkout=cancelled`,
    );
  });

  it("uses a stable expiry (>= Stripe's 30 minute minimum) for idempotent retries", () => {
    expect(params.expires_at).toBe(29_000_000 * 60 + 31 * 60);
    const again = buildCheckoutParams({
      priceId: PRICE,
      customerId: "cus_1",
      userId: USER,
      planId: PLAN,
      tripId: TRIP,
      siteUrl: new URL("https://aiflytrip.example"),
      minuteBucket: 29_000_000,
    });
    expect(again).toEqual(params);
  });

  it("derives idempotency keys per user, plan and minute", () => {
    const t = Date.parse("2026-10-02T12:00:30Z");
    expect(currentMinuteBucket(t)).toBe(currentMinuteBucket(t + 20_000));
    expect(checkoutIdempotencyKey(USER, PLAN, 5)).toBe(
      `aiflytrip-checkout-${USER}-${PLAN}-5`,
    );
    expect(checkoutIdempotencyKey(USER, PLAN, 5)).not.toBe(
      checkoutIdempotencyKey(USER, PLAN, 6),
    );
  });
});

describe("interpretCheckoutSession", () => {
  it("records a paid session against the right user, trip and plan", () => {
    expect(interpretCheckoutSession(session(), { priceId: PRICE })).toEqual({
      kind: "record",
      userId: USER,
      planId: PLAN,
      row: {
        user_id: USER,
        trip_id: TRIP,
        travel_plan_id: PLAN,
        product: "premium_plan",
        provider: "stripe",
        provider_payment_id: "pi_123",
        checkout_session_id: "cs_test_abc",
        amount_minor: 499,
        currency: "USD",
        status: "succeeded",
        amount_refunded_minor: 0,
        livemode: false,
        description: PREMIUM_PLAN.name,
      },
    });
  });

  it.each([
    ["processing (async payment)", "processing", "pending"],
    ["failed async payment", "requires_payment_method", "failed"],
    ["cancelled intent", "canceled", "canceled"],
  ] as const)("maps %s", (_label, intentStatus, expected) => {
    const result = interpretCheckoutSession(
      session({
        payment_status: "unpaid",
        payment_intent: {
          id: "pi_1",
          status: intentStatus,
        } as Stripe.PaymentIntent,
      }),
      { priceId: PRICE },
    );
    expect(result.kind === "record" && result.row.status).toBe(expected);
  });

  it("keeps a refund even though the intent still says succeeded", () => {
    const result = interpretCheckoutSession(
      session({
        payment_intent: {
          id: "pi_1",
          status: "succeeded",
          latest_charge: { amount: 499, amount_refunded: 499, refunded: true },
        } as unknown as Stripe.PaymentIntent,
      }),
      { priceId: PRICE },
    );
    expect(result).toMatchObject({
      kind: "record",
      row: { status: "refunded", amount_refunded_minor: 499 },
    });
  });

  it.each([
    ["a live-mode session", { livemode: true }, "live_mode"],
    ["a subscription session", { mode: "subscription" }, "not_payment_mode"],
    [
      "another product",
      { metadata: { ...metadata, [CHECKOUT_METADATA.product]: "other" } },
      "other_product",
    ],
    [
      "tampered ids",
      { metadata: { ...metadata, [CHECKOUT_METADATA.planId]: "x" } },
      "bad_metadata",
    ],
    [
      "a different reference user",
      { client_reference_id: "44444444-4444-4444-8444-444444444444" },
      "reference_mismatch",
    ],
    [
      "an unexpected price",
      {
        line_items: {
          object: "list",
          data: [{ price: { id: "price_other" }, quantity: 1 }],
          has_more: false,
          url: "",
        },
      },
      "unexpected_line_items",
    ],
    [
      "quantity above one",
      {
        line_items: {
          object: "list",
          data: [{ price: { id: PRICE }, quantity: 2 }],
          has_more: false,
          url: "",
        },
      },
      "unexpected_line_items",
    ],
    [
      "no payment attempt yet",
      { payment_intent: null, payment_status: "unpaid", status: "open" },
      "no_payment_attempt",
    ],
  ] as const)("ignores %s", (_label, overrides, reason) => {
    expect(
      interpretCheckoutSession(
        session(overrides as unknown as Partial<Stripe.Checkout.Session>),
        { priceId: PRICE },
      ),
    ).toEqual({ kind: "ignore", reason });
  });
});

describe("status helpers", () => {
  it("maps payment intent states", () => {
    expect(paymentStatusFromIntent("succeeded")).toBe("succeeded");
    expect(paymentStatusFromIntent("requires_action")).toBe("pending");
  });

  it("maps refunds", () => {
    expect(
      refundStatus({ amount: 499, amount_refunded: 499, refunded: true }),
    ).toBe("refunded");
    expect(
      refundStatus({ amount: 499, amount_refunded: 100, refunded: false }),
    ).toBe("partially_refunded");
    expect(
      refundStatus({ amount: 499, amount_refunded: 0, refunded: false }),
    ).toBe("succeeded");
  });
});

describe("checkPremiumPrice", () => {
  const good = {
    id: PRICE,
    livemode: false,
    active: true,
    type: "one_time",
    currency: "usd",
    unit_amount: 499,
  };

  it("accepts the configured price", () => {
    expect(checkPremiumPrice(good as Stripe.Price)).toEqual({
      ok: true,
      price: { id: PRICE, amountMinor: 499, currency: "USD", display: "$4.99" },
    });
  });

  it.each([
    ["live mode", { livemode: true }],
    ["archived", { active: false }],
    ["recurring", { type: "recurring" }],
    ["wrong currency", { currency: "eur" }],
    ["wrong amount", { unit_amount: 99 }],
  ])("rejects a %s price", (_label, overrides) => {
    expect(
      checkPremiumPrice({ ...good, ...overrides } as Stripe.Price).ok,
    ).toBe(false);
  });

  it("matches the setup script's product definition", () => {
    expect(PREMIUM_PRODUCT).toEqual({
      lookupKey: PREMIUM_PLAN.lookupKey,
      name: PREMIUM_PLAN.name,
      description: PREMIUM_PLAN.description,
      unitAmount: PREMIUM_PLAN.unitAmount,
      currency: PREMIUM_PLAN.currency,
    });
  });
});
