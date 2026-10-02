import Link from "next/link";

import { Card } from "@/components/ui/card";
import { deleteSavedSearch } from "@/features/saved-trips/actions";

export type SavedSearchItem = {
  id: string;
  label: string;
  search_key: string;
  created_at: string;
};

const savedOn = new Intl.DateTimeFormat("en-US", { dateStyle: "medium" });

export function SavedSearchList({ items }: { items: SavedSearchItem[] }) {
  if (items.length === 0) {
    return (
      <Card className="flex flex-col items-center gap-2 p-8 text-center">
        <p className="font-semibold">No saved searches yet</p>
        <p className="max-w-sm text-sm text-muted-foreground">
          Search for flights and choose &ldquo;Save search&rdquo; to keep it
          here.
        </p>
        <Link
          href="/flights"
          className="mt-2 text-sm font-medium text-primary hover:underline"
        >
          Search flights
        </Link>
      </Card>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => (
        <li key={item.id}>
          <Card className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Link
                href={`/flights?${item.search_key}`}
                className="font-medium hover:text-primary hover:underline"
              >
                {item.label}
              </Link>
              <p className="text-xs text-muted-foreground">
                Saved {savedOn.format(new Date(item.created_at))}
              </p>
            </div>
            <form action={deleteSavedSearch}>
              <input type="hidden" name="id" value={item.id} />
              <button
                type="submit"
                className="text-sm text-muted-foreground hover:text-danger"
                aria-label={`Remove saved search: ${item.label}`}
              >
                Remove
              </button>
            </form>
          </Card>
        </li>
      ))}
    </ul>
  );
}
