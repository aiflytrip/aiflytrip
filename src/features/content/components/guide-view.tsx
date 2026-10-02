import { Container } from "@/components/ui/container";
import { isIndexable, type Entry } from "@/content/registry";
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
import { destinationLinks, guideLinks } from "@/features/content/links";
import { Breadcrumbs, JsonLd } from "@/features/seo/components";
import { faqLd, graph, guideLd, type Crumb } from "@/features/seo/json-ld";

export function guideCrumbs(page: Entry<Guide>): Crumb[] {
  return [
    { name: "Home", path: "/" },
    { name: "Travel guides", path: "/guides" },
    { name: page.headline, path: page.path },
  ];
}

const anchor = (heading: string) =>
  heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export function GuideView({ page }: { page: Entry<Guide> }) {
  return (
    <Container className="flex max-w-3xl flex-col gap-10 py-10">
      {isIndexable(page) ? (
        <JsonLd data={graph(guideLd(page), faqLd(page.faqs))} />
      ) : null}
      <div className="flex flex-col gap-4">
        <Breadcrumbs crumbs={guideCrumbs(page)} />
        <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          {page.headline}
        </h1>
        <p className="text-lg leading-8 text-muted-foreground">{page.intro}</p>
      </div>

      <nav
        aria-label="On this page"
        className="rounded-2xl border border-border bg-card p-5 text-sm"
      >
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
        title="Destination guides"
        links={destinationLinks(page.related.destinations)}
      />
      <RelatedLinks
        title="More travel planning guides"
        links={guideLinks(page.related.guides)}
      />
      <SourcesList sources={page.sources} lastReviewed={page.lastReviewed} />
    </Container>
  );
}
