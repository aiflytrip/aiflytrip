"use client";

import { useEffect, useRef } from "react";

/**
 * Decorative background flights. Scrolling down, an airliner flies down a
 * curved route drawing a blue contrail; scrolling up, a second plane takes
 * over and flies back up nose first with a violet contrail. Purely visual
 * (aria-hidden, no pointer events), behind the content, updated once per
 * animation frame on scroll and resize. With reduced motion everything
 * stays still.
 */

/** Route control points as fractions of the viewport (x, y). */
const ROUTE = [
  [1.06, 0.1],
  [0.95, 0.14],
  [0.97, 0.32],
  [0.9, 0.45],
  [0.83, 0.58],
  [0.06, 0.42],
  [0.05, 0.62],
  [0.04, 0.84],
  [0.95, 0.8],
  [1.08, 1.02],
] as const;

function routeFor(w: number, h: number): string {
  const p = ROUTE.map(([x, y]) => `${Math.round(x * w)} ${Math.round(y * h)}`);
  return `M${p[0]} C${p[1]} ${p[2]} ${p[3]} S${p[5]} ${p[6]} S${p[8]} ${p[9]}`;
}

/** Ignore tiny scroll jitters when deciding the direction of travel. */
const DIRECTION_THRESHOLD = 3;

function Plane({
  glow,
  planeRef,
}: {
  glow: string;
  planeRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div
      ref={planeRef}
      className="absolute top-0 left-0 size-12 origin-top-left opacity-0 transition-opacity duration-500 sm:size-[72px]"
    >
      <svg viewBox="-22 -22 44 44" className={`size-full ${glow}`}>
        <g fill="#fff" fillOpacity="0.75">
          <path d="M-17 -3.2 Q-19.5 0 -17 3.2 L13 3 Q19.5 0 13 -3 Z" />
          <path d="M-1 -2.6 L-8.5 -19 L-3 -19 L9 -2.6 Z" />
          <path d="M-1 2.6 L-8.5 19 L-3 19 L9 2.6 Z" />
          <path d="M-14.5 -2 L-18.5 -9.5 L-15.2 -9.5 L-10.5 -2 Z" />
          <path d="M-14.5 2 L-18.5 9.5 L-15.2 9.5 L-10.5 2 Z" />
        </g>
      </svg>
    </div>
  );
}

/**
 * `subtle` (tool pages, with dense forms and results): fainter overall
 * and fades further while behind the content.
 */
export function ScrollFlight({ subtle = false }: { subtle?: boolean }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const routeRef = useRef<SVGPathElement>(null);
  const downTrailRef = useRef<SVGPathElement>(null);
  const upTrailRef = useRef<SVGPathElement>(null);
  const downPlaneRef = useRef<HTMLDivElement>(null);
  const upPlaneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const route = routeRef.current;
    const downTrail = downTrailRef.current;
    const upTrail = upTrailRef.current;
    const downPlane = downPlaneRef.current;
    const upPlane = upPlaneRef.current;
    if (!svg || !route || !downTrail || !upTrail || !downPlane || !upPlane)
      return;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    let total = 0;
    let frame = 0;
    let lastY = window.scrollY;
    let goingUp = false;

    const layout = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const d = routeFor(w, h);
      svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
      for (const path of [route, downTrail, upTrail]) path.setAttribute("d", d);
      total = route.getTotalLength();
    };

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      if (Math.abs(y - lastY) >= DIRECTION_THRESHOLD) {
        goingUp = y < lastY;
        lastY = y;
      }
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = still.matches
        ? 0.3
        : max > 0
          ? Math.min(1, Math.max(0, y / max))
          : 0;
      const up = goingUp && !still.matches;

      // Start and finish just inside the screen so the plane stays visible.
      const at = total * (0.06 + progress * 0.86);
      const a = route.getPointAtLength(at);
      const b = route.getPointAtLength(Math.min(total, at + 2));
      const heading = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
      // Fade while crossing the content column, like flying through cloud.
      const fromCentre = Math.abs(a.x / window.innerWidth - 0.5) * 2;
      const edge = Math.min(1, fromCentre * 1.5);
      const visible = String(
        subtle ? 0.15 + 0.5 * edge * edge : 0.3 + 0.7 * edge,
      );

      const active = up ? upPlane : downPlane;
      const idle = up ? downPlane : upPlane;
      active.style.transform = `translate(${a.x}px, ${a.y}px) rotate(${up ? heading + 180 : heading}deg) translate(-50%, -50%)`;
      active.style.opacity = visible;
      idle.style.opacity = "0";

      // Each contrail shows the stretch its plane has flown: from the top
      // for the plane going down, from the bottom for the plane going up.
      downTrail.style.strokeDasharray = `${at} ${total}`;
      upTrail.style.strokeDasharray = `0 ${at} ${total - at} ${total}`;
      downTrail.style.opacity = up ? "0" : "1";
      upTrail.style.opacity = up ? "1" : "0";
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onResize = () => {
      layout();
      schedule();
    };

    layout();
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", onResize);
    still.addEventListener("change", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
      still.removeEventListener("change", schedule);
    };
  }, [subtle]);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 -z-20 overflow-hidden print:hidden ${subtle ? "opacity-75" : ""}`}
    >
      <svg ref={svgRef} className="absolute inset-0 size-full" fill="none">
        <defs>
          <linearGradient id="contrail-down" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#38BDF8" />
            <stop offset="1" stopColor="#6366F1" />
          </linearGradient>
          <linearGradient id="contrail-up" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="#C084FC" />
            <stop offset="1" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
        {/* The full route, faint and dotted. */}
        <path
          ref={routeRef}
          d={routeFor(1280, 800)}
          stroke="rgb(255 255 255 / 0.08)"
          strokeWidth="2"
          strokeDasharray="1 14"
          strokeLinecap="round"
        />
        <path
          ref={downTrailRef}
          d={routeFor(1280, 800)}
          stroke="url(#contrail-down)"
          strokeOpacity="0.34"
          strokeWidth="3"
          strokeLinecap="round"
          className="transition-opacity duration-500"
          style={{ strokeDasharray: "0 99999" }}
        />
        <path
          ref={upTrailRef}
          d={routeFor(1280, 800)}
          stroke="url(#contrail-up)"
          strokeOpacity="0.38"
          strokeWidth="3"
          strokeLinecap="round"
          className="opacity-0 transition-opacity duration-500"
          style={{ strokeDasharray: "0 99999" }}
        />
      </svg>
      <Plane
        planeRef={downPlaneRef}
        glow="drop-shadow-[0_0_16px_rgb(56_189_248/0.5)]"
      />
      <Plane
        planeRef={upPlaneRef}
        glow="drop-shadow-[0_0_16px_rgb(192_132_252/0.6)]"
      />
    </div>
  );
}
