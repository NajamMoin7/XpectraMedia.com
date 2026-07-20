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

/** One label and value pair inside the customization detail list. */
function CustomDetail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-line/70 py-1.5 last:border-b-0">
      <dt className="shrink-0 text-muted">{label}</dt>
      <dd className="text-right font-medium text-ink">{value}</dd>
    </div>
  );
}

/** Formats a signed percentage offset, for example 0 becomes "Centered". */
function offsetLabel(x: number, y: number): string {
  if (x === 0 && y === 0) return "Centered";
  const horizontal = x === 0 ? "centered" : `${x > 0 ? "right" : "left"} ${Math.abs(x)}%`;
  const vertical = y === 0 ? "centered" : `${y > 0 ? "down" : "up"} ${Math.abs(y)}%`;
  return `${horizontal}, ${vertical}`;
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
  const custom = item.custom;

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
          {custom ? (
            <span className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand-tint px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-brand-deep">
              <Icon name="sparkle" size={13} />
              Custom Product
            </span>
          ) : null}

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

          {custom ? (
            <details className="group mt-3 rounded-2xl border border-line bg-mist/70 p-3">
              <summary className="flex cursor-pointer list-none items-center gap-3 rounded-xl outline-none">
                <span className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-xl border border-line bg-canvas">
                  {/* Data URL artwork, so a plain img is used instead of next/image */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={custom.artwork}
                    alt=""
                    role="img"
                    aria-label={`Uploaded artwork ${custom.artworkName}`}
                    className="h-full w-full object-contain"
                  />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-xs font-semibold text-ink">
                    {custom.styleName}, {custom.printLabel}
                  </span>
                  <span className="mt-0.5 block truncate text-xs text-muted">
                    {custom.artworkName}
                  </span>
                </span>
                <span className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-brand">
                  <span className="group-open:hidden">Details</span>
                  <span className="hidden group-open:inline">Hide</span>
                  <Icon
                    name="chevronDown"
                    size={14}
                    className="transition-transform duration-300 group-open:rotate-180"
                  />
                </span>
              </summary>

              <dl className="animate-fade-up mt-3 border-t border-line pt-3 text-xs">
                <CustomDetail label="Shirt style" value={custom.styleName} />
                <CustomDetail label="Shirt color" value={custom.colorName} />
                <CustomDetail label="Size" value={item.size} />
                <CustomDetail label="Quantity" value={String(item.quantity)} />
                <CustomDetail label="Print option" value={custom.printLabel} />
                <CustomDetail label="Unit price" value={formatPrice(custom.unitPrice)} />
                <CustomDetail
                  label="Customization charge"
                  value={
                    custom.printCharge === 0
                      ? "Included"
                      : `${formatPrice(custom.printCharge)} per shirt`
                  }
                />
                <CustomDetail
                  label="Design position"
                  value={offsetLabel(custom.transform.x, custom.transform.y)}
                />
                <CustomDetail
                  label="Design size"
                  value={`${Math.round(custom.transform.scale * 100)}% scale`}
                />
                <CustomDetail
                  label="Design rotation"
                  value={`${Math.round(custom.transform.rotation)} degrees`}
                />
              </dl>

              <p className="mt-3 flex items-start gap-2 rounded-xl border border-line bg-canvas px-3 py-2 text-xs leading-relaxed text-slate">
                <Icon name="shield" size={14} className="mt-0.5 shrink-0 text-brand" />
                Custom printed shirts are non returnable unless they arrive
                damaged, defective or different from the approved order.
              </p>
            </details>
          ) : null}
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
