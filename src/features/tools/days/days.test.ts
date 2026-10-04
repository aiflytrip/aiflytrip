import { describe, expect, it } from "vitest";

import {
  DEFAULT_DAYS_INPUT,
  daysFromQuery,
  daysToQuery,
  planDays,
  sanitiseDays,
} from "@/features/tools/days/days";

const base = { ...DEFAULT_DAYS_INPUT };

describe("how many days planner", () => {
  it("follows the guide: a big city gets four days at a moderate pace", () => {
    const r = planDays({
      ...base,
      stops: [{ name: "Paris", type: "big-city", dayTrips: 0 }],
    });
    expect(r.stops[0]!.days).toBe(4);
    // short-haul: half a day at each end
    expect(r.travelDays).toBe(1);
    expect(r.totalDays).toBe(5);
    expect(r.nights).toBe(4);
  });

  it("adds day trips, travel between stops and long-haul days", () => {
    const r = planDays({
      ...base,
      longHaul: true,
      longJourneys: true,
      stops: [
        { name: "Tokyo", type: "big-city", dayTrips: 1 },
        { name: "Kyoto", type: "big-city", dayTrips: 1 },
      ],
    });
    expect(r.groundDays).toBe(10);
    expect(r.travelDays).toBe(3); // 1 move + 2 long-haul end days
    expect(r.totalDays).toBe(13);
  });

  it("never plans fewer than two days per stop, even at a fast pace", () => {
    const r = planDays({
      ...base,
      pace: "fast",
      stops: [{ name: "Sintra", type: "town", dayTrips: 0 }],
    });
    expect(r.stops[0]!.days).toBe(2);
  });

  it("warns when the plan is more than one base per three days", () => {
    const r = planDays({
      ...base,
      pace: "fast",
      stops: [
        { name: "A", type: "town", dayTrips: 0 },
        { name: "B", type: "town", dayTrips: 0 },
        { name: "C", type: "town", dayTrips: 0 },
      ],
    });
    expect(r.warnings.join(" ")).toMatch(/rushed/);
  });

  it("compares with the days available and names a stop to drop", () => {
    const r = planDays({
      ...base,
      available: 6,
      stops: [
        { name: "Rome", type: "big-city", dayTrips: 0 },
        { name: "Orvieto", type: "town", dayTrips: 0 },
      ],
    });
    expect(r.fit?.status).toBe("packed");
    expect(r.warnings.join(" ")).toMatch(/Orvieto/);
  });

  it("sanitises names and round-trips through the share link", () => {
    const s = sanitiseDays({
      stops: [{ name: "<script>Lisbon</script>", type: "x", dayTrips: "9" }],
    });
    expect(s.stops[0]!.name).not.toMatch(/[<>]/);
    expect(s.stops[0]!.type).toBe("big-city");
    expect(s.stops[0]!.dayTrips).toBe(5);
    const input = {
      ...base,
      pace: "relaxed" as const,
      longHaul: true,
      available: 12,
      stops: [
        { name: "Lisbon", type: "big-city" as const, dayTrips: 1 },
        { name: "Porto", type: "town" as const, dayTrips: 0 },
      ],
    };
    expect(daysFromQuery(daysToQuery(input))).toEqual(input);
  });
});
