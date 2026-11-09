import Link from "next/link";
import type { ReactNode } from "react";

import type { ChargebackStatus, OrderStatus, PaymentStatus } from "@/lib/types";

/** Small, shared building blocks for the admin panel. */

export const INPUT =
  "w-full rounded-xl border border-line bg-canvas px-3.5 py-2.5 text-sm text-ink " +
  "placeholder:text-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/25";
export const LABEL = "mb-1.5 block text-sm font-medium text-ink";
export const BUTTON =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm " +
  "font-semibold text-white transition-colors hover:bg-brand-deep disabled:opacity-60";
export const BUTTON_OUTLINE =
  "inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-canvas px-4 py-2.5 " +
  "text-sm font-semibold text-ink transition-colors hover:border-brand hover:text-brand";

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight text-ink">{title}</h1>
        {description ? <p className="mt-1 text-sm text-slate">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function Card({
  title,
  children,
  className = "",
  action,
}: {
  title?: string;
  children: ReactNode;
  className?: string;
  action?: ReactNode;
}) {
  return (
    <section className={`rounded-2xl border border-line bg-card p-5 shadow-[var(--shadow-soft)] ${className}`}>
      {title ? (
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="font-display text-base font-semibold text-ink">{title}</h2>
          {action}
        </div>
      ) : null}
      {children}
    </section>
  );
}

const TONES = {
  gray: "bg-mist text-slate border-line",
  blue: "bg-brand-tint text-brand-deep border-brand/25",
  green: "bg-success/10 text-success border-success/25",
  amber: "bg-amber-50 text-amber-700 border-amber-200",
  red: "bg-sale/10 text-sale border-sale/25",
} as const;

export function Badge({ tone = "gray", children }: { tone?: keyof typeof TONES; children: ReactNode }) {
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold ${TONES[tone]}`}
    >
      {children}
    </span>
  );
}

const ORDER_TONE: Record<OrderStatus, keyof typeof TONES> = {
  Pending: "amber",
  Processing: "blue",
  Shipped: "blue",
  Delivered: "green",
  Cancelled: "gray",
};
const PAYMENT_TONE: Record<PaymentStatus, keyof typeof TONES> = {
  Paid: "green",
  Unpaid: "amber",
  Refunded: "gray",
};
const CHARGEBACK_TONE: Record<ChargebackStatus, keyof typeof TONES> = {
  Open: "red",
  Won: "green",
  Lost: "gray",
};

export const OrderStatusBadge = ({ status }: { status: OrderStatus }) => (
  <Badge tone={ORDER_TONE[status]}>{status}</Badge>
);
export const PaymentBadge = ({ status }: { status: PaymentStatus }) => (
  <Badge tone={PAYMENT_TONE[status]}>{status}</Badge>
);
export const ChargebackBadge = ({ status }: { status: ChargebackStatus }) => (
  <Badge tone={CHARGEBACK_TONE[status]}>Chargeback {status}</Badge>
);

export function StatCard({
  label,
  value,
  hint,
  href,
}: {
  label: string;
  value: string;
  hint?: string;
  href?: string;
}) {
  const body = (
    <>
      <p className="text-sm text-slate">{label}</p>
      <p className="mt-1 font-display text-2xl font-bold tabular-nums text-ink">{value}</p>
      {hint ? <p className="mt-1 text-xs text-muted">{hint}</p> : null}
    </>
  );
  const className =
    "block rounded-2xl border border-line bg-card p-5 shadow-[var(--shadow-soft)] transition-colors";
  return href ? (
    <Link href={href} className={`${className} hover:border-brand/50`}>
      {body}
    </Link>
  ) : (
    <div className={className}>{body}</div>
  );
}

/** Wraps a table so it scrolls sideways on small screens. */
export function Table({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-line bg-card shadow-[var(--shadow-soft)]">
      <table className="w-full min-w-[640px] text-left text-sm">{children}</table>
    </div>
  );
}

export const TH = "border-b border-line bg-mist px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted";
export const TD = "border-b border-line px-4 py-3 align-middle text-slate";

export function Notice({ tone, children }: { tone: "success" | "error"; children: ReactNode }) {
  return (
    <p
      role={tone === "error" ? "alert" : "status"}
      className={`rounded-xl border px-4 py-3 text-sm font-medium ${
        tone === "error" ? "border-sale/30 bg-sale/5 text-sale" : "border-success/30 bg-success/5 text-success"
      }`}
    >
      {children}
    </p>
  );
}

export function EmptyRow({ colSpan, children }: { colSpan: number; children: ReactNode }) {
  return (
    <tr>
      <td colSpan={colSpan} className="px-4 py-10 text-center text-sm text-muted">
        {children}
      </td>
    </tr>
  );
}

/** Page numbers to show: first, last, and a window around the current page. */
function pageList(page: number, pages: number): (number | "gap")[] {
  const wanted = new Set([1, pages, page - 1, page, page + 1]);
  const list: (number | "gap")[] = [];
  for (let n = 1; n <= pages; n += 1) {
    if (wanted.has(n)) list.push(n);
    else if (list[list.length - 1] !== "gap") list.push("gap");
  }
  return list;
}

/**
 * Numbered pager for admin tables. Links keep the current search and filters
 * through `params`, so changing page never loses them.
 */
export function Pagination({
  page,
  pages,
  total,
  perPage,
  basePath,
  params,
}: {
  page: number;
  pages: number;
  total: number;
  perPage: number;
  basePath: string;
  params: Record<string, string | undefined>;
}) {
  if (total === 0) return null;

  const href = (n: number) => {
    const search = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) if (value) search.set(key, value);
    if (n > 1) search.set("page", String(n));
    const query = search.toString();
    return query ? `${basePath}?${query}` : basePath;
  };

  const from = (page - 1) * perPage + 1;
  const to = Math.min(page * perPage, total);
  const step =
    "inline-flex h-9 min-w-9 items-center justify-center rounded-lg border px-3 text-sm font-semibold transition-colors";
  const idle = `${step} border-line bg-card text-slate hover:border-brand hover:text-brand`;
  const disabled = `${step} pointer-events-none border-line bg-mist text-muted/60`;

  return (
    <nav aria-label="Pagination" className="mt-4 flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm text-muted">
        Showing {from}–{to} of {total}
      </p>
      {pages > 1 ? (
        <div className="flex flex-wrap items-center gap-1.5">
          {page > 1 ? (
            <Link href={href(page - 1)} className={idle} rel="prev">
              ← Prev
            </Link>
          ) : (
            <span className={disabled} aria-disabled="true">
              ← Prev
            </span>
          )}
          {pageList(page, pages).map((item, index) =>
            item === "gap" ? (
              <span key={`gap-${index}`} className="px-1 text-sm text-muted">
                …
              </span>
            ) : (
              <Link
                key={item}
                href={href(item)}
                aria-current={item === page ? "page" : undefined}
                className={item === page ? `${step} border-brand bg-brand text-white` : idle}
              >
                {item}
              </Link>
            ),
          )}
          {page < pages ? (
            <Link href={href(page + 1)} className={idle} rel="next">
              Next →
            </Link>
          ) : (
            <span className={disabled} aria-disabled="true">
              Next →
            </span>
          )}
        </div>
      ) : null}
    </nav>
  );
}

export function formatDateTime(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(iso));
}
