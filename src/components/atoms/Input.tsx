import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { InputSize } from "@/types";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  inputSize?: InputSize;
  leftAddon?: ReactNode;
  rightAddon?: ReactNode;
}

const sizeStyles: Record<InputSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-sm",
  lg: "h-13 px-5 text-base",
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, inputSize = "md", leftAddon, rightAddon, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-[var(--color-ink-soft)] font-body">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftAddon && (
            <div className="absolute left-3 text-[var(--color-ink-muted)] pointer-events-none">{leftAddon}</div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "w-full bg-[var(--color-surface)] border rounded-sm font-body text-[var(--color-ink)] placeholder:text-[var(--color-ink-muted)]",
              "transition-colors duration-150",
              "focus:outline-none focus:ring-2 focus:ring-[var(--color-ink)] focus:ring-offset-0",
              error
                ? "border-[var(--color-accent)] focus:ring-[var(--color-accent)]"
                : "border-[var(--color-border)] hover:border-[var(--color-border-dark)]",
              leftAddon && "pl-10",
              rightAddon && "pr-10",
              sizeStyles[inputSize],
              className
            )}
            {...props}
          />
          {rightAddon && (
            <div className="absolute right-3 text-[var(--color-ink-muted)]">{rightAddon}</div>
          )}
        </div>
        {error && <p className="text-xs text-[var(--color-accent)] font-body">{error}</p>}
        {hint && !error && <p className="text-xs text-[var(--color-ink-muted)] font-body">{hint}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";
