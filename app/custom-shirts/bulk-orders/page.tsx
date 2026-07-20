import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { PageBanner, SectionHeading } from "@/components/ui/PageBanner";
import {
  QUANTITY_TIERS,
  SHIRT_SIZES,
  SHIRT_STYLES,
  priceCustomShirt,
} from "@/lib/custom-shirt";
import { formatPrice } from "@/lib/format";
import { buildMetadata } from "@/lib/seo";
import { PROCESSING_TIME, site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Bulk Custom Shirts",
  description:
    "Order bulk custom shirts for staff, teams and events. Automatic volume discounts, mixed sizes in one order, lead times, and consistent results across every reorder.",
  path: "/custom-shirts/bulk-orders",
  keywords: [
    "bulk custom shirts",
    "custom team shirts",
    "company logo shirts",
    "custom business shirts",
    "custom event shirts",
    "wholesale custom shirts",
  ],
});

const LEAD_TIMES = [
  {
    range: "1 to 24 shirts",
    detail: "Printed as a single short run. Handling is close to a standard order, with only a short production window added on top.",
  },
  {
    range: "25 to 49 shirts",
    detail: "Printed in one batch so every shirt shares the same setup. Allow a few extra days beyond a small order.",
  },
  {
    range: "50 shirts and above",
    detail: "Scheduled as a production run with a color check at the start. This is the tier where planning ahead pays off, so give us as much notice as you can before an event date.",
  },
];

const CONSISTENCY = [
  {
    title: "Your approved design is the record",
    body: "Every custom order stores the exact artwork, position, scale and rotation you approved. A reorder six months later prints from that same record rather than from someone reconstructing it by eye.",
  },
  {
    title: "Same blanks, same colors",
    body: "We print on the same shirt styles and the same published color range every time. A new starter joining next quarter gets a shirt that sits next to the originals without looking like a different generation.",
  },
  {
    title: "Batch matched printing",
    body: "Shirts in a single order are printed together with one setup, so the fiftieth shirt matches the first. Across separate orders we work to the same specification, and small variation between production runs is normal on any printed garment.",
  },
  {
    title: "Reordering is one step",
    body: "Open the customization tool, upload the same artwork file, and set the same style, color and placement. Keep your original file safe on your own device and a repeat order takes a couple of minutes.",
  },
];

