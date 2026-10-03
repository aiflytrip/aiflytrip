import { cn } from "@/lib/utils";

/**
 * AIFlyTrip brand mark: an airliner on a sky-blue to violet gradient with a
 * dotted flight path and an "AI" sparkle. Original artwork made from basic
 * shapes (no third-party assets). Same design as src/app/icon.svg.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      className={cn("shrink-0", className)}
    >
      <defs>
        <linearGradient
          id="aiflytrip-mark-bg"
          x1="6"
          y1="4"
          x2="58"
          y2="60"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#38BDF8" />
          <stop offset="0.55" stopColor="#6366F1" />
          <stop offset="1" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="15" fill="url(#aiflytrip-mark-bg)" />
      <path
        d="M9 54 Q 15 46 22 41"
        fill="none"
        stroke="#fff"
        strokeOpacity="0.75"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeDasharray="0.1 6.5"
      />
      <g transform="translate(37 28) rotate(-38)" fill="#fff">
        <path d="M-17 -3.2 Q-19.5 0 -17 3.2 L13 3 Q19.5 0 13 -3 Z" />
        <path d="M-1 -2.6 L-8.5 -19 L-3 -19 L9 -2.6 Z" />
        <path d="M-1 2.6 L-8.5 19 L-3 19 L9 2.6 Z" />
        <path d="M-14.5 -2 L-18.5 -9.5 L-15.2 -9.5 L-10.5 -2 Z" />
        <path d="M-14.5 2 L-18.5 9.5 L-15.2 9.5 L-10.5 2 Z" />
      </g>
      <path
        d="M14 12 l1.7 4.3 4.3 1.7 -4.3 1.7 -1.7 4.3 -1.7 -4.3 -4.3 -1.7 4.3 -1.7 z"
        fill="#fff"
      />
    </svg>
  );
}
