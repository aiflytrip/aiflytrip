import { france, paris } from "@/content/data/destinations/france";
import { italy, rome } from "@/content/data/destinations/italy";
import { japan, tokyo } from "@/content/data/destinations/japan";
import { lisbon, portugal } from "@/content/data/destinations/portugal";
import { spanishDestinations } from "@/content/data/destinations/spanish";
import { bagPosts } from "@/content/data/blog-posts-bags";
import { blogPosts } from "@/content/data/blog-posts";
import { spanishPosts } from "@/content/data/blog-posts-es";
import { spanishFlightPosts } from "@/content/data/blog-posts-es-flights";
import { spanishHackPosts } from "@/content/data/blog-posts-es-hacks";
import { spanishPlacePosts } from "@/content/data/blog-posts-es-places";
import { spanishPlanningPosts } from "@/content/data/blog-posts-es-planning";
import { frenchHackPosts } from "@/content/data/blog-posts-fr-hacks";
import { decemberPosts } from "@/content/data/blog-posts-dec-2026";
import { hackPosts } from "@/content/data/blog-posts-hacks";
import { hackPostsTwo } from "@/content/data/blog-posts-hacks-2";
import { novemberPosts } from "@/content/data/blog-posts-nov-2026";
import { octoberPosts } from "@/content/data/blog-posts-oct-2026";
import { guides as planningGuides } from "@/content/data/guides";
import { itineraries as itineraryInputs } from "@/content/data/itineraries";
import { spanishItineraries } from "@/content/data/itineraries-es";
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
import { BLOG_HUB, DESTINATION_HUB, ITINERARY_HUB } from "@/i18n/routes";

/**
 * Single source of truth for public content. Routes, the sitemap, internal
 * links and structured data all read from here, so a page that isn't in
 * the registry can't be linked, listed or rendered (it 404s).
 */

export type Entry<T> = T & { path: string; quality: QualityReport };

/** Indexable = published and passes the quality gate. */
export const isIndexable = (entry: { quality: QualityReport }) =>
  entry.quality.indexable;

export type DestinationLocale = Destination["locale"];

function destinationPath(d: Destination): string {
  const hub = DESTINATION_HUB[d.locale];
  return d.kind === "city"
    ? `${hub}/${d.country}/${d.slug}`
    : `${hub}/${d.slug}`;
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
  ...spanishDestinations,
]
  .map((input) => DestinationSchema.parse(input))
  .map((d) => ({
    ...d,
    path: destinationPath(d),
    quality: assessDestination(d),
  }));

export type ItineraryLocale = Itinerary["locale"];

export const itineraries: Entry<Itinerary>[] = [
  ...itineraryInputs,
  ...spanishItineraries,
]
  .map((input) => ItinerarySchema.parse(input))
  .map((it) => ({
    ...it,
    path: `${ITINERARY_HUB[it.locale]}/${it.slug}`,
    quality: assessItinerary(it),
  }));

const guideInputs = [
  ...bagPosts,
  ...hackPosts,
  ...hackPostsTwo,
  ...decemberPosts,
  ...novemberPosts,
  ...octoberPosts,
  ...blogPosts,
  ...planningGuides,
  ...spanishPosts,
  ...spanishFlightPosts,
  ...spanishHackPosts,
  ...frenchHackPosts,
  ...spanishPlanningPosts,
  ...spanishPlacePosts,
];

export type GuideLocale = Guide["locale"];

const guidePath = (g: Guide) => `${BLOG_HUB[g.locale]}/${g.slug}`;

export const guides: Entry<Guide>[] = guideInputs
  .map((input) => GuideSchema.parse(input))
  .map((g) => ({ ...g, path: guidePath(g), quality: assessGuide(g) }));

/** Today's date (UTC), evaluated per call so scheduled posts appear on time. */
const today = () => new Date().toISOString().slice(0, 10);

/** Live = published and past any scheduled publish date. */
export const isLive = (item: { status: string; publishAt?: string }) =>
  item.status === "published" && (!item.publishAt || item.publishAt <= today());

/** Only live content is routable; drafts and scheduled posts 404. */
const published = <T extends { status: string; publishAt?: string }>(
  items: T[],
) => items.filter(isLive);

export const countries = (locale: DestinationLocale = "en") =>
  published(destinations).filter(
    (d) => d.kind === "country" && d.locale === locale,
  );
export const citiesOf = (country: string, locale: DestinationLocale = "en") =>
  published(destinations).filter(
    (d) => d.kind === "city" && d.country === country && d.locale === locale,
  );
export const getCountry = (slug: string, locale: DestinationLocale = "en") =>
  countries(locale).find((d) => d.slug === slug);
export const getCity = (
  country: string,
  slug: string,
  locale: DestinationLocale = "en",
) => citiesOf(country, locale).find((d) => d.slug === slug);
export const getItinerary = (slug: string, locale: ItineraryLocale = "en") =>
  published(itineraries).find((i) => i.slug === slug && i.locale === locale);
export const getGuide = (slug: string, locale: GuideLocale = "en") =>
  published(guides).find((g) => g.slug === slug && g.locale === locale);
export const publishedItineraries = (locale: ItineraryLocale = "en") =>
  published(itineraries).filter((i) => i.locale === locale);
export const publishedGuides = (locale: GuideLocale = "en") =>
  published(guides).filter((g) => g.locale === locale);

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
