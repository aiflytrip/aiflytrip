import Link from "next/link";

import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import {
  countries,
  publishedGuides,
  publishedItineraries,
} from "@/content/registry";
import { PlannerCtaLink } from "@/features/analytics/planner-cta-link";
import { FaqList } from "@/features/content/components/blocks";
import { DestinationCard } from "@/features/content/components/destination-card";
import { FlightSearchForm } from "@/features/flights";
import { FeatureGrid, Hero, HowItWorks } from "@/features/marketing";
import { homeFaqs } from "@/features/marketing/content";
import { SectionHeading } from "@/features/marketing/components/section-heading";
import { QuickBudget } from "@/features/tools/budget/quick-budget";
import { JsonLd } from "@/features/seo/components";
import {
  faqLd,
  graph,
  organizationLd,
  websiteLd,
} from "@/features/seo/json-ld";
import { pageMetadata } from "@/features/seo/metadata";

// Scheduled posts go live on their publish date without a redeploy:
// pages regenerate at most hourly (ISR).
export const revalidate = 3600;

export const metadata = pageMetadata({
  title: "AIFlyTrip: free AI trip planner and itinerary generator",
  absoluteTitle: true,
  description:
    "AIFlyTrip is a free AI trip planner: turn your dates, budget and interests into a personalized day-by-day itinerary, with flight options. No sign-up needed.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={graph(websiteLd(), organizationLd(), faqLd(homeFaqs))} />
      <Hero />

      <section aria-labelledby="budget-heading" className="py-16 sm:py-20">
        <Container className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="reveal flex flex-col gap-4">
            <p className="eyebrow">Free tool</p>
            <h2
              id="budget-heading"
              className="text-[clamp(2rem,4vw,2.875rem)] leading-tight font-bold text-balance text-white"
            >
              How much will your trip cost?
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              Add your flights, a nightly rate and what you expect to spend each
              day to see your total in seconds. Open the full trip budget
              calculator to break it down by food, transport, activities and
              extras, then share it with your travel companions.
            </p>
            <Link
              href="/tools/trip-budget-calculator"
              className="text-sm font-semibold text-primary hover:text-primary-hover"
            >
              Go to the trip budget calculator →
            </Link>
            <Link
              href="/tools/layover-time-checker"
              className="text-sm font-semibold text-primary hover:text-primary-hover"
            >
              Check your layover time with our free layover checker →
            </Link>
            <Link
              href="/tools/how-many-days"
              className="text-sm font-semibold text-primary hover:text-primary-hover"
            >
              Work out how many days you need for your trip →
            </Link>
          </div>
          <div className="reveal">
            <QuickBudget />
          </div>
        </Container>
      </section>

      <HowItWorks />

      <section
        aria-labelledby="destinations-heading"
        className="py-20 sm:py-24"
      >
        <Container className="flex flex-col gap-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              id="destinations-heading"
              eyebrow="Destination guides"
              title="Start with where you want to go"
              description="When to go, how long to stay and what to see, with official sources."
              align="left"
            />
            <Link
              href="/destinations"
              className="reveal text-sm font-semibold text-primary hover:text-primary-hover"
            >
              Browse all destination guides →
            </Link>
          </div>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {countries().map((country) => (
              <li key={country.path} className="reveal">
                <DestinationCard
                  href={country.path}
                  slug={country.slug}
                  name={country.name}
                  summary={country.tripLength.summary}
                  badge={country.airports[0]}
                  sizes="(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw"
                />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <FeatureGrid />

      <section aria-labelledby="itineraries-heading" className="py-20 sm:py-24">
        <Container className="flex flex-wrap gap-5">
          <div className="glass reveal flex min-w-0 flex-[1_1_min(520px,100%)] flex-col gap-4 rounded-[28px] p-8">
            <p className="eyebrow">Ready-made itineraries</p>
            <h2
              id="itineraries-heading"
              className="text-3xl font-bold text-white"
            >
              Hand-written day plans
            </h2>
            <ul className="flex flex-col gap-3">
              {publishedItineraries().map((it) => (
                <li key={it.path}>
                  <Link
                    href={it.path}
                    className="lift flex items-center justify-between gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.035] px-4.5 py-4 text-white"
                  >
                    <span className="font-semibold">{it.name}</span>
                    <span className="rounded-full bg-primary px-2.5 py-1 font-mono text-xs text-primary-foreground">
                      {it.days} DAYS
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="glass reveal flex min-w-0 flex-[1_1_min(380px,100%)] flex-col gap-4 rounded-[28px] p-8">
            <p className="eyebrow">From the blog</p>
            <h2 className="text-3xl font-bold text-white">
              Cheaper flights, smarter plans
            </h2>
            <ul className="flex flex-col gap-3">
              {publishedGuides()
                .slice(0, 4)
                .map((guide) => (
                  <li key={guide.path}>
                    <Link
                      href={guide.path}
                      className="lift block rounded-2xl border border-white/[0.07] bg-white/[0.035] px-4.5 py-4 font-semibold text-white"
                    >
                      {guide.headline}
                    </Link>
                  </li>
                ))}
            </ul>
            <Link
              href="/blog"
              className="text-sm font-semibold text-primary hover:text-primary-hover"
            >
              All articles →
            </Link>
          </div>
        </Container>
      </section>

      <section aria-labelledby="premium-heading" className="pb-20 sm:pb-24">
        <Container>
          <div className="reveal flex flex-wrap items-center justify-between gap-6 rounded-[28px] border border-white/10 bg-linear-to-br from-primary/20 to-violet/20 p-8 sm:p-10">
            <div className="max-w-2xl">
              <p className="eyebrow text-accent-foreground">Premium</p>
              <h2
                id="premium-heading"
                className="mt-3 text-3xl font-bold text-white"
              >
                Take your plan offline
              </h2>
              <p className="mt-3 leading-relaxed text-white/85">
                Download a printable PDF of your trip: the day-by-day plan, a
                proposed flight itinerary and the budget. Currently in test
                mode, so no real payments are taken.
              </p>
            </div>
            <ButtonLink href="/travel-planner" variant="secondary" size="lg">
              Learn about the planner
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section aria-labelledby="flights-heading" className="pb-20 sm:pb-24">
        <Container className="flex flex-col gap-8">
          <SectionHeading
            id="flights-heading"
            eyebrow="Flight search"
            title="Compare flight options"
            description="Search by route and dates. Results come from a test environment: schedules and prices are examples for planning, not bookable fares."
          />
          <div className="glass reveal mx-auto w-full max-w-5xl rounded-3xl p-5 sm:p-7">
            <FlightSearchForm />
          </div>
        </Container>
      </section>

      <Container className="max-w-3xl pb-20">
        <FaqList faqs={homeFaqs} headingId="home-faq-heading" />
      </Container>

      <section className="pb-24">
        <Container>
          <div className="glass reveal relative flex flex-col items-center gap-5 overflow-hidden rounded-[32px] px-6 py-16 text-center sm:py-20">
            <div
              aria-hidden="true"
              className="orb -bottom-56 left-1/2 -ml-[320px] h-[420px] w-[640px] bg-[radial-gradient(circle,rgb(56_189_248/0.3),transparent_70%)]"
            />
            <h2 className="relative max-w-3xl text-[clamp(2.1rem,4.5vw,3.5rem)] leading-[1.05] font-bold text-balance text-white">
              Your next trip, planned in minutes
            </h2>
            <p className="relative max-w-xl text-lg leading-relaxed text-muted-foreground">
              Tell us where and when. We&apos;ll draft the days, compare flight
              options and estimate the budget.
            </p>
            <PlannerCtaLink
              href="/plan"
              placement="home_footer_cta"
              size="lg"
              className="relative"
            >
              Create your free trip plan
            </PlannerCtaLink>
          </div>
        </Container>
      </section>
    </>
  );
}
