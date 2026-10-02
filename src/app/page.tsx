import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import {
  countries,
  publishedGuides,
  publishedItineraries,
} from "@/content/registry";
import { FaqList } from "@/features/content/components/blocks";
import { FlightSearchForm } from "@/features/flights";
import { FeatureGrid, Hero, HowItWorks } from "@/features/marketing";
import { homeFaqs } from "@/features/marketing/content";
import { JsonLd } from "@/features/seo/components";
import {
  faqLd,
  graph,
  organizationLd,
  websiteLd,
} from "@/features/seo/json-ld";
import { pageMetadata } from "@/features/seo/metadata";

export const metadata = pageMetadata({
  title: "AIFlyTrip: AI trip planner and itinerary generator",
  absoluteTitle: true,
  description:
    "AIFlyTrip is an AI trip planner that turns your dates, budget and interests into a personalized day-by-day itinerary, with flight options and a budget estimate.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={graph(websiteLd(), organizationLd(), faqLd(homeFaqs))} />
      <Hero />
      <FeatureGrid />
      <HowItWorks />

      <section
        aria-labelledby="destinations-heading"
        className="py-16 sm:py-20"
      >
        <Container className="flex flex-col gap-8">
          <div className="flex flex-col gap-2 text-center">
            <h2
              id="destinations-heading"
              className="text-3xl font-semibold tracking-tight"
            >
              Destination guides to start planning
            </h2>
            <p className="text-muted-foreground">
              When to go, how long to stay and what to see, with official
              sources.
            </p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {countries().map((country) => (
              <li key={country.path}>
                <Link
                  href={country.path}
                  className="block h-full rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary"
                >
                  <span className="text-lg font-semibold">{country.name}</span>
                  <span className="mt-1 block text-sm leading-6 text-muted-foreground">
                    {country.tripLength.summary}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/destinations"
            className="self-center text-sm font-medium text-primary hover:underline"
          >
            Browse all destination guides
          </Link>
        </Container>
      </section>

      <section
        aria-labelledby="itineraries-heading"
        className="bg-muted py-16 sm:py-20"
      >
        <Container className="grid gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <h2
              id="itineraries-heading"
              className="text-2xl font-semibold tracking-tight"
            >
              Ready-made itineraries
            </h2>
            <ul className="flex flex-col gap-3">
              {publishedItineraries().map((it) => (
                <li key={it.path}>
                  <Link
                    href={it.path}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4 hover:border-primary"
                  >
                    <span className="font-medium">{it.name}</span>
                    <Badge variant="accent">{it.days} days</Badge>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold tracking-tight">
              Travel planning guides
            </h2>
            <ul className="flex flex-col gap-3">
              {publishedGuides().map((guide) => (
                <li key={guide.path}>
                  <Link
                    href={guide.path}
                    className="block rounded-2xl border border-border bg-card p-4 hover:border-primary"
                  >
                    <span className="font-medium">{guide.headline}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section aria-labelledby="flights-heading" className="py-16 sm:py-20">
        <Container className="flex flex-col gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h2
              id="flights-heading"
              className="text-2xl font-semibold tracking-tight"
            >
              Compare flight options
            </h2>
            <p className="text-muted-foreground">
              Search flights by route and dates.{" "}
              <Badge className="align-middle">Test data</Badge> Schedules and
              prices are examples for planning, not bookable fares.
            </p>
          </div>
          <Card className="mx-auto w-full max-w-5xl p-5 sm:p-6">
            <FlightSearchForm />
          </Card>
        </Container>
      </section>

      <Container className="max-w-3xl pb-20">
        <FaqList faqs={homeFaqs} headingId="home-faq-heading" />
      </Container>
    </>
  );
}
