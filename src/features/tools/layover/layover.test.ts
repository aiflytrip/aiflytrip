import { describe, expect, it } from "vitest";

import {
  ASSUMPTIONS,
  checkLayover,
  DEFAULT_LAYOVER,
  layoverFromQuery,
  layoverToQuery,
  sanitiseLayover,
} from "@/features/tools/layover/layover";

const simple = {
  ...DEFAULT_LAYOVER,
  largeAirport: false,
  terminalChange: "no" as const,
  passportControl: "no" as const,
  securityAgain: "no" as const,
  recheckBags: "no" as const,
};

describe("layover time checker", () => {
  it("adds up only the steps that apply", () => {
    const r = checkLayover({ ...simple, hours: 1, minutes: 0 });
    expect(r.neededMinutes).toBe(
      ASSUMPTIONS.deplaneSmall + ASSUMPTIONS.boardingCloses,
    );
    expect(r.spareMinutes).toBe(60 - r.neededMinutes);
  });

  it("treats 'not sure' as yes, to stay on the safe side", () => {
    const yes = checkLayover({ ...simple, passportControl: "yes" });
    const unsure = checkLayover({ ...simple, passportControl: "unsure" });
    expect(unsure.neededMinutes).toBe(yes.neededMinutes);
    expect(unsure.advice.join(" ")).toMatch(/Schengen/);
  });

  it("grades the margin", () => {
    expect(checkLayover({ ...simple, hours: 3, minutes: 0 }).verdict).toBe(
      "comfortable",
    );
    expect(checkLayover({ ...simple, hours: 0, minutes: 25 }).verdict).toBe(
      "risky",
    );
  });

  it("always warns about separate tickets and adds a buffer", () => {
    const one = checkLayover({ ...simple, hours: 2, minutes: 0 });
    const two = checkLayover({
      ...simple,
      hours: 2,
      minutes: 0,
      separateTickets: true,
    });
    expect(two.neededMinutes - one.neededMinutes).toBe(
      ASSUMPTIONS.separateTicketsBuffer,
    );
    expect(two.advice[0]).toMatch(/separate tickets/i);
  });

  it("bounds hostile query input and round-trips", () => {
    const s = sanitiseLayover({
      hours: "-3",
      minutes: "99",
      terminalChange: "maybe",
      children: "yes",
    });
    expect(s.hours).toBe(0);
    expect(s.minutes).toBe(59);
    expect(s.terminalChange).toBe(DEFAULT_LAYOVER.terminalChange);
    expect(s.children).toBe(false);
    const input = {
      ...simple,
      hours: 2,
      minutes: 15,
      separateTickets: true,
      children: true,
    };
    expect(layoverFromQuery(layoverToQuery(input))).toEqual(input);
  });
});
