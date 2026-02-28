"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag } from "lucide-react";
import type { Product } from "@/types";
import { Badge } from "@/components/atoms/Badge";
import { Price } from "@/components/atoms/Price";
import { StarRating } from "@/components/atoms/StarRating";
import { Button } from "@/components/atoms/Button";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
  showQuickAdd?: boolean;
}

export function ProductCard({ product, className, showQuickAdd = true }: ProductCardProps) {
  const { addItem, openCart } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);
  const primaryImage = product.images.find((i) => i.isPrimary) ?? product.images[0];

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    addItem(product);
    openCart();
  }

  function handleWishlist(e: React.MouseEvent) {
    e.preventDefault();
    toggle(product.id);
  }

  return (
    <article
      className={cn(
        "group relative flex flex-col bg-[var(--color-surface)] rounded overflow-hidden",
        "border border-[var(--color-border)] hover:border-[var(--color-border-dark)] shadow-card hover:shadow-elevated transition-all duration-300",
        !product.inStock && "opacity-75",
        className
      )}
    >
      {/* Image */}
      <Link href={`/products/${product.slug}`} className="block relative aspect-[4/3] overflow-hidden bg-[var(--color-warm-white)]">
        {primaryImage && (
          <Image
            src={primaryImage.url}
            alt={primaryImage.alt}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNew && <Badge variant="new">New</Badge>}
          {product.compareAtPrice && <Badge variant="sale">Sale</Badge>}
          {product.isBestSeller && <Badge variant="default">Best Seller</Badge>}
          {!product.inStock && <Badge variant="warning">Sold Out</Badge>}
        </div>

        {/* Wishlist */}
        <button
          type="button"
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          onClick={handleWishlist}
          className={cn(
            "absolute top-3 right-3 p-2 rounded-full transition-all duration-200",
            "bg-[var(--color-surface)]/80 backdrop-blur-sm hover:bg-[var(--color-surface)]",
            "opacity-0 group-hover:opacity-100 focus:opacity-100"
          )}
        >
          <Heart
            size={16}
            className={wishlisted ? "fill-[var(--color-accent)] text-[var(--color-accent)]" : "text-[var(--color-ink-muted)]"}
          />
        </button>

        {/* Quick Add */}
        {showQuickAdd && product.inStock && (
          <div className="absolute inset-x-3 bottom-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <Button
              variant="primary"
              size="sm"
              fullWidth
              leftIcon={<ShoppingBag size={14} />}
              onClick={handleAddToCart}
              className="shadow-float"
            >
              Quick Add
            </Button>
          </div>
        )}
      </Link>

      {/* Info */}
      <div className="flex flex-col gap-2 p-4">
        <Link href={`/products/${product.slug}`} className="group/link">
          <p className="text-xs font-body font-medium text-[var(--color-ink-muted)] uppercase tracking-widest mb-1">
            {product.category.name}
          </p>
          <h3 className="font-display font-semibold text-[var(--color-ink)] leading-tight group-hover/link:text-[var(--color-accent)] transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center justify-between">
          <Price price={product.price} compareAtPrice={product.compareAtPrice} size="md" showDiscount />
          <StarRating rating={product.rating} reviewCount={product.reviewCount} size="sm" />
        </div>
      </div>
    </article>
  );
}
