import Link from "next/link";

import { Container } from "@/components/ui/container";
import { ContentSection, Prose } from "@/features/content/components/blocks";
import { Breadcrumbs, JsonLd } from "@/features/seo/components";
import { graph, organizationLd } from "@/features/seo/json-ld";
import { pageMetadata } from "@/features/seo/metadata";

export const metadata = pageMetadata({
  title: "About AIFlyTrip",
  description:
    "AIFlyTrip is an AI travel planner that turns your dates, budget and interests into a personalized, day-by-day trip plan. Learn what it does and how it works.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <Container className="flex max-w-3xl flex-col gap-10 py-10">
      <JsonLd data={graph(organizationLd())} />
      <div className="flex flex-col gap-4">
        <Breadcrumbs
          crumbs={[
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]}
        />
        <h1 className="text-4xl font-semibold tracking-tight">
          About AIFlyTrip
        </h1>
        <p className="text-lg leading-8 text-muted-foreground">
          AIFlyTrip helps travellers go from &ldquo;where should we go?&rdquo;
          to a realistic, day-by-day plan, without spending hours across dozens
          of browser tabs.
        </p>
      </div>
      <ContentSection id="what" title="What we do">
        <Prose
          paragraphs={[
            "AIFlyTrip combines an AI trip planner with flight search and practical travel guides. You describe your trip, including dates, budget, pace and interests, and the planner drafts an itinerary for every day, suggests a flight and estimates your budget.",
            "Alongside the planner, our destination guides, itineraries and travel planning guides help you understand when to go, how long to stay and how to get around, with links to official sources for anything that changes.",
          ]}
        />
      </ContentSection>
      <ContentSection id="principles" title="Our principles">
        <Prose
          paragraphs={[
            "We aim to be useful and honest. We don't publish invented visa rules, prices or timetables; where details change, we point you to official sources. AI-generated plans are clearly labelled, and we say plainly what AIFlyTrip doesn't do: it doesn't book flights or hotels.",
            "Your plans are private to your account. We don't show your trips, email address or payment details to anyone else, and private pages are never indexed by search engines.",
          ]}
        />
      </ContentSection>
      <p className="text-sm text-muted-foreground">
        Read how we write and review our content in our{" "}
        <Link href="/editorial-policy" className="text-primary hover:underline">
          editorial policy
        </Link>
        , or try the{" "}
        <Link href="/travel-planner" className="text-primary hover:underline">
          AI trip planner
        </Link>
        .
      </p>
    </Container>
  );
}
