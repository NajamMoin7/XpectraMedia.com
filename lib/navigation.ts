/** Navigation model shared by the header, mobile drawer and footer. */

export interface NavLink {
  label: string;
  href: string;
  description?: string;
}

export const primaryNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Custom Shirts", href: "/custom-shirts" },
];

/** Entries inside the Categories dropdown. */
export const categoryNav: NavLink[] = [
  { label: "Men", href: "/categories/men", description: "Tees, shirts, denim and outerwear" },
  { label: "Women", href: "/categories/women", description: "Tops, dresses, knitwear and activewear" },
  { label: "Kids", href: "/categories/kids", description: "Everyday clothing built for play" },
  { label: "Baby", href: "/categories/baby", description: "Soft cotton rompers and sets" },
  { label: "Toys", href: "/categories/toys", description: "Wooden, soft and educational toys" },
  {
    label: "Custom Shirts",
    href: "/custom-shirts",
    description: "Upload a logo and preview it instantly",
  },
];

export const contactNav: NavLink = { label: "Contact Us", href: "/contact" };

/** Quick links column in the footer. */
export const footerQuickLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Shop All Products", href: "/products" },
  { label: "New Arrivals", href: "/products?sort=latest" },
  { label: "Best Sellers", href: "/products?filter=bestsellers" },
  { label: "Contact Us", href: "/contact" },
];

/** Category column in the footer. */
export const footerCategoryLinks: NavLink[] = [
  { label: "Men's Clothing", href: "/categories/men" },
  { label: "Women's Clothing", href: "/categories/women" },
  { label: "Kids Clothing", href: "/categories/kids" },
  { label: "Baby Clothes", href: "/categories/baby" },
  { label: "Toys", href: "/categories/toys" },
  { label: "Custom Shirts", href: "/custom-shirts" },
];

/**
 * Customer support column. Every entry has its own dedicated page, so no two
 * links in this list may point at the same route.
 */
export const footerSupportLinks: NavLink[] = [
  { label: "Shopping Cart", href: "/support/shopping-cart" },
  { label: "Secure Checkout", href: "/support/secure-checkout" },
  { label: "Shipping Information", href: "/support/shipping-information" },
  { label: "Easy Returns", href: "/support/easy-returns" },
  { label: "Shipping and Returns", href: "/support/shipping-and-returns" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms and Conditions", href: "/terms-and-conditions" },
];

/** Custom Shirts column in the footer. */
export const footerCustomLinks: NavLink[] = [
  { label: "Design Your Shirt", href: "/custom-shirts/design" },
  { label: "Custom Shirt Pricing", href: "/custom-shirts/pricing" },
  { label: "Upload Guidelines", href: "/custom-shirts/upload-guidelines" },
  { label: "Custom Product Policy", href: "/custom-shirts/policy" },
  { label: "Bulk Orders", href: "/custom-shirts/bulk-orders" },
];