export default function BulkOrdersPage() {
  const sampleTiers = [...QUANTITY_TIERS].sort((a, b) => a.min - b.min);

  return (
    <>
      <PageBanner
        eyebrow="Custom Shirts"
        title="Bulk Custom Shirts"
        description="Uniforms for a growing team, shirts for a company event, a full squad kitted out in the same design. Larger orders cost less per shirt and go through the same tool as a single shirt."
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Custom Shirts", href: "/custom-shirts" },
          { name: "Bulk Orders", href: "/custom-shirts/bulk-orders" },
        ]}
      />

      {/* ---------------------------------------------- Discount tiers */}
      <section className="bg-canvas py-12 md:py-16">
        <div className="shell">
          <SectionHeading
            eyebrow="Volume Discounts"
            title="Discounts apply automatically as your quantity grows"
            description="There is no quote to request and no minimum to reach before you can order. Set your quantity in the customization tool and the discount is already in the price."
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {sampleTiers.map((tier) => {
              const pricing = priceCustomShirt("tshirt", "front", tier.min);
              const perShirt =
                Math.round(pricing.unitTotal * ((100 - tier.percent) / 100) * 100) / 100;

              return (
                <div
                  key={tier.min}
                  className="rounded-3xl border border-line bg-card p-6 shadow-[var(--shadow-soft)] transition-all duration-500 hover:-translate-y-1.5 hover:border-brand/45 hover:shadow-[var(--shadow-lift)]"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                    From {tier.min} shirts
                  </p>
                  <p className="mt-2 font-display text-4xl font-bold text-brand">
                    {tier.percent}%
                  </p>
                  <p className="mt-1 text-sm font-medium text-ink">off every shirt</p>
                  <p className="mt-4 border-t border-line pt-4 text-sm leading-relaxed text-slate">
                    A custom T Shirt with front printing works out to{" "}
                    <span className="font-semibold tabular-nums text-ink">
                      {formatPrice(perShirt)}
                    </span>{" "}
                    each at this tier, down from{" "}
                    <span className="tabular-nums">{formatPrice(pricing.unitTotal)}</span>.
                  </p>
                </div>
              );
            })}
          </div>

          <p className="mt-6 text-sm leading-relaxed text-muted">
            The discount applies to the shirt price and the printing charge together, on
            every shirt in that configuration. It works the same way on all{" "}
            {SHIRT_STYLES.length} shirt styles and on all three print placements.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------ Mixed sizes */}
      <section className="border-y border-line bg-mist py-12 md:py-16">
        <div className="shell">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-line bg-card p-6 shadow-[var(--shadow-soft)] sm:p-8">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-tint text-brand">
                <Icon name="ruler" size={22} />
              </span>
              <h2 className="mt-5 font-display text-xl font-bold tracking-tight text-ink">
                Ordering mixed sizes
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate">
                Real teams are not all one size, and you do not have to pretend otherwise.
                All {SHIRT_SIZES.length} sizes are available on every custom shirt style,
                from {SHIRT_SIZES[0]} through {SHIRT_SIZES[SHIRT_SIZES.length - 1]}.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-slate">
                To order a mix, run the customization tool once per size. Upload your
                artwork, set the style, color and placement, choose the size, set how many
                of that size you need, and add it to your cart. Then repeat for the next
                size. Your cart holds each size as its own line, and every line carries
                the identical approved design.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-slate">
                One thing worth knowing: the volume discount is calculated per
                configuration, so a run of forty shirts split evenly across four sizes
                earns the ten shirt tier on each line rather than the twenty five shirt
                tier overall. If your total sits just under a threshold, concentrating the
                sizes a little can be worth it.
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {SHIRT_SIZES.map((size) => (
                  <li
                    key={size}
                    className="rounded-full border border-line bg-mist px-3.5 py-1.5 text-xs font-semibold text-slate"
                  >
                    {size}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-line bg-card p-6 shadow-[var(--shadow-soft)] sm:p-8">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-tint text-brand">
                <Icon name="clock" size={22} />
              </span>
              <h2 className="mt-5 font-display text-xl font-bold tracking-tight text-ink">
                Lead times
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate">
                Standard handling on a stock item is {PROCESSING_TIME}. Custom printing
                adds a production window on top, because your shirts are made after you
                order rather than picked from a shelf. Delivery time then follows the
                shipping method you choose at checkout.
              </p>
              <ul className="mt-5 flex flex-col gap-3">
                {LEAD_TIMES.map((item) => (
                  <li
                    key={item.range}
                    className="rounded-2xl border border-line bg-mist px-4 py-3.5"
                  >
                    <p className="text-sm font-semibold text-ink">{item.range}</p>
                    <p className="mt-1 text-xs leading-relaxed text-slate">
                      {item.detail}
                    </p>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm leading-relaxed text-slate">
                If your shirts are tied to a fixed date, tell us the date when you place
                the order and we will confirm whether it is comfortable or tight before
                anything goes into production.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------- Consistency */}
      <section className="bg-canvas py-12 md:py-16">
        <div className="shell">
          <SectionHeading
            eyebrow="Reorders"
            title="Uniform consistency across every reorder"
            description="A uniform only works if the shirt someone gets in month eighteen looks like the shirt everyone got on day one."
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {CONSISTENCY.map((item) => (
              <div
                key={item.title}
                className="flex flex-col rounded-3xl border border-line bg-card p-6 shadow-[var(--shadow-soft)]"
              >
                <h3 className="flex items-start gap-3 font-display text-base font-semibold tracking-tight text-ink">
                  <Icon name="checkCircle" size={18} className="mt-0.5 shrink-0 text-brand" />
                  {item.title}
                </h3>
                <p className="mt-2.5 pl-8 text-sm leading-relaxed text-slate">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------- Contact */}
      <section className="border-t border-line bg-mist-2 py-12 md:py-16">
        <div className="shell">
          <div className="relative overflow-hidden rounded-3xl border border-line bg-card p-6 shadow-[var(--shadow-lift)] sm:p-10">
            <div aria-hidden="true" className="brand-wash pointer-events-none absolute inset-0" />
            <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand">
                  Talk To Us First
                </p>
                <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                  Planning a large order?
                </h2>
                <p className="mt-4 text-base leading-relaxed text-slate">
                  You can place a bulk order yourself in the customization tool at any
                  time. But if you are working to a deadline, splitting a run across many
                  sizes, or setting up shirts you expect to reorder for years, a short
                  conversation first usually saves time later.
                </p>
                <p className="mt-4 text-base leading-relaxed text-slate">
                  {site.contact.name} handles custom and bulk enquiries directly, and our
                  support hours are {site.contact.hours[0].days},{" "}
                  {site.contact.hours[0].time}.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Button href="/custom-shirts/design" variant="primary" size="lg">
                    Start Your Bulk Order
                    <Icon name="arrowRight" size={18} />
                  </Button>
                  <Button href="/contact" variant="outline" size="lg">
                    Contact Page
                  </Button>
                </div>
              </div>

              <ul className="flex flex-col gap-3">
                {[
                  {
                    icon: "mail" as const,
                    label: "Email",
                    value: site.contact.email,
                    href: site.contact.emailHref,
                  },
                  {
                    icon: "phone" as const,
                    label: "Phone",
                    value: site.contact.phone,
                    href: site.contact.phoneHref,
                  },
                ].map((channel) => (
                  <li key={channel.label}>
                    <a
                      href={channel.href}
                      className="flex items-center gap-4 rounded-2xl border border-line bg-canvas px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand hover:shadow-[var(--shadow-soft)]"
                    >
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-tint text-brand">
                        <Icon name={channel.icon} size={20} />
                      </span>
                      <span>
                        <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                          {channel.label}
                        </span>
                        <span className="mt-0.5 block text-sm font-semibold text-ink">
                          {channel.value}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}

                <li className="rounded-2xl border border-line bg-canvas px-5 py-4">
                  <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                    Support hours
                  </span>
                  <ul className="mt-2 flex flex-col gap-1">
                    {site.contact.hours.map((slot) => (
                      <li key={slot.days} className="text-sm text-slate">
                        <span className="font-semibold text-ink">{slot.days}</span>{" "}
                        {slot.time}
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
