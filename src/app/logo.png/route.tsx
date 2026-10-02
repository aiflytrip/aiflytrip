import { ImageResponse } from "next/og";

/** Square brand mark at a stable URL, referenced by Organization structured data. */
export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0369a1",
        color: "#ffffff",
        fontSize: 300,
        fontWeight: 700,
        fontFamily: "sans-serif",
        borderRadius: 96,
      }}
    >
      A
    </div>,
    { width: 512, height: 512 },
  );
}
