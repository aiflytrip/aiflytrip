import {
  getDestinationByPath,
  getGuide,
  getItinerary,
  type Entry,
} from "@/content/registry";
import { type Destination } from "@/content/schema";
import { type RelatedLink } from "@/features/content/components/blocks";

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
            title: `${d.name} travel guide`,
            description: d.description,
          },
        ]
      : [];
  });
}

export function itineraryLinks(slugs: string[]): RelatedLink[] {
  return slugs.flatMap((slug) => {
    const it = getItinerary(slug);
    return it
      ? [{ href: it.path, title: it.name, description: it.description }]
      : [];
  });
}

export function guideLinks(slugs: string[]): RelatedLink[] {
  return slugs.flatMap((slug) => {
    const g = getGuide(slug);
    return g
      ? [{ href: g.path, title: g.headline, description: g.description }]
      : [];
  });
}

/** Planner link, prefilled with a destination airport when one is supported. */
export function plannerHref(
  destination: Pick<Entry<Destination>, "airports">,
): string {
  const airport = destination.airports[0];
  return airport ? `/plan?to=${airport}` : "/plan";
}
