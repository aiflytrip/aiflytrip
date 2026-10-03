import { env } from "@/lib/env";

export type NavItem = {
  label: string;
  href: string;
};

export const siteConfig = {
  name: "AIFlyTrip",
  tagline: "Your free AI trip planner.",
  description:
    "AIFlyTrip is a free AI trip planner that turns your dates, budget and interests into a personalized, day-by-day travel itinerary with flight options and a budget estimate.",
  url: env.siteUrl,
  nav: [
    { label: "AI trip planner", href: "/travel-planner" },
    { label: "Destinations", href: "/destinations" },
    { label: "Itineraries", href: "/itineraries" },
    { label: "Blog", href: "/blog" },
    { label: "Flights", href: "/flights" },
  ] satisfies NavItem[],
} as const;
