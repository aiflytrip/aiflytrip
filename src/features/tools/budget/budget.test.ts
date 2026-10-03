import { describe, expect, it } from "vitest";

import {
  calculateBudget,
  DEFAULT_INPUT,
  fromQuery,
  sanitise,
  toQuery,
  tripDays,
} from "@/features/tools/budget/budget";

describe("trip budget calculator", () => {
  it("adds up each category for the group", () => {
    const result = calculateBudget({
      ...DEFAULT_INPUT,
      travellers: 2,
      nights: 4,
      flightsPerPerson: 200,
      accommodationPerNight: 100,
      foodPerDay: 40,
      transportPerDay: 10,
      activitiesPerDay: 20,
      extras: 50,
      bufferPercent: 10,
    });
    // days = nights + 1 = 5
    expect(result.days).toBe(5);
    const byKey = Object.fromEntries(
      result.lines.map((l) => [l.key, l.amount]),
    );
    expect(byKey.flights).toBe(400);
    expect(byKey.accommodation).toBe(400);
    expect(byKey.food).toBe(400);
    expect(byKey.transport).toBe(100);
    expect(byKey.activities).toBe(200);
    expect(byKey.extras).toBe(50);
    expect(result.subtotal).toBe(1550);
    expect(byKey.buffer).toBeCloseTo(155);
    expect(result.total).toBeCloseTo(1705);
    expect(result.perPerson).toBeCloseTo(852.5);
    expect(result.perDay).toBeCloseTo(341);
  });

  it("omits the buffer line at 0%", () => {
    const result = calculateBudget({
      ...DEFAULT_INPUT,
      bufferPercent: 0,
      flightsPerPerson: 100,
    });
    expect(result.lines.some((l) => l.key === "buffer")).toBe(false);
    expect(result.total).toBe(200);
  });

  it("bounds hostile or broken input", () => {
    const s = sanitise({
      travellers: "-5",
      nights: "9999",
      currency: "XXX",
      foodPerDay: "abc",
      extras: "1e99",
      bufferPercent: "33",
    });
    expect(s.travellers).toBe(1);
    expect(s.nights).toBe(90);
    expect(s.currency).toBe("GBP");
    expect(s.foodPerDay).toBe(0);
    expect(s.extras).toBe(10_000_000);
    expect(s.bufferPercent).toBe(10);
  });

  it("round-trips through a shareable query string", () => {
    const input = {
      ...DEFAULT_INPUT,
      travellers: 3,
      currency: "JPY" as const,
      foodPerDay: 4500,
      nights: 6,
    };
    const query = toQuery(input);
    expect(query).not.toContain("flightsPerPerson");
    expect(fromQuery(query)).toEqual(input);
  });

  it("counts arrival and departure days", () => {
    expect(tripDays(1)).toBe(2);
  });
});
