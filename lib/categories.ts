import type { Category, CategorySlug, Subcategory } from "@/lib/types";

/** The five shopping departments used across navigation and landing pages. */
export const categories: Category[] = [
  {
    slug: "men",
    name: "Men",
    tagline: "Everyday essentials, elevated",
    description:
      "Men's clothing online built around pieces you actually reach for: oversized tees, premium cotton shirts, slim fit jeans, cargo pants, hoodies and jackets made for real weeks.",
    image: "/assets/images/categories/men.jpg",
    href: "/categories/men",
  },
  {
    slug: "women",
    name: "Women",
    tagline: "Effortless modern style",
    description:
      "Women's clothing online spanning everyday tops, casual dresses, wide leg pants, denim jackets, knit sweaters and activewear sets designed for comfort and confidence.",
    image: "/assets/images/categories/women.jpg",
    href: "/categories/women",
  },
  {
    slug: "kids",
    name: "Kids",
    tagline: "Built for play",
    description:
      "Kids clothing online that survives real childhoods, from graphic tees and zip hoodies to jogger sets, denim sets and soft everyday layers.",
    image: "/assets/images/categories/kids.jpg",
    href: "/categories/kids",
  },
  {
    slug: "baby",
    name: "Baby",
    tagline: "Gentle from the first wear",
    description:
      "Baby clothes online in soft cotton, including rompers, everyday sets, sleepwear and light jackets designed around easy changing.",
    image: "/assets/images/categories/baby.jpg",
    href: "/categories/baby",
  },
  {
    slug: "toys",
    name: "Toys",
    tagline: "Play worth keeping",
    description:
      "Toys online chosen for safety and play value, covering educational toys, wooden toys, soft toys, activity toys and creative building sets.",
    image: "/assets/images/categories/toys.jpg",
    href: "/categories/toys",
  },
  {
    slug: "custom-shirts",
    name: "Custom Shirts",
    tagline: "Your design, printed to order",
    description:
      "Custom shirts online with your own logo or artwork. Upload a design, preview it on the shirt instantly, choose a style, color and size, then order printed shirts for a company, a team or an event.",
    image: "/assets/images/categories/custom-shirts.jpg",
    href: "/custom-shirts",
  },
];

