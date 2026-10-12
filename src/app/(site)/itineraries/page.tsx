import Link from "next/link";

import { Container } from "@/components/ui/container";
import { getDestinationByPath, publishedItineraries } from "@/content/registry";
import { type Faq } from "@/content/schema";
import {
  ContentSection,
  FaqList,
  PlannerCta,
  Prose,
} from "@/features/content/components/blocks";
import { DestinationCard } from "@/features/content/components/destination-card";
import { Breadcrumbs, JsonLd } from "@/features/seo/components";
import { faqLd, graph } from "@/features/seo/json-ld";
import { pageMetadata } from "@/features/seo/metadata";

// Scheduled itineraries appear on their publish date without a redeploy.
export const revalidate = 3600;

export const metadata = pageMetadata({
  title: "Free travel itineraries: day-by-day trip plans",
  description:
    "Free, carefully researched day-by-day travel itineraries for popular cities, with practical notes, ways to adapt each plan and destination guides.",
  path: "/itineraries",
});

const FAQS: Faq[] = [
  {
    question: "Can I change an itinerary to suit my trip?",
    answer:
      "Yes. Each itinerary is grouped by neighbourhood, so you can swap whole days around, drop a day for a shorter trip or add a free afternoon. Every itinerary page also lists suggested changes, such as a slower pace or ideas for an extra day.",
  },
  {
    question: "Are these itineraries kept up to date?",
    answer:
      "Each itinerary shows the date it was last reviewed. Opening hours, prices and timetables can change at any time, so check the official websites linked from our destination guides before you go.",
  },
  {
    question: "Can I get an itinerary for a different city or trip length?",
    answer:
      "Yes. Our free AI trip planner creates a day-by-day itinerary for your own destination, dates, budget and interests, with a suggested flight and a budget estimate. You don't need an account to use it.",
  },
];

export default function ItinerariesPage() {
  const itineraries = publishedItineraries();

  return (
    <Container className="flex max-w-5xl flex-col gap-12 py-10">
      <JsonLd data={graph(faqLd(FAQS))} />
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
          Free, ready-made itineraries for popular cities. Each one is carefully
          researched and grouped by neighbourhood to keep travel time down. Use
          one as it is, adapt it with the suggestions on each page, or let the
          AI trip planner tailor a plan to your own dates and interests.
        </p>
      </div>

      <ul className="grid gap-5 md:grid-cols-3">
        {itineraries.map((it) => {
          const destination = getDestinationByPath(it.destination);
          return (
            <li key={it.path}>
              <DestinationCard
                href={it.path}
                slug={destination?.slug ?? ""}
                name={it.name}
                summary={it.description}
                badge={`${it.days} days`}
                heading="h2"
                sizes="(min-width: 768px) 33vw, 100vw"
              />
            </li>
          );
        })}
      </ul>

      <ContentSection id="how-to-use" title="How to use these itineraries">
        <Prose
          paragraphs={[
            "Each itinerary plans every day as morning, afternoon and evening, and keeps each day in one or two areas so you spend more time exploring and less time travelling. You can follow a plan exactly, or treat it as a starting point and change it to fit your interests.",
            "For a shorter trip, keep the days you care about most and drop the rest. For a longer one, add a free day or a day trip; each itinerary page suggests options. If you would like a plan built from scratch for your own dates and budget, the free [AI trip planner](/travel-planner) creates one in a couple of minutes.",
            "Before you go, check opening days and book timed tickets for popular sights. Our guide on [how to make a travel itinerary](/blog/how-to-build-a-travel-itinerary) explains the method behind these plans, with a simple template you can copy.",
          ]}
        />
      </ContentSection>

      <ContentSection id="which-one" title="Which itinerary is right for you?">
        <ul className="grid gap-4 md:grid-cols-3">
          {itineraries.map((it) => {
            const destination = getDestinationByPath(it.destination);
            return (
              <li
                key={it.path}
                className="glass flex flex-col gap-2 rounded-3xl p-5"
              >
                <h3 className="font-semibold text-white">
                  <Link
                    href={it.path}
                    className="hover:text-primary hover:underline"
                  >
                    {it.name}
                  </Link>
                </h3>
                <p className="text-sm text-muted-foreground">
                  {it.days} days · Best for:{" "}
                  {it.bestFor.join(", ").toLowerCase()}
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
      </ContentSection>

      <PlannerCta
        heading="Want an itinerary built around you?"
        body="Tell the AI trip planner your dates, budget, pace and interests for a plan that fits your trip."
        placement="itineraries_hub"
      />

      <FaqList faqs={FAQS} />
    </Container>
  );
}
