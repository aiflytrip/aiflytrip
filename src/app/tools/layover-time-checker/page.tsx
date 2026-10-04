import Link from "next/link";

import { Container } from "@/components/ui/container";
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
import { LayoverChecker } from "@/features/tools/layover/layover-checker";
import { ASSUMPTIONS } from "@/features/tools/layover/layover";

const PATH = "/tools/layover-time-checker";

export const metadata = pageMetadata({
  title: "Layover time checker: is your connection long enough?",
  description:
    "Free layover time checker: see if your connection is comfortable, tight or risky based on terminals, passport control, bags and whether you're on one ticket.",
  path: PATH,
});

const FAQS: Faq[] = [
  {
    question: "How does the layover time checker work?",
    answer:
      "You enter your layover length and what the connection involves, such as changing terminals, passport control or re-checking bags. The checker adds a rough time for each step and compares the total with your layover to show how much margin you have.",
  },
  {
    question: "Is this the airline's minimum connection time?",
    answer:
      "No. Airlines and airports set official minimum connection times for each airport. On a single ticket, the airline should only sell connections that meet them. This tool uses transparent planning assumptions to judge how comfortable a connection feels.",
  },
  {
    question: "Why does 'not sure' count as yes?",
    answer:
      "If you don't know whether you'll change terminals or go through passport control, it's safer to plan as if you will. The checker then suggests how to find out, for example by asking at check-in.",
  },
  {
    question: "What if my flights are on separate tickets?",
    answer:
      "The checker adds a large buffer and a warning. With separate tickets, the second airline usually isn't responsible if a delay on the first flight makes you miss it, so you may need to buy a new ticket.",
  },
];

function checkerLd(): Record<string, unknown> {
  return {
    "@type": "WebApplication",
    name: "AIFlyTrip layover time checker",
    url: absoluteUrl(PATH),
    applicationCategory: "TravelApplication",
    operatingSystem: "Any (web browser)",
    isAccessibleForFree: true,
    description:
      "Free tool that estimates whether a flight connection is comfortable, tight or risky from the steps it involves.",
  };
}

export default function LayoverTimeCheckerPage() {
  const a = ASSUMPTIONS;
  return (
    <Container className="flex max-w-6xl flex-col gap-12 py-10">
      <JsonLd data={graph(checkerLd(), faqLd(FAQS))} />
      <div className="flex flex-col gap-4">
        <Breadcrumbs
          crumbs={[
            { name: "Home", path: "/" },
            { name: "Free tools", path: "/tools" },
            { name: "Layover time checker", path: PATH },
          ]}
        />
        <p className="eyebrow">Free tool</p>
        <h1 className="max-w-3xl text-4xl font-bold text-balance text-white sm:text-5xl">
          Layover time checker
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
          Is your connection long enough? Tell us what happens between your
          flights, from changing terminals to passport control, and see whether
          your layover is comfortable, tight or risky, with practical advice.
          Free, no sign-up.
        </p>
      </div>

      <LayoverChecker />

      <ContentSection id="how-it-estimates" title="How the estimate works">
        <Prose
          paragraphs={[
            `The checker adds a rough time for each step of your connection: about ${a.deplaneSmall} minutes to leave the plane and walk at a smaller airport or ${a.deplaneLarge} at a large hub, ${a.terminalChange} for a terminal change, ${a.passportControl} for passport control, ${a.securityAgain} for security again and ${a.recheckBags} to collect and re-check bags. It allows ${a.boardingCloses} minutes because boarding usually closes before departure, and ${a.perExtraFactor} more for each extra factor such as travelling with children.`,
            `With separate tickets it adds a ${a.separateTicketsBuffer}-minute buffer, because a late first flight is your risk rather than the airline's. These are planning assumptions, not official figures: real times vary by airport, time of day and queue lengths.`,
          ]}
        />
      </ContentSection>

      <ContentSection
        id="single-or-separate"
        title="One ticket or separate tickets?"
      >
        <Prose
          paragraphs={[
            "This matters more than the number of minutes. When both flights are on one ticket, the airline is responsible for getting you to your final destination and should only sell connections that meet its minimum connection time. If a delay makes you miss the second flight, it will normally rebook you.",
            "With separate tickets, the second airline usually has no obligation to wait or rebook you. Combining tickets can save money, as our guide on [how to find cheap flights](/blog/how-to-find-cheap-flights) explains, but leave a much longer gap.",
          ]}
        />
      </ContentSection>

      <ContentSection id="if-you-miss" title="If you miss your connection">
        <Prose
          paragraphs={[
            "On a single ticket, go to the airline's transfer desk or use its app to be rebooked, and keep receipts for any food or accommodation. Depending on where you're flying and why you were delayed, you may have rights to care and, in some cases, compensation; check official sources such as the EU's air passenger rights pages or the UK Civil Aviation Authority.",
          ]}
        />
      </ContentSection>

      <PlannerCta
        heading="Plan the rest of the trip"
        body="Our free AI trip planner builds a day-by-day itinerary around your flight times, with a budget estimate. No sign-up needed."
        placement="layover_checker"
      />

      <FaqList faqs={FAQS} />

      <p className="text-sm text-muted-foreground">
        Working out costs too? Try our free{" "}
        <Link
          href="/tools/trip-budget-calculator"
          className="text-primary hover:underline"
        >
          trip budget calculator
        </Link>
        .
      </p>
    </Container>
  );
}
