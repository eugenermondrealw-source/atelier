import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/atoms/Button";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-warm-white)] border-b border-[var(--color-border)]">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23b8962e' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="max-w-2xl">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-gold)] mb-6">
            Handcrafted · Limited Editions
          </p>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold text-[var(--color-ink)] leading-[1.05] tracking-tight mb-6">
            Objects made
            <br />
            to be{" "}
            <span className="italic text-[var(--color-accent)]">lived with.</span>
          </h1>
          <p className="font-body text-lg text-[var(--color-ink-soft)] leading-relaxed mb-10 max-w-xl">
            Each piece in our collection is made by hand in small batches — ceramics,
            textiles, glass, and woodwork from independent makers across North America.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/products">
              <Button
                variant="primary"
                size="lg"
                rightIcon={<ArrowRight size={18} />}
              >
                Shop the Collection
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="ghost" size="lg">
                Our Story
              </Button>
            </Link>
          </div>
        </div>

        {/* Decorative stat row */}
        <div className="mt-16 pt-10 border-t border-[var(--color-border)] grid grid-cols-3 gap-8 max-w-lg">
          {[
            { number: "47", label: "Makers" },
            { number: "312", label: "Products" },
            { number: "100%", label: "Handmade" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-3xl font-semibold text-[var(--color-ink)]">{stat.number}</p>
              <p className="font-body text-sm text-[var(--color-ink-muted)] mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
