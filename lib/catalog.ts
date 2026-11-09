import type {
  CategorySlug,
  Product,
  ProductBadge,
  SortOption,
  SubcategorySlug,
} from "@/lib/types";

/**
 * Pure catalogue helpers. Every function takes the catalogue as an argument
 * so the same code runs on the server (live store) and in the browser
 * (catalogue passed down from the root layout).
 */

export function getProductBySlug(list: Product[], slug: string): Product | undefined {
  return list.find((product) => product.slug === slug);
}

export function getProductsByCategory(list: Product[], category: CategorySlug): Product[] {
  return list.filter((product) => product.category === category);
}

export function getProductsBySubcategory(list: Product[], sub: SubcategorySlug): Product[] {
  return list.filter((product) => product.subcategory === sub);
}

export function getFeaturedProducts(list: Product[], limit = 8): Product[] {
  return list.filter((product) => product.featured).slice(0, limit);
}

export function getNewArrivals(list: Product[], limit = 8): Product[] {
  return list.filter((product) => product.newArrival).slice(0, limit);
}

export function getBestSellers(list: Product[], limit = 8): Product[] {
  return list.filter((product) => product.bestSeller).slice(0, limit);
}

export function getLimitedStock(list: Product[], limit = 4): Product[] {
  return list.filter((product) => product.limitedStock).slice(0, limit);
}

/** Products currently discounted, sorted by the deepest saving first. */
export function getSaleProducts(list: Product[], limit = 8): Product[] {
  return list
    .filter((product) => (product.discount ?? 0) > 0)
    .sort((a, b) => (b.discount ?? 0) - (a.discount ?? 0))
    .slice(0, limit);
}

export function countByCategory(list: Product[], category: CategorySlug): number {
  return getProductsByCategory(list, category).length;
}

export function countBySubcategory(list: Product[], sub: SubcategorySlug): number {
  return getProductsBySubcategory(list, sub).length;
}
/** The badge shown on a product card, in priority order. */
export function productBadge(product: Product): ProductBadge | null {
  if (product.limitedStock) return "limited";
  if (product.newArrival) return "new";
  if (product.bestSeller) return "bestseller";
  if ((product.discount ?? 0) >= 25) return "sale";
  return null;
}

/**
 * Related products prefer the same subcategory, then fall back to the same
 * department so the section is never left short of items.
 */
export function getRelatedProducts(list: Product[], product: Product, limit = 4): Product[] {
  const sameSub = list.filter(
    (item) => item.id !== product.id && item.subcategory === product.subcategory,
  );
  const sameCategory = list.filter(
    (item) =>
      item.id !== product.id &&
      item.category === product.category &&
      !sameSub.includes(item),
  );
  const rest = list.filter(
    (item) =>
      item.id !== product.id &&
      !sameSub.includes(item) &&
      !sameCategory.includes(item),
  );
  return [...sameSub, ...sameCategory, ...rest].slice(0, limit);
}

/** Complementary picks used by the frequently bought together module. */
export function getFrequentlyBoughtTogether(
  list: Product[],
  product: Product,
  limit = 2,
): Product[] {
  const sameDepartment = list.filter(
    (item) => item.id !== product.id && item.category === product.category,
  );
  const complements = sameDepartment.filter(
    (item) => item.subcategory !== product.subcategory,
  );
  return (complements.length >= limit ? complements : sameDepartment).slice(0, limit);
}

export function getProductsByIds(list: Product[], ids: string[]): Product[] {
  return ids
    .map((id) => list.find((product) => product.id === id))
    .filter((product): product is Product => Boolean(product));
}

/**
 * Range of the price filter. The top of the range means "no upper limit", so
 * products priced above it by the admin are never hidden by default.
 */
export const PRICE_BOUNDS = { min: 0, max: 150 };

/** Every size offered anywhere in the catalogue, used by the size filter. */
export function allSizes(list: Product[]): string[] {
  return Array.from(new Set(list.flatMap((product) => product.sizes)));
}

/** Every color offered anywhere, used by the color filter. */
export function allColors(list: Product[]): Product["colors"] {
  return Array.from(
    new Map(list.flatMap((product) => product.colors).map((color) => [color.name, color])).values(),
  );
}

/** Sorts a list without mutating the input. */
export function sortProducts(list: Product[], sort: SortOption): Product[] {
  const sorted = [...list];
  switch (sort) {
    case "price-low":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-high":
      return sorted.sort((a, b) => b.price - a.price);
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating);
    case "popularity":
      return sorted.sort(
        (a, b) => b.rating * b.reviewCount - a.rating * a.reviewCount,
      );
    case "latest":
      return sorted.sort((a, b) => {
        if (a.newArrival !== b.newArrival) return a.newArrival ? -1 : 1;
        return b.id.localeCompare(a.id);
      });
    case "featured":
    default:
      return sorted.sort((a, b) => {
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        if (a.bestSeller !== b.bestSeller) return a.bestSeller ? -1 : 1;
        return b.rating - a.rating;
      });
  }
}

/** Simple case insensitive match across name, category and description. */
export function searchProducts(list: Product[], term: string): Product[] {
  const query = term.trim().toLowerCase();
  if (!query) return list;
  return list.filter((product) =>
    [
      product.name,
      product.category,
      product.subcategory.replace(/-/g, " "),
      product.subtitle,
      product.shortDescription,
      product.material,
    ]
      .join(" ")
      .toLowerCase()
      .includes(query),
  );
}

/** Every shirt in the Custom Shirts department. */
export function getCustomShirts(list: Product[]): Product[] {
  return list.filter((product) => product.category === "custom-shirts");
}
