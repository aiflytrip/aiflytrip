import Stripe from "stripe";
import { describe, expect, it, vi } from "vitest";

import {
  handleStripeWebhook,
  type WebhookDeps,
} from "@/features/premium/server/webhook";

// A made-up signing secret: signatures below are real HMACs over it.
const SECRET = "whsec_test_only_not_a_real_secret_123456";
const stripe = new Stripe("sk_test_dummy_for_signature_helpers");

function event(
  type: string,
  object: Record<string, unknown>,
  livemode = false,
) {
  return JSON.stringify({
    id: `evt_${Math.random().toString(36).slice(2, 12)}`,
    object: "event",
    type,
    livemode,
    created: Math.floor(Date.now() / 1000),
    data: { object },
  });
}

function sign(payload: string, timestamp?: number) {
  return stripe.webhooks.generateTestHeaderString({
    payload,
    secret: SECRET,
    timestamp,
  });
}

function deps(
  overrides: Partial<WebhookDeps> = {},
): WebhookDeps & { calls: string[] } {
  const calls: string[] = [];
  return {
    calls,
    verify: (raw, sig) => stripe.webhooks.constructEvent(raw, sig, SECRET),
    claim: vi.fn(async () => true),
    finish: vi.fn(async (id: string, status: string) => {
      calls.push(`finish:${status}`);
    }),
    fulfill: vi.fn(async (id: string) => {
      calls.push(`fulfill:${id}`);
      return {
        outcome: "recorded" as const,
        status: "succeeded" as const,
        planId: "p",
        userId: "u",
      };
    }),
    refund: vi.fn(async (id: string) => {
      calls.push(`refund:${id}`);
      return {
        outcome: "recorded" as const,
        status: "refunded" as const,
        planId: "p",
        userId: "u",
      };
    }),
    ...overrides,
  };
}

describe("handleStripeWebhook", () => {
  it("rejects requests without a signature", async () => {
    expect(await handleStripeWebhook("{}", null, deps())).toMatchObject({
      status: 400,
    });
  });

  it("rejects a forged signature", async () => {
    const body = event("checkout.session.completed", { id: "cs_test_1" });
    const forged = new Stripe("sk_test_x").webhooks.generateTestHeaderString({
      payload: body,
      secret: "whsec_attacker",
    });
    const d = deps();
    expect(await handleStripeWebhook(body, forged, d)).toMatchObject({
      status: 400,
      body: { detail: "invalid_signature" },
    });
    expect(d.fulfill).not.toHaveBeenCalled();
  });

  it("rejects a body modified after signing", async () => {
    const body = event("checkout.session.completed", { id: "cs_test_1" });
    const tampered = body.replace("cs_test_1", "cs_test_2");
    expect(
      await handleStripeWebhook(tampered, sign(body), deps()),
    ).toMatchObject({ status: 400 });
  });

  it("rejects replayed deliveries older than the 5 minute tolerance", async () => {
    const body = event("checkout.session.completed", { id: "cs_test_1" });
    const old = Math.floor(Date.now() / 1000) - 10 * 60;
    expect(
      await handleStripeWebhook(body, sign(body, old), deps()),
    ).toMatchObject({ status: 400 });
  });

  it("refuses live-mode events while in test mode", async () => {
    const body = event("checkout.session.completed", { id: "cs_live_1" }, true);
    const d = deps();
    expect(await handleStripeWebhook(body, sign(body), d)).toMatchObject({
      status: 400,
      body: { detail: "live_mode_not_enabled" },
    });
    expect(d.fulfill).not.toHaveBeenCalled();
  });

  it("acknowledges but ignores event types it doesn't handle", async () => {
    const body = event("customer.created", { id: "cus_1" });
    const d = deps();
    expect(await handleStripeWebhook(body, sign(body), d)).toMatchObject({
      status: 200,
      body: { detail: "ignored_type" },
    });
    expect(d.claim).not.toHaveBeenCalled();
  });

  it.each([
    "checkout.session.completed",
    "checkout.session.async_payment_succeeded",
    "checkout.session.async_payment_failed",
    "checkout.session.expired",
  ])("fulfils from %s", async (type) => {
    const body = event(type, { id: "cs_test_42" });
    const d = deps();
    expect(await handleStripeWebhook(body, sign(body), d)).toMatchObject({
      status: 200,
      body: { detail: "recorded" },
    });
    expect(d.calls).toEqual(["fulfill:cs_test_42", "finish:processed"]);
  });

  it("records refunds from charge.refunded", async () => {
    const body = event("charge.refunded", { id: "ch_9" });
    const d = deps();
    await handleStripeWebhook(body, sign(body), d);
    expect(d.calls).toEqual(["refund:ch_9", "finish:processed"]);
  });

  it("skips duplicate deliveries without fulfilling again", async () => {
    const body = event("checkout.session.completed", { id: "cs_test_1" });
    const d = deps({ claim: vi.fn(async () => false) });
    expect(await handleStripeWebhook(body, sign(body), d)).toMatchObject({
      status: 200,
      body: { detail: "duplicate" },
    });
    expect(d.fulfill).not.toHaveBeenCalled();
  });

  it("marks ignored outcomes so they aren't retried", async () => {
    const body = event("checkout.session.completed", { id: "cs_test_1" });
    const d = deps({
      fulfill: vi.fn(async () => ({
        outcome: "ignored" as const,
        reason: "other_product",
      })),
    });
    await handleStripeWebhook(body, sign(body), d);
    expect(d.finish).toHaveBeenCalledWith(
      expect.stringMatching(/^evt_/),
      "ignored",
      "other_product",
    );
  });

  it("returns 500 and records failure so Stripe retries", async () => {
    const body = event("checkout.session.completed", { id: "cs_test_1" });
    const d = deps({
      fulfill: vi.fn(async () => {
        throw new Error("db down");
      }),
    });
    vi.spyOn(console, "error").mockImplementation(() => {});
    expect(await handleStripeWebhook(body, sign(body), d)).toMatchObject({
      status: 500,
    });
    expect(d.finish).toHaveBeenCalledWith(
      expect.stringMatching(/^evt_/),
      "failed",
      "db down",
    );
  });
});
