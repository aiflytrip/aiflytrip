import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ResultsSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div role="status" aria-live="polite" className="flex flex-col gap-4">
      <span className="sr-only">Searching for flights…</span>
      <Skeleton className="h-5 w-40" />
      {Array.from({ length: count }, (_, i) => (
        <Card
          key={i}
          className="flex flex-col gap-4 p-5 md:flex-row md:items-center"
        >
          <div className="flex flex-1 flex-col gap-3">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="flex flex-col gap-2 md:w-48 md:items-end">
            <Skeleton className="h-7 w-24" />
            <Skeleton className="h-10 w-28 rounded-full" />
          </div>
        </Card>
      ))}
    </div>
  );
}
