import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { PageBanner, SectionHeading } from "@/components/ui/PageBanner";
import {
  PRINT_OPTIONS,
  QUANTITY_TIERS,
  SHIRT_STYLES,
  priceCustomShirt,
} from "@/lib/custom-shirt";
import { formatPrice } from "@/lib/format";
import { buildMetadata } from "@/lib/seo";
import {
  FREE_SHIPPING_THRESHOLD,
  PROCESSING_TIME,
  SHIPPING_RATE,
} from "@/lib/site";

export const metadata = buildMetadata({
  title: "Custom Shirt Pricing",
  description:
    "See exactly what a custom shirt costs. Full price table by shirt style and print placement, automatic volume discounts, worked examples and what is included in every order.",
  path: "/custom-shirts/pricing",
  keywords: [
    "custom shirt pricing",
    "custom logo shirts price",
    "bulk custom shirts pricing",
    "custom business shirts cost",
    "personalized shirts price",
  ],
});

/** Realistic orders used to show how the numbers come together. */
const EXAMPLES = [
  {
    title: "One personalized shirt",
    styleId: "tshirt",
    print: "front" as const,
    quantity: 1,
    note: "A single custom T Shirt with a front print, the smallest order the tool accepts.",
  },
  {
    title: "Twelve company logo shirts",
    styleId: "polo",
    print: "front" as const,
    quantity: 12,
    note: "Custom polos for a small staff team, the first tier where volume pricing kicks in.",
  },
  {
    title: "Thirty custom event shirts",
    styleId: "tshirt",
    print: "both" as const,
    quantity: 30,
    note: "Front logo and back sponsor panel, printed for a one day event.",
  },
  {
    title: "Sixty bulk custom shirts",
    styleId: "longsleeve",
    print: "back" as const,
    quantity: 60,
    note: "A larger uniform run at the deepest volume tier we publish.",
  },
];

const INCLUDED = [
  "The blank shirt itself, in your chosen style, color and size",
  "Front printing on every shirt, with no separate setup charge",
  "The live design tool, with unlimited previews and repositioning",
  "Volume pricing applied automatically as your quantity grows",
  "Standard packing and handling on every custom order",
];

const NOT_INCLUDED = [
  "Back printing, which adds $6.00 per shirt",
  "Front and back printing, which adds $10.00 per shirt",
  "Shipping below the free shipping threshold",
];

