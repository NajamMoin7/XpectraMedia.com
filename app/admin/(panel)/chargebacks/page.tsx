import Link from "next/link";

import {
  ChargebackBadge,
  EmptyRow,
  PageHeader,
  StatCard,
  TD,
  TH,
  Table,
  formatDateTime,
} from "@/components/admin/ui";
import { formatPrice } from "@/lib/format";
import { listOrders } from "@/lib/server/orders";

export const metadata = { title: "Chargebacks" };

export default async function AdminChargebacksPage() {
  const disputed = (await listOrders())
    .filter((order) => order.chargeback)
    .sort((a, b) => b.chargeback!.openedAt.localeCompare(a.chargeback!.openedAt));

  const open = disputed.filter((order) => order.chargeback!.status === "Open");
  const lost = disputed.filter((order) => order.chargeback!.status === "Lost");
  const sum = (list: typeof disputed) => list.reduce((total, order) => total + order.chargeback!.amount, 0);

  return (
    <>
      <PageHeader
        title="Chargebacks"
        description="Payments disputed by a customer's bank. To record one, open the order and use the Chargeback box."
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Open" value={String(open.length)} hint={`${formatPrice(sum(open))} at risk`} />
        <StatCard label="Lost" value={String(lost.length)} hint={`${formatPrice(sum(lost))} lost`} />
        <StatCard label="All time" value={String(disputed.length)} hint={formatPrice(sum(disputed))} />
      </div>

      <Table>
        <thead>
          <tr>
            <th className={TH}>Order</th>
            <th className={TH}>Customer</th>
            <th className={TH}>Amount</th>
            <th className={TH}>Reason</th>
            <th className={TH}>Opened</th>
            <th className={TH}>Status</th>
          </tr>
        </thead>
        <tbody>
          {disputed.length === 0 ? <EmptyRow colSpan={6}>No chargebacks recorded.</EmptyRow> : null}
          {disputed.map((order) => {
            const chargeback = order.chargeback!;
            return (
              <tr key={order.orderNumber} className="hover:bg-mist/60">
                <td className={TD}>
                  <Link
                    href={`/admin/orders/${order.orderNumber}`}
                    className="font-semibold text-brand hover:underline"
                  >
                    {order.orderNumber}
                  </Link>
                </td>
                <td className={TD}>{order.fullName}</td>
                <td className={`${TD} font-semibold tabular-nums text-ink`}>{formatPrice(chargeback.amount)}</td>
                <td className={TD}>{chargeback.reason}</td>
                <td className={`${TD} whitespace-nowrap`}>{formatDateTime(chargeback.openedAt)}</td>
                <td className={TD}>
                  <ChargebackBadge status={chargeback.status} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}
