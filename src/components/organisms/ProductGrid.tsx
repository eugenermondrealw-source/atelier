"use client";

import { useState, useMemo } from "react";
import type { Product, ProductCategory } from "@/types";
import { ProductCard } from "@/components/molecules/ProductCard";
import { CategoryPills } from "@/components/molecules/CategoryPills";
import { SortSelect } from "@/components/molecules/SortSelect";
import { cn } from "@/lib/utils";

interface ProductGridProps {
  products: Product[];
  categories: ProductCategory[];
  title?: string;
  showFilters?: boolean;
  initialSearch?: string;
  initialCategory?: string;
  className?: string;
}

type SortOption = "popular" | "newest" | "price-asc" | "price-desc" | "rating";

export function ProductGrid({
  products,
  categories,
  title,
  showFilters = true,
  initialSearch,
  initialCategory,
  className,
}: ProductGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory ?? null);
  const [sort, setSort] = useState<SortOption>("popular");

  const filtered = useMemo(() => {
    let result = selectedCategory
      ? products.filter((p) => p.category.slug === selectedCategory)
      : products;

    // Apply search filter
    if (initialSearch) {
      const q = initialSearch.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.category.name.toLowerCase().includes(q)
      );
    }

    switch (sort) {
      case "newest":
        result = [...result].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
        break;
      case "price-asc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      default:
        result = [...result].sort((a, b) => b.reviewCount - a.reviewCount);
    }

    return result;
  }, [products, selectedCategory, sort, initialSearch]);

  return (
    <section className={cn("flex flex-col gap-8", className)}>
      <div className="flex flex-col gap-4">
        {title && (
          <h2 className="font-display text-3xl font-semibold text-[var(--color-ink)]">{title}</h2>
        )}
        {showFilters && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <CategoryPills
              categories={categories}
              selected={selectedCategory}
              onSelect={setSelectedCategory}
            />
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-sm font-body text-[var(--color-ink-muted)]">
                {filtered.length} product{filtered.length !== 1 ? "s" : ""}
              </span>
              <SortSelect value={sort} onChange={(v) => setSort(v as SortOption)} />
            </div>
          </div>
        )}
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((product, i) => (
            <div
              key={product.id}
              className="animate-fade-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center gap-3">
          <p className="font-display text-xl text-[var(--color-ink)]">No products found</p>
          <p className="font-body text-[var(--color-ink-muted)]">
            {initialSearch ? `No results for "${initialSearch}"` : "Try adjusting your filters"}
          </p>
        </div>
      )}
    </section>
  );
}