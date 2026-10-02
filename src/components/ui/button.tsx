import Link from "next/link";
import { type ComponentProps } from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type ButtonStyleProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary font-semibold text-primary-foreground hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-[0_0_0_4px_rgb(56_189_248/0.18),0_14px_40px_-12px_rgb(56_189_248/0.7)]",
  secondary:
    "border border-white/15 bg-white/5 text-foreground backdrop-blur hover:-translate-y-0.5 hover:bg-white/10",
  ghost: "text-muted-foreground hover:bg-white/5 hover:text-foreground",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

/** Shared button styling so links and buttons can look identical. */
export function buttonVariants({
  variant = "primary",
  size = "md",
}: ButtonStyleProps = {}): string {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-all duration-200 disabled:pointer-events-none disabled:opacity-50",
    variantClasses[variant],
    sizeClasses[size],
  );
}

export function Button({
  className,
  variant,
  size,
  type = "button",
  ...props
}: ComponentProps<"button"> & ButtonStyleProps) {
  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export function ButtonLink({
  className,
  variant,
  size,
  ...props
}: ComponentProps<typeof Link> & ButtonStyleProps) {
  return (
    <Link
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
