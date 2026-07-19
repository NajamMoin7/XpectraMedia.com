"use client";

import { ProductCard } from "@/components/product/ProductCard";
import { Reveal } from "@/components/ui/Reveal";
import type { Product, ViewMode } from "@/lib/types";

interface ProductGridProps {
  products: Product[];
  view?: ViewMode;
  /** Number of columns at the largest breakpoint. */
  columns?: 3 | 4;
  /** Disables the stagger reveal where content is already animated. */
  plain?: boolean;
}

/** Responsive product listing with a staggered reveal as cards scroll in. */
export function ProductGrid({
  products,
  view = "grid",
  columns = 4,
  plain = false,
}: ProductGridProps) {
  const layout =
    view === "list"
      ? "grid-cols-1"
      : columns === 3
        ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

  return (
    <div className={`grid gap-5 sm:gap-6 ${layout}`}>
      {products.map((product, index) =>
        plain ? (
          <ProductCard
            key={product.id}
            product={product}
            view={view}
            priority={index < 4}
          />
        ) : (
          <Reveal key={product.id} delay={Math.min(index, 7) * 70} className="h-full">
            <ProductCard product={product} view={view} priority={index < 4} />
          </Reveal>
        ),
      )}
    </div>
  );
}
