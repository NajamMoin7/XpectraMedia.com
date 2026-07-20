"use client";

import { useMemo } from "react";

import { Icon } from "@/components/ui/Icon";
import { categories, subcategories, subcategoryLabel } from "@/lib/categories";
import { formatPrice } from "@/lib/format";
import { ALL_COLORS, ALL_SIZES, PRICE_BOUNDS } from "@/lib/products";
import type { CategorySlug, SubcategorySlug } from "@/lib/types";

/** Every filter the customer can apply on the products page. */
export interface FilterState {
  query: string;
  categories: CategorySlug[];
  types: SubcategorySlug[];
  min: number;
  max: number;
  sizes: string[];
  /** Color names, matched against the color list on each product. */
  colors: string[];
  /** Zero means any rating. */
  minRating: number;
  inStockOnly: boolean;
  newArrivals: boolean;
  bestSellers: boolean;
  onSale: boolean;
  /** Set from the URL when the customer opens their saved items. */
  wishlistOnly: boolean;
}

export const defaultFilters: FilterState = {
  query: "",
  categories: [],
  types: [],
  min: PRICE_BOUNDS.min,
  max: PRICE_BOUNDS.max,
  sizes: [],
  colors: [],
  minRating: 0,
  inStockOnly: false,
  newArrivals: false,
  bestSellers: false,
  onSale: false,
  wishlistOnly: false,
};

const RATING_OPTIONS = [4.5, 4, 3.5, 3] as const;

const LEGEND = "text-xs font-semibold uppercase tracking-[0.18em] text-ink";

const CATEGORY_LABELS: Record<CategorySlug, string> = {
  men: "Men",
  women: "Women",
  kids: "Kids",
  baby: "Baby",
  toys: "Toys",
  "custom-shirts": "Custom Shirts",
};

/** True when anything differs from the untouched panel. */
export function isDirty(value: FilterState): boolean {
  return (
    value.query.trim() !== "" ||
    value.categories.length > 0 ||
    value.types.length > 0 ||
    value.min !== defaultFilters.min ||
    value.max !== defaultFilters.max ||
    value.sizes.length > 0 ||
    value.colors.length > 0 ||
    value.minRating > 0 ||
    value.inStockOnly ||
    value.newArrivals ||
    value.bestSellers ||
    value.onSale ||
    value.wishlistOnly
  );
}

export interface FilterChip {
  key: string;
  label: string;
  /** Returns the state with only this chip removed. */
  remove: (value: FilterState) => FilterState;
}

/**
 * Flattens the current selection into removable chips so the customer can
 * peel filters off one at a time instead of clearing everything.
 */
export function activeChips(value: FilterState): FilterChip[] {
  const chips: FilterChip[] = [];

  if (value.query.trim()) {
    chips.push({
      key: "query",
      label: `Search: ${value.query.trim()}`,
      remove: (state) => ({ ...state, query: "" }),
    });
  }

  for (const slug of value.categories) {
    chips.push({
      key: `category-${slug}`,
      label: CATEGORY_LABELS[slug],
      remove: (state) => ({
        ...state,
        categories: state.categories.filter((item) => item !== slug),
      }),
    });
  }

  for (const slug of value.types) {
    chips.push({
      key: `type-${slug}`,
      label: subcategoryLabel(slug),
      remove: (state) => ({
        ...state,
        types: state.types.filter((item) => item !== slug),
      }),
    });
  }

  if (value.min !== defaultFilters.min || value.max !== defaultFilters.max) {
    chips.push({
      key: "price",
      label: `${formatPrice(value.min)} to ${formatPrice(value.max)}`,
      remove: (state) => ({
        ...state,
        min: defaultFilters.min,
        max: defaultFilters.max,
      }),
    });
  }

  for (const size of value.sizes) {
    chips.push({
      key: `size-${size}`,
      label: `Size ${size}`,
      remove: (state) => ({
        ...state,
        sizes: state.sizes.filter((item) => item !== size),
      }),
    });
  }

  for (const color of value.colors) {
    chips.push({
      key: `color-${color}`,
      label: color,
      remove: (state) => ({
        ...state,
        colors: state.colors.filter((item) => item !== color),
      }),
    });
  }

  if (value.minRating > 0) {
    chips.push({
      key: "rating",
      label: `${value.minRating} stars and up`,
      remove: (state) => ({ ...state, minRating: 0 }),
    });
  }

  if (value.inStockOnly) {
    chips.push({
      key: "stock",
      label: "In stock only",
      remove: (state) => ({ ...state, inStockOnly: false }),
    });
  }

  if (value.newArrivals) {
    chips.push({
      key: "new",
      label: "New Arrivals",
      remove: (state) => ({ ...state, newArrivals: false }),
    });
  }

  if (value.bestSellers) {
    chips.push({
      key: "best",
      label: "Best Sellers",
      remove: (state) => ({ ...state, bestSellers: false }),
    });
  }

  if (value.onSale) {
    chips.push({
      key: "sale",
      label: "Sale Products",
      remove: (state) => ({ ...state, onSale: false }),
    });
  }

  if (value.wishlistOnly) {
    chips.push({
      key: "wishlist",
      label: "Saved Items",
      remove: (state) => ({ ...state, wishlistOnly: false }),
    });
  }

  return chips;
}

