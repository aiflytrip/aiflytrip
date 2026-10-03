import Link from "next/link";

import { Container } from "@/components/ui/container";
import { type Faq } from "@/content/schema";
import {
  ContentSection,
  FaqList,
  PlannerCta,
  Prose,
} from "@/features/content/components/blocks";
import { RichText } from "@/features/content/components/rich-text";
import { Breadcrumbs, JsonLd } from "@/features/seo/components";
import { faqLd, graph } from "@/features/seo/json-ld";
import { absoluteUrl, pageMetadata } from "@/features/seo/metadata";
import { BudgetCalculator } from "@/features/tools/budget/budget-calculator";

const PATH = "/tools/trip-budget-calculator";

export const metadata = pageMetadata({
  title: "Free trip budget calculator: estimate your travel costs",
  description:
    "Free travel budget calculator: add flights, accommodation, food, transport and activities to see your total trip cost, cost per person and per day.",
  path: PATH,
});

const HOW_TO_ESTIMATE = [
  {
    title: "Flights",
    body: "Search your real dates and include the bags you'll need, not just the base fare. Our guide on [how to find cheap flights](/blog/how-to-find-cheap-flights) explains how to compare options, and [budget airline fees](/blog/budget-airline-fees-explained) covers the extras.",
  },
  {
    title: "Accommodation",
    body: "Use the total per night for your whole group, including taxes and fees. Many cities charge a tourist tax that may be paid at the property, so check the booking details.",
  },
  {
    title: "Food and drink",
    body: "Think about a typical day: breakfast, lunch, dinner, snacks and drinks. Our [destination guides](/destinations) describe the food scene, and markets and lunch menus are often good value.",
  },
  {
    title: "Local transport",
    body: "Add up a typical day of metro, tram or bus rides. Day passes and rechargeable travel cards can be cheaper if you make several journeys, and walking is free.",
  },
  {
    title: "Activities",
    body: "List the paid sights, tours and experiences you plan, check prices on official websites, and divide by the number of days for a daily average.",
  },
  {
    title: "Extras and buffer",
    body: "Add one-off costs such as travel insurance, visas, airport transfers and gifts. A buffer of 10 to 15 percent covers the small surprises that add up on most trips.",
  },
];

const FAQS: Faq[] = [
  {
    question: "How does the trip budget calculator work?",
    answer:
      "Enter your own estimates for flights, accommodation, daily spending and extras. The calculator multiplies daily costs by the number of travellers and days, adds a safety buffer, and shows your total, cost per person and cost per day.",
  },
  {
    question: "Why does it count one more day than the number of nights?",
    answer:
      "You usually spend money on food and transport on both your arrival and departure days, so a four-night trip has five days of daily spending. Accommodation is counted per night.",
  },
  {
    question: "Does the calculator include real prices for destinations?",
    answer:
      "No. Prices change constantly and vary by season, so the calculator uses your own estimates rather than built-in figures. For an automatic estimate, our AI trip planner creates a budget in your currency.",
  },
  {
    question: "Can I share or save my budget?",
    answer:
      "Yes. Your inputs are saved in the page link, so you can copy the share link to send it to travel companions, or use the print button to save it as a PDF.",
  },
];

function calculatorLd(): Record<string, unknown> {
  return {
    "@type": "WebApplication",
    name: "AIFlyTrip trip budget calculator",
    url: absoluteUrl(PATH),
    applicationCategory: "TravelApplication",
    operatingSystem: "Any (web browser)",
    isAccessibleForFree: true,
    description:
      "Free calculator that totals flights, accommodation, food, transport, activities and extras into a trip budget per person and per day.",
  };
}

export default function TripBudgetCalculatorPage() {
  return (
    <Container className="flex max-w-6xl flex-col gap-12 py-10">
      <JsonLd data={graph(calculatorLd(), faqLd(FAQS))} />
      <div className="flex flex-col gap-4">
        <Breadcrumbs
          crumbs={[
            { name: "Home", path: "/" },
            { name: "Trip budget calculator", path: PATH },
          ]}
        />
        <p className="eyebrow">Free tool</p>
        <h1 className="max-w-3xl text-4xl font-bold text-balance text-white sm:text-5xl">
          Trip budget calculator
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
          Work out what your trip will really cost. Add your flights,
          accommodation and daily spending to see the total, the cost per person
          and per day, and where your money goes. Free, no sign-up, and you can
          share the result with your travel companions.
        </p>
      </div>

      <BudgetCalculator />

      <ContentSection id="how-to-estimate" title="How to estimate each cost">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {HOW_TO_ESTIMATE.map((item) => (
            <div key={item.title} className="glass rounded-3xl p-5">
              <h3 className="font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                <RichText text={item.body} />
              </p>
            </div>
          ))}
        </div>
      </ContentSection>

      <ContentSection id="save" title="Ways to bring your budget down">
        <Prose
          paragraphs={[
            "The biggest savings usually come from timing: travelling outside school holidays and peak season lowers flights and accommodation at the same time. After that, where you stay matters most; a well-connected neighbourhood can save on both the room and transport. Our [cheap flight tips](/blog/cheap-flight-tips) and guide to [budget airline fees](/blog/budget-airline-fees-explained) cover many more ways to save.",
            "Packing light avoids checked-bag fees, and choosing the local currency when paying by card abroad is usually better value than paying in your home currency.",
          ]}
        />
      </ContentSection>

      <PlannerCta
        heading="Want an automatic budget estimate?"
        body="Our free AI trip planner drafts a day-by-day itinerary with a budget broken down by category, in your currency. No sign-up needed."
        placement="budget_calculator"
      />

      <FaqList faqs={FAQS} />

      <p className="text-sm text-muted-foreground">
        Planning the days too? Read{" "}
        <Link
          href="/blog/how-to-build-a-travel-itinerary"
          className="text-primary hover:underline"
        >
          how to build a travel itinerary
        </Link>{" "}
        or browse our{" "}
        <Link href="/itineraries" className="text-primary hover:underline">
          ready-made itineraries
        </Link>
        .
      </p>
    </Container>
  );
}
