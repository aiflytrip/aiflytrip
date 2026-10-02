import { citiesOf, countries, getCity } from "@/content/registry";
import { OG_SIZE, renderOgImage } from "@/features/seo/og-image";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "AIFlyTrip city guide";

export function generateStaticParams() {
  return countries().flatMap((c) =>
    citiesOf(c.slug).map((city) => ({ country: c.slug, city: city.slug })),
  );
}

export default async function Image({
  params,
}: {
  params: Promise<{ country: string; city: string }>;
}) {
  const { country, city } = await params;
  const page = getCity(country, city);
  return renderOgImage({
    eyebrow: "City guide",
    title: page?.headline ?? "City guide",
  });
}
