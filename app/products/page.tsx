import type { Metadata } from "next";
import { Suspense } from "react";

import { ProductsBrowser } from "@/components/product/ProductsBrowser";
import { ProductCardSkeleton } from "@/components/ui/Feedback";
import { PageBanner } from "@/components/ui/PageBanner";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "All Products",
  description:
    "Browse every Xpectra Media product in one place. Filter men clothing, women clothing, kids clothes, baby clothes and toys by category, product type and price, with Cash on Delivery across Pakistan.",
  path: "/products",
  keywords: [
    "online shopping in Pakistan",
    "men clothing online",
    "women clothing online",
    "kids clothes online",
    "kurta shalwar online",
    "affordable fashion in Pakistan",
  ],
});

export default function ProductsPage() {
  return (
    <>
      <PageBanner
        eyebrow="Full Catalogue"
        title="All Products"
        description="Every piece we stock for men, women and kids, with filters for category, product type and price so you can reach the right item quickly."
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
    <div className="shell grid gap-10 py-12 md:py-16 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-12">
      <div className="hidden h-96 rounded-2xl border border-line-soft bg-surface lg:block" />
      <div className="grid grid-cols-2 gap-5 sm:gap-6 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
