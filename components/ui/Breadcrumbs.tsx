import Link from "next/link";

import { Icon } from "@/components/ui/Icon";
import { breadcrumbJsonLd, type Crumb } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";

interface BreadcrumbsProps {
  /** Ordered trail. The final entry is rendered as the current page. */
  items: Crumb[];
  className?: string;
}

/**
 * Accessible breadcrumb trail that also emits BreadcrumbList structured data,
 * so every page that shows a trail is described correctly to search engines.
 */
export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  const trail: Crumb[] = [{ name: "Home", href: "/" }, ...items];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />
      <nav aria-label="Breadcrumb" className={className}>
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
          {trail.map((crumb, index) => {
            const isLast = index === trail.length - 1;
            return (
              <li key={crumb.href} className="flex items-center gap-2">
                {isLast ? (
                  <span aria-current="page" className="font-semibold text-ink">
                    {crumb.name}
                  </span>
                ) : (
                  <Link
                    href={crumb.href}
                    className="transition-colors hover:text-brand"
                  >
                    {crumb.name}
                  </Link>
                )}
                {!isLast ? (
                  <Icon name="chevronRight" size={14} className="text-line-strong" />
                ) : null}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
