"use client";

import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import {
  saveSearch,
  type SaveSearchState,
} from "@/features/saved-trips/actions";

const INITIAL: SaveSearchState = { status: "idle" };

type Labels = {
  idle: string;
  saving: string;
  saved: string;
  exists: string;
  findIt: string;
};

export function SaveSearchButton({
  search,
  labels,
}: {
  search: string;
  labels: Labels;
}) {
  const [state, formAction, pending] = useActionState(saveSearch, INITIAL);
  const done = state.status === "saved" || state.status === "exists";

  return (
    <form
      action={formAction}
      className="flex flex-col items-start gap-1 sm:items-end"
    >
      <input type="hidden" name="search" value={search} />
      <Button
        type="submit"
        variant="secondary"
        size="sm"
        disabled={pending || done}
      >
        {pending
          ? labels.saving
          : state.status === "error"
            ? labels.idle
            : labels[state.status]}
      </Button>
      <p aria-live="polite" className="text-xs text-muted-foreground">
        {state.status === "error" ? (
          <span className="text-danger">{state.message}</span>
        ) : null}
        {done ? labels.findIt : null}
      </p>
    </form>
  );
}
