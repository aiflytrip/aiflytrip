import { type Guide } from "@/content/schema";

/** Blog categories, in display order. */
export const BLOG_CATEGORIES: {
  id: Guide["category"];
  label: string;
  description: string;
}[] = [
  {
    id: "flights",
    label: "Flights",
    description:
      "Finding cheaper fares, comparing options and avoiding extra fees.",
  },
  {
    id: "itineraries",
    label: "Itineraries",
    description: "Building day-by-day plans that are realistic and enjoyable.",
  },
  {
    id: "planning",
    label: "Trip planning",
    description: "The big decisions: where, when and how long to go.",
  },
  {
    id: "practical",
    label: "Practical",
    description: "Documents, checklists and things to sort before you leave.",
  },
];

export const categoryLabel = (id: Guide["category"]) =>
  BLOG_CATEGORIES.find((c) => c.id === id)?.label ?? "Blog";
