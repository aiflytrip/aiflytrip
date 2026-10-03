import { readFileSync } from "node:fs";
import { join } from "node:path";

import { ImageResponse } from "next/og";

/** The brand mark, inlined so social cards render without network access. */
const LOGO_SRC = `data:image/png;base64,${readFileSync(
  join(process.cwd(), "public", "logo.png"),
).toString("base64")}`;

export const OG_SIZE = { width: 1200, height: 630 };

/**
 * Consistent social preview card: brand, an eyebrow label and the page
 * title. Rendered at build time for static pages. Shows only public page
 * information, never user data.
 */
export function renderOgImage({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        background:
          "radial-gradient(circle at 15% 10%, rgba(56,189,248,0.35), transparent 45%), radial-gradient(circle at 90% 30%, rgba(167,139,250,0.32), transparent 50%), #070b16",
        color: "#ffffff",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain img */}
        <img src={LOGO_SRC} width={64} height={64} alt="" />
        <div style={{ fontSize: 36, fontWeight: 700 }}>AIFlyTrip</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ fontSize: 30, color: "#7dd3fc", fontWeight: 600 }}>
          {eyebrow}
        </div>
        <div
          style={{
            fontSize: title.length > 48 ? 60 : 72,
            fontWeight: 700,
            lineHeight: 1.1,
            maxWidth: 1000,
          }}
        >
          {title}
        </div>
      </div>
      <div style={{ fontSize: 26, color: "#a2abbf" }}>
        AI trip planner · personalized itineraries
      </div>
    </div>,
    OG_SIZE,
  );
}
