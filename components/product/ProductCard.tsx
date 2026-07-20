"use client";

import Image from "next/image";
import { useState } from "react";

import { QuickViewModal } from "@/components/product/QuickViewModal";
import { Icon } from "@/components/ui/Icon";
import { NavLink } from "@/components/ui/NavLink";
import { subcategoryLabel } from "@/lib/categories";
import { useCart } from "@/lib/cart-context";
import { calcDiscount, formatPrice } from "@/lib/format";
import { productBadge } from "@/lib/products";
import { useWishlist } from "@/lib/wishlist-context";
import type { Product, ProductBadge, ViewMode } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  /** List view is used by the products page toggle. */
  view?: ViewMode;
  /** The first row of cards on a page loads eagerly for a faster paint. */
  priority?: boolean;
}

const BADGE_STYLES: Record<ProductBadge, { label: string; className: string }> = {
  sale: { label: "Sale", className: "bg-sale text-white" },
  new: { label: "New", className: "bg-brand text-white" },
  bestseller: { label: "Best Seller", className: "bg-night text-white" },
  limited: { label: "Limited Stock", className: "bg-amber-500 text-white" },
};

/**
 * Premium product tile used across the storefront.
 * On desktop the secondary image, quick view and cart action are revealed on
 * hover. On touch screens the key actions stay visible at all times.
 */
