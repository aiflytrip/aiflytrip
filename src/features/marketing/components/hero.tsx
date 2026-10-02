import { type ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";

/** `search` is a slot so this module doesn't depend on the flights feature. */
export function Hero({ search }: { search?: ReactNode }) {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[32rem] bg-linear-to-b from-accent to-transparent"
      />
      <Container className="flex flex-col items-center py-16 text-center sm:py-24">
        <Badge className="mb-6">
          <span
            aria-hidden="true"
            className="size-1.5 rounded-full bg-primary"
          />
          Preview · not real fares yet
        </Badge>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
          Plan your next trip with an AI that gets it
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-pretty text-muted-foreground">
          {siteConfig.description}
        </p>
        {search ? (
          <Card className="mt-10 w-full max-w-5xl p-5 text-left sm:p-6">
            {search}
          </Card>
        ) : null}
      </Container>
    </section>
  );
}
