import type { MetadataRoute } from "next";

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
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [...PRIVATE_PATHS],
    },
    sitemap: new URL("/sitemap.xml", siteConfig.url).toString(),
  };
}
