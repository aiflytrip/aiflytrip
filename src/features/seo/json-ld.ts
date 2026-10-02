import {
  type Destination,
  type Faq,
  type Guide,
  type Itinerary,
} from "@/content/schema";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/features/seo/metadata";

/**
 * Schema.org builders. Rules (see SEO.md):
 * - Only describe what is visibly on the page.
 * - No ratings, reviews, prices or offers we can't stand behind.
 * - FAQPage only when the same questions and answers are rendered visibly.
 */

type Thing = Record<string, unknown>;

const ORG_ID = () => `${absoluteUrl("/")}#organization`;
const SITE_ID = () => `${absoluteUrl("/")}#website`;

export function organizationLd(): Thing {
  return {
    "@type": "Organization",
    "@id": ORG_ID(),
    name: siteConfig.name,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/logo.png"),
    description: siteConfig.description,
  };
}

export function websiteLd(): Thing {
  return {
    "@type": "WebSite",
    "@id": SITE_ID(),
    name: siteConfig.name,
    url: absoluteUrl("/"),
    description: siteConfig.description,
    inLanguage: "en",
    publisher: { "@id": ORG_ID() },
  };
}

export function webApplicationLd(): Thing {
  return {
    "@type": "WebApplication",
    name: `${siteConfig.name} AI trip planner`,
    url: absoluteUrl("/travel-planner"),
    applicationCategory: "TravelApplication",
    operatingSystem: "Any (web browser)",
    description:
      "Creates a personalized, day-by-day trip plan with a flight suggestion and budget estimate from your dates, budget, pace and interests.",
    publisher: { "@id": ORG_ID() },
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbLd(crumbs: Crumb[]): Thing {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function faqLd(faqs: Faq[]): Thing | undefined {
  if (faqs.length === 0) return undefined;
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

function articleBase(page: {
  title: string;
  description: string;
  lastReviewed: string;
  path: string;
}): Thing {
  return {
    headline: page.title,
    description: page.description,
    url: absoluteUrl(page.path),
    mainEntityOfPage: absoluteUrl(page.path),
    // First published with the content system; lastReviewed tracks updates.
    datePublished: "2026-10-02",
    dateModified: page.lastReviewed,
    inLanguage: "en",
    author: {
      "@type": "Organization",
      name: `${siteConfig.name} editorial team`,
      url: absoluteUrl("/editorial-policy"),
    },
    publisher: { "@id": ORG_ID() },
    image: absoluteUrl(`${page.path}/opengraph-image`),
  };
}

export function destinationLd(page: Destination & { path: string }): Thing[] {
  return [
    {
      "@type": "Article",
      ...articleBase(page),
      about: { "@id": `${absoluteUrl(page.path)}#destination` },
    },
    {
      "@type":
        page.kind === "city"
          ? ["TouristDestination", "City"]
          : ["TouristDestination", "Country"],
      "@id": `${absoluteUrl(page.path)}#destination`,
      name: page.name,
      description: page.intro,
      url: absoluteUrl(page.path),
      includesAttraction: page.highlights.map((h) => ({
        "@type": "TouristAttraction",
        name: h.name,
        description: h.description,
      })),
    },
  ];
}

export function itineraryLd(page: Itinerary & { path: string }): Thing[] {
  return [
    {
      "@type": "Article",
      ...articleBase(page),
      about: {
        "@type": "TouristTrip",
        name: page.name,
        description: page.intro,
        itinerary: {
          "@type": "ItemList",
          numberOfItems: page.plan.length,
          itemListElement: page.plan.map((day, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: `Day ${i + 1}: ${day.title}`,
          })),
        },
      },
    },
  ];
}

export function guideLd(page: Guide & { path: string }): Thing[] {
  return [
    { "@type": "Article", ...articleBase(page), articleSection: page.category },
  ];
}

/** Wraps nodes in a single @graph document. */
export function graph(...nodes: (Thing | Thing[] | undefined)[]): Thing {
  return {
    "@context": "https://schema.org",
    "@graph": nodes.flat().filter(Boolean),
  };
}

/** Serializes JSON-LD safely for inline <script> tags. */
export function serializeJsonLd(data: Thing): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}
