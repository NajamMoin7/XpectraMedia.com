import { SHIPPING_RATE, FREE_SHIPPING_THRESHOLD } from "@/lib/site";
import type { DesignTransform, PrintOption } from "@/lib/types";

/**
 * Configuration and pricing for the shirt customization tool.
 * Every calculation runs in the browser. Nothing is uploaded or stored on a
 * server, and the artwork stays as a data URL inside the customer's session.
 */

export interface ShirtStyle {
  id: string;
  name: string;
  price: number;
  description: string;
  /** Relative sleeve and body shape hints used by the SVG mockup. */
  sleeve: "short" | "long";
  collar: "crew" | "polo";
  heavyweight: boolean;
}

export const SHIRT_STYLES: ShirtStyle[] = [
  {
    id: "tshirt",
    name: "T Shirt",
    price: 24.99,
    description: "Heavyweight cotton jersey with a classic crew neck",
    sleeve: "short",
    collar: "crew",
    heavyweight: false,
  },
  {
    id: "polo",
    name: "Polo Shirt",
    price: 32.99,
    description: "Structured pique knit with a two button placket",
    sleeve: "short",
    collar: "polo",
    heavyweight: false,
  },
  {
    id: "longsleeve",
    name: "Long Sleeve Shirt",
    price: 29.99,
    description: "Full sleeve cotton jersey with ribbed cuffs",
    sleeve: "long",
    collar: "crew",
    heavyweight: false,
  },
  {
    id: "sweatshirt",
    name: "Sweatshirt",
    price: 39.99,
    description: "Brushed fleece crewneck with a heavyweight body",
    sleeve: "long",
    collar: "crew",
    heavyweight: true,
  },
];

export interface ShirtColor {
  name: string;
  hex: string;
  /** True when the shirt is dark enough to need light preview guides. */
  dark: boolean;
}

export const SHIRT_COLORS: ShirtColor[] = [
  { name: "White", hex: "#f8f9fb", dark: false },
  { name: "Black", hex: "#16181d", dark: true },
  { name: "Navy", hex: "#1e2c47", dark: true },
  { name: "Gray", hex: "#9aa3ae", dark: false },
  { name: "Blue", hex: "#2f6fd0", dark: true },
  { name: "Red", hex: "#b8323c", dark: true },
];

export const SHIRT_SIZES = [
  "Small",
  "Medium",
  "Large",
  "Extra Large",
  "Double Extra Large",
];

export interface PrintChoice {
  id: PrintOption;
  label: string;
  charge: number;
  description: string;
}

export const PRINT_OPTIONS: PrintChoice[] = [
  {
    id: "front",
    label: "Front Print",
    charge: 0,
    description: "Included in the shirt price",
  },
  {
    id: "back",
    label: "Back Print",
    charge: 6,
    description: "Adds $6.00 per shirt",
  },
  {
    id: "both",
    label: "Front and Back Print",
    charge: 10,
    description: "Adds $10.00 per shirt",
  },
];

/** Volume discounts applied automatically as the quantity grows. */
export const QUANTITY_TIERS = [
  { min: 50, percent: 15 },
  { min: 25, percent: 10 },
  { min: 10, percent: 5 },
];

/** Image formats the upload control accepts. */
export const ACCEPTED_UPLOAD_TYPES = [
  "image/png",
  "image/jpeg",
  "image/webp",
];

export const ACCEPTED_UPLOAD_LABEL = "PNG, JPG, JPEG or WEBP";

/** Largest artwork accepted, kept modest because it lives in the browser. */
export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

/** The starting position, scale and rotation for a freshly uploaded design. */
export const DEFAULT_TRANSFORM: DesignTransform = {
  x: 0,
  y: 0,
  scale: 1,
  rotation: 0,
};

export interface CustomPricing {
  unitPrice: number;
  printCharge: number;
  /** Price of one shirt including its printing charge. */
  unitTotal: number;
  quantity: number;
  discountPercent: number;
  discountAmount: number;
  subtotal: number;
  shipping: number;
  total: number;
}

/** Whole number discount percentage that applies at a given quantity. */
export function discountForQuantity(quantity: number): number {
  return QUANTITY_TIERS.find((tier) => quantity >= tier.min)?.percent ?? 0;
}

function toCents(value: number): number {
  return Math.round(value * 100) / 100;
}

/**
 * Full price breakdown for a custom shirt order.
 * Shipping follows the same rules as the rest of the store, so a large
 * custom order qualifies for free standard shipping too.
 */
export function priceCustomShirt(
  styleId: string,
  printOption: PrintOption,
  quantity: number,
): CustomPricing {
  const style = SHIRT_STYLES.find((item) => item.id === styleId) ?? SHIRT_STYLES[0];
  const print = PRINT_OPTIONS.find((item) => item.id === printOption) ?? PRINT_OPTIONS[0];

  const safeQuantity = Math.max(1, Math.floor(quantity) || 1);
  const unitTotal = toCents(style.price + print.charge);
  const gross = toCents(unitTotal * safeQuantity);

  const discountPercent = discountForQuantity(safeQuantity);
  const discountAmount = toCents((gross * discountPercent) / 100);
  const subtotal = toCents(gross - discountAmount);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_RATE;

  return {
    unitPrice: style.price,
    printCharge: print.charge,
    unitTotal,
    quantity: safeQuantity,
    discountPercent,
    discountAmount,
    subtotal,
    shipping,
    total: toCents(subtotal + shipping),
  };
}

/** The customization policy shown before a custom shirt can be added. */
export const CUSTOM_PRODUCT_POLICY =
  "Custom printed shirts are made specifically for your order and cannot be returned or exchanged unless the product arrives damaged, defective, or different from the approved order details.";

/** The confirmation the customer must accept before adding to the cart. */
export const CUSTOM_APPROVAL_LABEL =
  "I have reviewed my design, spelling, colors, placement, size, and customization details.";

/** Notice shown under the live shirt preview. */
export const PREVIEW_DISCLAIMER =
  "The preview is a visual guide. Final print placement and colors may vary slightly.";

/** Ways customers commonly use the customization tool. */
export const CUSTOM_USE_CASES = [
  { title: "Company Uniforms", description: "Consistent staff shirts with your logo on every piece." },
  { title: "Business Branding", description: "Branded shirts for storefronts, trade shows and deliveries." },
  { title: "Event Shirts", description: "Matching shirts for conferences, fundraisers and launches." },
  { title: "Team Shirts", description: "Squad shirts with names, numbers and a team crest." },
  { title: "School Events", description: "Field days, clubs, graduations and spirit weeks." },
  { title: "Family Gatherings", description: "Reunions, anniversaries and vacation shirts." },
  { title: "Promotional Campaigns", description: "Giveaway shirts that keep working long after the event." },
  { title: "Personal Designs", description: "Your own artwork, printed exactly the way you set it up." },
];
