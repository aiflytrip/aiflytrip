import { describe, expect, it } from "vitest";

import { parseAnalytics } from "@/lib/env";

describe("parseAnalytics", () => {
  it("is off by default", () => {
    expect(parseAnalytics({})).toEqual({ provider: "none" });
  });

  it("enables Plausible with a domain and the default script", () => {
    expect(
      parseAnalytics({
        provider: "plausible",
        plausibleDomain: "aiflytrip.com",
      }),
    ).toEqual({
      provider: "plausible",
      domain: "aiflytrip.com",
      scriptSrc: "https://plausible.io/js/script.js",
    });
  });

  it("rejects non-https script sources and malformed GA4 ids", () => {
    expect(
      parseAnalytics({
        provider: "plausible",
        plausibleDomain: "x",
        plausibleSrc: "http://evil",
      }).provider,
    ).toBe("none");
    expect(
      parseAnalytics({ provider: "ga4", gaId: "G-ABC');alert(1)//" }).provider,
    ).toBe("none");
    expect(parseAnalytics({ provider: "ga4", gaId: "G-ABC123" })).toEqual({
      provider: "ga4",
      measurementId: "G-ABC123",
    });
  });
});
