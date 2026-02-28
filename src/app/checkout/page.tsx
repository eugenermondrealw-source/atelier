"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Lock } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { CartItemRow } from "@/components/molecules/CartItemRow";
import { Input } from "@/components/atoms/Input";
import { Button } from "@/components/atoms/Button";
import { Divider } from "@/components/atoms/Divider";
import { Price } from "@/components/atoms/Price";
import { formatCurrency } from "@/lib/utils";

type Step = "information" | "shipping" | "payment";

export default function CheckoutPage() {
  const { cart } = useCart();
  const [step, setStep] = useState<Step>("information");

  if (cart.items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <h1 className="font-display text-3xl font-semibold text-[var(--color-ink)] mb-4">
          Your cart is empty
        </h1>
        <p className="font-body text-[var(--color-ink-muted)] mb-8">
          Add some items before checking out.
        </p>
        <Link href="/products">
          <Button variant="primary">Browse Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Logo + back */}
      <div className="flex items-center justify-between mb-10">
        <Link href="/" className="font-display font-bold text-2xl text-[var(--color-ink)]">
          Atelier<span className="text-[var(--color-accent)]">.</span>
        </Link>
        <Link
          href="/products"
          className="flex items-center gap-2 text-sm font-body text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors"
        >
          <ArrowLeft size={14} />
          Continue shopping
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Left: form */}
        <div className="lg:col-span-3">
          {/* Steps indicator */}
          <div className="flex items-center gap-3 mb-8 text-sm font-body">
            {(["information", "shipping", "payment"] as Step[]).map((s, i) => (
              <div key={s} className="flex items-center gap-3">
                {i > 0 && <span className="text-[var(--color-border-dark)]">/</span>}
                <button
                  type="button"
                  onClick={() => i < ["information", "shipping", "payment"].indexOf(step) + 1 && setStep(s)}
                  className={
                    step === s
                      ? "font-semibold text-[var(--color-ink)] capitalize"
                      : "text-[var(--color-ink-muted)] capitalize hover:text-[var(--color-ink-soft)]"
                  }
                >
                  {s}
                </button>
              </div>
            ))}
          </div>

          {step === "information" && (
            <form
              onSubmit={(e) => { e.preventDefault(); setStep("shipping"); }}
              className="flex flex-col gap-5"
            >
              <h2 className="font-display text-xl font-semibold text-[var(--color-ink)]">
                Contact information
              </h2>
              <Input label="Email" type="email" placeholder="you@example.com" required inputSize="md" />
              <Input label="Phone" type="tel" placeholder="+1 (555) 000-0000" inputSize="md" />

              <Divider />

              <h2 className="font-display text-xl font-semibold text-[var(--color-ink)]">
                Shipping address
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <Input label="First name" required />
                <Input label="Last name" required />
              </div>
              <Input label="Address" required />
              <Input label="Apartment, suite, etc." />
              <div className="grid grid-cols-3 gap-4">
                <Input label="City" required className="col-span-1" />
                <Input label="State" required className="col-span-1" />
                <Input label="ZIP code" required className="col-span-1" />
              </div>
              <Button type="submit" variant="primary" size="lg">
                Continue to Shipping
              </Button>
            </form>
          )}

          {step === "shipping" && (
            <form
              onSubmit={(e) => { e.preventDefault(); setStep("payment"); }}
              className="flex flex-col gap-5"
            >
              <h2 className="font-display text-xl font-semibold text-[var(--color-ink)]">
                Shipping method
              </h2>
              {[
                { id: "standard", label: "Standard Shipping", time: "5–8 business days", price: cart.subtotal >= 150 ? "Free" : "$12" },
                { id: "express", label: "Express Shipping", time: "2–3 business days", price: "$24" },
                { id: "overnight", label: "Overnight", time: "Next business day", price: "$45" },
              ].map((method) => (
                <label
                  key={method.id}
                  className="flex items-center justify-between p-4 border border-[var(--color-border)] rounded cursor-pointer hover:border-[var(--color-ink)] transition-colors has-[:checked]:border-[var(--color-ink)] has-[:checked]:bg-[var(--color-warm-white)]"
                >
                  <div className="flex items-center gap-3">
                    <input type="radio" name="shipping" value={method.id} defaultChecked={method.id === "standard"} className="accent-[var(--color-ink)]" />
                    <div>
                      <p className="font-body font-medium text-sm text-[var(--color-ink)]">{method.label}</p>
                      <p className="font-body text-xs text-[var(--color-ink-muted)]">{method.time}</p>
                    </div>
                  </div>
                  <span className="font-body font-semibold text-sm text-[var(--color-ink)]">{method.price}</span>
                </label>
              ))}
              <div className="flex gap-3">
                <Button type="button" variant="ghost" onClick={() => setStep("information")}>Back</Button>
                <Button type="submit" variant="primary" size="lg" className="flex-1">Continue to Payment</Button>
              </div>
            </form>
          )}

          {step === "payment" && (
            <form
              onSubmit={(e) => { e.preventDefault(); alert("Order placed! (demo)"); }}
              className="flex flex-col gap-5"
            >
              <h2 className="font-display text-xl font-semibold text-[var(--color-ink)]">
                Payment
              </h2>
              <div className="p-4 border border-[var(--color-border)] rounded bg-[var(--color-warm-white)] flex items-center gap-2">
                <Lock size={14} className="text-emerald-600" />
                <span className="text-xs font-body text-emerald-700">All transactions are secured and encrypted</span>
              </div>
              <Input label="Card number" placeholder="1234 5678 9012 3456" required />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Expiry date" placeholder="MM / YY" required />
                <Input label="CVC" placeholder="123" required />
              </div>
              <Input label="Name on card" required />
              <div className="flex gap-3">
                <Button type="button" variant="ghost" onClick={() => setStep("shipping")}>Back</Button>
                <Button type="submit" variant="primary" size="lg" className="flex-1" leftIcon={<Lock size={14} />}>
                  Pay {formatCurrency(cart.total)}
                </Button>
              </div>
            </form>
          )}
        </div>

        {/* Right: order summary */}
        <div className="lg:col-span-2">
          <div className="bg-[var(--color-warm-white)] border border-[var(--color-border)] rounded p-6 sticky top-24">
            <h3 className="font-display font-semibold text-lg text-[var(--color-ink)] mb-5">
              Order Summary
            </h3>
            <div className="flex flex-col gap-4 mb-5">
              {cart.items.map((item) => (
                <CartItemRow key={item.id} item={item} compact />
              ))}
            </div>
            <Divider className="mb-4" />

            <div className="flex flex-col gap-2 mb-4 text-sm font-body">
              <div className="flex justify-between text-[var(--color-ink-soft)]">
                <span>Subtotal</span>
                <span>{formatCurrency(cart.subtotal)}</span>
              </div>
              <div className="flex justify-between text-[var(--color-ink-soft)]">
                <span>Shipping</span>
                <span>{cart.shipping === 0 ? "Free" : formatCurrency(cart.shipping)}</span>
              </div>
              <div className="flex justify-between text-[var(--color-ink-soft)]">
                <span>Tax</span>
                <span>{formatCurrency(cart.tax)}</span>
              </div>
            </div>

            <Divider className="mb-4" />
            <div className="flex justify-between font-display font-semibold text-xl text-[var(--color-ink)]">
              <span>Total</span>
              <Price price={cart.total} size="lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
