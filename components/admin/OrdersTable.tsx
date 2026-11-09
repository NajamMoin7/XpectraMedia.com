import Link from "next/link";

import {
  ChargebackBadge,
  EmptyRow,
  OrderStatusBadge,
  PaymentBadge,
  TD,
  TH,
  Table,
  formatDateTime,
} from "@/components/admin/ui";
import { formatPrice } from "@/lib/format";
import type { StoredOrder } from "@/lib/types";

export function OrdersTable({ orders, empty = "No orders yet." }: { orders: StoredOrder[]; empty?: string }) {
  return (
    <Table>
      <thead>
        <tr>
          <th className={TH}>Order</th>
          <th className={TH}>Date</th>
          <th className={TH}>Customer</th>
          <th className={TH}>Total</th>
          <th className={TH}>Payment</th>
          <th className={TH}>Status</th>
        </tr>
      </thead>
      <tbody>
        {orders.length === 0 ? <EmptyRow colSpan={6}>{empty}</EmptyRow> : null}
        {orders.map((order) => (
          <tr key={order.orderNumber} className="hover:bg-mist/60">
            <td className={TD}>
              <Link
                href={`/admin/orders/${order.orderNumber}`}
                className="font-semibold text-brand hover:underline"
              >
                {order.orderNumber}
              </Link>
            </td>
            <td className={`${TD} whitespace-nowrap`}>{formatDateTime(order.placedAt)}</td>
            <td className={TD}>
              <span className="block font-medium text-ink">{order.fullName}</span>
              <span className="text-xs text-muted">{order.email}</span>
            </td>
            <td className={`${TD} font-semibold tabular-nums text-ink`}>{formatPrice(order.total)}</td>
            <td className={TD}>
              <span className="flex flex-col items-start gap-1">
                <PaymentBadge status={order.paymentStatus} />
                <span className="text-xs text-muted">
                  {order.paymentMethod === "Cash on Delivery" ? "Cash on Delivery" : "Card"}
                </span>
              </span>
            </td>
            <td className={TD}>
              <span className="flex flex-col items-start gap-1">
                <OrderStatusBadge status={order.status} />
                {order.chargeback ? <ChargebackBadge status={order.chargeback.status} /> : null}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
