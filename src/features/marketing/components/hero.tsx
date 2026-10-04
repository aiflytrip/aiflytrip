import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PlannerCtaLink } from "@/features/analytics/planner-cta-link";
import { HeroPlanCard } from "@/features/marketing/components/hero-plan-card";

/** Homepage hero: one clear H1, a plain-language value proposition and the primary CTA. */
const HERO_TOOLS = [
  { id: "budget", label: "Budget calculator" },
  { id: "layover", label: "Layover checker" },
  { id: "days", label: "How many days?" },
];

export function Hero() {
  return (
    <section className="relative">
      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-0 -z-10"
      />
      <div
        aria-hidden="true"
        className="orb -top-64 -left-44 -z-10 size-[720px] bg-[radial-gradient(circle,rgb(56_189_248/0.28),transparent_65%)]"
      />
      <div
        aria-hidden="true"
        className="orb top-32 -right-60 -z-10 size-[760px] bg-[radial-gradient(circle,rgb(167_139_250/0.24),transparent_65%)]"
      />
      <Container className="flex flex-wrap items-center gap-14 pt-14 pb-24 sm:pt-20">
        <div className="flex min-w-0 flex-[1_1_min(480px,100%)] flex-col gap-6">
          <p className="animate-rise inline-flex items-center gap-2.5 self-start rounded-full border border-primary/30 bg-primary/10 px-3.5 py-2 text-sm font-semibold text-accent-foreground">
            <span className="animate-live size-2 rounded-full bg-emerald-400" />
            Free AI trip planner · no sign-up needed
          </p>
          <h1 className="animate-rise text-[clamp(2.75rem,6vw,4.75rem)] leading-[1.02] font-bold text-balance text-white delay-1">
            Plan your trip with a{" "}
            <span className="text-gradient">free AI travel planner</span>
          </h1>
          <p className="animate-rise max-w-xl text-lg leading-relaxed text-muted-foreground delay-2 sm:text-[19px]">
            Turn your dates, budget, pace and interests into a personalized,
            day-by-day travel itinerary, with flight options and a budget
            estimate you can refine.
          </p>
          <div className="animate-rise flex flex-col gap-3 delay-3 sm:flex-row">
            <PlannerCtaLink href="/plan" placement="home_hero" size="lg">
              Create your free trip plan
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-4.5"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </PlannerCtaLink>
            <ButtonLink href="/travel-planner" variant="secondary" size="lg">
              See how it works
            </ButtonLink>
          </div>
          <nav
            aria-label="Free travel tools"
            className="animate-rise flex flex-wrap items-center gap-2 text-sm delay-4"
          >
            <span className="mr-1 text-muted-foreground">Free tools:</span>
            {HERO_TOOLS.map((tool) => (
              <a
                key={tool.id}
                href={`#tool-${tool.id}`}
                className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 font-medium text-foreground/90 transition-colors hover:border-primary/50 hover:text-white"
              >
                {tool.label}
              </a>
            ))}
          </nav>
          <p className="animate-rise text-xs text-muted-foreground/80 delay-4">
            Free to use, no account needed. AIFlyTrip is a planning tool and
            doesn&apos;t book flights or hotels.
          </p>
        </div>
        <div className="animate-rise min-w-0 flex-[1_1_min(440px,100%)] delay-4">
          <HeroPlanCard />
        </div>
      </Container>
    </section>
  );
}
