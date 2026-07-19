"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { categoryNav, contactNav, primaryNav } from "@/lib/navigation";
import { site } from "@/lib/site";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Slide in navigation drawer for phones and tablets.
 * Locks background scrolling, closes on Escape and moves focus to the panel
 * so keyboard users land inside the menu rather than behind it.
 */
export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const [categoriesOpen, setCategoriesOpen] = useState(true);

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

  return (
    <div
      className={`fixed inset-0 z-[60] lg:hidden ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
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
        className={`absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col border-l border-line bg-ink-soft shadow-[-30px_0_60px_-30px_rgba(0,0,0,1)] transition-transform duration-[400ms] ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-line-soft px-5 py-4">
          <span className="font-display text-sm font-semibold uppercase tracking-[0.24em] text-brand">
            Menu
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
            className="grid h-10 w-10 place-items-center rounded-full text-mist transition-colors hover:bg-surface-2 hover:text-white"
          >
            <Icon name="close" size={20} />
          </button>
        </div>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 py-6">
          <ul className="space-y-1">
            {primaryNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                    isActive(link.href)
                      ? "bg-surface-2 text-white"
                      : "text-mist hover:bg-surface hover:text-white"
                  }`}
                >
                  {link.label}
                  <Icon name="chevronRight" size={16} className="text-mist-dim" />
                </Link>
              </li>
            ))}

            {/* Categories accordion */}
            <li>
              <button
                type="button"
                onClick={() => setCategoriesOpen((value) => !value)}
                aria-expanded={categoriesOpen}
                className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-base font-medium text-mist transition-colors hover:bg-surface hover:text-white"
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
                className={`grid transition-all duration-300 ease-out ${
                  categoriesOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <ul className="overflow-hidden pl-3">
                  {categoryNav.map((category) => (
                    <li key={category.href}>
                      <Link
                        href={category.href}
                        onClick={onClose}
                        className="block rounded-xl border-l border-line px-4 py-2.5 text-sm text-mist transition-colors hover:border-brand hover:text-white"
                      >
                        {category.label}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      href="/categories"
                      onClick={onClose}
                      className="block rounded-xl border-l border-line px-4 py-2.5 text-sm font-semibold text-brand transition-colors hover:border-brand"
                    >
                      All categories
                    </Link>
                  </li>
                </ul>
              </div>
            </li>

            <li>
              <Link
                href={contactNav.href}
                onClick={onClose}
                aria-current={isActive(contactNav.href) ? "page" : undefined}
                className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                  isActive(contactNav.href)
                    ? "bg-surface-2 text-white"
                    : "text-mist hover:bg-surface hover:text-white"
                }`}
              >
                {contactNav.label}
                <Icon name="chevronRight" size={16} className="text-mist-dim" />
              </Link>
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

        <div className="border-t border-line-soft px-5 py-5 text-sm">
          <a
            href={site.contact.phoneHref}
            className="flex items-center gap-3 text-mist transition-colors hover:text-white"
          >
            <Icon name="phone" size={16} className="text-brand" />
            {site.contact.phone}
          </a>
          <a
            href={site.contact.emailHref}
            className="mt-3 flex items-center gap-3 text-mist transition-colors hover:text-white"
          >
            <Icon name="mail" size={16} className="text-brand" />
            {site.contact.email}
          </a>
        </div>
      </div>
    </div>
  );
}
