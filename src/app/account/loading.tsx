import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <Container
      className="flex flex-col gap-10 py-10"
      role="status"
      aria-live="polite"
    >
      <span className="sr-only">Loading your account…</span>
      <div className="flex flex-col gap-2">
        <Skeleton className="h-8 w-56" />
        <Skeleton className="h-4 w-72 max-w-full" />
      </div>
      <Card className="p-5">
        <Skeleton className="h-24 w-full" />
      </Card>
      <div className="flex flex-col gap-3">
        <Skeleton className="h-16 w-full rounded-2xl" />
        <Skeleton className="h-16 w-full rounded-2xl" />
      </div>
    </Container>
  );
}
