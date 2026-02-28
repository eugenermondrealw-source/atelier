import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { ButtonVariant, ButtonSize } from "@/types";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-ink)] text-[var(--color-cream)] hover:bg-[var(--color-ink-soft)] active:scale-[0.98]",
  secondary:
    "bg-[var(--color-warm-white)] text-[var(--color-ink)] border border-[var(--color-border)] hover:bg-[var(--color-border)] active:scale-[0.98]",
  outline:
    "bg-transparent text-[var(--color-ink)] border border-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-[var(--color-cream)] active:scale-[0.98]",
  ghost:
    "bg-transparent text-[var(--color-ink-soft)] hover:bg-[var(--color-warm-white)] active:scale-[0.98]",
  danger:
    "bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-light)] active:scale-[0.98]",
};

const sizeStyles: Record<ButtonSize, string> = {
  xs: "h-7 px-3 text-xs gap-1.5",
  sm: "h-9 px-4 text-sm gap-2",
  md: "h-11 px-6 text-sm gap-2",
  lg: "h-13 px-8 text-base gap-2.5",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      className,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center rounded-sm font-body font-medium tracking-wide transition-all duration-150 cursor-pointer select-none",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ink)]",
          "disabled:opacity-40 disabled:pointer-events-none",
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {loading ? (
          <span className="inline-block h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
        ) : (
          <>
            {leftIcon && <span className="shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);
Button.displayName = "Button";
