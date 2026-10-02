import { describe, expect, it } from "vitest";

import {
  addDays,
  daysBetween,
  isIsoDate,
  toIsoDate,
  zonedTimeToUtc,
} from "@/features/flights/lib/dates";

describe("dates", () => {
  it("validates real calendar dates only", () => {
    expect(isIsoDate("2028-02-29")).toBe(true);
    expect(isIsoDate("2026-02-29")).toBe(false);
    expect(isIsoDate("2026-13-01")).toBe(false);
    expect(isIsoDate("2026-1-01")).toBe(false);
  });

  it("adds days across month and year boundaries", () => {
    expect(addDays("2026-12-30", 3)).toBe("2027-01-02");
    expect(addDays("2026-03-01", -1)).toBe("2026-02-28");
    expect(daysBetween("2026-12-30", "2027-01-02")).toBe(3);
  });

  it("converts local wall-clock times to UTC, respecting DST", () => {
    // London is UTC+1 in summer and UTC+0 in winter.
    expect(
      zonedTimeToUtc("2026-07-01", 9 * 60, "Europe/London").toISOString(),
    ).toBe("2026-07-01T08:00:00.000Z");
    expect(
      zonedTimeToUtc("2026-12-01", 9 * 60, "Europe/London").toISOString(),
    ).toBe("2026-12-01T09:00:00.000Z");
    // Karachi is UTC+5 with no DST.
    expect(
      zonedTimeToUtc("2026-07-01", 23 * 60, "Asia/Karachi").toISOString(),
    ).toBe("2026-07-01T18:00:00.000Z");
  });

  it("formats an instant as a local date", () => {
    const instant = new Date("2026-07-01T22:30:00Z");
    expect(toIsoDate(instant, "UTC")).toBe("2026-07-01");
    expect(toIsoDate(instant, "Asia/Tokyo")).toBe("2026-07-02");
  });
});
