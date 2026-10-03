import Link from "next/link";

import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { type Faq } from "@/content/schema";
import { PlannerCtaLink } from "@/features/analytics/planner-cta-link";
import {
  BulletList,
  ContentSection,
  FaqList,
  Prose,
  RelatedLinks,
} from "@/features/content/components/blocks";
import { destinationLinks, itineraryLinks } from "@/features/content/links";
import { Breadcrumbs, JsonLd } from "@/features/seo/components";
import { faqLd, graph, webApplicationLd } from "@/features/seo/json-ld";
import { pageMetadata } from "@/features/seo/metadata";

export const metadata = pageMetadata({
  title: "AI trip planner: personalized day-by-day itineraries",
  description:
    "Use AIFlyTrip's AI trip planner to turn your dates, budget, pace and interests into a day-by-day travel itinerary with flight options and a budget estimate.",
  path: "/travel-planner",
});

const STEPS = [
  {
    title: "Tell us about your trip",
    body: "Choose where you're flying from and to, your dates, travellers and cabin, then add an optional budget, your preferred pace, interests and any notes.",
  },
  {
    title: "We compare flight options",
    body: "AIFlyTrip searches flight options for your dates and shortlists a mix of the cheapest and fastest for the planner to consider.",
  },
  {
    title: "Get a day-by-day plan",
    body: "The AI drafts a morning, afternoon and evening plan for every day, recommends one of the flight options, and estimates your budget by category.",
  },
];

const FAQS: Faq[] = [
  {
    question: "What does the AIFlyTrip AI trip planner create?",
    answer:
      "It creates a personalized trip plan with a title and summary, a suggested flight from the options found for your dates, a morning, afternoon and evening plan for each day, an estimated budget by category, a packing list, practical tips and things to check before you go.",
  },
  {
    question: "Do I need an account to use the trip planner?",
    answer:
      "Yes. Creating a plan requires a free AIFlyTrip account, so your plans can be saved privately and revisited from any device. Your plans are only visible to you when you're signed in.",
  },
  {
    question: "Can I book flights or hotels through AIFlyTrip?",
    answer:
      "No. AIFlyTrip helps you plan and compare options, but it doesn't book flights or hotels. Flight options are currently shown from a test environment, so schedules and prices are examples rather than real, bookable fares.",
  },
  {
    question: "How accurate are AI-generated itineraries?",
    answer:
      "The planner is designed to produce realistic, well-structured plans, but AI can make mistakes. Treat each plan as a strong first draft and confirm opening days, prices, transport and entry requirements with official sources before you travel.",
  },
  {
    question: "Is there a premium version?",
    answer:
      "Yes, an optional premium upgrade unlocks a printable PDF of a plan. It is currently in test mode, which means no real payments are taken while we finish testing it.",
  },
];

export default function TravelPlannerPage() {
  return (
    <Container className="flex max-w-5xl flex-col gap-12 py-10">
      <JsonLd data={graph(webApplicationLd(), faqLd(FAQS))} />
      <div className="flex flex-col gap-5">
        <Breadcrumbs
          crumbs={[
            { name: "Home", path: "/" },
            { name: "AI trip planner", path: "/travel-planner" },
          ]}
        />
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          AI trip planner for personalized travel itineraries
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
          Plan a trip in minutes instead of hours. Tell AIFlyTrip where and when
          you&apos;re going, how you like to travel and what you enjoy, and get
          a day-by-day itinerary with a flight suggestion and a budget estimate
          you can refine.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <PlannerCtaLink
            href="/plan"
            placement="travel_planner_hero"
            size="lg"
          >
            Create your personalized trip plan
          </PlannerCtaLink>
          <ButtonLink href="/itineraries" variant="secondary" size="lg">
            Browse example itineraries
          </ButtonLink>
        </div>
      </div>

      <ContentSection id="how-it-works" title="How the AI trip planner works">
        <ol className="grid gap-4 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <li key={step.title}>
              <Card className="h-full p-5">
                <span className="grid size-9 place-items-center rounded-full bg-accent text-sm font-semibold text-accent-foreground">
                  {i + 1}
                </span>
                <h3 className="mt-3 font-semibold">{step.title}</h3>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  {step.body}
                </p>
              </Card>
            </li>
          ))}
        </ol>
      </ContentSection>

      <ContentSection id="what-you-get" title="What's in your trip plan">
        <BulletList
          items={[
            "A day-by-day itinerary with morning, afternoon and evening suggestions for every date of your trip.",
            "A recommended flight from the options found for your dates, with the reasoning behind it.",
            "An estimated budget by category (flights, accommodation, food, activities and local transport) in your currency.",
            "A packing list, practical tips and a list of things to check with official sources before you go.",
          ]}
        />
      </ContentSection>

      <ContentSection
        id="why"
        title="Why use an AI travel itinerary generator?"
      >
        <Prose
          paragraphs={[
            "Planning a trip usually means juggling dozens of tabs: guides, maps, flight searches and spreadsheets. An AI trip planner pulls those steps together and gives you a structured first draft built around your own priorities, so you spend your time refining a plan rather than starting from a blank page.",
            "Because the plan is shaped by your pace and interests, it can look very different for a relaxed food-focused weekend than for a packed sightseeing trip, even for the same city. You stay in control: change the details and generate a new version whenever you like.",
          ]}
        />
      </ContentSection>

      <ContentSection id="honest-limits" title="What AIFlyTrip doesn't do">
        <Prose
          paragraphs={[
            "AIFlyTrip is a planning tool. It doesn't book flights, hotels or activities, and it doesn't take payments for travel. Flight options currently come from a test environment, so they are examples for planning rather than live fares. Always confirm prices, timetables, opening days and entry requirements with official sources before you book or travel.",
          ]}
        />
      </ContentSection>

      <FaqList faqs={FAQS} />

      <RelatedLinks
        title="Get inspired"
        links={[
          ...itineraryLinks(["paris-3-days", "tokyo-5-days", "lisbon-3-days"]),
          ...destinationLinks([
            "/destinations/japan",
            "/destinations/portugal",
            "/destinations/italy",
          ]),
        ]}
      />

      <p className="text-sm text-muted-foreground">
        New to trip planning? Read{" "}
        <Link
          href="/blog/how-to-plan-a-trip"
          className="text-primary hover:underline"
        >
          our step-by-step guide to planning a trip
        </Link>
        .
      </p>
    </Container>
  );
}
