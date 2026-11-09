import {
  citiesOf,
  countries,
  publishedGuides,
  publishedItineraries,
} from "@/content/registry";
import { DESTINATION_COPY } from "@/i18n/pages/destinations";

/** Text for a content page's social card, served at /og/<page path>. */
export type OgTarget = { path: string; eyebrow: string; title: string };

export function ogTargets(): OgTarget[] {
  return [
    ...(["en", "es"] as const).flatMap((locale) =>
      countries(locale).flatMap((country) => [
        {
          path: country.path,
          eyebrow: DESTINATION_COPY[locale].og.country,
          title: country.headline,
        },
        ...citiesOf(country.slug, locale).map((city) => ({
          path: city.path,
          eyebrow: DESTINATION_COPY[locale].og.city,
          title: city.headline,
        })),
      ]),
    ),
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
