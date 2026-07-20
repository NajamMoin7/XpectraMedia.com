import {
  SupportBadge,
  SupportCard,
  SupportLayout,
  SupportList,
  SupportNotice,
  SupportSection,
} from "@/components/support/SupportLayout";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { formatPrice } from "@/lib/format";
import { buildMetadata } from "@/lib/seo";
import {
  FREE_SHIPPING_THRESHOLD,
  PROCESSING_TIME,
  SHIPPING_METHODS,
  site,
} from "@/lib/site";
import type { Faq } from "@/lib/types";

export const metadata = buildMetadata({
  title: "Shipping Information",
  description:
    "Xpectra Media shipping options, charges and delivery estimates. Standard shipping is $6.99 and arrives in 5 to 7 business days, express shipping is $14.99 and arrives in 2 to 3 business days, and standard shipping is free on orders of $75 or more.",
  path: "/support/shipping-information",
  keywords: [
    "shipping information",
    "delivery estimates",
    "free shipping",
    "express shipping",
    "order processing time",
  ],
});

const { contact } = site;

const faqs: Faq[] = [
  {
    question: "How long will my order take to arrive?",
    answer: `Add the processing time to the delivery estimate for your chosen method. Orders are processed in ${PROCESSING_TIME}, then standard shipping takes 5 to 7 business days and express shipping takes 2 to 3 business days.`,
  },
  {
    question: "How do I qualify for free shipping?",
    answer: `Standard shipping is free once your order subtotal reaches ${formatPrice(FREE_SHIPPING_THRESHOLD)}. The saving is applied automatically at checkout, and your cart tells you how much more you need to add to reach it. Express shipping is a flat rate and is charged on every order.`,
  },
  {
    question: "What happens if I place my order on a Saturday or a holiday?",
    answer:
      "Orders placed on weekends or public holidays are processed on the next business day. Processing time and the delivery estimate both begin from that next business day rather than the day you ordered.",
  },
  {
    question: "Why did my order arrive in more than one package?",
    answer:
      "Larger orders and orders containing custom printed items are sometimes packed and dispatched separately so that the items ready first are not held back. If one package has arrived and another has not, please allow a little longer before contacting us.",
  },
  {
    question: "Can I track my package?",
    answer:
      "Order tracking is coming soon. For now, your shipping confirmation details are displayed once your order is placed, and our support team can tell you the current status of your order if you contact us with your order number.",
  },
  {
    question: "What happens if I entered the wrong delivery address?",
    answer:
      "Contact us immediately with your order number. If your order has not yet been handed to the courier we can usually correct the address. Once a parcel has left us the address cannot be changed, and a parcel returned to us because of an incorrect address may need to be reshipped at your cost.",
  },
];

const deliveryFactors = [
  {
    icon: "bolt" as const,
    title: "Severe weather",
    body: "Storms, snow and flooding can close roads and ground flights, which pauses carrier networks in the affected region until it is safe to resume.",
  },
  {
    icon: "truck" as const,
    title: "Carrier delays",
    body: "High parcel volumes, sorting facility backlogs and vehicle problems can add a day or more to a journey that is otherwise on schedule.",
  },
  {
    icon: "gift" as const,
    title: "Holiday periods",
    body: "Major shopping seasons and public holidays reduce the number of working days available and put every carrier under heavier load.",
  },
  {
    icon: "pin" as const,
    title: "Incorrect addresses",
    body: "A missing apartment number, a wrong ZIP code or an incomplete street name sends a parcel back into the network for correction, which costs several days.",
  },
];

