import { CheckCircle2 } from "lucide-react";
import type { Review } from "@/types";
import { StarRating } from "@/components/atoms/StarRating";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface ReviewCardProps {
  review: Review;
  className?: string;
}

export function ReviewCard({ review, className }: ReviewCardProps) {
  return (
    <div className={cn("flex flex-col gap-3 p-5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded", className)}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-[var(--color-warm-white)] border border-[var(--color-border)] flex items-center justify-center">
            <span className="font-display font-semibold text-sm text-[var(--color-ink-soft)]">
              {review.userName.charAt(0)}
            </span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-body font-semibold text-sm text-[var(--color-ink)]">{review.userName}</span>
              {review.verified && (
                <span className="flex items-center gap-0.5 text-xs text-emerald-700 font-body">
                  <CheckCircle2 size={11} />
                  Verified
                </span>
              )}
            </div>
            <span className="text-xs font-body text-[var(--color-ink-muted)]">{formatDate(review.createdAt)}</span>
          </div>
        </div>
        <StarRating rating={review.rating} size="sm" />
      </div>

      <div>
        <h4 className="font-display font-semibold text-sm text-[var(--color-ink)] mb-1">{review.title}</h4>
        <p className="text-sm font-body text-[var(--color-ink-soft)] leading-relaxed">{review.body}</p>
      </div>

      {review.helpful > 0 && (
        <p className="text-xs font-body text-[var(--color-ink-muted)]">
          {review.helpful} {review.helpful === 1 ? "person" : "people"} found this helpful
        </p>
      )}
    </div>
  );
}
