import "server-only";

import { seedProducts } from "@/lib/products";
import { kv } from "@/lib/server/kv";
import type { Product } from "@/lib/types";

/**
 * The live product catalogue.
 *
 * Stored as one document because it is small and edited by a single admin.
 * Until the admin saves for the first time the built in seed list is used.
 */

const KEY = "products";

export async function getCatalog(): Promise<Product[]> {
  try {
    const stored = await kv("catalog").getJSON<Product[]>(KEY);
    return Array.isArray(stored) ? stored : seedProducts;
  } catch (error) {
    // The build can run without access to Netlify Blobs. Pages prerendered
    // from the seed refresh from the live store on their next revalidation.
    if (process.env.NEXT_PHASE === "phase-production-build") return seedProducts;
    throw error;
  }
}

export async function saveCatalog(list: Product[]): Promise<void> {
  await kv("catalog").setJSON(KEY, list);
}

/**
 * The client components only need what product cards, search and filters
 * show. Long copy stays on the server to keep every page light.
 */
export function toClientCatalog(list: Product[]): Product[] {
  return list.map((product) => ({
    ...product,
    detailedDescription: "",
    features: [],
    careInstructions: [],
    shippingInfo: "",
    returnInfo: "",
  }));
}