export default function ShippingInformationPage() {
  return (
    <SupportLayout
      eyebrow="Customer support"
      title="Shipping Information"
      path="/support/shipping-information"
      description="Our shipping methods, charges and delivery estimates, plus how orders are processed, what can delay a delivery and what to expect once your order is on its way."
      highlights={[
        {
          icon: "truck",
          label: "Standard shipping",
          value: `${formatPrice(SHIPPING_METHODS[0].price)} in ${SHIPPING_METHODS[0].estimate}`,
        },
        {
          icon: "bolt",
          label: "Express shipping",
          value: `${formatPrice(SHIPPING_METHODS[1].price)} in ${SHIPPING_METHODS[1].estimate}`,
        },
        {
          icon: "gift",
          label: "Free standard shipping",
          value: `Orders of ${formatPrice(FREE_SHIPPING_THRESHOLD)} or more`,
        },
        { icon: "clock", label: "Processing time", value: PROCESSING_TIME },
      ]}
      action={
        <Button href="/products" size="lg">
          Start Shopping
          <Icon name="arrowRight" size={16} />
        </Button>
      }
      faqs={faqs}
      faqDescription="Delivery times, charges and dispatch questions answered for orders shipped anywhere in the United States."
      contactNote="Waiting longer than the estimate, or need to correct an address before your parcel leaves us? Send us your order number and we will check exactly where things stand."
    >
      {/* Shipping methods */}
      <SupportSection
        eyebrow="Choose your speed"
        title="Shipping methods and charges"
        description="Two methods are offered at checkout. Pick the one that suits your timing, and the charge is added to your subtotal before you confirm."
      >
        <div className="grid gap-5 md:grid-cols-2">
          {SHIPPING_METHODS.map((method) => (
            <article
              key={method.id}
              className="flex flex-col rounded-3xl border border-line bg-card p-7 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-[var(--shadow-lift)]"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand-tint text-brand">
                  <Icon name={method.id === "express" ? "bolt" : "truck"} size={22} />
                </span>
                <span className="font-display text-2xl font-bold tracking-tight text-ink">
                  {formatPrice(method.price)}
                </span>
              </div>
              <h3 className="mt-5 font-display text-lg font-bold tracking-tight text-ink">
                {method.name}
              </h3>
              <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-brand">
                <Icon name="clock" size={16} />
                Arrives in {method.estimate}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate">
                {method.id === "express"
                  ? `Express shipping is the fastest option we offer and is charged at a flat ${formatPrice(method.price)} on every order, no matter how much you spend. Choose it when you need your order for a specific date.`
                  : `Standard shipping is our default method and costs ${formatPrice(method.price)}. It becomes completely free once your order subtotal reaches ${formatPrice(FREE_SHIPPING_THRESHOLD)}.`}
              </p>
              <p className="mt-4 border-t border-line pt-4 text-sm font-semibold text-ink">
                {method.note}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-6">
          <SupportNotice icon="gift" title={`Free standard shipping on orders of ${formatPrice(FREE_SHIPPING_THRESHOLD)} or more`}>
            <p>
              Reach a subtotal of {formatPrice(FREE_SHIPPING_THRESHOLD)} before
              shipping and the standard shipping charge of{" "}
              {formatPrice(SHIPPING_METHODS[0].price)} is removed automatically
              at checkout. You do not need a code and there is nothing to claim.
            </p>
            <p className="mt-3">
              Your cart shows how much more you need to add to qualify. Express
              shipping is a flat rate service and is always charged, even on
              orders above the threshold.
            </p>
          </SupportNotice>
        </div>
      </SupportSection>

      {/* Processing */}
      <SupportSection
        tone="mist"
        eyebrow="Before your parcel moves"
        title="Order processing time"
        description="Processing is the work we do between your order being placed and your parcel being handed to the carrier. It is separate from the delivery estimate."
      >
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div className="rounded-3xl border border-line bg-card p-7 shadow-[var(--shadow-soft)]">
            <div className="flex items-center gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand-tint text-brand">
                <Icon name="clock" size={22} />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                  Processing time
                </p>
                <p className="font-display text-xl font-bold tracking-tight text-ink">
                  {PROCESSING_TIME}
                </p>
              </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-slate">
              During processing we confirm your order details, pick your
              products, quality check them, pack them and print your shipping
              label. Custom printed items sit at the longer end of this window
              because artwork is prepared and printed before packing.
            </p>
            <SupportList
              className="mt-5"
              items={[
                `Orders are processed in ${PROCESSING_TIME} from the moment they are placed.`,
                "Orders placed on weekends or public holidays are processed on the next business day.",
                "Business days are Monday to Friday and exclude public holidays.",
                "Delivery estimates begin only after your order has been processed.",
              ]}
            />
          </div>

          <div className="rounded-3xl border border-line bg-card p-7 shadow-[var(--shadow-soft)]">
            <h3 className="font-display text-lg font-bold tracking-tight text-ink">
              Working out your arrival window
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate">
              Add the processing time to the delivery estimate of the method you
              chose. That gives you a realistic window in business days.
            </p>
            <div className="mt-5 flex flex-col gap-3">
              <div className="rounded-2xl border border-line bg-mist p-5">
                <p className="font-display text-sm font-semibold text-ink">
                  Standard shipping
                </p>
                <p className="mt-1 text-sm leading-relaxed text-slate">
                  {PROCESSING_TIME} of processing plus{" "}
                  {SHIPPING_METHODS[0].estimate} in transit.
                </p>
              </div>
              <div className="rounded-2xl border border-line bg-mist p-5">
                <p className="font-display text-sm font-semibold text-ink">
                  Express shipping
                </p>
                <p className="mt-1 text-sm leading-relaxed text-slate">
                  {PROCESSING_TIME} of processing plus{" "}
                  {SHIPPING_METHODS[1].estimate} in transit.
                </p>
              </div>
            </div>
            <p className="mt-5 text-xs leading-relaxed text-muted">
              An order placed late on a Friday is processed from the following
              Monday, so please count business days rather than calendar days.
            </p>
          </div>
        </div>
      </SupportSection>

      {/* Address responsibility */}
      <SupportSection
        eyebrow="Your delivery address"
        title="Getting the address right"
        description="A parcel can only be as accurate as the address on its label. Couriers follow what you typed, exactly as you typed it."
      >
        <div className="grid gap-5 md:grid-cols-3">
          <SupportCard icon="pin" title="Give us a complete address">
            <p>
              Include your street number and street name, any apartment, suite
              or unit number, your city, your state and your ZIP code. A missing
              unit number is the single most common reason a parcel fails to
              reach its recipient.
            </p>
          </SupportCard>
          <SupportCard icon="eye" title="Review before you order">
            <p>
              Checking your address before placing an order is your
              responsibility, and the review step at checkout exists for exactly
              that. Read it back once, character by character, before you
              confirm.
            </p>
          </SupportCard>
          <SupportCard icon="refresh" title="If you spot a mistake">
            <p>
              Contact us straight away with your order number. If your parcel
              has not been handed to the courier we can usually correct it. Once
              it has left us the address is fixed, and a parcel returned to us
              may need reshipping at your cost.
            </p>
          </SupportCard>
        </div>
      </SupportSection>

      {/* Delays */}
      <SupportSection
        tone="mist"
        eyebrow="Realistic expectations"
        title="What can delay a delivery"
        description="Delivery estimates are estimates, not guarantees. Once a parcel is with a carrier, its journey depends on conditions outside our control."
      >
        <div className="grid gap-5 sm:grid-cols-2">
          {deliveryFactors.map((factor) => (
            <SupportCard key={factor.title} icon={factor.icon} title={factor.title}>
              {factor.body}
            </SupportCard>
          ))}
        </div>

        <div className="mt-6 rounded-3xl border border-line bg-card p-6 shadow-[var(--shadow-soft)]">
          <h3 className="font-display text-lg font-bold tracking-tight text-ink">
            If your order is running late
          </h3>
          <SupportList
            className="mt-4"
            items={[
              "Count business days from the day your order was processed rather than the day you placed it.",
              "Check whether a public holiday fell inside your delivery window.",
              "Ask anyone else at the address whether the parcel was accepted on your behalf.",
              "Look around the property, including porches, side doors and reception desks.",
              "Contact us with your order number if the estimate has clearly passed and we will chase it for you.",
            ]}
          />
        </div>
      </SupportSection>

      {/* Dispatch and tracking */}
      <SupportSection
        eyebrow="Once it is on the way"
        title="Packages, confirmation and tracking"
        description="What arrives, how it arrives and what information you get when your order is placed."
      >
        <div className="grid gap-5 md:grid-cols-3">
          <SupportCard icon="grid" title="Orders may arrive separately">
            <p>
              Larger orders and orders that mix ready to ship clothing with
              custom printed items may be split across more than one package so
              that nothing is held back unnecessarily.
            </p>
            <p className="mt-3">
              Each package travels on its own and can arrive on a different day.
              Please allow a little extra time before assuming anything is
              missing.
            </p>
          </SupportCard>

          <SupportCard icon="checkCircle" title="Shipping confirmation">
            <p>
              Your shipping confirmation details are displayed once your order is
              placed. They show your order number, the delivery address on the
              label, the shipping method you selected and the estimated arrival
              window for that method.
            </p>
            <p className="mt-3">
              Save your order number. It is all our support team needs to look up
              your order.
            </p>
          </SupportCard>

          <SupportCard icon="search" title="Order tracking" badge="Coming Soon">
            <p>
              Live parcel tracking is not available yet. We are building a
              tracking view that will show each stage of your parcel journey from
              packed to delivered.
            </p>
            <p className="mt-3">
              Until it launches, contact our support team with your order number
              and we will tell you exactly where your order stands.
            </p>
            <p className="mt-4">
              <SupportBadge tone="muted">Tracking launching soon</SupportBadge>
            </p>
          </SupportCard>
        </div>

        <div className="mt-8 flex flex-col items-center gap-4 rounded-3xl border border-line bg-brand-tint p-7 text-center shadow-[var(--shadow-soft)] sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="font-display text-lg font-bold tracking-tight text-ink">
              Need a delivery update today?
            </p>
            <p className="mt-1 text-sm leading-relaxed text-slate">
              Call our team with your order number and we will check the status
              of your parcel while you are on the line.
            </p>
          </div>
          <Button href={contact.phoneHref} size="lg" className="sm:shrink-0">
            <Icon name="phone" size={18} />
            Call {contact.phone}
          </Button>
        </div>
      </SupportSection>
    </SupportLayout>
  );
}
