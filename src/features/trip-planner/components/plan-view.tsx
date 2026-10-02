import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatDate } from "@/features/flights/lib/format";
import { type FlightOptionSnapshot } from "@/features/trip-planner/lib/flight-options";
import { type BUDGET_CATEGORIES } from "@/features/trip-planner/lib/plan-schema";
import { type StoredItinerary } from "@/features/trip-planner/lib/stored-plan";

const CATEGORY_LABELS: Record<(typeof BUDGET_CATEGORIES)[number], string> = {
  flights: "Flights",
  lodging: "Accommodation",
  food: "Food and drink",
  activities: "Activities",
  local_transport: "Local transport",
  other: "Other",
};

function money(amount: number, currency: string) {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${amount.toLocaleString("en-US")} ${currency}`;
  }
}

function FlightCard({
  option,
  sourceMode,
}: {
  option: FlightOptionSnapshot;
  sourceMode?: string;
}) {
  const legs = [
    { label: "Outbound", leg: option.outbound },
    ...(option.inbound ? [{ label: "Return", leg: option.inbound }] : []),
  ];
  return (
    <div className="rounded-xl border border-border bg-muted/40 p-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-semibold">
          {option.airlines.join(" · ")}
        </span>
        {sourceMode && sourceMode !== "live" ? (
          <Badge>{sourceMode === "test" ? "Test data" : "Sample data"}</Badge>
        ) : null}
        <span className="ml-auto text-sm font-semibold">{option.price}</span>
      </div>
      <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
        {legs.map(({ label, leg }) => (
          <div key={label}>
            <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              {label}
            </dt>
            <dd>
              {leg.from} → {leg.to}: departs {leg.departs}, arrives{" "}
              {leg.arrives}
              <span className="text-muted-foreground">
                {" "}
                · {leg.duration} ·{" "}
                {leg.stops === 0
                  ? "nonstop"
                  : `${leg.stops} stop via ${leg.via.join(", ")}`}
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function PlanView({ itinerary }: { itinerary: StoredItinerary }) {
  const { plan, flightOptions, flightSource } = itinerary;
  const recommended = flightOptions.find(
    (option) => option.id === plan.flight.recommended_offer_id,
  );
  const total = plan.budget.items.reduce((sum, item) => sum + item.amount, 0);

  return (
    <article className="flex flex-col gap-8">
      <header className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-2">
          <Badge variant="accent">AI-generated plan</Badge>
          {flightSource && flightSource.mode !== "live" ? (
            <Badge>Flights: {flightSource.name}</Badge>
          ) : null}
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-balance">
          {plan.title}
        </h1>
        <p className="max-w-3xl text-pretty text-muted-foreground">
          {plan.summary}
        </p>
      </header>

      <section aria-labelledby="flight-heading" className="flex flex-col gap-3">
        <h2 id="flight-heading" className="text-lg font-semibold">
          Suggested flight
        </h2>
        <Card className="flex flex-col gap-3 p-5">
          {recommended ? (
            <FlightCard option={recommended} sourceMode={flightSource?.mode} />
          ) : (
            <p className="text-sm text-muted-foreground">
              No flight was recommended.
            </p>
          )}
          <p className="text-sm">{plan.flight.rationale}</p>
          <p className="text-xs text-muted-foreground">
            Flight options are from a test environment: schedules and prices
            aren&apos;t real and can&apos;t be booked.
          </p>
        </Card>
      </section>

      <section aria-labelledby="days-heading" className="flex flex-col gap-3">
        <h2 id="days-heading" className="text-lg font-semibold">
          Day by day
        </h2>
        <ol className="flex flex-col gap-4">
          {plan.days.map((day, index) => (
            <li key={day.date}>
              <Card className="p-5">
                <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  Day {index + 1} · {formatDate(day.date)}
                </p>
                <h3 className="mt-1 text-base font-semibold">{day.title}</h3>
                <dl className="mt-3 grid gap-3 text-sm md:grid-cols-3">
                  {(
                    [
                      ["Morning", day.morning],
                      ["Afternoon", day.afternoon],
                      ["Evening", day.evening],
                    ] as const
                  ).map(([part, text]) => (
                    <div key={part}>
                      <dt className="font-medium">{part}</dt>
                      <dd className="mt-1 text-muted-foreground">{text}</dd>
                    </div>
                  ))}
                </dl>
                {day.note ? (
                  <p className="mt-3 rounded-lg bg-muted px-3 py-2 text-xs">
                    {day.note}
                  </p>
                ) : null}
              </Card>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="budget-heading" className="flex flex-col gap-3">
        <h2 id="budget-heading" className="text-lg font-semibold">
          Estimated budget
        </h2>
        <Card className="overflow-x-auto p-5">
          <table className="w-full text-sm">
            <caption className="sr-only">Estimated costs by category</caption>
            <tbody>
              {plan.budget.items.map((item, i) => (
                <tr
                  key={`${item.category}-${i}`}
                  className="border-b border-border last:border-0"
                >
                  <th scope="row" className="py-2 pr-4 text-left font-medium">
                    {CATEGORY_LABELS[item.category]}
                  </th>
                  <td className="py-2 pr-4 text-muted-foreground">
                    {item.note}
                  </td>
                  <td className="py-2 text-right whitespace-nowrap tabular-nums">
                    {money(item.amount, plan.budget.currency)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th scope="row" className="pt-3 text-left">
                  Estimated total
                </th>
                <td />
                <td className="pt-3 text-right font-semibold whitespace-nowrap tabular-nums">
                  {money(total, plan.budget.currency)}
                </td>
              </tr>
            </tfoot>
          </table>
          <p className="mt-3 text-xs text-muted-foreground">
            {plan.budget.notes} All amounts are rough estimates.
          </p>
        </Card>
      </section>

      <div className="grid gap-6 md:grid-cols-3">
        {(
          [
            ["Packing list", plan.packing_list],
            ["Tips", plan.tips],
            ["Check before you go", plan.caveats],
          ] as const
        ).map(([heading, items]) =>
          items.length > 0 ? (
            <section key={heading} className="flex flex-col gap-3">
              <h2 className="text-lg font-semibold">{heading}</h2>
              <Card className="p-5">
                <ul className="flex list-disc flex-col gap-1.5 pl-4 text-sm">
                  {items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </Card>
            </section>
          ) : null,
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        Created with AI. It can make mistakes: check opening hours, prices and
        entry requirements with official sources before you travel.
      </p>
    </article>
  );
}
