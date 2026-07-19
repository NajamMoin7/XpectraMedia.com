import type { Category, Subcategory } from "@/lib/types";

/** The three shopping departments used across navigation and landing pages. */
export const categories: Category[] = [
  {
    slug: "men",
    name: "Men",
    tagline: "Sharp everyday essentials",
    description:
      "Men clothing online in Pakistan built around pieces you actually reach for: breathable casual shirts, crisp formal shirts, chinos, tailored trousers and traditional kurta shalwar sets ready for work, weekends and celebrations.",
    image: "/assets/images/categories/men.svg",
    href: "/categories/men",
  },
  {
    slug: "women",
    name: "Women",
    tagline: "Elegant and effortless",
    description:
      "Women clothing online covering soft lawn and rayon shirts, straight and palazzo trousers, comfortable stretch pants and festive kurta shalwar sets, chosen for fabrics that stay comfortable in Pakistani weather.",
    image: "/assets/images/categories/women.svg",
    href: "/categories/women",
  },
  {
    slug: "kids",
    name: "Kids",
    tagline: "Play ready and gentle",
    description:
      "Kids clothes online alongside baby clothes in Pakistan and toys online in Pakistan, from durable school trousers and soft cotton shirts to newborn sets, sleep suits, educational toys and cuddly soft toys.",
    image: "/assets/images/categories/kids.svg",
    href: "/categories/kids",
  },
];

/** Product families shown on the categories page and used by filters. */
export const subcategories: Subcategory[] = [
  {
    slug: "shirts",
    name: "Shirts",
    description:
      "Casual and formal shirts for men, women and kids in cotton, lawn and rayon, cut for comfort and finished to hold their shape.",
    image: "/assets/images/categories/shirts.svg",
    categories: ["men", "women", "kids"],
  },
  {
    slug: "pants",
    name: "Pants",
    description:
      "Everyday pants including stretch chinos, cotton cargos and soft joggers, made to move with you from morning until evening.",
    image: "/assets/images/categories/pants.svg",
    categories: ["men", "women", "kids"],
  },
  {
    slug: "trousers",
    name: "Trousers",
    description:
      "Tailored formal trousers, relaxed denim and lightweight palazzos with clean lines and fabrics that resist creasing.",
    image: "/assets/images/categories/trousers.svg",
    categories: ["men", "women", "kids"],
  },
  {
    slug: "kurta-shalwar",
    name: "Kurta Shalwar",
    description:
      "Kurta shalwar online for men and women, from breathable everyday cotton sets to embroidered chikankari and velvet pieces for Eid and weddings.",
    image: "/assets/images/categories/kurta-shalwar.svg",
    categories: ["men", "women"],
  },
  {
    slug: "baby-clothes",
    name: "Baby Clothes",
    description:
      "Baby clothes in Pakistan made from gentle cotton, including rompers, newborn sets and warm sleep suits designed for easy changing.",
    image: "/assets/images/categories/baby-clothes.svg",
    categories: ["kids"],
  },
  {
    slug: "toys",
    name: "Toys",
    description:
      "Toys online in Pakistan chosen for safety and play value, spanning educational wooden blocks, activity sorters and soft cuddly toys.",
    image: "/assets/images/categories/toys.svg",
    categories: ["kids"],
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}

export function getSubcategory(slug: string): Subcategory | undefined {
  return subcategories.find((sub) => sub.slug === slug);
}

/** Product families available inside a single department. */
export function subcategoriesFor(categorySlug: Category["slug"]): Subcategory[] {
  return subcategories.filter((sub) => sub.categories.includes(categorySlug));
}

/** Human readable label for a subcategory slug, used by cards and filters. */
export function subcategoryLabel(slug: string): string {
  return getSubcategory(slug)?.name ?? slug;
}
