"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import { Logo } from "@/components/layout/Logo";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { SearchOverlay } from "@/components/layout/SearchOverlay";
import { Icon } from "@/components/ui/Icon";
import { useCart } from "@/lib/cart-context";
import { categoryNav, contactNav, primaryNav } from "@/lib/navigation";

/** Subscribes to window scrolling for the condensed header state. */
function subscribeToScroll(onChange: () => void): () => void {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

/**
 * Sticky storefront header.
 * Holds the wordmark, primary navigation with an animated categories
 * dropdown, search trigger, live cart badge and the mobile drawer trigger.
 */
export function Header() {
  const pathname = usePathname();
  const { count, hydrated } = useCart();

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

  return (
    <>
      {/* Announcement strip */}
      <div className="relative z-50 overflow-hidden border-b border-line-soft bg-gradient-to-r from-brand-deep via-brand to-brand-deep">
        <div className="shell flex h-9 items-center justify-center gap-6 text-[0.72rem] font-medium tracking-wide text-white sm:text-xs">
          <span className="flex items-center gap-2">
            <Icon name="truck" size={14} />
            Free delivery on orders above PKR 5,000
          </span>
          <span className="hidden items-center gap-2 sm:flex">
            <Icon name="wallet" size={14} />
            Cash on Delivery across Pakistan
          </span>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? "glass border-line shadow-[0_18px_40px_-28px_rgba(0,0,0,0.95)]"
            : "border-transparent bg-ink"
        }`}
      >
        <nav
          aria-label="Primary"
          className="shell flex h-16 items-center justify-between gap-4 md:h-20"
        >
          <Logo height={scrolled ? 32 : 38} className="transition-all duration-300" />

          {/* Desktop navigation */}
          <ul className="hidden items-center gap-1 lg:flex">
            {primaryNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive(link.href)
                      ? "text-white"
                      : "text-mist hover:text-white"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute inset-x-4 -bottom-0.5 h-px origin-left bg-brand transition-transform duration-300 ${
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
                    ? "text-white"
                    : "text-mist hover:text-white"
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
                className={`absolute left-1/2 top-full w-72 -translate-x-1/2 pt-3 transition-all duration-300 ease-out ${
                  dropdownOpen
                    ? "visible translate-y-0 opacity-100"
                    : "invisible -translate-y-2 opacity-0"
                }`}
              >
                <div className="glass overflow-hidden rounded-2xl border border-line shadow-[0_30px_60px_-30px_rgba(0,0,0,1)]">
                  <ul className="p-2">
                    {categoryNav.map((category) => (
                      <li key={category.href}>
                        <Link
                          href={category.href}
                          onClick={() => setDropdownOpen(false)}
                          className="group flex items-start gap-3 rounded-xl px-3 py-3 transition-colors duration-200 hover:bg-surface-2"
                          tabIndex={dropdownOpen ? undefined : -1}
                        >
                          <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-line bg-surface text-brand transition-colors group-hover:border-brand">
                            <Icon name="chevronRight" size={14} />
                          </span>
                          <span>
                            <span className="block text-sm font-semibold text-white">
                              {category.label}
                            </span>
                            <span className="mt-0.5 block text-xs leading-relaxed text-mist">
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
                    className="flex items-center justify-between border-t border-line-soft px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand transition-colors hover:bg-surface-2"
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
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  isActive(contactNav.href) ? "text-white" : "text-mist hover:text-white"
                }`}
              >
                {contactNav.label}
                <span
                  className={`absolute inset-x-4 -bottom-0.5 h-px origin-left bg-brand transition-transform duration-300 ${
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
              className="grid h-10 w-10 place-items-center rounded-full text-mist transition-all duration-200 hover:bg-surface-2 hover:text-white"
            >
              <Icon name="search" size={19} />
            </button>

            <Link
              href="/cart"
              aria-label={
                hydrated && count > 0
                  ? `Shopping cart, ${count} ${count === 1 ? "item" : "items"}`
                  : "Shopping cart"
              }
              className="relative grid h-10 w-10 place-items-center rounded-full text-mist transition-all duration-200 hover:bg-surface-2 hover:text-white"
            >
              <Icon name="cart" size={19} />
              {hydrated && count > 0 ? (
                <span className="animate-fade-up absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-brand px-1 text-[0.65rem] font-bold text-white shadow-[0_0_12px_rgba(30,144,255,0.8)]">
                  {count > 99 ? "99" : count}
                </span>
              ) : null}
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              className="grid h-10 w-10 place-items-center rounded-full text-mist transition-all duration-200 hover:bg-surface-2 hover:text-white lg:hidden"
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
