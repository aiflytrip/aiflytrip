import { describe, expect, it } from "vitest";

import { formatMoney } from "@/features/flights/lib/format";
import { divideMoney, parseMoney } from "@/features/flights/lib/money";

describe("money", () => {
  it.each([
    ["123.45", "USD", 12345],
    ["123", "USD", 12300],
    ["123.4", "USD", 12340],
    ["0.005", "USD", 1],
    ["15000", "JPY", 15000],
    ["1.2345", "KWD", 1235],
  ])("parses %s %s", (amount, currency, minor) => {
    expect(parseMoney(amount, currency)).toEqual({
      amountMinor: minor,
      currency,
    });
  });

  it.each([
    ["-1", "USD"],
    ["1e5", "USD"],
    ["abc", "USD"],
    ["10", "usd"],
  ])("rejects %s %s", (amount, currency) => {
    expect(parseMoney(amount, currency)).toBeUndefined();
  });

  it("formats using each currency's decimals", () => {
    expect(formatMoney({ amountMinor: 123456, currency: "USD" })).toBe(
      "$1,235",
    );
    expect(formatMoney({ amountMinor: 150000, currency: "JPY" })).toBe(
      "¥150,000",
    );
  });

  it("splits totals per traveller", () => {
    expect(divideMoney({ amountMinor: 1001, currency: "USD" }, 2)).toEqual({
      amountMinor: 501,
      currency: "USD",
    });
  });
});
