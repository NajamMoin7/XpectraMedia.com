import Image from "next/image";
import { NavLink } from "@/components/ui/NavLink";

import { CustomShirtCard } from "@/components/custom/CustomShirtCard";
import { Button } from "@/components/ui/Button";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { Icon, type IconName } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageBanner, SectionHeading } from "@/components/ui/PageBanner";
import { Reveal } from "@/components/ui/Reveal";
import {
  ACCEPTED_UPLOAD_LABEL,
  CUSTOM_PRODUCT_POLICY,
  CUSTOM_USE_CASES,
  PRINT_OPTIONS,
  QUANTITY_TIERS,
  SHIRT_COLORS,
  SHIRT_SIZES,
  SHIRT_STYLES,
} from "@/lib/custom-shirt";
import { formatPrice } from "@/lib/format";
import { getCustomShirts } from "@/lib/products";
import { buildMetadata, faqJsonLd } from "@/lib/seo";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/site";
import type { Faq } from "@/lib/types";

export const metadata = buildMetadata({
  title: "Create Your Custom Shirt",
  description:
    "Upload your design, preview it instantly, choose your preferred shirt style, and place your custom order directly from our website.",
  path: "/custom-shirts",
  keywords: [
    "custom shirts online",
    "custom logo shirts",
    "company logo shirts",
    "personalized shirts",
    "custom business shirts",
    "custom team shirts",
    "custom event shirts",
    "bulk custom shirts",
    "upload logo on shirt",
    "design your own shirt",
  ],
});

/* ------------------------------------------------------------------ */
/* Page content                                                        */
/* ------------------------------------------------------------------ */

const HOW_IT_WORKS: { icon: IconName; step: string; title: string; description: string }[] = [
  {
    icon: "plus",
    step: "One",
    title: "Upload your design",
    description: `Add your logo or artwork as a ${ACCEPTED_UPLOAD_LABEL} file. It is read straight in your browser, so there is no waiting on a slow upload.`,
  },
  {
    icon: "eye",
    step: "Two",
    title: "Preview it instantly",
    description:
      "Your design appears on the shirt the moment it loads. Drag it, resize it, rotate it and switch between the front and back views.",
  },
  {
    icon: "sparkle",
    step: "Three",
    title: "Choose your shirt",
    description:
      "Pick the style, color, size, quantity and print placement. The live price panel updates with every change you make.",
  },
  {
    icon: "cart",
    step: "Four",
    title: "Place your order",
    description:
      "Approve your details, add the finished shirt to your cart, and check out on the same website with Cash on Delivery.",
  },
];

const FAQS: Faq[] = [
  {
    question: "How do I put my own logo on a shirt?",
    answer:
      "Open the customization tool, select Upload Design, and choose a PNG, JPG, JPEG or WEBP file from your device. Your logo appears on the shirt preview immediately, and you can drag it into position, make it larger or smaller and rotate it until the placement looks right.",
  },
  {
    question: "Is there a minimum order for custom shirts?",
    answer:
      "No. You can order a single personalized shirt or several hundred. Volume pricing starts automatically at ten shirts, so larger orders for teams, staff and events cost less per shirt without any extra step.",
  },
  {
    question: "What file types can I upload for a custom shirt?",
    answer:
      "The tool accepts PNG, JPG, JPEG and WEBP files up to 5 MB. PNG files with a transparent background usually give the cleanest result, because the shirt color shows through instead of a white box around your artwork.",
  },
  {
    question: "Is my artwork uploaded to a server?",
    answer:
      "No. Your file is read directly in your browser to build the preview and to attach the design to your order. It is never sent anywhere while you are designing, which is why the preview appears the instant you choose a file.",
  },
  {
    question: "How much do custom shirts cost?",
    answer:
      "Prices start at $24.99 for a custom T Shirt and go up to $39.99 for a custom sweatshirt. Front printing is included in the shirt price, back printing adds $6.00 per shirt and front and back printing adds $10.00 per shirt.",
  },
  {
    question: "Can I order custom shirts in different sizes?",
    answer:
      "Yes. Every custom shirt comes in five sizes from Small through Double Extra Large. Configure one size, add it to your cart, then run the tool again for the next size. Your volume discount is based on the quantity in each configuration.",
  },
  {
    question: "Can I return a custom printed shirt?",
    answer:
      "Custom printed shirts are made specifically for your order, so they cannot be returned or exchanged unless the product arrives damaged, defective, or different from the approved order details. That is why the tool asks you to confirm your design and details before adding the shirt to your cart.",
  },
  {
    question: "How long does a custom shirt order take?",
    answer:
      "Custom printing adds a short production window on top of standard handling, and larger runs take a little longer while every shirt is matched to the same print setup. Delivery then follows the standard shipping timeline shown at checkout.",
  },
];

