import {
  formatAirportLabel,
  getAirport,
} from "@/features/flights/data/airports";
import { formatDate, pluralize } from "@/features/flights/lib/format";
import { CABIN_LABELS, type FlightSearch } from "@/features/flights/types";

export function searchTitle(search: FlightSearch): string {
  const from = getAirport(search.origin);
  const to = getAirport(search.destination);
  return `${from?.city ?? search.origin} to ${to?.city ?? search.destination}`;
}

export function SearchSummary({ search }: { search: FlightSearch }) {
  const from = getAirport(search.origin);
  const to = getAirport(search.destination);

  const details = [
    search.returnDate
      ? `${formatDate(search.departDate)} – ${formatDate(search.returnDate)}`
      : `${formatDate(search.departDate)} · One way`,
    pluralize(search.adults, "adult"),
    CABIN_LABELS[search.cabin],
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        {from ? formatAirportLabel(from) : search.origin}
        <span aria-hidden="true" className="mx-2 text-muted-foreground">
          →
        </span>
        <span className="sr-only"> to </span>
        {to ? formatAirportLabel(to) : search.destination}
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {details.join(" · ")}
      </p>
    </div>
  );
}
