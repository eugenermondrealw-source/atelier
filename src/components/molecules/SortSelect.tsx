"use client";

import { cn } from "@/lib/utils";

interface SortSelectProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const options = [
  { value: "popular", label: "Most Popular" },
  { value: "newest", label: "Newest" },
  { value: "rating", label: "Top Rated" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

export function SortSelect({ value, onChange, className }: SortSelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={cn(
        "h-9 pl-3 pr-8 text-sm font-body text-[var(--color-ink)] bg-[var(--color-surface)]",
        "border border-[var(--color-border)] rounded-sm cursor-pointer",
        "focus:outline-none focus:ring-2 focus:ring-[var(--color-ink)] transition-colors",
        "hover:border-[var(--color-border-dark)]",
        className
      )}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
