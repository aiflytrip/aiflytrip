import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { countries, getCountry } from "@/content/registry";
import {
  DestinationView,
  destinationMetadata,
} from "@/features/content/components/destination-view";

// Links to scheduled posts appear on their publish date.
export const revalidate = 3600;
// Only curated destinations exist; anything else is a real 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return countries("es").map((c) => ({ country: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/es/destinos/[country]">): Promise<Metadata> {
  const page = getCountry((await params).country, "es");
  return page ? destinationMetadata(page) : {};
}

export default async function SpanishCountryPage({
  params,
}: PageProps<"/es/destinos/[country]">) {
  const page = getCountry((await params).country, "es");
  if (!page) notFound();
  return <DestinationView page={page} />;
}
