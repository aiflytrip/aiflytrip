"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

import { Button } from "@/components/ui/button";
import { track, type AnalyticsEvent } from "@/features/analytics/track";
import { cn } from "@/lib/utils";

/**
 * Form controls and URL helpers shared by the packing and baggage tools.
 * Each tool keeps its inputs in the page link, so a result can be shared.
 */

export function Choice<T extends string>({
  name,
  label,
  value,
  onChange,
  options,
}: {
  name: string;
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: { value: T; label: string }[];
}) {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="mb-1 text-sm font-medium text-foreground">
        {label}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <label
            key={o.value}
            className={cn(
              "cursor-pointer rounded-full border px-3.5 py-2 text-sm transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring",
              value === o.value
                ? "border-primary/60 bg-primary/15 text-white"
                : "border-white/10 bg-white/[0.04] text-muted-foreground hover:border-white/25",
            )}
          >
            <input
              type="radio"
              name={name}
              value={o.value}
              checked={value === o.value}
              onChange={() => onChange(o.value)}
              className="sr-only"
            />
            {o.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function CheckboxRow({
  checked,
  onChange,
  children,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-sm text-foreground/90">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="size-4 accent-sky-400"
      />
      {children}
    </label>
  );
}

const noopSubscribe = () => () => {};

/** The page's query string, read after hydration so static pages stay static. */
export function useQueryString(): string {
  return useSyncExternalStore(
    noopSubscribe,
    () => window.location.search,
    () => "",
  );
}

/** Keeps the URL in step with the inputs once the user changes something. */
export function useSyncQuery(query: string, changed: boolean) {
  useEffect(() => {
    if (!changed) return;
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${query ? `?${query}` : ""}`,
    );
  }, [query, changed]);
}

export type ShareLabels = { copy: string; copied: string; prompt: string };

const ENGLISH_SHARE_LABELS: ShareLabels = {
  copy: "Copy share link",
  copied: "Link copied",
  prompt: "Copy this link to share your result:",
};

export function ShareButton({
  event,
  labels = ENGLISH_SHARE_LABELS,
}: {
  event: AnalyticsEvent;
  labels?: ShareLabels;
}) {
  const [copied, setCopied] = useState(false);
  async function share() {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      window.prompt(labels.prompt, url);
    }
    track(event);
  }
  return (
    <Button type="button" onClick={share}>
      {copied ? labels.copied : labels.copy}
    </Button>
  );
}
