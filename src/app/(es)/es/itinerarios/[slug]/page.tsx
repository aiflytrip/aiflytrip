import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getItinerary, publishedItineraries } from "@/content/registry";
import {
  ItineraryView,
  itineraryMetadata,
} from "@/features/content/components/itinerary-view";

// Scheduled itineraries go live on their publish date without a redeploy:
// pages regenerate at most hourly (ISR).
export const revalidate = 3600;
// Itineraries are hand-written; unknown slugs render on demand and 404
// unless the itinerary is live.
export const dynamicParams = true;

export function generateStaticParams() {
  return publishedItineraries("es").map((it) => ({ slug: it.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/es/itinerarios/[slug]">): Promise<Metadata> {
  const page = getItinerary((await params).slug, "es");
  return page ? itineraryMetadata(page) : {};
}

export default async function SpanishItineraryPage({
  params,
}: PageProps<"/es/itinerarios/[slug]">) {
  const page = getItinerary((await params).slug, "es");
  if (!page) notFound();
  return <ItineraryView page={page} />;
}
