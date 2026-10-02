import { getGuide, publishedGuides } from "@/content/registry";
import { OG_SIZE, renderOgImage } from "@/features/seo/og-image";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "AIFlyTrip travel planning guide";

export function generateStaticParams() {
  return publishedGuides().map((g) => ({ slug: g.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const page = getGuide((await params).slug);
  return renderOgImage({
    eyebrow: "Travel planning guide",
    title: page?.headline ?? "Travel planning guide",
  });
}
