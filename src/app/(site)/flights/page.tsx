import type { Metadata } from "next";

import {
  FlightSearchPage,
  flightSearchMetadata,
} from "@/features/flights/components/flight-search-page";

export async function generateMetadata({
  searchParams,
}: PageProps<"/flights">): Promise<Metadata> {
  return flightSearchMetadata(await searchParams, "en");
}

export default async function FlightsPage({
  searchParams,
}: PageProps<"/flights">) {
  return <FlightSearchPage params={await searchParams} locale="en" />;
}
