"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import { Logo } from "@/components/layout/Logo";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { SearchOverlay } from "@/components/layout/SearchOverlay";
import { Icon } from "@/components/ui/Icon";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";
import { categoryNav, contactNav, primaryNav } from "@/lib/navigation";
import { site } from "@/lib/site";

/** Subscribes to window scrolling for the condensed header state. */
function subscribeToScroll(onChange: () => void): () => void {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

/**
 * Sticky storefront header on the light canvas.
 * Holds the announcement bar, a contact strip for large screens, the wordmark,
 * primary navigation with an animated categories dropdown, search, wishlist
 * and a live cart badge.
 */
export function Header() {
  const pathname = usePathname();
  const { count, hydrated } = useCart();
  const { count: wishlistCount } = useWishlist();

  // The scroll position is browser state, so it is read through a subscription
  // rather than mirrored into React state.
  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > 12,
    () => false,
  );

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const dropdownRef = useRef<HTMLLIElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close the dropdown on outside clicks and on the Escape key.
  useEffect(() => {
    if (!dropdownOpen) return;

    function onPointerDown(event: MouseEvent) {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setDropdownOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [dropdownOpen]);

  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  /** Small delay on mouse out so the pointer can travel into the panel. */
  function scheduleClose() {
    closeTimer.current = setTimeout(() => setDropdownOpen(false), 160);
  }
  function cancelClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);
  const categoriesActive = pathname.startsWith("/categories");

  const navLinkClass = (active: boolean) =>
    `relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
      active ? "text-ink" : "text-slate hover:text-ink"
    }`;

  const actionClass =
    "relative grid h-10 w-10 place-items-center rounded-full text-slate transition-all duration-200 hover:bg-mist hover:text-ink";

  return (
    <>
      {/* Announcement strip */}
      <div className="relative z-50 bg-night">
        <div className="shell flex h-9 items-center justify-center gap-6 text-[0.72rem] font-medium tracking-wide text-white/90 sm:text-xs">
          <span className="flex items-center gap-2">
            <Icon name="truck" size={14} className="text-brand-bright" />
            Free shipping on orders over $75
          </span>
          <span className="hidden items-center gap-2 sm:flex">
            <Icon name="refresh" size={14} className="text-brand-bright" />
            Easy 30 day returns
          </span>
        </div>
      </div>

      {/* Contact strip, large screens only */}
      <div className="hidden border-b border-line bg-mist lg:block">
        <div className="shell flex h-9 items-center justify-end gap-6 text-xs text-slate">
          <a
            href={site.contact.phoneHref}
            className="flex items-center gap-2 transition-colors hover:text-brand"
          >
            <Icon name="phone" size={13} className="text-brand" />
            {site.contact.phone}
          </a>
          <span aria-hidden="true" className="h-3 w-px bg-line-strong" />
          <a
            href={site.contact.emailHref}
            className="flex items-center gap-2 transition-colors hover:text-brand"
          >
            <Icon name="mail" size={13} className="text-brand" />
            {site.contact.email}
          </a>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? "glass border-line shadow-[var(--shadow-soft)]"
            : "border-line bg-canvas"
        }`}
      >
        <nav
          aria-label="Primary"
          className="shell flex h-16 items-center justify-between gap-4 md:h-20"
        >
          <Logo height={scrolled ? 30 : 36} className="transition-all duration-300" />

          {/* Desktop navigation */}
          <ul className="hidden items-center gap-1 lg:flex">
            {primaryNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={navLinkClass(isActive(link.href))}
                >
                  {link.label}
                  <span
                    className={`absolute inset-x-4 bottom-0 h-0.5 origin-left rounded-full bg-brand transition-transform duration-300 ${
                      isActive(link.href) ? "scale-x-100" : "scale-x-0"
                    }`}
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}

            {/* Categories dropdown */}
            <li
              ref={dropdownRef}
              className="relative"
              onMouseEnter={() => {
                cancelClose();
                setDropdownOpen(true);
              }}
              onMouseLeave={scheduleClose}
            >
              <button
                type="button"
                onClick={() => setDropdownOpen((open) => !open)}
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
                className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  categoriesActive || dropdownOpen
                    ? "text-ink"
                    : "text-slate hover:text-ink"
                }`}
              >
                Categories
                <Icon
                  name="chevronDown"
                  size={15}
                  className={`transition-transform duration-300 ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`absolute left-1/2 top-full w-80 -translate-x-1/2 pt-3 transition-all duration-300 ease-out ${
                  dropdownOpen
                    ? "visible translate-y-0 opacity-100"
                    : "invisible -translate-y-2 opacity-0"
                }`}
              >
                <div className="overflow-hidden rounded-2xl border border-line bg-card shadow-[var(--shadow-lift)]">
                  <ul className="p-2">
                    {categoryNav.map((category) => (
                      <li key={category.href}>
                        <Link
                          href={category.href}
                          onClick={() => setDropdownOpen(false)}
                          className="group flex items-start gap-3 rounded-xl px-3 py-3 transition-colors duration-200 hover:bg-mist"
                          tabIndex={dropdownOpen ? undefined : -1}
                        >
                          <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-line bg-brand-tint text-brand transition-colors group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                            <Icon name="chevronRight" size={14} />
                          </span>
                          <span>
                            <span className="block text-sm font-semibold text-ink">
                              {category.label}
                            </span>
                            <span className="mt-0.5 block text-xs leading-relaxed text-slate">
                              {category.description}
                            </span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/categories"
                    onClick={() => setDropdownOpen(false)}
                    tabIndex={dropdownOpen ? undefined : -1}
                    className="flex items-center justify-between border-t border-line bg-mist px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand transition-colors hover:bg-mist-2"
                  >
                    View all categories
                    <Icon name="arrowRight" size={15} />
                  </Link>
                </div>
              </div>
            </li>

            <li>
              <Link
                href={contactNav.href}
                aria-current={isActive(contactNav.href) ? "page" : undefined}
                className={navLinkClass(isActive(contactNav.href))}
              >
                {contactNav.label}
                <span
                  className={`absolute inset-x-4 bottom-0 h-0.5 origin-left rounded-full bg-brand transition-transform duration-300 ${
                    isActive(contactNav.href) ? "scale-x-100" : "scale-x-0"
                  }`}
                  aria-hidden="true"
                />
              </Link>
            </li>
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search products"
              className={actionClass}
            >
              <Icon name="search" size={19} />
            </button>

            <Link
              href="/products?filter=wishlist"
              aria-label={
                hydrated && wishlistCount > 0
                  ? `Wishlist, ${wishlistCount} ${wishlistCount === 1 ? "item" : "items"}`
                  : "Wishlist"
              }
              className={actionClass}
            >
              <Icon name="heart" size={19} />
              {hydrated && wishlistCount > 0 ? (
                <span
                  key={wishlistCount}
                  className="animate-pop absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-ink px-1 text-[0.65rem] font-bold text-white"
                >
                  {wishlistCount > 99 ? "99" : wishlistCount}
                </span>
              ) : null}
            </Link>

            <Link
              href="/cart"
              aria-label={
                hydrated && count > 0
                  ? `Shopping cart, ${count} ${count === 1 ? "item" : "items"}`
                  : "Shopping cart"
              }
              className={actionClass}
            >
              <Icon name="cart" size={19} />
              {hydrated && count > 0 ? (
                <span
                  // Remounting on every change replays the pop animation.
                  key={count}
                  className="animate-pop absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-brand px-1 text-[0.65rem] font-bold text-white shadow-[var(--shadow-brand)]"
                >
                  {count > 99 ? "99" : count}
                </span>
              ) : null}
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              className={`${actionClass} lg:hidden`}
            >
              <Icon name="menu" size={20} />
            </button>
          </div>
        </nav>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
