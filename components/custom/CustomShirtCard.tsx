"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { ShirtMockup } from "@/components/custom/ShirtMockup";
import { Icon } from "@/components/ui/Icon";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";

/**
 * Product tile for a customizable shirt.
 * Mirrors the hover polish of the standard product card, but the actions push
 * the customer into the customization tool rather than straight into the cart.
 */

/** Which shirt style the customization tool should open on for each family. */
const STYLE_BY_SUBCATEGORY: Record<string, string> = {
  "custom-tees": "tshirt",
  "custom-polos": "polo",
  "custom-long-sleeve": "longsleeve",
  "custom-sweatshirts": "sweatshirt",
  "custom-uniforms": "polo",
  "bulk-custom": "tshirt",
};

interface CustomShirtCardProps {
  product: Product;
  /** The first row of cards on a page loads eagerly for a faster paint. */
  priority?: boolean;
}

export function CustomShirtCard({ product, priority = false }: CustomShirtCardProps) {
  const [preview, setPreview] = useState(false);

  const styleId = STYLE_BY_SUBCATEGORY[product.subcategory] ?? "tshirt";
  const designHref = `/custom-shirts/design?style=${styleId}`;

  return (
    <>
      <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-card shadow-[var(--shadow-soft)] transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-brand/45 hover:shadow-[var(--shadow-lift)]">
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-mist">
          <Link
            href={designHref}
            aria-label={`Customize the ${product.name}`}
            className="absolute inset-0 z-10"
          />

          <Image
            src={product.images[0]}
            alt={`${product.name}, ${product.subtitle}`}
            fill
            priority={priority}
            loading={priority ? undefined : "lazy"}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-all duration-700 ease-out group-hover:scale-[1.07] group-hover:opacity-0"
          />
          <Image
            src={product.images[1] ?? product.images[0]}
            alt=""
            aria-hidden="true"
            fill
            loading="lazy"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="scale-105 object-cover opacity-0 transition-all duration-700 ease-out group-hover:scale-100 group-hover:opacity-100"
          />

          {/* Customizable badge */}
          <span className="pointer-events-none absolute left-3 top-3 z-20 inline-flex items-center gap-1.5 rounded-full bg-brand px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-white shadow-sm">
            <Icon name="sparkle" size={12} />
            Customizable
          </span>

          {/* Quick preview reveals on hover, always visible on touch screens */}
          <button
            type="button"
            onClick={() => setPreview(true)}
            className="absolute inset-x-3 bottom-3 z-20 hidden h-10 translate-y-3 items-center justify-center gap-2 rounded-full bg-white/95 text-sm font-semibold text-ink opacity-0 shadow-md backdrop-blur transition-all duration-300 hover:bg-white group-hover:translate-y-0 group-hover:opacity-100 sm:flex"
          >
            <Icon name="eye" size={16} />
            Quick Preview
          </button>
        </div>

        {/* Details */}
        <div className="flex flex-1 flex-col p-5">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-brand">
            Upload your own design
          </p>

          <h3 className="mt-2 font-display text-[1.05rem] font-semibold leading-snug text-ink">
            <Link href={designHref} className="transition-colors hover:text-brand">
              {product.name}
            </Link>
          </h3>

          <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted">
            {product.subtitle}
          </p>

          {/* Colors */}
          <div className="mt-4">
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-muted">
              Shirt Colors
            </p>
            <ul className="mt-2 flex flex-wrap items-center gap-1.5" aria-label="Available colors">
              {product.colors.map((color) => (
                <li key={color.name}>
                  <span
                    title={color.name}
                    className="block h-[1.125rem] w-[1.125rem] rounded-full border border-line-strong transition-transform duration-300 hover:scale-125"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span className="sr-only">{color.name}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sizes */}
          <div className="mt-3.5">
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-muted">
              Sizes
            </p>
            <p className="mt-1.5 text-xs font-medium text-slate">
              {product.sizes.join(", ")}
            </p>
          </div>

          {/* Price */}
          <div className="mt-4 flex flex-wrap items-baseline gap-2">
            <span className="text-xs font-medium text-muted">From</span>
            <span className="font-display text-xl font-bold text-ink">
              {formatPrice(product.price)}
            </span>
            <span className="text-xs text-muted">per shirt</span>
          </div>

          {/* Actions */}
          <div className="mt-auto flex flex-col gap-2 pt-5">
            <Link
              href={designHref}
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-deep via-brand to-brand text-sm font-semibold text-white shadow-[0_8px_24px_-10px_rgba(13,127,242,0.7)] transition-all duration-300 hover:brightness-110 active:scale-[0.98]"
            >
              <Icon name="plus" size={16} />
              Upload Design
            </Link>

            <div className="flex gap-2">
              <Link
                href={designHref}
                className="inline-flex h-10 flex-1 items-center justify-center gap-1.5 rounded-full border border-line-strong bg-canvas text-xs font-semibold text-ink transition-all duration-300 hover:border-brand hover:text-brand active:scale-[0.98]"
              >
                <Icon name="sparkle" size={14} />
                Customize Now
              </Link>
              <button
                type="button"
                onClick={() => setPreview(true)}
                className="inline-flex h-10 flex-1 items-center justify-center gap-1.5 rounded-full border border-line-strong bg-canvas text-xs font-semibold text-ink transition-all duration-300 hover:border-brand hover:text-brand active:scale-[0.98]"
              >
                <Icon name="eye" size={14} />
                Quick Preview
              </button>
            </div>
          </div>
        </div>
      </article>

      {preview ? (
        <QuickPreviewModal
          product={product}
          styleId={styleId}
          designHref={designHref}
          onClose={() => setPreview(false)}
        />
      ) : null}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Quick preview modal                                                 */
/* ------------------------------------------------------------------ */

function QuickPreviewModal({
  product,
  styleId,
  designHref,
  onClose,
}: {
  product: Product;
  styleId: string;
  designHref: string;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    const focusTimer = window.setTimeout(() => panelRef.current?.focus(), 40);

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(focusTimer);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center p-4">
      <div
        className="animate-fade-up absolute inset-0 bg-night/45 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Quick preview, ${product.name}`}
        tabIndex={-1}
        className="animate-scale-in relative max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-line bg-card p-6 shadow-[var(--shadow-lift)] outline-none sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close the quick preview"
          className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-line bg-canvas text-slate transition-colors hover:border-brand hover:text-brand"
        >
          <Icon name="close" size={18} />
        </button>

        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-brand">
          Quick Preview
        </p>
        <h2 className="mt-2 font-display text-xl font-bold tracking-tight text-ink sm:text-2xl">
          {product.name}
        </h2>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate">
          Here is how this shirt looks in every available color. Open the customization
          tool to add your own artwork and see it on the shirt instantly.
        </p>

        <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {product.colors.map((color) => (
            <li
              key={color.name}
              className="rounded-2xl border border-line bg-mist p-3 transition-colors hover:border-brand/45"
            >
              <ShirtMockup
                styleId={styleId}
                color={color.hex}
                side="front"
                className="h-auto w-full"
              />
              <p className="mt-2 text-center text-xs font-semibold text-ink">
                {color.name}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
          <div>
            <p className="text-xs font-medium text-muted">Starting price</p>
            <p className="font-display text-xl font-bold text-ink">
              {formatPrice(product.price)}
            </p>
          </div>
          <Link
            href={designHref}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-deep via-brand to-brand px-6 text-sm font-semibold text-white shadow-[0_8px_24px_-10px_rgba(13,127,242,0.7)] transition-all duration-300 hover:brightness-110 active:scale-[0.98]"
          >
            Customize This Shirt
            <Icon name="arrowRight" size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
