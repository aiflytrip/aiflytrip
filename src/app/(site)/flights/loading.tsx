import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";
import { ResultsSkeleton } from "@/features/flights";

export default function Loading() {
  return (
    <Container className="flex flex-col gap-8 py-10">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-8 w-72 max-w-full" />
        <Skeleton className="h-4 w-56 max-w-full" />
      </div>
      <Card className="p-5">
        <Skeleton className="h-40 w-full" />
      </Card>
      <ResultsSkeleton />
    </Container>
  );
}
