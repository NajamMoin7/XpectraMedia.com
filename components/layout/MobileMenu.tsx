"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { NavLink } from "@/components/ui/NavLink";
import {
  categoryNav,
  contactNav,
  footerCustomLinks,
  primaryNav,
} from "@/lib/navigation";
import { site } from "@/lib/site";

/** The new flagship department, highlighted with a small pill in the drawer. */
const FLAGSHIP_HREF = "/custom-shirts";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Light slide in navigation drawer for phones and tablets.
 * Locks background scrolling, closes on Escape and moves focus to the panel
 * so keyboard users land inside the menu rather than behind it.
 */
export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const [categoriesOpen, setCategoriesOpen] = useState(true);
  const [customOpen, setCustomOpen] = useState(true);

  useEffect(() => {
    if (!open) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);

    // Move focus into the drawer for keyboard and screen reader users.
    const focusTimer = setTimeout(() => panelRef.current?.focus(), 60);

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKeyDown);
      clearTimeout(focusTimer);
    };
  }, [open, onClose]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const rowClass = (active: boolean) =>
    `flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-colors ${
      active
        ? "bg-brand-tint text-brand-deep"
        : "text-slate hover:bg-mist hover:text-ink"
    }`;

  return (
    <div
      className={`fixed inset-0 z-[60] lg:hidden ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-night/45 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Drawer */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        tabIndex={-1}
        className={`absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col border-l border-line bg-canvas shadow-[var(--shadow-lift)] transition-transform duration-[400ms] ease-[var(--ease-out-soft)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <Logo height={28} label="Xpectra Media home from the menu" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
            className="grid h-10 w-10 place-items-center rounded-full text-slate transition-colors hover:bg-mist hover:text-ink"
          >
            <Icon name="close" size={20} />
          </button>
        </div>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 py-6">
          <ul className="space-y-1">
            {primaryNav.map((link) => (
              <li key={link.href}>
                <NavLink
                  href={link.href}
                  onClick={onClose}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={rowClass(isActive(link.href))}
                >
                  <span className="flex items-center gap-2">
                    {link.label}
                    {link.href === FLAGSHIP_HREF ? (
                      <span className="rounded-full bg-brand px-1.5 py-0.5 text-[0.6rem] font-bold uppercase leading-none tracking-wider text-white">
                        New
                      </span>
                    ) : null}
                  </span>
                  <Icon name="chevronRight" size={16} className="text-muted" />
                </NavLink>
              </li>
            ))}

            {/* Categories accordion */}
            <li>
              <button
                type="button"
                onClick={() => setCategoriesOpen((value) => !value)}
                aria-expanded={categoriesOpen}
                className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-base font-medium text-slate transition-colors hover:bg-mist hover:text-ink"
              >
                Categories
                <Icon
                  name="chevronDown"
                  size={16}
                  className={`transition-transform duration-300 ${
                    categoriesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`grid transition-all duration-300 ease-[var(--ease-out-soft)] ${
                  categoriesOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <ul className="overflow-hidden pl-3">
                  {categoryNav.map((category) => (
                    <li key={category.href}>
                      <NavLink
                        href={category.href}
                        onClick={onClose}
                        className="block rounded-r-xl border-l-2 border-line px-4 py-2.5 text-sm text-slate transition-colors hover:border-brand hover:bg-mist hover:text-ink"
                      >
                        {category.label}
                      </NavLink>
                    </li>
                  ))}
                  <li>
                    <NavLink
                      href="/categories"
                      onClick={onClose}
                      className="block rounded-r-xl border-l-2 border-line px-4 py-2.5 text-sm font-semibold text-brand transition-colors hover:border-brand hover:bg-mist"
                    >
                      All categories
                    </NavLink>
                  </li>
                </ul>
              </div>
            </li>

            {/* Custom Shirts accordion */}
            <li>
              <button
                type="button"
                onClick={() => setCustomOpen((value) => !value)}
                aria-expanded={customOpen}
                className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-base font-medium text-slate transition-colors hover:bg-mist hover:text-ink"
              >
                Custom Shirts
                <Icon
                  name="chevronDown"
                  size={16}
                  className={`transition-transform duration-300 ${
                    customOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`grid transition-all duration-300 ease-[var(--ease-out-soft)] ${
                  customOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <ul className="overflow-hidden pl-3">
                  {footerCustomLinks.map((link) => (
                    <li key={link.href}>
                      <NavLink
                        href={link.href}
                        onClick={onClose}
                        className="block rounded-r-xl border-l-2 border-line px-4 py-2.5 text-sm text-slate transition-colors hover:border-brand hover:bg-mist hover:text-ink"
                      >
                        {link.label}
                      </NavLink>
                    </li>
                  ))}
                  <li>
                    <NavLink
                      href={FLAGSHIP_HREF}
                      onClick={onClose}
                      className="block rounded-r-xl border-l-2 border-line px-4 py-2.5 text-sm font-semibold text-brand transition-colors hover:border-brand hover:bg-mist"
                    >
                      All custom shirts
                    </NavLink>
                  </li>
                </ul>
              </div>
            </li>

            <li>
              <NavLink
                href={contactNav.href}
                onClick={onClose}
                aria-current={isActive(contactNav.href) ? "page" : undefined}
                className={rowClass(isActive(contactNav.href))}
              >
                {contactNav.label}
                <Icon name="chevronRight" size={16} className="text-muted" />
              </NavLink>
            </li>
          </ul>

          <div className="mt-8 space-y-3">
            <Button href="/products" fullWidth onClick={onClose}>
              Shop All Products
              <Icon name="arrowRight" size={16} />
            </Button>
            <Button href="/cart" variant="outline" fullWidth onClick={onClose}>
              <Icon name="cart" size={16} />
              View Cart
            </Button>
          </div>
        </nav>

        <div className="border-t border-line bg-mist px-5 py-5 text-sm">
          <a
            href={site.contact.phoneHref}
            className="flex items-center gap-3 text-slate transition-colors hover:text-brand"
          >
            <Icon name="phone" size={16} className="text-brand" />
            {site.contact.phone}
          </a>
          <a
            href={site.contact.emailHref}
            className="mt-3 flex items-center gap-3 break-all text-slate transition-colors hover:text-brand"
          >
            <Icon name="mail" size={16} className="text-brand" />
            {site.contact.email}
          </a>
        </div>
      </div>
    </div>
  );
}
