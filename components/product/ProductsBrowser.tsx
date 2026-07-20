"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

import {
  activeChips,
  defaultFilters,
  isDirty,
  ProductFilters,
  type FilterState,
} from "@/components/product/ProductFilters";
import { ProductGrid } from "@/components/product/ProductGrid";
import { EmptyState } from "@/components/ui/Feedback";
import { Icon } from "@/components/ui/Icon";
import { NavLink } from "@/components/ui/NavLink";
import { categories, subcategories } from "@/lib/categories";
import { products, searchProducts, sortProducts } from "@/lib/products";
import { useWishlist } from "@/lib/wishlist-context";
import type {
  CategorySlug,
  SortOption,
  SubcategorySlug,
  ViewMode,
} from "@/lib/types";

const SORT_LABELS: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "latest", label: "Latest arrivals" },
  { value: "price-low", label: "Price low to high" },
  { value: "price-high", label: "Price high to low" },
  { value: "rating", label: "Customer rating" },
  { value: "popularity", label: "Most popular" },
];

const VALID_CATEGORIES = categories.map((category) => category.slug);
const VALID_TYPES = subcategories.map((sub) => sub.slug);

/**
 * Interactive product listing.
 * The initial filter and sort state is seeded from the URL so links such as
 * /products?category=kids&type=wooden-toys land on a pre filtered view.
 */
export function ProductsBrowser() {
  const params = useSearchParams();
  const key = params.toString();

  const sortParam = params.get("sort") as SortOption | null;
  const category = params.get("category");
  const type = params.get("type");
  const flag = params.get("filter");

  const initialFilters: FilterState = {
    ...defaultFilters,
    query: params.get("q") ?? "",
    categories: VALID_CATEGORIES.includes(category as CategorySlug)
      ? [category as CategorySlug]
      : [],
    types: VALID_TYPES.includes(type as SubcategorySlug)
      ? [type as SubcategorySlug]
      : [],
    onSale: flag === "sale",
    bestSellers: flag === "bestsellers",
    newArrivals: flag === "new",
    wishlistOnly: flag === "wishlist",
  };

  // Remounting on a query change reseeds the filters from the new URL, so
  // arriving from a category link never leaves a stale selection behind.
  return (
    <BrowserPanel
      key={key}
      initialFilters={initialFilters}
      initialSort={
        sortParam && SORT_LABELS.some((option) => option.value === sortParam)
          ? sortParam
          : "featured"
      }
    />
  );
}

