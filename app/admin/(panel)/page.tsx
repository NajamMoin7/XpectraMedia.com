import Link from "next/link";

import { OrdersTable } from "@/components/admin/OrdersTable";
import { Card, PageHeader, StatCard } from "@/components/admin/ui";
import { formatPrice } from "@/lib/format";
import { getCatalog } from "@/lib/server/catalog";
import { listOrders } from "@/lib/server/orders";
import { ORDER_STATUSES } from "@/lib/types";

export const metadata = { title: "Dashboard" };

/** Order summary: the numbers an owner checks first. */
export default async function AdminDashboard() {
  const [orders, catalog] = await Promise.all([listOrders(), getCatalog()]);

  const active = orders.filter((order) => order.status !== "Cancelled");
  const revenue = active.reduce((sum, order) => sum + order.total, 0);
  const collected = orders
    .filter((order) => order.paymentStatus === "Paid")
    .reduce((sum, order) => sum + order.total, 0);
  const awaitingCod = active
    .filter((order) => order.paymentStatus === "Unpaid")
    .reduce((sum, order) => sum + order.total, 0);
  const toProcess = orders.filter((order) => order.status === "Pending").length;
  const openChargebacks = orders.filter((order) => order.chargeback?.status === "Open");
  const lowStock = catalog.filter((product) => product.stock <= 5);

  const today = new Date().toDateString();
  const todayOrders = orders.filter((order) => new Date(order.placedAt).toDateString() === today);

  return (
    <>
      <PageHeader title="Dashboard" description="Order summary for your store." />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total orders"
          value={String(orders.length)}
          hint={`${todayOrders.length} today`}
          href="/admin/orders"
        />
        <StatCard
          label="Sales"
          value={formatPrice(revenue)}
          hint="All orders except cancelled"
        />
        <StatCard
          label="Payments received"
          value={formatPrice(collected)}
          hint={`${formatPrice(awaitingCod)} still due on delivery`}
        />
        <StatCard
          label="Orders to process"
          value={String(toProcess)}
          hint="Status is Pending"
          href="/admin/orders?status=Pending"
        />
      </div>

      <div className="mt-6 grid gap-6 2xl:grid-cols-[minmax(0,1fr)_20rem]">
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-base font-semibold text-ink">Latest orders</h2>
            <Link href="/admin/orders" className="text-sm font-semibold text-brand hover:underline">
              View all
            </Link>
          </div>
          <OrdersTable orders={orders.slice(0, 8)} />
        </div>

        <div className="grid content-start gap-6 md:grid-cols-2 2xl:grid-cols-1">
          <Card title="Orders by status">
            <ul className="space-y-2 text-sm">
              {ORDER_STATUSES.map((status) => (
                <li key={status}>
                  <Link
                    href={`/admin/orders?status=${status}`}
                    className="flex justify-between rounded-lg px-2 py-1.5 hover:bg-mist"
                  >
                    <span className="text-slate">{status}</span>
                    <span className="font-semibold tabular-nums text-ink">
                      {orders.filter((order) => order.status === status).length}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Needs attention">
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/admin/chargebacks" className="flex justify-between rounded-lg px-2 py-1.5 hover:bg-mist">
                  <span className="text-slate">Open chargebacks</span>
                  <span className={`font-semibold ${openChargebacks.length ? "text-sale" : "text-ink"}`}>
                    {openChargebacks.length}
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/admin/products?stock=low" className="flex justify-between rounded-lg px-2 py-1.5 hover:bg-mist">
                  <span className="text-slate">Products low on stock</span>
                  <span className={`font-semibold ${lowStock.length ? "text-amber-700" : "text-ink"}`}>
                    {lowStock.length}
                  </span>
                </Link>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </>
  );
}
