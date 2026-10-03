import { Container } from "@/components/ui/container";
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
import {
  destinationLinks,
  guideLinks,
  itineraryLinks,
} from "@/features/content/links";
import { Breadcrumbs, JsonLd } from "@/features/seo/components";
import { faqLd, graph, guideLd, type Crumb } from "@/features/seo/json-ld";

export function guideCrumbs(page: Entry<Guide>): Crumb[] {
  return [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: page.headline, path: page.path },
  ];
}

const anchor = (heading: string) =>
  heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export function GuideView({ page }: { page: Entry<Guide> }) {
  // Same-category posts not already linked, for extra internal links.
  const moreInCategory = publishedGuides()
    .filter(
      (g) =>
        g.category === page.category &&
        g.slug !== page.slug &&
        !page.related.guides.includes(g.slug),
    )
    .map((g) => g.slug);
  const minutes = Math.max(1, Math.round(page.quality.words / 220));
  const reviewed = new Intl.DateTimeFormat("en-GB", {
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
            {categoryLabel(page.category)}
          </span>
          <span>{minutes} min read</span>
          <span aria-hidden="true">·</span>
          <span>
            Reviewed <time dateTime={page.lastReviewed}>{reviewed}</time>
          </span>
        </p>
        <h1 className="text-4xl font-bold text-balance text-white sm:text-5xl">
          {page.headline}
        </h1>
        <p className="text-lg leading-8 text-muted-foreground">{page.intro}</p>
      </div>

      <nav aria-label="On this page" className="glass rounded-2xl p-5 text-sm">
        <p className="font-semibold">On this page</p>
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
        heading="Draft your itinerary in minutes"
        body="Our AI trip planner turns your dates, budget and interests into a day-by-day plan you can refine. Check practical details with official sources before you travel."
        placement="guide"
      />

      <FaqList faqs={page.faqs} />
      <RelatedLinks
        title="Related articles"
        links={guideLinks([...page.related.guides, ...moreInCategory])}
      />
      <RelatedLinks
        title="Ready-made itineraries"
        links={itineraryLinks(page.related.itineraries)}
      />
      <RelatedLinks
        title="Destination guides"
        links={destinationLinks(page.related.destinations)}
      />
      <SourcesList sources={page.sources} lastReviewed={page.lastReviewed} />
    </Container>
  );
}
