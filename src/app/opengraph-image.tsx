import { siteConfig } from "@/config/site";
import { OG_SIZE, renderOgImage } from "@/features/seo/og-image";

export const alt = `${siteConfig.name}: AI trip planner for personalized travel itineraries`;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    eyebrow: "AI trip planner",
    title: "Personalized travel itineraries, planned in minutes",
  });
}
