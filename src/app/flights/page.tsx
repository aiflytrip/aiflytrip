import type { Metadata } from "next";
import { Suspense } from "react";

import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import {
  FlightResults,
  FlightSearchForm,
  parseFlightSearch,
  parseResultOptions,
  ResultsSkeleton,
  SearchSummary,
  searchTitle,
} from "@/features/flights";
import { toIsoDate } from "@/features/flights/lib/dates";
import { searchToParams } from "@/features/flights/lib/search-params";

export async function generateMetadata({
  searchParams,
}: PageProps<"/flights">): Promise<Metadata> {
  const parsed = parseFlightSearch(await searchParams, toIsoDate(new Date()));
  const alternates = { canonical: "/flights" };
  if (parsed.status !== "valid") return { title: "Search flights", alternates };
  // Result pages are endless permutations of the same page: keep them out of search indexes.
  return {
    title: `${searchTitle(parsed.search)} flights`,
    alternates,
    robots: { index: false, follow: true },
  };
}

export default async function FlightsPage({
  searchParams,
}: PageProps<"/flights">) {
  const params = await searchParams;
  const parsed = parseFlightSearch(params, toIsoDate(new Date()));
  const options = parseResultOptions(params);

  // Remount the form when the URL changes (e.g. back/forward) so it mirrors the URL.
  const formKey = JSON.stringify(parsed.values);

  return (
    <Container className="flex flex-col gap-8 py-10">
      {parsed.status === "valid" ? (
        <SearchSummary search={parsed.search} />
      ) : (
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Search flights
          </h1>
          <p className="mt-2 text-muted-foreground">
            Pick your airports and dates to compare options.
          </p>
        </div>
      )}

      <Card className="p-5">
        <FlightSearchForm
          key={formKey}
          defaultValues={parsed.values}
          errors={parsed.status === "invalid" ? parsed.errors : undefined}
        />
      </Card>

      {parsed.status === "valid" ? (
        // Results label their own data source (sample / test mode).
        <Suspense
          key={`${searchToParams(parsed.search).toString()}|${options.sort}|${options.stops}`}
          fallback={<ResultsSkeleton />}
        >
          <FlightResults search={parsed.search} options={options} />
        </Suspense>
      ) : null}
    </Container>
  );
}
