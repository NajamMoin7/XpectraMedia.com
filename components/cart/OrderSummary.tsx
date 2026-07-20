"use client";

import Image from "next/image";
import type { ReactNode } from "react";

import { Icon } from "@/components/ui/Icon";
import { CUSTOM_PRODUCT_POLICY } from "@/lib/custom-shirt";
import { amountToFreeShipping, cartLineKey, formatPrice } from "@/lib/format";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/site";
import type { CartItem } from "@/lib/types";

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  /** Lists every product with its quantity above the totals. */
  showItems?: boolean;
  /** Renders the free shipping progress bar, used on the cart page. */
  showProgress?: boolean;
  /** Slot for the primary action, normally a button. */
  children?: ReactNode;
  className?: string;
}

/**
 * Totals panel shared by the cart and the checkout. It also nudges the
 * customer when a small extra spend would unlock free standard shipping.
 */
export function OrderSummary({
  items,
  subtotal,
  shipping,
  total,
  showItems = false,
  showProgress = false,
  children,
  className = "",
}: OrderSummaryProps) {
  const remaining = amountToFreeShipping(subtotal);
  const qualifies = subtotal > 0 && remaining === 0;
  const unitCount = items.reduce((count, item) => count + item.quantity, 0);
  const hasCustom = items.some((item) => Boolean(item.custom));
  const progress = Math.min(
    100,
    Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100),
  );

  return (
    <aside
      aria-label="Order summary"
      className={`rounded-3xl border border-line bg-card p-6 shadow-[var(--shadow-soft)] sm:p-7 ${className}`}
    >
      <h2 className="font-display text-lg font-bold tracking-tight text-ink sm:text-xl">
        Order Summary
      </h2>
      <p className="mt-1.5 text-sm text-slate">
        {unitCount === 1 ? "1 item in your order" : `${unitCount} items in your order`}
      </p>

      {showItems && items.length > 0 ? (
        <ul className="mt-6 space-y-4 border-t border-line pt-6">
          {items.map((item) => (
            <li key={cartLineKey(item)} className="flex items-start gap-3">
              <span className="relative h-16 w-14 shrink-0 overflow-hidden rounded-xl border border-line bg-mist">
                <Image
                  src={item.image}
                  alt={`${item.name} in ${item.color}, size ${item.size}`}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
                <span className="absolute right-0 top-0 grid h-5 min-w-5 place-items-center rounded-bl-xl bg-brand px-1 text-[0.65rem] font-bold text-white">
                  {item.quantity}
                </span>
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-ink">
                  {item.name}
                </span>
                <span className="mt-1 block text-xs text-muted">
                  Size {item.size}, {item.color}
                </span>
                {item.custom ? (
                  <span className="mt-1.5 inline-flex items-center gap-1 rounded-full border border-brand/30 bg-brand-tint px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wide text-brand-deep">
                    <Icon name="sparkle" size={11} />
                    Custom Product
                  </span>
                ) : null}
              </span>
              <span className="shrink-0 text-sm font-semibold tabular-nums text-ink">
                {formatPrice(item.price * item.quantity)}
              </span>
            </li>
          ))}
        </ul>
      ) : null}

      <dl className="mt-6 space-y-3 border-t border-line pt-6 text-sm">
        <div className="flex items-center justify-between gap-4">
          <dt className="text-slate">Subtotal</dt>
          <dd className="font-semibold tabular-nums text-ink">
            {formatPrice(subtotal)}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="text-slate">Standard shipping</dt>
          <dd
            className={`font-semibold tabular-nums ${
              shipping === 0 ? "text-success" : "text-ink"
            }`}
          >
            {shipping === 0 ? "Free" : formatPrice(shipping)}
          </dd>
        </div>
      </dl>

      <div className="mt-5 flex items-baseline justify-between gap-4 border-t border-line-strong pt-5">
        <span className="font-display text-base font-semibold text-ink">Total</span>
        <span className="font-display text-2xl font-bold tabular-nums text-ink">
          {formatPrice(total)}
        </span>
      </div>

      {showProgress && subtotal > 0 ? (
        <div className="mt-6 rounded-2xl border border-line bg-mist p-4">
          {qualifies ? (
            <p className="flex items-start gap-2.5 text-xs font-medium leading-relaxed text-success">
              <Icon name="checkCircle" size={16} className="mt-0.5 shrink-0" />
              <span>
                Great news, your order ships free. Standard shipping is on us on
                every order of {formatPrice(FREE_SHIPPING_THRESHOLD)} and above.
              </span>
            </p>
          ) : (
            <p className="flex items-start gap-2.5 text-xs leading-relaxed text-slate">
              <Icon name="truck" size={16} className="mt-0.5 shrink-0 text-brand" />
              <span>
                You are{" "}
                <strong className="font-semibold text-ink">
                  {formatPrice(remaining)}
                </strong>{" "}
                away from free standard shipping.
              </span>
            </p>
          )}

          <div
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
            aria-label="Progress toward free shipping"
            className="mt-3 h-2 w-full overflow-hidden rounded-full bg-line"
          >
            <div
              className={`h-full rounded-full transition-[width] duration-700 ease-out ${
                qualifies ? "bg-success" : "bg-gradient-to-r from-brand-deep to-brand"
              }`}
              style={{ width: `${Math.max(progress, 4)}%` }}
            />
          </div>
        </div>
      ) : null}

      {hasCustom ? (
        <div className="mt-6 rounded-2xl border border-brand/25 bg-brand-tint p-4">
          <p className="flex items-center gap-2 font-display text-sm font-semibold text-ink">
            <Icon name="sparkle" size={15} className="shrink-0 text-brand" />
            Custom Product Policy
          </p>
          <p className="mt-2 text-xs leading-relaxed text-slate">
            {CUSTOM_PRODUCT_POLICY}
          </p>
        </div>
      ) : null}

      {children ? <div className="mt-6">{children}</div> : null}

      <p className="mt-5 flex items-center justify-center gap-2 text-xs font-medium text-muted">
        <Icon name="lock" size={14} className="text-brand" />
        Secure checkout with easy returns
      </p>
    </aside>
  );
}
