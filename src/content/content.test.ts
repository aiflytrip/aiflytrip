import { describe, expect, it } from "vitest";

import { TRANSLATED_PATHS } from "@/app/sitemap";
import { LIMITS } from "@/content/quality";
import { BLOG_TRANSLATIONS, ROUTES } from "@/i18n/routes";
import { ENGLISH_TOOL_PATHS } from "@/features/tools/english-tools";
import {
  allContent,
  destinations,
  getDestinationByPath,
  guides,
  isIndexable,
  itineraries,
} from "@/content/registry";

const all = [...destinations, ...itineraries, ...guides];
const textOf = (value: unknown): string => JSON.stringify(value);

describe("content quality gate", () => {
  it.each(all.map((e) => [e.path, e] as const))(
    "%s passes the gate",
    (_path, entry) => {
      // Failing pages are noindexed automatically; this test makes sure we notice.
      expect(entry.quality.issues).toEqual([]);
      expect(isIndexable(entry)).toBe(true);
    },
  );

  it("has unique slugs, paths, titles, headlines and descriptions", () => {
    for (const key of ["path", "title", "headline", "description"] as const) {
      const values = all.map((e) => e[key]);
      expect(new Set(values).size, key).toBe(values.length);
    }
  });

  it("keeps titles and descriptions within search snippet limits", () => {
    for (const entry of all) {
      // "%s | AIFlyTrip" adds 12 characters.
      expect(entry.title.length + 12, entry.path).toBeLessThanOrEqual(
        LIMITS.titleMax + 12,
      );
      expect(entry.description.length, entry.path).toBeGreaterThanOrEqual(
        LIMITS.descriptionMin,
      );
      expect(entry.description.length, entry.path).toBeLessThanOrEqual(
        LIMITS.descriptionMax,
      );
    }
  });

  it("does not hard-code prices or visa outcomes that change", () => {
    for (const entry of all) {
      const text = textOf(entry);
      expect(text, entry.path).not.toMatch(/[$€£¥]\s?\d/);
      expect(text, entry.path).not.toMatch(/\b\d+\s?(EUR|USD|JPY|GBP)\b/);
      expect(text, entry.path).not.toMatch(/visa-free|no visa (is )?required/i);
    }
  });

  it("only cites https sources and is not reviewed in the future", () => {
    const today = new Date().toISOString().slice(0, 10);
    for (const entry of all) {
      expect(entry.lastReviewed <= today, entry.path).toBe(true);
      for (const source of entry.sources)
        expect(source.url, entry.path).toMatch(/^https:\/\//);
    }
  });

  it("does not stuff keywords into titles", () => {
    for (const entry of all) {
      const words = entry.title.toLowerCase().match(/[a-z]+/g) ?? [];
      const counts = new Map<string, number>();
      for (const w of words)
        if (w.length > 3) counts.set(w, (counts.get(w) ?? 0) + 1);
      expect(Math.max(0, ...counts.values()), entry.path).toBeLessThanOrEqual(
        2,
      );
    }
  });
});

// Related lists may name scheduled posts; the site hides them until live.
const anyGuide = (slug: string, locale = "en") =>
  guides.find((g) => g.slug === slug && g.locale === locale);
const anyItinerary = (slug: string) => itineraries.find((i) => i.slug === slug);

describe("internal links", () => {
  it("resolves every related reference to a real page (live or scheduled)", () => {
    for (const d of destinations) {
      for (const p of d.related.destinations)
        expect(getDestinationByPath(p), `${d.path} -> ${p}`).toBeDefined();
      for (const s of d.related.itineraries)
        expect(anyItinerary(s), `${d.path} -> ${s}`).toBeDefined();
      for (const s of d.related.guides)
        expect(anyGuide(s), `${d.path} -> ${s}`).toBeDefined();
    }
    for (const it of itineraries) {
      expect(getDestinationByPath(it.destination), it.path).toBeDefined();
      for (const s of it.related.itineraries)
        expect(anyItinerary(s), `${it.path} -> ${s}`).toBeDefined();
      for (const s of it.related.guides)
        expect(anyGuide(s), `${it.path} -> ${s}`).toBeDefined();
    }
    for (const g of guides) {
      for (const p of g.related.destinations)
        expect(getDestinationByPath(p), `${g.path} -> ${p}`).toBeDefined();
      // Related posts are always in the page's own language.
      for (const s of g.related.guides)
        expect(anyGuide(s, g.locale), `${g.path} -> ${s}`).toBeDefined();
    }
  });

  it("pairs every Spanish post with a live English post, both ways", () => {
    const spanish = guides.filter((g) => g.locale === "es");
    expect(spanish.length).toBeGreaterThan(0);
    for (const es of spanish) {
      expect(es.path.startsWith("/es/blog/"), es.path).toBe(true);
      expect(es.translationOf, es.path).toBeDefined();
      expect(anyGuide(es.translationOf!), es.path).toBeDefined();
      expect(BLOG_TRANSLATIONS[es.translationOf!], es.path).toBe(es.slug);
    }
    for (const [en, es] of Object.entries(BLOG_TRANSLATIONS)) {
      expect(anyGuide(en), en).toBeDefined();
      expect(anyGuide(es, "es")?.translationOf, es).toBe(en);
    }
  });

  it("has no orphan pages: every itinerary and guide has a contextual inbound link", () => {
    const inbound = new Set<string>();
    for (const d of destinations) {
      d.related.destinations.forEach((p) => inbound.add(p));
      d.related.itineraries.forEach((s) => inbound.add(`/itineraries/${s}`));
      d.related.guides.forEach((s) => inbound.add(`/blog/${s}`));
      // Countries are linked from the hub, cities from their country page.
      if (d.kind === "country") inbound.add(d.path);
      else if (
        destinations.some((c) => c.kind === "country" && c.slug === d.country)
      )
        inbound.add(d.path);
    }
    for (const it of itineraries) {
      inbound.add(it.destination);
      it.related.itineraries.forEach((s) => inbound.add(`/itineraries/${s}`));
      it.related.guides.forEach((s) => inbound.add(`/blog/${s}`));
    }
    for (const g of guides) {
      g.related.destinations.forEach((p) => inbound.add(p));
      g.related.guides.forEach((s) =>
        inbound.add(anyGuide(s, g.locale)?.path ?? `/blog/${s}`),
      );
    }
    for (const entry of allContent())
      expect(inbound.has(entry.path), entry.path).toBe(true);
  });

  it("never links a page to itself", () => {
    for (const d of destinations)
      expect(d.related.destinations).not.toContain(d.path);
    for (const it of itineraries)
      expect(it.related.itineraries).not.toContain(it.slug);
    for (const g of guides) expect(g.related.guides).not.toContain(g.slug);
  });
});

describe("planner links", () => {
  it("only references airports the planner accepts", async () => {
    const { isKnownAirportCode } =
      await import("@/features/flights/data/airports");
    for (const d of destinations) {
      for (const code of d.airports)
        expect(isKnownAirportCode(code), `${d.path} -> ${code}`).toBe(true);
    }
  });
});

describe("destination photos", () => {
  it("has a licensed, credited photo file for every destination", async () => {
    const { existsSync } = await import("node:fs");
    const { join } = await import("node:path");
    const { destinationPhoto } = await import("@/content/data/photos");
    for (const d of destinations) {
      const photo = destinationPhoto(d.slug);
      expect(photo, d.path).toBeDefined();
      expect(
        existsSync(join(process.cwd(), "public", photo!.src)),
        photo!.src,
      ).toBe(true);
      // Licences that allow commercial use with attribution.
      expect(photo!.license, d.path).toMatch(
        /^(CC0|Public domain|CC BY(-SA)? [0-9.]+)$/,
      );
      expect(photo!.licenseUrl, d.path).toMatch(
        /^https:\/\/creativecommons\.org\//,
      );
      expect(photo!.sourceUrl, d.path).toMatch(
        /^https:\/\/commons\.wikimedia\.org\/wiki\/File:/,
      );
      expect(photo!.author.length, d.path).toBeGreaterThan(1);
      expect(photo!.alt.length, d.path).toBeGreaterThan(30);
    }
  });
});

describe("inline links in content", () => {
  it("only link to pages that exist, and never to a post that isn't live yet", async () => {
    const { linkTargets } =
      await import("@/features/content/components/rich-text");
    const all = [...destinations, ...itineraries, ...guides];
    const byPath = new Map(all.map((e) => [e.path, e]));
    const staticPaths = new Set([
      "/",
      "/travel-planner",
      "/destinations",
      "/itineraries",
      "/blog",
      "/flights",
      "/plan",
      "/about",
      "/editorial-policy",
      "/tools",
      "/tools/trip-budget-calculator",
      "/tools/layover-time-checker",
      "/tools/how-many-days",
      ...ENGLISH_TOOL_PATHS,
      ...TRANSLATED_PATHS,
      ...Object.values(ROUTES.planner),
    ]);
    for (const entry of all) {
      const from =
        "publishAt" in entry && entry.publishAt
          ? entry.publishAt
          : "0000-00-00";
      const texts =
        JSON.stringify(entry).match(/\[[^\]]+\]\(\/[^)\s]*\)/g) ?? [];
      for (const target of texts.flatMap(linkTargets)) {
        if (staticPaths.has(target)) continue;
        const page = byPath.get(target);
        expect(page, `${entry.path} -> ${target}`).toBeDefined();
        const goesLive =
          page && "publishAt" in page && page.publishAt
            ? page.publishAt
            : "0000-00-00";
        expect(
          goesLive <= from,
          `${entry.path} links to ${target} before it goes live`,
        ).toBe(true);
      }
    }
  });
});

