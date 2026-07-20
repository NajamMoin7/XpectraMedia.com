import { CategoryCardSkeleton, Skeleton } from "@/components/ui/Feedback";

/** Skeleton shown while any categories route loads. */
export default function CategoriesLoading() {
  return (
    <div role="status" className="bg-canvas">
      <span className="sr-only">Loading categories</span>

      {/* Page banner */}
      <div className="relative overflow-hidden border-b border-line bg-mist">
        <div aria-hidden="true" className="brand-wash pointer-events-none absolute inset-0" />
        <div className="shell relative py-12 md:py-16" aria-hidden="true">
          <Skeleton className="h-3 w-44 rounded-full" />
          <Skeleton className="mt-6 h-3 w-36 rounded-full" />
          <Skeleton className="mt-3 h-11 w-80 max-w-full" />
          <Skeleton className="mt-5 h-4 w-full max-w-2xl" />
          <Skeleton className="mt-2 h-4 w-4/5 max-w-xl" />
        </div>
      </div>

      {/* Main departments */}
      <div className="shell py-14 md:py-20">
        <div aria-hidden="true">
          <Skeleton className="h-3 w-36 rounded-full" />
          <Skeleton className="mt-3 h-9 w-full max-w-xl" />
          <Skeleton className="mt-4 h-4 w-full max-w-2xl" />
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <CategoryCardSkeleton key={index} />
          ))}
        </div>
      </div>

      {/* Product families */}
      <div className="border-y border-line bg-mist py-14 md:py-20">
        <div className="shell">
          <div aria-hidden="true">
            <Skeleton className="h-3 w-32 rounded-full" />
            <Skeleton className="mt-3 h-9 w-full max-w-xl" />
            <Skeleton className="mt-4 h-4 w-full max-w-2xl" />
          </div>

          <div className="mt-12 space-y-14">
            {Array.from({ length: 2 }).map((_, group) => (
              <div key={group}>
                <div className="max-w-2xl" aria-hidden="true">
                  <Skeleton className="h-7 w-56" />
                  <Skeleton className="mt-3 h-4 w-full" />
                </div>
                <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <CategoryCardSkeleton key={index} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
