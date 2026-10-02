import { Container } from "@/components/ui/container";
import { features } from "@/features/marketing/content";
import { SectionHeading } from "@/features/marketing/components/section-heading";

export function FeatureGrid() {
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="scroll-mt-16 py-20 sm:py-24"
    >
      <Container>
        <SectionHeading
          id="features-heading"
          eyebrow="Features"
          title="Travel planning without the tab overload"
          description="Built around how people actually plan trips."
        />
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <li
              key={feature.title}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {feature.description}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
