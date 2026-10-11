/**
 * Google AdSense. The publisher id is a public identifier, not a secret.
 * It also appears in public/ads.txt (without the "ca-" prefix); keep the two
 * in step. Set to "" to remove the AdSense script, meta tag and CSP origins.
 *
 * No relative or aliased imports here: next.config.ts loads this file.
 */
export const ADSENSE_CLIENT = "ca-pub-2246679450643326";

/**
 * Pages that never load the ad script: private pages (their URLs contain
 * plan ids), the planner form and the sign-in pages.
 */
export const AD_FREE_PATHS = [
  "/account",
  "/plan",
  "/plans",
  "/auth",
  "/login",
  "/signup",
  "/es/planificar",
  "/fr/planifier",
] as const;

export function isAdFreePath(pathname: string): boolean {
  return AD_FREE_PATHS.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}
