import Link from "next/link";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { PlannerCtaLink } from "@/features/analytics/planner-cta-link";
import { FaqList } from "@/features/content/components/blocks";
import { FeatureGrid, Hero, HowItWorks } from "@/features/marketing";
import { SectionHeading } from "@/features/marketing/components/section-heading";
import { JsonLd } from "@/features/seo/components";
import { faqLd, graph } from "@/features/seo/json-ld";
import { absoluteUrl, pageMetadata } from "@/features/seo/metadata";
import { ToolsShowcase } from "@/features/tools/tools-showcase";
import { type Locale } from "@/i18n/config";
import { siteMessages } from "@/i18n/messages/site";
import { HOME_COPY } from "@/i18n/pages/home";
import { languageAlternates, plannerHref, route } from "@/i18n/routes";

type TranslatedLocale = Exclude<Locale, "en">;

export function localizedHomeMetadata(locale: TranslatedLocale) {
  const copy = HOME_COPY[locale].meta;
  return pageMetadata({
    title: copy.title,
    absoluteTitle: true,
    description: copy.description,
    path: route("home", locale),
    locale,
    languages: languageAlternates("home"),
  });
}

/**
 * Spanish and French homepage: the planner, the free tools and how it
 * works. Sections built on English-only content (guides, blog, flight
 * search) are replaced by a clearly labelled link block.
 */
export function LocalizedHome({ locale }: { locale: TranslatedLocale }) {
  const copy = HOME_COPY[locale];
  const site = siteMessages(locale);
  const pageLd = {
    "@type": "WebPage",
    "@id": `${absoluteUrl(route("home", locale))}#webpage`,
    url: absoluteUrl(route("home", locale)),
    name: copy.meta.title,
    description: copy.meta.description,
    inLanguage: locale,
    isPartOf: { "@id": `${absoluteUrl("/")}#website` },
    publisher: { "@type": "Organization", name: siteConfig.name },
  };

  return (
    <>
      <JsonLd data={graph(pageLd, faqLd(copy.faqs))} />
      <Hero locale={locale} />

      <section
        id="free-tools"
        aria-labelledby="tools-heading"
        className="scroll-mt-20 py-16 sm:py-20"
      >
        <Container className="flex flex-col gap-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              id="tools-heading"
              eyebrow={copy.tools.eyebrow}
              title={copy.tools.title}
              description={copy.tools.description}
              align="left"
            />
            <Link
              href={route("tools", locale)}
              className="reveal text-sm font-semibold text-primary hover:text-primary-hover"
            >
              {copy.tools.seeAll}
            </Link>
          </div>
          <ToolsShowcase locale={locale} />
        </Container>
      </section>

      <HowItWorks locale={locale} />
      <FeatureGrid locale={locale} />

      {copy.englishGuides ? (
        <section aria-labelledby="guides-heading" className="pb-20 sm:pb-24">
          <Container>
            <div className="glass reveal flex flex-col gap-4 rounded-3xl p-7 sm:p-9">
              <h2 id="guides-heading" className="text-2xl font-bold text-white">
                {copy.englishGuides.title}
              </h2>
              <p className="max-w-2xl leading-relaxed text-muted-foreground">
                {copy.englishGuides.body}
              </p>
              <ul className="flex flex-wrap gap-3">
                {copy.englishGuides.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      hrefLang="en"
                      className="inline-flex rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-medium text-foreground/90 transition-colors hover:border-primary/50 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>
      ) : null}

      <Container className="max-w-3xl pb-20">
        <FaqList
          faqs={copy.faqs}
          headingId="home-faq-heading"
          title={site.faqTitle}
        />
      </Container>

      <section className="pb-24">
        <Container>
          <div className="glass reveal relative flex flex-col items-center gap-5 overflow-hidden rounded-[32px] px-6 py-16 text-center sm:py-20">
            <div
              aria-hidden="true"
              className="orb -bottom-56 left-1/2 -ml-[320px] h-[420px] w-[640px] bg-[radial-gradient(circle,rgb(56_189_248/0.3),transparent_70%)]"
            />
            <h2 className="relative max-w-3xl text-[clamp(2.1rem,4.5vw,3.5rem)] leading-[1.05] font-bold text-balance text-white">
              {copy.cta.title}
            </h2>
            <p className="relative max-w-xl text-lg leading-relaxed text-muted-foreground">
              {copy.cta.body}
            </p>
            <PlannerCtaLink
              href={plannerHref(locale)}
              placement="home_footer_cta"
              size="lg"
              className="relative"
            >
              {copy.cta.button}
            </PlannerCtaLink>
          </div>
        </Container>
      </section>
    </>
  );
}
