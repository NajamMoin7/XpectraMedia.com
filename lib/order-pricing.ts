import { PRINT_OPTIONS, SHIRT_COLORS, SHIRT_SIZES, SHIRT_STYLES, discountForQuantity } from "@/lib/custom-shirt";
import { products } from "@/lib/products";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_RATE } from "@/lib/site";
import type { PrintOption } from "@/lib/types";

/**
 * Server side price check for a checkout.
 *
 * The browser cart is never trusted for money. Every line is looked up in the
 * catalogue (or, for custom shirts, re-priced from the style, print option and
 * quantity) and the total charged is the one computed here.
 */

/** The only fields the payment endpoint accepts for a cart line. */
export interface CheckoutLine {
  productId: string;
  size: string;
  color: string;
  quantity: number;
  /** Custom shirt options. Artwork is deliberately not sent to the server. */
  custom?: { styleId: string; printOption: PrintOption };
}

export interface PricedLine {
  productId: string;
  name: string;
  size: string;
  color: string;
  quantity: number;
  unitPrice: number;
}

export interface PricedOrder {
  lines: PricedLine[];
  subtotal: number;
  shipping: number;
  total: number;
}

/** Largest quantity accepted on a single line, matching the customizer cap. */
const MAX_LINE_QUANTITY = 500;
const MAX_LINES = 50;

function toCents(value: number): number {
  return Math.round(value * 100) / 100;
}

export class PricingError extends Error {}

function priceLine(line: CheckoutLine): PricedLine {
  const product = products.find((item) => item.id === line.productId);
  if (!product) throw new PricingError("An item in your cart is no longer available.");

  const quantity = Math.floor(Number(line.quantity));
  if (!Number.isFinite(quantity) || quantity < 1 || quantity > MAX_LINE_QUANTITY) {
    throw new PricingError(`Please check the quantity for ${product.name}.`);
  }

  if (line.custom) {
    const style = SHIRT_STYLES.find((item) => item.id === line.custom?.styleId);
    const print = PRINT_OPTIONS.find((item) => item.id === line.custom?.printOption);
    if (
      product.category !== "custom-shirts" ||
      !style ||
      !print ||
      !SHIRT_SIZES.includes(line.size) ||
      !SHIRT_COLORS.some((color) => color.name === line.color)
    ) {
      throw new PricingError("A custom shirt in your cart has invalid options.");
    }
    // Mirrors the customizer: print charge added per shirt, then the volume
    // discount for the line quantity applied to the unit price.
    const unitTotal = toCents(style.price + print.charge);
    const unitPrice = toCents(unitTotal * ((100 - discountForQuantity(quantity)) / 100));
    return {
      productId: product.id,
      name: `Custom ${style.name}`,
      size: line.size,
      color: line.color,
      quantity,
      unitPrice,
    };
  }

  if (product.stock <= 0) throw new PricingError(`${product.name} is out of stock.`);
  if (!product.sizes.includes(line.size) || !product.colors.some((c) => c.name === line.color)) {
    throw new PricingError(`Please choose a valid size and color for ${product.name}.`);
  }

  return {
    productId: product.id,
    name: product.name,
    size: line.size,
    color: line.color,
    quantity,
    unitPrice: product.price,
  };
}

export function priceOrder(lines: CheckoutLine[]): PricedOrder {
  if (!Array.isArray(lines) || lines.length === 0) {
    throw new PricingError("Your cart is empty.");
  }
  if (lines.length > MAX_LINES) throw new PricingError("Your cart has too many lines.");

  const priced = lines.map(priceLine);
  const subtotal = toCents(priced.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0));
  const shipping = subtotal <= 0 ? 0 : subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_RATE;
  return { lines: priced, subtotal, shipping, total: toCents(subtotal + shipping) };
}
