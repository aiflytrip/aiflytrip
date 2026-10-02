import { countries, getCountry } from "@/content/registry";
import { OG_SIZE, renderOgImage } from "@/features/seo/og-image";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "AIFlyTrip destination guide";

export function generateStaticParams() {
  return countries().map((c) => ({ country: c.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ country: string }>;
}) {
  const page = getCountry((await params).country);
  return renderOgImage({
    eyebrow: "Destination guide",
    title: page?.headline ?? "Destination guide",
  });
}
