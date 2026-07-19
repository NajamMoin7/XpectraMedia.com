"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";

import { cartCount, cartLineKey, cartSubtotal, deliveryFee } from "@/lib/format";
import { STORAGE_KEYS } from "@/lib/site";
import type { CartItem } from "@/lib/types";

/* ------------------------------------------------------------------ */
/* localStorage backed store                                           */
/*                                                                     */
/* The cart lives outside React so it can be read synchronously during */
/* render, stay consistent across browser tabs, and hydrate without a  */
/* flash of empty state. Components subscribe through                  */
/* useSyncExternalStore rather than copying the value into state.      */
/* ------------------------------------------------------------------ */

const EMPTY: CartItem[] = [];

const listeners = new Set<() => void>();

/** Parsed cart, cached so repeated snapshots return the same reference. */
let cache: CartItem[] = EMPTY;
/** The raw string the cache was built from, used to detect real changes. */
let cacheSource: string | null = null;

/** Reads and validates the persisted cart, discarding anything malformed. */
function parseCart(raw: string | null): CartItem[] {
  if (!raw) return EMPTY;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return EMPTY;
    const valid = parsed.filter((item): item is CartItem => {
      const candidate = item as Partial<CartItem>;
      return (
        typeof candidate?.productId === "string" &&
        typeof candidate?.slug === "string" &&
        typeof candidate?.price === "number" &&
        typeof candidate?.quantity === "number" &&
        candidate.quantity > 0
      );
    });
    return valid.length > 0 ? valid : EMPTY;
  } catch {
    return EMPTY;
  }
}

function readStorage(): string | null {
  try {
    return window.localStorage.getItem(STORAGE_KEYS.cart);
  } catch {
    // Storage is unavailable in some private browsing modes.
    return null;
  }
}

function getSnapshot(): CartItem[] {
  const raw = readStorage();
  if (raw !== cacheSource) {
    cacheSource = raw;
    cache = parseCart(raw);
  }
  return cache;
}

/** The server has no cart, so it always renders the empty state. */
function getServerSnapshot(): CartItem[] {
  return EMPTY;
}

function subscribe(onChange: () => void): () => void {
  listeners.add(onChange);
  // Keeps the cart in step when the store is open in more than one tab.
  window.addEventListener("storage", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

/** Persists the next cart and notifies every subscriber. */
function writeCart(next: CartItem[]): void {
  const serialised = JSON.stringify(next);
  cacheSource = serialised;
  cache = next;
  try {
    window.localStorage.setItem(STORAGE_KEYS.cart, serialised);
  } catch {
    // The cart still works for this session if persistence is blocked.
  }
  for (const listener of listeners) listener();
}

/** True only once the browser has taken over from the server render. */
const subscribeToHydration = () => () => {};
const clientHydrated = () => true;
const serverHydrated = () => false;

/* ------------------------------------------------------------------ */
/* React binding                                                       */
/* ------------------------------------------------------------------ */

interface CartContextValue {
  items: CartItem[];
  /** False during the server render and the first client paint. */
  hydrated: boolean;
  count: number;
  subtotal: number;
  delivery: number;
  total: number;
  addItem: (item: CartItem) => void;
  updateQuantity: (key: string, quantity: number) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const hydrated = useSyncExternalStore(
    subscribeToHydration,
    clientHydrated,
    serverHydrated,
  );

  const addItem = useCallback((item: CartItem) => {
    const current = getSnapshot();
    const key = cartLineKey(item);
    const existing = current.find((line) => cartLineKey(line) === key);

    writeCart(
      existing
        ? current.map((line) =>
            cartLineKey(line) === key
              ? { ...line, quantity: line.quantity + item.quantity }
              : line,
          )
        : [...current, item],
    );
  }, []);

  const updateQuantity = useCallback((key: string, quantity: number) => {
    const current = getSnapshot();
    writeCart(
      quantity <= 0
        ? current.filter((line) => cartLineKey(line) !== key)
        : current.map((line) =>
            cartLineKey(line) === key ? { ...line, quantity } : line,
          ),
    );
  }, []);

  const removeItem = useCallback((key: string) => {
    writeCart(getSnapshot().filter((line) => cartLineKey(line) !== key));
  }, []);

  const clearCart = useCallback(() => writeCart(EMPTY), []);

  const value = useMemo<CartContextValue>(() => {
    const subtotal = cartSubtotal(items);
    const delivery = deliveryFee(subtotal);
    return {
      items,
      hydrated,
      count: cartCount(items),
      subtotal,
      delivery,
      total: subtotal + delivery,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
    };
  }, [items, hydrated, addItem, updateQuantity, removeItem, clearCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside a CartProvider");
  }
  return context;
}
