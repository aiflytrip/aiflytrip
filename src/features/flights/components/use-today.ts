"use client";

import { useSyncExternalStore } from "react";

import { toIsoDate } from "@/features/flights/lib/dates";

const subscribe = () => () => {};

/**
 * Today's date in the visitor's own time zone (YYYY-MM-DD). Returns
 * undefined during server rendering so static pages never bake in a stale
 * date and hydration stays consistent.
 */
export function useToday(): string | undefined {
  return useSyncExternalStore(
    subscribe,
    () =>
      toIsoDate(new Date(), Intl.DateTimeFormat().resolvedOptions().timeZone),
    () => undefined,
  );
}
