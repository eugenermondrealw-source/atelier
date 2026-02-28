import { cn } from "@/lib/utils";
import type { BadgeVariant } from "@/types";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-[var(--color-warm-white)] text-[var(--color-ink-soft)] border border-[var(--color-border)]",
  success: "bg-emerald-50 text-emerald-800 border border-emerald-200",
  warning: "bg-amber-50 text-amber-800 border border-amber-200",
  error: "bg-red-50 text-red-800 border border-red-200",
  info: "bg-blue-50 text-blue-800 border border-blue-200",
  new: "bg-[var(--color-ink)] text-[var(--color-cream)]",
  sale: "bg-[var(--color-accent)] text-white",
};

export function Badge({ variant = "default", children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-xs font-body font-semibold tracking-wider uppercase",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