function BrowserPanel({
  initialFilters,
  initialSort,
}: {
  initialFilters: FilterState;
  initialSort: SortOption;
}) {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [sort, setSort] = useState<SortOption>(initialSort);
  const [view, setView] = useState<ViewMode>("grid");
  const [panelOpen, setPanelOpen] = useState(false);

  const wishlist = useWishlist();
  const savedIds = wishlist.ids;

  const dirty = isDirty(filters);
  const chips = activeChips(filters);

  const results = useMemo(() => {
    let list = products.filter((product) => {
      if (filters.categories.length && !filters.categories.includes(product.category)) {
        return false;
      }
      if (filters.types.length && !filters.types.includes(product.subcategory)) {
        return false;
      }
      if (product.price < filters.min || product.price > filters.max) return false;
      if (filters.sizes.length && !product.sizes.some((size) => filters.sizes.includes(size))) {
        return false;
      }
      if (
        filters.colors.length &&
        !product.colors.some((color) => filters.colors.includes(color.name))
      ) {
        return false;
      }
      if (filters.minRating > 0 && product.rating < filters.minRating) return false;
      if (filters.inStockOnly && product.stock <= 0) return false;
      if (filters.newArrivals && !product.newArrival) return false;
      if (filters.bestSellers && !product.bestSeller) return false;
      if (filters.onSale && (product.discount ?? 0) <= 0) return false;
      if (filters.wishlistOnly && !savedIds.includes(product.id)) return false;
      return true;
    });

    list = searchProducts(list, filters.query);
    return sortProducts(list, sort);
  }, [filters, sort, savedIds]);

  const emptyWishlist = filters.wishlistOnly && savedIds.length === 0;

  return (
    <div className="shell grid gap-10 py-12 md:py-16 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-12">
      {/* Filters: a sticky sidebar on desktop, a collapsible panel on mobile */}
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <button
          type="button"
          onClick={() => setPanelOpen((open) => !open)}
          aria-expanded={panelOpen}
          aria-controls="filter-panel"
          className="flex h-12 w-full items-center justify-between rounded-2xl border border-line bg-card px-5 text-sm font-semibold text-ink shadow-[var(--shadow-soft)] transition-colors hover:border-brand lg:hidden"
        >
          <span className="flex items-center gap-2">
            <Icon name="filter" size={17} className="text-brand" />
            Filters
            {chips.length > 0 ? (
              <span className="rounded-full bg-brand px-2 py-0.5 text-[0.65rem] font-bold text-white">
                {chips.length}
              </span>
            ) : null}
          </span>
          <Icon
            name="chevronDown"
            size={17}
            className={`text-slate transition-transform duration-300 ${
              panelOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        <div
          id="filter-panel"
          className={`grid transition-all duration-300 ease-out lg:!grid-rows-[1fr] lg:!opacity-100 ${
            panelOpen ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 lg:mt-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="rounded-3xl border border-line bg-card p-6 shadow-[var(--shadow-soft)] lg:max-h-[calc(100vh-9rem)] lg:overflow-y-auto">
              <ProductFilters
                value={filters}
                onChange={setFilters}
                onClear={() => setFilters(defaultFilters)}
                dirty={dirty}
              />
            </div>
          </div>
        </div>
      </aside>

      {/* Results */}
      <div>
        <div className="flex flex-col gap-4 rounded-3xl border border-line bg-card px-5 py-4 shadow-[var(--shadow-soft)] sm:flex-row sm:items-center sm:justify-between">
          <p aria-live="polite" className="text-sm text-slate">
            Showing <span className="font-semibold text-ink">{results.length}</span>{" "}
            {results.length === 1 ? "product" : "products"}
            {dirty ? " that match your filters" : " in the catalog"}
          </p>

          <div className="flex items-center gap-3">
            <label htmlFor="sort-products" className="sr-only">
              Sort products
            </label>
            <select
              id="sort-products"
              value={sort}
              onChange={(event) => setSort(event.target.value as SortOption)}
              className="h-10 rounded-full border border-line-strong bg-canvas px-4 text-sm font-medium text-ink transition-colors focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/25"
            >
              {SORT_LABELS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <div
              className="flex items-center gap-1 rounded-full border border-line-strong bg-mist p-1"
              role="group"
              aria-label="Choose layout"
            >
              <ViewButton
                active={view === "grid"}
                onClick={() => setView("grid")}
                icon="grid"
                label="Grid view"
              />
              <ViewButton
                active={view === "list"}
                onClick={() => setView("list")}
                icon="list"
                label="List view"
              />
            </div>
          </div>
        </div>

        {/* Active filter chips */}
        {chips.length > 0 ? (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              Active
            </span>
            {chips.map((chip) => (
              <button
                key={chip.key}
                type="button"
                onClick={() => setFilters(chip.remove(filters))}
                className="group inline-flex items-center gap-2 rounded-full border border-line bg-brand-tint px-3 py-1.5 text-xs font-semibold text-brand-deep transition-all hover:border-brand hover:bg-brand hover:text-white"
              >
                {chip.label}
                <Icon name="close" size={12} />
                <span className="sr-only">Remove this filter</span>
              </button>
            ))}
            <button
              type="button"
              onClick={() => setFilters(defaultFilters)}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-slate underline underline-offset-4 transition-colors hover:text-brand"
            >
              Clear Filters
            </button>
          </div>
        ) : null}

        <div className="mt-8">
          {results.length > 0 ? (
            <ProductGrid products={results} view={view} columns={3} plain />
          ) : (
            <EmptyState
              icon={emptyWishlist ? "heart" : "search"}
              title={
                emptyWishlist
                  ? "Your saved items list is empty"
                  : "No products match those filters"
              }
              description={
                emptyWishlist
                  ? "Tap the heart on any product to save it here for later. Saved items stay on this device."
                  : "Try widening the price range, removing a department, or searching for a simpler word such as denim or toys."
              }
            >
              <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setFilters(defaultFilters)}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-deep via-brand to-brand px-6 text-sm font-semibold text-white shadow-[0_10px_26px_-12px_rgba(13,127,242,0.9)] transition-all hover:brightness-110"
                >
                  <Icon name="refresh" size={16} />
                  Clear Filters
                </button>
                <NavLink
                  href="/categories"
                  className="inline-flex h-11 items-center justify-center rounded-full border border-line-strong bg-canvas px-6 text-sm font-semibold text-ink transition-all hover:border-brand hover:text-brand"
                >
                  Browse Categories
                </NavLink>
              </div>
            </EmptyState>
          )}
        </div>
      </div>
    </div>
  );
}

function ViewButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: "grid" | "list";
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      className={`grid h-8 w-8 place-items-center rounded-full transition-all ${
        active ? "bg-brand text-white shadow-sm" : "text-slate hover:text-ink"
      }`}
    >
      <Icon name={icon} size={16} />
    </button>
  );
}
