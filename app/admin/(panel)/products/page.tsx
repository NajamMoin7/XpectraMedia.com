import Image from "next/image";
import Link from "next/link";

import { deleteProduct } from "@/app/admin/actions";
import { ConfirmButton } from "@/components/admin/ConfirmButton";
import {
  BUTTON,
  BUTTON_OUTLINE,
  Badge,
  EmptyRow,
  INPUT,
  Notice,
  PageHeader,
  Pagination,
  TD,
  TH,
  Table,
} from "@/components/admin/ui";
import { categoryLabel } from "@/lib/categories";
import { formatPrice } from "@/lib/format";
import { getCatalog } from "@/lib/server/catalog";

export const metadata = { title: "Products" };

/** Rows shown on each page of the products table. */
const PER_PAGE = 15;

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    stock?: string;
    saved?: string;
    deleted?: string;
    page?: string;
  }>;
}) {
  const { q = "", stock, saved, deleted, page: pageParam } = await searchParams;
  const query = q.trim().toLowerCase();
  const lowOnly = stock === "low";

  const catalog = await getCatalog();
  const matches = catalog.filter((product) => {
    if (lowOnly && product.stock > 5) return false;
    if (!query) return true;
    return `${product.name} ${product.id} ${product.category} ${product.subcategory}`
      .toLowerCase()
      .includes(query);
  });

  // Out of range pages (for example after deleting the last item on a page)
  // fall back to the nearest valid page.
  const pages = Math.max(1, Math.ceil(matches.length / PER_PAGE));
  const page = Math.min(Math.max(1, Math.floor(Number(pageParam)) || 1), pages);
  const products = matches.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <>
      <PageHeader
        title="Products"
        description={`${catalog.length} products in your store.`}
        action={
          <Link href="/admin/products/new" className={BUTTON}>
            + Add Product
          </Link>
        }
      />

      <div className="mb-4 space-y-4">
        {saved ? <Notice tone="success">Product saved. The store is updated.</Notice> : null}
        {deleted ? <Notice tone="success">Product deleted.</Notice> : null}
      </div>

      <form className="mb-4 flex flex-wrap gap-3" role="search">
        <input
          name="q"
          defaultValue={q}
          placeholder="Search by name or category"
          aria-label="Search products"
          className={`${INPUT} max-w-sm`}
        />
        <label className="flex items-center gap-2 text-sm text-slate">
          <input type="checkbox" name="stock" value="low" defaultChecked={lowOnly} className="h-4 w-4 accent-[#0d7ff2]" />
          Low stock only
        </label>
        <button type="submit" className={BUTTON_OUTLINE}>
          Search
        </button>
        {q || lowOnly ? (
          <Link href="/admin/products" className="self-center text-sm font-semibold text-slate hover:text-ink">
            Clear
          </Link>
        ) : null}
      </form>

      <Table>
        <thead>
          <tr>
            <th className={TH}>Product</th>
            <th className={TH}>Category</th>
            <th className={TH}>Price</th>
            <th className={TH}>Stock</th>
            <th className={`${TH} text-right`}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? <EmptyRow colSpan={5}>No products found.</EmptyRow> : null}
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-mist/60">
              <td className={TD}>
                <div className="flex items-center gap-3">
                  <span className="relative h-12 w-10 shrink-0 overflow-hidden rounded-lg border border-line bg-mist">
                    {product.images[0] ? (
                      <Image src={product.images[0]} alt="" fill sizes="40px" className="object-cover" />
                    ) : null}
                  </span>
                  <span>
                    <Link
                      href={`/admin/products/${product.id}`}
                      className="font-semibold text-ink hover:text-brand"
                    >
                      {product.name}
                    </Link>
                    <span className="block text-xs text-muted">{product.id}</span>
                  </span>
                </div>
              </td>
              <td className={TD}>{categoryLabel(product.category)}</td>
              <td className={`${TD} tabular-nums`}>
                <span className="font-semibold text-ink">{formatPrice(product.price)}</span>
                {product.originalPrice ? (
                  <span className="ml-2 text-xs text-muted line-through">{formatPrice(product.originalPrice)}</span>
                ) : null}
              </td>
              <td className={TD}>
                {product.stock === 0 ? (
                  <Badge tone="red">Sold out</Badge>
                ) : product.stock <= 5 ? (
                  <Badge tone="amber">{product.stock} left</Badge>
                ) : (
                  <span className="tabular-nums">{product.stock}</span>
                )}
              </td>
              <td className={`${TD} text-right`}>
                <div className="flex items-center justify-end gap-3">
                  <Link href={`/admin/products/${product.id}`} className="text-sm font-semibold text-brand hover:underline">
                    Edit
                  </Link>
                  <form action={deleteProduct}>
                    <input type="hidden" name="id" value={product.id} />
                    <ConfirmButton message={`Delete "${product.name}"? It will be removed from the store.`}>
                      Delete
                    </ConfirmButton>
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination
        page={page}
        pages={pages}
        total={matches.length}
        perPage={PER_PAGE}
        basePath="/admin/products"
        params={{ q: q || undefined, stock: lowOnly ? "low" : undefined }}
      />
    </>
  );
}
