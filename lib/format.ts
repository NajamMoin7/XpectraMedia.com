import { FREE_SHIPPING_THRESHOLD, SHIPPING_RATE } from "@/lib/site";
import type { CartItem } from "@/lib/types";

/** Formats a number as US dollars, for example 24.99 becomes "$24.99". */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/** Whole number percentage saved, for example 39.99 against 59.99 returns 33. */
export function calcDiscount(price: number, originalPrice?: number): number {
  if (!originalPrice || originalPrice <= price) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

/** Rounds currency maths to cents so totals never drift. */
function toCents(value: number): number {
  return Math.round(value * 100) / 100;
}

/** Sum of every line in the cart before shipping. */
export function cartSubtotal(items: CartItem[]): number {
  return toCents(items.reduce((total, item) => total + item.price * item.quantity, 0));
}

/** Shipping is free once the subtotal reaches the published threshold. */
export function shippingFee(subtotal: number): number {
  if (subtotal <= 0) return 0;
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_RATE;
}

export function cartTotal(items: CartItem[]): number {
  const subtotal = cartSubtotal(items);
  return toCents(subtotal + shippingFee(subtotal));
}

/** Total number of units across every cart line, used by the header badge. */
export function cartCount(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.quantity, 0);
}

/** How much more the customer needs to spend to qualify for free shipping. */
export function amountToFreeShipping(subtotal: number): number {
  return toCents(Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal));
}

/**
 * Builds a readable order reference such as "XM4M7Q31K".
 * The store is static, so the reference is generated in the browser.
 */
export function generateOrderNumber(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 8; i += 1) {
    code += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return `XM${code}`;
}

/** Long form date such as "July 20, 2026" for the confirmation screen. */
export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(iso));
}

/** Estimated delivery window shown on product and confirmation pages. */
export function deliveryWindow(iso: string): string {
  const start = new Date(iso);
  const end = new Date(iso);
  start.setDate(start.getDate() + 3);
  end.setDate(end.getDate() + 7);
  const fmt = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" });
  return `${fmt.format(start)} to ${fmt.format(end)}`;
}

/** Stable identity for a cart line, since size and color vary per line. */
export function cartLineKey(
  item: Pick<CartItem, "productId" | "size" | "color">,
): string {
  return `${item.productId}__${item.size}__${item.color}`;
}
