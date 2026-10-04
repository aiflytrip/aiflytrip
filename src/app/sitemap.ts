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
  "/destinations",
  "/itineraries",
  "/blog",
  "/about",
  "/editorial-policy",
] as const;

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
    ...STATIC_PUBLIC_PATHS.map((path) => ({
      url: absoluteUrl(path),
      lastModified: hubDate,
    })),
    ...content.map((entry) => ({
      url: absoluteUrl(entry.path),
      lastModified: entry.lastReviewed,
      images: pageImage(entry),
    })),
  ];
}
