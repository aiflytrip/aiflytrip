import { cn } from "@/lib/utils";

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "center",
}: {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}) {
  return (
    <div
      className={cn(
        "reveal max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
      )}
    >
      <p className="eyebrow">{eyebrow}</p>
      <h2
        id={id}
        className="mt-3 text-[clamp(2rem,4vw,2.875rem)] leading-tight font-bold text-balance text-white"
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-pretty text-muted-foreground">{description}</p>
      ) : null}
    </div>
  );
}
