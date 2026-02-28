"use client";

import Link from "next/link";
import { ShoppingBag, Menu, X, Search } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { SearchBar } from "@/components/molecules/SearchBar";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Shop", href: "/products" },
  { label: "Collections", href: "/collections" },
  { label: "About", href: "/about" },
];

export function Header() {
  const { cart, toggleCart } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[var(--color-cream)]/95 backdrop-blur-md border-b border-[var(--color-border)]">
      {/* Announcement bar */}
      <div className="bg-[var(--color-ink)] text-[var(--color-cream)] text-xs font-body text-center py-2 tracking-widest uppercase">
        Free shipping on orders over $150 · Made by hand, shipped with care
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2 text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
            onClick={() => setMobileOpen((p) => !p)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Logo */}
          <Link href="/" className="font-display font-bold text-xl text-[var(--color-ink)] tracking-tight shrink-0">
            Atelier<span className="text-[var(--color-accent)]">.</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body text-sm font-medium text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {searchOpen ? (
              <SearchBar
                className="w-72 hidden sm:flex"
                onClose={() => setSearchOpen(false)}
              />
            ) : (
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="p-2 text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition-colors"
                aria-label="Open search"
              >
                <Search size={20} />
              </button>
            )}

            <button
              type="button"
              onClick={toggleCart}
              className="relative p-2 text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition-colors"
              aria-label="Open cart"
            >
              <ShoppingBag size={20} />
              {cart.itemCount > 0 && (
                <span className="absolute top-0 right-0 h-5 w-5 rounded-full bg-[var(--color-accent)] text-white text-xs font-bold font-body flex items-center justify-center translate-x-1/4 -translate-y-1/4">
                  {cart.itemCount > 9 ? "9+" : cart.itemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile search */}
        {searchOpen && (
          <div className="sm:hidden pb-3">
            <SearchBar onClose={() => setSearchOpen(false)} />
          </div>
        )}
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-[var(--color-border)] bg-[var(--color-surface)]">
          <nav className="flex flex-col px-4 py-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-3 font-body font-medium text-[var(--color-ink)] border-b border-[var(--color-border)] last:border-0"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
