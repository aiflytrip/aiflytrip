"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { type Locale } from "@/i18n/config";
import { plannerMessages } from "@/i18n/messages/planner";
import { cn } from "@/lib/utils";

const POLL_MS = 4000;
const TIP_MS = 7000;
// Wide viewBox: width is always the limiting side, so the arc spans the card.
const ROUTE = "M16 112 Q480 -48 944 112";

/**
 * Typical stages of a plan, timed from how long generation usually takes.
 * They describe what the planner does in order; they are an estimate, not
 * a live progress feed, and the copy says so.
 */
const STEP_STARTS = [0, 8, 20, 60, 85] as const;

/** Eases towards 95% and never claims completion before the plan is ready. */
const progressFor = (seconds: number) =>
  Math.min(95, Math.round(95 * (1 - Math.exp(-seconds / 45))));

/** Shown while a plan generates; re-renders the server page until it's done. */
export function PlanPending({
  startedAt,
  origin,
  destination,
  originCity,
  destinationCity,
  locale = "en",
}: {
  locale?: Locale;
  startedAt: string;
  origin?: string;
  destination?: string;
  originCity?: string;
  destinationCity?: string;
}) {
  const router = useRouter();
  const t = plannerMessages(locale).pending;
  const STEPS = t.steps.map((step, i) => ({
    ...step,
    after: STEP_STARTS[i] ?? 0,
  }));
  const TIPS = t.tips;
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const start = Date.parse(startedAt);
    const update = () =>
      setElapsed(Math.max(0, Math.round((Date.now() - start) / 1000)));
    update();
    const tick = setInterval(update, 1000);
    const poll = setInterval(() => router.refresh(), POLL_MS);
    return () => {
      clearInterval(tick);
      clearInterval(poll);
    };
  }, [router, startedAt]);

  const activeIndex = STEPS.reduce(
    (current, step, index) => (elapsed >= step.after ? index : current),
    0,
  );
  const active = STEPS[activeIndex]!;
  const tip = TIPS[Math.floor((elapsed * 1000) / TIP_MS) % TIPS.length]!;
  const progress = progressFor(elapsed);
  const slow = elapsed >= 120;

  return (
    <div className="flex flex-col gap-6">
      <div className="glass relative overflow-hidden rounded-[28px] p-6 sm:p-8">
        <div
          aria-hidden="true"
          className="orb -top-40 left-1/2 -ml-[260px] h-[360px] w-[520px] bg-[radial-gradient(circle,rgb(56_189_248/0.22),transparent_65%)]"
        />
        <div className="relative flex flex-col gap-2">
          <p className="inline-flex items-center gap-2.5 self-start rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-accent-foreground">
            <span className="animate-live size-2 rounded-full bg-emerald-400" />
            {t.badge}
          </p>
          <h1 className="text-3xl font-bold text-balance text-white sm:text-4xl">
            {t.title}
            {destinationCity ? (
              <span className="text-gradient">
                {t.titleFor(destinationCity)}
              </span>
            ) : null}
          </h1>
        </div>

        {origin && destination ? (
          <div aria-hidden="true" className="relative mt-6">
            <div className="flex items-end justify-between">
              <div>
                <div className="font-mono text-3xl text-white">{origin}</div>
                <div className="text-xs text-muted-foreground">
                  {originCity}
                </div>
              </div>
              <div className="text-right">
                <div className="font-mono text-3xl text-white">
                  {destination}
                </div>
                <div className="text-xs text-muted-foreground">
                  {destinationCity}
                </div>
              </div>
            </div>
            <svg viewBox="0 0 960 124" className="-mt-2 block h-auto w-full">
              <path
                d={ROUTE}
                fill="none"
                stroke="rgb(255 255 255 / 0.12)"
                strokeWidth="2"
              />
              <path
                className="animate-route"
                d={ROUTE}
                fill="none"
                stroke="var(--primary)"
                strokeWidth="2.4"
                strokeDasharray="6 18"
                strokeLinecap="round"
              />
              <circle cx="16" cy="112" r="7" fill="var(--primary)" />
              <circle cx="944" cy="112" r="7" fill="var(--violet)" />
              <circle
                cx="944"
                cy="112"
                r="6"
                fill="none"
                stroke="var(--violet)"
                className="motion-only"
              >
                <animate
                  attributeName="r"
                  values="6;18"
                  dur="1.8s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.8;0"
                  dur="1.8s"
                  repeatCount="indefinite"
                />
              </circle>
              <g className="motion-only">
                <circle r="12" fill="rgb(56 189 248 / 0.25)" />
                <path d="M-8 -2.5 L8 0 L-8 2.5 L-4.5 0 Z" fill="#fff" />
                <animateMotion
                  dur="5s"
                  repeatCount="indefinite"
                  rotate="auto"
                  path={ROUTE}
                />
              </g>
            </svg>
          </div>
        ) : null}

        <div className="relative mt-6 flex flex-col gap-2">
          <div className="flex items-baseline justify-between gap-3 text-sm">
            <p
              className="font-semibold text-white"
              role="status"
              aria-live="polite"
            >
              {active.title}…
            </p>
            <p className="text-xs text-muted-foreground tabular-nums">
              {t.elapsed(elapsed)}
            </p>
          </div>
          <div
            className="h-2 overflow-hidden rounded-full bg-white/[0.07]"
            role="progressbar"
            aria-label={t.progressLabel}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
          >
            <div
              className="relative h-full overflow-hidden rounded-full bg-linear-to-r from-primary to-violet transition-[width] duration-1000 ease-out"
              style={{ width: `${progress}%` }}
            >
              <span className="skeleton-shimmer absolute inset-0 opacity-70" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <ol
          className="glass flex flex-col gap-1 rounded-3xl p-5"
          aria-label={t.stepsLabel}
        >
          {STEPS.map((step, index) => {
            const state =
              index < activeIndex
                ? "done"
                : index === activeIndex
                  ? "active"
                  : "todo";
            return (
              <li
                key={step.title}
                className="flex items-start gap-3.5 rounded-2xl px-2 py-2.5"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "mt-0.5 grid size-7 flex-none place-items-center rounded-full border text-xs",
                    state === "done" &&
                      "border-emerald-400/40 bg-emerald-400/15 text-emerald-300",
                    state === "active" &&
                      "border-primary/60 bg-primary/15 text-primary",
                    state === "todo" &&
                      "border-white/10 text-muted-foreground/60",
                  )}
                >
                  {state === "done" ? (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="size-3.5"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  ) : state === "active" ? (
                    <span className="size-2.5 animate-ping rounded-full bg-primary motion-reduce:animate-none" />
                  ) : (
                    index + 1
                  )}
                </span>
                <div className="min-w-0">
                  <p
                    className={cn(
                      "text-sm font-semibold",
                      state === "todo"
                        ? "text-muted-foreground/70"
                        : "text-white",
                    )}
                  >
                    {step.title}
                    <span className="sr-only">
                      {state === "done"
                        ? t.done
                        : state === "active"
                          ? t.inProgress
                          : ""}
                    </span>
                  </p>
                  <p className="text-xs text-muted-foreground">{step.detail}</p>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="flex flex-col gap-4">
          <div className="glass rounded-3xl p-5">
            <p className="eyebrow text-[11px]">{t.whileYouWait}</p>
            <p
              key={tip}
              className="animate-rise mt-2 text-sm leading-relaxed text-foreground/90"
            >
              {tip}
            </p>
          </div>
          <div
            aria-hidden="true"
            className="glass flex flex-col gap-4 rounded-3xl p-5"
          >
            <div className="skeleton-shimmer h-5 w-2/3 rounded-md" />
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex gap-3">
                <span className="skeleton-shimmer size-8 flex-none rounded-full" />
                <div className="flex flex-1 flex-col gap-2">
                  <span className="skeleton-shimmer h-3.5 w-1/2 rounded-md" />
                  <span className="skeleton-shimmer h-10 w-full rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="text-sm text-muted-foreground">{slow ? t.slow : t.leave}</p>
    </div>
  );
}
