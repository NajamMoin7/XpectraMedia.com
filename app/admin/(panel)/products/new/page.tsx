import Link from "next/link";

import { ProductForm } from "@/components/admin/ProductForm";
import { PageHeader } from "@/components/admin/ui";

export const metadata = { title: "Add Product" };

export default function NewProductPage() {
  return (
    <div className="max-w-4xl">
      <Link href="/admin/products" className="mb-3 inline-block text-sm font-semibold text-slate hover:text-ink">
        ← All products
      </Link>
      <PageHeader title="Add Product" />
      <ProductForm />
    </div>
  );
}
