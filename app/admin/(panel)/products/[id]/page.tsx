import Link from "next/link";
import { notFound } from "next/navigation";

import { ProductForm } from "@/components/admin/ProductForm";
import { PageHeader } from "@/components/admin/ui";
import { getCatalog } from "@/lib/server/catalog";

export const metadata = { title: "Edit Product" };

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = (await getCatalog()).find((item) => item.id === id);
  if (!product) notFound();

  return (
    <div className="max-w-4xl">
      <Link href="/admin/products" className="mb-3 inline-block text-sm font-semibold text-slate hover:text-ink">
        ← All products
      </Link>
      <PageHeader title="Edit Product" description={product.name} />
      <ProductForm product={product} />
    </div>
  );
}
