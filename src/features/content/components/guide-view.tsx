import Image from "next/image";

import { Container } from "@/components/ui/container";
import { blogPhoto } from "@/content/data/photos";
import { isIndexable, publishedGuides, type Entry } from "@/content/registry";
import { type Guide } from "@/content/schema";
import {
  BulletList,
  ContentSection,
  FaqList,
  PlannerCta,
  Prose,
  RelatedLinks,
  SourcesList,
} from "@/features/content/components/blocks";
import { categoryLabel } from "@/features/content/blog";
import { PhotoCredit } from "@/features/content/components/photo-credit";
import {
  destinationLinks,
  guideLinks,
  itineraryLinks,
} from "@/features/content/links";
import { Breadcrumbs, JsonLd } from "@/features/seo/components";
import { faqLd, graph, guideLd, type Crumb } from "@/features/seo/json-ld";
import { BLOG_COPY } from "@/i18n/pages/blog";

export function guideCrumbs(page: Entry<Guide>): Crumb[] {
  const t = BLOG_COPY[page.locale];
  return [
    t.home,
    { name: t.hub.crumb, path: t.hub.path },
    { name: page.headline, path: page.path },
  ];
}

// Accents are dropped so Spanish headings keep readable anchors.
const anchor = (heading: string) =>
  heading
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export function GuideView({ page }: { page: Entry<Guide> }) {
  const t = BLOG_COPY[page.locale];
  // Same-category posts not already linked, for extra internal links.
  const moreInCategory = publishedGuides(page.locale)
    .filter(
      (g) =>
        g.category === page.category &&
        g.slug !== page.slug &&
        !page.related.guides.includes(g.slug),
    )
    .map((g) => g.slug);
  const minutes = Math.max(1, Math.round(page.quality.words / 220));
  const photo = blogPhoto(page.photo);
  const reviewed = new Intl.DateTimeFormat(t.intl, {
    dateStyle: "medium",
    timeZone: "UTC",
  }).format(new Date(`${page.lastReviewed}T00:00:00Z`));

  return (
    <Container className="flex max-w-3xl flex-col gap-10 py-10">
      {isIndexable(page) ? (
        <JsonLd data={graph(guideLd(page), faqLd(page.faqs))} />
      ) : null}
      <div className="flex flex-col gap-4">
        <Breadcrumbs crumbs={guideCrumbs(page)} />
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
          <span className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 font-semibold text-accent-foreground">
            {categoryLabel(page.category, page.locale)}
          </span>
          <span>
            {minutes} {t.article.minRead}
          </span>
          <span aria-hidden="true">·</span>
          <span>
            {t.article.reviewed}{" "}
            <time dateTime={page.lastReviewed}>{reviewed}</time>
          </span>
        </p>
        <h1 className="text-4xl font-bold text-balance text-white sm:text-5xl">
          {page.headline}
        </h1>
        <p className="text-lg leading-8 text-muted-foreground">{page.intro}</p>
      </div>

      {photo ? (
        <figure className="flex flex-col gap-2">
          <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-white/10">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              preload
              sizes="(min-width: 768px) 720px, 100vw"
              className="object-cover"
            />
          </div>
          <figcaption>
            <PhotoCredit photo={photo} className="px-1" />
          </figcaption>
        </figure>
      ) : null}

      <nav
        aria-label={t.article.onThisPage}
        className="glass rounded-2xl p-5 text-sm"
      >
        <p className="font-semibold">{t.article.onThisPage}</p>
        <ol className="mt-2 flex list-decimal flex-col gap-1 pl-5 text-muted-foreground">
          {page.sections.map((section) => (
            <li key={section.heading}>
              <a
                href={`#${anchor(section.heading)}`}
                className="hover:text-foreground hover:underline"
              >
                {section.heading.replace(/^\d+\.\s*/, "")}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {page.sections.map((section) => (
        <ContentSection
          key={section.heading}
          id={anchor(section.heading)}
          title={section.heading}
        >
          <Prose paragraphs={section.paragraphs} />
          {section.bullets.length > 0 ? (
            <BulletList items={section.bullets} />
          ) : null}
        </ContentSection>
      ))}

      <PlannerCta
        heading={t.article.cta.heading}
        body={t.article.cta.body}
        href={t.planner.href}
        buttonLabel={t.planner.button}
        placement="guide"
      />

      <FaqList faqs={page.faqs} title={t.article.faqTitle} />
      <RelatedLinks
        title={t.article.related}
        links={guideLinks(
          [...page.related.guides, ...moreInCategory],
          page.locale,
        )}
      />
      <RelatedLinks
        title={t.article.itineraries}
        links={itineraryLinks(page.related.itineraries)}
      />
      <RelatedLinks
        title={t.article.destinations}
        links={destinationLinks(page.related.destinations)}
      />
      <SourcesList
        sources={page.sources}
        lastReviewed={page.lastReviewed}
        locale={page.locale}
      />
    </Container>
  );
}
