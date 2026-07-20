"use client";

import { usePathname } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

/**
 * Milliseconds to wait before the overlay appears.
 * Prefetched routes usually resolve faster than this, so a quick navigation
 * never flashes a spinner. Navigation itself is never delayed.
 */
const SHOW_DELAY = 140;

/** Safety net so a cancelled or failed navigation cannot strand the loader. */
const MAX_VISIBLE = 8000;

interface PendingNavigation {
  /** Pathname the navigation started from, used to detect arrival. */
  from: string;
  /** Full destination, used to ignore repeated clicks on the same link. */
  href: string;
  /** False until the show delay has elapsed. */
  armed: boolean;
}

interface RouteLoadingValue {
  /** True once a navigation has been pending long enough to show the loader. */
  loading: boolean;
  /** Destination of the navigation in flight, if any. */
  pendingHref: string | null;
  /** Announces a navigation. Returns false when the click should be ignored. */
  start: (href: string) => boolean;
}

const RouteLoadingContext = createContext<RouteLoadingValue | null>(null);

/** Splits a href into its pathname, ignoring query and hash. */
function pathOf(href: string): string {
  const withoutHash = href.split("#")[0];
  return withoutHash.split("?")[0] || "/";
}

/**
 * Tracks in flight route changes so a single global overlay can be shown.
 *
 * Visibility is derived rather than stored: the loader shows only while the
 * current pathname still matches the one the navigation started from, so the
 * moment the new route renders the overlay disappears on its own. That keeps
 * the provider free of effects that mirror router state into React state.
 */
export function RouteLoadingProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [pending, setPending] = useState<PendingNavigation | null>(null);

  const armTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const failTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const start = useCallback(
    (href: string) => {
      if (typeof window === "undefined") return true;

      const current = `${window.location.pathname}${window.location.search}`;
      const currentPath = window.location.pathname;
      const targetPath = pathOf(href);

      // Exactly where we already are, so there is nothing to navigate to.
      if (href === current || href === currentPath) return false;

      // A query only change keeps the same pathname, which means arrival
      // cannot be detected from the pathname. Those are instant anyway, so
      // the navigation proceeds without showing the overlay.
      if (targetPath === currentPath) return true;

      // A second click on the link already in flight is ignored.
      if (pending && pending.href === href) return false;

      if (armTimer.current) clearTimeout(armTimer.current);
      if (failTimer.current) clearTimeout(failTimer.current);

      setPending({ from: currentPath, href, armed: false });

      armTimer.current = setTimeout(() => {
        setPending((value) =>
          value && value.href === href ? { ...value, armed: true } : value,
        );
      }, SHOW_DELAY);

      failTimer.current = setTimeout(() => {
        setPending((value) => (value && value.href === href ? null : value));
      }, MAX_VISIBLE);

      return true;
    },
    [pending],
  );

  const value = useMemo<RouteLoadingValue>(() => {
    // Once the router lands on the new route the pathname no longer matches
    // where the navigation began, which hides the loader without any effect.
    const loading = pending !== null && pending.armed && pending.from === pathname;
    return {
      loading,
      pendingHref: pending && pending.from === pathname ? pending.href : null,
      start,
    };
  }, [pending, pathname, start]);

  return (
    <RouteLoadingContext.Provider value={value}>
      {children}
    </RouteLoadingContext.Provider>
  );
}

/**
 * Reads the navigation state.
 * Returns a no op outside the provider so components stay usable in isolation.
 */
export function useRouteLoading(): RouteLoadingValue {
  return (
    useContext(RouteLoadingContext) ?? {
      loading: false,
      pendingHref: null,
      start: () => true,
    }
  );
}
