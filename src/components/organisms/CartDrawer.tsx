"use client";

import { X, ShoppingBag, Truck } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { CartItemRow } from "@/components/molecules/CartItemRow";
import { Button } from "@/components/atoms/Button";
import { Divider } from "@/components/atoms/Divider";
import { formatCurrency } from "@/lib/utils";

const FREE_SHIPPING_THRESHOLD = 150;

export function CartDrawer() {
  const { cart, isOpen, closeCart } = useCart();
  const remaining = FREE_SHIPPING_THRESHOLD - cart.subtotal;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-[var(--color-ink)]/30 backdrop-blur-sm z-40 animate-fade-in"
          onClick={closeCart}
          aria-hidden
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-[var(--color-surface)] shadow-float z-50 flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-[var(--color-ink)]" />
            <h2 className="font-display font-semibold text-lg text-[var(--color-ink)]">
              Cart
              {cart.itemCount > 0 && (
                <span className="ml-2 text-sm font-body font-normal text-[var(--color-ink-muted)]">
                  ({cart.itemCount} {cart.itemCount === 1 ? "item" : "items"})
                </span>
              )}
            </h2>
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="p-2 text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free shipping progress */}
        {cart.subtotal > 0 && (
          <div className="px-6 py-3 bg-[var(--color-warm-white)] border-b border-[var(--color-border)]">
            {remaining > 0 ? (
              <>
                <p className="text-xs font-body text-[var(--color-ink-soft)] mb-1.5 flex items-center gap-1.5">
                  <Truck size={12} />
                  Add <strong className="text-[var(--color-ink)]">{formatCurrency(remaining)}</strong> more for free shipping
                </p>
                <div className="h-1.5 rounded-full bg-[var(--color-border)]">
                  <div
                    className="h-full rounded-full bg-[var(--color-gold)] transition-all duration-500"
                    style={{ width: `${Math.min(100, (cart.subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%` }}
                  />
                </div>
              </>
            ) : (
              <p className="text-xs font-body text-emerald-700 flex items-center gap-1.5">
                <Truck size={12} />
                🎉 You qualify for free shipping!
              </p>
            )}
          </div>
        )}

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cart.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <ShoppingBag size={48} className="text-[var(--color-border)]" strokeWidth={1} />
              <div>
                <p className="font-display font-semibold text-[var(--color-ink)]">Your cart is empty</p>
                <p className="text-sm font-body text-[var(--color-ink-muted)] mt-1">Discover our handcrafted collection</p>
              </div>
              <Button variant="outline" size="sm" onClick={closeCart}>
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              {cart.items.map((item) => (
                <CartItemRow key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.items.length > 0 && (
          <div className="px-6 py-5 border-t border-[var(--color-border)] bg-[var(--color-warm-white)]">
            <div className="flex flex-col gap-2 mb-4">
              <div className="flex justify-between text-sm font-body text-[var(--color-ink-soft)]">
                <span>Subtotal</span>
                <span>{formatCurrency(cart.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm font-body text-[var(--color-ink-soft)]">
                <span>Shipping</span>
                <span>{cart.shipping === 0 ? "Free" : formatCurrency(cart.shipping)}</span>
              </div>
              <div className="flex justify-between text-sm font-body text-[var(--color-ink-soft)]">
                <span>Est. Tax</span>
                <span>{formatCurrency(cart.tax)}</span>
              </div>
              <Divider className="my-1" />
              <div className="flex justify-between font-display font-semibold text-lg text-[var(--color-ink)]">
                <span>Total</span>
                <span>{formatCurrency(cart.total)}</span>
              </div>
            </div>

            <Link href="/checkout" onClick={closeCart}>
              <Button variant="primary" size="lg" fullWidth>
                Proceed to Checkout
              </Button>
            </Link>
            <button
              type="button"
              onClick={closeCart}
              className="w-full mt-2 text-sm font-body text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors py-2"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
