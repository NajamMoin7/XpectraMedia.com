import { ProductGridSkeleton, Skeleton } from "@/components/ui/Feedback";

/**
 * Skeleton shown while the products route loads. It mirrors the page banner,
 * the filter sidebar, the sort toolbar and the product grid, so the real page
 * lands without shifting anything.
 */
export default function ProductsLoading() {
  return (
    <div role="status" className="bg-canvas">
      <span className="sr-only">Loading products</span>

      {/* Page banner */}
      <div className="relative overflow-hidden border-b border-line bg-mist">
        <div aria-hidden="true" className="brand-wash pointer-events-none absolute inset-0" />
        <div className="shell relative py-12 md:py-16" aria-hidden="true">
          <Skeleton className="h-3 w-48 rounded-full" />
          <Skeleton className="mt-6 h-3 w-32 rounded-full" />
          <Skeleton className="mt-3 h-11 w-72 max-w-full" />
          <Skeleton className="mt-5 h-4 w-full max-w-2xl" />
          <Skeleton className="mt-2 h-4 w-4/5 max-w-xl" />
        </div>
      </div>

      {/* Filters and grid */}
      <div className="shell grid gap-10 py-12 md:py-16 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-12">
        {/* Filter sidebar */}
        <div
          className="hidden rounded-3xl border border-line bg-card p-6 shadow-[var(--shadow-soft)] lg:block"
          aria-hidden="true"
        >
          <div className="space-y-7">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="space-y-3">
                <Skeleton className="h-3 w-28 rounded-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-3/5" />
              </div>
            ))}
          </div>
        </div>

        <div>
          {/* Sort and view toolbar */}
          <Skeleton className="h-16 w-full rounded-3xl" />

          <div className="mt-8">
            <ProductGridSkeleton count={9} columns={3} />
          </div>
        </div>
      </div>
    </div>
  );
}
