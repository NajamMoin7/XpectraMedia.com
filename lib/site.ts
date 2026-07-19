/**
 * Single source of truth for brand details, contact information and
 * commerce rules. Imported by metadata, structured data, header and footer.
 */

export const site = {
  name: "Xpectra Media",
  legalName: "Xpectra Media",
  /** Used by metadataBase, canonical URLs, sitemap and structured data. */
  url: "https://xpectramedia.com",
  tagline: "Modern Style for Every Moment",
  description:
    "Xpectra Media is a modern online clothing store offering everyday fashion for men, women and kids, plus baby clothes and toys, with free shipping and easy returns.",
  logo: "/assets/images/logo/logo.jpeg",
  locale: "en_US",
  currency: "USD",
  contact: {
    name: "Gerard DCruz",
    phone: "+1 (202) 350 1148",
    phoneHref: "tel:+12023501148",
    email: "info@Xpectramedia.com",
    emailHref: "mailto:info@Xpectramedia.com",
    street: "785 Oak Grove Rd",
    unit: "Ste E2 #1207",
    city: "Concord",
    state: "CA",
    postalCode: "94518",
    country: "United States",
    /** Full address on one line, used in copy and structured data. */
    full: "785 Oak Grove Rd, Ste E2 #1207, Concord, CA 94518",
    mapsHref:
      "https://www.google.com/maps/search/?api=1&query=785+Oak+Grove+Rd+Ste+E2+%231207+Concord+CA+94518",
    hours: [
      { days: "Monday to Friday", time: "9:00 AM to 6:00 PM PT" },
      { days: "Saturday", time: "10:00 AM to 4:00 PM PT" },
      { days: "Sunday", time: "Closed, email support only" },
    ],
  },
  social: [
    { name: "Facebook", href: "https://facebook.com/xpectramedia" },
    { name: "Instagram", href: "https://instagram.com/xpectramedia" },
    { name: "X", href: "https://x.com/xpectramedia" },
    { name: "YouTube", href: "https://youtube.com/@xpectramedia" },
  ],
} as const;

/** Standard shipping charge in USD when below the free shipping threshold. */
export const SHIPPING_RATE = 6.95;

/** Orders at or above this subtotal in USD ship free. */
export const FREE_SHIPPING_THRESHOLD = 75;

/** United States shipping destinations offered at checkout. */
export const STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
  "Connecticut", "Delaware", "District of Columbia", "Florida", "Georgia",
  "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
  "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
  "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota",
  "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island",
  "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
  "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming",
] as const;

/** Storage keys used for the frontend only cart and order persistence. */
export const STORAGE_KEYS = {
  cart: "xpectra.cart.v2",
  lastOrder: "xpectra.order.v2",
  recentlyViewed: "xpectra.recentlyViewed.v2",
  wishlist: "xpectra.wishlist.v1",
} as const;