interface ProductFiltersProps {
  value: FilterState;
  onChange: (next: FilterState) => void;
  onClear: () => void;
  /** True when any filter differs from the default, enabling the clear action. */
  dirty: boolean;
}

/**
 * Light theme filter panel for the products page. Every control writes back
 * through onChange so the parent owns a single source of truth.
 */
export function ProductFilters({ value, onChange, onClear, dirty }: ProductFiltersProps) {
  /** Product families narrow to the chosen departments once one is picked. */
  const visibleTypes = useMemo(() => {
    if (value.categories.length === 0) return subcategories;
    return subcategories.filter((sub) =>
      sub.categories.some((slug) => value.categories.includes(slug)),
    );
  }, [value.categories]);

  function toggleCategory(slug: CategorySlug) {
    const nextCategories = value.categories.includes(slug)
      ? value.categories.filter((item) => item !== slug)
      : [...value.categories, slug];

    // Drop product families that no longer belong to any selected department.
    const allowed = new Set(
      subcategories
        .filter(
          (sub) =>
            nextCategories.length === 0 ||
            sub.categories.some((item) => nextCategories.includes(item)),
        )
        .map((sub) => sub.slug),
    );

    onChange({
      ...value,
      categories: nextCategories,
      types: value.types.filter((type) => allowed.has(type)),
    });
  }

  function toggleType(slug: SubcategorySlug) {
    onChange({
      ...value,
      types: value.types.includes(slug)
        ? value.types.filter((item) => item !== slug)
        : [...value.types, slug],
    });
  }

  function toggleSize(size: string) {
    onChange({
      ...value,
      sizes: value.sizes.includes(size)
        ? value.sizes.filter((item) => item !== size)
        : [...value.sizes, size],
    });
  }

  function toggleColor(name: string) {
    onChange({
      ...value,
      colors: value.colors.includes(name)
        ? value.colors.filter((item) => item !== name)
        : [...value.colors, name],
    });
  }

  return (
    <div className="space-y-7">
      {/* Keyword search */}
      <div>
        <label htmlFor="filter-search" className={LEGEND}>
          Search Products
        </label>
        <div className="relative mt-3">
          <Icon
            name="search"
            size={17}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
          />
          <input
            id="filter-search"
            type="search"
            value={value.query}
            onChange={(event) => onChange({ ...value, query: event.target.value })}
            placeholder="Tees, denim, wooden toys"
            className="h-11 w-full rounded-full border border-line bg-canvas pl-11 pr-4 text-sm text-ink placeholder:text-muted transition-colors focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/25"
          />
        </div>
      </div>

      {/* Quick collections */}
      <fieldset>
        <legend className={LEGEND}>Collections</legend>
        <div className="mt-3 space-y-1">
          <CheckRow
            id="filter-new"
            label="New Arrivals"
            checked={value.newArrivals}
            onChange={() => onChange({ ...value, newArrivals: !value.newArrivals })}
          />
          <CheckRow
            id="filter-best"
            label="Best Sellers"
            checked={value.bestSellers}
            onChange={() => onChange({ ...value, bestSellers: !value.bestSellers })}
          />
          <CheckRow
            id="filter-sale"
            label="Sale Products"
            checked={value.onSale}
            onChange={() => onChange({ ...value, onSale: !value.onSale })}
          />
          <CheckRow
            id="filter-stock"
            label="In Stock Only"
            checked={value.inStockOnly}
            onChange={() => onChange({ ...value, inStockOnly: !value.inStockOnly })}
          />
        </div>
      </fieldset>

      {/* Department */}
      <fieldset>
        <legend className={LEGEND}>Department</legend>
        <div className="mt-3 space-y-1">
          {categories.map((category) => (
            <CheckRow
              key={category.slug}
              id={`category-${category.slug}`}
              label={category.name}
              checked={value.categories.includes(category.slug)}
              onChange={() => toggleCategory(category.slug)}
            />
          ))}
        </div>
      </fieldset>

      {/* Product family */}
      <fieldset>
        <legend className={LEGEND}>Product Type</legend>
        <div className="mt-3 max-h-64 space-y-1 overflow-y-auto pr-1">
          {visibleTypes.map((sub) => (
            <CheckRow
              key={sub.slug}
              id={`type-${sub.slug}`}
              label={sub.name}
              checked={value.types.includes(sub.slug)}
              onChange={() => toggleType(sub.slug)}
            />
          ))}
        </div>
      </fieldset>

      {/* Price range */}
      <fieldset>
        <legend className={LEGEND}>Price Range</legend>
        <p className="mt-3 text-sm font-medium text-ink">
          {formatPrice(value.min)} to {formatPrice(value.max)}
        </p>

        <div className="mt-4 space-y-4">
          <div>
            <label htmlFor="filter-min" className="mb-1.5 block text-xs text-muted">
              Minimum price
            </label>
            <input
              id="filter-min"
              type="range"
              min={PRICE_BOUNDS.min}
              max={PRICE_BOUNDS.max}
              step={1}
              value={value.min}
              onChange={(event) => {
                const next = Number(event.target.value);
                // Keep the lower handle from crossing the upper handle.
                onChange({ ...value, min: Math.min(next, value.max - 1) });
              }}
              className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-mist-2 accent-brand"
            />
          </div>
          <div>
            <label htmlFor="filter-max" className="mb-1.5 block text-xs text-muted">
              Maximum price
            </label>
            <input
              id="filter-max"
              type="range"
              min={PRICE_BOUNDS.min}
              max={PRICE_BOUNDS.max}
              step={1}
              value={value.max}
              onChange={(event) => {
                const next = Number(event.target.value);
                onChange({ ...value, max: Math.max(next, value.min + 1) });
              }}
              className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-mist-2 accent-brand"
            />
          </div>
        </div>
      </fieldset>

      {/* Size */}
      <fieldset>
        <legend className={LEGEND}>Size</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {ALL_SIZES.map((size) => {
            const active = value.sizes.includes(size);
            return (
              <button
                key={size}
                type="button"
                onClick={() => toggleSize(size)}
                aria-pressed={active}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-all duration-300 ${
                  active
                    ? "border-brand bg-brand text-white shadow-[0_8px_20px_-12px_rgba(13,127,242,0.9)]"
                    : "border-line bg-canvas text-slate hover:border-brand hover:text-brand"
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Color swatches */}
      <fieldset>
        <legend className={LEGEND}>Color</legend>
        <div className="mt-3 flex flex-wrap gap-2.5">
          {ALL_COLORS.map((color) => {
            const active = value.colors.includes(color.name);
            return (
              <button
                key={color.name}
                type="button"
                onClick={() => toggleColor(color.name)}
                aria-pressed={active}
                aria-label={color.name}
                title={color.name}
                className={`grid h-8 w-8 place-items-center rounded-full border transition-all duration-300 hover:scale-110 ${
                  active
                    ? "border-brand ring-2 ring-brand/35 ring-offset-2 ring-offset-canvas"
                    : "border-line-strong"
                }`}
                style={{ backgroundColor: color.hex }}
              >
                {active ? (
                  <Icon name="check" size={13} className="text-white drop-shadow" />
                ) : null}
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Minimum rating */}
      <fieldset>
        <legend className={LEGEND}>Customer Rating</legend>
        <div className="mt-3 space-y-1">
          {RATING_OPTIONS.map((rating) => {
            const active = value.minRating === rating;
            return (
              <button
                key={rating}
                type="button"
                onClick={() =>
                  onChange({ ...value, minRating: active ? 0 : rating })
                }
                aria-pressed={active}
                className={`flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-sm transition-colors ${
                  active ? "bg-brand-tint text-brand-deep" : "text-slate hover:bg-mist"
                }`}
              >
                <span className="flex items-center gap-0.5" aria-hidden="true">
                  {[0, 1, 2, 3, 4].map((index) => (
                    <Icon
                      key={index}
                      name="star"
                      size={13}
                      filled={index < Math.round(rating)}
                      className={
                        index < Math.round(rating) ? "text-amber-400" : "text-line-strong"
                      }
                    />
                  ))}
                </span>
                <span className="font-medium">{rating} stars and up</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <button
        type="button"
        onClick={onClear}
        disabled={!dirty}
        className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-line-strong bg-canvas text-sm font-semibold text-ink transition-all hover:border-brand hover:text-brand disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:border-line-strong disabled:hover:text-ink"
      >
        <Icon name="refresh" size={16} />
        Clear Filters
      </button>
    </div>
  );
}

function CheckRow({
  id,
  label,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer items-center gap-3 rounded-xl px-2.5 py-2 text-sm text-slate transition-colors hover:bg-mist hover:text-ink"
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="peer sr-only"
      />
      <span
        aria-hidden="true"
        className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border transition-all peer-focus-visible:ring-2 peer-focus-visible:ring-brand ${
          checked ? "border-brand bg-brand text-white" : "border-line-strong bg-canvas"
        }`}
      >
        {checked ? <Icon name="check" size={13} /> : null}
      </span>
      {label}
    </label>
  );
}
