import type { ReactNode } from "react";

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
    <div className="grid min-h-[60vh] place-items-center bg-canvas">
      <div className="flex flex-col items-center gap-4 text-center">
        <LoadingSpinner size={40} label={label} />
        <p className="text-sm font-medium text-muted">{label}</p>
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
