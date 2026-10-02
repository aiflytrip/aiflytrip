import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-96 bg-linear-to-b from-accent to-transparent"
      />
      <Container className="flex flex-col items-center py-20 text-center sm:py-28">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
          <span
            aria-hidden="true"
            className="size-1.5 rounded-full bg-primary"
          />
          Coming soon
        </span>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
          Plan your next trip with an AI that gets it
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-pretty text-muted-foreground">
          {siteConfig.description}
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/#how-it-works" size="lg">
            See how it works
          </ButtonLink>
          <ButtonLink href="/#features" variant="secondary" size="lg">
            Explore features
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
