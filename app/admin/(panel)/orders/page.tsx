import Link from "next/link";

import { OrdersTable } from "@/components/admin/OrdersTable";
import { BUTTON, BUTTON_OUTLINE, INPUT, PageHeader } from "@/components/admin/ui";
import { listOrders } from "@/lib/server/orders";
import { ORDER_STATUSES, type OrderStatus } from "@/lib/types";

export const metadata = { title: "Orders" };

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string }>;
}) {
  const { q = "", status = "" } = await searchParams;
  const query = q.trim().toLowerCase();
  const statusFilter = ORDER_STATUSES.includes(status as OrderStatus) ? (status as OrderStatus) : null;

  const orders = (await listOrders()).filter((order) => {
    if (statusFilter && order.status !== statusFilter) return false;
    if (!query) return true;
    return [order.orderNumber, order.fullName, order.email, order.phone]
      .join(" ")
      .toLowerCase()
      .includes(query);
  });

  return (
    <>
      <PageHeader
        title="Orders"
        description="Search an order, then open it to see details or change its status."
        action={
          <Link href="/admin/orders/new" className={BUTTON}>
            + New Order
          </Link>
        }
      />

      <form className="mb-4 flex flex-wrap gap-3" role="search">
        <input
          name="q"
          defaultValue={q}
          placeholder="Order number, name, email or phone"
          aria-label="Search orders"
          className={`${INPUT} max-w-sm`}
        />
        <select name="status" defaultValue={statusFilter ?? ""} aria-label="Status" className={`${INPUT} w-44`}>
          <option value="">All statuses</option>
          {ORDER_STATUSES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <button type="submit" className={BUTTON_OUTLINE}>
          Search
        </button>
        {q || statusFilter ? (
          <Link href="/admin/orders" className="self-center text-sm font-semibold text-slate hover:text-ink">
            Clear
          </Link>
        ) : null}
      </form>

      <p className="mb-3 text-sm text-muted">
        {orders.length} {orders.length === 1 ? "order" : "orders"}
      </p>
      <OrdersTable orders={orders} empty={q || statusFilter ? "No orders match your search." : "No orders yet."} />
    </>
  );
}
