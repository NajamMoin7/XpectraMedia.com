import "server-only";

import { PRINT_OPTIONS, SHIRT_COLORS, SHIRT_SIZES, SHIRT_STYLES, discountForQuantity } from "@/lib/custom-shirt";
import { getCatalog } from "@/lib/server/catalog";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_RATE } from "@/lib/site";
import type { CheckoutLine, Product } from "@/lib/types";

/**
 * Server side price check for a checkout.
 *
 * The browser cart is never trusted for money. Every line is looked up in the
 * live catalogue (or, for custom shirts, re-priced from the style, print
 * option and quantity) and the total charged is the one computed here.
 */

export interface PricedLine {
  productId: string;
  slug: string;
  name: string;
  image: string;
  size: string;
  color: string;
  quantity: number;
  unitPrice: number;
  /** The original request line, used to keep custom shirt details. */
  source: CheckoutLine;
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

function priceLine(catalog: Product[], line: CheckoutLine): PricedLine {
  const quantity = Math.floor(Number(line?.quantity));
  const product = catalog.find((item) => item.id === line?.productId);

  if (line?.custom) {
    // Custom shirts are priced from the style, so they do not depend on the
    // catalogue entry still existing.
    const style = SHIRT_STYLES.find((item) => item.id === line.custom?.styleId);
    const print = PRINT_OPTIONS.find((item) => item.id === line.custom?.printOption);
    if (
      !style ||
      !print ||
      !SHIRT_SIZES.includes(line.size) ||
      !SHIRT_COLORS.some((color) => color.name === line.color)
    ) {
      throw new PricingError("A custom shirt in your cart has invalid options.");
    }
    if (!Number.isFinite(quantity) || quantity < 1 || quantity > MAX_LINE_QUANTITY) {
      throw new PricingError("Please check the quantity of your custom shirts.");
    }
    // Mirrors the customizer: print charge added per shirt, then the volume
    // discount for the line quantity applied to the unit price.
    const unitTotal = toCents(style.price + print.charge);
    return {
      productId: String(line.productId),
      slug: product?.slug ?? "",
      name: `Custom ${style.name}`,
      image: product?.images[0] ?? "",
      size: line.size,
      color: line.color,
      quantity,
      unitPrice: toCents(unitTotal * ((100 - discountForQuantity(quantity)) / 100)),
      source: line,
    };
  }

  if (!product) throw new PricingError("An item in your cart is no longer available.");
  if (!Number.isFinite(quantity) || quantity < 1 || quantity > MAX_LINE_QUANTITY) {
    throw new PricingError(`Please check the quantity for ${product.name}.`);
  }
  if (product.stock <= 0) throw new PricingError(`${product.name} is out of stock.`);
  if (!product.sizes.includes(line.size) || !product.colors.some((c) => c.name === line.color)) {
    throw new PricingError(`Please choose a valid size and color for ${product.name}.`);
  }

  return {
    productId: product.id,
    slug: product.slug,
    name: product.name,
    image: product.images[0] ?? "",
    size: line.size,
    color: line.color,
    quantity,
    unitPrice: product.price,
    source: line,
  };
}

export async function priceOrder(lines: CheckoutLine[]): Promise<PricedOrder> {
  if (!Array.isArray(lines) || lines.length === 0) {
    throw new PricingError("Your cart is empty.");
  }
  if (lines.length > MAX_LINES) throw new PricingError("Your cart has too many lines.");

  const catalog = await getCatalog();
  const priced = lines.map((line) => priceLine(catalog, line));
  const subtotal = toCents(priced.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0));
  const shipping = subtotal <= 0 ? 0 : subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_RATE;
  return { lines: priced, subtotal, shipping, total: toCents(subtotal + shipping) };
}
