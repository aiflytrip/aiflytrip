import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PlannerCtaLink } from "@/features/analytics/planner-cta-link";
import { HeroPlanCard } from "@/features/marketing/components/hero-plan-card";
import { type Locale } from "@/i18n/config";
import { HOME_COPY } from "@/i18n/pages/home";
import { plannerHref, route } from "@/i18n/routes";

/** Homepage hero: one clear H1, a plain-language value proposition and the primary CTA. */
const HERO_TOOLS = ["budget", "layover", "days"] as const;

export function Hero({ locale = "en" }: { locale?: Locale }) {
  const t = HOME_COPY[locale].hero;
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
            {t.pill}
          </p>
          <h1 className="animate-rise text-[clamp(2.75rem,6vw,4.75rem)] leading-[1.02] font-bold text-balance text-white delay-1">
            {t.titleStart}{" "}
            <span className="text-gradient">{t.titleHighlight}</span>
          </h1>
          <p className="animate-rise max-w-xl text-lg leading-relaxed text-muted-foreground delay-2 sm:text-[19px]">
            {t.lead}
          </p>
          <div className="animate-rise flex flex-col gap-3 delay-3 sm:flex-row">
            <PlannerCtaLink
              href={plannerHref(locale)}
              placement="home_hero"
              size="lg"
            >
              {t.primary}
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
            <ButtonLink
              href={
                locale === "en" ? "/travel-planner" : route("tools", locale)
              }
              variant="secondary"
              size="lg"
            >
              {t.secondary}
            </ButtonLink>
          </div>
          <nav
            aria-label={t.toolsLabel.replace(/:s*$/, "")}
            className="animate-rise flex flex-wrap items-center gap-2 text-sm delay-4"
          >
            <span className="mr-1 text-muted-foreground">{t.toolsLabel}</span>
            {HERO_TOOLS.map((tool) => (
              <a
                key={tool}
                href={`#tool-${tool}`}
                className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 font-medium text-foreground/90 transition-colors hover:border-primary/50 hover:text-white"
              >
                {t.tools[tool]}
              </a>
            ))}
          </nav>
          <p className="animate-rise text-xs text-muted-foreground/80 delay-4">
            {t.note}
          </p>
        </div>
        <div className="animate-rise min-w-0 flex-[1_1_min(440px,100%)] delay-4">
          <HeroPlanCard locale={locale} />
        </div>
      </Container>
    </section>
  );
}
