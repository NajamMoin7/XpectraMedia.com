"use client";

import Image from "next/image";
import type { ReactNode } from "react";

import { Icon } from "@/components/ui/Icon";
import { cartLineKey, formatPrice } from "@/lib/format";
import { FREE_DELIVERY_THRESHOLD } from "@/lib/site";
import type { CartItem } from "@/lib/types";

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  delivery: number;
  total: number;
  /** Lists every product with its quantity above the totals. */
  showItems?: boolean;
  /** Slot for the primary action, normally a button. */
  children?: ReactNode;
  className?: string;
}

/**
 * Totals panel shared by the cart and the checkout. It also nudges the
 * customer when a small extra spend would unlock free delivery.
 */
export function OrderSummary({
  items,
  subtotal,
  delivery,
  total,
  showItems = false,
  children,
  className = "",
}: OrderSummaryProps) {
  const shortfall = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
  const qualifiesForFreeDelivery = subtotal > 0 && shortfall === 0;
  const unitCount = items.reduce((count, item) => count + item.quantity, 0);

  return (
    <aside
      aria-label="Order summary"
      className={`rounded-2xl border border-line-soft bg-surface p-6 sm:p-7 ${className}`}
    >
      <h2 className="font-display text-lg font-bold tracking-tight text-white sm:text-xl">
        Order Summary
      </h2>
      <p className="mt-1.5 text-sm text-mist">
        {unitCount === 1 ? "1 item in your order" : `${unitCount} items in your order`}
      </p>

      {showItems && items.length > 0 ? (
        <ul className="mt-6 space-y-4 border-t border-line-soft pt-6">
          {items.map((item) => (
            <li key={cartLineKey(item)} className="flex items-start gap-3">
              <span className="relative h-16 w-14 shrink-0 overflow-hidden rounded-lg border border-line-soft bg-surface-2">
                <Image
                  src={item.image}
                  alt={`${item.name} in ${item.color}, size ${item.size}`}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
                <span className="absolute right-0 top-0 grid h-5 min-w-5 place-items-center rounded-bl-lg bg-brand px-1 text-[0.65rem] font-bold text-white">
                  {item.quantity}
                </span>
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-white">
                  {item.name}
                </span>
                <span className="mt-1 block text-xs text-mist-dim">
                  Size {item.size}, {item.color}
                </span>
              </span>
              <span className="shrink-0 text-sm font-semibold tabular-nums text-white">
                {formatPrice(item.price * item.quantity)}
              </span>
            </li>
          ))}
        </ul>
      ) : null}

      <dl className="mt-6 space-y-3 border-t border-line-soft pt-6 text-sm">
        <div className="flex items-center justify-between gap-4">
          <dt className="text-mist">Subtotal</dt>
          <dd className="font-semibold tabular-nums text-white">
            {formatPrice(subtotal)}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="text-mist">Estimated delivery charges</dt>
          <dd
            className={`font-semibold tabular-nums ${
              delivery === 0 ? "text-emerald-400" : "text-white"
            }`}
          >
            {delivery === 0 ? "Free" : formatPrice(delivery)}
          </dd>
        </div>
      </dl>

      <div className="mt-5 flex items-baseline justify-between gap-4 border-t border-line pt-5">
        <span className="font-display text-base font-semibold text-white">Total</span>
        <span className="font-display text-2xl font-bold tabular-nums text-white">
          {formatPrice(total)}
        </span>
      </div>

      {subtotal > 0 && shortfall > 0 ? (
        <p className="mt-5 flex items-start gap-2.5 rounded-xl border border-brand/35 bg-brand/10 px-4 py-3 text-xs leading-relaxed text-mist">
          <Icon name="truck" size={16} className="mt-0.5 shrink-0 text-brand-bright" />
          <span>
            Add {formatPrice(shortfall)} more to your cart and your delivery
            becomes free. Free delivery applies on every order of{" "}
            {formatPrice(FREE_DELIVERY_THRESHOLD)} and above.
          </span>
        </p>
      ) : null}

      {qualifiesForFreeDelivery ? (
        <p className="mt-5 flex items-start gap-2.5 rounded-xl border border-emerald-500/35 bg-emerald-500/10 px-4 py-3 text-xs leading-relaxed text-mist">
          <Icon name="checkCircle" size={16} className="mt-0.5 shrink-0 text-emerald-400" />
          <span>
            Your order qualifies for free delivery anywhere in Pakistan.
          </span>
        </p>
      ) : null}

      {children ? <div className="mt-6">{children}</div> : null}

      <p className="mt-5 flex items-center justify-center gap-2 text-xs text-mist-dim">
        <Icon name="wallet" size={14} className="text-brand" />
        Cash on Delivery available nationwide
      </p>
    </aside>
  );
}
