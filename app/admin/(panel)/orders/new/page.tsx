import Link from "next/link";

import { NewOrderForm, type OrderableProduct } from "@/components/admin/NewOrderForm";
import { PageHeader } from "@/components/admin/ui";
import { getCatalog } from "@/lib/server/catalog";

export const metadata = { title: "New Order" };

/** Collect.js is served by the same gateway that processes the sale. */
function collectJsUrl(): string {
  try {
    return process.env.POST_URL ? `${new URL(process.env.POST_URL).origin}/token/Collect.js` : "";
  } catch {
    return "";
  }
}

export default async function NewOrderPage() {
  // Custom printed shirts need the customer's artwork, so they are left out.
  const products: OrderableProduct[] = (await getCatalog())
    .filter((product) => product.category !== "custom-shirts")
    .map((product) => ({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
      sizes: product.sizes,
      colors: product.colors.map((color) => color.name),
    }));

  return (
    <>
      <Link href="/admin/orders" className="mb-3 inline-block text-sm font-semibold text-slate hover:text-ink">
        ← All orders
      </Link>
      <PageHeader
        title="New Order"
        description="Place an order for a customer by phone, email or in person."
      />
      <NewOrderForm
        products={products}
        tokenizationKey={process.env.PUBLIC_KEY ?? ""}
        collectJsUrl={collectJsUrl()}
      />
    </>
  );
}
