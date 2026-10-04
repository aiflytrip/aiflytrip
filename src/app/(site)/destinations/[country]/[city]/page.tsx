import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { citiesOf, countries, getCity, isIndexable } from "@/content/registry";
import { DestinationView } from "@/features/content/components/destination-view";
import { pageMetadata } from "@/features/seo/metadata";
import { ogImagePath } from "@/features/seo/og-targets";

export const dynamicParams = false;

export function generateStaticParams() {
  return countries().flatMap((c) =>
    citiesOf(c.slug).map((city) => ({ country: c.slug, city: city.slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/destinations/[country]/[city]">): Promise<Metadata> {
  const { country, city } = await params;
  const page = getCity(country, city);
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

export default async function CityPage({
  params,
}: PageProps<"/destinations/[country]/[city]">) {
  const { country, city } = await params;
  const page = getCity(country, city);
  if (!page) notFound();
  return <DestinationView page={page} />;
}
