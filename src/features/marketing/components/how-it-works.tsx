import { Container } from "@/components/ui/container";
import { steps } from "@/features/marketing/content";
import { SectionHeading } from "@/features/marketing/components/section-heading";

const STEP_ICONS = [
  "M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z",
  "M12 3l1.9 5.8L20 10l-6.1 1.2L12 17l-1.9-5.8L4 10l6.1-1.2Z",
  "M20 6 9 17l-5-5",
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="scroll-mt-16 py-20 sm:py-24"
    >
      <Container>
        <SectionHeading
          id="how-it-works-heading"
          eyebrow="How it works"
          title="From idea to itinerary in three steps"
          align="left"
        />
        <ol className="mt-12 grid gap-5 md:grid-cols-3">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="glass lift reveal flex min-h-56 flex-col gap-3.5 rounded-3xl p-7"
            >
              <div className="flex items-center justify-between">
                <span
                  aria-hidden="true"
                  className="grid size-12 place-items-center rounded-2xl border border-primary/30 bg-primary/10"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-5.5"
                  >
                    <path d={STEP_ICONS[index] ?? STEP_ICONS[0]} />
                  </svg>
                </span>
                <span
                  aria-hidden="true"
                  className="font-mono text-sm text-muted-foreground/60"
                >
                  0{index + 1}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-white">{step.title}</h3>
              <p className="text-[15px] leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
