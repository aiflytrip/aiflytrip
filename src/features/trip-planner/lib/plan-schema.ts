import { z } from "zod";

/**
 * Shape Claude must return (structured outputs). Kept to plain types and
 * enums, which structured outputs enforce; length limits are applied
 * afterwards by `sanitizePlan`, so an over-long field is trimmed rather
 * than failing the whole plan.
 */
export const BUDGET_CATEGORIES = [
  "flights",
  "lodging",
  "food",
  "activities",
  "local_transport",
  "other",
] as const;

export const PlanOutputSchema = z.object({
  title: z
    .string()
    .describe(
      "Short, specific trip title, e.g. 'Five food-filled days in Tokyo'",
    ),
  summary: z.string().describe("2-4 sentence overview of the trip"),
  flight: z.object({
    recommended_offer_id: z
      .string()
      .nullable()
      .describe(
        "id of one of the provided flight options, or null if none fits",
      ),
    rationale: z
      .string()
      .describe("Why this flight fits the traveller, or why none does"),
  }),
  days: z
    .array(
      z.object({
        date: z
          .string()
          .describe("YYYY-MM-DD, one entry per trip date in order"),
        title: z.string(),
        morning: z.string(),
        afternoon: z.string(),
        evening: z.string(),
        note: z
          .string()
          .nullable()
          .describe("Optional practical note for the day"),
      }),
    )
    .describe("One entry per date from departure to return, inclusive"),
  budget: z.object({
    currency: z
      .string()
      .describe("ISO 4217 code of the traveller's budget currency"),
    items: z.array(
      z.object({
        category: z.enum(BUDGET_CATEGORIES),
        amount: z
          .number()
          .int()
          .describe("Estimated total for all travellers, whole currency units"),
        note: z.string(),
      }),
    ),
    notes: z
      .string()
      .describe("How the estimate compares to the stated budget"),
  }),
  packing_list: z.array(z.string()),
  tips: z.array(z.string()),
  caveats: z
    .array(z.string())
    .describe("Assumptions and things the traveller should verify"),
});

export type PlanOutput = z.infer<typeof PlanOutputSchema>;

const clip = (value: string, max: number) => {
  const trimmed = value.trim();
  return trimmed.length > max
    ? `${trimmed.slice(0, max - 1).trimEnd()}…`
    : trimmed;
};

/**
 * Enforces display limits and consistency on a parsed plan: trims text,
 * caps list sizes, keeps only the requested dates (in order), drops a
 * recommended flight id that wasn't offered, and clamps budget numbers.
 */
export function sanitizePlan(
  plan: PlanOutput,
  context: { dates: string[]; offerIds: string[]; currency: string },
): PlanOutput {
  const byDate = new Map(plan.days.map((day) => [day.date, day]));
  const days = context.dates.flatMap((date) => {
    const day = byDate.get(date);
    if (!day) return [];
    return [
      {
        date,
        title: clip(day.title, 120),
        morning: clip(day.morning, 700),
        afternoon: clip(day.afternoon, 700),
        evening: clip(day.evening, 700),
        note: day.note ? clip(day.note, 400) : null,
      },
    ];
  });

  const offerId = plan.flight.recommended_offer_id;
  return {
    title: clip(plan.title, 120),
    summary: clip(plan.summary, 1200),
    flight: {
      recommended_offer_id:
        offerId && context.offerIds.includes(offerId) ? offerId : null,
      rationale: clip(plan.flight.rationale, 800),
    },
    days,
    budget: {
      currency: context.currency,
      items: plan.budget.items.slice(0, 12).map((item) => ({
        category: item.category,
        amount: Math.max(0, Math.min(Math.round(item.amount), 100_000_000)),
        note: clip(item.note, 300),
      })),
      notes: clip(plan.budget.notes, 600),
    },
    packing_list: plan.packing_list.slice(0, 20).map((item) => clip(item, 120)),
    tips: plan.tips.slice(0, 10).map((item) => clip(item, 400)),
    caveats: plan.caveats.slice(0, 8).map((item) => clip(item, 400)),
  };
}
