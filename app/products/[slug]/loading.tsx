import {
  ProductDetailsSkeleton,
  ProductGridSkeleton,
  Skeleton,
} from "@/components/ui/Feedback";

/** Skeleton shown while an individual product page loads. */
export default function ProductDetailsLoading() {
  return (
    <div role="status" className="bg-canvas">
      <span className="sr-only">Loading product</span>

      {/* Breadcrumb strip */}
      <div className="border-b border-line bg-mist">
        <div className="shell py-5" aria-hidden="true">
          <Skeleton className="h-3 w-64 max-w-full rounded-full" />
        </div>
      </div>

      {/* Gallery and purchase panel */}
      <ProductDetailsSkeleton />

      {/* Description, highlights, material and care */}
      <div className="border-y border-line bg-mist py-14 md:py-20">
        <div
          className="shell grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-14"
          aria-hidden="true"
        >
          <div>
            <Skeleton className="h-8 w-56" />
            <Skeleton className="mt-5 h-4 w-full" />
            <Skeleton className="mt-2 h-4 w-full" />
            <Skeleton className="mt-2 h-4 w-4/5" />
            <Skeleton className="mt-10 h-6 w-48" />
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="h-16 w-full rounded-2xl" />
              ))}
            </div>
          </div>
          <div className="space-y-5">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="h-40 w-full rounded-3xl" />
            ))}
          </div>
        </div>
      </div>

      {/* Shipping, returns and support */}
      <div className="shell py-14 md:py-20">
        <div className="grid gap-5 md:grid-cols-3" aria-hidden="true">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-52 w-full rounded-3xl" />
          ))}
        </div>
      </div>

      {/* Related products */}
      <div className="shell py-14 md:py-20">
        <div aria-hidden="true">
          <Skeleton className="h-3 w-40 rounded-full" />
          <Skeleton className="mt-3 h-9 w-full max-w-md" />
          <Skeleton className="mt-4 h-4 w-full max-w-2xl" />
        </div>
        <div className="mt-10">
          <ProductGridSkeleton count={4} columns={4} />
        </div>
      </div>
    </div>
  );
}
