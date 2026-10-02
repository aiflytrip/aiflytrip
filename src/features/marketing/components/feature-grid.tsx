import { Container } from "@/components/ui/container";
import { features } from "@/features/marketing/content";
import { SectionHeading } from "@/features/marketing/components/section-heading";

const FEATURE_ICONS = [
  "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z",
  "M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z",
  "M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
];

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
        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {features.map((feature, index) => (
            <li
              key={feature.title}
              className="glass lift reveal rounded-3xl p-7"
            >
              <span
                aria-hidden="true"
                className="grid size-12 place-items-center rounded-2xl border border-violet/30 bg-violet/10"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--violet)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-5.5"
                >
                  <path d={FEATURE_ICONS[index] ?? FEATURE_ICONS[0]} />
                </svg>
              </span>
              <h3 className="mt-5 text-xl font-semibold text-white">
                {feature.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
