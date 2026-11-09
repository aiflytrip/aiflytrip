import type { Metadata } from "next";
import { Suspense } from "react";

import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { FlightResults } from "@/features/flights/components/flight-results";
import { FlightSearchForm } from "@/features/flights/components/flight-search-form";
import { ResultsSkeleton } from "@/features/flights/components/results-skeleton";
import {
  SearchSummary,
  searchTitle,
} from "@/features/flights/components/search-summary";
import { toIsoDate } from "@/features/flights/lib/dates";
import { parseResultOptions } from "@/features/flights/lib/result-options";
import {
  parseFlightSearch,
  searchToParams,
  type RawSearchParams,
  type SearchFieldErrors,
} from "@/features/flights/lib/search-params";
import { SaveSearch } from "@/features/saved-trips";
import { FLIGHT_MESSAGES, type FlightLocale } from "@/i18n/messages/flights";
import { translatePlannerError } from "@/i18n/messages/planner";

export function flightSearchMetadata(
  params: RawSearchParams,
  locale: FlightLocale,
): Metadata {
  const t = FLIGHT_MESSAGES[locale];
  const parsed = parseFlightSearch(params, toIsoDate(new Date()));
  const alternates = { canonical: t.path };
  // Flight results currently come from test data, and result URLs are
  // endless permutations of one page: keep every flight search URL out of
  // search indexes until live fares exist (see SEO.md).
  const robots = { index: false, follow: true };
  if (parsed.status !== "valid") {
    return {
      title: t.meta.title,
      description: t.meta.description,
      alternates,
      robots,
    };
  }
  return {
    title: t.meta.resultsTitle(searchTitle(parsed.search, locale)),
    alternates,
    robots,
  };
}

/** Validation messages in the page's language (the planner shares them). */
function translateErrors(
  errors: SearchFieldErrors,
  locale: FlightLocale,
): SearchFieldErrors {
  return Object.fromEntries(
    Object.entries(errors).map(([field, message]) => [
      field,
      translatePlannerError(message, locale),
    ]),
  );
}

/** /flights and /es/vuelos: the search form, then results for a valid search. */
export function FlightSearchPage({
  params,
  locale,
}: {
  params: RawSearchParams;
  locale: FlightLocale;
}) {
  const t = FLIGHT_MESSAGES[locale];
  const parsed = parseFlightSearch(params, toIsoDate(new Date()));
  const options = parseResultOptions(params);

  // Remount the form when the URL changes (e.g. back/forward) so it mirrors the URL.
  const formKey = JSON.stringify(parsed.values);

  return (
    <Container className="flex flex-col gap-8 py-10">
      {parsed.status === "valid" ? (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <SearchSummary search={parsed.search} locale={locale} />
          <SaveSearch
            search={searchToParams(parsed.search).toString()}
            locale={locale}
          />
        </div>
      ) : (
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">{t.heading}</h1>
          <p className="mt-2 text-muted-foreground">{t.intro}</p>
        </div>
      )}

      <Card className="p-5">
        <FlightSearchForm
          key={formKey}
          defaultValues={parsed.values}
          errors={
            parsed.status === "invalid"
              ? translateErrors(parsed.errors, locale)
              : undefined
          }
          locale={locale}
        />
      </Card>

      {parsed.status === "valid" ? (
        // Results label their own data source (sample / test mode).
        <Suspense
          key={`${searchToParams(parsed.search).toString()}|${options.sort}|${options.stops}`}
          fallback={<ResultsSkeleton locale={locale} />}
        >
          <FlightResults
            search={parsed.search}
            options={options}
            locale={locale}
          />
        </Suspense>
      ) : null}
    </Container>
  );
}
