"use client";

import { createContext, useContext } from "react";

import type { Product } from "@/lib/types";

/**
 * The live catalogue for client components (search, filters, recently viewed,
 * the shirt customizer). The root layout reads it on the server and passes
 * it in, so admin edits reach the browser without a redeploy.
 */
const CatalogContext = createContext<Product[] | null>(null);

const EMPTY: Product[] = [];

export function CatalogProvider({
  products,
  children,
}: {
  products: Product[];
  children: React.ReactNode;
}) {
  return <CatalogContext.Provider value={products}>{children}</CatalogContext.Provider>;
}

export function useCatalog(): Product[] {
  return useContext(CatalogContext) ?? EMPTY;
}
