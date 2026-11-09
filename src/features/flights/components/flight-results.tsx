import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DataSourceNotice } from "@/features/flights/components/data-source-notice";
import { FlightOfferCard } from "@/features/flights/components/flight-offer-card";
import { ResultsToolbar } from "@/features/flights/components/results-toolbar";
import { SearchError } from "@/features/flights/components/search-error";
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
import {
  FLIGHT_MESSAGES,
  type FlightLocale,
  type FlightMessages,
} from "@/i18n/messages/flights";

/** Labels for the cheapest and fastest offers among the displayed results. */
function highlights(
  offers: FlightOffer[],
  t: FlightMessages["results"],
): Map<string, string> {
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
  if (cheapest) labels.set(cheapest.id, t.cheapest);
  if (fastest) {
    labels.set(
      fastest.id,
      fastest === cheapest ? t.cheapestAndFastest : t.fastest,
    );
  }
  return labels;
}

export async function FlightResults({
  search,
  options,
  locale = "en",
}: {
  search: FlightSearch;
  options: ResultOptions;
  locale?: FlightLocale;
}) {
  const t = FLIGHT_MESSAGES[locale];
  const searchParams = searchToParams(search);
  const href = (next: ResultOptions) =>
    `${t.path}?${withResultOptions(searchParams, next).toString()}`;

  let result: FlightSearchResult;
  try {
    result = await searchFlights(search, options);
  } catch (error) {
    // Expected failures get a friendly message; anything else is a bug and
    // goes to the route's error boundary.
    if (error instanceof FlightSearchError) {
      return (
        <SearchError
          kind={error.kind}
          retryHref={href(options)}
          locale={locale}
        />
      );
    }
    throw error;
  }

  const { offers, totalMatching, totalBeforeFilters, source } = result;
  const labels = highlights(offers, t.results);
  const filteredOut = totalMatching !== totalBeforeFilters;

  return (
    <section aria-labelledby="results-heading" className="flex flex-col gap-4">
      <DataSourceNotice source={source} locale={locale} />
      <ResultsToolbar
        searchParams={searchParams}
        options={options}
        locale={locale}
      />
      <h2
        id="results-heading"
        className="text-sm text-muted-foreground"
        aria-live="polite"
      >
        {t.results.found(totalMatching)}
        {filteredOut ? t.results.beforeFilters(totalBeforeFilters) : ""}
        {offers.length < totalMatching
          ? t.results.showingTop(offers.length)
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
                locale={locale}
              />
            </li>
          ))}
        </ul>
      ) : (
        <Card className="flex flex-col items-center gap-3 p-10 text-center">
          <p className="font-semibold">
            {totalBeforeFilters > 0 ? t.results.noMatch : t.results.noFlights}
          </p>
          <p className="max-w-sm text-sm text-muted-foreground">
            {totalBeforeFilters > 0
              ? t.results.allowConnections
              : source.mode === "test"
                ? t.results.testEmpty
                : t.results.tryOther}
          </p>
          {totalBeforeFilters > 0 ? (
            <ButtonLink
              href={href({ ...options, stops: DEFAULT_RESULT_OPTIONS.stops })}
              variant="secondary"
              scroll={false}
            >
              {t.results.showAll}
            </ButtonLink>
          ) : null}
        </Card>
      )}
    </section>
  );
}
