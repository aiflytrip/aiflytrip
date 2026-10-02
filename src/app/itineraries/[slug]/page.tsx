import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  getItinerary,
  isIndexable,
  publishedItineraries,
} from "@/content/registry";
import { ItineraryView } from "@/features/content/components/itinerary-view";
import { pageMetadata } from "@/features/seo/metadata";

// Itineraries are hand-written; no URL pattern generates them.
export const dynamicParams = false;

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
    image: `${page.path}/opengraph-image`,
  });
}

export default async function ItineraryPage({
  params,
}: PageProps<"/itineraries/[slug]">) {
  const page = getItinerary((await params).slug);
  if (!page) notFound();
  return <ItineraryView page={page} />;
}
