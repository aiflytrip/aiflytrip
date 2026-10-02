import type { MetadataRoute } from "next";

import { isPublicDeployment } from "@/config/deployment";
import { siteConfig } from "@/config/site";

/**
 * Private, per-user and API routes are kept out of crawl budget. Login and
 * signup (and /flights, which uses test data) stay crawlable so their noindex
 * tag is seen: blocking them here would hide that tag from crawlers.
 */
export const PRIVATE_PATHS = [
  "/api/",
  "/account",
  "/plan",
  "/plans",
  "/auth/",
] as const;

export default function robots(): MetadataRoute.Robots {
  // Preview deployments: block everything (they also send X-Robots-Tag).
  if (!isPublicDeployment(process.env)) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [...PRIVATE_PATHS],
    },
    sitemap: new URL("/sitemap.xml", siteConfig.url).toString(),
  };
}
