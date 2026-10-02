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

export const env = {
  siteUrl: parseSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
} as const;
