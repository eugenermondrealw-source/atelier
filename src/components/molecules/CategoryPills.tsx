"use client";

import { cn } from "@/lib/utils";
import type { ProductCategory } from "@/types";

interface CategoryPillsProps {
  categories: ProductCategory[];
  selected?: string | null; // category slug
  onSelect: (slug: string | null) => void;
  className?: string;
}

export function CategoryPills({ categories, selected, onSelect, className }: CategoryPillsProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      <button
        type="button"
        onClick={() => onSelect(null)}
        className={cn(
          "px-4 py-2 rounded-full text-sm font-body font-medium transition-all duration-150 border",
          selected === null
            ? "bg-[var(--color-ink)] text-[var(--color-cream)] border-[var(--color-ink)]"
            : "bg-transparent text-[var(--color-ink-soft)] border-[var(--color-border)] hover:border-[var(--color-border-dark)] hover:bg-[var(--color-warm-white)]"
        )}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          type="button"
          onClick={() => onSelect(cat.slug)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-body font-medium transition-all duration-150 border",
            selected === cat.slug
              ? "bg-[var(--color-ink)] text-[var(--color-cream)] border-[var(--color-ink)]"
              : "bg-transparent text-[var(--color-ink-soft)] border-[var(--color-border)] hover:border-[var(--color-border-dark)] hover:bg-[var(--color-warm-white)]"
          )}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
