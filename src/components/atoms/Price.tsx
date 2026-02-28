import { cn } from "@/lib/utils";
import { formatCurrency, calculateDiscount } from "@/lib/utils";

interface PriceProps {
  price: number;
  compareAtPrice?: number;
  currency?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showDiscount?: boolean;
  className?: string;
}

const sizeMap = {
  sm: { price: "text-sm", compare: "text-xs" },
  md: { price: "text-base", compare: "text-sm" },
  lg: { price: "text-xl", compare: "text-base" },
  xl: { price: "text-3xl", compare: "text-xl" },
};

export function Price({
  price,
  compareAtPrice,
  currency = "USD",
  size = "md",
  showDiscount = false,
  className,
}: PriceProps) {
  const isOnSale = compareAtPrice && compareAtPrice > price;
  const discount = isOnSale ? calculateDiscount(price, compareAtPrice) : 0;
  const styles = sizeMap[size];

  return (
    <div className={cn("inline-flex items-baseline gap-2 flex-wrap", className)}>
      <span
        className={cn(
          "font-display font-semibold",
          isOnSale ? "text-[var(--color-accent)]" : "text-[var(--color-ink)]",
          styles.price
        )}
      >
        {formatCurrency(price, currency)}
      </span>
      {isOnSale && (
        <span className={cn("font-body text-[var(--color-ink-muted)] line-through", styles.compare)}>
          {formatCurrency(compareAtPrice, currency)}
        </span>
      )}
      {isOnSale && showDiscount && (
        <span className="text-xs font-semibold font-body text-[var(--color-accent)] bg-[var(--color-accent-pale)] px-1.5 py-0.5 rounded-sm">
          -{discount}%
        </span>
      )}
    </div>
  );
}
