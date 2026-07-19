"use client";

import { useState } from "react";

import { CartItemRow } from "@/components/cart/CartItemRow";
import { OrderSummary } from "@/components/cart/OrderSummary";
import { Button } from "@/components/ui/Button";
import { EmptyState, Skeleton } from "@/components/ui/Feedback";
import { Icon } from "@/components/ui/Icon";
import { useCart } from "@/lib/cart-context";
import { cartLineKey } from "@/lib/format";

/** Placeholder shown until the stored cart has been read from the browser. */
function CartSkeleton() {
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] xl:grid-cols-[minmax(0,1fr)_24rem]">
      <div className="rounded-2xl border border-line-soft bg-surface">
        {[0, 1, 2].map((row) => (
          <div
            key={row}
            className="flex flex-col gap-5 border-b border-line-soft p-5 last:border-b-0 sm:flex-row sm:items-center sm:gap-6 sm:p-6"
          >
            <Skeleton className="h-28 w-24 shrink-0 sm:h-32 sm:w-28" />
            <div className="flex-1 space-y-3">
              <Skeleton className="h-4 w-3/5" />
              <Skeleton className="h-6 w-40 rounded-full" />
              <Skeleton className="h-3 w-32" />
            </div>
            <div className="space-y-3 sm:w-36">
              <Skeleton className="h-9 w-32 rounded-full" />
              <Skeleton className="h-5 w-24" />
            </div>
          </div>
        ))}
      </div>
      <div className="space-y-4 rounded-2xl border border-line-soft bg-surface p-6">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-3 w-28" />
        <Skeleton className="h-px w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-12 w-full rounded-full" />
      </div>
    </div>
  );
}

/**
 * Interactive shopping cart. Persistence is handled by the cart provider,
 * so this view only reads state and calls the provider methods.
 */
export function CartView() {
  const { items, hydrated, count, subtotal, delivery, total, clearCart } = useCart();
  const [confirmingClear, setConfirmingClear] = useState(false);

  if (!hydrated) {
    return <CartSkeleton />;
  }

  if (items.length === 0) {
    return (
      <EmptyState
        icon="cart"
        title="Your cart is empty"
        description="You have not added anything yet. Browse our men, women and kids collections to find clothing, baby wear and toys, then add your favourites here."
        action={{ label: "Start Shopping", href: "/products" }}
        secondaryAction={{ label: "Return to Home", href: "/" }}
      />
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] xl:grid-cols-[minmax(0,1fr)_24rem]">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-lg font-bold tracking-tight text-white sm:text-xl">
            {count === 1 ? "1 item in your cart" : `${count} items in your cart`}
          </h2>

          {confirmingClear ? (
            <div
              role="group"
              aria-label="Confirm removing every item"
              className="flex flex-wrap items-center gap-2 rounded-full border border-line bg-surface-2 px-3 py-1.5"
            >
              <span className="text-xs text-mist">Remove everything?</span>
              <button
                type="button"
                onClick={() => {
                  clearCart();
                  setConfirmingClear(false);
                }}
                className="rounded-full bg-red-500/90 px-3 py-1 text-xs font-semibold text-white transition-colors hover:bg-red-500"
              >
                Yes, clear cart
              </button>
              <button
                type="button"
                onClick={() => setConfirmingClear(false)}
                className="rounded-full px-3 py-1 text-xs font-semibold text-mist transition-colors hover:text-white"
              >
                Keep items
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmingClear(true)}
              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface-2 px-4 py-2 text-xs font-semibold text-mist transition-colors hover:border-red-500/60 hover:text-red-400"
            >
              <Icon name="trash" size={14} />
              Clear Cart
            </button>
          )}
        </div>

        <ul className="mt-5 overflow-hidden rounded-2xl border border-line-soft bg-surface">
          {items.map((item) => (
            <CartItemRow key={cartLineKey(item)} item={item} />
          ))}
        </ul>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button href="/products" variant="outline" size="lg">
            <Icon name="arrowLeft" size={16} />
            Continue Shopping
          </Button>
          <p className="text-xs leading-relaxed text-mist-dim sm:ml-2">
            Sizes and colours can be changed by removing a line and adding the
            product again from its page.
          </p>
        </div>
      </div>

      <div className="lg:sticky lg:top-24 lg:self-start">
        <OrderSummary items={items} subtotal={subtotal} delivery={delivery} total={total}>
          <Button href="/checkout" size="lg" fullWidth>
            Proceed to Checkout
            <Icon name="arrowRight" size={16} />
          </Button>
        </OrderSummary>
      </div>
    </div>
  );
}
