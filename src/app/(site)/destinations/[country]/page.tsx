import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { countries, getCountry, isIndexable } from "@/content/registry";
import { DestinationView } from "@/features/content/components/destination-view";
import { pageMetadata } from "@/features/seo/metadata";
import { ogImagePath } from "@/features/seo/og-targets";

// Links to scheduled itineraries and posts appear on their publish date.
export const revalidate = 3600;
// Only curated destinations exist; anything else is a real 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return countries().map((c) => ({ country: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/destinations/[country]">): Promise<Metadata> {
  const page = getCountry((await params).country);
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

export default async function CountryPage({
  params,
}: PageProps<"/destinations/[country]">) {
  const page = getCountry((await params).country);
  if (!page) notFound();
  return <DestinationView page={page} />;
}
