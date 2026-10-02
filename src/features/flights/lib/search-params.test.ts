import { describe, expect, it } from "vitest";

import {
  parseFlightSearch,
  searchToParams,
} from "@/features/flights/lib/search-params";

const TODAY = "2026-10-02";

const valid = {
  trip: "round_trip",
  from: "JFK",
  to: "LHR",
  depart: "2026-11-10",
  return: "2026-11-20",
  adults: "2",
  cabin: "business",
};

describe("parseFlightSearch", () => {
  it("returns empty when no search has been made", () => {
    expect(parseFlightSearch({}, TODAY).status).toBe("empty");
  });

  it("parses a valid round trip", () => {
    const result = parseFlightSearch(valid, TODAY);
    expect(result).toMatchObject({
      status: "valid",
      search: {
        tripType: "round_trip",
        origin: "JFK",
        destination: "LHR",
        departDate: "2026-11-10",
        returnDate: "2026-11-20",
        adults: 2,
        cabin: "business",
      },
    });
  });

  it("normalizes airport input from codes, labels and city names", () => {
    const result = parseFlightSearch(
      { ...valid, from: " jfk ", to: "London (LHR)" },
      TODAY,
    );
    expect(
      result.status === "valid" && [
        result.search.origin,
        result.search.destination,
      ],
    ).toEqual(["JFK", "LHR"]);
    const byCity = parseFlightSearch({ ...valid, from: "karachi" }, TODAY);
    expect(byCity.status === "valid" && byCity.search.origin).toBe("KHI");
  });

  it("drops the return date for one-way trips", () => {
    const result = parseFlightSearch({ ...valid, trip: "one_way" }, TODAY);
    expect(
      result.status === "valid" && result.search.returnDate,
    ).toBeUndefined();
  });

  it("applies defaults for trip type, travellers and cabin", () => {
    const result = parseFlightSearch(
      { from: "JFK", to: "LHR", depart: "2026-11-10", return: "2026-11-12" },
      TODAY,
    );
    expect(result).toMatchObject({
      status: "valid",
      search: { tripType: "round_trip", adults: 1, cabin: "economy" },
    });
  });

  it.each([
    [{ from: "" }, "origin", "Enter where you're flying from"],
    [{ from: "XXX" }, "origin", "Choose an airport from the list"],
    [{ to: "JFK" }, "destination", "Destination must be different from origin"],
    [{ depart: "2026-02-30" }, "departDate", "Enter a valid date"],
    [
      { depart: "2026-09-01" },
      "departDate",
      "Departure date can't be in the past",
    ],
    [
      { depart: "2028-01-01", return: "2028-01-05" },
      "departDate",
      "Flights can be searched up to about a year ahead",
    ],
    [{ return: "" }, "returnDate", "Choose a return date"],
    [
      { return: "2026-11-01" },
      "returnDate",
      "Return date must be on or after departure",
    ],
    [{ adults: "0" }, "adults", "At least 1 traveller is required"],
    [{ adults: "12" }, "adults", "Up to 9 travellers per booking"],
    [{ cabin: "luxury" }, "cabin", "Choose a cabin class"],
  ] as const)("rejects %j with an error on %s", (override, field, message) => {
    const result = parseFlightSearch({ ...valid, ...override }, TODAY);
    expect(result.status).toBe("invalid");
    expect(result.status === "invalid" && result.errors[field]).toBe(message);
  });

  it("keeps raw values so the form can be re-filled", () => {
    const result = parseFlightSearch({ ...valid, from: "Nowhere" }, TODAY);
    expect(result.values.origin).toBe("Nowhere");
  });

  it("uses the first value when a param is repeated", () => {
    const result = parseFlightSearch({ ...valid, from: ["LHE", "KHI"] }, TODAY);
    expect(result.status === "valid" && result.search.origin).toBe("LHE");
  });

  it("round-trips through searchToParams", () => {
    const result = parseFlightSearch(valid, TODAY);
    if (result.status !== "valid") throw new Error("expected valid search");
    const params = Object.fromEntries(searchToParams(result.search));
    expect(parseFlightSearch(params, TODAY)).toEqual(result);
  });
});
