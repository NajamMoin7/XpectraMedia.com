"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

import {
  defaultFilters,
  ProductFilters,
  type FilterState,
} from "@/components/product/ProductFilters";
import { ProductGrid } from "@/components/product/ProductGrid";
import { EmptyState } from "@/components/ui/Feedback";
import { Icon } from "@/components/ui/Icon";
import { products, searchProducts, sortProducts } from "@/lib/products";
import type {
  CategorySlug,
  SortOption,
  SubcategorySlug,
  ViewMode,
} from "@/lib/types";

const SORT_LABELS: { value: SortOption; label: string }[] = [
  { value: "latest", label: "Sort by latest" },
  { value: "price-low", label: "Price low to high" },
  { value: "price-high", label: "Price high to low" },
  { value: "popularity", label: "Sort by popularity" },
];

const VALID_CATEGORIES: CategorySlug[] = ["men", "women", "kids"];
const VALID_TYPES: SubcategorySlug[] = [
  "shirts",
  "pants",
  "trousers",
  "kurta-shalwar",
  "baby-clothes",
  "toys",
];

/**
 * Interactive product listing.
 * The initial filter and sort state is seeded from the URL so links such as
 * /products?category=kids&type=toys land on a pre filtered view.
 */
export function ProductsBrowser() {
  const params = useSearchParams();
  const key = params.toString();

  const initialSort = params.get("sort") as SortOption | null;
  const category = params.get("category");
  const type = params.get("type");

  const initialFilters: FilterState = {
    ...defaultFilters,
    query: params.get("q") ?? "",
    categories: VALID_CATEGORIES.includes(category as CategorySlug)
      ? [category as CategorySlug]
      : [],
    types: VALID_TYPES.includes(type as SubcategorySlug)
      ? [type as SubcategorySlug]
      : [],
  };

  // Remounting on a query change reseeds the filters from the new URL, so
  // arriving from a category link never leaves a stale selection behind.
  return (
    <BrowserPanel
      key={key}
      initialFilters={initialFilters}
      initialSort={
        initialSort && SORT_LABELS.some((option) => option.value === initialSort)
          ? initialSort
          : "latest"
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

  const dirty =
    filters.query !== defaultFilters.query ||
    filters.categories.length > 0 ||
    filters.types.length > 0 ||
    filters.min !== defaultFilters.min ||
    filters.max !== defaultFilters.max;

  const results = useMemo(() => {
    let list = products.filter((product) => {
      if (filters.categories.length && !filters.categories.includes(product.category)) {
        return false;
      }
      if (filters.types.length && !filters.types.includes(product.subcategory)) {
        return false;
      }
      return product.price >= filters.min && product.price <= filters.max;
    });

    list = searchProducts(list, filters.query);
    return sortProducts(list, sort);
  }, [filters, sort]);

  return (
    <div className="shell grid gap-10 py-12 md:py-16 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-12">
      {/* Filters: a sidebar on desktop, a collapsible panel on smaller screens */}
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <button
          type="button"
          onClick={() => setPanelOpen((open) => !open)}
          aria-expanded={panelOpen}
          aria-controls="filter-panel"
          className="flex h-12 w-full items-center justify-between rounded-2xl border border-line bg-surface px-5 text-sm font-semibold text-white transition-colors hover:border-brand lg:hidden"
        >
          <span className="flex items-center gap-2">
            <Icon name="filter" size={17} className="text-brand" />
            Filters
            {dirty ? (
              <span className="rounded-full bg-brand px-2 py-0.5 text-[0.65rem] text-white">
                On
              </span>
            ) : null}
          </span>
          <Icon
            name="chevronDown"
            size={17}
            className={`transition-transform duration-300 ${panelOpen ? "rotate-180" : ""}`}
          />
        </button>

        <div
          id="filter-panel"
          className={`grid transition-all duration-300 ease-out lg:!grid-rows-[1fr] lg:!opacity-100 ${
            panelOpen ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 lg:mt-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="rounded-2xl border border-line-soft bg-surface p-6">
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
        <div className="flex flex-col gap-4 rounded-2xl border border-line-soft bg-surface px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p aria-live="polite" className="text-sm text-mist">
            Showing{" "}
            <span className="font-semibold text-white">{results.length}</span>{" "}
            {results.length === 1 ? "product" : "products"}
            {dirty ? " that match your filters" : " in the catalogue"}
          </p>

          <div className="flex items-center gap-3">
            <label htmlFor="sort-products" className="sr-only">
              Sort products
            </label>
            <select
              id="sort-products"
              value={sort}
              onChange={(event) => setSort(event.target.value as SortOption)}
              className="h-10 rounded-full border border-line bg-surface-2 px-4 text-sm text-white transition-colors focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40"
            >
              {SORT_LABELS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <div
              className="flex items-center gap-1 rounded-full border border-line bg-surface-2 p-1"
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

        <div className="mt-8">
          {results.length > 0 ? (
            <ProductGrid products={results} view={view} columns={3} plain />
          ) : (
            <EmptyState
              icon="search"
              title="No products match those filters"
              description="Try widening the price range, removing a category, or searching for a simpler word such as shirt or toys."
            >
              <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setFilters(defaultFilters)}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-deep via-brand to-brand-bright px-6 text-sm font-semibold text-white transition-all hover:brightness-110"
                >
                  <Icon name="refresh" size={16} />
                  Clear Filters
                </button>
                <Link
                  href="/categories"
                  className="inline-flex h-11 items-center justify-center rounded-full border border-line bg-surface-2 px-6 text-sm font-semibold text-white transition-all hover:border-brand hover:text-brand-bright"
                >
                  Browse Categories
                </Link>
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
        active ? "bg-brand text-white" : "text-mist hover:text-white"
      }`}
    >
      <Icon name={icon} size={16} />
    </button>
  );
}
