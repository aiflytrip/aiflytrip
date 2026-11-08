import { describe, expect, it } from "vitest";

import { LOCALES } from "@/i18n/config";
import {
  alternatesForPath,
  BLOG_TRANSLATIONS,
  hasTranslation,
  languageAlternates,
  localeForPath,
  plannerHref,
  ROUTE_KEYS,
  ROUTES,
  routeKeyForPath,
  switchPath,
} from "@/i18n/routes";

describe("translated routes", () => {
  it("gives every page a unique URL per language with the right prefix", () => {
    const all = ROUTE_KEYS.flatMap((key) => LOCALES.map((l) => ROUTES[key][l]));
    expect(new Set(all).size).toBe(all.length);
    for (const key of ROUTE_KEYS) {
      expect(localeForPath(ROUTES[key].en)).toBe("en");
      expect(ROUTES[key].es.startsWith("/es")).toBe(true);
      expect(ROUTES[key].fr.startsWith("/fr")).toBe(true);
    }
  });

  it("switches to the same page in another language", () => {
    expect(switchPath("/tools/how-many-days", "es")).toBe(
      "/es/herramientas/cuantos-dias",
    );
    expect(switchPath("/fr/outils/combien-de-jours/", "en")).toBe(
      "/tools/how-many-days",
    );
    expect(routeKeyForPath("/es")).toBe("home");
  });

  it("falls back to the homepage for English-only pages", () => {
    expect(switchPath("/blog/cheap-flight-tips", "fr")).toBe("/fr");
    expect(localeForPath("/blog/cheap-flight-tips")).toBe("en");
    expect(localeForPath("/estonia")).toBe("en");
  });

  it("builds reciprocal hreflang alternates with an English x-default", () => {
    for (const key of ROUTE_KEYS) {
      const alt = languageAlternates(key);
      expect(alt["x-default"]).toBe(alt.en);
      for (const l of LOCALES) expect(alt[l]).toBe(ROUTES[key][l]);
    }
  });

  it("switches blog posts that have a Spanish version, and only to Spanish", () => {
    expect(switchPath("/blog/how-airline-pricing-works", "es")).toBe(
      "/es/blog/como-fijan-las-aerolineas-el-precio-de-los-vuelos",
    );
    expect(switchPath("/es/blog/ejemplo-de-itinerario-de-viaje/", "en")).toBe(
      "/blog/how-to-build-a-travel-itinerary",
    );
    expect(switchPath("/blog", "es")).toBe("/es/blog");
    // No French blog: French goes to the French homepage, with no banner.
    expect(switchPath("/blog/how-airline-pricing-works", "fr")).toBe("/fr");
    expect(hasTranslation("/blog/how-airline-pricing-works", "fr")).toBe(false);
    expect(hasTranslation("/blog/how-airline-pricing-works", "es")).toBe(true);
    expect(hasTranslation("/blog/a-post-with-no-spanish-version", "es")).toBe(
      false,
    );
    expect(localeForPath("/es/blog/ejemplo-de-itinerario-de-vuelo")).toBe("es");
  });

  it("builds reciprocal English and Spanish alternates for blog pairs", () => {
    for (const [en, es] of Object.entries(BLOG_TRANSLATIONS)) {
      const fromEn = alternatesForPath(`/blog/${en}`);
      const fromEs = alternatesForPath(`/es/blog/${es}`);
      expect(fromEn).toEqual(fromEs);
      expect(fromEn).toEqual({
        en: `/blog/${en}`,
        es: `/es/blog/${es}`,
        "x-default": `/blog/${en}`,
      });
    }
    expect(
      alternatesForPath("/blog/a-post-with-no-spanish-version"),
    ).toBeUndefined();
  });

  it("links to the planner form in each language", () => {
    expect(plannerHref("en")).toBe("/plan");
    expect(plannerHref("fr")).toBe("/fr/planifier");
    expect(switchPath("/plan", "es")).toBe("/es/planificar");
  });
});
