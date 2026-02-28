import Link from "next/link";
import { Button } from "@/components/atoms/Button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <p className="font-body text-xs font-semibold uppercase tracking-widest text-[var(--color-gold)] mb-4">
        404
      </p>
      <h1 className="font-display text-5xl font-semibold text-[var(--color-ink)] mb-4">
        Page not found
      </h1>
      <p className="font-body text-[var(--color-ink-muted)] text-lg mb-10 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="flex gap-4">
        <Link href="/">
          <Button variant="primary">Go Home</Button>
        </Link>
        <Link href="/products">
          <Button variant="outline">Browse Products</Button>
        </Link>
      </div>
    </div>
  );
}
