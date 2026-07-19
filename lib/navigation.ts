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
  {
    label: "Men",
    href: "/categories/men",
    description: "Shirts, pants, trousers and kurta shalwar",
  },
  {
    label: "Women",
    href: "/categories/women",
    description: "Lawn shirts, trousers and festive sets",
  },
  {
    label: "Kids",
    href: "/categories/kids",
    description: "Kids clothes, baby clothes and toys",
  },
];

export const contactNav: NavLink = { label: "Contact Us", href: "/contact" };

/** Quick links column in the footer. */
export const footerQuickLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "All Products", href: "/products" },
  { label: "Product Categories", href: "/categories" },
  { label: "Contact Us", href: "/contact" },
];

/** Category column in the footer. */
export const footerCategoryLinks: NavLink[] = [
  { label: "Men Clothing", href: "/categories/men" },
  { label: "Women Clothing", href: "/categories/women" },
  { label: "Kids Clothes", href: "/categories/kids" },
  { label: "Baby Clothes", href: "/products?category=kids&type=baby-clothes" },
  { label: "Toys", href: "/products?category=kids&type=toys" },
  { label: "Kurta Shalwar", href: "/products?type=kurta-shalwar" },
];

/** Customer support column in the footer. */
export const footerSupportLinks: NavLink[] = [
  { label: "Shopping Cart", href: "/cart" },
  { label: "Checkout", href: "/checkout" },
  { label: "Delivery and Returns", href: "/contact#faq" },
  { label: "Frequently Asked Questions", href: "/contact#faq" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms and Conditions", href: "/terms-and-conditions" },
];
