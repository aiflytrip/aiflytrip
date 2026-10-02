"use client";

import { useEffect } from "react";

// Replaces the root layout when it fails, so it renders its own document and
// cannot rely on globals.css. Styles are kept inline and minimal on purpose.
export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          display: "grid",
          minHeight: "100vh",
          placeItems: "center",
          margin: 0,
          fontFamily: "system-ui, sans-serif",
          textAlign: "center",
        }}
      >
        <title>Something went wrong | AIFlyTrip</title>
        <div>
          <h1>Something went wrong</h1>
          <p>An unexpected error occurred. Please try again.</p>
          <button type="button" onClick={() => retry()}>
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
