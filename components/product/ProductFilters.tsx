"use client";

import { Icon } from "@/components/ui/Icon";
import { categories, subcategories } from "@/lib/categories";
import { formatPrice } from "@/lib/format";
import { PRICE_BOUNDS } from "@/lib/products";
import type { CategorySlug, SubcategorySlug } from "@/lib/types";

export interface FilterState {
  query: string;
  categories: CategorySlug[];
  types: SubcategorySlug[];
  min: number;
  max: number;
}

export const defaultFilters: FilterState = {
  query: "",
  categories: [],
  types: [],
  min: PRICE_BOUNDS.min,
  max: PRICE_BOUNDS.max,
};

interface ProductFiltersProps {
  value: FilterState;
  onChange: (next: FilterState) => void;
  onClear: () => void;
  /** True when any filter differs from the default, enabling the clear action. */
  dirty: boolean;
}

/**
 * Filter panel for the products page: keyword search, department, product
 * family and a price range. All filtering runs against the local catalogue.
 */
export function ProductFilters({ value, onChange, onClear, dirty }: ProductFiltersProps) {
  function toggleCategory(slug: CategorySlug) {
    onChange({
      ...value,
      categories: value.categories.includes(slug)
        ? value.categories.filter((item) => item !== slug)
        : [...value.categories, slug],
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

  return (
    <div className="space-y-7">
      {/* Keyword search */}
      <div>
        <label
          htmlFor="filter-search"
          className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-white"
        >
          Search Products
        </label>
        <div className="relative">
          <Icon
            name="search"
            size={17}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-mist-dim"
          />
          <input
            id="filter-search"
            type="search"
            value={value.query}
            onChange={(event) => onChange({ ...value, query: event.target.value })}
            placeholder="Shirts, trousers, toys"
            className="h-11 w-full rounded-full border border-line bg-surface pl-11 pr-4 text-sm text-white placeholder:text-mist-dim transition-colors focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40"
          />
        </div>
      </div>

      {/* Department */}
      <fieldset>
        <legend className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-white">
          Category
        </legend>
        <div className="space-y-1">
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
        <legend className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-white">
          Product Type
        </legend>
        <div className="space-y-1">
          {subcategories.map((sub) => (
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
        <legend className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-white">
          Price Range
        </legend>
        <p className="mb-4 text-sm text-mist">
          {formatPrice(value.min)} to {formatPrice(value.max)}
        </p>

        <div className="space-y-4">
          <div>
            <label htmlFor="filter-min" className="mb-1.5 block text-xs text-mist-dim">
              Minimum price
            </label>
            <input
              id="filter-min"
              type="range"
              min={PRICE_BOUNDS.min}
              max={PRICE_BOUNDS.max}
              step={100}
              value={value.min}
              onChange={(event) => {
                const next = Number(event.target.value);
                // Keep the lower handle from crossing the upper handle.
                onChange({ ...value, min: Math.min(next, value.max - 100) });
              }}
              className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-surface-3 accent-brand"
            />
          </div>
          <div>
            <label htmlFor="filter-max" className="mb-1.5 block text-xs text-mist-dim">
              Maximum price
            </label>
            <input
              id="filter-max"
              type="range"
              min={PRICE_BOUNDS.min}
              max={PRICE_BOUNDS.max}
              step={100}
              value={value.max}
              onChange={(event) => {
                const next = Number(event.target.value);
                onChange({ ...value, max: Math.max(next, value.min + 100) });
              }}
              className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-surface-3 accent-brand"
            />
          </div>
        </div>
      </fieldset>

      <button
        type="button"
        onClick={onClear}
        disabled={!dirty}
        className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-line bg-surface-2 text-sm font-semibold text-white transition-all hover:border-brand hover:text-brand-bright disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:border-line disabled:hover:text-white"
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
      className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 text-sm text-mist transition-colors hover:bg-surface-2 hover:text-white"
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
          checked ? "border-brand bg-brand text-white" : "border-line bg-surface"
        }`}
      >
        {checked ? <Icon name="check" size={13} /> : null}
      </span>
      {label}
    </label>
  );
}
