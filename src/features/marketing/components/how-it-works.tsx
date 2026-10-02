import { Container } from "@/components/ui/container";
import { steps } from "@/features/marketing/content";
import { SectionHeading } from "@/features/marketing/components/section-heading";

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="scroll-mt-16 bg-muted py-20 sm:py-24"
    >
      <Container>
        <SectionHeading
          id="how-it-works-heading"
          eyebrow="How it works"
          title="From idea to itinerary in three steps"
        />
        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <span
                aria-hidden="true"
                className="grid size-9 place-items-center rounded-full bg-accent text-sm font-semibold text-accent-foreground"
              >
                {index + 1}
              </span>
              <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
