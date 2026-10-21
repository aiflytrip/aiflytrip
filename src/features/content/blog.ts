import { type Guide } from "@/content/schema";
import { BLOG_COPY } from "@/i18n/pages/blog";

const ORDER: Guide["category"][] = [
  "flights",
  "itineraries",
  "planning",
  "practical",
];

/** Blog categories in display order, labelled in the given language. */
export const blogCategories = (locale: Guide["locale"] = "en") =>
  ORDER.map((id) => ({ id, ...BLOG_COPY[locale].categories[id] }));

/** Blog categories, in display order. */
export const BLOG_CATEGORIES = blogCategories("en");

export const categoryLabel = (
  id: Guide["category"],
  locale: Guide["locale"] = "en",
) => BLOG_COPY[locale].categories[id]?.label ?? "Blog";
