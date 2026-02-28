"use client";

import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import type { CartItem as CartItemType } from "@/types";
import { Price } from "@/components/atoms/Price";
import { QuantitySelector } from "@/components/atoms/QuantitySelector";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

interface CartItemProps {
  item: CartItemType;
  compact?: boolean;
  className?: string;
}

export function CartItemRow({ item, compact = false, className }: CartItemProps) {
  const { removeItem, updateQuantity } = useCart();
  const image = item.product.images.find((i) => i.isPrimary) ?? item.product.images[0];

  return (
    <div className={cn("flex gap-4 group", className)}>
      {/* Image */}
      <Link
        href={`/products/${item.product.slug}`}
        className="relative shrink-0 rounded overflow-hidden bg-[var(--color-warm-white)] border border-[var(--color-border)]"
        style={{ width: compact ? 72 : 88, height: compact ? 72 : 88 }}
      >
        {image && (
          <Image
            src={image.url}
            alt={image.alt}
            fill
            sizes="88px"
            className="object-cover"
          />
        )}
      </Link>

      {/* Details */}
      <div className="flex-1 min-w-0 flex flex-col gap-1.5">
        <div className="flex items-start justify-between gap-2">
          <Link
            href={`/products/${item.product.slug}`}
            className="font-display font-semibold text-sm text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors leading-tight line-clamp-2"
          >
            {item.product.name}
          </Link>
          <button
            type="button"
            aria-label="Remove item"
            onClick={() => removeItem(item.id)}
            className="shrink-0 p-1 text-[var(--color-ink-muted)] hover:text-[var(--color-accent)] transition-colors"
          >
            <X size={14} />
          </button>
        </div>

        {item.selectedVariants && (
          <div className="flex flex-wrap gap-1">
            {Object.entries(item.selectedVariants).map(([key, value]) => (
              <span
                key={key}
                className="text-xs font-body text-[var(--color-ink-muted)] bg-[var(--color-warm-white)] px-2 py-0.5 rounded-sm border border-[var(--color-border)]"
              >
                {key}: {value}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between gap-2 mt-auto">
          <QuantitySelector
            value={item.quantity}
            onChange={(q) => updateQuantity(item.id, q)}
            size="sm"
          />
          <Price
            price={item.product.price * item.quantity}
            currency={item.product.currency}
            size="sm"
          />
        </div>
      </div>
    </div>
  );
}
