import { CustomShirtCardSkeleton, Skeleton } from "@/components/ui/Feedback";

/** Skeleton shown while any custom shirts route loads. */
export default function CustomShirtsLoading() {
  return (
    <div role="status" className="bg-canvas">
      <span className="sr-only">Loading custom shirts</span>

      {/* Page banner with its two actions */}
      <div className="relative overflow-hidden border-b border-line bg-mist">
        <div aria-hidden="true" className="brand-wash pointer-events-none absolute inset-0" />
        <div className="shell relative py-12 md:py-16" aria-hidden="true">
          <Skeleton className="h-3 w-52 rounded-full" />
          <Skeleton className="mt-6 h-3 w-32 rounded-full" />
          <Skeleton className="mt-3 h-11 w-full max-w-lg" />
          <Skeleton className="mt-5 h-4 w-full max-w-2xl" />
          <Skeleton className="mt-2 h-4 w-4/5 max-w-xl" />
          <div className="mt-8 flex flex-wrap gap-3">
            <Skeleton className="h-12 w-44 rounded-full" />
            <Skeleton className="h-12 w-36 rounded-full" />
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-canvas py-12 md:py-16">
        <div className="shell">
          <div className="grid items-center gap-10 lg:grid-cols-2" aria-hidden="true">
            <Skeleton className="aspect-[4/3] w-full rounded-3xl" />

            <div>
              <Skeleton className="h-3 w-44 rounded-full" />
              <Skeleton className="mt-4 h-9 w-full max-w-lg" />
              <Skeleton className="mt-2 h-9 w-3/5" />
              <Skeleton className="mt-5 h-4 w-full" />
              <Skeleton className="mt-2 h-4 w-full" />
              <Skeleton className="mt-2 h-4 w-4/5" />

              <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton key={index} className="h-20 w-full rounded-2xl" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="border-y border-line bg-mist py-14 md:py-20">
        <div className="shell">
          <div className="flex flex-col items-center gap-5 text-center" aria-hidden="true">
            <Skeleton className="h-3 w-32 rounded-full" />
            <Skeleton className="h-9 w-full max-w-xl" />
            <Skeleton className="h-4 w-full max-w-2xl" />
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-64 w-full rounded-3xl" />
            ))}
          </div>
        </div>
      </div>

      {/* Customizable shirt grid */}
      <div className="border-b border-line bg-mist py-14 md:py-20">
        <div className="shell">
          <div
            className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between"
            aria-hidden="true"
          >
            <div className="max-w-2xl">
              <Skeleton className="h-3 w-44 rounded-full" />
              <Skeleton className="mt-3 h-9 w-full max-w-md" />
              <Skeleton className="mt-4 h-4 w-full max-w-2xl" />
            </div>
            <Skeleton className="h-11 w-52 shrink-0 rounded-full" />
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <CustomShirtCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
