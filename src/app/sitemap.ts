import type { MetadataRoute } from "next";

import { blogPhoto, destinationPhoto } from "@/content/data/photos";
import {
  allContent,
  getDestinationByPath,
  isIndexable,
  latestReview,
  type Entry,
} from "@/content/registry";
import { type Destination, type Guide, type Itinerary } from "@/content/schema";
import { absoluteUrl } from "@/features/seo/metadata";
import { ENGLISH_TOOL_PATHS } from "@/features/tools/english-tools";
import { SPANISH_TOOL_PATHS } from "@/features/tools/spanish-tools";
import { LOCALES } from "@/i18n/config";
import {
  alternatesForPath,
  BLOG_HUB,
  INDEXABLE_ROUTE_KEYS,
  ROUTES,
} from "@/i18n/routes";

/**
 * Indexable pages only. Content pages come from the registry and are
 * included only when they pass the quality gate, so a draft or thin page
 * can never be submitted to search engines.
 */
// Scheduled posts go live on their publish date without a redeploy:
// pages regenerate at most hourly (ISR).
export const revalidate = 3600;

export const STATIC_PUBLIC_PATHS = [
  "/",
  "/travel-planner",
  "/tools",
  "/tools/trip-budget-calculator",
  "/tools/layover-time-checker",
  "/tools/how-many-days",
  ...ENGLISH_TOOL_PATHS,
  "/destinations",
  "/itineraries",
  "/blog",
  "/about",
  "/editorial-policy",
  "/contact",
  "/privacy",
  "/terms",
] as const;

/**
 * Spanish and French versions of the translated pages, the Spanish blog and
 * the tools that exist in English and Spanish only.
 */
export const TRANSLATED_PATHS = [
  ...INDEXABLE_ROUTE_KEYS.flatMap((key) =>
    LOCALES.filter((l) => l !== "en").map((l) => ROUTES[key][l]),
  ),
  BLOG_HUB.es,
  ...SPANISH_TOOL_PATHS,
];

/** hreflang alternates (absolute URLs) for a page that has translations. */
function alternatesFor(path: string) {
  const alternates = alternatesForPath(path);
  if (!alternates) return {};
  const languages = Object.fromEntries(
    Object.entries(alternates).map(([lang, href]) => [lang, absoluteUrl(href)]),
  );
  return { alternates: { languages } };
}

/** The page's main photo, listed so it can appear in image search. */
function pageImage(
  entry: Entry<Destination> | Entry<Itinerary> | Entry<Guide>,
): string[] {
  const photo =
    "kind" in entry
      ? destinationPhoto(entry.slug)
      : "destination" in entry
        ? destinationPhoto(getDestinationByPath(entry.destination)?.slug ?? "")
        : blogPhoto(entry.photo);
  return photo ? [absoluteUrl(photo.src)] : [];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const content = allContent().filter(isIndexable);
  const hubDate = latestReview(content);
  return [
    ...[...STATIC_PUBLIC_PATHS, ...TRANSLATED_PATHS].map((path) => ({
      url: absoluteUrl(path),
      lastModified: hubDate,
      ...alternatesFor(path),
    })),
    ...content.map((entry) => ({
      url: absoluteUrl(entry.path),
      lastModified: entry.lastReviewed,
      images: pageImage(entry),
      ...alternatesFor(entry.path),
    })),
  ];
}
