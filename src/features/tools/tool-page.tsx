import Link from "next/link";
import type { ReactNode } from "react";

import { Container } from "@/components/ui/container";
import {
  ContentSection,
  FaqList,
  PlannerCta,
  Prose,
} from "@/features/content/components/blocks";
import { RichText } from "@/features/content/components/rich-text";
import { ScrollFlight } from "@/features/marketing/components/scroll-flight";
import { Breadcrumbs, JsonLd } from "@/features/seo/components";
import { faqLd, graph } from "@/features/seo/json-ld";
import { absoluteUrl, pageMetadata } from "@/features/seo/metadata";
import { calculateBudget, DEFAULT_INPUT } from "@/features/tools/budget/budget";
import { DEFAULT_DAYS_INPUT, planDays } from "@/features/tools/days/days";
import {
  formatMinutes,
  formatMoney,
  VERDICT_STYLES,
} from "@/features/tools/format";
import {
  checkLayover,
  DEFAULT_LAYOVER,
} from "@/features/tools/layover/layover";
import { type Locale } from "@/i18n/config";
import { toolsMessages } from "@/i18n/messages/tools";
import { HOME_COPY } from "@/i18n/pages/home";
import { siteMessages } from "@/i18n/messages/site";
import { TOOLS_COPY } from "@/i18n/pages/tools";
import {
  languageAlternates,
  plannerHref,
  route,
  type RouteKey,
} from "@/i18n/routes";

type ToolKey = Extract<RouteKey, "budget" | "layover" | "days">;

const PLACEMENTS: Record<ToolKey, string> = {
  budget: "budget_calculator",
  layover: "layover_checker",
  days: "days_planner",
};

/** Metadata for a tool page in any language, with hreflang alternates. */
export function toolPageMetadata(tool: ToolKey, locale: Locale) {
  const copy = TOOLS_COPY[locale][tool];
  return pageMetadata({
    title: copy.meta.title,
    description: copy.meta.description,
    path: route(tool, locale),
    locale,
    languages: languageAlternates(tool),
  });
}

/**
 * A free tool page: heading, the interactive tool, explanatory sections,
 * planner CTA and FAQ (mirrored in FAQPage JSON-LD), in the given language.
 */
export function ToolPage({
  tool,
  locale,
  children,
}: {
  tool: ToolKey;
  locale: Locale;
  children: ReactNode;
}) {
  const copy = TOOLS_COPY[locale][tool];
  const site = siteMessages(locale);
  const path = route(tool, locale);
  const appLd = {
    "@type": "WebApplication",
    name: copy.ld.name,
    url: absoluteUrl(path),
    applicationCategory: "TravelApplication",
    operatingSystem: "Any (web browser)",
    isAccessibleForFree: true,
    inLanguage: locale,
    description: copy.ld.description,
  };

  return (
    <Container className="flex max-w-6xl flex-col gap-12 py-10">
      <ScrollFlight subtle />
      <JsonLd data={graph(appLd, faqLd(copy.faqs))} />
      <div className="flex flex-col gap-4">
        <Breadcrumbs
          crumbs={[
            { name: site.breadcrumbs.home, path: route("home", locale) },
            { name: site.breadcrumbs.tools, path: route("tools", locale) },
            { name: copy.crumb, path },
          ]}
        />
        <p className="eyebrow">{site.freeTool}</p>
        <h1 className="max-w-3xl text-4xl font-bold text-balance text-white sm:text-5xl">
          {copy.h1}
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
          {copy.intro}
        </p>
      </div>

      {children}

      {copy.sections.map((section) => (
        <ContentSection key={section.id} id={section.id} title={section.title}>
          {section.cards ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {section.cards.map((card) => (
                <div key={card.title} className="glass rounded-3xl p-5">
                  <h3 className="font-semibold text-white">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    <RichText text={card.body} />
                  </p>
                </div>
              ))}
            </div>
          ) : null}
          {section.paragraphs ? (
            <Prose paragraphs={section.paragraphs} />
          ) : null}
        </ContentSection>
      ))}

      <PlannerCta
        heading={copy.cta.heading}
        body={copy.cta.body}
        href={plannerHref(locale)}
        placement={PLACEMENTS[tool]}
        buttonLabel={site.plannerButton}
      />

      <FaqList faqs={copy.faqs} title={site.faqTitle} />

      <p className="text-sm text-muted-foreground">
        <RichText text={copy.related} />
      </p>
    </Container>
  );
}

