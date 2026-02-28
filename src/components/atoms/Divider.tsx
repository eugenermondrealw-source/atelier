import { cn } from "@/lib/utils";

interface DividerProps {
  orientation?: "horizontal" | "vertical";
  label?: string;
  className?: string;
}

export function Divider({ orientation = "horizontal", label, className }: DividerProps) {
  if (orientation === "vertical") {
    return <div className={cn("w-px bg-[var(--color-border)] self-stretch", className)} />;
  }

  if (label) {
    return (
      <div className={cn("flex items-center gap-4", className)}>
        <div className="flex-1 h-px bg-[var(--color-border)]" />
        <span className="text-xs font-body font-medium text-[var(--color-ink-muted)] uppercase tracking-widest">
          {label}
        </span>
        <div className="flex-1 h-px bg-[var(--color-border)]" />
      </div>
    );
  }

  return <div className={cn("h-px w-full bg-[var(--color-border)]", className)} />;
}
