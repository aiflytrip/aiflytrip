import { env } from "@/lib/env";

export type NavItem = {
  label: string;
  href: string;
};

export const siteConfig = {
  name: "AIFlyTrip",
  tagline: "Smarter flights, planned by AI.",
  description:
    "AIFlyTrip helps you find flights and plan trips with an AI travel assistant that understands what you actually want.",
  url: env.siteUrl,
  nav: [
    { label: "Flights", href: "/flights" },
    { label: "Features", href: "/#features" },
    { label: "How it works", href: "/#how-it-works" },
  ] satisfies NavItem[],
} as const;
