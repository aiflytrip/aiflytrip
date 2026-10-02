import { type Instrumentation } from "next";

/**
 * Structured server error logs for the hosting platform's log drain (Vercel
 * Logs). Deliberately minimal: no headers, cookies, query strings or request
 * bodies, so no tokens or personal data end up in logs.
 */
export const onRequestError: Instrumentation.onRequestError = async (
  err,
  request,
  context,
) => {
  const error = err instanceof Error ? err : new Error(String(err));
  const digest =
    typeof err === "object" && err !== null && "digest" in err
      ? String(err.digest)
      : undefined;
  console.error(
    JSON.stringify({
      level: "error",
      event: "request_error",
      name: error.name,
      message: error.message.slice(0, 500),
      digest,
      method: request.method,
      path: request.path.split("?")[0],
      routePath: context.routePath,
      routeType: context.routeType,
    }),
  );
};
