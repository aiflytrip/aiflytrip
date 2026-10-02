/** Liveness probe for uptime monitors and deployment health checks. */
export function GET() {
  return Response.json(
    { status: "ok" },
    { headers: { "Cache-Control": "no-store" } },
  );
}
