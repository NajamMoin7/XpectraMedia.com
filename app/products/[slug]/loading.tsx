import { ProductCardSkeleton, Skeleton } from "@/components/ui/Feedback";

/** Skeleton shown while an individual product page loads. */
export default function ProductDetailsLoading() {
  return (
    <div className="bg-canvas">
      <div className="border-b border-line bg-mist">
        <div className="shell py-5">
          <Skeleton className="h-3 w-64" />
        </div>
      </div>

      {/* Gallery and purchase panel */}
      <div className="shell grid gap-10 py-10 lg:grid-cols-2 lg:gap-16 lg:py-16">
        <div>
          <Skeleton className="aspect-[3/4] w-full rounded-3xl" />
          <div className="mt-4 flex gap-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="aspect-square w-24 rounded-2xl sm:w-28" />
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <Skeleton className="h-3 w-36" />
          <Skeleton className="h-11 w-4/5" />
          <Skeleton className="h-4 w-3/5" />
          <Skeleton className="h-4 w-44" />
          <Skeleton className="h-10 w-52" />
          <Skeleton className="h-4 w-64" />
          <div className="flex gap-3 pt-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-11 w-11 rounded-full" />
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="h-11 w-16 rounded-full" />
            ))}
          </div>
          <Skeleton className="h-13 w-full rounded-full" />
          <Skeleton className="h-13 w-full rounded-full" />
          <Skeleton className="h-24 w-full rounded-2xl" />
        </div>
      </div>

      {/* Details */}
      <div className="border-y border-line bg-mist py-14">
        <div className="shell grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-14">
          <div className="space-y-4">
            <Skeleton className="h-8 w-56" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
            <div className="grid gap-3 pt-6 sm:grid-cols-2">
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

      {/* Related products */}
      <div className="shell grid grid-cols-2 gap-5 py-14 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
