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

/** One labelled row inside the shipping information card. */
function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 border-b border-line py-3 last:border-b-0 sm:flex-row sm:items-start sm:gap-6">
      <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted sm:w-40 sm:shrink-0">
        {label}
      </dt>
      <dd className="text-sm leading-relaxed text-ink">{value}</dd>
    </div>
  );
}

const CARD =
  "rounded-3xl border border-line bg-card p-6 shadow-[var(--shadow-soft)] sm:p-8";

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
  const streetLine = order.apartment
    ? `${order.street}, ${order.apartment}`
    : order.street;
  const cityLine = `${order.city}, ${order.state} ${order.zipCode}`;

  return (
    <div className="mx-auto max-w-4xl">
      {/* Success header */}
      <div className="animate-fade-up rounded-3xl border border-success/25 bg-success/5 p-7 text-center sm:p-10">
        <span className="animate-pop mx-auto grid h-16 w-16 place-items-center rounded-full bg-success text-white shadow-[var(--shadow-lift)]">
          <Icon name="check" size={30} />
        </span>
        <h2 className="mt-6 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          Your order is placed
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate">
          Thank you, {order.fullName}. We have received your order and our
          packing team is already on it. A confirmation has been sent to{" "}
          {order.email}, and our team will reach you on {order.phone} if we need
          anything.
        </p>

        <div className="mx-auto mt-7 inline-flex flex-col items-center rounded-2xl border border-line bg-card px-7 py-5 shadow-[var(--shadow-soft)]">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            Your order number
          </span>
          <strong className="mt-2 font-display text-2xl font-bold tracking-[0.12em] text-brand sm:text-3xl">
            {order.orderNumber}
          </strong>
          <span className="mt-2 text-xs text-muted">
            Placed on {formatDate(order.placedAt)}
          </span>
        </div>

        <p className="mt-5 text-xs leading-relaxed text-muted">
          Please keep this order number safe. Quote it whenever you contact us
          about this order.
        </p>
      </div>

      {/* Shipping information */}
      <section
        aria-labelledby="confirmation-delivery-heading"
        className={`mt-8 ${CARD}`}
      >
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-mist text-brand">
            <Icon name="truck" size={20} />
          </span>
          <h2
            id="confirmation-delivery-heading"
            className="font-display text-lg font-bold tracking-tight text-ink sm:text-xl"
          >
            Shipping Information
          </h2>
        </div>

        <dl className="mt-6">
          <DetailRow label="Customer name" value={order.fullName} />
          <DetailRow label="Phone number" value={order.phone} />
          {order.altPhone ? (
            <DetailRow label="Alternative phone" value={order.altPhone} />
          ) : null}
          <DetailRow label="Street address" value={streetLine} />
          <DetailRow label="City, state and ZIP" value={cityLine} />
          <DetailRow label="Country" value={order.country} />
          {order.notes ? <DetailRow label="Order notes" value={order.notes} /> : null}
        </dl>

        <p className="mt-6 flex items-start gap-2.5 rounded-2xl border border-brand/25 bg-brand-tint px-4 py-3 text-sm leading-relaxed text-slate">
          <Icon name="clock" size={16} className="mt-0.5 shrink-0 text-brand" />
          <span>
            Estimated delivery between{" "}
            <strong className="font-semibold text-ink">
              {deliveryWindow(order.placedAt)}
            </strong>
            . You will receive tracking details by email as soon as your package
            leaves our warehouse.
          </span>
        </p>
      </section>

      {/* Order summary */}
      <section aria-labelledby="confirmation-summary-heading" className={`mt-6 ${CARD}`}>
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-mist text-brand">
            <Icon name="cart" size={20} />
          </span>
          <div>
            <h2
              id="confirmation-summary-heading"
              className="font-display text-lg font-bold tracking-tight text-ink sm:text-xl"
            >
              Order Summary
            </h2>
            <p className="text-sm text-slate">
              {unitCount === 1 ? "1 item" : `${unitCount} items`}
            </p>
          </div>
        </div>

        <ul className="mt-6 divide-y divide-line border-y border-line">
          {order.items.map((item) => (
            <li key={cartLineKey(item)} className="flex items-center gap-4 py-4">
              <span className="relative h-20 w-16 shrink-0 overflow-hidden rounded-xl border border-line bg-mist">
                <Image
                  src={item.image}
                  alt={`${item.name} in ${item.color}, size ${item.size}`}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold leading-snug text-ink">
                  {item.name}
                </span>
                <span className="mt-1.5 block text-xs text-muted">
                  Size {item.size}, {item.color}
                </span>
                <span className="mt-1 block text-xs text-slate">
                  {formatPrice(item.price)} each, quantity {item.quantity}
                </span>
              </span>
              <span className="shrink-0 font-semibold tabular-nums text-ink">
                {formatPrice(item.price * item.quantity)}
              </span>
            </li>
          ))}
        </ul>

        <dl className="mt-6 space-y-3 text-sm">
          <div className="flex items-center justify-between gap-4">
            <dt className="text-slate">Subtotal</dt>
            <dd className="font-semibold tabular-nums text-ink">
              {formatPrice(order.subtotal)}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt className="text-slate">Standard shipping</dt>
            <dd
              className={`font-semibold tabular-nums ${
                order.shipping === 0 ? "text-success" : "text-ink"
              }`}
            >
              {order.shipping === 0 ? "Free" : formatPrice(order.shipping)}
            </dd>
          </div>
        </dl>

        <div className="mt-5 flex items-baseline justify-between gap-4 border-t border-line-strong pt-5">
          <span className="font-display text-base font-semibold text-ink">
            Total payable
          </span>
          <span className="font-display text-2xl font-bold tabular-nums text-ink">
            {formatPrice(order.total)}
          </span>
        </div>
      </section>

      {/* Payment status */}
      <section aria-labelledby="confirmation-payment-heading" className={`mt-6 ${CARD}`}>
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-mist text-brand">
            <Icon name="wallet" size={20} />
          </span>
          <h2
            id="confirmation-payment-heading"
            className="font-display text-lg font-bold tracking-tight text-ink sm:text-xl"
          >
            Payment
          </h2>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-mist px-5 py-4">
          <span>
            <span className="block font-display text-base font-semibold text-ink">
              {order.paymentMethod}
            </span>
            <span className="mt-1 block text-sm text-slate">
              Pay {formatPrice(order.total)} when your order is delivered.
            </span>
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-amber-700">
            <Icon name="clock" size={14} />
            Payment pending
          </span>
        </div>

        <p className="mt-4 text-xs leading-relaxed text-muted">
          Please keep the exact amount ready if you can. You will receive a
          receipt once payment is collected.
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

      <p className="mt-6 text-center text-xs leading-relaxed text-muted">
        Need to change something on this order? Call{" "}
        <a
          href={site.contact.phoneHref}
          className="font-semibold text-brand transition-colors hover:text-brand-deep"
        >
          {site.contact.phone}
        </a>{" "}
        or email{" "}
        <a
          href={site.contact.emailHref}
          className="font-semibold text-brand transition-colors hover:text-brand-deep"
        >
          {site.contact.email}
        </a>{" "}
        and quote order number {order.orderNumber}.
      </p>
    </div>
  );
}
