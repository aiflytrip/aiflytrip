import {
  type FlightDataSource,
  type FlightOffer,
  type FlightSearch,
} from "@/features/flights/types";

/**
 * Contract every flight data source implements. Pages and components only
 * depend on this type, so providers can be swapped via configuration.
 *
 * `search` must throw `FlightSearchError` for failures the UI should explain
 * (bad config, rate limits, outages); anything else is treated as a bug.
 */
export type FlightSearchProvider = {
  source: FlightDataSource;
  search(
    query: FlightSearch,
    options?: { signal?: AbortSignal },
  ): Promise<FlightOffer[]>;
};
