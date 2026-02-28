import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProductDetail } from "@/components/organisms/ProductDetail";
import { ProductCard } from "@/components/molecules/ProductCard";
import { ReviewCard } from "@/components/molecules/ReviewCard";
import { Divider } from "@/components/atoms/Divider";
import { products, reviews } from "@/lib/data";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      images: product.images[0] ? [product.images[0].url] : [],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const productReviews = reviews.filter((r) => r.productId === product.id);
  const related = products
    .filter((p) => p.category.id === product.category.id && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-body text-[var(--color-ink-muted)] mb-10">
        <a href="/" className="hover:text-[var(--color-ink)] transition-colors">Home</a>
        <span>/</span>
        <a href="/products" className="hover:text-[var(--color-ink)] transition-colors">Products</a>
        <span>/</span>
        <a href={`/products?category=${product.category.slug}`} className="hover:text-[var(--color-ink)] transition-colors">{product.category.name}</a>
        <span>/</span>
        <span className="text-[var(--color-ink)]">{product.name}</span>
      </nav>

      {/* Product detail */}
      <ProductDetail product={product} />

      {/* Reviews */}
      {productReviews.length > 0 && (
        <>
          <Divider className="my-16" />
          <section>
            <h2 className="font-display text-2xl font-semibold text-[var(--color-ink)] mb-6">
              Customer Reviews
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {productReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </section>
        </>
      )}

      {/* Related */}
      {related.length > 0 && (
        <>
          <Divider className="my-16" />
          <section>
            <h2 className="font-display text-2xl font-semibold text-[var(--color-ink)] mb-6">
              More from {product.category.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
