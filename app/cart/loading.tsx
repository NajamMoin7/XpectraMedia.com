import {
  CartItemSkeleton,
  OrderSummarySkeleton,
  Skeleton,
} from "@/components/ui/Feedback";

/** Skeleton shown while the cart route loads. */
export default function CartLoading() {
  return (
    <div role="status" className="bg-canvas">
      <span className="sr-only">Loading your cart</span>

      {/* Page banner */}
      <div className="relative overflow-hidden border-b border-line bg-mist">
        <div aria-hidden="true" className="brand-wash pointer-events-none absolute inset-0" />
        <div className="shell relative py-12 md:py-16" aria-hidden="true">
          <Skeleton className="h-3 w-40 rounded-full" />
          <Skeleton className="mt-6 h-3 w-32 rounded-full" />
          <Skeleton className="mt-3 h-11 w-72 max-w-full" />
          <Skeleton className="mt-5 h-4 w-full max-w-2xl" />
          <Skeleton className="mt-2 h-4 w-4/5 max-w-xl" />
        </div>
      </div>

      <div className="bg-mist py-12 md:py-16">
        <div className="shell">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] xl:grid-cols-[minmax(0,1fr)_24rem]">
            <div>
              {/* Item count and clear cart */}
              <div className="flex flex-wrap items-center justify-between gap-3" aria-hidden="true">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-9 w-28 rounded-full" />
              </div>

              {/* Free shipping progress */}
              <Skeleton className="mt-5 h-24 w-full rounded-2xl" />

              {/* Cart lines */}
              <div className="mt-5 overflow-hidden rounded-3xl border border-line bg-card shadow-[var(--shadow-soft)]">
                {Array.from({ length: 3 }).map((_, index) => (
                  <CartItemSkeleton key={index} />
                ))}
              </div>

              {/* Continue shopping */}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center" aria-hidden="true">
                <Skeleton className="h-12 w-52 rounded-full" />
                <Skeleton className="h-3 w-64 max-w-full rounded-full" />
              </div>
            </div>

            <div className="lg:sticky lg:top-24 lg:self-start">
              <OrderSummarySkeleton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
