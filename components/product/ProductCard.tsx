"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Icon } from "@/components/ui/Icon";
import { Rating } from "@/components/ui/Rating";
import { subcategoryLabel } from "@/lib/categories";
import { useCart } from "@/lib/cart-context";
import { calcDiscount, formatPrice } from "@/lib/format";
import type { Product, ViewMode } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  /** List view is used by the products page toggle. */
  view?: ViewMode;
  /** The first row of cards on a page loads eagerly for a faster paint. */
  priority?: boolean;
}

/**
 * Product tile used across the home page, category pages and listings.
 * Adding to the cart from here uses the first available size and colour,
 * which the customer can change later from the cart or product page.
 */
export function ProductCard({ product, view = "grid", priority = false }: ProductCardProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const discount = product.discount ?? calcDiscount(product.price, product.originalPrice);
  const outOfStock = product.stock <= 0;

  function handleAdd() {
    if (outOfStock) return;
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0],
      price: product.price,
      size: product.sizes[0],
      color: product.colors[0].name,
      quantity: 1,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  }

  const isList = view === "list";

  return (
    <article
      className={`group relative flex h-full overflow-hidden rounded-2xl border border-line-soft bg-surface transition-all duration-[400ms] hover:border-brand/60 hover:shadow-[0_24px_50px_-30px_rgba(30,144,255,0.85)] ${
        isList ? "flex-col sm:flex-row" : "flex-col"
      }`}
    >
      {/* Image */}
      <Link
        href={`/products/${product.slug}`}
        className={`relative block overflow-hidden bg-surface-2 ${
          isList ? "aspect-[4/3] sm:aspect-auto sm:w-56 sm:shrink-0" : "aspect-[3/4]"
        }`}
        tabIndex={-1}
        aria-hidden="true"
      >
        <Image
          src={product.images[0]}
          alt={`${product.name} from the Xpectra Media ${product.category} collection`}
          fill
          priority={priority}
          loading={priority ? undefined : "lazy"}
          sizes={
            isList
              ? "(max-width: 640px) 100vw, 224px"
              : "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          }
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Badges */}
        <div className="pointer-events-none absolute left-3 top-3 flex flex-col gap-2">
          {discount > 0 ? (
            <span className="rounded-full bg-brand px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-wide text-white shadow-[0_0_16px_rgba(30,144,255,0.6)]">
              {discount} percent off
            </span>
          ) : null}
          {product.newArrival ? (
            <span className="rounded-full border border-white/25 bg-black/60 px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-wide text-white backdrop-blur">
              New
            </span>
          ) : null}
        </div>

        {outOfStock ? (
          <span className="absolute inset-0 grid place-items-center bg-black/70 text-sm font-semibold uppercase tracking-[0.2em] text-white">
            Sold Out
          </span>
        ) : null}
      </Link>

      {/* Details */}
      <div className={`flex flex-1 flex-col p-5 ${isList ? "sm:p-6" : ""}`}>
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-brand">
          {subcategoryLabel(product.subcategory)}
          <span className="ml-2 capitalize text-mist-dim">{product.category}</span>
        </p>

        <h3 className="mt-2 font-display text-base font-semibold leading-snug text-white">
          <Link
            href={`/products/${product.slug}`}
            className="transition-colors before:absolute before:inset-0 before:content-[''] hover:text-brand-bright"
          >
            {product.name}
          </Link>
        </h3>

        <Rating value={product.rating} reviewCount={product.reviewCount} className="mt-2.5" />

        {isList ? (
          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-mist">
            {product.shortDescription}
          </p>
        ) : null}

        <div className="mt-4 flex flex-wrap items-baseline gap-2">
          <span className="font-display text-lg font-bold text-white">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice ? (
            <span className="text-sm text-mist-dim line-through">
              {formatPrice(product.originalPrice)}
            </span>
          ) : null}
        </div>

        {/* Actions sit above the stretched link so they stay clickable */}
        <div
          className={`relative z-10 mt-5 flex gap-2 ${
            isList ? "flex-col sm:flex-row sm:items-center" : "flex-col"
          }`}
        >
          <button
            type="button"
            onClick={handleAdd}
            disabled={outOfStock}
            aria-label={`Add ${product.name} to cart`}
            className={`inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-full text-sm font-semibold transition-all duration-300 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 ${
              added
                ? "bg-emerald-500 text-white"
                : "bg-gradient-to-r from-brand-deep via-brand to-brand-bright text-white hover:brightness-110 hover:shadow-[0_10px_26px_-12px_rgba(30,144,255,1)]"
            }`}
          >
            <Icon name={added ? "check" : "cart"} size={16} />
            {added ? "Added to Cart" : outOfStock ? "Sold Out" : "Add to Cart"}
          </button>

          <Link
            href={`/products/${product.slug}`}
            className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-full border border-line bg-surface-2 text-sm font-semibold text-white transition-all duration-300 hover:border-brand hover:text-brand-bright"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}
