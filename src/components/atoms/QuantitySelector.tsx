"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuantitySelectorProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  size?: "sm" | "md";
  className?: string;
}

export function QuantitySelector({
  value,
  min = 1,
  max = 99,
  onChange,
  size = "md",
  className,
}: QuantitySelectorProps) {
  const btnSize = size === "sm" ? "h-8 w-8" : "h-10 w-10";
  const iconSize = size === "sm" ? 14 : 16;
  const inputW = size === "sm" ? "w-10 h-8 text-sm" : "w-12 h-10";

  return (
    <div
      className={cn(
        "inline-flex items-center border border-[var(--color-border)] rounded-sm bg-[var(--color-surface)]",
        className
      )}
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
        className={cn(
          btnSize,
          "flex items-center justify-center transition-colors",
          "text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] hover:bg-[var(--color-warm-white)]",
          "disabled:opacity-30 disabled:pointer-events-none rounded-l-sm"
        )}
      >
        <Minus size={iconSize} />
      </button>

      <input
        type="number"
        value={value}
        min={min}
        max={max}
        onChange={(e) => {
          const n = parseInt(e.target.value, 10);
          if (!isNaN(n)) onChange(Math.min(max, Math.max(min, n)));
        }}
        className={cn(
          inputW,
          "text-center font-body font-medium text-[var(--color-ink)] bg-transparent border-x border-[var(--color-border)]",
          "focus:outline-none"
        )}
      />

      <button
        type="button"
        aria-label="Increase quantity"
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
        className={cn(
          btnSize,
          "flex items-center justify-center transition-colors",
          "text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] hover:bg-[var(--color-warm-white)]",
          "disabled:opacity-30 disabled:pointer-events-none rounded-r-sm"
        )}
      >
        <Plus size={iconSize} />
      </button>
    </div>
  );
}
