import { siteConfig } from "@/config/site";
import { allContent, isIndexable } from "@/content/registry";
import { absoluteUrl } from "@/features/seo/metadata";

export const dynamic = "force-static";

/**
 * llms.txt: a plain-language map of the site's public, indexable content for
 * AI assistants and answer engines (https://llmstxt.org). Lists only pages
 * that are also in the sitemap; never private or user-specific URLs.
 */
export function GET() {
  const content = allContent().filter(isIndexable);
  const section = (title: string, prefix: string) => [
    `## ${title}`,
    "",
    ...content
      .filter((c) => c.path.startsWith(prefix))
      .map((c) => `- [${c.title}](${absoluteUrl(c.path)}): ${c.description}`),
    "",
  ];
  const body = [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.description}`,
    "",
    "AIFlyTrip is an AI trip planner. Signed-in users get a personalized day-by-day itinerary, a flight suggestion and a budget estimate. It does not book flights or hotels. Public guides link to official sources for entry requirements, prices and timetables, which change.",
    "",
    "## Product",
    "",
    `- [AI trip planner](${absoluteUrl("/travel-planner")}): what the planner creates, how it works and its limits.`,
    `- [About AIFlyTrip](${absoluteUrl("/about")})`,
    `- [Editorial policy](${absoluteUrl("/editorial-policy")}): how guides are written, sourced and reviewed.`,
    "",
    ...section("Destination guides", "/destinations/"),
    ...section("Itineraries", "/itineraries/"),
    ...section("Blog: flight savings and trip planning", "/blog/"),
  ].join("\n");
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
