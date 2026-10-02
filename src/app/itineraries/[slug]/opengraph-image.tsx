import { getItinerary, publishedItineraries } from "@/content/registry";
import { OG_SIZE, renderOgImage } from "@/features/seo/og-image";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "AIFlyTrip itinerary";

export function generateStaticParams() {
  return publishedItineraries().map((it) => ({ slug: it.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const page = getItinerary((await params).slug);
  return renderOgImage({
    eyebrow: page ? `${page.days}-day itinerary` : "Itinerary",
    title: page?.name ?? "Itinerary",
  });
}
