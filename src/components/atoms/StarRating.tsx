import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  reviewCount?: number;
  className?: string;
}

const sizeMap = {
  sm: 12,
  md: 14,
  lg: 18,
};

export function StarRating({
  rating,
  max = 5,
  size = "md",
  showValue = false,
  reviewCount,
  className,
}: StarRatingProps) {
  const px = sizeMap[size];

  return (
    <div className={cn("inline-flex items-center gap-1.5", className)}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: max }).map((_, i) => {
          const filled = rating >= i + 1;
          const partial = !filled && rating > i;
          const fillPct = partial ? (rating - i) * 100 : 0;

          return (
            <span key={i} className="relative inline-block" style={{ width: px, height: px }}>
              {/* Empty star */}
              <Star
                size={px}
                className="text-[var(--color-border-dark)] fill-[var(--color-border)]"
                strokeWidth={1.5}
              />
              {/* Filled overlay */}
              {(filled || partial) && (
                <span
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: filled ? "100%" : `${fillPct}%` }}
                >
                  <Star
                    size={px}
                    className="text-[var(--color-gold)] fill-[var(--color-gold)]"
                    strokeWidth={1.5}
                  />
                </span>
              )}
            </span>
          );
        })}
      </div>
      {showValue && (
        <span className="text-sm font-semibold text-[var(--color-ink)] font-body">{rating.toFixed(1)}</span>
      )}
      {reviewCount !== undefined && (
        <span className="text-sm text-[var(--color-ink-muted)] font-body">({reviewCount})</span>
      )}
    </div>
  );
}
