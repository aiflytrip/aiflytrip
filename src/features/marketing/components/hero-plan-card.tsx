/**
 * Decorative example of what the planner produces. Clearly labelled
 * "Example plan" and shows no prices, so nothing here is a claim about a
 * real fare. The plane animation is SMIL inside the SVG; it is hidden for
 * reduced-motion users via `.motion-only`.
 */
import { type Locale } from "@/i18n/config";
import { HOME_COPY } from "@/i18n/pages/home";

const ROUTE = "M16 78 Q200 -30 384 78";

const CHIPS = ["bg-primary", "bg-violet", "bg-emerald-400"];

export function HeroPlanCard({ locale = "en" }: { locale?: Locale }) {
  const t = HOME_COPY[locale].heroCard;
  return (
    <div aria-hidden="true" className="relative">
      <div className="glass animate-float rounded-[28px] p-6 shadow-[0_40px_120px_-40px_rgb(0_0_0/0.8)]">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="size-2.5 rounded-full bg-emerald-400" />
            <span className="text-[15px] font-bold">{t.destination}</span>
          </div>
          <span className="rounded-full border border-violet/30 bg-violet/15 px-2.5 py-1 text-xs font-semibold text-violet-200">
            {t.badge}
          </span>
        </div>

        <div className="rounded-2xl border border-white/[0.07] bg-background/55 px-4.5 pt-4 pb-3">
          <div className="flex items-end justify-between">
            <div>
              <div className="font-mono text-2xl text-white">LHR</div>
              <div className="text-xs text-muted-foreground">{t.origin}</div>
            </div>
            <div className="text-right">
              <div className="font-mono text-2xl text-white">LIS</div>
              <div className="text-xs text-muted-foreground">{t.city}</div>
            </div>
          </div>
          <svg viewBox="0 0 400 90" className="-mt-2 block h-[90px] w-full">
            <path
              d={ROUTE}
              fill="none"
              stroke="rgb(255 255 255 / 0.14)"
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
            <circle cx="16" cy="78" r="5" fill="var(--primary)" />
            <circle cx="384" cy="78" r="5" fill="var(--violet)" />
            <g className="motion-only">
              <circle r="11" fill="rgb(56 189 248 / 0.25)" />
              <path d="M-7 -2 L7 0 L-7 2 L-4 0 Z" fill="#fff" />
              <animateMotion
                dur="4.5s"
                repeatCount="indefinite"
                rotate="auto"
                path={ROUTE}
              />
            </g>
          </svg>
          <div className="flex flex-wrap gap-2 font-mono text-xs text-muted-foreground">
            {t.tags.map((tag) => (
              <span key={tag} className="rounded-lg bg-white/[0.06] px-2 py-1">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-2.5">
          {t.days.map((day, index) => (
            <div
              key={day.label}
              className="flex items-start gap-3.5 rounded-2xl border border-white/[0.06] bg-white/[0.035] px-3.5 py-3"
            >
              <span
                className={`${CHIPS[index]} min-w-12 flex-none rounded-lg px-1.5 py-1.5 text-center font-mono text-xs text-primary-foreground`}
              >
                {day.label}
              </span>
              <div className="min-w-0">
                <div className="text-[15px] font-bold text-white">
                  {day.title}
                </div>
                <div className="mt-0.5 text-[13px] text-muted-foreground">
                  {day.detail}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-3 rounded-2xl border border-dashed border-primary/35 px-3.5 py-3">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--primary)"
            strokeWidth="2"
            strokeLinecap="round"
            className="size-4.5 flex-none"
          >
            <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
          </svg>
          <div className="min-w-0 flex-1">
            <div className="text-[13px] font-semibold text-accent-foreground">
              {t.refining}
            </div>
            <div className="skeleton-shimmer mt-2 h-1.5 rounded-full" />
          </div>
        </div>
      </div>

      <div className="glass animate-float-slow absolute -right-2 -bottom-8 flex items-center gap-3 rounded-2xl bg-card/85 px-4 py-3.5 sm:-right-5">
        <span className="grid size-9 place-items-center rounded-xl bg-emerald-400/15">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="#34d399"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4.5"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
        <div>
          <div className="text-sm font-bold">{t.ready}</div>
          <div className="text-xs text-muted-foreground">{t.readyDetail}</div>
        </div>
      </div>
    </div>
  );
}
