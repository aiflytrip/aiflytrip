import type { Metadata } from "next";

import {
  FlightSearchPage,
  flightSearchMetadata,
} from "@/features/flights/components/flight-search-page";

export async function generateMetadata({
  searchParams,
}: PageProps<"/es/vuelos">): Promise<Metadata> {
  return flightSearchMetadata(await searchParams, "es");
}

export default async function SpanishFlightsPage({
  searchParams,
}: PageProps<"/es/vuelos">) {
  return <FlightSearchPage params={await searchParams} locale="es" />;
}
