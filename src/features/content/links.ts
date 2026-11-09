import {
  getDestinationByPath,
  getGuide,
  getItinerary,
  type Entry,
} from "@/content/registry";
import { type Destination, type Guide, type Itinerary } from "@/content/schema";
import { type RelatedLink } from "@/features/content/components/blocks";
import { DESTINATION_COPY } from "@/i18n/pages/destinations";
import { ROUTES } from "@/i18n/routes";

/**
 * Resolves related-content references to links. Unknown or unpublished
 * references are dropped (and flagged by the content tests), so a page can
 * never link to a 404.
 */
export function destinationLinks(paths: string[]): RelatedLink[] {
  return paths.flatMap((path) => {
    const d = getDestinationByPath(path);
    return d
      ? [
          {
            href: d.path,
            title: DESTINATION_COPY[d.locale].linkTitle(d.name),
            description: d.description,
          },
        ]
      : [];
  });
}

export function itineraryLinks(
  slugs: string[],
  locale: Itinerary["locale"] = "en",
): RelatedLink[] {
  return slugs.flatMap((slug) => {
    const it = getItinerary(slug, locale);
    return it
      ? [{ href: it.path, title: it.name, description: it.description }]
      : [];
  });
}

export function guideLinks(
  slugs: string[],
  locale: Guide["locale"] = "en",
): RelatedLink[] {
  return slugs.flatMap((slug) => {
    const g = getGuide(slug, locale);
    return g
      ? [{ href: g.path, title: g.headline, description: g.description }]
      : [];
  });
}

/**
 * Planner link in the page's language, prefilled with a destination
 * airport when one is supported.
 */
export function plannerHref(
  destination: Pick<Entry<Destination>, "airports">,
  locale: Destination["locale"] = "en",
): string {
  const planner = ROUTES.planner[locale];
  const airport = destination.airports[0];
  return airport ? `${planner}?to=${airport}` : planner;
}
