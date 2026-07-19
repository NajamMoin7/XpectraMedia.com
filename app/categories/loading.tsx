import { Skeleton } from "@/components/ui/Feedback";

/** Skeleton shown while any categories route loads. */
export default function CategoriesLoading() {
  return (
    <div>
      <div className="border-b border-line-soft bg-ink-soft">
        <div className="shell space-y-4 py-12 md:py-16">
          <Skeleton className="h-3 w-48" />
          <Skeleton className="h-10 w-72" />
          <Skeleton className="h-4 w-full max-w-xl" />
        </div>
      </div>

      <div className="shell grid gap-6 py-14 md:py-20 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-80 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
