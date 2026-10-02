import { cn } from "@/lib/utils";

/** Top-of-form status message, announced to screen readers. */
export function FormMessage({
  tone = "error",
  children,
  className,
}: {
  tone?: "error" | "success";
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      role={tone === "error" ? "alert" : "status"}
      className={cn(
        "rounded-xl border px-4 py-3 text-sm",
        tone === "error"
          ? "border-danger/30 bg-danger/5 text-danger"
          : "border-success/30 bg-success-soft text-success",
        className,
      )}
    >
      {children}
    </p>
  );
}
