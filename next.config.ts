import type { NextConfig } from "next";

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
          value: buildContentSecurityPolicy(process.env),
        },
      ]),
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
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
