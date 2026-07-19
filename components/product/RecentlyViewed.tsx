"use client";

import { useEffect, useState } from "react";

import { ProductGrid } from "@/components/product/ProductGrid";
import { SectionHeading } from "@/components/ui/PageBanner";
import { getProductsByIds } from "@/lib/products";
import { STORAGE_KEYS } from "@/lib/site";
import type { Product } from "@/lib/types";

const MAX_TRACKED = 8;

/**
 * Records the product currently being viewed and lists the ones seen before
 * it. History lives in localStorage, so nothing leaves the browser.
 */
export function RecentlyViewed({ currentId }: { currentId: string }) {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    let history: string[] = [];
    try {
      const raw = window.localStorage.getItem(STORAGE_KEYS.recentlyViewed);
      const parsed: unknown = raw ? JSON.parse(raw) : [];
      if (Array.isArray(parsed)) {
        history = parsed.filter((id): id is string => typeof id === "string");
      }
    } catch {
      history = [];
    }

    // Show what was viewed before this product, then record this visit. The
    // read has to happen after mount because the server cannot see the
    // browser history, and rendering it during hydration would not match.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setItems(getProductsByIds(history.filter((id) => id !== currentId)).slice(0, 4));

    const next = [currentId, ...history.filter((id) => id !== currentId)].slice(
      0,
      MAX_TRACKED,
    );
    try {
      window.localStorage.setItem(STORAGE_KEYS.recentlyViewed, JSON.stringify(next));
    } catch {
      // Private browsing can block storage. Viewing history is a convenience,
      // so failing here should never interrupt the page.
    }
  }, [currentId]);

  if (items.length === 0) return null;

  return (
    <section className="bg-canvas py-14 md:py-20">
      <div className="shell">
        <SectionHeading
          eyebrow="Recently Viewed"
          title="Pick up where you left off"
          description="Products you looked at earlier in this browser, kept on this device only."
        />
        <div className="mt-10">
          <ProductGrid products={items} columns={4} />
        </div>
      </div>
    </section>
  );
}
