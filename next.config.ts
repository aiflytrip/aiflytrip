import type { NextConfig } from "next";

import { ADSENSE_CLIENT } from "./src/config/ads";
import {
  assertProductionSiteUrl,
  buildContentSecurityPolicy,
  isPublicDeployment,
} from "./src/config/deployment";

// Fails a Vercel production build when NEXT_PUBLIC_SITE_URL is missing,
// non-https or localhost: canonicals, the sitemap and auth email links are
// baked in at build time and would otherwise point at the wrong origin.
assertProductionSiteUrl(process.env);

const isDev = process.env.NODE_ENV === "development";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  ...(isDev
    ? []
    : [
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains",
        },
        {
          key: "Content-Security-Policy",
          value: buildContentSecurityPolicy(process.env, {
            ads: Boolean(ADSENSE_CLIENT),
          }),
        },
      ]),
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Each language has its own root layout (for <html lang>), so URLs that
  // match no route use app/global-not-found.tsx.
  experimental: { globalNotFound: true },
  images: {
    formats: ["image/avif", "image/webp"],
    // Only our own photos may be optimized (no open image proxy).
    localPatterns: [{ pathname: "/images/**", search: "" }],
    qualities: [75],
  },
  // The Guides section became the Blog: keep old links and search signals.
  async redirects() {
    return [
      { source: "/guides", destination: "/blog", permanent: true },
      { source: "/guides/:slug", destination: "/blog/:slug", permanent: true },
      // One public host: the default Vercel address would otherwise serve
      // an indexable copy of the site.
      ...(process.env.VERCEL_ENV === "production"
        ? [
            {
              source: "/:path*",
              has: [{ type: "host" as const, value: "aiflytrip.vercel.app" }],
              destination: "https://aiflytrip.com/:path*",
              permanent: true,
            },
          ]
        : []),
    ];
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // Preview and other non-production deployments must never be indexed.
      ...(isPublicDeployment(process.env)
        ? []
        : [
            {
              source: "/:path*",
              headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
            },
          ]),
    ];
  },
};

export default nextConfig;
