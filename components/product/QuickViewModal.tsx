"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Icon } from "@/components/ui/Icon";
import { QuantitySelector } from "@/components/ui/QuantitySelector";
import { subcategoryLabel } from "@/lib/categories";
import { useCart } from "@/lib/cart-context";
import { calcDiscount, formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";

/**
 * Compact product preview opened from a card.
 * Lets the customer choose a size and color and add to the cart without
 * leaving the listing.
 */
export function QuickViewModal({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const { addItem } = useCart();
  const panelRef = useRef<HTMLDivElement>(null);

  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0].name);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const discount = product.discount ?? calcDiscount(product.price, product.originalPrice);

  useEffect(() => {
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    const focusTimer = setTimeout(() => panelRef.current?.focus(), 40);

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKeyDown);
      clearTimeout(focusTimer);
    };
  }, [onClose]);

  function handleAdd() {
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0],
      price: product.price,
      size,
      color,
      quantity,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center p-4">
      <div
        className="animate-fade-up absolute inset-0 bg-night/45 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Quick view, ${product.name}`}
        tabIndex={-1}
        className="animate-scale-in relative grid max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-line bg-card shadow-[var(--shadow-lift)] sm:grid-cols-2"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close quick view"
          className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/95 text-slate shadow-sm backdrop-blur transition-all hover:rotate-90 hover:text-ink"
        >
          <Icon name="close" size={18} />
        </button>

        <div className="relative aspect-[4/5] bg-mist sm:aspect-auto sm:min-h-full">
          <Image
            src={product.images[0]}
            alt={`${product.name}, ${product.subtitle}`}
            fill
            sizes="(max-width: 640px) 100vw, 384px"
            className="object-cover"
          />
        </div>

        <div className="p-6 sm:p-7">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-brand">
            {subcategoryLabel(product.subcategory)}
          </p>
          <h2 className="mt-2 font-display text-xl font-bold leading-snug text-ink">
            {product.name}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate">
            {product.shortDescription}
          </p>

          <div className="mt-4 flex flex-wrap items-baseline gap-2">
            <span className="font-display text-2xl font-bold text-ink">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice ? (
              <>
                <span className="text-sm text-muted line-through">
                  {formatPrice(product.originalPrice)}
                </span>
                <span className="rounded-full bg-brand-tint px-2.5 py-1 text-xs font-semibold text-brand-deep">
                  {discount} percent off
                </span>
              </>
            ) : null}
          </div>

          {/* Size */}
          <fieldset className="mt-6">
            <legend className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink">
              Size
            </legend>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setSize(option)}
                  aria-pressed={size === option}
                  className={`h-9 rounded-full border px-4 text-xs font-semibold transition-all duration-300 ${
                    size === option
                      ? "border-brand bg-brand-tint text-brand-deep"
                      : "border-line-strong text-slate hover:border-brand hover:text-brand"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </fieldset>

          {/* Color */}
          <fieldset className="mt-5">
            <legend className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink">
              Color: <span className="font-normal text-slate">{color}</span>
            </legend>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((option) => (
                <button
                  key={option.name}
                  type="button"
                  onClick={() => setColor(option.name)}
                  aria-pressed={color === option.name}
                  aria-label={option.name}
                  title={option.name}
                  className={`grid h-9 w-9 place-items-center rounded-full border transition-all duration-300 hover:scale-110 ${
                    color === option.name ? "border-brand" : "border-line-strong"
                  }`}
                >
                  <span
                    className="block h-6 w-6 rounded-full"
                    style={{ backgroundColor: option.hex }}
                  />
                </button>
              ))}
            </div>
          </fieldset>

          <div className="mt-6 flex items-center gap-3">
            <QuantitySelector
              value={quantity}
              onChange={setQuantity}
              max={Math.max(1, product.stock)}
              size="sm"
            />
            <button
              type="button"
              onClick={handleAdd}
              className={`inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full text-sm font-semibold text-white transition-all duration-300 active:scale-[0.98] ${
                added ? "bg-success" : "bg-night hover:bg-brand"
              }`}
            >
              <Icon name={added ? "check" : "cart"} size={16} />
              {added ? "Added to Cart" : "Add to Cart"}
            </button>
          </div>

          <Link
            href={`/products/${product.slug}`}
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand transition-all hover:gap-3"
          >
            View full details
            <Icon name="arrowRight" size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}
