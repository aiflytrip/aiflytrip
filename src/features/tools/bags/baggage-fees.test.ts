import { describe, expect, it } from "vitest";

import {
  compareFares,
  DEFAULT_FEES,
  emptyOption,
  feesFromQuery,
  feesToQuery,
  sanitiseFees,
  type FeeInput,
} from "@/features/tools/bags/baggage-fees";

const input: FeeInput = {
  ...DEFAULT_FEES,
  travellers: 2,
  returnTrip: true,
  options: [
    // Low fare, everything extra.
    {
      ...emptyOption("Budget"),
      fare: 60,
      cabinBag: 25,
      checkedBags: 1,
      checkedBagFee: 30,
      seat: 8,
      transport: 40,
    },
    // Higher fare with bags included.
    { ...emptyOption("Full service"), fare: 150, transport: 20 },
  ],
};

describe("baggage fee calculator", () => {
  it("adds fees per person and per flight", () => {
    const r = compareFares(input);
    expect(r.flights).toBe(2);
    const budget = r.options[0]!;
    // fares 120, bags (25 + 30) x 2 x 2 = 220, seats 8 x 2 x 2 = 32, transport 40
    expect(budget.total).toBe(412);
    expect(budget.extras).toBe(292);
    expect(budget.perPerson).toBe(206);
  });

  it("spots when the lowest fare is not the cheapest trip", () => {
    const r = compareFares(input);
    expect(r.lowestFare).toBe(0);
    expect(r.cheapest).toBe(1);
    expect(r.headlineMisleading).toBe(true);
    expect(r.spread).toBe(412 - 320);
  });

  it("charges each fee once on a one-way trip", () => {
    const r = compareFares({ ...input, returnTrip: false });
    expect(r.options[0]!.total).toBe(120 + 110 + 16 + 40);
  });

  it("ignores options with no fare yet", () => {
    const r = compareFares(DEFAULT_FEES);
    expect(r.cheapest).toBeNull();
    expect(r.headlineMisleading).toBe(false);
  });

  it("bounds hostile input, keeps two to three options and round-trips", () => {
    const s = sanitiseFees({
      travellers: "50",
      currency: "XXX",
      options: [
        { name: "  <b>Long name that keeps going on and on</b>  ", fare: "-5" },
      ],
    });
    expect(s.travellers).toBe(9);
    expect(s.currency).toBe("GBP");
    expect(s.options).toHaveLength(2);
    expect(s.options[0]!.fare).toBe(0);
    expect(s.options[0]!.name.length).toBeLessThanOrEqual(30);
    const three = {
      ...input,
      options: [...input.options, emptyOption("Fare C")],
    };
    expect(feesFromQuery(feesToQuery(three))).toEqual(three);
    expect(feesToQuery(DEFAULT_FEES)).toBe("");
  });
});
