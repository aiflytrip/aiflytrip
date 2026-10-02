import { type FlightDataSource } from "@/features/flights/types";

const NOTICES: Record<
  FlightDataSource["mode"],
  { title: string; body: string } | undefined
> = {
  sample: {
    title: "Sample data",
    body: "These results are generated locally for development. Airlines, schedules and prices are not real.",
  },
  test: {
    title: "Test mode",
    body: "These results come from the flight provider's sandbox. They are not real fares, may include test airlines such as Duffel Airways, and can't be booked.",
  },
  live: undefined,
};

/** Banner that makes it impossible to mistake test or sample results for real fares. */
export function DataSourceNotice({ source }: { source: FlightDataSource }) {
  const notice = NOTICES[source.mode];
  if (!notice) return null;

  return (
    <div
      role="note"
      aria-label={`${notice.title} results`}
      className="rounded-xl border border-border bg-accent px-4 py-3 text-sm text-accent-foreground"
    >
      <p>
        <span className="font-semibold">{notice.title}:</span> {notice.body}
      </p>
      <p className="mt-1 text-xs opacity-80">
        Source: {source.name}. Booking is not available.
      </p>
    </div>
  );
}
