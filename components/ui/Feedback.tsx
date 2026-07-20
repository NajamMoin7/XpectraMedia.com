import type { ReactNode } from "react";

import { BrandSpinner } from "@/components/loading/BrandSpinner";
import { Button } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";

/** Branded spinner used during navigation and form submission. */
export function LoadingSpinner({
  size = 28,
  label = "Loading",
  className = "",
}: {
  size?: number;
  label?: string;
  className?: string;
}) {
  return (
    <span role="status" className={`inline-flex items-center gap-3 ${className}`}>
      <span
        className="inline-block animate-spin rounded-full border-2 border-line-strong border-t-brand"
        style={{ width: size, height: size }}
        aria-hidden="true"
      />
      <span className="sr-only">{label}</span>
    </span>
  );
}

/** Full section loading state, used by route level loading files. */
export function PageLoader({ label = "Loading page" }: { label?: string }) {
  return (
    <div role="status" className="grid min-h-[60vh] place-items-center bg-canvas">
      <div className="flex flex-col items-center gap-5 text-center">
        <BrandSpinner size={64} />
        <p className="text-sm font-medium text-muted" aria-hidden="true">
          {label}
        </p>
        <span className="sr-only">{label}</span>
      </div>
    </div>
  );
}

/** Rectangular shimmer block for skeleton layouts. */
export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`skeleton rounded-xl ${className}`} aria-hidden="true" />;
}

/** Card shaped skeleton matching the product grid layout. */
export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-card shadow-[var(--shadow-soft)]">
      <Skeleton className="aspect-[3/4] rounded-none" />
      <div className="space-y-3 p-5">
        {/* Category */}
        <Skeleton className="h-2.5 w-20 rounded-full" />
        {/* Name */}
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-3 w-3/5" />
        {/* Rating */}
        <Skeleton className="h-3 w-24 rounded-full" />
        {/* Swatches */}
        <div className="flex items-center gap-1.5 pt-1">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-4 rounded-full" />
        </div>
        {/* Price */}
        <Skeleton className="h-5 w-28" />
        {/* Pill button */}
        <Skeleton className="h-11 w-full rounded-full" />
      </div>
    </div>
  );
}

/**
 * Responsive grid of product card skeletons, matching the layout produced by
 * ProductGrid. Used by the products listing, related products and the
 * recently viewed strip.
 */
export function ProductGridSkeleton({
  count = 8,
  columns = 4,
}: {
  count?: number;
  columns?: 3 | 4;
}) {
  const layout =
    columns === 3
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

  return (
    <div className={`grid gap-5 sm:gap-6 ${layout}`} aria-hidden="true">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}

/** Image led category tile skeleton, matching CategoryCard. */
export function CategoryCardSkeleton() {
  return (
    <div
      className="relative flex min-h-[19rem] flex-col justify-end overflow-hidden rounded-3xl border border-line bg-card shadow-[var(--shadow-soft)]"
      aria-hidden="true"
    >
      <Skeleton className="absolute inset-0 rounded-none" />
      <div className="relative space-y-3 p-6">
        {/* Count pill */}
        <Skeleton className="h-6 w-24 rounded-full" />
        {/* Title */}
        <Skeleton className="h-6 w-2/3" />
        {/* Description */}
        <Skeleton className="h-3.5 w-full max-w-md" />
        <Skeleton className="h-3.5 w-3/5" />
        {/* Explore pill */}
        <Skeleton className="mt-2 h-10 w-36 rounded-full" />
      </div>
    </div>
  );
}

/**
 * Gallery with its thumbnail strip beside the purchase panel, matching the
 * top section of the product details page.
 */
export function ProductDetailsSkeleton() {
  return (
    <div
      className="shell grid gap-10 py-10 lg:grid-cols-2 lg:gap-16 lg:py-16"
      aria-hidden="true"
    >
      {/* Gallery */}
      <div>
        <Skeleton className="aspect-[3/4] w-full rounded-3xl" />
        <div className="mt-4 flex gap-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="aspect-square w-24 rounded-2xl sm:w-28" />
          ))}
        </div>
      </div>

      {/* Purchase panel */}
      <div>
        {/* Category line */}
        <Skeleton className="h-3 w-40 rounded-full" />
        {/* Title */}
        <Skeleton className="mt-4 h-10 w-11/12" />
        <Skeleton className="mt-2 h-10 w-2/3" />
        {/* Subtitle */}
        <Skeleton className="mt-4 h-4 w-4/5" />
        {/* Rating */}
        <Skeleton className="mt-5 h-4 w-48 rounded-full" />
        {/* Price */}
        <Skeleton className="mt-6 h-10 w-56" />
        {/* Stock line */}
        <Skeleton className="mt-5 h-4 w-64" />

        {/* Colour swatches */}
        <Skeleton className="mt-7 h-3 w-28 rounded-full" />
        <div className="mt-3 flex flex-wrap gap-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-11 w-11 rounded-full" />
          ))}
        </div>

        {/* Sizes */}
        <Skeleton className="mt-7 h-3 w-24 rounded-full" />
        <div className="mt-3 flex flex-wrap gap-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-11 w-16 rounded-full" />
          ))}
        </div>

        {/* Quantity */}
        <Skeleton className="mt-7 h-3 w-24 rounded-full" />
        <Skeleton className="mt-3 h-11 w-40 rounded-full" />

        {/* Actions */}
        <Skeleton className="mt-7 h-13 w-full rounded-full" />
        <Skeleton className="mt-3 h-13 w-full rounded-full" />

        {/* Delivery and service notes */}
        <Skeleton className="mt-7 h-24 w-full rounded-2xl" />
      </div>
    </div>
  );
}

