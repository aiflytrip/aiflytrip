import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FlightOfferCard } from "@/features/flights/components/flight-offer-card";
import { ResultsToolbar } from "@/features/flights/components/results-toolbar";
import { pluralize } from "@/features/flights/lib/format";
import {
  DEFAULT_RESULT_OPTIONS,
  withResultOptions,
  type ResultOptions,
} from "@/features/flights/lib/result-options";
import { searchToParams } from "@/features/flights/lib/search-params";
import { searchFlights } from "@/features/flights/server/search-flights";
import { type FlightOffer, type FlightSearch } from "@/features/flights/types";

/** Labels for the cheapest and fastest offers in the full result set. */
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
  const { offers, totalBeforeFilters } = await searchFlights(search, options);
  const searchParams = searchToParams(search);
  const labels = highlights(offers);

  return (
    <section aria-labelledby="results-heading" className="flex flex-col gap-4">
      <ResultsToolbar searchParams={searchParams} options={options} />
      <h2
        id="results-heading"
        className="text-sm text-muted-foreground"
        aria-live="polite"
      >
        {pluralize(offers.length, "flight")} found
        {offers.length !== totalBeforeFilters
          ? ` (${totalBeforeFilters} before filters)`
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
              />
            </li>
          ))}
        </ul>
      ) : (
        <Card className="flex flex-col items-center gap-3 p-10 text-center">
          <p className="font-semibold">No flights match these filters</p>
          <p className="max-w-sm text-sm text-muted-foreground">
            {totalBeforeFilters > 0
              ? "Try allowing connections to see more options."
              : "Try different dates or airports."}
          </p>
          {totalBeforeFilters > 0 ? (
            <ButtonLink
              href={`/flights?${withResultOptions(searchParams, { ...options, stops: DEFAULT_RESULT_OPTIONS.stops }).toString()}`}
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
