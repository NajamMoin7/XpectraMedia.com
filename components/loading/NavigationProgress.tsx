"use client";

import { useRouteLoading } from "@/components/loading/RouteLoadingProvider";

/**
 * Slim indeterminate progress bar pinned to the top of the viewport.
 * It reads the same navigation state as the overlay, so the two always agree
 * and there is never more than one loading indicator in flight.
 */
export function NavigationProgress() {
  const { loading } = useRouteLoading();

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-x-0 top-0 z-[96] h-0.5 transition-opacity duration-200 ${
        loading ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="h-full w-full overflow-hidden bg-brand-tint">
        {loading ? (
          <div className="animate-progress h-full w-full bg-gradient-to-r from-brand-deep via-brand to-brand-bright" />
        ) : null}
      </div>
    </div>
  );
}
