"use client";

import Link from "next/link";
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";

import { useRouteLoading } from "@/components/loading/RouteLoadingProvider";

/** True for anything that leaves the site or is handled by the browser. */
export function isExternalHref(href: string): boolean {
  return (
    /^[a-z][a-z0-9+.-]*:/i.test(href) || // tel:, mailto:, https:, and friends
    href.startsWith("//") ||
    href.startsWith("#")
  );
}

interface NavLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  /** Optional, so a stretched overlay link can stay self closing. */
  children?: ReactNode;
  /**
   * Forces a plain anchor. Useful for phone, email, social and map links,
   * which must never trigger the internal route loader.
   */
  external?: boolean;
}

/**
 * Internal link that announces the navigation before the route changes, so
 * the global loader can appear immediately.
 *
 * External destinations, in page anchors and modified clicks such as open in
 * a new tab all fall through to normal browser behaviour untouched.
 */
export function NavLink({
  href,
  children,
  external,
  onClick,
  ...rest
}: NavLinkProps) {
  const { start, pendingHref } = useRouteLoading();
  const isExternal = external ?? isExternalHref(href);

  if (isExternal) {
    return (
      <a
        href={href}
        onClick={onClick}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (event.defaultPrevented) return;

    // Let the browser handle new tab, download and middle click gestures.
    if (
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    ) {
      return;
    }

    // start returns false for a repeat click or a link to the current page,
    // in which case the duplicate navigation is dropped.
    if (!start(href)) event.preventDefault();
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      aria-disabled={pendingHref === href ? true : undefined}
      {...rest}
    >
      {children}
    </Link>
  );
}
