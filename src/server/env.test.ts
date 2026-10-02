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
});
