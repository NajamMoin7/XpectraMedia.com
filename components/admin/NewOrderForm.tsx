"use client";

import { useRouter } from "next/navigation";
import { useMemo, useRef, useState, type FormEvent } from "react";

import { BUTTON, Card, INPUT, LABEL, Notice } from "@/components/admin/ui";
import {
  CardEntryError,
  CardPaymentPanel,
  type CardTokenizer,
} from "@/components/checkout/CardPaymentPanel";
import { categoryLabel } from "@/lib/categories";
import { formatPrice, shippingFee } from "@/lib/format";
import { STATES } from "@/lib/site";
import type { CategorySlug, CheckoutLine, PaymentMethod } from "@/lib/types";

/** The product fields the order form needs. */
export interface OrderableProduct {
  id: string;
  name: string;
  category: CategorySlug;
  price: number;
  stock: number;
  sizes: string[];
  colors: string[];
}

interface Line {
  key: number;
  productId: string;
  size: string;
  color: string;
  quantity: number;
}

const CONTACT_FIELDS = [
  { name: "fullName", label: "Full name", autoComplete: "name", required: true, wide: true },
  { name: "email", label: "Email", type: "email", autoComplete: "email", required: true },
  { name: "phone", label: "Phone", type: "tel", autoComplete: "tel", required: true },
  { name: "altPhone", label: "Other phone", type: "tel", optional: true, wide: true },
] as const;

const ADDRESS_FIELDS = [
  { name: "street", label: "Street address", autoComplete: "address-line1", required: true, wide: true },
  { name: "apartment", label: "Apartment, suite or unit", optional: true, wide: true },
  { name: "city", label: "City", autoComplete: "address-level2", required: true },
] as const;

function toCents(value: number): number {
  return Math.round(value * 100) / 100;
}

/**
 * Admin form for placing an order by hand, for example for a phone or
 * walk-in customer. Uses the same pricing and payment flow as the store.
 */
