"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  ADMIN_COOKIE,
  SESSION_SECONDS,
  checkCredentials,
  createSessionToken,
} from "@/lib/admin-session";
import { categories, subcategories } from "@/lib/categories";
import { calcDiscount } from "@/lib/format";
import { RETURN_STANDARD, SHIP_STANDARD } from "@/lib/products";
import { requireAdmin } from "@/lib/server/auth";
import { getCatalog, saveCatalog } from "@/lib/server/catalog";
import { getOrder, saveOrder } from "@/lib/server/orders";
import {
  CHARGEBACK_STATUSES,
  ORDER_STATUSES,
  PAYMENT_STATUSES,
  type CategorySlug,
  type ChargebackStatus,
  type OrderStatus,
  type PaymentStatus,
  type Product,
  type ProductColor,
  type SubcategorySlug,
} from "@/lib/types";

export interface FormState {
  error?: string;
  saved?: boolean;
}

/* ------------------------------------------------------------------ */
/* Session                                                             */
/* ------------------------------------------------------------------ */

export async function login(_state: FormState, formData: FormData): Promise<FormState> {
  if (!process.env.ADMIN_PASSWORD) {
    return { error: "Admin login is not set up. Add ADMIN_PASSWORD to the environment variables." };
  }

  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!(await checkCredentials(username, password))) {
    // A short pause slows down password guessing.
    await new Promise((resolve) => setTimeout(resolve, 800));
    return { error: "Wrong username or password." };
  }

  const token = await createSessionToken();
  const store = await cookies();
  store.set(ADMIN_COOKIE, token ?? "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_SECONDS,
  });
  redirect("/admin");
}

export async function logout(): Promise<void> {
  const store = await cookies();
  store.delete(ADMIN_COOKIE);
  redirect("/admin/login");
}

/* ------------------------------------------------------------------ */
/* Products                                                            */
/* ------------------------------------------------------------------ */

function text(formData: FormData, name: string, max = 200): string {
  return String(formData.get(name) ?? "").trim().slice(0, max);
}

