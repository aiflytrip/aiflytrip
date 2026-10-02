import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DataSourceNotice } from "@/features/flights/components/data-source-notice";
import { FlightOfferCard } from "@/features/flights/components/flight-offer-card";
import { ResultsToolbar } from "@/features/flights/components/results-toolbar";
import { SearchError } from "@/features/flights/components/search-error";
import { pluralize } from "@/features/flights/lib/format";
import {
  DEFAULT_RESULT_OPTIONS,
  withResultOptions,
  type ResultOptions,
} from "@/features/flights/lib/result-options";
import { searchToParams } from "@/features/flights/lib/search-params";
import { FlightSearchError } from "@/features/flights/server/errors";
import {
  searchFlights,
  type FlightSearchResult,
} from "@/features/flights/server/search-flights";
import { type FlightOffer, type FlightSearch } from "@/features/flights/types";

/** Labels for the cheapest and fastest offers among the displayed results. */
function highlights(offers: FlightOffer[]): Map<string, string> {
  const labels = new Map<string, string>();
  const totalMinutes = (o: FlightOffer) =>
    o.outbound.durationMinutes + (o.inbound?.durationMinutes ?? 0);
  const cheapest = offers.reduce<FlightOffer | undefined>(
    (best, o) =>
      !best || o.totalPrice.amountMinor < best.totalPrice.amountMinor
        ? o
        : best,
    undefined,
  );
  const fastest = offers.reduce<FlightOffer | undefined>(
    (best, o) => (!best || totalMinutes(o) < totalMinutes(best) ? o : best),
    undefined,
  );
  if (cheapest) labels.set(cheapest.id, "Cheapest");
  if (fastest) {
    labels.set(
      fastest.id,
      fastest === cheapest ? "Cheapest & fastest" : "Fastest",
    );
  }
  return labels;
}

export async function FlightResults({
  search,
  options,
}: {
  search: FlightSearch;
  options: ResultOptions;
}) {
  const searchParams = searchToParams(search);
  const href = (next: ResultOptions) =>
    `/flights?${withResultOptions(searchParams, next).toString()}`;

  let result: FlightSearchResult;
  try {
    result = await searchFlights(search, options);
  } catch (error) {
    // Expected failures get a friendly message; anything else is a bug and
    // goes to the route's error boundary.
    if (error instanceof FlightSearchError) {
      return <SearchError kind={error.kind} retryHref={href(options)} />;
    }
    throw error;
  }

  const { offers, totalMatching, totalBeforeFilters, source } = result;
  const labels = highlights(offers);
  const filteredOut = totalMatching !== totalBeforeFilters;

  return (
    <section aria-labelledby="results-heading" className="flex flex-col gap-4">
      <DataSourceNotice source={source} />
      <ResultsToolbar searchParams={searchParams} options={options} />
      <h2
        id="results-heading"
        className="text-sm text-muted-foreground"
        aria-live="polite"
      >
        {pluralize(totalMatching, "flight")} found
        {filteredOut ? ` (${totalBeforeFilters} before filters)` : ""}
        {offers.length < totalMatching
          ? ` · showing the top ${offers.length}`
          : ""}
      </h2>

      {offers.length > 0 ? (
        <ul className="flex flex-col gap-4">
          {offers.map((offer) => (
            <li key={offer.id}>
              <FlightOfferCard
                offer={offer}
                travellers={search.adults}
                highlight={labels.get(offer.id)}
                sourceMode={source.mode}
              />
            </li>
          ))}
        </ul>
      ) : (
        <Card className="flex flex-col items-center gap-3 p-10 text-center">
          <p className="font-semibold">
            {totalBeforeFilters > 0
              ? "No flights match these filters"
              : "No flights found"}
          </p>
          <p className="max-w-sm text-sm text-muted-foreground">
            {totalBeforeFilters > 0
              ? "Try allowing connections to see more options."
              : source.mode === "test"
                ? "The test environment has no flights for this search. Try other dates or a busier route."
                : "Try different dates or airports."}
          </p>
          {totalBeforeFilters > 0 ? (
            <ButtonLink
              href={href({ ...options, stops: DEFAULT_RESULT_OPTIONS.stops })}
              variant="secondary"
              scroll={false}
            >
              Show all flights
            </ButtonLink>
          ) : null}
        </Card>
      )}
    </section>
  );
}
