"use client";

import { useRouter } from "next/navigation";
import { useState, useSyncExternalStore } from "react";

import { SizeGuide } from "@/components/product/SizeGuide";
import { Icon } from "@/components/ui/Icon";
import { QuantitySelector } from "@/components/ui/QuantitySelector";
import { Rating } from "@/components/ui/Rating";
import { subcategoryLabel } from "@/lib/categories";
import { useCart } from "@/lib/cart-context";
import { calcDiscount, deliveryWindow, formatPrice } from "@/lib/format";
import { useWishlist } from "@/lib/wishlist-context";
import type { Product } from "@/lib/types";

/* The delivery estimate depends on today's date, and these pages are
   prerendered. The build time value is passed in and used for the first
   paint so hydration matches exactly, then the live value takes over. */
const subscribeToClock = () => () => {};
function currentDeliveryWindow(): string {
  return deliveryWindow(new Date().toISOString());
}

interface ProductPurchasePanelProps {
  product: Product;
  /** Delivery window calculated on the server, used as the hydration value. */
  deliveryEstimate: string;
}

/**
 * The full buying column: identity, price, options and the two purchase
 * actions. Sticky on large screens so the controls stay reachable while the
 * customer reads the detail sections below.
 */
export function ProductPurchasePanel({
  product,
  deliveryEstimate,
}: ProductPurchasePanelProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const wishlist = useWishlist();

  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0].name);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  const estimate = useSyncExternalStore(
    subscribeToClock,
    currentDeliveryWindow,
    () => deliveryEstimate,
  );

  const discount = product.discount ?? calcDiscount(product.price, product.originalPrice);
  const saving = product.originalPrice ? product.originalPrice - product.price : 0;
  const outOfStock = product.stock <= 0;
  const limited = !outOfStock && (product.limitedStock || product.stock <= 10);
  const wished = wishlist.has(product.id);

  function add() {
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
  }

  function handleAddToCart() {
    if (outOfStock) return;
    add();
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2200);
  }

  function handleBuyNow() {
    if (outOfStock) return;
    add();
    router.push("/checkout");
  }

  return (
    <div className="lg:sticky lg:top-28">
      {/* Identity */}
      <p className="flex flex-wrap items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-brand">
        {subcategoryLabel(product.subcategory)}
        <span aria-hidden="true" className="text-line-strong">
          /
        </span>
        <span className="capitalize text-muted">{product.category}</span>
      </p>

      <h1 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-ink sm:text-[2.5rem] sm:leading-[1.12]">
        {product.name}
      </h1>

      <p className="mt-3 text-base leading-relaxed text-slate">{product.subtitle}</p>

      <div className="mt-4">
        <Rating value={product.rating} reviewCount={product.reviewCount} size={17} />
      </div>

      {/* Pricing */}
      <div className="mt-6 flex flex-wrap items-baseline gap-3">
        <span className="font-display text-4xl font-bold text-ink">
          {formatPrice(product.price)}
        </span>
        {product.originalPrice ? (
          <>
            <span className="text-lg text-muted line-through">
              {formatPrice(product.originalPrice)}
            </span>
            <span className="rounded-full bg-brand-tint px-3 py-1 text-xs font-semibold text-brand-deep">
              {discount} percent off
            </span>
            <span className="text-sm font-semibold text-sale">
              You save {formatPrice(saving)}
            </span>
          </>
        ) : null}
      </div>

      {/* Stock and delivery */}
      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
        {outOfStock ? (
          <span className="inline-flex items-center gap-1.5 font-semibold text-sale">
            <Icon name="close" size={15} />
            Out of stock
          </span>
        ) : limited ? (
          <span className="inline-flex items-center gap-1.5 font-semibold text-amber-600">
            <Icon name="bolt" size={15} />
            {`Limited stock, only ${product.stock} left`}
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 font-semibold text-success">
            <Icon name="checkCircle" size={15} />
            In stock and ready to ship
          </span>
        )}

        <span className="inline-flex items-center gap-1.5 text-slate">
          <Icon name="truck" size={15} className="text-brand" />
          {`Arrives ${estimate}`}
        </span>
      </div>

      <hr className="my-7 border-line" />

      {/* Colors */}
      <fieldset>
        <legend className="mb-3 text-sm font-semibold text-ink">
          Color: <span className="font-normal text-slate">{color}</span>
        </legend>
        <div className="flex flex-wrap gap-3">
          {product.colors.map((option) => (
            <button
              key={option.name}
              type="button"
              onClick={() => setColor(option.name)}
              aria-pressed={color === option.name}
              aria-label={option.name}
              title={option.name}
              className={`grid h-11 w-11 place-items-center rounded-full border transition-all duration-300 hover:scale-105 ${
                color === option.name
                  ? "border-brand ring-2 ring-brand/25"
                  : "border-line-strong hover:border-brand"
              }`}
            >
              <span
                className="block h-7 w-7 rounded-full border border-black/5"
                style={{ backgroundColor: option.hex }}
              />
            </button>
          ))}
        </div>
      </fieldset>

      {/* Sizes */}
      <fieldset className="mt-7">
        <legend className="mb-3 flex w-full items-center justify-between gap-4">
          <span className="text-sm font-semibold text-ink">
            Size: <span className="font-normal text-slate">{size}</span>
          </span>
          <button
            type="button"
            onClick={() => setSizeGuideOpen(true)}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-all hover:gap-2 hover:text-brand-deep"
          >
            <Icon name="ruler" size={15} />
            Size Guide
          </button>
        </legend>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setSize(option)}
              aria-pressed={size === option}
              className={`h-11 rounded-full border px-5 text-sm font-semibold transition-all duration-300 ${
                size === option
                  ? "border-brand bg-brand-tint text-brand-deep"
                  : "border-line-strong bg-canvas text-slate hover:border-brand hover:text-brand"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Quantity */}
      <div className="mt-7">
        <p className="mb-3 text-sm font-semibold text-ink">Quantity</p>
        <QuantitySelector
          value={quantity}
          onChange={setQuantity}
          max={Math.max(1, product.stock)}
        />
      </div>

      {/* Actions */}
      <div className="mt-7 flex flex-col gap-3">
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={outOfStock}
            className={`inline-flex h-13 flex-1 items-center justify-center gap-2 rounded-full text-sm font-semibold text-white transition-all duration-300 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 ${
              added
                ? "bg-success"
                : "bg-night hover:bg-brand hover:shadow-[0_12px_30px_-14px_rgba(13,127,242,0.95)]"
            }`}
          >
            <Icon name={added ? "check" : "cart"} size={18} />
            {added ? "Added to Cart" : outOfStock ? "Out of Stock" : "Add to Cart"}
          </button>

          <button
            type="button"
            onClick={() => wishlist.toggle(product.id)}
            aria-pressed={wished}
            aria-label={
              wished
                ? `Remove ${product.name} from your wishlist`
                : `Save ${product.name} to your wishlist`
            }
            className={`grid h-13 w-13 shrink-0 place-items-center rounded-full border transition-all duration-300 hover:scale-105 active:scale-95 ${
              wished
                ? "border-sale bg-sale/10 text-sale"
                : "border-line-strong bg-canvas text-slate hover:border-brand hover:text-brand"
            }`}
          >
            <Icon
              name="heart"
              size={19}
              filled={wished}
              className={wished ? "animate-pop" : ""}
            />
          </button>
        </div>

        <button
          type="button"
          onClick={handleBuyNow}
          disabled={outOfStock}
          className="inline-flex h-13 w-full items-center justify-center gap-2 rounded-full border border-line-strong bg-canvas text-sm font-semibold text-ink transition-all duration-300 hover:border-brand hover:text-brand active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Buy Now
          <Icon name="arrowRight" size={17} />
        </button>
      </div>

      {/* Payment reassurance */}
      <div className="mt-6 flex items-start gap-3 rounded-2xl border border-line bg-brand-tint px-5 py-4">
        <Icon name="wallet" size={20} className="mt-0.5 shrink-0 text-brand-deep" />
        <div>
          <p className="text-sm font-semibold text-ink">Cash on Delivery available</p>
          <p className="mt-1 text-xs leading-relaxed text-slate">
            Pay the carrier in cash when your package arrives. No advance payment
            and no card details are needed to place the order.
          </p>
        </div>
      </div>

      {/* Trust row */}
      <ul className="mt-5 grid grid-cols-3 gap-3 text-center">
        {[
          { icon: "truck" as const, label: "Free shipping over $75" },
          { icon: "refresh" as const, label: "30 day easy returns" },
          { icon: "shield" as const, label: "Secure checkout" },
        ].map((item) => (
          <li
            key={item.label}
            className="rounded-2xl border border-line bg-mist px-3 py-4"
          >
            <Icon name={item.icon} size={18} className="mx-auto text-brand" />
            <p className="mt-2 text-[0.7rem] font-medium leading-snug text-slate">
              {item.label}
            </p>
          </li>
        ))}
      </ul>

      {sizeGuideOpen ? (
        <SizeGuide product={product} onClose={() => setSizeGuideOpen(false)} />
      ) : null}
    </div>
  );
}
