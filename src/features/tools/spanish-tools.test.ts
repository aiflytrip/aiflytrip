import { describe, expect, it } from "vitest";

import sitemap from "@/app/sitemap";
import { allContent, isLive } from "@/content/registry";
import { linkTargets } from "@/features/content/components/rich-text";
import { absoluteUrl } from "@/features/seo/metadata";
import { BAG_SIZE_TEXT } from "@/features/tools/bags/bag-size-text";
import { SIZE_PRESETS } from "@/features/tools/bags/bag-size";
import {
  SPANISH_TOOL_KEYS,
  SPANISH_TOOLS,
} from "@/features/tools/spanish-tools";
import {
  alternatesForPath,
  EN_ES_PAGES,
  hasTranslation,
  switchPath,
} from "@/i18n/routes";

const tools = SPANISH_TOOL_KEYS.map((key) => SPANISH_TOOLS[key]);

describe("English and Spanish tools", () => {
  it("are listed in the sitemap with hreflang alternates both ways", () => {
    const entries = sitemap();
    for (const key of SPANISH_TOOL_KEYS) {
      const pair = EN_ES_PAGES[key];
      for (const path of [pair.en, pair.es]) {
        const entry = entries.find((e) => e.url === absoluteUrl(path));
        expect(entry, path).toBeDefined();
        expect(entry!.alternates?.languages).toEqual({
          en: absoluteUrl(pair.en),
          es: absoluteUrl(pair.es),
          "x-default": absoluteUrl(pair.en),
        });
      }
    }
  });

  it("switch language between the pair, and fall back to the French homepage", () => {
    const { en, es } = EN_ES_PAGES.bagSize;
    expect(switchPath(en, "es")).toBe(es);
    expect(switchPath(es, "en")).toBe(en);
    expect(switchPath(en, "fr")).toBe("/fr");
    expect(hasTranslation(en, "es")).toBe(true);
    expect(hasTranslation(en, "fr")).toBe(false);
    expect(alternatesForPath(es)?.fr).toBeUndefined();
  });

  it("keep titles and descriptions within snippet limits", () => {
    for (const { copy } of tools) {
      expect(copy.meta.title.length, copy.meta.title).toBeLessThanOrEqual(60);
      expect(copy.meta.description.length).toBeGreaterThanOrEqual(70);
      expect(copy.meta.description.length).toBeLessThanOrEqual(160);
      expect(copy.faqs.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("only link to pages that exist and are live", () => {
    const known = new Set([
      ...sitemap().map((e) => new URL(e.url).pathname),
      ...allContent()
        .filter(isLive)
        .map((e) => e.path),
    ]);
    for (const { copy, path } of tools) {
      const texts = [
        copy.related,
        ...copy.sections.flatMap((s) => [
          ...(s.paragraphs ?? []),
          ...(s.cards ?? []).map((c) => c.body),
        ]),
      ];
      for (const target of texts.flatMap(linkTargets)) {
        expect(known.has(target), `${path} -> ${target}`).toBe(true);
        expect(target, `${path} links to itself`).not.toBe(path);
      }
    }
  });

  it("translate every size preset in the Spanish checker", () => {
    const labels = Object.values(SIZE_PRESETS)
      .flat()
      .map((p) => p.label);
    for (const label of labels)
      expect(BAG_SIZE_TEXT.es.presets[label], label).toBeDefined();
  });
});
