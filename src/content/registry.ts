import { france, paris } from "@/content/data/destinations/france";
import { italy, rome } from "@/content/data/destinations/italy";
import { japan, tokyo } from "@/content/data/destinations/japan";
import { lisbon, portugal } from "@/content/data/destinations/portugal";
import { blogPosts } from "@/content/data/blog-posts";
import { decemberPosts } from "@/content/data/blog-posts-dec-2026";
import { novemberPosts } from "@/content/data/blog-posts-nov-2026";
import { octoberPosts } from "@/content/data/blog-posts-oct-2026";
import { guides as planningGuides } from "@/content/data/guides";
import { itineraries as itineraryInputs } from "@/content/data/itineraries";
import {
  assessDestination,
  assessGuide,
  assessItinerary,
  type QualityReport,
} from "@/content/quality";
import {
  DestinationSchema,
  GuideSchema,
  ItinerarySchema,
  type Destination,
  type Guide,
  type Itinerary,
} from "@/content/schema";

/**
 * Single source of truth for public content. Routes, the sitemap, internal
 * links and structured data all read from here, so a page that isn't in
 * the registry can't be linked, listed or rendered (it 404s).
 */

export type Entry<T> = T & { path: string; quality: QualityReport };

/** Indexable = published and passes the quality gate. */
export const isIndexable = (entry: { quality: QualityReport }) =>
  entry.quality.indexable;

function destinationPath(d: Destination): string {
  return d.kind === "city"
    ? `/destinations/${d.country}/${d.slug}`
    : `/destinations/${d.slug}`;
}

export const destinations: Entry<Destination>[] = [
  france,
  paris,
  italy,
  rome,
  japan,
  tokyo,
  portugal,
  lisbon,
]
  .map((input) => DestinationSchema.parse(input))
  .map((d) => ({
    ...d,
    path: destinationPath(d),
    quality: assessDestination(d),
  }));

export const itineraries: Entry<Itinerary>[] = itineraryInputs
  .map((input) => ItinerarySchema.parse(input))
  .map((it) => ({
    ...it,
    path: `/itineraries/${it.slug}`,
    quality: assessItinerary(it),
  }));

const guideInputs = [
  ...decemberPosts,
  ...novemberPosts,
  ...octoberPosts,
  ...blogPosts,
  ...planningGuides,
];

export const guides: Entry<Guide>[] = guideInputs
  .map((input) => GuideSchema.parse(input))
  .map((g) => ({ ...g, path: `/blog/${g.slug}`, quality: assessGuide(g) }));

/** Today's date (UTC), evaluated per call so scheduled posts appear on time. */
const today = () => new Date().toISOString().slice(0, 10);

/** Live = published and past any scheduled publish date. */
export const isLive = (item: { status: string; publishAt?: string }) =>
  item.status === "published" && (!item.publishAt || item.publishAt <= today());

/** Only live content is routable; drafts and scheduled posts 404. */
const published = <T extends { status: string; publishAt?: string }>(
  items: T[],
) => items.filter(isLive);

export const countries = () =>
  published(destinations).filter((d) => d.kind === "country");
export const citiesOf = (country: string) =>
  published(destinations).filter(
    (d) => d.kind === "city" && d.country === country,
  );
export const getCountry = (slug: string) =>
  countries().find((d) => d.slug === slug);
export const getCity = (country: string, slug: string) =>
  citiesOf(country).find((d) => d.slug === slug);
export const getItinerary = (slug: string) =>
  published(itineraries).find((i) => i.slug === slug);
export const getGuide = (slug: string) =>
  published(guides).find((g) => g.slug === slug);
export const publishedItineraries = () => published(itineraries);
export const publishedGuides = () => published(guides);

export const getDestinationByPath = (path: string) =>
  published(destinations).find((d) => d.path === path);

/** Every content entry with its path and title, for link resolution and tests. */
export function allContent() {
  return [
    ...published(destinations),
    ...published(itineraries),
    ...published(guides),
  ];
}

/** Latest review date across content, used for hub pages' lastModified. */
export function latestReview(items: { lastReviewed: string }[]): string {
  return (
    items
      .map((i) => i.lastReviewed)
      .sort()
      .at(-1) ?? "2026-10-02"
  );
}
