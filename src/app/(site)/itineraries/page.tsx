import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { getDestinationByPath, publishedItineraries } from "@/content/registry";
import { PlannerCta } from "@/features/content/components/blocks";
import { Breadcrumbs } from "@/features/seo/components";
import { pageMetadata } from "@/features/seo/metadata";

export const metadata = pageMetadata({
  title: "Free travel itineraries: day-by-day trip plans",
  description:
    "Hand-written, day-by-day travel itineraries for popular cities, with practical notes, ways to adapt each plan and links to destination guides.",
  path: "/itineraries",
});

export default function ItinerariesPage() {
  return (
    <Container className="flex max-w-5xl flex-col gap-10 py-10">
      <div className="flex flex-col gap-4">
        <Breadcrumbs
          crumbs={[
            { name: "Home", path: "/" },
            { name: "Itineraries", path: "/itineraries" },
          ]}
        />
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Day-by-day travel itineraries
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
          Each itinerary is written by hand and grouped by neighbourhood to keep
          travel time down. Use one as-is, adapt it with the suggestions on each
          page, or let the AI trip planner tailor a plan to your own dates and
          interests.
        </p>
      </div>
      <ul className="grid gap-6 md:grid-cols-3">
        {publishedItineraries().map((it) => {
          const destination = getDestinationByPath(it.destination);
          return (
            <li
              key={it.path}
              className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5"
            >
              <Badge variant="accent" className="self-start">
                {it.days} days
              </Badge>
              <h2 className="text-lg font-semibold">
                <Link
                  href={it.path}
                  className="hover:text-primary hover:underline"
                >
                  {it.name}
                </Link>
              </h2>
              <p className="text-sm leading-6 text-muted-foreground">
                {it.description}
              </p>
              {destination ? (
                <Link
                  href={destination.path}
                  className="mt-auto text-sm text-primary hover:underline"
                >
                  {destination.name} travel guide
                </Link>
              ) : null}
            </li>
          );
        })}
      </ul>
      <PlannerCta
        heading="Want an itinerary built around you?"
        body="Tell the AI trip planner your dates, budget, pace and interests for a plan that fits your trip."
      />
    </Container>
  );
}
