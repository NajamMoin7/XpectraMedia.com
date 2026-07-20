import {
  CheckoutFormSkeleton,
  OrderSummarySkeleton,
  Skeleton,
} from "@/components/ui/Feedback";

/** Skeleton shown while the checkout route loads. */
export default function CheckoutLoading() {
  return (
    <div role="status" className="bg-canvas">
      <span className="sr-only">Loading checkout</span>

      {/* Page banner */}
      <div className="relative overflow-hidden border-b border-line bg-mist">
        <div aria-hidden="true" className="brand-wash pointer-events-none absolute inset-0" />
        <div className="shell relative py-12 md:py-16" aria-hidden="true">
          <Skeleton className="h-3 w-56 rounded-full" />
          <Skeleton className="mt-6 h-3 w-32 rounded-full" />
          <Skeleton className="mt-3 h-11 w-64 max-w-full" />
          <Skeleton className="mt-5 h-4 w-full max-w-2xl" />
          <Skeleton className="mt-2 h-4 w-4/5 max-w-xl" />
        </div>
      </div>

      <div className="bg-mist py-12 md:py-16">
        <div className="shell">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] xl:grid-cols-[minmax(0,1fr)_24rem]">
            <CheckoutFormSkeleton />

            <div className="lg:sticky lg:top-24 lg:self-start">
              <OrderSummarySkeleton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
