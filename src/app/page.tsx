"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/organisms/Hero";
import { ProductCard } from "@/components/molecules/ProductCard";
import { Button } from "@/components/atoms/Button";
import { products, categories } from "@/lib/data";

export default function HomePage() {
  const featured = products.filter((p) => p.isFeatured);
  const newArrivals = products.filter((p) => p.isNew);

  return (
    <>
      <Hero />

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="font-body text-xs font-semibold uppercase tracking-widest text-[var(--color-gold)] mb-2">
              Hand-picked
            </p>
            <h2 className="font-display text-3xl font-semibold text-[var(--color-ink)]">
              Featured Pieces
            </h2>
          </div>
          <Link href="/products">
            <Button variant="ghost" size="sm" rightIcon={<ArrowRight size={14} />}>
              View All
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Category Banner */}
      <section className="bg-[var(--color-warm-white)] border-y border-[var(--color-border)] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-semibold text-[var(--color-ink)] mb-8 text-center">
            Shop by Craft
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/products?category=${cat.slug}`}
                className="group px-6 py-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-full font-body font-medium text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] hover:border-[var(--color-ink)] hover:shadow-card transition-all duration-200"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="font-body text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)] mb-2">
                Just arrived
              </p>
              <h2 className="font-display text-3xl font-semibold text-[var(--color-ink)]">
                New Arrivals
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="bg-[var(--color-ink)] py-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <p className="font-body text-xs font-semibold uppercase tracking-widest text-[var(--color-gold)] mb-4">
            Stay connected
          </p>
          <h2 className="font-display text-4xl font-semibold text-[var(--color-cream)] mb-4">
            Stories from the studio
          </h2>
          <p className="font-body text-[var(--color-cream)]/70 leading-relaxed mb-8">
            Maker spotlights, new arrivals, and care tips — delivered occasionally, never spammy.
          </p>
          <form
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 h-12 px-4 rounded-sm bg-[var(--color-cream)]/10 border border-[var(--color-cream)]/20 text-[var(--color-cream)] placeholder:text-[var(--color-cream)]/40 font-body focus:outline-none focus:border-[var(--color-cream)]/50 transition-colors"
            />
            <Button variant="danger" size="md">
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}
