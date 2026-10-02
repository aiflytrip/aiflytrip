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
          "linear-gradient(135deg, #e0f2fe 0%, #ffffff 55%, #f0f9ff 100%)",
        color: "#0b1324",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 16,
            background: "#0369a1",
            color: "#ffffff",
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
        <div style={{ fontSize: 30, color: "#0369a1", fontWeight: 600 }}>
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
      <div style={{ fontSize: 26, color: "#526079" }}>
        AI trip planner · personalized itineraries
      </div>
    </div>,
    OG_SIZE,
  );
}
