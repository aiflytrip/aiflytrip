import { ImageResponse } from "next/og";

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
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 16,
            background: "linear-gradient(135deg, #38bdf8, #a78bfa)",
            color: "#04121f",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 36,
            fontWeight: 700,
          }}
        >
          A
        </div>
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
