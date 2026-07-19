import { Skeleton } from "@/components/ui/Feedback";

/** Skeleton shown while any categories route loads. */
export default function CategoriesLoading() {
  return (
    <div className="bg-canvas">
      <div className="brand-wash border-b border-line bg-mist">
        <div className="shell space-y-4 py-12 md:py-16">
          <Skeleton className="h-3 w-48" />
          <Skeleton className="h-10 w-72" />
          <Skeleton className="h-4 w-full max-w-xl" />
        </div>
      </div>

      <div className="shell py-14 md:py-20">
        <div className="space-y-4">
          <Skeleton className="h-3 w-36" />
          <Skeleton className="h-8 w-80" />
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-80 rounded-3xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
