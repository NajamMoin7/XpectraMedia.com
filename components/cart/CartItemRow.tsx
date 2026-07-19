"use client";

import Image from "next/image";
import Link from "next/link";

import { Icon } from "@/components/ui/Icon";
import { QuantitySelector } from "@/components/ui/QuantitySelector";
import { useCart } from "@/lib/cart-context";
import { cartLineKey, formatPrice } from "@/lib/format";
import type { CartItem } from "@/lib/types";

interface CartItemRowProps {
  item: CartItem;
}

/**
 * A single cart line on a white card surface. On large screens it reads as a
 * comfortable table style row, and on small screens it collapses into a
 * stacked layout so the image, variant details and controls stay reachable
 * with one thumb.
 */
export function CartItemRow({ item }: CartItemRowProps) {
  const { updateQuantity, removeItem } = useCart();

  const key = cartLineKey(item);
  const lineTotal = item.price * item.quantity;
  const href = `/products/${item.slug}`;

  return (
    <li className="border-b border-line last:border-b-0">
      <div className="flex flex-col gap-5 p-5 transition-colors duration-300 hover:bg-mist/60 sm:flex-row sm:items-center sm:gap-6 sm:p-6">
        {/* Image */}
        <Link
          href={href}
          className="group relative block h-28 w-24 shrink-0 overflow-hidden rounded-2xl border border-line bg-mist sm:h-32 sm:w-28"
        >
          <Image
            src={item.image}
            alt={`${item.name} in ${item.color}, size ${item.size}`}
            fill
            sizes="(max-width: 640px) 96px, 112px"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Name, variant and unit price */}
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-base font-semibold leading-snug text-ink">
            <Link href={href} className="transition-colors hover:text-brand">
              {item.name}
            </Link>
          </h3>

          <dl className="mt-3 flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-line bg-mist px-3 py-1 text-xs">
              <dt className="text-muted">Size</dt>
              <dd className="font-semibold text-ink">{item.size}</dd>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-line bg-mist px-3 py-1 text-xs">
              <dt className="text-muted">Color</dt>
              <dd className="font-semibold text-ink">{item.color}</dd>
            </div>
          </dl>

          <p className="mt-3 text-sm text-slate">
            <span className="text-muted">Unit price</span>{" "}
            <span className="font-semibold text-ink">{formatPrice(item.price)}</span>
          </p>
        </div>

        {/* Quantity, line total and remove */}
        <div className="flex flex-wrap items-center justify-between gap-4 sm:flex-col sm:items-end sm:justify-center sm:gap-3">
          <QuantitySelector
            value={item.quantity}
            onChange={(next) => updateQuantity(key, next)}
            size="sm"
            label={`Quantity for ${item.name}`}
          />

          <p className="font-display text-lg font-bold tabular-nums text-ink sm:text-xl">
            {formatPrice(lineTotal)}
          </p>

          <button
            type="button"
            onClick={() => removeItem(key)}
            aria-label={`Remove ${item.name} from your cart`}
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold text-muted transition-colors hover:bg-mist hover:text-sale"
          >
            <Icon name="trash" size={15} />
            Remove
          </button>
        </div>
      </div>
    </li>
  );
}
