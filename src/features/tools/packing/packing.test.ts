import { describe, expect, it } from "vitest";

import {
  DEFAULT_PACKING,
  generatePackingList,
  OUTFIT_CAP,
  packingFromQuery,
  packingToQuery,
  sanitisePacking,
} from "@/features/tools/packing/packing";

const qty = (list: ReturnType<typeof generatePackingList>, id: string) =>
  list.categories.flatMap((c) => c.items).find((i) => i.id === id)?.qty;
const has = (list: ReturnType<typeof generatePackingList>, id: string) =>
  list.categories.some((c) => c.items.some((i) => i.id === id));

describe("packing list generator", () => {
  it("packs a day of clothes per day on short trips", () => {
    const list = generatePackingList({ ...DEFAULT_PACKING, days: 3 });
    expect(list.outfitDays).toBe(3);
    expect(qty(list, "tops")).toBe(3);
    expect(qty(list, "underwear")).toBe(4);
  });

  it("caps clothes by luggage and laundry, and says to plan a wash", () => {
    const carry = generatePackingList({ ...DEFAULT_PACKING, days: 14 });
    expect(carry.outfitDays).toBe(OUTFIT_CAP["carry-on"].noLaundry);
    expect(carry.tips[0]).toMatch(/plan a wash/);
    expect(has(carry, "detergent")).toBe(true);
    const laundry = generatePackingList({
      ...DEFAULT_PACKING,
      days: 14,
      laundry: true,
    });
    expect(laundry.outfitDays).toBe(OUTFIT_CAP["carry-on"].laundry);
    const checked = generatePackingList({
      ...DEFAULT_PACKING,
      days: 14,
      luggage: "checked",
    });
    expect(checked.outfitDays).toBe(14);
  });

  it("adapts to the weather", () => {
    const cold = generatePackingList({ ...DEFAULT_PACKING, climate: "cold" });
    const warm = generatePackingList({ ...DEFAULT_PACKING, climate: "warm" });
    expect(has(cold, "coat")).toBe(true);
    expect(has(warm, "coat")).toBe(false);
    expect(has(warm, "shorts")).toBe(true);
    expect(has(warm, "sun-hat")).toBe(true);
  });

  it("adds activity sections only when chosen", () => {
    const base = generatePackingList(DEFAULT_PACKING);
    expect(base.categories.map((c) => c.key)).not.toContain("beach");
    const all = generatePackingList({
      ...DEFAULT_PACKING,
      beach: true,
      hiking: true,
      business: true,
      child: true,
    });
    for (const key of ["beach", "hiking", "business", "child"])
      expect(all.categories.map((c) => c.key)).toContain(key);
    expect(all.itemCount).toBeGreaterThan(base.itemCount);
  });

  it("uses photo ID instead of a passport for domestic trips", () => {
    const home = generatePackingList({
      ...DEFAULT_PACKING,
      international: false,
    });
    expect(has(home, "passport")).toBe(false);
    expect(has(home, "adapter")).toBe(false);
    expect(has(home, "id")).toBe(true);
  });

  it("gives every item a unique id", () => {
    const all = generatePackingList({
      ...DEFAULT_PACKING,
      climate: "warm",
      beach: true,
      hiking: true,
      business: true,
      smart: true,
      child: true,
    });
    const ids = all.categories.flatMap((c) => c.items.map((i) => i.id));
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("bounds hostile query input and round-trips", () => {
    const s = sanitisePacking({ days: "999", climate: "lava", beach: "yes" });
    expect(s.days).toBe(60);
    expect(s.climate).toBe(DEFAULT_PACKING.climate);
    expect(s.beach).toBe(false);
    const input = {
      ...DEFAULT_PACKING,
      days: 10,
      climate: "cold" as const,
      hiking: true,
    };
    expect(packingFromQuery(packingToQuery(input))).toEqual(input);
    expect(packingToQuery(DEFAULT_PACKING)).toBe("");
  });
});
