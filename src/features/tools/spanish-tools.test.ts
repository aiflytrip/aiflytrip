import { describe, expect, it } from "vitest";

import sitemap from "@/app/sitemap";
import { allContent, isLive } from "@/content/registry";
import { linkTargets } from "@/features/content/components/rich-text";
import { absoluteUrl } from "@/features/seo/metadata";
import { BAG_SIZE_TEXT } from "@/features/tools/bags/bag-size-text";
import { SIZE_PRESETS } from "@/features/tools/bags/bag-size";
import { FEES_TEXT } from "@/features/tools/bags/baggage-fees-text";
import { ITEMS } from "@/features/tools/bags/luggage-weight";
import { WEIGHT_TEXT } from "@/features/tools/bags/luggage-weight-text";
import {
  DEFAULT_PACKING,
  generatePackingList,
  type PackingInput,
} from "@/features/tools/packing/packing";
import { PACKING_ES } from "@/features/tools/packing/packing-text";
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

  it("switch language between each pair, and fall back to the French homepage", () => {
    for (const { en, es } of Object.values(EN_ES_PAGES)) {
      expect(switchPath(en, "es")).toBe(es);
      expect(switchPath(es, "en")).toBe(en);
      expect(switchPath(en, "fr")).toBe("/fr");
      expect(hasTranslation(en, "es")).toBe(true);
      expect(hasTranslation(en, "fr")).toBe(false);
      expect(alternatesForPath(es)?.fr).toBeUndefined();
    }
  });

  it("keep Spanish titles unique", () => {
    const titles = tools.map((t) => t.copy.meta.title);
    expect(new Set(titles).size).toBe(titles.length);
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

  it("translate every item, and every item worth wearing, in the Spanish weight calculator", () => {
    for (const item of ITEMS) {
      expect(WEIGHT_TEXT.es.items[item.id], item.id).toBeDefined();
      if ("wearable" in item)
        expect(WEIGHT_TEXT.es.wear[item.id], item.id).toBeDefined();
    }
  });

  it("never state prices as facts", () => {
    for (const { copy, path } of tools)
      expect(JSON.stringify(copy), path).not.toMatch(/[$€£¥]\s?\d/);
    expect(Object.keys(FEES_TEXT.es.fields)).toEqual(
      Object.keys(FEES_TEXT.en.fields),
    );
  });

  it("translate every packing list title, item and note for every combination of options", () => {
    const flags = [
      "laundry",
      "international",
      "beach",
      "hiking",
      "business",
      "smart",
      "child",
    ] as const;
    const missing = new Set<string>();
    for (const climate of ["warm", "mild", "cold"] as const)
      for (const luggage of ["carry-on", "checked"] as const)
        for (const days of [1, 7, 30])
          for (let mask = 0; mask < 1 << flags.length; mask++) {
            const input: PackingInput = {
              ...DEFAULT_PACKING,
              climate,
              luggage,
              days,
            };
            flags.forEach((f, k) => (input[f] = Boolean(mask & (1 << k))));
            for (const c of generatePackingList(input).categories) {
              if (!PACKING_ES[c.title]) missing.add(c.title);
              for (const it of c.items) {
                if (!PACKING_ES[it.label]) missing.add(it.label);
                if (it.note && !PACKING_ES[it.note]) missing.add(it.note);
              }
            }
          }
    expect([...missing]).toEqual([]);
  });

  it("builds the Spanish list with the same items as the English one", () => {
    const en = generatePackingList({ ...DEFAULT_PACKING, days: 20 });
    const es = generatePackingList({ ...DEFAULT_PACKING, days: 20 }, "es");
    expect(es.itemCount).toBe(en.itemCount);
    expect(es.tips).toHaveLength(en.tips.length);
    expect(es.tips[0]).toContain("20 días");
  });
});