describe("blog photos and scheduling", () => {
  it("gives every photo-referencing post a licensed, credited photo file", async () => {
    const { existsSync } = await import("node:fs");
    const { join } = await import("node:path");
    const { blogPhoto } = await import("@/content/data/photos");
    for (const post of guides.filter((g) => g.photo)) {
      const photo = blogPhoto(post.photo);
      expect(photo, post.path).toBeDefined();
      expect(
        existsSync(join(process.cwd(), "public", photo!.src)),
        photo!.src,
      ).toBe(true);
      // Country ports such as "CC BY 3.0 de" are valid CC licences too.
      expect(photo!.license, post.path).toMatch(
        /^(CC0|Public domain|CC BY(-SA)? [0-9.]+( [a-z]{2})?)$/,
      );
      expect(photo!.licenseUrl, post.path).toMatch(
        /^https:\/\/creativecommons\.org\//,
      );
    }
  });

  it("hides scheduled posts until their publish date", async () => {
    const { isLive } = await import("@/content/registry");
    const today = new Date().toISOString().slice(0, 10);
    const live = new Set(allContent().map((e) => e.path));
    for (const post of guides.filter((g) => g.publishAt)) {
      expect(live.has(post.path), post.path).toBe(post.publishAt! <= today);
      expect(isLive({ status: "published", publishAt: "2999-01-01" })).toBe(
        false,
      );
    }
  });
});
