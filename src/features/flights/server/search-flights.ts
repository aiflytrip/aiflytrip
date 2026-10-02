import "server-only";

import {
  applyResultOptions,
  type ResultOptions,
} from "@/features/flights/lib/result-options";
import { mockFlightProvider } from "@/features/flights/server/mock-provider";
import { type FlightSearchProvider } from "@/features/flights/server/provider";
import { type FlightOffer, type FlightSearch } from "@/features/flights/types";

/** Simulated network latency so loading states are visible with mock data. */
const MOCK_LATENCY_MS = 600;

const provider: FlightSearchProvider = mockFlightProvider;

export type FlightSearchResult = {
  offers: FlightOffer[];
  /** Offers before filtering, so the UI can tell "no flights" from "filtered out". */
  totalBeforeFilters: number;
  provider: string;
};

export async function searchFlights(
  query: FlightSearch,
  options: ResultOptions,
): Promise<FlightSearchResult> {
  if (provider.name === "mock") {
    await new Promise((resolve) => setTimeout(resolve, MOCK_LATENCY_MS));
  }
  const offers = await provider.search(query);
  return {
    offers: applyResultOptions(offers, options),
    totalBeforeFilters: offers.length,
    provider: provider.name,
  };
}
