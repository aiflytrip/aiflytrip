import { describe, expect, it } from "vitest";

import { LIMITS } from "@/content/quality";
import {
  allContent,
  destinations,
  getDestinationByPath,
  getGuide,
  getItinerary,
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

describe("internal links", () => {
  it("resolves every related reference to a published page", () => {
    for (const d of destinations) {
      for (const p of d.related.destinations)
        expect(getDestinationByPath(p), `${d.path} -> ${p}`).toBeDefined();
      for (const s of d.related.itineraries)
        expect(getItinerary(s), `${d.path} -> ${s}`).toBeDefined();
      for (const s of d.related.guides)
        expect(getGuide(s), `${d.path} -> ${s}`).toBeDefined();
    }
    for (const it of itineraries) {
      expect(getDestinationByPath(it.destination), it.path).toBeDefined();
      for (const s of it.related.itineraries)
        expect(getItinerary(s), `${it.path} -> ${s}`).toBeDefined();
      for (const s of it.related.guides)
        expect(getGuide(s), `${it.path} -> ${s}`).toBeDefined();
    }
    for (const g of guides) {
      for (const p of g.related.destinations)
        expect(getDestinationByPath(p), `${g.path} -> ${p}`).toBeDefined();
      for (const s of g.related.guides)
        expect(getGuide(s), `${g.path} -> ${s}`).toBeDefined();
    }
  });

  it("has no orphan pages: every itinerary and guide has a contextual inbound link", () => {
    const inbound = new Set<string>();
    for (const d of destinations) {
      d.related.destinations.forEach((p) => inbound.add(p));
      d.related.itineraries.forEach((s) => inbound.add(`/itineraries/${s}`));
      d.related.guides.forEach((s) => inbound.add(`/guides/${s}`));
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
      it.related.guides.forEach((s) => inbound.add(`/guides/${s}`));
    }
    for (const g of guides) {
      g.related.destinations.forEach((p) => inbound.add(p));
      g.related.guides.forEach((s) => inbound.add(`/guides/${s}`));
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
