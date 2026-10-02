import { type ReactNode } from "react";

import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";

/** Centered card layout shared by sign-in, sign-up and auth status pages. */
export function AuthCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: ReactNode;
  children: ReactNode;
}) {
  return (
    <Container className="flex flex-1 items-center justify-center py-12 sm:py-20">
      <Card className="w-full max-w-md p-6 sm:p-8">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {description ? (
          <div className="mt-2 text-sm text-muted-foreground">
            {description}
          </div>
        ) : null}
        <div className="mt-6">{children}</div>
      </Card>
    </Container>
  );
}
