import { type FlightOffer, type FlightSearch } from "@/features/flights/types";

/**
 * Contract every flight data source implements. Phase 3 adds a real provider
 * alongside the mock one; pages and components only depend on this type.
 */
export type FlightSearchProvider = {
  name: string;
  search(query: FlightSearch): Promise<FlightOffer[]>;
};
