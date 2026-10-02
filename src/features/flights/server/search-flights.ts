import "server-only";

import {
  applyResultOptions,
  type ResultOptions,
} from "@/features/flights/lib/result-options";
import { searchToParams } from "@/features/flights/lib/search-params";
import { createDuffelProvider } from "@/features/flights/server/duffel/provider";
import { FlightSearchError } from "@/features/flights/server/errors";
import { mockFlightProvider } from "@/features/flights/server/mock-provider";
import { type FlightSearchProvider } from "@/features/flights/server/provider";
import { createSearchCache } from "@/features/flights/server/search-cache";
import {
  type FlightDataSource,
  type FlightOffer,
  type FlightSearch,
} from "@/features/flights/types";
import { createDuffelClient } from "@/server/duffel/client";
import { getServerEnv } from "@/server/env";

/** Simulated network latency so loading states are visible with mock data. */
const MOCK_LATENCY_MS = 600;
/** Most offers rendered at once; the rest are summarized in the UI. */
export const MAX_DISPLAYED_OFFERS = 50;

/**
 * Sorting and filtering reuse cached offers instead of re-searching. This
 * keeps us well inside Duffel's search rate limit (about 10/minute) and
 * search-to-book ratio. 10 minutes stays below typical offer expiry.
 */
const cache = createSearchCache<FlightOffer[]>({
  ttlMs: 10 * 60_000,
  maxEntries: 200,
});

let resolvedProvider: FlightSearchProvider | undefined;

function getProvider(): FlightSearchProvider {
  if (resolvedProvider) return resolvedProvider;

  const config = getServerEnv();
  if (!config.ok) {
    console.error("[flights] Invalid server configuration", {
      problems: config.problems,
    });
    throw new FlightSearchError("configuration", config.problems.join("; "));
  }

  const { FLIGHTS_PROVIDER, DUFFEL_ACCESS_TOKEN } = config.env;
  resolvedProvider =
    FLIGHTS_PROVIDER === "duffel" && DUFFEL_ACCESS_TOKEN
      ? createDuffelProvider(createDuffelClient(DUFFEL_ACCESS_TOKEN))
      : mockFlightProvider;
  return resolvedProvider;
}

export type FlightSearchResult = {
  /** Sorted, filtered offers, capped at MAX_DISPLAYED_OFFERS. */
  offers: FlightOffer[];
  /** Offers after filters, before the display cap. */
  totalMatching: number;
  /** Offers before filters, so the UI can tell "no flights" from "filtered out". */
  totalBeforeFilters: number;
  source: FlightDataSource;
};

/** Throws FlightSearchError for failures the UI should explain. */
export async function searchFlights(
  query: FlightSearch,
  options: ResultOptions,
): Promise<FlightSearchResult> {
  const provider = getProvider();
  const key = `${provider.source.id}:${searchToParams(query).toString()}`;

  const offers = await cache.get(key, async () => {
    if (provider.source.mode === "sample") {
      await new Promise((resolve) => setTimeout(resolve, MOCK_LATENCY_MS));
    }
    return provider.search(query);
  });

  const matching = applyResultOptions(offers, options);
  return {
    offers: matching.slice(0, MAX_DISPLAYED_OFFERS),
    totalMatching: matching.length,
    totalBeforeFilters: offers.length,
    source: provider.source,
  };
}
