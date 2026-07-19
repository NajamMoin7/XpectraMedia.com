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
        className="inline-block animate-spin rounded-full border-2 border-line border-t-brand"
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
    <div className="grid min-h-[60vh] place-items-center">
      <div className="flex flex-col items-center gap-4 text-center">
        <LoadingSpinner size={40} label={label} />
        <p className="text-sm text-mist">{label}</p>
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
    <div className="overflow-hidden rounded-2xl border border-line-soft bg-surface">
      <Skeleton className="aspect-[3/4] rounded-none" />
      <div className="space-y-3 p-5">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-9 w-full rounded-full" />
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
    <div className="mx-auto flex max-w-md flex-col items-center rounded-3xl border border-line-soft bg-surface/70 px-6 py-14 text-center">
      <span className="mb-6 grid h-16 w-16 place-items-center rounded-2xl border border-line bg-surface-2 text-brand">
        <Icon name={icon} size={28} />
      </span>
      <h2 className="font-display text-xl font-semibold text-white">{title}</h2>
      <p className="mt-3 text-sm leading-relaxed text-mist">{description}</p>
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
