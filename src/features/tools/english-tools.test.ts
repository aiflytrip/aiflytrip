import { describe, expect, it } from "vitest";

import sitemap from "@/app/sitemap";
import { allContent, isLive } from "@/content/registry";
import { linkTargets } from "@/features/content/components/rich-text";
import { absoluteUrl } from "@/features/seo/metadata";
import {
  ENGLISH_TOOL_KEYS,
  ENGLISH_TOOLS,
} from "@/features/tools/english-tools";

const tools = ENGLISH_TOOL_KEYS.map((key) => ENGLISH_TOOLS[key]);

describe("English-only tools", () => {
  it("are listed in the sitemap", () => {
    const urls = sitemap().map((e) => e.url);
    for (const tool of tools) expect(urls).toContain(absoluteUrl(tool.path));
  });

  it("keep titles and descriptions unique and within snippet limits", () => {
    const titles = tools.map((t) => t.copy.meta.title);
    expect(new Set(titles).size).toBe(titles.length);
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

  it("never state prices as facts", () => {
    for (const { copy, path } of tools)
      expect(JSON.stringify(copy), path).not.toMatch(/[$€£¥]\s?\d/);
  });
});
