/**
 * Conversion events. Names are fixed so dashboards stay consistent; props
 * must never contain personal data (emails, names, plan ids, free text).
 */
export type AnalyticsEvent =
  | "planner_cta_click"
  | "signup_started"
  | "plan_generated"
  | "premium_checkout_started"
  | "flight_search";

type Props = Record<string, string | number | boolean>;

type AnalyticsWindow = Window & {
  plausible?: (event: string, options?: { props?: Props }) => void;
  gtag?: (command: "event", event: string, params?: Props) => void;
};

/** Fire-and-forget; a no-op when analytics is disabled or blocked. */
export function track(event: AnalyticsEvent, props?: Props): void {
  if (typeof window === "undefined") return;
  const w = window as AnalyticsWindow;
  try {
    w.plausible?.(event, props ? { props } : undefined);
    w.gtag?.("event", event, props);
  } catch {
    // Analytics must never break the page.
  }
}
