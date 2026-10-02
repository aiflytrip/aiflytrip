import { type ReactNode } from "react";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export type FieldControlProps = {
  id: string;
  "aria-invalid"?: true;
  "aria-describedby"?: string;
};

/**
 * Label + control + error message, with the ARIA wiring done in one place.
 * The control is passed as a render function so it receives the right ids.
 */
export function Field({
  id,
  label,
  error,
  className,
  children,
}: {
  id: string;
  label: ReactNode;
  error?: string;
  className?: string;
  children: (controlProps: FieldControlProps) => ReactNode;
}) {
  const errorId = `${id}-error`;

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <Label htmlFor={id}>{label}</Label>
      {children({
        id,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": error ? errorId : undefined,
      })}
      {error ? (
        <p id={errorId} className="text-xs text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}
