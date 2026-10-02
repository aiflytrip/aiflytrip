import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PlannerCtaLink } from "@/features/analytics/planner-cta-link";

/** Homepage hero: one clear H1, a plain-language value proposition and the primary CTA. */
export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[32rem] bg-linear-to-b from-accent to-transparent"
      />
      <Container className="flex flex-col items-center py-16 text-center sm:py-24">
        <p className="mb-5 text-sm font-semibold text-primary">
          AI trip planner
        </p>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
          Plan your trip with an AI travel planner
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-pretty text-muted-foreground">
          Turn your dates, budget, pace and interests into a personalized,
          day-by-day travel itinerary, with flight options and a budget estimate
          you can refine.
        </p>
        <div className="mt-10 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
          <PlannerCtaLink href="/plan" placement="home_hero" size="lg">
            Create your personalized trip plan
          </PlannerCtaLink>
          <ButtonLink href="/travel-planner" variant="secondary" size="lg">
            See how it works
          </ButtonLink>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Free account required. AIFlyTrip is a planning tool and doesn&apos;t
          book flights or hotels.
        </p>
      </Container>
    </section>
  );
}
