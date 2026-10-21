import {
  citiesOf,
  countries,
  publishedGuides,
  publishedItineraries,
} from "@/content/registry";

/** Text for a content page's social card, served at /og/<page path>. */
export type OgTarget = { path: string; eyebrow: string; title: string };

export function ogTargets(): OgTarget[] {
  return [
    ...countries().flatMap((country) => [
      {
        path: country.path,
        eyebrow: "Destination guide",
        title: country.headline,
      },
      ...citiesOf(country.slug).map((city) => ({
        path: city.path,
        eyebrow: "City guide",
        title: city.headline,
      })),
    ]),
    ...publishedItineraries().map((it) => ({
      path: it.path,
      eyebrow: `${it.days}-day itinerary`,
      title: it.name,
    })),
    ...publishedGuides().map((g) => ({
      path: g.path,
      eyebrow: "Travel planning guide",
      title: g.headline,
    })),
    ...publishedGuides("es").map((g) => ({
      path: g.path,
      eyebrow: "Guía de viaje",
      title: g.headline,
    })),
  ];
}

/** Social card URL for a content page. */
export const ogImagePath = (pagePath: string) => `/og${pagePath}`;
