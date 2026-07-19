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
];

/** Entries inside the Categories dropdown. */
export const categoryNav: NavLink[] = [
  { label: "Men", href: "/categories/men", description: "Tees, shirts, denim and outerwear" },
  { label: "Women", href: "/categories/women", description: "Tops, dresses, knitwear and activewear" },
  { label: "Kids", href: "/categories/kids", description: "Everyday clothing built for play" },
  { label: "Baby", href: "/categories/baby", description: "Soft cotton rompers and sets" },
  { label: "Toys", href: "/categories/toys", description: "Wooden, soft and educational toys" },
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
  { label: "Sale", href: "/products?filter=sale" },
];

/** Customer support column in the footer. */
export const footerSupportLinks: NavLink[] = [
  { label: "Shopping Cart", href: "/cart" },
  { label: "Secure Checkout", href: "/checkout" },
  { label: "Shipping Information", href: "/contact#faq" },
  { label: "Easy Returns", href: "/contact#faq" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms and Conditions", href: "/terms-and-conditions" },
];
