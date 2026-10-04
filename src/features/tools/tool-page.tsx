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
import { Breadcrumbs, JsonLd } from "@/features/seo/components";
import { faqLd, graph } from "@/features/seo/json-ld";
import { absoluteUrl, pageMetadata } from "@/features/seo/metadata";
import { type Locale } from "@/i18n/config";
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
    <Container className="flex max-w-5xl flex-col gap-10 py-10">
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
              <span className="mt-auto text-sm font-semibold text-primary">
                {copy.open}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <PlannerCta
        heading={copy.cta.heading}
        body={copy.cta.body}
        href={plannerHref(locale)}
        placement="tools_hub"
        buttonLabel={site.plannerButton}
      />
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