export default function CustomShirtPricingPage() {
  return (
    <>
      <PageBanner
        eyebrow="Custom Shirts"
        title="Custom Shirt Pricing"
        description="Every price on this page is per shirt, in US dollars, and matches exactly what the customization tool shows you as you build your order."
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Custom Shirts", href: "/custom-shirts" },
          { name: "Pricing", href: "/custom-shirts/pricing" },
        ]}
      />

      {/* ---------------------------------------------- Price table */}
      <section className="bg-canvas py-12 md:py-16">
        <div className="shell">
          <SectionHeading
            eyebrow="Price Table"
            title="Every shirt style and print placement"
            description="Front printing is included in the shirt price. Back and double sided printing add a fixed amount per shirt, whatever style you choose."
          />

          <div className="mt-10 overflow-hidden rounded-3xl border border-line bg-card shadow-[var(--shadow-soft)]">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <caption className="sr-only">
                  Custom shirt price per shirt by style and print placement
                </caption>
                <thead className="bg-mist text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                  <tr>
                    <th scope="col" className="px-5 py-4">Shirt style</th>
                    <th scope="col" className="px-5 py-4">Base price</th>
                    {PRINT_OPTIONS.map((print) => (
                      <th key={print.id} scope="col" className="px-5 py-4">
                        {print.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {SHIRT_STYLES.map((style) => (
                    <tr key={style.id} className="transition-colors hover:bg-mist">
                      <th scope="row" className="px-5 py-5 align-top">
                        <span className="block font-semibold text-ink">{style.name}</span>
                        <span className="mt-1 block text-xs font-normal leading-relaxed text-muted">
                          {style.description}
                        </span>
                      </th>
                      <td className="px-5 py-5 align-top font-medium tabular-nums text-slate">
                        {formatPrice(style.price)}
                      </td>
                      {PRINT_OPTIONS.map((print) => (
                        <td
                          key={print.id}
                          className="px-5 py-5 align-top font-semibold tabular-nums text-ink"
                        >
                          {formatPrice(style.price + print.charge)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="border-t border-line px-5 py-4 text-xs leading-relaxed text-muted">
              All figures are per shirt before volume discounts. The customization tool
              recalculates the full breakdown live as you change the style, placement or
              quantity.
            </p>
          </div>

          {/* Print placement detail */}
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {PRINT_OPTIONS.map((print) => (
              <div
                key={print.id}
                className="rounded-3xl border border-line bg-card p-6 shadow-[var(--shadow-soft)]"
              >
                <h3 className="font-display text-base font-semibold tracking-tight text-ink">
                  {print.label}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate">
                  {print.description}
                </p>
                <p className="mt-4 font-display text-2xl font-bold text-brand">
                  {print.charge === 0 ? "Included" : `Plus ${formatPrice(print.charge)}`}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------ Volume discounts */}
      <section className="border-y border-line bg-mist py-12 md:py-16">
        <div className="shell">
          <SectionHeading
            eyebrow="Volume Pricing"
            title="The more shirts you order, the less each one costs"
            description="Discounts are applied automatically inside the tool the moment your quantity reaches a tier. There is no code to enter and no approval to wait on."
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {[...QUANTITY_TIERS]
              .sort((a, b) => a.min - b.min)
              .map((tier) => (
                <div
                  key={tier.min}
                  className="rounded-3xl border border-line bg-card p-6 text-center shadow-[var(--shadow-soft)] transition-all duration-500 hover:-translate-y-1.5 hover:border-brand/45 hover:shadow-[var(--shadow-lift)]"
                >
                  <p className="font-display text-4xl font-bold text-brand">
                    {tier.percent}%
                  </p>
                  <p className="mt-2 text-sm font-semibold text-ink">
                    From {tier.min} shirts
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted">
                    Applied to the shirt price and the printing charge together, across
                    the whole quantity.
                  </p>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------- Worked examples */}
      <section className="bg-canvas py-12 md:py-16">
        <div className="shell">
          <SectionHeading
            eyebrow="Worked Examples"
            title="What real orders come to"
            description="Four orders priced end to end, using the same calculation the customization tool runs."
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {EXAMPLES.map((example) => {
              const style = SHIRT_STYLES.find((item) => item.id === example.styleId);
              const print = PRINT_OPTIONS.find((item) => item.id === example.print);
              const pricing = priceCustomShirt(
                example.styleId,
                example.print,
                example.quantity,
              );

              return (
                <div
                  key={example.title}
                  className="flex flex-col rounded-3xl border border-line bg-card p-6 shadow-[var(--shadow-soft)]"
                >
                  <h3 className="font-display text-lg font-semibold tracking-tight text-ink">
                    {example.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {example.note}
                  </p>

                  <dl className="mt-5 flex flex-col gap-2.5 text-sm">
                    <div className="flex justify-between gap-4">
                      <dt className="text-slate">{style?.name} base price</dt>
                      <dd className="font-medium tabular-nums text-ink">
                        {formatPrice(pricing.unitPrice)}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-slate">{print?.label}</dt>
                      <dd className="font-medium tabular-nums text-ink">
                        {pricing.printCharge === 0
                          ? "Included"
                          : formatPrice(pricing.printCharge)}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4 border-t border-line pt-2.5">
                      <dt className="text-slate">
                        {formatPrice(pricing.unitTotal)} times {pricing.quantity} shirts
                      </dt>
                      <dd className="font-medium tabular-nums text-ink">
                        {formatPrice(pricing.unitTotal * pricing.quantity)}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-slate">
                        Volume discount, {pricing.discountPercent} percent
                      </dt>
                      <dd
                        className={`font-medium tabular-nums ${
                          pricing.discountAmount > 0 ? "text-success" : "text-muted"
                        }`}
                      >
                        {pricing.discountAmount > 0
                          ? `Less ${formatPrice(pricing.discountAmount)}`
                          : "None"}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-slate">Subtotal</dt>
                      <dd className="font-medium tabular-nums text-ink">
                        {formatPrice(pricing.subtotal)}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-slate">Shipping</dt>
                      <dd
                        className={`font-medium tabular-nums ${
                          pricing.shipping === 0 ? "text-success" : "text-ink"
                        }`}
                      >
                        {pricing.shipping === 0 ? "Free" : formatPrice(pricing.shipping)}
                      </dd>
                    </div>
                    <div className="mt-1 flex items-baseline justify-between gap-4 rounded-2xl bg-mist px-4 py-3">
                      <dt className="font-semibold text-ink">Order total</dt>
                      <dd className="font-display text-lg font-bold tabular-nums text-brand">
                        {formatPrice(pricing.total)}
                      </dd>
                    </div>
                  </dl>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* -------------------------------------- Included and shipping */}
      <section className="border-t border-line bg-mist-2 py-12 md:py-16">
        <div className="shell">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-line bg-card p-6 shadow-[var(--shadow-soft)] sm:p-8">
              <h2 className="font-display text-xl font-bold tracking-tight text-ink">
                What is included in the price
              </h2>
              <ul className="mt-5 flex flex-col gap-3">
                {INCLUDED.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-slate">
                    <Icon name="checkCircle" size={17} className="mt-0.5 shrink-0 text-success" />
                    {item}
                  </li>
                ))}
              </ul>

              <h3 className="mt-7 font-display text-base font-semibold tracking-tight text-ink">
                Charged separately
              </h3>
              <ul className="mt-3 flex flex-col gap-3">
                {NOT_INCLUDED.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-slate">
                    <Icon name="plus" size={17} className="mt-0.5 shrink-0 text-brand" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-line bg-card p-6 shadow-[var(--shadow-soft)] sm:p-8">
              <h2 className="font-display text-xl font-bold tracking-tight text-ink">
                Shipping on custom orders
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate">
                Custom shirts ship under the same rules as everything else in the store.
                Standard shipping is {formatPrice(SHIPPING_RATE)} and becomes free once
                your subtotal reaches {formatPrice(FREE_SHIPPING_THRESHOLD)}. Because
                custom orders are usually more than one shirt, most of them clear the free
                shipping threshold on their own.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-slate">
                Handling on a standard order is {PROCESSING_TIME}. Custom printing adds a
                short production window on top of that, because each shirt is printed to
                your approved design rather than pulled from a shelf. Larger runs take a
                little longer while every shirt is matched to the same print setup, so
                the fiftieth shirt looks like the first.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-slate">
                Your full order total, including shipping, is shown in the customization
                tool before you add anything to your cart, and again at checkout.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Button href="/custom-shirts/design" variant="primary">
                  Price Your Order
                  <Icon name="arrowRight" size={16} />
                </Button>
                <Button href="/custom-shirts/bulk-orders" variant="outline">
                  Bulk Orders
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
