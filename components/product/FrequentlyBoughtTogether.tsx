"use client";

import Image from "next/image";
import { NavLink } from "@/components/ui/NavLink";
import { useState } from "react";

import { Icon } from "@/components/ui/Icon";
import { subcategoryLabel } from "@/lib/categories";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";

/**
 * Bundle suggestion shown under the purchase panel.
 * The current product is always the first item, followed by complements from
 * the same department. One button drops the whole bundle into the cart.
 */
export function FrequentlyBoughtTogether({
  product,
  complements,
}: {
  product: Product;
  complements: Product[];
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const bundle = [product, ...complements];
  if (bundle.length < 2) return null;

  const total = bundle.reduce((sum, item) => sum + item.price, 0);
  const originalTotal = bundle.reduce(
    (sum, item) => sum + (item.originalPrice ?? item.price),
    0,
  );
  const saving = Math.round((originalTotal - total) * 100) / 100;

  function handleAddAll() {
    for (const item of bundle) {
      if (item.stock <= 0) continue;
      addItem({
        productId: item.id,
        slug: item.slug,
        name: item.name,
        image: item.images[0],
        price: item.price,
        size: item.sizes[0],
        color: item.colors[0].name,
        quantity: 1,
      });
    }
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2200);
  }

  return (
    <div className="rounded-3xl border border-line bg-card p-6 shadow-[var(--shadow-soft)] sm:p-8">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,17rem)] lg:items-center lg:gap-10">
        {/* Bundle items */}
        <ul className="flex flex-wrap items-stretch gap-4">
          {bundle.map((item, index) => (
            <li key={item.id} className="flex items-center gap-4">
              {index > 0 ? (
                <span
                  aria-hidden="true"
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-mist-2 text-muted"
                >
                  <Icon name="plus" size={15} />
                </span>
              ) : null}

              <article className="w-40 sm:w-44">
                <NavLink
                  href={`/products/${item.slug}`}
                  className="group block overflow-hidden rounded-2xl border border-line bg-mist transition-all duration-300 hover:border-brand/45"
                >
                  <span className="relative block aspect-[3/4]">
                    <Image
                      src={item.images[0]}
                      alt={`${item.name}, ${item.subtitle}`}
                      fill
                      sizes="176px"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    {index === 0 ? (
                      <span className="absolute left-2 top-2 rounded-full bg-brand px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-wider text-white">
                        This item
                      </span>
                    ) : null}
                  </span>
                </NavLink>

                <p className="mt-3 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-brand">
                  {subcategoryLabel(item.subcategory)}
                </p>
                <h3 className="mt-1 line-clamp-2 text-sm font-semibold leading-snug text-ink">
                  <NavLink
                    href={`/products/${item.slug}`}
                    className="transition-colors hover:text-brand"
                  >
                    {item.name}
                  </NavLink>
                </h3>
                <p className="mt-1.5 flex flex-wrap items-baseline gap-2">
                  <span className="text-sm font-bold text-ink">
                    {formatPrice(item.price)}
                  </span>
                  {item.originalPrice ? (
                    <span className="text-xs text-muted line-through">
                      {formatPrice(item.originalPrice)}
                    </span>
                  ) : null}
                </p>
              </article>
            </li>
          ))}
        </ul>

        {/* Totals and action */}
        <div className="rounded-2xl border border-line bg-mist p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            {`Total for ${bundle.length} items`}
          </p>
          <p className="mt-2 font-display text-3xl font-bold text-ink">
            {formatPrice(total)}
          </p>
          {saving > 0 ? (
            <p className="mt-1.5 text-sm font-semibold text-sale">
              {`You save ${formatPrice(saving)} on the bundle`}
            </p>
          ) : null}

          <button
            type="button"
            onClick={handleAddAll}
            className={`mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full text-sm font-semibold text-white transition-all duration-300 active:scale-[0.98] ${
              added
                ? "bg-success"
                : "bg-night hover:bg-brand hover:shadow-[0_10px_26px_-12px_rgba(13,127,242,0.9)]"
            }`}
          >
            <Icon name={added ? "check" : "cart"} size={17} />
            {added ? "Bundle added" : "Add all to cart"}
          </button>

          <p className="mt-3 text-xs leading-relaxed text-muted">
            Items are added in the first available size and color. You can adjust
            either one in the cart before you check out.
          </p>
        </div>
      </div>
    </div>
  );
}
