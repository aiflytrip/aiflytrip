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
  LOCALIZED_TOOL_KEYS,
  LOCALIZED_TOOLS,
  type ToolLocale,
} from "@/features/tools/localized-tools";
import {
  DEFAULT_PACKING,
  generatePackingList,
  type PackingInput,
} from "@/features/tools/packing/packing";
import { PACKING_TRANSLATIONS } from "@/features/tools/packing/packing-text";
import {
  hasTranslation,
  languageAlternates,
  route,
  switchPath,
} from "@/i18n/routes";

const LOCALES: ToolLocale[] = ["es", "fr"];

describe("packing and baggage tools in Spanish and French", () => {
  it("use the ROUTES path in each language and are in the sitemap with alternates", () => {
    const entries = sitemap();
    for (const key of LOCALIZED_TOOL_KEYS) {
      const alternates = Object.fromEntries(
        Object.entries(languageAlternates(key)).map(([l, p]) => [
          l,
          absoluteUrl(p),
        ]),
      );
      for (const locale of ["en", ...LOCALES] as const) {
        const path = route(key, locale);
        if (locale !== "en")
          expect(LOCALIZED_TOOLS[locale][key].path).toBe(path);
        const entry = entries.find((e) => e.url === absoluteUrl(path));
        expect(entry, path).toBeDefined();
        expect(entry!.alternates?.languages).toEqual(alternates);
      }
    }
  });

  it("switch language between all three versions", () => {
    for (const key of LOCALIZED_TOOL_KEYS) {
      for (const from of ["en", ...LOCALES] as const)
        for (const to of ["en", ...LOCALES] as const) {
          expect(switchPath(route(key, from), to)).toBe(route(key, to));
          expect(hasTranslation(route(key, from), to)).toBe(true);
        }
    }
  });

  it("keep titles unique and within snippet limits", () => {
    for (const locale of LOCALES) {
      const tools = LOCALIZED_TOOL_KEYS.map((k) => LOCALIZED_TOOLS[locale][k]);
      const titles = tools.map((t) => t.copy.meta.title);
      expect(new Set(titles).size).toBe(titles.length);
      for (const { copy } of tools) {
        expect(copy.meta.title.length, copy.meta.title).toBeLessThanOrEqual(60);
        expect(copy.meta.description.length).toBeGreaterThanOrEqual(70);
        expect(copy.meta.description.length).toBeLessThanOrEqual(160);
        expect(copy.faqs.length).toBeGreaterThanOrEqual(3);
      }
    }
  });

  it("only link to live pages in the same language", () => {
    const known = new Set([
      ...sitemap().map((e) => new URL(e.url).pathname),
      ...allContent()
        .filter(isLive)
        .map((e) => e.path),
    ]);
    for (const locale of LOCALES)
      for (const key of LOCALIZED_TOOL_KEYS) {
        const { copy, path } = LOCALIZED_TOOLS[locale][key];
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
          expect(target.startsWith(`/${locale}/`), `${path} -> ${target}`).toBe(
            true,
          );
        }
      }
  });

  it("never state prices as facts", () => {
    for (const locale of LOCALES)
      for (const key of LOCALIZED_TOOL_KEYS)
        expect(
          JSON.stringify(LOCALIZED_TOOLS[locale][key].copy),
          `${locale} ${key}`,
        ).not.toMatch(/[$€£¥]\s?\d/);
  });

  it("translate every size preset, weight item and fee field", () => {
    const presets = Object.values(SIZE_PRESETS)
      .flat()
      .map((p) => p.label);
    for (const locale of LOCALES) {
      for (const label of presets)
        expect(BAG_SIZE_TEXT[locale].presets[label], label).toBeDefined();
      for (const item of ITEMS) {
        expect(WEIGHT_TEXT[locale].items[item.id], item.id).toBeDefined();
        if ("wearable" in item)
          expect(WEIGHT_TEXT[locale].wear[item.id], item.id).toBeDefined();
      }
      expect(Object.keys(FEES_TEXT[locale].fields)).toEqual(
        Object.keys(FEES_TEXT.en.fields),
      );
    }
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
              const texts = [
                c.title,
                ...c.items.flatMap((it) => [it.label, it.note ?? ""]),
              ].filter(Boolean);
              for (const locale of LOCALES)
                for (const t of texts)
                  if (!PACKING_TRANSLATIONS[locale][t])
                    missing.add(`${locale}: ${t}`);
            }
          }
    expect([...missing]).toEqual([]);
  });

  it("builds the translated lists with the same items as the English one", () => {
    const input = { ...DEFAULT_PACKING, days: 20 };
    const en = generatePackingList(input);
    expect(generatePackingList(input, "es").tips[0]).toContain("20 días");
    expect(generatePackingList(input, "fr").tips[0]).toContain("20 jours");
    for (const locale of LOCALES) {
      const list = generatePackingList(input, locale);
      expect(list.itemCount).toBe(en.itemCount);
      expect(list.tips).toHaveLength(en.tips.length);
    }
  });
});
