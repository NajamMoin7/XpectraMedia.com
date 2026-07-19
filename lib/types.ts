/**
 * Shared domain models for the Xpectra Media storefront.
 * Everything here is static, typed data. There is no backend or database.
 */

/** Top level shopping department. */
export type CategorySlug = "men" | "women" | "kids";

/** Product family used for filtering and category landing pages. */
export type SubcategorySlug =
  | "shirts"
  | "pants"
  | "trousers"
  | "kurta-shalwar"
  | "baby-clothes"
  | "toys";

export interface Product {
  id: string;
  name: string;
  /** URL friendly identifier used by the dynamic product route. */
  slug: string;
  category: CategorySlug;
  subcategory: SubcategorySlug;
  /** One line summary shown on cards and in meta descriptions. */
  shortDescription: string;
  /** Full copy shown on the product details page. */
  detailedDescription: string;
  /** Selling price in PKR. */
  price: number;
  /** Recommended retail price in PKR, when the item is discounted. */
  originalPrice?: number;
  /** Whole number percentage saved against the original price. */
  discount?: number;
  /** Average rating from 0 to 5. */
  rating: number;
  reviewCount: number;
  stock: number;
  sizes: string[];
  colors: ProductColor[];
  images: string[];
  features: string[];
  material: string;
  careInstructions: string[];
  featured: boolean;
  newArrival: boolean;
}

export interface ProductColor {
  name: string;
  /** Hex swatch rendered in the colour picker. */
  hex: string;
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

/** A single line in the shopping cart. Size and colour make the line unique. */
export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  quote: string;
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
  province: string;
  city: string;
  address: string;
  landmark: string;
  postalCode: string;
  notes: string;
  items: CartItem[];
  subtotal: number;
  delivery: number;
  total: number;
  paymentMethod: "Cash on Delivery";
}

export type SortOption =
  | "latest"
  | "price-low"
  | "price-high"
  | "popularity";

export type ViewMode = "grid" | "list";
