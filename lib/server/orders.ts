import "server-only";

import { PRINT_OPTIONS, SHIRT_COLORS, SHIRT_STYLES, DEFAULT_TRANSFORM, discountForQuantity } from "@/lib/custom-shirt";
import type { PricedOrder } from "@/lib/order-pricing";
import { kv } from "@/lib/server/kv";
import type {
  CardPaymentRecord,
  CartItem,
  PaymentMethod,
  StoredOrder,
} from "@/lib/types";

/**
 * Orders for the admin panel. Each order is its own document under
 * "orders/<number>", so concurrent checkouts never overwrite each other.
 * Uploaded custom shirt artwork is stored as a separate file.
 */

const ORDER_PREFIX = "orders/";
/** Largest artwork data URL accepted from checkout, about 1.5 MB of image. */
const MAX_ARTWORK_CHARS = 2_000_000;

export interface OrderCustomer {
  fullName: string;
  email: string;
  phone: string;
  altPhone: string;
  street: string;
  apartment: string;
  city: string;
  state: string;
  zipCode: string;
  notes: string;
}

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

/** Readable, unguessable reference such as "XM4M7Q31K". */
export function newOrderNumber(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(8));
  return `XM${Array.from(bytes, (byte) => ALPHABET[byte % ALPHABET.length]).join("")}`;
}

/** Decodes a browser data URL into bytes, or null when it is not an image. */
function decodeImage(dataUrl: unknown): { data: ArrayBuffer; contentType: string } | null {
  if (typeof dataUrl !== "string" || dataUrl.length > MAX_ARTWORK_CHARS) return null;
  const match = /^data:(image\/(?:png|jpeg|webp));base64,([A-Za-z0-9+/=]+)$/.exec(dataUrl);
  if (!match) return null;
  const buffer = Buffer.from(match[2], "base64");
  return {
    data: buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength) as ArrayBuffer,
    contentType: match[1],
  };
}

async function toOrderItem(
  orderNumber: string,
  index: number,
  line: PricedOrder["lines"][number],
): Promise<CartItem> {
  const item: CartItem = {
    productId: line.productId,
    slug: line.slug,
    name: line.name,
    image: line.image,
    price: line.unitPrice,
    size: line.size,
    color: line.color,
    quantity: line.quantity,
  };

  const custom = line.source.custom;
  if (!custom) return item;

  const style = SHIRT_STYLES.find((entry) => entry.id === custom.styleId) ?? SHIRT_STYLES[0];
  const print = PRINT_OPTIONS.find((entry) => entry.id === custom.printOption) ?? PRINT_OPTIONS[0];
  const color = SHIRT_COLORS.find((entry) => entry.name === line.color);

  // Keep the artwork so the shirt can actually be printed.
  let artwork = "";
  const image = decodeImage(custom.artwork);
  if (image) {
    const key = `artwork/${orderNumber}-${index + 1}`;
    await kv("media").setBinary(key, image);
    artwork = `/media/${key}`;
  }

  const transform = custom.transform ?? DEFAULT_TRANSFORM;
  return {
    ...item,
    custom: {
      styleId: style.id,
      styleName: style.name,
      colorName: line.color,
      colorHex: color?.hex ?? "#ffffff",
      printOption: print.id,
      printLabel: print.label,
      artwork,
      artworkName: String(custom.artworkName ?? "").slice(0, 120),
      transform: {
        x: Number(transform.x) || 0,
        y: Number(transform.y) || 0,
        scale: Number(transform.scale) || 1,
        rotation: Number(transform.rotation) || 0,
      },
      unitPrice: style.price,
      printCharge: print.charge,
      discountPercent: discountForQuantity(line.quantity),
    },
  };
}

export async function createOrder(input: {
  orderNumber: string;
  priced: PricedOrder;
  customer: OrderCustomer;
  paymentMethod: PaymentMethod;
  payment?: CardPaymentRecord;
}): Promise<StoredOrder> {
  const { orderNumber, priced, customer, paymentMethod, payment } = input;
  const now = new Date().toISOString();

  const items = await Promise.all(
    priced.lines.map((line, index) => toOrderItem(orderNumber, index, line)),
  );

  const order: StoredOrder = {
    orderNumber,
    placedAt: now,
    updatedAt: now,
    ...customer,
    country: "United States",
    items,
    subtotal: priced.subtotal,
    shipping: priced.shipping,
    total: priced.total,
    paymentMethod,
    ...(payment ? { payment } : {}),
    status: "Pending",
    paymentStatus: payment ? "Paid" : "Unpaid",
  };

  await kv("orders").setJSON(`${ORDER_PREFIX}${orderNumber}`, order);
  return order;
}

export async function getOrder(orderNumber: string): Promise<StoredOrder | null> {
  if (!/^[A-Z0-9]{4,20}$/.test(orderNumber)) return null;
  return kv("orders").getJSON<StoredOrder>(`${ORDER_PREFIX}${orderNumber}`);
}

export async function saveOrder(order: StoredOrder): Promise<void> {
  await kv("orders").setJSON(`${ORDER_PREFIX}${order.orderNumber}`, {
    ...order,
    updatedAt: new Date().toISOString(),
  });
}

/** Every order, newest first. */
export async function listOrders(): Promise<StoredOrder[]> {
  const store = kv("orders");
  const keys = await store.list(ORDER_PREFIX);

  // Read in small batches so a large history does not open hundreds of
  // requests at once.
  const orders: StoredOrder[] = [];
  for (let start = 0; start < keys.length; start += 25) {
    const batch = await Promise.all(
      keys.slice(start, start + 25).map((key) => store.getJSON<StoredOrder>(key)),
    );
    for (const order of batch) if (order) orders.push(order);
  }
  return orders.sort((a, b) => b.placedAt.localeCompare(a.placedAt));
}
