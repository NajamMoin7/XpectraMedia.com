"use client";

import { useEffect, useState } from "react";

import { ProductGrid } from "@/components/product/ProductGrid";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/PageBanner";
import { getProductsByIds } from "@/lib/products";
import { STORAGE_KEYS } from "@/lib/site";
import type { Product } from "@/lib/types";

/** Number of past products shown on the home page. */
const MAX_SHOWN = 4;

/**
 * Products the visitor looked at earlier in the session.
 * Browsing history lives only in the browser, so the section renders nothing
 * on the server and nothing at all when the history is empty.
 */
export function HomeRecentlyViewed() {
  const [recent, setRecent] = useState<Product[]>([]);

  useEffect(() => {
    let ids: string[] = [];
    try {
      const raw = window.localStorage.getItem(STORAGE_KEYS.recentlyViewed);
      const parsed: unknown = raw ? JSON.parse(raw) : [];
      if (Array.isArray(parsed)) {
        ids = parsed.filter((id): id is string => typeof id === "string");
      }
    } catch {
      // Private browsing can block storage. Viewing history is a convenience,
      // so failing here should never interrupt the page.
      ids = [];
    }

    if (ids.length === 0) return;

    // The server cannot read the browser viewing history, so the list can only
    // be resolved once the component has mounted in the browser.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRecent(getProductsByIds(ids).slice(0, MAX_SHOWN));
  }, []);

  if (recent.length === 0) return null;

  return (
    <section className="border-y border-line bg-mist py-16 md:py-20">
      <div className="shell">
        <SectionHeading
          eyebrow="Recently Viewed"
          title="Pick up where you left off"
          description="The pieces you looked at most recently, kept here so you can compare them again before you decide."
          action={
            <Button href="/products" variant="outline">
              Keep Browsing
              <Icon name="arrowRight" size={16} />
            </Button>
          }
        />
        <div className="mt-12">
          <ProductGrid products={recent} />
        </div>
      </div>
    </section>
  );
}
