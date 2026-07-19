/**
 * Single source of truth for brand details, contact information and
 * commerce rules. Imported by metadata, structured data, header and footer.
 */

export const site = {
  name: "Xpectra Media",
  legalName: "Xpectra Media",
  /** Used by metadataBase, canonical URLs, sitemap and structured data. */
  url: "https://xpectramedia.com",
  tagline: "Style for Every Generation",
  description:
    "Xpectra Media is an online shopping destination in Pakistan offering men clothing, women clothing, kids clothes, baby clothes and toys with Cash on Delivery nationwide.",
  logo: "/assets/images/logo/logo.jpeg",
  ogImage: "/opengraph-image",
  locale: "en_PK",
  currency: "PKR",
  contact: {
    phone: "+92 300 1234567",
    phoneHref: "tel:+923001234567",
    whatsapp: "+92 300 1234567",
    /** wa.me expects the number without spaces or a leading plus prefix. */
    whatsappHref: "https://wa.me/923001234567",
    email: "support@xpectramedia.com",
    emailHref: "mailto:support@xpectramedia.com",
    addressLine: "Office 12, Second Floor, Gulberg Trade Centre",
    city: "Lahore",
    region: "Punjab",
    postalCode: "54000",
    country: "Pakistan",
    hours: [
      { days: "Monday to Friday", time: "9:00 AM to 8:00 PM" },
      { days: "Saturday", time: "10:00 AM to 6:00 PM" },
      { days: "Sunday", time: "Closed for orders, support by WhatsApp" },
    ],
  },
  social: [
    { name: "Facebook", href: "https://facebook.com/xpectramedia" },
    { name: "Instagram", href: "https://instagram.com/xpectramedia" },
    { name: "X", href: "https://x.com/xpectramedia" },
    { name: "YouTube", href: "https://youtube.com/@xpectramedia" },
  ],
} as const;

/** Delivery charge in PKR applied when the order is below the free threshold. */
export const DELIVERY_CHARGE = 250;

/** Orders at or above this subtotal in PKR ship free of charge. */
export const FREE_DELIVERY_THRESHOLD = 5000;

/** Provinces offered in the checkout province selector. */
export const PROVINCES = [
  "Punjab",
  "Sindh",
  "Khyber Pakhtunkhwa",
  "Balochistan",
  "Gilgit Baltistan",
  "Azad Jammu and Kashmir",
  "Islamabad Capital Territory",
] as const;

/** Storage keys used for the frontend only cart and order persistence. */
export const STORAGE_KEYS = {
  cart: "xpectra.cart.v1",
  lastOrder: "xpectra.order.v1",
  recentlyViewed: "xpectra.recentlyViewed.v1",
} as const;
