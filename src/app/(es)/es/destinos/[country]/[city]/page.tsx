import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { citiesOf, countries, getCity } from "@/content/registry";
import {
  DestinationView,
  destinationMetadata,
} from "@/features/content/components/destination-view";

// Links to scheduled posts appear on their publish date.
export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return countries("es").flatMap((c) =>
    citiesOf(c.slug, "es").map((city) => ({
      country: c.slug,
      city: city.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/es/destinos/[country]/[city]">): Promise<Metadata> {
  const { country, city } = await params;
  const page = getCity(country, city, "es");
  return page ? destinationMetadata(page) : {};
}

export default async function SpanishCityPage({
  params,
}: PageProps<"/es/destinos/[country]/[city]">) {
  const { country, city } = await params;
  const page = getCity(country, city, "es");
  if (!page) notFound();
  return <DestinationView page={page} />;
}
