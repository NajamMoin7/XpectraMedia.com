"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";
import { EmptyState, PageLoader } from "@/components/ui/Feedback";
import { Icon } from "@/components/ui/Icon";
import { cartLineKey, deliveryWindow, formatDate, formatPrice } from "@/lib/format";
import { STORAGE_KEYS, site } from "@/lib/site";
import type { OrderDetails } from "@/lib/types";

/** Reads the stored order, discarding anything that is not a usable record. */
function readStoredOrder(): OrderDetails | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.lastOrder);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    const candidate = parsed as Partial<OrderDetails> | null;
    if (
      !candidate ||
      typeof candidate.orderNumber !== "string" ||
      typeof candidate.placedAt !== "string" ||
      !Array.isArray(candidate.items)
    ) {
      return null;
    }
    return candidate as OrderDetails;
  } catch {
    return null;
  }
}

/** One labelled row inside the delivery information card. */
function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 border-b border-line-soft py-3 last:border-b-0 sm:flex-row sm:items-start sm:gap-6">
      <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-mist-dim sm:w-40 sm:shrink-0">
        {label}
      </dt>
      <dd className="text-sm leading-relaxed text-white">{value}</dd>
    </div>
  );
}

/**
 * Confirmation screen for the most recent order. The order is read back from
 * localStorage, since the storefront has no backend to query.
 */
