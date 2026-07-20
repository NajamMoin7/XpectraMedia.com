/**
 * Shared domain models for the Xpectra Media storefront.
 * Everything here is static, typed data. There is no backend or database.
 */

/** Top level shopping department. */
export type CategorySlug =
  | "men"
  | "women"
  | "kids"
  | "baby"
  | "toys"
  | "custom-shirts";

/** Product family used for filtering and category landing pages. */
export type SubcategorySlug =
  | "t-shirts"
  | "shirts"
  | "jeans"
  | "pants"
  | "cargo-pants"
  | "hoodies"
  | "jackets"
  | "sweatshirts"
  | "tops"
  | "dresses"
  | "wide-leg-pants"
  | "sweaters"
  | "activewear"
  | "jogger-sets"
  | "denim-sets"
  | "casual-wear"
  | "outerwear"
  | "rompers"
  | "cotton-sets"
  | "sleepwear"
  | "accessories"
  | "educational-toys"
  | "wooden-toys"
  | "soft-toys"
  | "activity-toys"
  | "creative-toys"
  | "custom-tees"
  | "custom-polos"
  | "custom-long-sleeve"
  | "custom-sweatshirts"
  | "custom-uniforms"
  | "bulk-custom";

export interface ProductColor {
  name: string;
  /** Hex swatch rendered in the color picker. */
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  /** URL friendly identifier used by the dynamic product route. */
  slug: string;
  category: CategorySlug;
  subcategory: SubcategorySlug;
  /** Short line shown under the product name on cards. */
  subtitle: string;
  shortDescription: string;
  detailedDescription: string;
  /** Selling price in USD. */
  price: number;
  /** Regular price in USD, when the item is on sale. */
  originalPrice?: number;
  /** Whole number percentage saved against the original price. */
  discount?: number;
  /** Average rating from 0 to 5. */
  rating: number;
  reviewCount: number;
  stock: number;
  sizes: string[];
  colors: ProductColor[];
  /** At least three gallery images, all stored locally. */
  images: string[];
  material: string;
  features: string[];
  careInstructions: string[];
  shippingInfo: string;
  returnInfo: string;
  featured: boolean;
  newArrival: boolean;
  bestSeller: boolean;
  limitedStock: boolean;
}

export interface Category {
  slug: CategorySlug;
  name: string;
  tagline: string;
  description: string;
  image: string;
  href: string;
}

export interface Subcategory {
  slug: SubcategorySlug;
  name: string;
  description: string;
  image: string;
  /** Departments this product family appears in. */
  categories: CategorySlug[];
}

/** A single line in the shopping cart. Size and color make the line unique. */
export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
  /** Present only on shirts configured in the customization tool. */
  custom?: CustomShirtConfig;
}

/** Placement of the uploaded artwork on the shirt. */
export type PrintOption = "front" | "back" | "both";

/** Where the uploaded design sits inside the safe print area. */
export interface DesignTransform {
  /** Horizontal offset in percent of the print area, 0 is centered. */
  x: number;
  /** Vertical offset in percent of the print area, 0 is centered. */
  y: number;
  /** Scale multiplier applied to the artwork. */
  scale: number;
  /** Rotation in degrees. */
  rotation: number;
}

/**
 * Everything needed to reproduce a customized shirt in the cart and on the
 * order confirmation. The artwork is a browser data URL, never uploaded.
 */
export interface CustomShirtConfig {
  styleId: string;
  styleName: string;
  colorName: string;
  colorHex: string;
  printOption: PrintOption;
  printLabel: string;
  /** Data URL preview of the uploaded artwork. */
  artwork: string;
  artworkName: string;
  transform: DesignTransform;
  /** Base shirt price before printing charges. */
  unitPrice: number;
  /** Additional charge for the chosen print placement. */
  printCharge: number;
  /** Whole number percentage removed for the chosen quantity. */
  discountPercent: number;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  quote: string;
  /** What the customer bought, shown instead of a location. */
  purchase: string;
}

export interface Faq {
  question: string;
  answer: string;
}

/** Checkout details captured on the frontend and echoed back on confirmation. */
export interface OrderDetails {
  orderNumber: string;
  placedAt: string;
  fullName: string;
  email: string;
  phone: string;
  altPhone: string;
  street: string;
  apartment: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  notes: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: "Cash on Delivery";
}

export type SortOption =
  | "featured"
  | "latest"
  | "price-low"
  | "price-high"
  | "rating"
  | "popularity";

export type ViewMode = "grid" | "list";

/** Badge shown on a product card, in priority order. */
export type ProductBadge = "sale" | "new" | "bestseller" | "limited";
