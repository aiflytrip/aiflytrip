import { describe, expect, it } from "vitest";

import { STATIC_PUBLIC_PATHS, TRANSLATED_PATHS } from "@/app/sitemap";
import { allContent, isLive } from "@/content/registry";
import { linkTargets } from "@/features/content/components/rich-text";
import { LOCALES } from "@/i18n/config";
import { SITE_MESSAGES } from "@/i18n/messages/site";
import { HOME_COPY } from "@/i18n/pages/home";
import { FLIGHTS_PATH, ROUTES } from "@/i18n/routes";
import { TOOLS_COPY } from "@/i18n/pages/tools";

const known = new Set<string>([
  ...STATIC_PUBLIC_PATHS,
  ...TRANSLATED_PATHS,
  ...Object.values(ROUTES.planner),
  ...Object.values(FLIGHTS_PATH),
  "/photo-credits",
  ...allContent()
    .filter(isLive)
    .map((entry) => entry.path),
]);
const clean = (href: string) => href.split(/[?#]/)[0]!;

describe("translations", () => {
  it("only link to pages that exist and are live", () => {
    for (const locale of LOCALES) {
      const tools = TOOLS_COPY[locale];
      const texts = [tools.budget, tools.layover, tools.days].flatMap(
        (page) => [
          page.related,
          ...page.sections.flatMap((s) => [
            ...(s.paragraphs ?? []),
            ...(s.cards ?? []).map((c) => c.body),
          ]),
        ],
      );
      for (const target of texts.flatMap(linkTargets))
        expect(known.has(clean(target)), `${locale}: ${target}`).toBe(true);

      const chrome = SITE_MESSAGES[locale];
      const hrefs = [
        ...chrome.nav,
        ...chrome.footer.columns.flatMap((c) => c.links),
        ...(HOME_COPY[locale].englishGuides?.links ?? []),
      ].map((l) => l.href);
      for (const href of hrefs)
        expect(known.has(clean(href)), `${locale}: ${href}`).toBe(true);
    }
  });

  it("keep titles and descriptions within search result limits", () => {
    for (const locale of LOCALES) {
      const pages = [
        HOME_COPY[locale].meta,
        TOOLS_COPY[locale].hub.meta,
        TOOLS_COPY[locale].budget.meta,
        TOOLS_COPY[locale].layover.meta,
        TOOLS_COPY[locale].days.meta,
      ];
      for (const { title, description } of pages) {
        expect(title.length, `${locale}: ${title}`).toBeLessThanOrEqual(62);
        expect(
          description.length,
          `${locale}: ${description}`,
        ).toBeGreaterThanOrEqual(70);
        expect(
          description.length,
          `${locale}: ${description}`,
        ).toBeLessThanOrEqual(160);
      }
    }
  });

  it("flag links to English-only pages in Spanish and French copy", () => {
    const notes = { es: "en inglés", fr: "en anglais" } as const;
    for (const locale of ["es", "fr"] as const) {
      const tools = TOOLS_COPY[locale];
      for (const page of [tools.budget, tools.layover, tools.days]) {
        const texts = [
          page.related,
          ...page.sections.flatMap((s) => [
            ...(s.paragraphs ?? []),
            ...(s.cards ?? []).map((c) => c.body),
          ]),
        ];
        for (const text of texts) {
          const english = linkTargets(text).filter(
            (t) => !t.startsWith(`/${locale}`) && !t.startsWith("/plan"),
          );
          if (english.length > 0)
            expect(text, `${locale}: ${text.slice(0, 60)}`).toContain(
              notes[locale],
            );
        }
      }
    }
  });
});
