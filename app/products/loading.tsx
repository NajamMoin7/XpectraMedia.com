import { ProductCardSkeleton, Skeleton } from "@/components/ui/Feedback";

/** Skeleton shown while the products route loads. */
export default function ProductsLoading() {
  return (
    <div className="bg-canvas">
      <div className="brand-wash border-b border-line bg-mist">
        <div className="shell space-y-4 py-12 md:py-16">
          <Skeleton className="h-3 w-48" />
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-4 w-full max-w-xl" />
        </div>
      </div>

      <div className="shell grid gap-10 py-12 md:py-16 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-12">
        <Skeleton className="hidden h-[32rem] rounded-3xl lg:block" />
        <div>
          <Skeleton className="h-16 w-full rounded-3xl" />
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