/** Product families shown on the categories page and used by filters. */
export const subcategories: Subcategory[] = [
  // Men
  {
    slug: "t-shirts",
    name: "T Shirts",
    description:
      "Oversized and classic fit tees in heavyweight cotton that hold their shape wash after wash.",
    image: "/assets/images/categories/t-shirts.jpg",
    categories: ["men", "kids"],
  },
  {
    slug: "shirts",
    name: "Shirts",
    description:
      "Premium cotton and linen blend shirts cut for the office, the weekend and everything between.",
    image: "/assets/images/categories/shirts.jpg",
    categories: ["men"],
  },
  {
    slug: "jeans",
    name: "Jeans",
    description:
      "Slim, straight and relaxed denim with real stretch and a soft broken in finish.",
    image: "/assets/images/categories/jeans.jpg",
    categories: ["men", "women"],
  },
  {
    slug: "pants",
    name: "Pants",
    description:
      "Twill and chino pants that move easily and keep a clean line through a long day.",
    image: "/assets/images/categories/pants.jpg",
    categories: ["men"],
  },
  {
    slug: "cargo-pants",
    name: "Cargo Pants",
    description:
      "Utility cargo pants with reinforced pockets and a tapered modern leg.",
    image: "/assets/images/products/utility-cargo-pants-1.jpg",
    categories: ["men"],
  },
  {
    slug: "hoodies",
    name: "Hoodies",
    description:
      "Brushed fleece hoodies with a heavyweight feel and a hood that actually holds its shape.",
    image: "/assets/images/categories/hoodies.jpg",
    categories: ["men", "women", "kids"],
  },
  {
    slug: "jackets",
    name: "Jackets",
    description:
      "Bomber jackets, denim jackets and light layers for shoulder season.",
    image: "/assets/images/categories/jackets.jpg",
    categories: ["men", "women", "baby"],
  },
  {
    slug: "sweatshirts",
    name: "Sweatshirts",
    description:
      "Crewneck sweatshirts in soft loopback cotton, easy to layer and easy to wear.",
    image: "/assets/images/categories/sweatshirts.jpg",
    categories: ["men"],
  },

  // Women
  {
    slug: "tops",
    name: "Tops",
    description:
      "Everyday tops and crop styles in breathable knits that pair with everything.",
    image: "/assets/images/categories/tops.jpg",
    categories: ["women"],
  },
  {
    slug: "dresses",
    name: "Dresses",
    description:
      "Casual dresses in flowing fabrics, cut to move and finished with care.",
    image: "/assets/images/categories/dresses.jpg",
    categories: ["women"],
  },
  {
    slug: "wide-leg-pants",
    name: "Wide Leg Pants",
    description:
      "High rise wide leg pants with a fluid drape that lengthens every outfit.",
    image: "/assets/images/products/high-rise-wide-leg-pants-1.jpg",
    categories: ["women"],
  },
  {
    slug: "sweaters",
    name: "Sweaters",
    description:
      "Chunky and fine gauge knits in yarns chosen for softness and warmth.",
    image: "/assets/images/categories/sweaters.jpg",
    categories: ["women"],
  },
  {
    slug: "activewear",
    name: "Activewear",
    description:
      "Seamless activewear sets with real compression and a smooth second skin feel.",
    image: "/assets/images/categories/activewear.jpg",
    categories: ["women"],
  },

  // Kids
  {
    slug: "jogger-sets",
    name: "Jogger Sets",
    description:
      "Matching jogger sets in soft fleece with elastic waists kids can manage alone.",
    image: "/assets/images/products/kids-jogger-set-1.jpg",
    categories: ["kids"],
  },
  {
    slug: "denim-sets",
    name: "Denim Sets",
    description:
      "Coordinated denim sets built to handle climbing, cycling and everything after school.",
    image: "/assets/images/products/kids-denim-two-piece-set-1.jpg",
    categories: ["kids"],
  },
  {
    slug: "casual-wear",
    name: "Casual Wear",
    description:
      "Everyday outfits that mix and match easily and wash back to looking neat.",
    image: "/assets/images/products/kids-everyday-casual-outfit-1.jpg",
    categories: ["kids"],
  },
  {
    slug: "outerwear",
    name: "Outerwear",
    description:
      "Cardigans and light layers for cool mornings and unpredictable afternoons.",
    image: "/assets/images/products/kids-knit-cardigan-1.jpg",
    categories: ["kids"],
  },

  // Baby
  {
    slug: "rompers",
    name: "Rompers",
    description:
      "Organic cotton rompers with full length snaps that make changing quick.",
    image: "/assets/images/categories/rompers.jpg",
    categories: ["baby"],
  },
  {
    slug: "cotton-sets",
    name: "Cotton Sets",
    description:
      "Multi piece cotton sets that layer together and make a genuinely useful gift.",
    image: "/assets/images/products/baby-cotton-essentials-set-1.jpg",
    categories: ["baby"],
  },
  {
    slug: "sleepwear",
    name: "Sleepwear",
    description:
      "Soft sleepwear with covered feet and two way zips for easier night changes.",
    image: "/assets/images/products/baby-sleepwear-set-1.jpg",
    categories: ["baby"],
  },
  {
    slug: "accessories",
    name: "Accessories",
    description:
      "Caps, mittens, booties and the small pieces that complete a baby wardrobe.",
    image: "/assets/images/products/baby-accessories-gift-set-1.jpg",
    categories: ["baby"],
  },

  // Toys
  {
    slug: "educational-toys",
    name: "Educational Toys",
    description:
      "Counting, sorting and early literacy toys that turn learning into play.",
    image: "/assets/images/categories/educational-toys.jpg",
    categories: ["toys"],
  },
  {
    slug: "wooden-toys",
    name: "Wooden Toys",
    description:
      "Solid wood toys with hand rounded edges and water based non toxic paint.",
    image: "/assets/images/categories/wooden-toys.jpg",
    categories: ["toys"],
  },
  {
    slug: "soft-toys",
    name: "Soft Toys",
    description:
      "Plush companions with embroidered features and no small parts.",
    image: "/assets/images/categories/soft-toys.jpg",
    categories: ["toys"],
  },
  {
    slug: "activity-toys",
    name: "Activity Toys",
    description:
      "Hands on toys that build coordination, patience and problem solving.",
    image: "/assets/images/products/creative-building-blocks-set-1.jpg",
    categories: ["toys"],
  },
  {
    slug: "creative-toys",
    name: "Creative Toys",
    description:
      "Open ended sets that reward imagination rather than a single right answer.",
    image: "/assets/images/products/wooden-toy-vehicle-set-1.jpg",
    categories: ["toys"],
  },

  // Custom Shirts
  {
    slug: "custom-tees",
    name: "Custom T Shirts",
    description:
      "Heavyweight cotton tees printed with your own logo or artwork, from a single shirt to a full team order.",
    image: "/assets/images/products/classic-custom-t-shirt-1.jpg",
    categories: ["custom-shirts"],
  },
  {
    slug: "custom-polos",
    name: "Custom Polo Shirts",
    description:
      "Structured pique polos with an embroidered look print, cut for staff uniforms and client facing teams.",
    image: "/assets/images/products/premium-custom-polo-shirt-1.jpg",
    categories: ["custom-shirts"],
  },
  {
    slug: "custom-long-sleeve",
    name: "Custom Long Sleeve",
    description:
      "Full sleeve cotton shirts with room for a front logo and a larger back design.",
    image: "/assets/images/products/custom-long-sleeve-shirt-1.jpg",
    categories: ["custom-shirts"],
  },
  {
    slug: "custom-sweatshirts",
    name: "Custom Sweatshirts",
    description:
      "Brushed fleece crewnecks that carry a large print beautifully and wear well all season.",
    image: "/assets/images/products/custom-sweatshirt-1.jpg",
    categories: ["custom-shirts"],
  },
  {
    slug: "custom-uniforms",
    name: "Custom Uniforms",
    description:
      "Consistent branded shirts for storefronts, service teams and trade shows.",
    image: "/assets/images/products/custom-company-uniform-shirt-1.jpg",
    categories: ["custom-shirts"],
  },
  {
    slug: "bulk-custom",
    name: "Bulk Custom Orders",
    description:
      "Volume pricing that drops automatically at ten, twenty five and fifty shirts.",
    image: "/assets/images/products/bulk-custom-shirt-package-1.jpg",
    categories: ["custom-shirts"],
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}

export function getSubcategory(slug: string): Subcategory | undefined {
  return subcategories.find((sub) => sub.slug === slug);
}

/** Product families available inside a single department. */
export function subcategoriesFor(categorySlug: CategorySlug): Subcategory[] {
  return subcategories.filter((sub) => sub.categories.includes(categorySlug));
}

/** Human readable label for a subcategory slug, used by cards and filters. */
export function subcategoryLabel(slug: string): string {
  return getSubcategory(slug)?.name ?? slug;
}

/**
 * Human readable label for a department slug. Slugs such as custom-shirts
 * contain a hyphen, so they must never be rendered directly as visible text.
 */
export function categoryLabel(slug: string): string {
  return getCategory(slug)?.name ?? slug.replace(/-/g, " ");
}