export function ProductCard({ product, view = "grid", priority = false }: ProductCardProps) {
  const { addItem } = useCart();
  const wishlist = useWishlist();

  const [added, setAdded] = useState(false);
  const [quickView, setQuickView] = useState(false);

  const discount = product.discount ?? calcDiscount(product.price, product.originalPrice);
  const badge = productBadge(product);
  const outOfStock = product.stock <= 0;
  const isList = view === "list";
  const wished = wishlist.has(product.id);

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

  return (
    <>
      <article
        className={`group relative flex h-full overflow-hidden rounded-3xl border border-line bg-card shadow-[var(--shadow-soft)] transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-brand/45 hover:shadow-[var(--shadow-lift)] ${
          isList ? "flex-col sm:flex-row" : "flex-col"
        }`}
      >
        {/* Image area */}
        <div
          className={`relative overflow-hidden bg-mist ${
            isList ? "aspect-[4/3] sm:aspect-auto sm:w-64 sm:shrink-0" : "aspect-[3/4]"
          }`}
        >
          {/* Stretched link: an empty overlay anchor covering the image. */}
          <NavLink
            href={`/products/${product.slug}`}
            aria-label={`View ${product.name}`}
            className="absolute inset-0 z-10"
          />

          {/* Primary image zooms, secondary fades in beneath the cursor */}
          <Image
            src={product.images[0]}
            alt={`${product.name}, ${product.subtitle}`}
            fill
            priority={priority}
            loading={priority ? undefined : "lazy"}
            sizes={
              isList
                ? "(max-width: 640px) 100vw, 256px"
                : "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            }
            className="object-cover transition-all duration-700 ease-out group-hover:scale-[1.07] group-hover:opacity-0"
          />
          <Image
            src={product.images[1] ?? product.images[0]}
            alt=""
            aria-hidden="true"
            fill
            loading="lazy"
            sizes={
              isList
                ? "(max-width: 640px) 100vw, 256px"
                : "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            }
            className="scale-105 object-cover opacity-0 transition-all duration-700 ease-out group-hover:scale-100 group-hover:opacity-100"
          />

          {/* Badges */}
          <div className="pointer-events-none absolute left-3 top-3 z-20 flex flex-col items-start gap-2">
            {badge ? (
              <span
                className={`animate-fade-up rounded-full px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider shadow-sm ${BADGE_STYLES[badge].className}`}
              >
                {BADGE_STYLES[badge].label}
              </span>
            ) : null}
            {discount > 0 && badge !== "sale" ? (
              <span className="rounded-full bg-white/95 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-sale shadow-sm backdrop-blur">
                {discount} percent off
              </span>
            ) : null}
          </div>

          {/* Wishlist */}
          <button
            type="button"
            onClick={() => wishlist.toggle(product.id)}
            aria-label={wished ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
            aria-pressed={wished}
            className={`absolute right-3 top-3 z-20 grid h-10 w-10 place-items-center rounded-full border border-line bg-white/95 shadow-sm backdrop-blur transition-all duration-300 hover:scale-110 hover:border-brand active:scale-95 ${
              wished ? "text-sale" : "text-slate hover:text-brand"
            }`}
          >
            <Icon
              name="heart"
              size={17}
              filled={wished}
              className={wished ? "animate-pop" : ""}
            />
          </button>

          {/* Quick view slides up on hover, stays visible on touch screens */}
          <button
            type="button"
            onClick={() => setQuickView(true)}
            className="absolute inset-x-3 bottom-3 z-20 hidden h-10 translate-y-3 items-center justify-center gap-2 rounded-full bg-white/95 text-sm font-semibold text-ink opacity-0 shadow-md backdrop-blur transition-all duration-300 hover:bg-white group-hover:translate-y-0 group-hover:opacity-100 sm:flex"
          >
            <Icon name="eye" size={16} />
            Quick View
          </button>

          {outOfStock ? (
            <span className="absolute inset-0 z-20 grid place-items-center bg-white/75 text-sm font-bold uppercase tracking-[0.2em] text-ink backdrop-blur-sm">
              Sold Out
            </span>
          ) : null}
        </div>

        {/* Details */}
        <div className={`flex flex-1 flex-col p-5 ${isList ? "sm:p-6" : ""}`}>
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-brand">
            {subcategoryLabel(product.subcategory)}
          </p>

          <h3 className="mt-2 font-display text-[1.05rem] font-semibold leading-snug text-ink">
            <NavLink
              href={`/products/${product.slug}`}
              className="transition-colors hover:text-brand"
            >
              {product.name}
            </NavLink>
          </h3>

          <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted">
            {isList ? product.shortDescription : product.subtitle}
          </p>

          {/* Rating */}
          <div className="mt-3 flex items-center gap-2">
            <span className="flex items-center gap-0.5" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((index) => (
                <Icon
                  key={index}
                  name="star"
                  size={13}
                  filled={index < Math.round(product.rating)}
                  className={index < Math.round(product.rating) ? "text-amber-400" : "text-line-strong"}
                />
              ))}
            </span>
            <span className="text-xs font-medium text-ink">{product.rating.toFixed(1)}</span>
            <span className="text-xs text-muted">({product.reviewCount})</span>
          </div>

          {/* Color swatches and size preview */}
          <div className="mt-4 flex items-center justify-between gap-3">
            <ul className="flex items-center gap-1.5" aria-label="Available colors">
              {product.colors.slice(0, 4).map((color) => (
                <li key={color.name}>
                  <span
                    title={color.name}
                    className="block h-4 w-4 rounded-full border border-line-strong transition-transform duration-300 hover:scale-125"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span className="sr-only">{color.name}</span>
                </li>
              ))}
              {product.colors.length > 4 ? (
                <li className="text-[0.68rem] font-medium text-muted">
                  plus {product.colors.length - 4}
                </li>
              ) : null}
            </ul>

            <p className="truncate text-[0.68rem] font-medium uppercase tracking-wider text-muted">
              {product.sizes.slice(0, 4).join(" ")}
            </p>
          </div>

          {/* Price */}
          <div className="mt-4 flex flex-wrap items-baseline gap-2">
            <span className="font-display text-xl font-bold text-ink">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice ? (
              <>
                <span className="text-sm text-muted line-through">
                  {formatPrice(product.originalPrice)}
                </span>
                <span className="text-xs font-semibold text-sale">
                  Save {formatPrice(product.originalPrice - product.price)}
                </span>
              </>
            ) : null}
          </div>

          {/* Actions */}
          <div className="mt-auto pt-5">
            <button
              type="button"
              onClick={handleAdd}
              disabled={outOfStock}
              aria-label={`Add ${product.name} to cart`}
              className={`inline-flex h-11 w-full items-center justify-center gap-2 rounded-full text-sm font-semibold transition-all duration-300 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 ${
                added
                  ? "bg-success text-white"
                  : "bg-night text-white hover:bg-brand hover:shadow-[0_10px_26px_-12px_rgba(13,127,242,0.9)]"
              }`}
            >
              <Icon name={added ? "check" : "cart"} size={16} />
              {added ? "Added to Cart" : outOfStock ? "Sold Out" : "Add to Cart"}
            </button>
          </div>
        </div>
      </article>

      {quickView ? (
        <QuickViewModal product={product} onClose={() => setQuickView(false)} />
      ) : null}
    </>
  );
}