function lines(value: string): string[] {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function json<T>(formData: FormData, name: string): T | null {
  try {
    return JSON.parse(String(formData.get(name) ?? "null")) as T;
  } catch {
    return null;
  }
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

/** Store pages are cached, so every catalogue change refreshes them. */
function refreshStore() {
  revalidatePath("/", "layout");
}

export async function saveProduct(_state: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();

  const id = text(formData, "id", 40);
  const name = text(formData, "name", 120);
  const slug = slugify(text(formData, "slug", 80) || name);
  const category = text(formData, "category", 40) as CategorySlug;
  const subcategory = text(formData, "subcategory", 40) as SubcategorySlug;
  const price = Math.round(Number(formData.get("price")) * 100) / 100;
  const originalRaw = text(formData, "originalPrice", 20);
  const originalPrice = originalRaw ? Math.round(Number(originalRaw) * 100) / 100 : undefined;
  const stock = Math.floor(Number(formData.get("stock")));
  const sizes = lines(text(formData, "sizes", 1000).replace(/,/g, "\n"));
  const colors = (json<ProductColor[]>(formData, "colors") ?? [])
    .map((color) => ({ name: String(color.name ?? "").trim().slice(0, 40), hex: String(color.hex ?? "") }))
    .filter((color) => color.name && /^#[0-9a-f]{6}$/i.test(color.hex));
  const images = (json<string[]>(formData, "images") ?? []).filter(
    (url) => typeof url === "string" && /^\/(media\/products|assets)\/[\w./-]+$/.test(url),
  );
  const shortDescription = text(formData, "shortDescription", 400);

  if (name.length < 2) return { error: "Please enter a product name." };
  if (!slug) return { error: "Please enter a valid URL name." };
  if (!categories.some((item) => item.slug === category)) return { error: "Please choose a category." };
  if (!subcategories.some((item) => item.slug === subcategory)) return { error: "Please choose a product type." };
  if (!Number.isFinite(price) || price <= 0) return { error: "Please enter a price above zero." };
  if (originalPrice !== undefined && (!Number.isFinite(originalPrice) || originalPrice <= price)) {
    return { error: "The original price must be higher than the selling price, or left empty." };
  }
  if (!Number.isFinite(stock) || stock < 0) return { error: "Please enter the stock as 0 or more." };
  if (sizes.length === 0) return { error: "Please add at least one size." };
  if (colors.length === 0) return { error: "Please add at least one color." };
  if (images.length === 0) return { error: "Please upload at least one photo." };
  if (!shortDescription) return { error: "Please write a short description." };

  const catalog = await getCatalog();
  const existing = id ? catalog.find((item) => item.id === id) : undefined;
  if (id && !existing) return { error: "This product no longer exists. It may have been deleted." };
  if (catalog.some((item) => item.slug === slug && item.id !== id)) {
    return { error: "Another product already uses this URL name. Please change it." };
  }

  const product: Product = {
    // Fields the form does not edit keep their current values.
    rating: 0,
    reviewCount: 0,
    shippingInfo: SHIP_STANDARD,
    returnInfo: RETURN_STANDARD,
    ...existing,
    id: existing?.id ?? `xm${Date.now().toString(36)}`,
    name,
    slug,
    category,
    subcategory,
    subtitle: text(formData, "subtitle", 160) || shortDescription.slice(0, 120),
    shortDescription,
    detailedDescription: text(formData, "detailedDescription", 5000) || shortDescription,
    price,
    originalPrice,
    discount: calcDiscount(price, originalPrice) || undefined,
    stock,
    sizes,
    colors,
    images,
    material: text(formData, "material", 200),
    features: lines(text(formData, "features", 3000)),
    careInstructions: lines(text(formData, "careInstructions", 3000)),
    featured: formData.get("featured") === "on",
    newArrival: formData.get("newArrival") === "on",
    bestSeller: formData.get("bestSeller") === "on",
    limitedStock: stock > 0 && stock <= 10,
  };

  await saveCatalog(
    existing
      ? catalog.map((item) => (item.id === existing.id ? product : item))
      : [product, ...catalog],
  );
  refreshStore();
  redirect("/admin/products?saved=1");
}

export async function deleteProduct(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = text(formData, "id", 40);
  const catalog = await getCatalog();
  await saveCatalog(catalog.filter((item) => item.id !== id));
  refreshStore();
  redirect("/admin/products?deleted=1");
}

/* ------------------------------------------------------------------ */
/* Orders and chargebacks                                              */
/* ------------------------------------------------------------------ */

/**
 * Reloads the order page after a save. The confirmation travels in the URL,
 * which is more reliable than returning it from an action that also
 * refreshes the page.
 */
function backToOrder(orderNumber: string, saved: "status" | "chargeback" | "removed"): never {
  redirect(`/admin/orders/${orderNumber}?saved=${saved}`);
}

export async function updateOrderStatus(_state: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const order = await getOrder(text(formData, "orderNumber", 20));
  if (!order) return { error: "Order not found." };

  const status = text(formData, "status", 20) as OrderStatus;
  const paymentStatus = text(formData, "paymentStatus", 20) as PaymentStatus;
  if (!ORDER_STATUSES.includes(status) || !PAYMENT_STATUSES.includes(paymentStatus)) {
    return { error: "Please choose a valid status." };
  }

  await saveOrder({ ...order, status, paymentStatus });
  backToOrder(order.orderNumber, "status");
}

export async function saveChargeback(_state: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const order = await getOrder(text(formData, "orderNumber", 20));
  if (!order) return { error: "Order not found." };

  const amount = Math.round(Number(formData.get("amount")) * 100) / 100;
  const status = text(formData, "status", 10) as ChargebackStatus;
  const reason = text(formData, "reason", 200);
  if (!Number.isFinite(amount) || amount <= 0 || amount > order.total) {
    return { error: `Enter an amount between $0.01 and $${order.total.toFixed(2)}.` };
  }
  if (!CHARGEBACK_STATUSES.includes(status)) return { error: "Please choose a status." };
  if (!reason) return { error: "Please enter the reason given by the bank." };

  const now = new Date().toISOString();
  await saveOrder({
    ...order,
    chargeback: {
      amount,
      reason,
      status,
      notes: text(formData, "notes", 2000),
      openedAt: order.chargeback?.openedAt ?? now,
      updatedAt: now,
    },
  });
  backToOrder(order.orderNumber, "chargeback");
}

export async function removeChargeback(formData: FormData): Promise<void> {
  await requireAdmin();
  const order = await getOrder(text(formData, "orderNumber", 20));
  if (!order) return;
  await saveOrder({ ...order, chargeback: undefined });
  backToOrder(order.orderNumber, "removed");
}
