import { describe, expect, it } from "vitest";

import { CHECKOUT_NOTICES } from "@/features/premium/lib/notices";
import { parsePlanForm } from "@/features/trip-planner/lib/request";
import { FAILURE_MESSAGES } from "@/features/trip-planner/lib/stored-plan";
import {
  PLANNER_MESSAGES,
  translatePlannerError,
} from "@/i18n/messages/planner";

const TODAY = "2026-10-05";
const base = {
  from: "JFK",
  to: "LHR",
  depart: "2026-11-10",
  return: "2026-11-14",
  adults: "2",
  cabin: "economy",
};

function errorsFor(fields: Record<string, string | string[]>): string[] {
  const fd = new FormData();
  for (const [k, v] of Object.entries(fields))
    for (const item of Array.isArray(v) ? v : [v]) fd.append(k, item);
  const result = parsePlanForm(fd, TODAY);
  return result.ok
    ? []
    : (Object.values(result.errors).filter(Boolean) as string[]);
}

/** Every validation message a visitor can trigger from the form. */
const VALIDATION = [
  ...errorsFor({}),
  ...errorsFor({ ...base, to: "JFK" }),
  ...errorsFor({ ...base, from: "XXX" }),
  ...errorsFor({ ...base, depart: "2020-01-01" }),
  ...errorsFor({ ...base, depart: "2028-01-01", return: "2028-01-02" }),
  ...errorsFor({ ...base, return: "" }),
  ...errorsFor({ ...base, return: "2026-11-01" }),
  ...errorsFor({ ...base, return: "2026-12-30" }),
  ...errorsFor({ ...base, depart: "not-a-date" }),
  ...errorsFor({ ...base, adults: "99" }),
  ...errorsFor({ ...base, cabin: "cargo" }),
  ...errorsFor({ ...base, budgetAmount: "lots" }),
  ...errorsFor({ ...base, budgetCurrency: "BTC" }),
  ...errorsFor({ ...base, pace: "frantic" }),
  ...errorsFor({ ...base, interests: ["hacking"] }),
  ...errorsFor({ ...base, notes: "x".repeat(1001) }),
  ...errorsFor({ ...base, language: "de" }),
];

/** Messages returned by the server action. */
const SIGN_UP =
  "Create a free account to keep planning: it only takes a minute, and your plans stay with you.";
const ACTION = [
  "The AI planner isn't available yet.",
  "Couldn't check your plan allowance. Please try again.",
  "Couldn't save your trip. Please try again.",
  "Couldn't start your plan. Please try again.",
  `Please sign in to create a plan. ${SIGN_UP}`,
  `You've used the free guest plans for now. ${SIGN_UP}`,
  `The planner is very busy today. ${SIGN_UP}`,
  "You can create up to 5 plans per hour. Please try again later.",
  "You've reached today's limit of 20 plans.",
];

describe("planner translations", () => {
  it("cover every form validation and server message", () => {
    expect(VALIDATION.length).toBeGreaterThan(12);
    for (const locale of ["es", "fr"] as const)
      for (const message of [...new Set([...VALIDATION, ...ACTION])])
        expect(
          translatePlannerError(message, locale),
          `${locale}: ${message}`,
        ).not.toBe(message);
  });

  it("leave English messages unchanged", () => {
    for (const message of [...VALIDATION, ...ACTION])
      expect(translatePlannerError(message, "en")).toBe(message);
  });

  it("cover every failure, retry and checkout notice", () => {
    for (const locale of ["es", "fr"] as const) {
      const t = PLANNER_MESSAGES[locale].detail;
      for (const code of Object.keys(FAILURE_MESSAGES))
        expect(t.failures[code], `${locale} failure ${code}`).toBeTruthy();
      for (const code of Object.keys(CHECKOUT_NOTICES))
        expect(t.checkout[code], `${locale} checkout ${code}`).toBeTruthy();
      for (const code of Object.keys(PLANNER_MESSAGES.en.detail.retry))
        expect(t.retry[code], `${locale} retry ${code}`).toBeTruthy();
    }
  });

  it("always shows the not-a-ticket notice in capitals", () => {
    for (const locale of ["en", "es", "fr"] as const) {
      const notice = PLANNER_MESSAGES[locale].view.notice;
      const lead = notice.split(".")[0]!;
      expect(lead).toBe(lead.toUpperCase());
      expect(notice.length).toBeGreaterThan(150);
    }
  });
});
