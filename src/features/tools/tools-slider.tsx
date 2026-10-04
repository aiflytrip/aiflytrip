"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

export type ToolSlide = { id: string; label: string; content: ReactNode };

/**
 * Accessible, swipeable tool slider: tabs, arrows and dots over a CSS
 * scroll-snap track. No autoplay. Every slide is in the HTML, so all tool
 * links are crawlable. A #tool-<id> hash (from the hero) opens that slide.
 */
/** Scroll position that centres a slide in the track (matches snap-center). */
const slideLeft = (track: HTMLElement, el: HTMLElement) =>
  el.offsetLeft - (track.clientWidth - el.clientWidth) / 2;

export function ToolsSlider({ slides }: { slides: ToolSlide[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting)
            setActive(Number((entry.target as HTMLElement).dataset.index));
      },
      { root: track, threshold: 0.6 },
    );
    for (const el of track.children) observer.observe(el);

    const openFromHash = () => {
      const index = slides.findIndex(
        (s) => window.location.hash === `#tool-${s.id}`,
      );
      const el = track.children[index] as HTMLElement | undefined;
      if (index < 0 || !el) return;
      // Show the whole section (heading and tabs), then the chosen slide.
      track
        .closest("section")
        ?.scrollIntoView({ behavior: "instant", block: "start" });
      track.scrollTo({ left: slideLeft(track, el), behavior: "instant" });
      setActive(index);
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", openFromHash);
    };
  }, [slides]);

  function go(index: number) {
    const track = trackRef.current;
    const clamped = Math.max(0, Math.min(slides.length - 1, index));
    const el = track?.children[clamped] as HTMLElement | undefined;
    if (!track || !el) return;
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;
    track.scrollTo({
      left: slideLeft(track, el),
      behavior: smooth ? "smooth" : "instant",
    });
    setActive(clamped);
  }

  const arrow =
    "grid size-10 place-items-center rounded-full border border-white/10 bg-white/[0.05] text-white transition-colors hover:border-white/25 disabled:opacity-35";

  return (
    <div
      className="flex flex-col gap-5"
      role="region"
      aria-roledescription="carousel"
      aria-label="Free travel tools"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Choose a tool"
        >
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => go(i)}
              aria-pressed={active === i}
              aria-controls={`tool-slide-${s.id}`}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                active === i
                  ? "border-primary/60 bg-primary/15 text-white"
                  : "border-white/10 bg-white/[0.04] text-muted-foreground hover:border-white/25 hover:text-white",
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
        <div className="hidden gap-2 sm:flex">
          <button
            type="button"
            className={arrow}
            onClick={() => go(active - 1)}
            disabled={active === 0}
            aria-label="Previous tool"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4.5"
            >
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </button>
          <button
            type="button"
            className={arrow}
            onClick={() => go(active + 1)}
            disabled={active === slides.length - 1}
            aria-label="Next tool"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4.5"
            >
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="no-scrollbar relative -mx-4 flex snap-x snap-mandatory items-start gap-4 overflow-x-auto scroll-smooth px-4 pb-2 motion-reduce:scroll-auto sm:mx-0 sm:px-0 lg:items-stretch"
      >
        {slides.map((s, i) => (
          <div
            key={s.id}
            id={`tool-slide-${s.id}`}
            data-index={i}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}: ${s.label}`}
            className="w-[92%] flex-none snap-center sm:w-full"
          >
            {s.content}
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-2" aria-hidden="true">
        {slides.map((s, i) => (
          <button
            key={s.id}
            type="button"
            tabIndex={-1}
            onClick={() => go(i)}
            className={cn(
              "h-1.5 rounded-full transition-all",
              active === i ? "w-6 bg-primary" : "w-1.5 bg-white/25",
            )}
          />
        ))}
      </div>
    </div>
  );
}
