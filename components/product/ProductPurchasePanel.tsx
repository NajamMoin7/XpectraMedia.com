"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Icon } from "@/components/ui/Icon";
import { QuantitySelector } from "@/components/ui/QuantitySelector";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/lib/types";

/**
 * Size, colour and quantity selection plus the two purchase actions.
 * Buy Now adds the line and moves straight to checkout.
 */
export function ProductPurchasePanel({ product }: { product: Product }) {
  const router = useRouter();
  const { addItem } = useCart();

  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0].name);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const outOfStock = product.stock <= 0;
  const lowStock = product.stock > 0 && product.stock <= 10;

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
    <div className="space-y-7">
      {/* Sizes */}
      <fieldset>
        <legend className="mb-3 flex items-center justify-between text-sm font-semibold text-white">
          <span>Available Sizes</span>
          <span className="text-xs font-normal text-mist">Selected: {size}</span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setSize(option)}
              aria-pressed={size === option}
              className={`h-11 rounded-full border px-5 text-sm font-medium transition-all duration-300 ${
                size === option
                  ? "border-brand bg-brand/15 text-white shadow-[0_0_0_1px_rgba(30,144,255,0.5)]"
                  : "border-line bg-surface-2 text-mist hover:border-brand/60 hover:text-white"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Colours */}
      <fieldset>
        <legend className="mb-3 flex items-center justify-between text-sm font-semibold text-white">
          <span>Available Colours</span>
          <span className="text-xs font-normal text-mist">Selected: {color}</span>
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
              className={`grid h-11 w-11 place-items-center rounded-full border transition-all duration-300 ${
                color === option.name
                  ? "border-brand shadow-[0_0_0_2px_rgba(30,144,255,0.35)]"
                  : "border-line hover:border-mist"
              }`}
            >
              <span
                className="grid h-7 w-7 place-items-center rounded-full"
                style={{ backgroundColor: option.hex }}
              >
                {color === option.name ? (
                  <Icon
                    name="check"
                    size={14}
                    className="text-black mix-blend-difference"
                  />
                ) : null}
              </span>
            </button>
          ))}
        </div>
      </fieldset>

      {/* Quantity */}
      <div>
        <p className="mb-3 text-sm font-semibold text-white">Quantity</p>
        <div className="flex flex-wrap items-center gap-4">
          <QuantitySelector
            value={quantity}
            onChange={setQuantity}
            max={Math.max(1, product.stock)}
          />
          {lowStock ? (
            <span className="text-xs font-medium text-amber-400">
              Only {product.stock} left in stock
            </span>
          ) : null}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={outOfStock}
          className={`inline-flex h-13 flex-1 items-center justify-center gap-2 rounded-full text-sm font-semibold transition-all duration-300 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 ${
            added
              ? "bg-emerald-500 text-white"
              : "bg-gradient-to-r from-brand-deep via-brand to-brand-bright text-white shadow-[0_12px_32px_-14px_rgba(30,144,255,1)] hover:brightness-110"
          }`}
        >
          <Icon name={added ? "check" : "cart"} size={18} />
          {added ? "Added to Cart" : outOfStock ? "Out of Stock" : "Add to Cart"}
        </button>

        <button
          type="button"
          onClick={handleBuyNow}
          disabled={outOfStock}
          className="inline-flex h-13 flex-1 items-center justify-center gap-2 rounded-full border border-line bg-surface-2 text-sm font-semibold text-white transition-all duration-300 hover:border-brand hover:text-brand-bright active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Buy Now
          <Icon name="arrowRight" size={17} />
        </button>
      </div>

      {/* Payment reassurance */}
      <div className="flex items-start gap-3 rounded-2xl border border-brand/30 bg-brand/8 px-5 py-4">
        <Icon name="wallet" size={20} className="mt-0.5 shrink-0 text-brand" />
        <div>
          <p className="text-sm font-semibold text-white">Cash on Delivery</p>
          <p className="mt-1 text-xs leading-relaxed text-mist">
            Pay the courier in cash when your parcel arrives. No advance
            payment and no card details are needed.
          </p>
        </div>
      </div>
    </div>
  );
}