export function NewOrderForm({
  products,
  tokenizationKey,
  collectJsUrl,
}: {
  products: OrderableProduct[];
  tokenizationKey: string;
  collectJsUrl: string;
}) {
  const router = useRouter();
  const nextKey = useRef(1);
  const tokenizerRef = useRef<CardTokenizer | null>(null);

  const [lines, setLines] = useState<Line[]>([
    { key: 0, productId: "", size: "", color: "", quantity: 1 },
  ]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("Cash on Delivery");
  const [error, setError] = useState<string | null>(null);
  const [placing, setPlacing] = useState(false);

  const byId = useMemo(() => new Map(products.map((product) => [product.id, product])), [products]);

  /** Products grouped by department for the picker. */
  const groups = useMemo(() => {
    const map = new Map<CategorySlug, OrderableProduct[]>();
    for (const product of products) {
      map.set(product.category, [...(map.get(product.category) ?? []), product]);
    }
    return [...map.entries()];
  }, [products]);

  const filled = lines.filter((line) => byId.has(line.productId));
  const subtotal = toCents(
    filled.reduce((sum, line) => sum + byId.get(line.productId)!.price * line.quantity, 0),
  );
  const shipping = shippingFee(subtotal);
  const total = toCents(subtotal + shipping);

  function updateLine(key: number, patch: Partial<Line>) {
    setError(null);
    setLines((current) => current.map((line) => (line.key === key ? { ...line, ...patch } : line)));
  }

  function pickProduct(key: number, productId: string) {
    const product = byId.get(productId);
    // Preselect when there is only one choice, which is common for toys.
    updateLine(key, {
      productId,
      size: product?.sizes.length === 1 ? product.sizes[0] : "",
      color: product?.colors.length === 1 ? product.colors[0] : "",
    });
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (placing) return;
    setError(null);

    if (filled.length === 0) {
      setError("Please add at least one product.");
      return;
    }
    const incomplete = filled.find((line) => !line.size || !line.color);
    if (incomplete) {
      setError(`Please choose a size and color for ${byId.get(incomplete.productId)!.name}.`);
      return;
    }
    const overStock = filled.find((line) => line.quantity > byId.get(line.productId)!.stock);
    if (overStock) {
      const product = byId.get(overStock.productId)!;
      setError(`Only ${product.stock} of ${product.name} in stock.`);
      return;
    }

    const form = new FormData(event.currentTarget);
    const customer = Object.fromEntries(
      [
        "fullName", "email", "phone", "altPhone", "street", "apartment", "city", "state", "zipCode", "notes",
      ].map((name) => [name, String(form.get(name) ?? "")]),
    );

    setPlacing(true);
    try {
      let card: { token: string; cardMasked: string; cardType: string } | undefined;
      if (paymentMethod === "Credit or Debit Card") {
        if (!tokenizerRef.current) throw new CardEntryError("The card form is still loading. Please try again.");
        card = await tokenizerRef.current.requestToken();
      }

      const response = await fetch("/api/admin/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentMethod,
          token: card?.token,
          card: card ? { cardMasked: card.cardMasked, cardType: card.cardType } : undefined,
          expectedTotal: total,
          lines: filled.map<CheckoutLine>((line) => ({
            productId: line.productId,
            size: line.size,
            color: line.color,
            quantity: line.quantity,
          })),
          customer,
        }),
      });
      const result = (await response.json().catch(() => null)) as
        | { ok: true; orderNumber: string }
        | { ok: false; message: string; code?: string }
        | null;

      if (!result?.ok) {
        setError(result?.message ?? "The order could not be placed. Please try again.");
        // Prices changed in another tab: reload the product list.
        if (result?.code === "TOTAL_CHANGED") router.refresh();
        setPlacing(false);
        return;
      }
      router.push(`/admin/orders/${result.orderNumber}?saved=created`);
    } catch (caught) {
      setError(
        caught instanceof CardEntryError
          ? caught.message
          : "Could not reach the server. Please check the connection and try again.",
      );
      setPlacing(false);
    }
  }

  const field = (
    spec: { name: string; label: string; type?: string; autoComplete?: string; required?: boolean; optional?: boolean; wide?: boolean },
  ) => (
    <div key={spec.name} className={spec.wide ? "sm:col-span-2" : undefined}>
      <label htmlFor={`order-${spec.name}`} className={LABEL}>
        {spec.label} {spec.optional ? <span className="font-normal text-muted">(optional)</span> : null}
      </label>
      <input
        id={`order-${spec.name}`}
        name={spec.name}
        type={spec.type ?? "text"}
        autoComplete={spec.autoComplete ?? "off"}
        required={spec.required}
        className={INPUT}
      />
    </div>
  );

  return (
    <form onSubmit={onSubmit} className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
      <div className="space-y-6">
        <Card title="Products">
          <div className="space-y-3">
            {lines.map((line, index) => {
              const product = byId.get(line.productId);
              return (
                <div key={line.key} className="rounded-xl border border-line bg-mist/50 p-3">
                  <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_7rem_8rem_5.5rem]">
                    <div>
                      <label htmlFor={`line-${line.key}-product`} className="sr-only">
                        Product {index + 1}
                      </label>
                      <select
                        id={`line-${line.key}-product`}
                        value={line.productId}
                        onChange={(event) => pickProduct(line.key, event.target.value)}
                        className={INPUT}
                      >
                        <option value="">Choose a product…</option>
                        {groups.map(([category, items]) => (
                          <optgroup key={category} label={categoryLabel(category)}>
                            {items.map((item) => (
                              <option key={item.id} value={item.id} disabled={item.stock <= 0}>
                                {item.name} · {formatPrice(item.price)}
                                {item.stock <= 0 ? " · sold out" : ""}
                              </option>
                            ))}
                          </optgroup>
                        ))}
                      </select>
                    </div>
                    <select
                      aria-label={`Size for product ${index + 1}`}
                      value={line.size}
                      disabled={!product}
                      onChange={(event) => updateLine(line.key, { size: event.target.value })}
                      className={INPUT}
                    >
                      <option value="">Size</option>
                      {product?.sizes.map((size) => <option key={size}>{size}</option>)}
                    </select>
                    <select
                      aria-label={`Color for product ${index + 1}`}
                      value={line.color}
                      disabled={!product}
                      onChange={(event) => updateLine(line.key, { color: event.target.value })}
                      className={INPUT}
                    >
                      <option value="">Color</option>
                      {product?.colors.map((color) => <option key={color}>{color}</option>)}
                    </select>
                    <input
                      type="number"
                      aria-label={`Quantity for product ${index + 1}`}
                      min={1}
                      max={product ? Math.min(500, product.stock) : 500}
                      value={line.quantity}
                      onChange={(event) =>
                        updateLine(line.key, { quantity: Math.max(1, Math.floor(Number(event.target.value)) || 1) })
                      }
                      className={INPUT}
                    />
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-muted">
                      {product
                        ? `${formatPrice(product.price)} each · ${product.stock} in stock`
                        : "No product selected"}
                    </span>
                    <span className="flex items-center gap-4">
                      {product ? (
                        <strong className="tabular-nums text-ink">
                          {formatPrice(product.price * line.quantity)}
                        </strong>
                      ) : null}
                      {lines.length > 1 ? (
                        <button
                          type="button"
                          onClick={() => setLines((current) => current.filter((item) => item.key !== line.key))}
                          className="font-semibold text-sale hover:underline"
                        >
                          Remove
                        </button>
                      ) : null}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          <button
            type="button"
            onClick={() =>
              setLines((current) => [
                ...current,
                { key: nextKey.current++, productId: "", size: "", color: "", quantity: 1 },
              ])
            }
            className="mt-3 text-sm font-semibold text-brand hover:underline"
          >
            + Add another product
          </button>
        </Card>

        <Card title="Contact details">
          <div className="grid gap-4 sm:grid-cols-2">{CONTACT_FIELDS.map(field)}</div>
        </Card>

        <Card title="Shipping address">
          <div className="grid gap-4 sm:grid-cols-2">
            {ADDRESS_FIELDS.map(field)}
            <div>
              <label htmlFor="order-state" className={LABEL}>
                State
              </label>
              <select id="order-state" name="state" required defaultValue="" className={INPUT}>
                <option value="" disabled>
                  Choose a state
                </option>
                {STATES.map((state) => (
                  <option key={state}>{state}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="order-zipCode" className={LABEL}>
                ZIP code
              </label>
              <input
                id="order-zipCode"
                name="zipCode"
                required
                inputMode="numeric"
                pattern="\d{5}(-\d{4})?"
                title="5 digit ZIP code, for example 94518"
                className={INPUT}
              />
            </div>
            <div>
              <span className={LABEL}>Country</span>
              <p className="rounded-xl border border-line bg-mist px-3.5 py-2.5 text-sm text-slate">United States</p>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="order-notes" className={LABEL}>
                Order notes <span className="font-normal text-muted">(optional)</span>
              </label>
              <textarea id="order-notes" name="notes" rows={3} className={INPUT} />
            </div>
          </div>
        </Card>

        <Card title="Payment method">
          <div role="radiogroup" aria-label="Payment method">
            <label
              htmlFor="order-payment-cod"
              className={`flex cursor-pointer items-start gap-4 rounded-2xl border p-5 transition-colors ${
                paymentMethod === "Cash on Delivery"
                  ? "border-brand/45 bg-brand-tint ring-2 ring-brand/20"
                  : "border-line bg-canvas hover:border-brand/40"
              }`}
            >
              <input
                id="order-payment-cod"
                type="radio"
                name="paymentMethod"
                checked={paymentMethod === "Cash on Delivery"}
                onChange={() => setPaymentMethod("Cash on Delivery")}
                className="mt-1 h-4 w-4 shrink-0 accent-[#0d7ff2]"
              />
              <span>
                <span className="font-display text-base font-semibold text-ink">Cash on Delivery</span>
                <span className="mt-1 block text-sm text-slate">
                  The customer pays when the order is delivered. Saved as Unpaid.
                </span>
              </span>
            </label>

            <CardPaymentPanel
              tokenizationKey={tokenizationKey}
              collectJsUrl={collectJsUrl}
              selected={paymentMethod === "Credit or Debit Card"}
              onSelect={() => setPaymentMethod("Credit or Debit Card")}
              amount={total}
              tokenizerRef={tokenizerRef}
            />
          </div>
        </Card>
      </div>

      <div className="xl:sticky xl:top-6 xl:self-start">
        <Card title="Order summary">
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">Items</dt>
              <dd className="tabular-nums text-ink">{filled.reduce((sum, line) => sum + line.quantity, 0)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Subtotal</dt>
              <dd className="tabular-nums text-ink">{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Shipping</dt>
              <dd className="tabular-nums text-ink">{subtotal > 0 && shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
            </div>
            <div className="flex justify-between border-t border-line pt-3 text-base">
              <dt className="font-semibold text-ink">Total</dt>
              <dd className="font-display font-bold tabular-nums text-ink">{formatPrice(total)}</dd>
            </div>
          </dl>

          {error ? (
            <div className="mt-4">
              <Notice tone="error">{error}</Notice>
            </div>
          ) : null}

          <button type="submit" disabled={placing} className={`${BUTTON} mt-5 w-full`}>
            {placing
              ? paymentMethod === "Credit or Debit Card"
                ? "Charging card..."
                : "Placing order..."
              : paymentMethod === "Credit or Debit Card"
                ? `Charge ${formatPrice(total)} and Place Order`
                : "Place Order"}
          </button>
        </Card>
      </div>
    </form>
  );
}
