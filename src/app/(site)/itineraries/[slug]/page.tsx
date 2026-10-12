import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  getItinerary,
  isIndexable,
  publishedItineraries,
} from "@/content/registry";
import { ItineraryView } from "@/features/content/components/itinerary-view";
import { pageMetadata } from "@/features/seo/metadata";
import { ogImagePath } from "@/features/seo/og-targets";

// Scheduled itineraries go live on their publish date without a redeploy:
// pages regenerate at most hourly (ISR).
export const revalidate = 3600;
// Itineraries are hand-written; no URL pattern generates them. Unknown slugs
// render on demand and 404 unless the itinerary is live.
export const dynamicParams = true;

export function generateStaticParams() {
  return publishedItineraries().map((it) => ({ slug: it.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/itineraries/[slug]">): Promise<Metadata> {
  const page = getItinerary((await params).slug);
  if (!page) return {};
  return pageMetadata({
    title: page.title,
    description: page.description,
    path: page.path,
    type: "article",
    modifiedTime: page.lastReviewed,
    noindex: !isIndexable(page),
    image: ogImagePath(page.path),
  });
}

export default async function ItineraryPage({
  params,
}: PageProps<"/itineraries/[slug]">) {
  const page = getItinerary((await params).slug);
  if (!page) notFound();
  return <ItineraryView page={page} />;
}
