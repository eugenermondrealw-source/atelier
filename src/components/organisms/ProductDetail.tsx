"use client";

import { useState } from "react";
import Image from "next/image";
import { ShoppingBag, Heart, Share2, Truck, RotateCcw, Shield } from "lucide-react";
import type { Product } from "@/types";
import { Button } from "@/components/atoms/Button";
import { Badge } from "@/components/atoms/Badge";
import { Price } from "@/components/atoms/Price";
import { StarRating } from "@/components/atoms/StarRating";
import { QuantitySelector } from "@/components/atoms/QuantitySelector";
import { Divider } from "@/components/atoms/Divider";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { cn } from "@/lib/utils";

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const { addItem, openCart } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const [selectedImage, setSelectedImage] = useState(
    product.images.find((i) => i.isPrimary) ?? product.images[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [adding, setAdding] = useState(false);

  const wishlisted = isWishlisted(product.id);

  async function handleAddToCart() {
    setAdding(true);
    addItem(product, quantity, selectedVariants);
    await new Promise((r) => setTimeout(r, 600));
    setAdding(false);
    openCart();
  }

  const features = [
    { icon: Truck, text: "Free shipping over $150" },
    { icon: RotateCcw, text: "30-day returns" },
    { icon: Shield, text: "Secure checkout" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
      {/* Images */}
      <div className="flex flex-col gap-3">
        <div className="relative aspect-square rounded overflow-hidden bg-[var(--color-warm-white)] border border-[var(--color-border)]">
          <Image
            src={selectedImage.url}
            alt={selectedImage.alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            priority
          />
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.isNew && <Badge variant="new">New</Badge>}
            {product.compareAtPrice && <Badge variant="sale">Sale</Badge>}
            {!product.inStock && <Badge variant="warning">Sold Out</Badge>}
          </div>
        </div>

        {product.images.length > 1 && (
          <div className="flex gap-2">
            {product.images.map((img) => (
              <button
                key={img.id}
                type="button"
                onClick={() => setSelectedImage(img)}
                className={cn(
                  "relative h-20 w-20 rounded overflow-hidden border-2 transition-colors",
                  selectedImage.id === img.id
                    ? "border-[var(--color-ink)]"
                    : "border-[var(--color-border)] hover:border-[var(--color-border-dark)]"
                )}
              >
                <Image src={img.url} alt={img.alt} fill sizes="80px" className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-6">
        <div>
          <p className="font-body text-xs font-semibold uppercase tracking-widest text-[var(--color-ink-muted)] mb-2">
            {product.category.name}
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[var(--color-ink)] mb-3">
            {product.name}
          </h1>
          <div className="flex items-center gap-4 flex-wrap">
            <StarRating
              rating={product.rating}
              reviewCount={product.reviewCount}
              showValue
              size="md"
            />
            <span className="font-body text-sm text-[var(--color-ink-muted)]">SKU: {product.sku}</span>
          </div>
        </div>

        <Price
          price={product.price}
          compareAtPrice={product.compareAtPrice}
          size="xl"
          showDiscount
        />

        <Divider />

        <p className="font-body text-[var(--color-ink-soft)] leading-relaxed">
          {product.description}
        </p>

        {/* Variants */}
        {product.variants?.map((variantGroup) => (
          <div key={variantGroup.label}>
            <p className="font-body text-sm font-semibold text-[var(--color-ink)] mb-3">
              {variantGroup.label}
              {selectedVariants[variantGroup.label] && (
                <span className="ml-2 font-normal text-[var(--color-ink-muted)]">
                  — {selectedVariants[variantGroup.label]}
                </span>
              )}
            </p>
            <div className="flex flex-wrap gap-2">
              {variantGroup.options.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  disabled={!opt.inStock}
                  onClick={() => setSelectedVariants((prev) => ({ ...prev, [variantGroup.label]: opt.value }))}
                  className={cn(
                    "px-4 py-2 text-sm font-body rounded-sm border transition-all",
                    !opt.inStock && "opacity-40 line-through cursor-not-allowed",
                    selectedVariants[variantGroup.label] === opt.value
                      ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-cream)]"
                      : "border-[var(--color-border)] text-[var(--color-ink)] hover:border-[var(--color-ink)]"
                  )}
                >
                  {opt.value}
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Quantity + Add to cart */}
        <div className="flex items-center gap-3 flex-wrap">
          <QuantitySelector
            value={quantity}
            onChange={setQuantity}
            max={product.stockCount ?? 99}
          />
          <Button
            variant="primary"
            size="lg"
            fullWidth={false}
            className="flex-1 min-w-[180px]"
            leftIcon={<ShoppingBag size={18} />}
            disabled={!product.inStock}
            loading={adding}
            onClick={handleAddToCart}
          >
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </Button>
          <button
            type="button"
            aria-label={wishlisted ? "Remove from wishlist" : "Save to wishlist"}
            onClick={() => toggle(product.id)}
            className={cn(
              "p-3 border rounded-sm transition-all",
              wishlisted
                ? "border-[var(--color-accent)] bg-[var(--color-accent-pale)] text-[var(--color-accent)]"
                : "border-[var(--color-border)] text-[var(--color-ink-muted)] hover:border-[var(--color-ink-muted)]"
            )}
          >
            <Heart size={20} className={wishlisted ? "fill-current" : ""} />
          </button>
          <button
            type="button"
            aria-label="Share"
            className="p-3 border border-[var(--color-border)] rounded-sm text-[var(--color-ink-muted)] hover:border-[var(--color-ink-muted)] transition-all"
          >
            <Share2 size={20} />
          </button>
        </div>

        {product.stockCount && product.stockCount < 10 && product.inStock && (
          <p className="text-sm font-body text-[var(--color-accent)] font-medium">
            Only {product.stockCount} left in stock
          </p>
        )}

        <Divider />

        {/* Features */}
        <div className="grid grid-cols-3 gap-4">
          {features.map(({ icon: Icon, text }) => (
            <div key={text} className="flex flex-col items-center gap-2 text-center">
              <Icon size={20} className="text-[var(--color-ink-muted)]" />
              <p className="text-xs font-body text-[var(--color-ink-muted)]">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