/** One cart line, matching CartItemRow. */
export function CartItemSkeleton() {
  return (
    <div
      className="flex flex-col gap-5 border-b border-line p-5 last:border-b-0 sm:flex-row sm:items-center sm:gap-6 sm:p-6"
      aria-hidden="true"
    >
      {/* Image */}
      <Skeleton className="h-28 w-24 shrink-0 rounded-2xl sm:h-32 sm:w-28" />

      {/* Name, variant pills and unit price */}
      <div className="min-w-0 flex-1">
        <Skeleton className="h-4 w-3/5" />
        <div className="mt-3 flex flex-wrap gap-2">
          <Skeleton className="h-7 w-24 rounded-full" />
          <Skeleton className="h-7 w-28 rounded-full" />
        </div>
        <Skeleton className="mt-3 h-3.5 w-36" />
      </div>

      {/* Quantity, line total and remove */}
      <div className="flex flex-wrap items-center justify-between gap-4 sm:flex-col sm:items-end sm:justify-center sm:gap-3">
        <Skeleton className="h-9 w-32 rounded-full" />
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
    </div>
  );
}

/** Totals panel shared by the cart and the checkout. */
export function OrderSummarySkeleton() {
  return (
    <div
      className="rounded-3xl border border-line bg-card p-6 shadow-[var(--shadow-soft)] sm:p-7"
      aria-hidden="true"
    >
      {/* Heading */}
      <Skeleton className="h-6 w-44" />
      <Skeleton className="mt-2 h-3.5 w-36" />

      {/* Totals rows */}
      <div className="mt-6 space-y-3 border-t border-line pt-6">
        <div className="flex items-center justify-between gap-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="flex items-center justify-between gap-4">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>

      {/* Total */}
      <div className="mt-5 flex items-baseline justify-between gap-4 border-t border-line-strong pt-5">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-8 w-28" />
      </div>

      {/* Free shipping nudge */}
      <Skeleton className="mt-6 h-20 w-full rounded-2xl" />

      {/* Primary action */}
      <Skeleton className="mt-6 h-12 w-full rounded-full" />

      {/* Secure checkout note */}
      <Skeleton className="mx-auto mt-5 h-3 w-52 rounded-full" />
    </div>
  );
}

/** One labelled field inside the checkout grid. */
function FieldSkeleton({ full = false }: { full?: boolean }) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <Skeleton className="h-3.5 w-28" />
      <Skeleton className="mt-2 h-12 w-full rounded-2xl" />
    </div>
  );
}

