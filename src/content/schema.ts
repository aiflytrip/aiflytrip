import { z } from "zod";

/**
 * Content model for public, indexable pages. Everything published on the
 * site is plain data validated against these schemas, then scored by the
 * quality gate (quality.ts) before it may be indexed.
 *
 * Editorial rules (see SEO.md):
 * - Never state visa rules, prices, schedules, opening hours or travel
 *   restrictions as facts. Point to the official sources listed per page.
 * - Every page lists authoritative sources and a lastReviewed date.
 */

const slug = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "lowercase-kebab-case slug");
const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
const text = z.string().trim().min(1);

export const SourceSchema = z.object({
  label: text,
  publisher: text,
  url: z
    .url()
    .refine((u) => u.startsWith("https://"), "sources must use https"),
});

export const FaqSchema = z.object({ question: text, answer: text });

const SeoSchema = z.object({
  /** Page title without the " | AIFlyTrip" suffix. */
  title: text,
  /** Meta description. */
  description: text,
});

const PublishingSchema = z.object({
  status: z.enum(["published", "draft"]),
  lastReviewed: isoDate,
  sources: z.array(SourceSchema),
});

export const DestinationSchema = SeoSchema.merge(PublishingSchema).extend({
  kind: z.enum(["country", "city"]),
  slug,
  /** Parent country slug, for cities. */
  country: slug.optional(),
  name: text,
  headline: text,
  intro: text,
  overview: z.array(text),
  bestTime: z.object({
    summary: text,
    seasons: z.array(z.object({ name: text, months: text, notes: text })),
  }),
  tripLength: z.object({
    summary: text,
    options: z.array(z.object({ days: text, description: text })),
  }),
  highlights: z.array(z.object({ name: text, description: text })),
  gettingAround: z.array(text),
  planning: z.array(z.object({ topic: text, detail: text })),
  tips: z.array(text),
  faqs: z.array(FaqSchema),
  /** IATA codes for the flight search, if the airport is supported there. */
  airports: z.array(z.string().regex(/^[A-Z]{3}$/)).default([]),
  related: z.object({
    destinations: z.array(z.string()).default([]),
    itineraries: z.array(slug).default([]),
    guides: z.array(slug).default([]),
  }),
});

export const ItinerarySchema = SeoSchema.merge(PublishingSchema).extend({
  slug,
  /** Scheduled publishing, as for blog posts: hidden until this UTC date. */
  publishAt: isoDate.optional(),
  /** Path of the destination page this itinerary belongs to. */
  destination: z.string().regex(/^\/destinations\/[a-z0-9-]+(\/[a-z0-9-]+)?$/),
  name: text,
  headline: text,
  intro: text,
  days: z.number().int().min(1).max(21),
  bestFor: z.array(text),
  plan: z.array(
    z.object({
      title: text,
      morning: text,
      afternoon: text,
      evening: text,
      tip: text.optional(),
    }),
  ),
  adjustments: z.array(z.object({ title: text, detail: text })),
  /** Where to stay, what to book ahead, transport: practical, non-time-sensitive advice. */
  practicalNotes: z.array(z.object({ title: text, detail: text })),
  faqs: z.array(FaqSchema),
  related: z.object({
    itineraries: z.array(slug).default([]),
    guides: z.array(slug).default([]),
  }),
});

export const GuideSchema = SeoSchema.merge(PublishingSchema).extend({
  slug,
  headline: text,
  intro: text,
  /** Key into BLOG_PHOTOS for the article banner and blog cards. */
  photo: z.string().optional(),
  /**
   * Scheduled publishing: a published post stays hidden (no page, sitemap
   * or links) until this UTC date, then appears without a redeploy.
   */
  publishAt: isoDate.optional(),
  /** Blog category, used for grouping on /blog and related posts. */
  category: z.enum(["flights", "planning", "itineraries", "practical"]),
  sections: z.array(
    z.object({
      heading: text,
      paragraphs: z.array(text),
      bullets: z.array(text).default([]),
    }),
  ),
  faqs: z.array(FaqSchema),
  related: z.object({
    destinations: z.array(z.string()).default([]),
    itineraries: z.array(slug).default([]),
    guides: z.array(slug).default([]),
  }),
});

export type Source = z.infer<typeof SourceSchema>;
export type Faq = z.infer<typeof FaqSchema>;
export type Destination = z.infer<typeof DestinationSchema>;
export type Itinerary = z.infer<typeof ItinerarySchema>;
export type Guide = z.infer<typeof GuideSchema>;