export function OrderConfirmationView() {
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loaded, setLoaded] = useState(false);

  // A one time read after mount. The order cannot be read during render
  // because the server has no access to localStorage, and reading it there
  // would produce markup that does not match the client.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOrder(readStoredOrder());
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <PageLoader label="Loading your order confirmation" />;
  }

  if (!order) {
    return (
      <EmptyState
        icon="search"
        title="We could not find a recent order"
        description="There is no order saved in this browser yet. If you have just placed one, it may have been opened on another device. Start a new order any time, or contact our support team for help."
        action={{ label: "Browse Products", href: "/products" }}
        secondaryAction={{ label: "Contact Support", href: "/contact" }}
      />
    );
  }

  const unitCount = order.items.reduce((count, item) => count + item.quantity, 0);

  return (
    <div className="mx-auto max-w-4xl">
      {/* Success header */}
      <div className="rounded-2xl border border-emerald-500/35 bg-emerald-500/10 p-7 text-center sm:p-10">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-emerald-400/50 bg-emerald-500/15">
          <Icon name="checkCircle" size={30} className="text-emerald-400" />
        </span>
        <h2 className="mt-6 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Your order is placed
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-mist">
          Thank you, {order.fullName}. We have received your order and our
          packing team is already on it. A confirmation has been sent to{" "}
          {order.email}, and our team will call you on {order.phone} to confirm
          the delivery.
        </p>

        <div className="mx-auto mt-7 inline-flex flex-col items-center rounded-2xl border border-line bg-surface px-7 py-5">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-mist-dim">
            Your order number
          </span>
          <strong className="mt-2 font-display text-2xl font-bold tracking-[0.12em] text-brand-bright sm:text-3xl">
            {order.orderNumber}
          </strong>
          <span className="mt-2 text-xs text-mist-dim">
            Placed on {formatDate(order.placedAt)}
          </span>
        </div>

        <p className="mt-5 text-xs leading-relaxed text-mist-dim">
          Please keep this order number safe. Quote it whenever you contact us
          about this order.
        </p>
      </div>

      {/* Delivery information */}
      <section
        aria-labelledby="confirmation-delivery-heading"
        className="mt-8 rounded-2xl border border-line-soft bg-surface p-6 sm:p-8"
      >
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-surface-2 text-brand">
            <Icon name="truck" size={20} />
          </span>
          <h2
            id="confirmation-delivery-heading"
            className="font-display text-lg font-bold tracking-tight text-white sm:text-xl"
          >
            Delivery Information
          </h2>
        </div>

        <dl className="mt-6">
          <DetailRow label="Customer name" value={order.fullName} />
          <DetailRow label="Phone number" value={order.phone} />
          {order.altPhone ? (
            <DetailRow label="Alternative phone" value={order.altPhone} />
          ) : null}
          <DetailRow label="Delivery address" value={order.address} />
          <DetailRow label="City" value={order.city} />
          <DetailRow label="Province" value={order.province} />
          {order.landmark ? (
            <DetailRow label="Nearby landmark" value={order.landmark} />
          ) : null}
          {order.postalCode ? (
            <DetailRow label="Postal code" value={order.postalCode} />
          ) : null}
          {order.notes ? <DetailRow label="Order notes" value={order.notes} /> : null}
        </dl>

        <p className="mt-6 flex items-start gap-2.5 rounded-xl border border-brand/35 bg-brand/10 px-4 py-3 text-sm leading-relaxed text-mist">
          <Icon name="clock" size={16} className="mt-0.5 shrink-0 text-brand-bright" />
          <span>
            Estimated delivery between{" "}
            <strong className="font-semibold text-white">
              {deliveryWindow(order.placedAt)}
            </strong>
            . You will receive a tracking reference by SMS as soon as your parcel
            leaves our warehouse.
          </span>
        </p>
      </section>

      {/* Order summary */}
      <section
        aria-labelledby="confirmation-summary-heading"
        className="mt-6 rounded-2xl border border-line-soft bg-surface p-6 sm:p-8"
      >
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-surface-2 text-brand">
            <Icon name="cart" size={20} />
          </span>
          <div>
            <h2
              id="confirmation-summary-heading"
              className="font-display text-lg font-bold tracking-tight text-white sm:text-xl"
            >
              Order Summary
            </h2>
            <p className="text-sm text-mist">
              {unitCount === 1 ? "1 item" : `${unitCount} items`}
            </p>
          </div>
        </div>

        <ul className="mt-6 divide-y divide-line-soft border-y border-line-soft">
          {order.items.map((item) => (
            <li key={cartLineKey(item)} className="flex items-center gap-4 py-4">
              <span className="relative h-20 w-16 shrink-0 overflow-hidden rounded-lg border border-line-soft bg-surface-2">
                <Image
                  src={item.image}
                  alt={`${item.name} in ${item.color}, size ${item.size}`}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold leading-snug text-white">
                  {item.name}
                </span>
                <span className="mt-1.5 block text-xs text-mist-dim">
                  Size {item.size}, {item.color}
                </span>
                <span className="mt-1 block text-xs text-mist">
                  {formatPrice(item.price)} each, quantity {item.quantity}
                </span>
              </span>
              <span className="shrink-0 font-semibold tabular-nums text-white">
                {formatPrice(item.price * item.quantity)}
              </span>
            </li>
          ))}
        </ul>

        <dl className="mt-6 space-y-3 text-sm">
          <div className="flex items-center justify-between gap-4">
            <dt className="text-mist">Subtotal</dt>
            <dd className="font-semibold tabular-nums text-white">
              {formatPrice(order.subtotal)}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt className="text-mist">Delivery charges</dt>
            <dd
              className={`font-semibold tabular-nums ${
                order.delivery === 0 ? "text-emerald-400" : "text-white"
              }`}
            >
              {order.delivery === 0 ? "Free" : formatPrice(order.delivery)}
            </dd>
          </div>
        </dl>

        <div className="mt-5 flex items-baseline justify-between gap-4 border-t border-line pt-5">
          <span className="font-display text-base font-semibold text-white">
            Total payable
          </span>
          <span className="font-display text-2xl font-bold tabular-nums text-white">
            {formatPrice(order.total)}
          </span>
        </div>
      </section>

      {/* Payment status */}
      <section
        aria-labelledby="confirmation-payment-heading"
        className="mt-6 rounded-2xl border border-line-soft bg-surface p-6 sm:p-8"
      >
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-surface-2 text-brand">
            <Icon name="wallet" size={20} />
          </span>
          <h2
            id="confirmation-payment-heading"
            className="font-display text-lg font-bold tracking-tight text-white sm:text-xl"
          >
            Payment
          </h2>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-line bg-surface-2 px-5 py-4">
          <span>
            <span className="block font-display text-base font-semibold text-white">
              {order.paymentMethod}
            </span>
            <span className="mt-1 block text-sm text-mist">
              Pay {formatPrice(order.total)} to the courier at your door.
            </span>
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-amber-300">
            <Icon name="clock" size={14} />
            Payment pending
          </span>
        </div>

        <p className="mt-4 text-xs leading-relaxed text-mist-dim">
          Please keep the exact amount ready if you can. Our courier will hand
          you a receipt once payment is collected.
        </p>
      </section>

      {/* Next steps */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button href="/products" size="lg">
          Continue Shopping
          <Icon name="arrowRight" size={16} />
        </Button>
        <Button href="/" variant="outline" size="lg">
          Return to Home
        </Button>
      </div>

      <p className="mt-6 text-center text-xs leading-relaxed text-mist-dim">
        Need to change something on this order? Call {site.contact.phone} or
        email {site.contact.email} and quote order number {order.orderNumber}.
      </p>
    </div>
  );
}
