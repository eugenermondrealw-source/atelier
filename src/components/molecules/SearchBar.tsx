"use client";

import { useState, useRef, type FormEvent } from "react";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  onClose?: () => void;
}

export function SearchBar({ placeholder = "Search products…", className, onClose }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/products?search=${encodeURIComponent(query.trim())}`);
      onClose?.();
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "relative flex items-center gap-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-sm px-4",
        "focus-within:border-[var(--color-ink)] transition-colors",
        className
      )}
    >
      <Search size={16} className="text-[var(--color-ink-muted)] shrink-0" />
      <input
        ref={inputRef}
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="flex-1 h-11 bg-transparent font-body text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-muted)] focus:outline-none"
      />
      {query && (
        <button
          type="button"
          onClick={() => { setQuery(""); inputRef.current?.focus(); }}
          className="text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors"
        >
          <X size={14} />
        </button>
      )}
    </form>
  );
}
