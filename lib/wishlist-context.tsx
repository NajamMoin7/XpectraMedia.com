"use client";

import { useCallback, useSyncExternalStore } from "react";

import { STORAGE_KEYS } from "@/lib/site";

/**
 * Wishlist of product ids kept in localStorage.
 * Like the cart it is modelled as an external store so components can read it
 * during render without mirroring the value into React state.
 */

const EMPTY: string[] = [];
const listeners = new Set<() => void>();

let cache: string[] = EMPTY;
let cacheSource: string | null = null;

function parse(raw: string | null): string[] {
  if (!raw) return EMPTY;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return EMPTY;
    const ids = parsed.filter((id): id is string => typeof id === "string");
    return ids.length > 0 ? ids : EMPTY;
  } catch {
    return EMPTY;
  }
}

function read(): string | null {
  try {
    return window.localStorage.getItem(STORAGE_KEYS.wishlist);
  } catch {
    return null;
  }
}

function getSnapshot(): string[] {
  const raw = read();
  if (raw !== cacheSource) {
    cacheSource = raw;
    cache = parse(raw);
  }
  return cache;
}

function getServerSnapshot(): string[] {
  return EMPTY;
}

function subscribe(onChange: () => void): () => void {
  listeners.add(onChange);
  window.addEventListener("storage", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

function write(next: string[]): void {
  const serialised = JSON.stringify(next);
  cacheSource = serialised;
  cache = next;
  try {
    window.localStorage.setItem(STORAGE_KEYS.wishlist, serialised);
  } catch {
    // Saving is a convenience, so a blocked storage API is not fatal.
  }
  for (const listener of listeners) listener();
}

export function useWishlist() {
  const ids = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback((productId: string) => {
    const current = getSnapshot();
    write(
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId],
    );
  }, []);

  const has = useCallback(
    (productId: string) => ids.includes(productId),
    [ids],
  );

  return { ids, toggle, has, count: ids.length };
}
