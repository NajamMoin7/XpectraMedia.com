import { NavLink } from "@/components/ui/NavLink";

import {
  SupportCard,
  SupportLayout,
  SupportList,
  SupportSection,
} from "@/components/support/SupportLayout";
import { Button } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { formatPrice } from "@/lib/format";
import { buildMetadata } from "@/lib/seo";
import {
  EXPRESS_SHIPPING_RATE,
  FREE_SHIPPING_THRESHOLD,
  PROCESSING_TIME,
  RETURN_WINDOW_DAYS,
  SHIPPING_METHODS,
  SHIPPING_RATE,
  site,
} from "@/lib/site";
import type { Faq } from "@/lib/types";

export const metadata = buildMetadata({
  title: "Shipping and Returns",
  description:
    "One page overview of Xpectra Media shipping and returns. Standard shipping $6.99, express shipping $14.99, free standard shipping on orders of $75 or more and returns accepted within 7 days of delivery.",
  path: "/support/shipping-and-returns",
  keywords: [
    "shipping and returns",
    "shipping policy",
    "return policy",
    "free shipping threshold",
    "refunds and replacements",
  ],
});

const { contact } = site;

const faqs: Faq[] = [
  {
    question: "What are the headline shipping and returns terms?",
    answer: `Standard shipping is ${formatPrice(SHIPPING_RATE)} and arrives in ${SHIPPING_METHODS[0].estimate}. Express shipping is ${formatPrice(EXPRESS_SHIPPING_RATE)} and arrives in ${SHIPPING_METHODS[1].estimate}. Standard shipping is free on orders of ${formatPrice(FREE_SHIPPING_THRESHOLD)} or more, and returns are accepted within ${RETURN_WINDOW_DAYS} days of delivery.`,
  },
  {
    question: "When does my delivery estimate actually start?",
    answer: `After processing, not at the moment you click place order. Orders are processed in ${PROCESSING_TIME}, and orders placed on weekends or public holidays are processed on the next business day.`,
  },
  {
    question: "What should I do if my package never arrives?",
    answer:
      "Allow a few extra business days past the estimate, check with anyone else at the address and look around the property. If it is still missing, contact us with your order number and we will investigate the delivery with the carrier and put it right.",
  },
  {
    question: "My parcel arrived damaged. What now?",
    answer:
      "Photograph the outer packaging and the product before removing anything else, then contact us within the return window with your order number and those photographs. Damage that occurred before delivery is our responsibility.",
  },
  {
    question: "Can I return a custom printed product?",
    answer:
      "Custom printed and personalized products are made to your artwork and cannot be resold, so they are non returnable. A genuine printing fault or manufacturing defect is always covered and we will replace or refund it.",
  },
  {
    question: "Where can I read the full detail of each policy?",
    answer:
      "This page is the condensed reference. The Shipping Information page covers delivery in full and the Easy Returns page covers the return process step by step and includes the online return request form.",
  },
];

const summary: { icon: IconName; label: string; value: string; note: string }[] = [
  {
    icon: "truck",
    label: "Standard Shipping",
    value: formatPrice(SHIPPING_RATE),
    note: SHIPPING_METHODS[0].estimate,
  },
  {
    icon: "bolt",
    label: "Express Shipping",
    value: formatPrice(EXPRESS_SHIPPING_RATE),
    note: SHIPPING_METHODS[1].estimate,
  },
  {
    icon: "gift",
    label: "Free Shipping",
    value: `${formatPrice(FREE_SHIPPING_THRESHOLD)} and above`,
    note: "Standard shipping only",
  },
  {
    icon: "refresh",
    label: "Returns",
    value: `${RETURN_WINDOW_DAYS} days`,
    note: "From the day of delivery",
  },
];

