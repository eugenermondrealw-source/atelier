"use client";

import { useSearchParams } from "next/navigation";
import { ProductGrid } from "@/components/organisms/ProductGrid";
import { products, categories } from "@/lib/data";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") ?? undefined;
  const category = searchParams.get("category") ?? undefined;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <p className="font-body text-xs font-semibold uppercase tracking-widest text-[var(--color-gold)] mb-2">
          The Collection
        </p>
        <h1 className="font-display text-4xl font-semibold text-[var(--color-ink)]">
          {search ? `Results for "${search}"` : "All Products"}
        </h1>
      </div>
      <ProductGrid
        products={products}
        categories={categories}
        showFilters
        initialSearch={search}
        initialCategory={category}
      />
    </div>
  );
}