/** Contact, address and payment cards of the checkout form. */
export function CheckoutFormSkeleton() {
  return (
    <div aria-hidden="true">
      {/* Contact details */}
      <div className="rounded-3xl border border-line bg-card p-6 shadow-[var(--shadow-soft)] sm:p-8">
        <Skeleton className="h-6 w-52" />
        <Skeleton className="mt-2 h-3.5 w-72 max-w-full" />
        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          <FieldSkeleton />
          <FieldSkeleton />
          <FieldSkeleton />
          <FieldSkeleton />
        </div>
      </div>

      {/* Shipping address */}
      <div className="mt-6 rounded-3xl border border-line bg-card p-6 shadow-[var(--shadow-soft)] sm:p-8">
        <Skeleton className="h-6 w-56" />
        <Skeleton className="mt-2 h-3.5 w-80 max-w-full" />
        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          <FieldSkeleton full />
          <FieldSkeleton />
          <FieldSkeleton />
          <FieldSkeleton />
          <FieldSkeleton />
          <FieldSkeleton full />
        </div>
      </div>

      {/* Payment */}
      <div className="mt-6 rounded-3xl border border-line bg-card p-6 shadow-[var(--shadow-soft)] sm:p-8">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="mt-2 h-3.5 w-64 max-w-full" />
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <Skeleton className="h-20 w-full rounded-2xl" />
          <Skeleton className="h-20 w-full rounded-2xl" />
        </div>
        <Skeleton className="mt-6 h-13 w-full rounded-full" />
      </div>
    </div>
  );
}

/** Customizable shirt tile skeleton, matching CustomShirtCard. */
export function CustomShirtCardSkeleton() {
  return (
    <div
      className="flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-card shadow-[var(--shadow-soft)]"
      aria-hidden="true"
    >
      <Skeleton className="aspect-[3/4] rounded-none" />
      <div className="flex flex-1 flex-col p-5">
        {/* Eyebrow */}
        <Skeleton className="h-2.5 w-36 rounded-full" />
        {/* Name */}
        <Skeleton className="mt-3 h-4 w-4/5" />
        {/* Subtitle */}
        <Skeleton className="mt-2 h-3.5 w-3/5" />

        {/* Shirt colors */}
        <Skeleton className="mt-5 h-2.5 w-24 rounded-full" />
        <div className="mt-2 flex flex-wrap gap-1.5">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-[1.125rem] w-[1.125rem] rounded-full" />
          ))}
        </div>

        {/* Sizes */}
        <Skeleton className="mt-4 h-2.5 w-16 rounded-full" />
        <Skeleton className="mt-2 h-3 w-40" />

        {/* Price */}
        <Skeleton className="mt-5 h-6 w-32" />

        {/* Actions */}
        <div className="mt-auto flex flex-col gap-2 pt-5">
          <Skeleton className="h-11 w-full rounded-full" />
          <div className="flex gap-2">
            <Skeleton className="h-10 flex-1 rounded-full" />
            <Skeleton className="h-10 flex-1 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

interface EmptyStateProps {
  icon?: IconName;
  title: string;
  description: string;
  action?: { label: string; href: string };
  secondaryAction?: { label: string; href: string };
  children?: ReactNode;
}

/** Shared empty state for the cart, search results and filtered listings. */
export function EmptyState({
  icon = "search",
  title,
  description,
  action,
  secondaryAction,
  children,
}: EmptyStateProps) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center rounded-3xl border border-line bg-card px-6 py-14 text-center shadow-[var(--shadow-soft)]">
      <span className="mb-6 grid h-16 w-16 place-items-center rounded-2xl bg-brand-tint text-brand">
        <Icon name={icon} size={28} />
      </span>
      <h2 className="font-display text-xl font-semibold text-ink">{title}</h2>
      <p className="mt-3 text-sm leading-relaxed text-slate">{description}</p>
      {action || secondaryAction ? (
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          {action ? <Button href={action.href}>{action.label}</Button> : null}
          {secondaryAction ? (
            <Button href={secondaryAction.href} variant="outline">
              {secondaryAction.label}
            </Button>
          ) : null}
        </div>
      ) : null}
      {children}
    </div>
  );
}
