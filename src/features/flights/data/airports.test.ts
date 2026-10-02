import { describe, expect, it } from "vitest";

import {
  AIRPORTS,
  getAirport,
  normalizeAirportInput,
} from "@/features/flights/data/airports";

describe("airport data", () => {
  it("has unique, well-formed IATA codes with valid time zones and coordinates", () => {
    const codes = AIRPORTS.map((a) => a.code);
    expect(new Set(codes).size).toBe(codes.length);
    for (const a of AIRPORTS) {
      expect(a.code).toMatch(/^[A-Z]{3}$/);
      expect(
        () => new Intl.DateTimeFormat("en", { timeZone: a.timeZone }),
      ).not.toThrow();
      expect(Math.abs(a.lat)).toBeLessThanOrEqual(90);
      expect(Math.abs(a.lon)).toBeLessThanOrEqual(180);
    }
  });

  it("includes the airports for every destination guide", () => {
    for (const code of ["CDG", "FCO", "HND", "LIS", "BCN"])
      expect(getAirport(code), code).toBeDefined();
  });

  it("maps city names to the main airport", () => {
    expect(normalizeAirportInput("London")).toBe("LHR");
    expect(normalizeAirportInput("new york")).toBe("JFK");
    expect(normalizeAirportInput("Lisbon")).toBe("LIS");
    expect(normalizeAirportInput("Barcelona (BCN)")).toBe("BCN");
    expect(normalizeAirportInput("bcn")).toBe("BCN");
  });
});