export default function ShippingAndReturnsPage() {
  return (
    <SupportLayout
      eyebrow="Customer support"
      title="Shipping and Returns"
      path="/support/shipping-and-returns"
      description="Everything about getting your order to you and sending something back, condensed onto one page. Follow the links through to the detailed guides whenever you need more."
      highlights={[
        { icon: "truck", label: "Standard", value: `${formatPrice(SHIPPING_RATE)}` },
        { icon: "bolt", label: "Express", value: `${formatPrice(EXPRESS_SHIPPING_RATE)}` },
        {
          icon: "gift",
          label: "Free shipping from",
          value: formatPrice(FREE_SHIPPING_THRESHOLD),
        },
        { icon: "refresh", label: "Return window", value: `${RETURN_WINDOW_DAYS} days` },
      ]}
      faqs={faqs}
      faqDescription="Quick answers that span both shipping and returns, with links through to the pages that go deeper."
      contactNote="If your question sits somewhere between shipping and returns, such as a parcel that arrived damaged or an order that never showed up, contact us with your order number and we will take it from there."
    >
      {/* Summary card */}
      <section className="bg-canvas pt-14 md:pt-18">
        <div className="shell">
          <div className="rounded-3xl border border-line bg-card p-7 shadow-[var(--shadow-lift)] sm:p-9">
            <div className="flex flex-col gap-2 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand">
                  At a glance
                </p>
                <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                  Your shipping and returns summary
                </h2>
              </div>
              <p className="text-sm leading-relaxed text-slate sm:max-w-sm sm:text-right">
                The four numbers that matter most, applied to every order shipped
                within the United States.
              </p>
            </div>

            <dl className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {summary.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-line bg-mist p-5 transition-all duration-300 hover:border-brand/40 hover:bg-brand-tint"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-canvas text-brand">
                    <Icon name={item.icon} size={18} />
                  </span>
                  <dt className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                    {item.label}
                  </dt>
                  <dd className="mt-2">
                    <span className="block font-display text-xl font-bold tracking-tight text-ink">
                      {item.value}
                    </span>
                    <span className="mt-1 block text-xs leading-relaxed text-slate">
                      {item.note}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-7 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row">
              <Button href="/support/shipping-information" variant="outline" size="md">
                <Icon name="truck" size={16} />
                Full Shipping Information
              </Button>
              <Button href="/support/easy-returns" variant="outline" size="md">
                <Icon name="refresh" size={16} />
                Full Returns Policy
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Shipping in brief */}
      <SupportSection
        eyebrow="Shipping in brief"
        title="Options, charges and timing"
        description="Two methods, one free shipping threshold and a processing window that sits in front of every delivery estimate."
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <SupportCard icon="truck" title="Shipping options">
            <p>
              Standard shipping at {formatPrice(SHIPPING_RATE)} arrives in{" "}
              {SHIPPING_METHODS[0].estimate}. Express shipping at{" "}
              {formatPrice(EXPRESS_SHIPPING_RATE)} arrives in{" "}
              {SHIPPING_METHODS[1].estimate}. You choose your method at
              checkout.
            </p>
          </SupportCard>

          <SupportCard icon="wallet" title="Shipping charges">
            <p>
              Charges are calculated at checkout from the method you select and
              added to your subtotal before you confirm. The order total shown on
              your confirmation already includes shipping.
            </p>
          </SupportCard>

          <SupportCard icon="gift" title="Free shipping threshold">
            <p>
              Standard shipping is free once your subtotal reaches{" "}
              {formatPrice(FREE_SHIPPING_THRESHOLD)}. No code is needed. Express
              shipping is a flat rate and is charged on every order.
            </p>
          </SupportCard>

          <SupportCard icon="clock" title="Processing time">
            <p>
              Orders are processed in {PROCESSING_TIME}. Orders placed on
              weekends or public holidays are processed on the next business day,
              and delivery estimates begin only after processing.
            </p>
          </SupportCard>
        </div>
      </SupportSection>

      {/* Delivery problems */}
      <SupportSection
        tone="mist"
        eyebrow="When something goes wrong"
        title="Delays, wrong addresses and problem deliveries"
        description="A short guide to the four delivery situations we are asked about most, and what we need from you in each case."
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <SupportCard icon="clock" title="Delivery estimates and delays">
            <p>
              Estimates are given in business days and start after processing.
              Severe weather, carrier backlogs, holiday periods and incorrect
              addresses can all add time to a journey.
            </p>
            <p className="mt-3">
              If the estimate has clearly passed, contact us with your order
              number and we will chase the carrier on your behalf.
            </p>
          </SupportCard>

          <SupportCard icon="pin" title="Incorrect address policy">
            <p>
              Your parcel is labelled exactly as you typed your address, so
              reviewing it before you place your order is your responsibility.
            </p>
            <p className="mt-3">
              Tell us immediately if you spot a mistake. Before dispatch we can
              usually correct it. After dispatch the address is fixed, and a
              parcel returned to us because of an incorrect address may need
              reshipping at your cost.
            </p>
          </SupportCard>

          <SupportCard icon="search" title="Lost package guidance">
            <p>
              Allow a few extra business days past the estimate, then check with
              others at the address and look in porches, side entrances and
              reception areas. Orders are sometimes split across more than one
              package, so a partial delivery may simply mean the rest is still in
              transit.
            </p>
            <p className="mt-3">
              Still nothing? Contact us with your order number and we will open
              an investigation with the carrier and arrange a replacement or a
              refund once it concludes.
            </p>
          </SupportCard>

          <SupportCard icon="shield" title="Damaged delivery guidance">
            <p>
              Photograph the outer packaging before you unpack any further, then
              photograph the product and any damaged tags or labels.
            </p>
            <p className="mt-3">
              Contact us within the return window with your order number and
              those photographs. Damage that happened before delivery is our
              responsibility and we will arrange a replacement or a refund
              without asking you to cover the cost.
            </p>
          </SupportCard>
        </div>
      </SupportSection>

      {/* Returns in brief */}
      <SupportSection
        eyebrow="Returns in brief"
        title={`The ${RETURN_WINDOW_DAYS} day return policy`}
        description={`Returns are accepted within ${RETURN_WINDOW_DAYS} days of delivery. Here is the condensed version of what qualifies and how approval works.`}
      >
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-line bg-card p-6 shadow-[var(--shadow-soft)]">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-tint text-brand">
                <Icon name="checkCircle" size={18} />
              </span>
              <h3 className="font-display text-base font-bold tracking-tight text-ink">
                Return eligibility
              </h3>
            </div>
            <SupportList
              className="mt-4"
              items={[
                `Requested within ${RETURN_WINDOW_DAYS} days of delivery.`,
                "Unused, unworn and never washed.",
                "Original tags attached and original packaging kept.",
                "Order number supplied with the request.",
                "Not a customized or personalized product.",
              ]}
            />
          </div>

          <div className="rounded-3xl border border-line bg-card p-6 shadow-[var(--shadow-soft)]">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-mist-2 text-sale">
                <Icon name="close" size={18} />
              </span>
              <h3 className="font-display text-base font-bold tracking-tight text-ink">
                Non returnable products
              </h3>
            </div>
            <SupportList
              className="mt-4"
              tone="sale"
              icon="close"
              items={[
                "Custom printed and personalized products.",
                "Used, worn or washed products.",
                "Damage caused after delivery.",
                "Products missing their original tags.",
                `Requests made after the ${RETURN_WINDOW_DAYS} day window.`,
                "Final sale products where clearly stated.",
              ]}
            />
          </div>

          <div className="rounded-3xl border border-line bg-card p-6 shadow-[var(--shadow-soft)]">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-tint text-brand">
                <Icon name="list" size={18} />
              </span>
              <h3 className="font-display text-base font-bold tracking-tight text-ink">
                The approval process
              </h3>
            </div>
            <SupportList
              className="mt-4"
              items={[
                "Contact support with your order number and reason.",
                "Add photographs if the product is damaged or faulty.",
                "Wait for written approval and your return address.",
                "Pack securely and ship only to that address.",
                "Wait for inspection, which takes 2 to 3 business days.",
              ]}
            />
          </div>
        </div>
      </SupportSection>

      {/* Outcomes and custom products */}
      <SupportSection
        tone="mist"
        eyebrow="After approval"
        title="Refunds, replacements and custom products"
        description="What happens once your returned product has been inspected, and the one category that works differently."
      >
        <div className="grid gap-5 md:grid-cols-3">
          <SupportCard icon="wallet" title="Refund processing">
            <p>
              Refunds are arranged after your product passes inspection, which
              usually takes 2 to 3 business days from the day your parcel reaches
              us. A refund covers the price paid for the returned product.
            </p>
            <p className="mt-3">
              Because orders are paid by Cash on Delivery, our support team
              arranges your refund with you directly using the contact details on
              your order.
            </p>
          </SupportCard>

          <SupportCard icon="refresh" title="Replacements">
            <p>
              A replacement sends the same product again in the size and color
              you expected, subject to availability. It is processed and
              delivered on the same timings as a new order.
            </p>
            <p className="mt-3">
              If your size has sold out we will contact you promptly and offer a
              refund instead.
            </p>
          </SupportCard>

          <SupportCard icon="tag" title="Custom product restrictions">
            <p>
              Custom printed shirts and personalized products are made to your
              artwork and cannot be offered to another customer, so they sit
              outside the standard return policy.
            </p>
            <p className="mt-3">
              A genuine printing fault, a misprint on our side or a manufacturing
              defect is always covered. Send us photographs and we will replace
              or refund the item.
            </p>
          </SupportCard>
        </div>
      </SupportSection>

      {/* Detailed guides */}
      <SupportSection
        eyebrow="Go deeper"
        title="Read the detailed guides"
        description="This page is the summary. Each guide below covers its subject in full, with worked examples and the complete policy wording."
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              href: "/support/shipping-information",
              icon: "truck" as IconName,
              title: "Shipping Information",
              body: "Methods, charges, processing, delivery estimates, delays, multiple packages and tracking.",
            },
            {
              href: "/support/easy-returns",
              icon: "refresh" as IconName,
              title: "Easy Returns",
              body: `The full ${RETURN_WINDOW_DAYS} day policy, eligibility, non returnable products, the eight step process and the return request form.`,
            },
            {
              href: "/support/shopping-cart",
              icon: "cart" as IconName,
              title: "Shopping Cart Guide",
              body: "Adding products, sizes and colors, quantities, how totals are calculated and how your cart is saved.",
            },
            {
              href: "/support/secure-checkout",
              icon: "lock" as IconName,
              title: "Secure Checkout",
              body: "How your information is handled, how validation works, Cash on Delivery and your order confirmation.",
            },
          ].map((guide) => (
            <NavLink
              key={guide.href}
              href={guide.href}
              className="group flex h-full flex-col rounded-3xl border border-line bg-card p-6 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-[var(--shadow-lift)]"
            >
              <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-tint text-brand">
                <Icon name={guide.icon} size={20} />
              </span>
              <span className="mt-4 font-display text-base font-semibold tracking-tight text-ink">
                {guide.title}
              </span>
              <span className="mt-2 flex-1 text-sm leading-relaxed text-slate">
                {guide.body}
              </span>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand">
                Read the guide
                <Icon
                  name="arrowRight"
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </span>
            </NavLink>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center gap-4 rounded-3xl border border-line bg-brand-tint p-7 text-center shadow-[var(--shadow-soft)] sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="font-display text-lg font-bold tracking-tight text-ink">
              Still have a question about an order?
            </p>
            <p className="mt-1 text-sm leading-relaxed text-slate">
              Call{" "}
              <a
                href={contact.phoneHref}
                className="font-semibold text-brand underline-offset-4 hover:underline"
              >
                {contact.phone}
              </a>{" "}
              or email{" "}
              <a
                href={contact.emailHref}
                className="font-semibold text-brand underline-offset-4 hover:underline"
              >
                {contact.email}
              </a>{" "}
              with your order number.
            </p>
          </div>
          <Button href="/products" size="lg" className="sm:shrink-0">
            Continue Shopping
            <Icon name="arrowRight" size={16} />
          </Button>
        </div>
      </SupportSection>
    </SupportLayout>
  );
}