/** A small worked example on each hub card, from the tools' own logic. */
function CardPreview({
  tool,
  locale,
}: {
  tool: "budget" | "layover" | "days" | "planner";
  locale: Locale;
}) {
  const m = toolsMessages(locale);
  const example = TOOLS_COPY[locale].hub.example;
  const box =
    "flex flex-wrap items-center gap-2 rounded-2xl border border-white/[0.07] bg-black/20 px-3.5 py-2.5 text-sm";

  if (tool === "budget") {
    const r = calculateBudget({
      ...DEFAULT_INPUT,
      currency: locale === "en" ? "GBP" : "EUR",
      flightsPerPerson: 180,
      accommodationPerNight: 110,
      foodPerDay: 45,
      transportPerDay: 10,
      activitiesPerDay: 20,
      extras: 60,
    });
    const currency = locale === "en" ? "GBP" : "EUR";
    return (
      <div className={box}>
        <span className="text-xs text-muted-foreground">{example}</span>
        <span className="font-display text-lg font-bold text-white">
          {formatMoney(r.total, currency, locale)}
        </span>
        <span className="text-xs text-muted-foreground">
          {m.budget.quickSummary(
            formatMoney(r.perPerson, currency, locale),
            r.days,
          )}
        </span>
      </div>
    );
  }

  if (tool === "layover") {
    const r = checkLayover({
      ...DEFAULT_LAYOVER,
      hours: 1,
      minutes: 45,
      terminalChange: "yes",
      passportControl: "yes",
      securityAgain: "no",
    });
    return (
      <div className={box}>
        <span className="text-xs text-muted-foreground">{example}</span>
        <span
          className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${VERDICT_STYLES[r.verdict].tone}`}
        >
          {m.layover.verdicts[r.verdict]}
        </span>
        <span className="font-semibold text-white">
          {m.layover.toSpare(formatMinutes(r.spareMinutes, m))}
        </span>
      </div>
    );
  }

  if (tool === "days") {
    const [first, second] = HOME_COPY[locale].tools.daysExampleStops;
    const r = planDays({
      ...DEFAULT_DAYS_INPUT,
      stops: [
        { name: first, type: "big-city", dayTrips: 1 },
        { name: second, type: "big-city", dayTrips: 0 },
      ],
    });
    return (
      <div className={box}>
        <span className="text-xs text-muted-foreground">{example}</span>
        <span className="font-display text-lg font-bold text-white">
          {m.days.totalDays(r.totalDays)}
        </span>
        <span className="text-xs text-muted-foreground">
          {first} · {second}
        </span>
      </div>
    );
  }

  const chips = ["bg-primary", "bg-violet", "bg-emerald-400"];
  return (
    <div className={box}>
      {HOME_COPY[locale].heroCard.days.map((day, i) => (
        <span
          key={day.label}
          className={`${chips[i]} rounded-lg px-2 py-1 font-mono text-[11px] text-primary-foreground`}
        >
          {day.label}
        </span>
      ))}
    </div>
  );
}

/** The free tools hub in any language. */
export function ToolsHub({ locale }: { locale: Locale }) {
  const copy = TOOLS_COPY[locale].hub;
  const site = siteMessages(locale);
  const href = (key: (typeof copy.cards)[number]["key"]) =>
    key === "planner"
      ? locale === "en"
        ? "/travel-planner"
        : plannerHref(locale)
      : route(key, locale);

  return (
    <Container className="flex max-w-5xl flex-col gap-12 py-10">
      <ScrollFlight subtle />
      <JsonLd data={graph(faqLd(copy.faqs))} />
      <div className="flex flex-col gap-4">
        <Breadcrumbs
          crumbs={[
            { name: site.breadcrumbs.home, path: route("home", locale) },
            { name: site.breadcrumbs.tools, path: route("tools", locale) },
          ]}
        />
        <h1 className="text-4xl font-bold text-white sm:text-5xl">{copy.h1}</h1>
        <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
          {copy.intro}
        </p>
      </div>
      <ul className="grid gap-5 sm:grid-cols-2">
        {copy.cards.map((tool) => (
          <li key={tool.key}>
            <Link
              href={href(tool.key)}
              className="glass lift flex h-full flex-col gap-3 rounded-3xl p-6"
            >
              <h2 className="text-xl font-semibold text-white">{tool.title}</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {tool.body}
              </p>
              <CardPreview tool={tool.key} locale={locale} />
              <span className="mt-auto pt-1 text-sm font-semibold text-primary">
                {copy.open}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <ContentSection id="which-tool" title={copy.which.title}>
        <ul className="grid gap-4 sm:grid-cols-2">
          {copy.cards.map((tool) => (
            <li key={tool.key} className="flex flex-col gap-1.5">
              <h3 className="font-semibold text-white">
                <Link
                  href={href(tool.key)}
                  className="hover:text-primary hover:underline"
                >
                  {tool.title}
                </Link>
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {copy.which.items[tool.key]}
              </p>
            </li>
          ))}
        </ul>
      </ContentSection>

      <ContentSection id="step-by-step" title={copy.steps.title}>
        <ol className="flex max-w-3xl flex-col gap-3">
          {copy.steps.items.map((step, i) => (
            <li key={step} className="flex items-start gap-3.5 leading-7">
              <span className="mt-0.5 grid size-7 flex-none place-items-center rounded-full border border-primary/40 bg-primary/10 font-mono text-xs text-primary">
                {i + 1}
              </span>
              <span className="text-foreground/90">{step}</span>
            </li>
          ))}
        </ol>
      </ContentSection>

      <PlannerCta
        heading={copy.cta.heading}
        body={copy.cta.body}
        href={plannerHref(locale)}
        placement="tools_hub"
        buttonLabel={site.plannerButton}
      />

      <FaqList faqs={copy.faqs} title={site.faqTitle} />
    </Container>
  );
}

export function toolsHubMetadata(locale: Locale) {
  const copy = TOOLS_COPY[locale].hub;
  return pageMetadata({
    title: copy.meta.title,
    description: copy.meta.description,
    path: route("tools", locale),
    locale,
    languages: languageAlternates("tools"),
  });
}
