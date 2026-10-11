/**
 * Deployment-environment rules shared by next.config.ts and robots.ts.
 * Pure functions of an env object so they can be unit tested.
 */

type Env = Record<string, string | undefined>;

/**
 * True for the deployment that should be crawled: Vercel production, or any
 * non-Vercel production server (self-hosted `next start`). Vercel preview
 * and development deployments are not public.
 */
export function isPublicDeployment(env: Env): boolean {
  if (env.VERCEL_ENV) return env.VERCEL_ENV === "production";
  return true;
}

export function assertProductionSiteUrl(env: Env): void {
  if (env.VERCEL_ENV !== "production") return;
  const raw = env.NEXT_PUBLIC_SITE_URL;
  let url: URL | undefined;
  try {
    url = raw ? new URL(raw) : undefined;
  } catch {
    url = undefined;
  }
  if (
    !url ||
    url.protocol !== "https:" ||
    ["localhost", "127.0.0.1"].includes(url.hostname)
  ) {
    throw new Error(
      "NEXT_PUBLIC_SITE_URL must be set to the production https origin (e.g. https://aiflytrip.com) for production builds.",
    );
  }
}

const origin = (value: string | undefined): string | undefined => {
  try {
    return value ? new URL(value).origin : undefined;
  } catch {
    return undefined;
  }
};

const GOOGLE_ADS_ORIGINS = [
  "https://*.googlesyndication.com",
  "https://*.doubleclick.net",
  "https://*.google.com",
  "https://*.gstatic.com",
  "https://*.googleadservices.com",
  "https://*.adtrafficquality.google",
];

/**
 * CSP without nonces, so pages stay statically rendered (Next.js guide:
 * "Without Nonces"). Inline scripts are allowed for Next.js bootstrapping;
 * everything else is restricted to known origins.
 */
export function buildContentSecurityPolicy(
  env: Env,
  options: { ads?: boolean } = {},
): string {
  const supabase = origin(env.NEXT_PUBLIC_SUPABASE_URL);
  const provider = env.NEXT_PUBLIC_ANALYTICS_PROVIDER?.trim().toLowerCase();
  const scriptSrc = ["'self'", "'unsafe-inline'"];
  const connectSrc = ["'self'"];
  const imgSrc = ["'self'", "data:", "blob:"];
  const styleSrc = ["'self'", "'unsafe-inline'"];
  const fontSrc = ["'self'"];
  const frameSrc: string[] = [];
  if (options.ads) {
    // AdSense loads scripts, ad frames and its consent message from these
    // Google domains. Ad creatives themselves render inside Google's frames.
    scriptSrc.push(...GOOGLE_ADS_ORIGINS);
    connectSrc.push(...GOOGLE_ADS_ORIGINS);
    imgSrc.push(...GOOGLE_ADS_ORIGINS);
    frameSrc.push(...GOOGLE_ADS_ORIGINS);
    styleSrc.push("https://fonts.googleapis.com");
    fontSrc.push("https://fonts.gstatic.com");
  }
  if (supabase) connectSrc.push(supabase, supabase.replace(/^https:/, "wss:"));
  if (provider === "plausible") {
    const plausible =
      origin(env.NEXT_PUBLIC_PLAUSIBLE_SCRIPT_SRC) ?? "https://plausible.io";
    scriptSrc.push(plausible);
    connectSrc.push(plausible);
  }
  if (provider === "ga4") {
    scriptSrc.push("https://www.googletagmanager.com");
    connectSrc.push(
      "https://*.google-analytics.com",
      "https://*.analytics.google.com",
      "https://www.googletagmanager.com",
    );
  }
  return [
    "default-src 'self'",
    `script-src ${scriptSrc.join(" ")}`,
    `style-src ${styleSrc.join(" ")}`,
    `img-src ${imgSrc.join(" ")}`,
    `font-src ${fontSrc.join(" ")}`,
    `connect-src ${connectSrc.join(" ")}`,
    ...(frameSrc.length > 0 ? [`frame-src ${frameSrc.join(" ")}`] : []),
    "object-src 'none'",
    "base-uri 'self'",
    // Checkout is a redirect to Stripe-hosted pages after a form POST.
    "form-action 'self' https://checkout.stripe.com",
    "frame-ancestors 'none'",
  ].join("; ");
}
