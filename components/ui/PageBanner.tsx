import type { ReactNode } from "react";

import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import type { Crumb } from "@/lib/seo";

interface PageBannerProps {
  /** Small label rendered above the title. */
  eyebrow?: string;
  title: string;
  description?: string;
  crumbs?: Crumb[];
  children?: ReactNode;
}

/**
 * Consistent page header used by every inner page. It carries the eyebrow,
 * heading, intro copy and breadcrumb trail over a soft brand wash.
 */
export function PageBanner({
  eyebrow,
  title,
  description,
  crumbs,
  children,
}: PageBannerProps) {
  return (
    <header className="relative overflow-hidden border-b border-line bg-mist">
      {/* Soft blue wash behind the heading */}
      <div aria-hidden="true" className="brand-wash pointer-events-none absolute inset-0" />
      <div className="shell relative py-12 md:py-16">
        {crumbs ? <Breadcrumbs items={crumbs} className="mb-6" /> : null}
        {eyebrow ? (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-brand">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="font-display text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate">
            {description}
          </p>
        ) : null}
        {children}
      </div>
    </header>
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  /** Centres the block, used on the home page sections. */
  centered?: boolean;
  action?: ReactNode;
}

/** Shared heading block for home page and landing page sections. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
  action,
}: SectionHeadingProps) {
  return (
    <div
      className={`flex flex-col gap-5 ${
        centered
          ? "items-center text-center"
          : "md:flex-row md:items-end md:justify-between"
      }`}
    >
      <div className="max-w-2xl">
        {eyebrow ? (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-brand">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl lg:text-[2.5rem] lg:leading-[1.15]">
          {title}
        </h2>
        {description ? (
          <p className="mt-4 text-base leading-relaxed text-slate">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
