"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { Icon } from "@/components/ui/Icon";
import { formatPrice } from "@/lib/format";
import { products, searchProducts } from "@/lib/products";
import { subcategoryLabel } from "@/lib/categories";

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

const SUGGESTIONS = ["New Arrivals", "Hoodies", "Dresses", "Jeans", "Toys"];

/**
 * Frosted light search panel. Matching runs against the local catalogue as the
 * customer types, and submitting hands the term to the products page.
 */
export function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [term, setTerm] = useState("");

  // Dismissing clears the field, so the panel always opens ready to type.
  const close = useCallback(() => {
    setTerm("");
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!open) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") close();
    }
    document.addEventListener("keydown", onKeyDown);
    const focusTimer = setTimeout(() => inputRef.current?.focus(), 80);

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKeyDown);
      clearTimeout(focusTimer);
    };
  }, [open, close]);

  const results = useMemo(() => {
    if (term.trim().length < 2) return [];
    return searchProducts(products, term).slice(0, 6);
  }, [term]);

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const query = term.trim();
    if (!query) return;
    close();
    router.push(`/products?q=${encodeURIComponent(query)}`);
  }

  return (
    <div
      className={`fixed inset-0 z-[70] transition-opacity duration-300 ${
        open ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-hidden={!open}
    >
      <div className="absolute inset-0 bg-night/35 backdrop-blur-md" onClick={close} />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search products"
        className={`relative mx-auto mt-20 w-[92%] max-w-2xl transition-all duration-300 ease-[var(--ease-out-soft)] ${
          open ? "translate-y-0" : "-translate-y-4"
        }`}
      >
        <form
          onSubmit={submit}
          className="glass flex items-center gap-3 rounded-2xl border border-line px-5 py-4 shadow-[var(--shadow-lift)]"
          role="search"
        >
          <Icon name="search" size={20} className="shrink-0 text-brand" />
          <label htmlFor="site-search" className="sr-only">
            Search for products
          </label>
          <input
            ref={inputRef}
            id="site-search"
            type="search"
            value={term}
            onChange={(event) => setTerm(event.target.value)}
            placeholder="Search hoodies, dresses, jeans, baby clothes, toys"
            autoComplete="off"
            className="w-full bg-transparent text-base text-ink placeholder:text-muted focus:outline-none"
          />
          <button
            type="button"
            onClick={close}
            aria-label="Close search"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-slate transition-colors hover:bg-mist hover:text-ink"
          >
            <Icon name="close" size={18} />
          </button>
        </form>

        <div className="mt-3 overflow-hidden rounded-2xl border border-line bg-card shadow-[var(--shadow-lift)]">
          {results.length > 0 ? (
            <ul className="max-h-[52vh] overflow-y-auto p-2">
              {results.map((product) => (
                <li key={product.id}>
                  <Link
                    href={`/products/${product.slug}`}
                    onClick={close}
                    className="flex items-center gap-4 rounded-xl p-2.5 transition-colors hover:bg-mist"
                  >
                    <span className="relative h-16 w-14 shrink-0 overflow-hidden rounded-lg bg-mist-2">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold text-ink">
                        {product.name}
                      </span>
                      <span className="mt-0.5 block text-xs capitalize text-slate">
                        {product.category} in {subcategoryLabel(product.subcategory)}
                      </span>
                    </span>
                    <span className="shrink-0 text-sm font-semibold text-brand">
                      {formatPrice(product.price)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : term.trim().length >= 2 ? (
            <div className="px-5 py-8 text-center">
              <p className="text-sm font-semibold text-ink">
                No products match {`"${term.trim()}"`}
              </p>
              <p className="mt-2 text-xs text-slate">
                Try a different word such as hoodie, dress, jeans or toys.
              </p>
            </div>
          ) : (
            <div className="px-5 py-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                Popular searches
              </p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => setTerm(suggestion)}
                    className="rounded-full border border-line bg-mist px-4 py-2 text-sm text-slate transition-all hover:border-brand hover:bg-brand-tint hover:text-brand-deep"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
