import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ChargebackForm, OrderStatusForm } from "@/components/admin/OrderForms";
import {
  Badge,
  Card,
  ChargebackBadge,
  OrderStatusBadge,
  PageHeader,
  PaymentBadge,
  formatDateTime,
} from "@/components/admin/ui";
import { Notice } from "@/components/admin/ui";
import { formatPrice } from "@/lib/format";
import { getOrder } from "@/lib/server/orders";

export async function generateMetadata({ params }: { params: Promise<{ orderNumber: string }> }) {
  const { orderNumber } = await params;
  return { title: `Order ${orderNumber}` };
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between gap-4 py-1.5 text-sm">
      <dt className="text-muted">{label}</dt>
      <dd className="text-right text-ink">{value}</dd>
    </div>
  );
}

const SAVED_MESSAGES: Record<string, string> = {
  created: "Order created.",
  status: "Order updated.",
  chargeback: "Chargeback saved.",
  removed: "Chargeback record removed.",
};

export default async function AdminOrderPage({
  params,
  searchParams,
}: {
  params: Promise<{ orderNumber: string }>;
  searchParams: Promise<{ saved?: string }>;
}) {
  const { orderNumber } = await params;
  const { saved } = await searchParams;
  const order = await getOrder(orderNumber);
  if (!order) notFound();

  const address = [
    order.street,
    order.apartment,
    `${order.city}, ${order.state} ${order.zipCode}`,
    order.country,
  ].filter(Boolean);

  return (
    <>
      <Link href="/admin/orders" className="mb-3 inline-block text-sm font-semibold text-slate hover:text-ink">
        ← All orders
      </Link>
      <PageHeader
        title={`Order ${order.orderNumber}`}
        description={`Placed ${formatDateTime(order.placedAt)}`}
        action={
          <div className="flex flex-wrap gap-2">
            <OrderStatusBadge status={order.status} />
            <PaymentBadge status={order.paymentStatus} />
            {order.source === "admin" ? <Badge tone="gray">Created by admin</Badge> : null}
            {order.chargeback ? <ChargebackBadge status={order.chargeback.status} /> : null}
          </div>
        }
      />

      {saved && SAVED_MESSAGES[saved] ? (
        <div className="mb-6">
          <Notice tone="success">{SAVED_MESSAGES[saved]}</Notice>
        </div>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="space-y-6">
          <Card title={`Items (${order.items.reduce((sum, item) => sum + item.quantity, 0)})`}>
            <ul className="divide-y divide-line">
              {order.items.map((item, index) => (
                <li key={index} className="flex gap-4 py-3 first:pt-0 last:pb-0">
                  <span className="relative h-16 w-14 shrink-0 overflow-hidden rounded-lg border border-line bg-mist">
                    {item.image ? (
                      <Image src={item.image} alt="" fill sizes="56px" className="object-cover" />
                    ) : null}
                  </span>
                  <div className="min-w-0 flex-1 text-sm">
                    <p className="font-semibold text-ink">{item.name}</p>
                    <p className="text-muted">
                      Size {item.size} · {item.color} · Qty {item.quantity}
                    </p>
                    {item.custom ? (
                      <div className="mt-2 flex flex-wrap items-center gap-3 rounded-lg bg-mist p-2 text-xs text-slate">
                        {item.custom.artwork ? (
                          <a
                            href={item.custom.artwork}
                            target="_blank"
                            rel="noreferrer"
                            download={item.custom.artworkName || "artwork"}
                            className="flex items-center gap-2 font-semibold text-brand hover:underline"
                          >
                            {/* Admin only file, served from the media route */}
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={item.custom.artwork}
                              alt="Customer artwork"
                              className="h-12 w-12 rounded border border-line bg-white object-contain"
                            />
                            Download artwork
                          </a>
                        ) : (
                          <span>No artwork file was received.</span>
                        )}
                        <span>
                          {item.custom.printLabel} · {item.custom.styleName}
                          {item.custom.artworkName ? ` · ${item.custom.artworkName}` : ""}
                        </span>
                      </div>
                    ) : null}
                  </div>
                  <div className="text-right text-sm">
                    <p className="font-semibold tabular-nums text-ink">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                    <p className="text-xs text-muted">{formatPrice(item.price)} each</p>
                  </div>
                </li>
              ))}
            </ul>
            <dl className="mt-4 border-t border-line pt-3">
              <Row label="Subtotal" value={formatPrice(order.subtotal)} />
              <Row label="Shipping" value={order.shipping === 0 ? "Free" : formatPrice(order.shipping)} />
              <Row label="Total" value={<strong className="text-base">{formatPrice(order.total)}</strong>} />
            </dl>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card title="Customer">
              <dl>
                <Row label="Name" value={order.fullName} />
                <Row label="Email" value={<a href={`mailto:${order.email}`} className="text-brand">{order.email}</a>} />
                <Row label="Phone" value={<a href={`tel:${order.phone}`} className="text-brand">{order.phone}</a>} />
                {order.altPhone ? <Row label="Other phone" value={order.altPhone} /> : null}
              </dl>
            </Card>
            <Card title="Shipping address">
              <address className="text-sm not-italic leading-relaxed text-ink">
                {address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
              {order.notes ? (
                <p className="mt-3 rounded-lg bg-mist p-3 text-sm text-slate">
                  <span className="font-semibold text-ink">Note: </span>
                  {order.notes}
                </p>
              ) : null}
            </Card>
          </div>

          <Card title="Payment">
            <dl>
              <Row label="Method" value={order.paymentMethod} />
              <Row label="Status" value={<PaymentBadge status={order.paymentStatus} />} />
              {order.payment ? (
                <>
                  <Row label="Card" value={`${order.payment.cardType} ${order.payment.cardMasked}`.trim() || "Card"} />
                  <Row label="Transaction ID" value={<span className="font-mono">{order.payment.transactionId}</span>} />
                  <Row label="Auth code" value={<span className="font-mono">{order.payment.authCode || "—"}</span>} />
                  <Row label="Amount charged" value={formatPrice(order.payment.amount)} />
                </>
              ) : null}
            </dl>
          </Card>
        </div>

        <div className="space-y-6">
          <Card title="Update order">
            <OrderStatusForm
              key={order.updatedAt}
              orderNumber={order.orderNumber}
              status={order.status}
              paymentStatus={order.paymentStatus}
            />
          </Card>
          <Card title="Chargeback">
            <p className="mb-4 text-sm text-slate">
              {order.chargeback
                ? `Opened ${formatDateTime(order.chargeback.openedAt)}.`
                : "If the customer's bank disputes this payment, record it here to track it."}
            </p>
            <ChargebackForm
              key={order.updatedAt}
              orderNumber={order.orderNumber}
              total={order.total}
              chargeback={order.chargeback}
            />
          </Card>
        </div>
      </div>
    </>
  );
}
