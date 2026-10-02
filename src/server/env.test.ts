import { describe, expect, it } from "vitest";

import { parseServerEnv } from "@/server/env";

describe("parseServerEnv", () => {
  it("defaults to the mock provider", () => {
    expect(parseServerEnv({})).toEqual({
      ok: true,
      env: { FLIGHTS_PROVIDER: "mock", DUFFEL_ACCESS_TOKEN: undefined },
    });
  });

  it("accepts Duffel with a test token", () => {
    const result = parseServerEnv({
      FLIGHTS_PROVIDER: "duffel",
      DUFFEL_ACCESS_TOKEN: " duffel_test_abc123 ",
    });
    expect(result).toEqual({
      ok: true,
      env: {
        FLIGHTS_PROVIDER: "duffel",
        DUFFEL_ACCESS_TOKEN: "duffel_test_abc123",
      },
    });
  });

  it("requires a token when Duffel is selected", () => {
    const result = parseServerEnv({
      FLIGHTS_PROVIDER: "duffel",
      DUFFEL_ACCESS_TOKEN: "",
    });
    expect(result.ok).toBe(false);
  });

  it("rejects live tokens without echoing them", () => {
    const secret = "duffel_live_super_secret_value";
    const result = parseServerEnv({
      FLIGHTS_PROVIDER: "duffel",
      DUFFEL_ACCESS_TOKEN: secret,
    });
    expect(result.ok).toBe(false);
    expect(JSON.stringify(result)).not.toContain(secret);
  });

  it("rejects unknown providers", () => {
    expect(parseServerEnv({ FLIGHTS_PROVIDER: "amadeus" }).ok).toBe(false);
  });

  it("accepts a Supabase secret key", () => {
    const result = parseServerEnv({ SUPABASE_SECRET_KEY: "sb_secret_abc123" });
    expect(result.ok && result.env.SUPABASE_SECRET_KEY).toBe(
      "sb_secret_abc123",
    );
  });

  it("rejects a publishable key in SUPABASE_SECRET_KEY without echoing it", () => {
    const key = "sb_publishable_wrong_slot";
    const result = parseServerEnv({ SUPABASE_SECRET_KEY: key });
    expect(result.ok).toBe(false);
    expect(JSON.stringify(result)).not.toContain(key);
  });

  it("accepts an Anthropic API key", () => {
    const result = parseServerEnv({ ANTHROPIC_API_KEY: " sk-ant-api03-abc " });
    expect(result.ok && result.env.ANTHROPIC_API_KEY).toBe("sk-ant-api03-abc");
  });

  it("rejects a non-Anthropic value in ANTHROPIC_API_KEY without echoing it", () => {
    const value = "sb_secret_wrong_variable";
    const result = parseServerEnv({ ANTHROPIC_API_KEY: value });
    expect(result.ok).toBe(false);
    expect(JSON.stringify(result)).not.toContain(value);
  });

  it("accepts Stripe test keys, price ids and webhook secrets", () => {
    const result = parseServerEnv({
      STRIPE_SECRET_KEY: "sk_test_abc",
      STRIPE_PREMIUM_PRICE_ID: "price_123",
      STRIPE_WEBHOOK_SECRET: "whsec_abc",
    });
    expect(result.ok).toBe(true);
    expect(parseServerEnv({ STRIPE_SECRET_KEY: "rk_test_restricted" }).ok).toBe(
      true,
    );
  });

  it.each(["sk_live_realmoney", "rk_live_realmoney"])(
    "refuses live Stripe key %s without echoing it",
    (key) => {
      const result = parseServerEnv({ STRIPE_SECRET_KEY: key });
      expect(result.ok).toBe(false);
      expect(!result.ok && result.problems.join(" ")).toMatch(
        /Live Stripe keys are not allowed/,
      );
      expect(JSON.stringify(result)).not.toContain(key);
    },
  );

  it.each([
    [{ STRIPE_SECRET_KEY: "pk_test_publishable" }],
    [{ STRIPE_WEBHOOK_SECRET: "sk_test_wrong_slot" }],
    [{ STRIPE_PREMIUM_PRICE_ID: "prod_123" }],
  ])("rejects misplaced Stripe values %j", (source) => {
    expect(parseServerEnv(source).ok).toBe(false);
  });
});