const USE_CASE_ICONS: IconName[] = [
  "shield",
  "tag",
  "sparkle",
  "star",
  "gift",
  "heart",
  "bolt",
  "grid",
];

export default function CustomShirtsPage() {
  const products = getCustomShirts();
  const lowestPrice = Math.min(...SHIRT_STYLES.map((style) => style.price));

  return (
    <>
      <JsonLd data={faqJsonLd(FAQS)} />

      <PageBanner
        eyebrow="Custom Shirts"
        title="Create Your Custom Shirt"
        description="Upload your design, preview it instantly, choose your preferred shirt style, and place your custom order directly from our website."
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Custom Shirts", href: "/custom-shirts" },
        ]}
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/custom-shirts/design" variant="primary" size="lg">
            Start Designing
            <Icon name="arrowRight" size={18} />
          </Button>
          <Button href="/custom-shirts/pricing" variant="outline" size="lg">
            See Pricing
          </Button>
        </div>
      </PageBanner>

      {/* ============================================================ */}
      {/* Hero                                                          */}
      {/* ============================================================ */}
      <section className="bg-canvas py-12 md:py-16">
        <div className="shell">
          <Reveal className="grid items-center gap-10 lg:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-line shadow-[var(--shadow-lift)]">
              <Image
                src="/assets/images/custom/hero.jpg"
                alt="Custom printed shirts laid out with a logo design ready for printing"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand">
                Custom Shirts Online
              </p>
              <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl lg:text-[2.4rem] lg:leading-[1.15]">
                Your design, on a shirt, in a few minutes
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate">
                Custom logo shirts used to mean a back and forth of emails, proofs and
                waiting. Here you do the whole thing yourself. Upload your artwork, watch
                it land on the shirt, move it until the placement is right, and order.
                There is no minimum, so a single personalized shirt is just as welcome as
                two hundred custom business shirts for a new store opening.
              </p>
              <p className="mt-4 text-base leading-relaxed text-slate">
                Everything you place on the preview happens in your own browser, which is
                why it feels instant. Nothing about your artwork travels anywhere while
                you are still deciding.
              </p>

              <dl className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                  { label: "Shirt styles", value: `${SHIRT_STYLES.length}` },
                  { label: "Shirt colors", value: `${SHIRT_COLORS.length}` },
                  { label: "Sizes", value: `${SHIRT_SIZES.length}` },
                  { label: "Starting at", value: formatPrice(lowestPrice) },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-line bg-mist px-4 py-3.5"
                  >
                    <dd className="font-display text-xl font-bold text-ink">
                      {stat.value}
                    </dd>
                    <dt className="mt-0.5 text-xs font-medium text-muted">{stat.label}</dt>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* How it works                                                  */}
      {/* ============================================================ */}
      <section className="border-y border-line bg-mist py-14 md:py-20">
        <div className="shell">
          <SectionHeading
            eyebrow="How It Works"
            title="Four steps from your file to your front door"
            description="The customization tool does the work on screen, so you can see the result before you commit to anything."
            centered
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {HOW_IT_WORKS.map((item, index) => (
              <Reveal
                key={item.title}
                delay={index * 80}
                className="relative flex h-full flex-col rounded-3xl border border-line bg-card p-6 shadow-[var(--shadow-soft)] transition-all duration-500 hover:-translate-y-1.5 hover:border-brand/45 hover:shadow-[var(--shadow-lift)]"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-tint text-brand">
                  <Icon name={item.icon} size={22} />
                </span>
                <p className="mt-5 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-brand">
                  Step {item.step}
                </p>
                <h3 className="mt-2 font-display text-lg font-semibold tracking-tight text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">
                  {item.description}
                </p>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Button href="/custom-shirts/design" variant="primary" size="lg">
              Open The Customization Tool
              <Icon name="arrowRight" size={18} />
            </Button>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Use cases                                                     */}
      {/* ============================================================ */}
      <section className="bg-canvas py-14 md:py-20">
        <div className="shell">
          <SectionHeading
            eyebrow="What People Print"
            title="Custom shirts for work, teams, events and everything else"
            description="The same tool covers a single personalized shirt and a full run of custom team shirts. Here is what customers use it for most."
          />

          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CUSTOM_USE_CASES.map((useCase, index) => (
              <Reveal
                key={useCase.title}
                as="li"
                delay={(index % 4) * 70}
                className="flex h-full flex-col rounded-3xl border border-line bg-card p-6 shadow-[var(--shadow-soft)] transition-all duration-500 hover:-translate-y-1.5 hover:border-brand/45 hover:shadow-[var(--shadow-lift)]"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-mist text-brand">
                  <Icon name={USE_CASE_ICONS[index] ?? "sparkle"} size={20} />
                </span>
                <h3 className="mt-4 font-display text-base font-semibold tracking-tight text-ink">
                  {useCase.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">
                  {useCase.description}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Product grid                                                  */}
      {/* ============================================================ */}
      <section className="border-y border-line bg-mist py-14 md:py-20">
        <div className="shell">
          <SectionHeading
            eyebrow="Customizable Shirts"
            title="Choose a shirt to print on"
            description="Every shirt below opens straight into the customization tool with the right style already selected."
            action={
              <Button href="/custom-shirts/design" variant="outline">
                Design Your Own Shirt
                <Icon name="arrowRight" size={16} />
              </Button>
            }
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product, index) => (
              <CustomShirtCard
                key={product.id}
                product={product}
                priority={index < 4}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Pricing teaser                                                */}
      {/* ============================================================ */}
      <section className="bg-canvas py-14 md:py-20">
        <div className="shell">
          <SectionHeading
            eyebrow="Pricing"
            title="Simple pricing, with bulk custom shirts costing less"
            description="Front printing is included in every shirt price. Add back printing or double sided printing inside the tool and the live price updates as you choose."
            action={
              <Button href="/custom-shirts/pricing" variant="outline">
                Full Pricing Details
                <Icon name="arrowRight" size={16} />
              </Button>
            }
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
            {/* Style prices */}
            <div className="overflow-hidden rounded-3xl border border-line bg-card shadow-[var(--shadow-soft)]">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[520px] text-left text-sm">
                  <caption className="sr-only">Custom shirt prices by style</caption>
                  <thead className="bg-mist text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                    <tr>
                      <th scope="col" className="px-5 py-3.5">Shirt style</th>
                      <th scope="col" className="px-5 py-3.5">Front print</th>
                      <th scope="col" className="px-5 py-3.5">Back print</th>
                      <th scope="col" className="px-5 py-3.5">Front and back</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {SHIRT_STYLES.map((style) => (
                      <tr key={style.id} className="transition-colors hover:bg-mist">
                        <th scope="row" className="px-5 py-4 font-semibold text-ink">
                          {style.name}
                        </th>
                        {PRINT_OPTIONS.map((print) => (
                          <td
                            key={print.id}
                            className="px-5 py-4 font-medium tabular-nums text-slate"
                          >
                            {formatPrice(style.price + print.charge)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="border-t border-line px-5 py-4 text-xs text-muted">
                Prices are per shirt in US dollars, before volume discounts. Standard
                shipping is free once your subtotal reaches{" "}
                {formatPrice(FREE_SHIPPING_THRESHOLD)}.
              </p>
            </div>

            {/* Volume tiers */}
            <div className="rounded-3xl border border-line bg-card p-6 shadow-[var(--shadow-soft)]">
              <h3 className="font-display text-lg font-semibold tracking-tight text-ink">
                Volume discounts
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">
                Applied automatically inside the tool as soon as your quantity reaches a
                tier. Nothing to enter and no code to remember.
              </p>
              <ul className="mt-5 flex flex-col gap-3">
                {[...QUANTITY_TIERS]
                  .sort((a, b) => a.min - b.min)
                  .map((tier) => (
                    <li
                      key={tier.min}
                      className="flex items-center justify-between gap-4 rounded-2xl border border-line bg-mist px-4 py-3.5"
                    >
                      <span className="text-sm font-medium text-slate">
                        {tier.min} shirts or more
                      </span>
                      <span className="font-display text-base font-bold text-brand">
                        {tier.percent} percent off
                      </span>
                    </li>
                  ))}
              </ul>
              <NavLink
                href="/custom-shirts/bulk-orders"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-colors hover:text-brand-deep"
              >
                Bulk custom shirts and reorders
                <Icon name="arrowRight" size={15} />
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Policy notice                                                 */}
      {/* ============================================================ */}
      <section className="bg-mist-2 py-12 md:py-16">
        <div className="shell">
          <div className="flex flex-col gap-5 rounded-3xl border border-line bg-card p-6 shadow-[var(--shadow-soft)] sm:flex-row sm:items-start sm:p-8">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-tint text-brand">
              <Icon name="shield" size={22} />
            </span>
            <div>
              <h2 className="font-display text-lg font-semibold tracking-tight text-ink">
                Before you order a custom shirt
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate">
                {CUSTOM_PRODUCT_POLICY}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate">
                The tool asks you to confirm your design, spelling, colors, placement and
                size before the shirt can be added to your cart. Take a moment on that
                step, because it is the version that gets printed.
              </p>
              <NavLink
                href="/custom-shirts/policy"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-colors hover:text-brand-deep"
              >
                Read the full custom product policy
                <Icon name="arrowRight" size={15} />
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FAQ                                                           */}
      {/* ============================================================ */}
      <section className="bg-canvas py-14 md:py-20">
        <div className="shell max-w-4xl">
          <SectionHeading
            eyebrow="Questions"
            title="Custom shirt questions, answered"
            description="If your question is not covered here, our team is happy to walk you through it before you order."
            centered
          />
          <FaqAccordion items={FAQS} className="mt-10" />
        </div>
      </section>

      {/* ============================================================ */}
      {/* Closing call to action                                        */}
      {/* ============================================================ */}
      <section className="border-t border-line bg-mist py-14 md:py-20">
        <div className="shell">
          <div className="relative overflow-hidden rounded-3xl border border-line bg-card p-8 text-center shadow-[var(--shadow-lift)] sm:p-12">
            <div aria-hidden="true" className="brand-wash pointer-events-none absolute inset-0" />
            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand">
                Ready When You Are
              </p>
              <h2 className="mx-auto mt-3 max-w-2xl font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl lg:text-[2.4rem] lg:leading-[1.15]">
                Upload your logo and see it on a shirt right now
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate">
                One file is all it takes. Open the tool, drop in your artwork, and your
                custom shirt is on screen before you have finished reading this sentence.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button href="/custom-shirts/design" variant="primary" size="lg">
                  Design Your Own Shirt
                  <Icon name="arrowRight" size={18} />
                </Button>
                <Button href="/custom-shirts/upload-guidelines" variant="outline" size="lg">
                  Upload Guidelines
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
