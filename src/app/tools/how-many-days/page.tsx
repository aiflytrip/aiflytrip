import Link from "next/link";

import { Container } from "@/components/ui/container";
import { destinations, isLive } from "@/content/registry";
import { type Faq } from "@/content/schema";
import {
  ContentSection,
  FaqList,
  PlannerCta,
  Prose,
} from "@/features/content/components/blocks";
import { Breadcrumbs, JsonLd } from "@/features/seo/components";
import { faqLd, graph } from "@/features/seo/json-ld";
import { absoluteUrl, pageMetadata } from "@/features/seo/metadata";
import {
  DaysPlanner,
  type DestinationHint,
} from "@/features/tools/days/days-planner";

const PATH = "/tools/how-many-days";

export const metadata = pageMetadata({
  title: "How many days do I need? Free trip length planner",
  description:
    "Free trip length planner: add your stops, pace and day trips to see how many days and nights you need, with days per place and a check against your time off.",
  path: PATH,
});

const FAQS: Faq[] = [
  {
    question: "How does the trip length planner work?",
    answer:
      "Add each place you want to visit, choose whether it's a big city, a smaller town or a countryside base, and add any day trips. The planner suggests days for each stop, adds travel days between stops and at each end, and adjusts for your pace and who you travel with.",
  },
  {
    question: "Why does it suggest at least two days per stop?",
    answer:
      "Every hotel change costs time for packing, checking out, travelling and settling in. Two nights is the minimum for a stop to feel worthwhile; three or more lets you relax and take day trips.",
  },
  {
    question: "Does it count travel days?",
    answer:
      "Yes. It adds half a day for each move between stops, or a full day if journeys take more than a few hours, plus time at the start and end of the trip. Long-haul flights add more, because the journey and time-zone change can take most of a day at each end.",
  },
  {
    question: "What if I don't have enough days?",
    answer:
      "Enter the days you have and the planner shows whether your plan fits. If it's too packed, it suggests which stop to drop or turn into a day trip. Fewer stops usually make a better trip.",
  },
];

function plannerLd(): Record<string, unknown> {
  return {
    "@type": "WebApplication",
    name: "AIFlyTrip trip length planner",
    url: absoluteUrl(PATH),
    applicationCategory: "TravelApplication",
    operatingSystem: "Any (web browser)",
    isAccessibleForFree: true,
    description:
      "Free tool that suggests how many days a trip needs, with days per stop and travel days.",
  };
}

export default function HowManyDaysPage() {
  const hints: DestinationHint[] = destinations.filter(isLive).map((d) => ({
    name: d.name,
    path: d.path,
    summary: d.tripLength.summary,
  }));

  return (
    <Container className="flex max-w-6xl flex-col gap-12 py-10">
      <JsonLd data={graph(plannerLd(), faqLd(FAQS))} />
      <div className="flex flex-col gap-4">
        <Breadcrumbs
          crumbs={[
            { name: "Home", path: "/" },
            { name: "Free tools", path: "/tools" },
            { name: "How many days do I need?", path: PATH },
          ]}
        />
        <p className="eyebrow">Free tool</p>
        <h1 className="max-w-3xl text-4xl font-bold text-balance text-white sm:text-5xl">
          How many days do I need?
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
          Add the places you want to visit and how you like to travel. The
          planner suggests how many days to spend in each, adds the travel days
          people often forget and checks the plan against the time you have.
          Free, no sign-up.
        </p>
      </div>

      <DaysPlanner destinations={hints} />

      <ContentSection id="how-it-works" title="How the planner works">
        <Prose
          paragraphs={[
            "It uses the same rules of thumb as our guide on [how many days you need for a trip](/blog/how-many-days-for-a-trip). At a moderate pace, a big city with many neighbourhoods and museums gets four days, a smaller city or town two, and a countryside or beach base three. Each day trip adds a day, and no stop gets fewer than two days, because changing hotels more often eats into your time.",
            "A relaxed pace adds a day per stop and a fast pace removes one. Travelling with children or older relatives adds a day per stop, because every move takes more effort.",
          ]}
        />
      </ContentSection>

      <ContentSection id="travel-days" title="Don't forget travel days">
        <Prose
          paragraphs={[
            "Your real time on the ground is shorter than your dates. The planner adds half a day for each move between stops, or a full day when journeys take more than a few hours, and time at each end of the trip. A long-haul flight across several time zones adds a full day at each end, so plan a gentle first day.",
            "If a place is within an hour or two of your base, a day trip is often easier than moving hotels. Add it as a day trip from the nearest base instead of a separate stop.",
          ]}
        />
      </ContentSection>

      <ContentSection id="how-many-stops" title="How many stops is too many?">
        <Prose
          paragraphs={[
            "A useful guideline is about one base per three to four days. A week works well with one or two bases; two weeks can comfortably include three or four. The planner warns you when your plan has more stops than that, because frequent travel days make a trip tiring.",
            "Our guide on [how to plan a trip](/blog/how-to-plan-a-trip) covers the next steps once you know your trip length.",
          ]}
        />
      </ContentSection>

      <PlannerCta
        heading="Turn your days into a plan"
        body="Our free AI trip planner builds a day-by-day itinerary for the days you have, with flight options and a budget estimate. No sign-up needed."
        placement="days_planner"
      />

      <FaqList faqs={FAQS} />

      <p className="text-sm text-muted-foreground">
        More free tools:{" "}
        <Link
          href="/tools/trip-budget-calculator"
          className="text-primary hover:underline"
        >
          trip budget calculator
        </Link>{" "}
        and{" "}
        <Link
          href="/tools/layover-time-checker"
          className="text-primary hover:underline"
        >
          layover time checker
        </Link>
        .
      </p>
    </Container>
  );
}
