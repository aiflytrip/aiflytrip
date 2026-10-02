"use client";

import { type ComponentProps } from "react";

import { ButtonLink } from "@/components/ui/button";
import { track } from "@/features/analytics/track";

/** Primary planner CTA; records which placement converted (no personal data). */
export function PlannerCtaLink({
  placement,
  onClick,
  ...props
}: ComponentProps<typeof ButtonLink> & { placement: string }) {
  return (
    <ButtonLink
      {...props}
      onClick={(event) => {
        track("planner_cta_click", { placement });
        onClick?.(event);
      }}
    />
  );
}
