import type { MetadataRoute } from "next";

import { allContent, isIndexable, latestReview } from "@/content/registry";
import { absoluteUrl } from "@/features/seo/metadata";

/**
 * Indexable pages only. Content pages come from the registry and are
 * included only when they pass the quality gate, so a draft or thin page
 * can never be submitted to search engines.
 */
export const STATIC_PUBLIC_PATHS = [
  "/",
  "/travel-planner",
  "/destinations",
  "/itineraries",
  "/guides",
  "/about",
  "/editorial-policy",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const content = allContent().filter(isIndexable);
  const hubDate = latestReview(content);
  return [
    ...STATIC_PUBLIC_PATHS.map((path) => ({
      url: absoluteUrl(path),
      lastModified: hubDate,
    })),
    ...content.map((entry) => ({
      url: absoluteUrl(entry.path),
      lastModified: entry.lastReviewed,
    })),
  ];
}
