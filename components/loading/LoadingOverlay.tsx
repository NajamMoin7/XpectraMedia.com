"use client";

import { BrandSpinner } from "@/components/loading/BrandSpinner";
import { useRouteLoading } from "@/components/loading/RouteLoadingProvider";

/**
 * Global navigation overlay.
 * Mounted once in the root layout, so only ever one loader is on screen. It
 * stays in the tree and fades its opacity, which avoids any layout shift and
 * lets the exit transition play out.
 */
export function LoadingOverlay() {
  const { loading } = useRouteLoading();

  return (
    <div
      // Not a dialog, so focus is never trapped and the keyboard stays free.
      role="status"
      aria-live="polite"
      aria-busy={loading}
      className={`pointer-events-none fixed inset-0 z-[95] grid place-items-center ${
        loading ? "overlay-enter" : "overlay-exit"
      }`}
      // Hidden from assistive technology and from hit testing when idle.
      {...(loading ? {} : { "aria-hidden": true as const })}
    >
      {/* Softly blurred white veil */}
      <div
        className="absolute inset-0 bg-canvas/70 backdrop-blur-[3px]"
        aria-hidden="true"
      />

      <div className="relative flex flex-col items-center gap-4 rounded-3xl border border-line bg-card/95 px-10 py-9 shadow-[var(--shadow-lift)]">
        <BrandSpinner size={64} />
        <p className="text-sm font-semibold tracking-tight text-ink">
          Loading page
        </p>
        <span className="sr-only">
          {loading ? "Loading page, please wait" : "Page loaded"}
        </span>
      </div>
    </div>
  );
}
