/**
 * Validated access to environment variables.
 *
 * Read `process.env.NEXT_PUBLIC_*` with literal property names only: Next.js
 * inlines those at build time and cannot inline dynamic lookups.
 * Server-only secrets added in later phases belong in a separate
 * `server-env.ts` guarded by `import "server-only"`.
 */

const DEFAULT_SITE_URL = "http://localhost:3000";

function parseSiteUrl(value: string | undefined): URL {
  if (!value) return new URL(DEFAULT_SITE_URL);

  try {
    return new URL(value);
  } catch {
    throw new Error(
      `NEXT_PUBLIC_SITE_URL must be an absolute URL (e.g. https://aiflytrip.com), received "${value}".`,
    );
  }
}

export type AnalyticsConfig =
  | { provider: "none" }
  | { provider: "plausible"; domain: string; scriptSrc: string }
  | { provider: "ga4"; measurementId: string };

/**
 * Analytics is opt-in: nothing loads unless NEXT_PUBLIC_ANALYTICS_PROVIDER
 * is set. Invalid combinations fall back to "none" instead of breaking pages.
 */
export function parseAnalytics(input: {
  provider?: string;
  plausibleDomain?: string;
  plausibleSrc?: string;
  gaId?: string;
}): AnalyticsConfig {
  const provider = input.provider?.trim().toLowerCase();
  if (provider === "plausible" && input.plausibleDomain) {
    const src = input.plausibleSrc || "https://plausible.io/js/script.js";
    return src.startsWith("https://")
      ? { provider: "plausible", domain: input.plausibleDomain, scriptSrc: src }
      : { provider: "none" };
  }
  if (provider === "ga4" && input.gaId && /^G-[A-Z0-9]+$/.test(input.gaId)) {
    return { provider: "ga4", measurementId: input.gaId };
  }
  return { provider: "none" };
}

export const env = {
  siteUrl: parseSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
  analytics: parseAnalytics({
    provider: process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER,
    plausibleDomain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN,
    plausibleSrc: process.env.NEXT_PUBLIC_PLAUSIBLE_SCRIPT_SRC,
    gaId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
  }),
} as const;
