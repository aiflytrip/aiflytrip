import { describe, expect, it } from "vitest";

import {
  assertProductionSiteUrl,
  buildContentSecurityPolicy,
  isPublicDeployment,
} from "@/config/deployment";

describe("isPublicDeployment", () => {
  it("only treats Vercel production (or self-hosted) as public", () => {
    expect(isPublicDeployment({ VERCEL_ENV: "production" })).toBe(true);
    expect(isPublicDeployment({ VERCEL_ENV: "preview" })).toBe(false);
    expect(isPublicDeployment({ VERCEL_ENV: "development" })).toBe(false);
    expect(isPublicDeployment({})).toBe(true);
  });
});

describe("assertProductionSiteUrl", () => {
  it("requires an https, non-localhost origin on Vercel production", () => {
    expect(() =>
      assertProductionSiteUrl({ VERCEL_ENV: "production" }),
    ).toThrow();
    expect(() =>
      assertProductionSiteUrl({
        VERCEL_ENV: "production",
        NEXT_PUBLIC_SITE_URL: "http://aiflytrip.com",
      }),
    ).toThrow();
    expect(() =>
      assertProductionSiteUrl({
        VERCEL_ENV: "production",
        NEXT_PUBLIC_SITE_URL: "https://localhost",
      }),
    ).toThrow();
    expect(() =>
      assertProductionSiteUrl({
        VERCEL_ENV: "production",
        NEXT_PUBLIC_SITE_URL: "https://aiflytrip.com",
      }),
    ).not.toThrow();
  });

  it("does not block previews or local builds", () => {
    expect(() =>
      assertProductionSiteUrl({ VERCEL_ENV: "preview" }),
    ).not.toThrow();
    expect(() => assertProductionSiteUrl({})).not.toThrow();
  });
});

describe("buildContentSecurityPolicy", () => {
  const directive = (csp: string, name: string) =>
    csp.split("; ").find((d) => d.startsWith(`${name} `)) ?? "";

  it("locks down framing, objects and form targets", () => {
    const csp = buildContentSecurityPolicy({});
    expect(directive(csp, "frame-ancestors")).toBe("frame-ancestors 'none'");
    expect(directive(csp, "object-src")).toBe("object-src 'none'");
    expect(directive(csp, "form-action")).toBe(
      "form-action 'self' https://checkout.stripe.com",
    );
    expect(directive(csp, "script-src")).not.toContain("unsafe-eval");
    expect(directive(csp, "script-src")).not.toContain("https:");
  });

  it("allows the Supabase project origin for browser requests", () => {
    const csp = buildContentSecurityPolicy({
      NEXT_PUBLIC_SUPABASE_URL: "https://abc.supabase.co",
    });
    expect(directive(csp, "connect-src")).toContain("https://abc.supabase.co");
    expect(directive(csp, "connect-src")).toContain("wss://abc.supabase.co");
  });

  it("allows Google's ad origins only when ads are on", () => {
    const off = buildContentSecurityPolicy({});
    expect(off).not.toContain("googlesyndication");
    expect(off).not.toContain("frame-src");
    const on = buildContentSecurityPolicy({}, { ads: true });
    for (const name of ["script-src", "frame-src", "img-src", "connect-src"])
      expect(directive(on, name)).toContain("https://*.googlesyndication.com");
    expect(directive(on, "script-src")).not.toContain("unsafe-eval");
    expect(directive(on, "frame-ancestors")).toBe("frame-ancestors 'none'");
  });

  it("adds analytics origins only for the configured provider", () => {
    expect(buildContentSecurityPolicy({})).not.toContain("googletagmanager");
    expect(
      directive(
        buildContentSecurityPolicy({ NEXT_PUBLIC_ANALYTICS_PROVIDER: "ga4" }),
        "script-src",
      ),
    ).toContain("https://www.googletagmanager.com");
    expect(
      directive(
        buildContentSecurityPolicy({
          NEXT_PUBLIC_ANALYTICS_PROVIDER: "plausible",
        }),
        "script-src",
      ),
    ).toContain("https://plausible.io");
  });
});
