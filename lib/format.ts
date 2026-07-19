import { DELIVERY_CHARGE, FREE_DELIVERY_THRESHOLD } from "@/lib/site";
import type { CartItem } from "@/lib/types";

/**
 * Formats a number as Pakistani Rupees, for example 2490 becomes "PKR 2,490".
 * A plain space separator is used so the output stays readable on dark cards.
 */
export function formatPrice(amount: number): string {
  return `PKR ${new Intl.NumberFormat("en-PK", {
    maximumFractionDigits: 0,
  }).format(amount)}`;
}

/** Whole number percentage saved, for example 3490 against 4990 returns 30. */
export function calcDiscount(price: number, originalPrice?: number): number {
  if (!originalPrice || originalPrice <= price) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

/** Sum of every line in the cart before delivery charges. */
export function cartSubtotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

/** Delivery is free once the subtotal reaches the published threshold. */
export function deliveryFee(subtotal: number): number {
  if (subtotal <= 0) return 0;
  return subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_CHARGE;
}

export function cartTotal(items: CartItem[]): number {
  const subtotal = cartSubtotal(items);
  return subtotal + deliveryFee(subtotal);
}

/** Total number of units across every cart line, used by the header badge. */
export function cartCount(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.quantity, 0);
}

/**
 * Builds a readable order reference such as "XM 2K4M7Q31".
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

/** Long form date such as "19 July 2026" for the confirmation screen. */
export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

/** Estimated delivery window shown on product and confirmation pages. */
export function deliveryWindow(iso: string): string {
  const start = new Date(iso);
  const end = new Date(iso);
  start.setDate(start.getDate() + 2);
  end.setDate(end.getDate() + 5);
  const fmt = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
  });
  return `${fmt.format(start)} to ${fmt.format(end)}`;
}

/** Stable identity for a cart line, since size and colour vary per line. */
export function cartLineKey(item: Pick<CartItem, "productId" | "size" | "color">): string {
  return `${item.productId}__${item.size}__${item.color}`;
}
