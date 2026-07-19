import { ProductCardSkeleton, Skeleton } from "@/components/ui/Feedback";

/** Skeleton shown while an individual product page loads. */
export default function ProductDetailsLoading() {
  return (
    <div>
      <div className="shell pt-8">
        <Skeleton className="h-3 w-64" />
      </div>

      <div className="shell grid gap-10 py-10 lg:grid-cols-2 lg:gap-14 lg:py-14">
        <div>
          <Skeleton className="aspect-[3/4] w-full rounded-2xl" />
          <div className="mt-4 grid grid-cols-4 gap-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="aspect-square rounded-xl" />
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <Skeleton className="h-3 w-32" />
          <Skeleton className="h-10 w-4/5" />
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-9 w-40" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-12 w-full rounded-full" />
          <Skeleton className="h-12 w-full rounded-full" />
          <Skeleton className="h-24 w-full rounded-2xl" />
        </div>
      </div>

      <div className="shell grid grid-cols-2 gap-5 pb-16 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
