import type { Metadata } from "next";
import { Suspense } from "react";

import { ProductsBrowser } from "@/components/product/ProductsBrowser";
import { ProductCardSkeleton, Skeleton } from "@/components/ui/Feedback";
import { PageBanner } from "@/components/ui/PageBanner";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "All Products",
  description:
    "Browse the full Xpectra Media catalog in one place. Filter men's clothing, women's clothing, kids clothing, baby clothing and toys by department, product type, price, size, color and rating, all priced in US dollars.",
  path: "/products",
  keywords: [
    "shop clothing online",
    "men's clothing online",
    "women's clothing online",
    "kids clothing online",
    "baby clothing online",
    "toys online",
    "affordable fashion",
  ],
});

export default function ProductsPage() {
  return (
    <>
      <PageBanner
        eyebrow="Full Catalog"
        title="All Products"
        description="Every piece we stock for men, women, kids, baby and toys, with filters for department, product type, price, size, color and rating so you can reach the right item quickly."
        crumbs={[{ name: "Products", href: "/products" }]}
      />

      {/* The browser reads the URL query, so it renders behind a Suspense
          boundary with a skeleton fallback. */}
      <Suspense fallback={<ProductsSkeleton />}>
        <ProductsBrowser />
      </Suspense>
    </>
  );
}

function ProductsSkeleton() {
  return (
    <div className="shell grid gap-10 py-12 md:py-16 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-12">
      <div className="hidden rounded-3xl border border-line bg-card p-6 shadow-[var(--shadow-soft)] lg:block">
        <div className="space-y-6">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="space-y-3">
              <Skeleton className="h-3 w-28" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          ))}
        </div>
      </div>

      <div>
        <Skeleton className="h-16 w-full rounded-3xl" />
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
