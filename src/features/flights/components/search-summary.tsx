import {
  formatAirportLabel,
  getAirport,
} from "@/features/flights/data/airports";
import { formatDate } from "@/features/flights/lib/format";
import { type FlightSearch } from "@/features/flights/types";
import { FLIGHT_MESSAGES, type FlightLocale } from "@/i18n/messages/flights";

export function searchTitle(
  search: FlightSearch,
  locale: FlightLocale = "en",
): string {
  const from = getAirport(search.origin);
  const to = getAirport(search.destination);
  return FLIGHT_MESSAGES[locale].summary.route(
    from?.city ?? search.origin,
    to?.city ?? search.destination,
  );
}

export function SearchSummary({
  search,
  locale = "en",
}: {
  search: FlightSearch;
  locale?: FlightLocale;
}) {
  const t = FLIGHT_MESSAGES[locale];
  const from = getAirport(search.origin);
  const to = getAirport(search.destination);

  const details = [
    search.returnDate
      ? `${formatDate(search.departDate, t.intl)} – ${formatDate(search.returnDate, t.intl)}`
      : `${formatDate(search.departDate, t.intl)} · ${t.summary.oneWay}`,
    t.form.adults(search.adults),
    t.cabins[search.cabin],
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        {from ? formatAirportLabel(from) : search.origin}
        <span aria-hidden="true" className="mx-2 text-muted-foreground">
          →
        </span>
        <span className="sr-only">{t.summary.srTo}</span>
        {to ? formatAirportLabel(to) : search.destination}
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {details.join(" · ")}
      </p>
    </div>
  );
}
