import Link from "next/link";

import { Icon } from "@/components/ui/Icon";
import { PageBanner } from "@/components/ui/PageBanner";
import { Reveal } from "@/components/ui/Reveal";
import { CUSTOM_PRODUCT_POLICY } from "@/lib/custom-shirt";
import { formatPrice } from "@/lib/format";
import { buildMetadata } from "@/lib/seo";
import {
  FREE_SHIPPING_THRESHOLD,
  PROCESSING_TIME,
  RETURN_WINDOW_DAYS,
  SHIPPING_METHODS,
  site,
} from "@/lib/site";

export const metadata = buildMetadata({
  title: "Terms and Conditions",
  description:
    "The terms that apply when you shop at Xpectra Media, covering website usage, product information, pricing, order acceptance, Cash on Delivery, shipping, 7 day returns, custom shirt printing rules and uploaded image ownership.",
  path: "/terms-and-conditions",
  keywords: [
    "Xpectra Media terms and conditions",
    "online clothing store terms",
    "custom shirt printing terms",
    "ecommerce terms of service",
    "shipping and returns policy",
  ],
});

const LAST_UPDATED = "July 20, 2026";

/** Section anchors rendered in the sticky table of contents. */
const sections = [
  { id: "acceptance-of-terms", label: "Acceptance of these terms" },
  { id: "website-usage", label: "Website usage" },
  { id: "customer-responsibilities", label: "Customer responsibilities" },
  { id: "product-information", label: "Products, images and availability" },
  { id: "pricing", label: "Pricing" },
  { id: "order-acceptance", label: "Order submission and acceptance" },
  { id: "cancellations", label: "Order cancellation" },
  { id: "payment", label: "Payment methods" },
  { id: "shipping", label: "Shipping and delivery" },
  { id: "returns-and-exchanges", label: "Returns, refunds and replacements" },
  { id: "custom-printing", label: "Custom printed product restrictions" },
  { id: "uploaded-designs", label: "Uploaded designs and your warranty" },
  { id: "prohibited-content", label: "Prohibited uploaded content" },
  { id: "intellectual-property", label: "Intellectual property" },
  { id: "limitation-of-liability", label: "Liability and website availability" },
  { id: "privacy", label: "Privacy" },
  { id: "changes-to-terms", label: "Changes and governing terms" },
  { id: "contact-information", label: "Contact information" },
];

const H2 = "font-display text-xl font-bold tracking-tight text-ink sm:text-2xl";
const H3 = "mt-7 font-display text-base font-bold text-ink";
const BODY = "text-base leading-relaxed text-slate";
const LINK =
  "font-semibold text-brand underline-offset-4 transition-colors hover:text-brand-deep hover:underline";
const CARD =
  "mt-6 rounded-3xl border border-line bg-mist p-6 shadow-[var(--shadow-soft)] sm:p-7";

const [STANDARD_SHIPPING, EXPRESS_SHIPPING] = SHIPPING_METHODS;

/** Small helper so every bulleted list on this page looks identical. */
function CheckList({ items }: { items: string[] }) {
  return (
    <ul className={`mt-4 space-y-3 ${BODY}`}>
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <Icon name="check" size={18} className="mt-1 shrink-0 text-brand" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function TermsAndConditionsPage() {
  return (
    <>
      <PageBanner
        eyebrow="Legal"
        title="Terms and Conditions"
        description="These terms set out how our online clothing store works: what we promise, what we ask of you, and exactly how orders, custom printing, shipping, returns and cancellations are handled."
        crumbs={[{ name: "Terms and Conditions", href: "/terms-and-conditions" }]}
      />

      <div className="bg-canvas">
        <div className="shell py-14 md:py-20">
          <div className="grid gap-12 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-16">
            {/* Table of contents */}
            <aside className="hidden lg:block" aria-labelledby="toc-heading">
              <nav className="sticky top-28 rounded-3xl border border-line bg-card p-6 shadow-[var(--shadow-soft)]">
                <h2
                  id="toc-heading"
                  className="font-display text-sm font-bold uppercase tracking-[0.2em] text-ink"
                >
                  On this page
                </h2>
                <ol className="mt-5 space-y-3 text-sm">
                  {sections.map((section, index) => (
                    <li key={section.id}>
                      <Link
                        href={`#${section.id}`}
                        className="flex gap-3 leading-relaxed text-slate transition-colors hover:text-brand"
                      >
                        <span className="font-display text-xs font-bold text-muted">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span>{section.label}</span>
                      </Link>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>

            {/* Terms body */}
            <article className="max-w-3xl">
              <Reveal>
                <div className="flex flex-wrap items-center gap-4 rounded-3xl border border-line bg-card px-6 py-5 shadow-[var(--shadow-soft)]">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-tint text-brand">
                    <Icon name="shield" size={22} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink">
                      Last updated: {LAST_UPDATED}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-slate">
                      Applies to {site.url} and every order placed through it.
                    </p>
                  </div>
                </div>
              </Reveal>

              <div className="mt-10 space-y-12">
                <Reveal>
                  <p className={BODY}>
                    Welcome to Xpectra Media. By browsing this website, adding
                    items to your cart, uploading a design to our shirt
                    customization tool or placing an order, you agree to the
                    terms below. They form the agreement between you and{" "}
                    {site.legalName}, a United States business selling everyday
                    clothing, baby clothes, toys and custom printed shirts. We
                    have written them to be read rather than skimmed past, so
                    they are in plain language and they describe only what this
                    store actually does.
                  </p>
                </Reveal>

                {/* 1 */}
                <Reveal>
                  <section id="acceptance-of-terms" className="scroll-mt-28">
                    <h2 className={H2}>1. Acceptance of these terms</h2>
                    <div className={`mt-5 space-y-4 ${BODY}`}>
                      <p>
                        These terms apply from the moment you open any page of
                        this website. You accept them by using the site, and you
                        accept them again, more specifically, each time you
                        submit an order or upload artwork for printing. If you do
                        not agree with any part of them, please do not use the
                        website or place an order.
                      </p>
                      <p>
                        You may place an order if you are at least 18 years old,
                        or if a parent or guardian who accepts these terms is
                        placing the order on your behalf. By ordering you confirm
                        that you have the legal capacity to enter into this
                        agreement.
                      </p>
                      <p>
                        Our{" "}
                        <Link href="/privacy-policy" className={LINK}>
                          privacy policy
                        </Link>{" "}
                        forms part of these terms. Where the two documents
                        overlap, for example on how uploaded images are handled,
                        they are written to say the same thing.
                      </p>
                    </div>
                  </section>
                </Reveal>

                {/* 2 */}
                <Reveal>
                  <section id="website-usage" className="scroll-mt-28">
                    <h2 className={H2}>2. Website usage</h2>
                    <div className={`mt-5 space-y-4 ${BODY}`}>
                      <p>
                        You may browse, search, filter and read every page of
                        this website freely, build as many custom shirt designs
                        as you like, and place orders for delivery within the
                        United States.
                      </p>
                      <p>
                        You agree not to interfere with the website, attempt to
                        access parts of it that are not published, scrape the
                        catalogue at scale, upload files intended to disrupt the
                        customization tool, or place orders you have no intention
                        of accepting.
                      </p>
                      <p>
                        This website currently operates as a static frontend.
                        There are no customer accounts, so there is no username
                        or password for you to protect, and the checkout process
                        is a simulated frontend flow rather than a live server
                        transaction. Where an account system is introduced later,
                        account holders will be responsible for keeping their
                        login details confidential and for activity that takes
                        place under their login, and these terms will be updated
                        to say so before that happens.
                      </p>
                      <p>
                        We may decline to serve a customer where we see repeated
                        abuse, such as orders that are consistently refused at
                        the door under different names, or repeated uploads that
                        breach the content rules below. We would much rather
                        never have to.
                      </p>
                    </div>
                  </section>
                </Reveal>

                {/* 3 */}
                <Reveal>
                  <section id="customer-responsibilities" className="scroll-mt-28">
                    <h2 className={H2}>3. Customer responsibilities</h2>
                    <p className={`mt-5 ${BODY}`}>
                      A small number of things are genuinely on your side of the
                      agreement, and each one exists because we cannot fix it
                      after the fact.
                    </p>
                    <CheckList
                      items={[
                        "Give accurate contact and delivery details at checkout, including your full name, phone number, email address and complete shipping address.",
                        "Check your shipping address carefully before you submit. You are responsible for an incorrect or incomplete address, and for the cost of a reshipment where a parcel is returned to us because it could not be delivered.",
                        "Make sure somebody is available at the delivery address to receive the parcel and pay the carrier.",
                        "Review your custom design before adding it to the cart, including spelling, colors, placement and size, because the design is printed exactly as you approved it.",
                        "Confirm that you are allowed to use any image you upload, which is covered in detail further down this page.",
                        "Tell us promptly if something arrives damaged, defective or different from what you ordered, so we can put it right inside the return window.",
                      ]}
                    />
                    <p className={`mt-5 ${BODY}`}>
                      If a delivery fails because the address was wrong, the
                      recipient was unavailable after repeated attempts, or the
                      parcel was refused at the door, the order is treated as
                      canceled and the item returns to us. Where the failure was
                      caused by details you supplied, any cost of reshipping is
                      yours.
                    </p>
                  </section>
                </Reveal>

                {/* 4 */}
                <Reveal>
                  <section id="product-information" className="scroll-mt-28">
                    <h2 className={H2}>4. Products, images and availability</h2>

                    <h3 className={H3}>Product descriptions</h3>
                    <p className={`mt-4 ${BODY}`}>
                      We describe every product as accurately as we can. Fabric
                      composition, fit, available sizes and colors, care
                      instructions and the measurements on the size guide are
                      taken from the actual item rather than copied from a
                      supplier sheet. If a shirt runs slim or a knit is a heavy
                      weight, we say so on the product page. Toys carry age
                      guidance on the product page. Please follow it, keep
                      packaging away from small children, and supervise play with
                      any item that includes small components.
                    </p>

                    <h3 className={H3}>Product images</h3>
                    <div className={`mt-4 space-y-4 ${BODY}`}>
                      <p>
                        Product photography is intended to show the item
                        faithfully, but colors can still vary slightly between
                        screens. A monitor, a phone and a tablet will each render
                        the same photograph a little differently, so a small
                        difference in shade between the image and the item you
                        receive is not a fault. If the difference is more than
                        small, that is covered by the returns section below.
                      </p>
                      <p>
                        The shirt customization preview is a visual guide rather
                        than a print proof. It shows placement, scale and
                        rotation on a mockup, and final print placement and
                        colors may vary slightly on the finished garment.
                        Differences of that kind are a normal characteristic of
                        printing and are not treated as a defect.
                      </p>
                    </div>

                    <h3 className={H3}>Availability</h3>
                    <p className={`mt-4 ${BODY}`}>
                      Stock levels are updated as orders come in, but on a busy
                      day an item can sell out between the moment you add it to
                      your cart and the moment you check out. If that happens we
                      contact you before dispatch and offer an alternative, a
                      partial shipment or a full cancellation. Products,
                      customization options, shirt styles and print placements
                      may be added, changed or withdrawn at any time.
                    </p>
                  </section>
                </Reveal>

                {/* 5 */}
                <Reveal>
                  <section id="pricing" className="scroll-mt-28">
                    <h2 className={H2}>5. Pricing</h2>
                    <div className={`mt-5 space-y-4 ${BODY}`}>
                      <p>
                        All prices on this website are shown in United States
                        dollars. The price displayed on the product card and the
                        product page is the price you pay for that item. Where a
                        product shows a struck through regular price, that is the
                        price the item sold at before the current promotion.
                      </p>
                      <p>
                        Custom shirts are priced from the shirt style you choose,
                        plus the charge for the print placement you select, and
                        any quantity discount that applies at your order size.
                        The full breakdown, including the unit price, the print
                        charge, the discount, the shipping charge and the order
                        total, is shown in the customization tool before you add
                        anything to your cart.
                      </p>
                      <p>
                        Your cart shows the subtotal, the shipping charge and the
                        order total before you confirm anything. Sales tax, where
                        it applies to your delivery address, is shown separately
                        at checkout so the amount collected on delivery is never
                        a surprise.
                      </p>
                      <p>
                        We may change prices, add products or end a promotion at
                        any time. A change never applies to an order we have
                        already confirmed. If a product is listed at an obviously
                        incorrect price because of a technical or human error, we
                        will contact you before dispatch and you may either
                        confirm the order at the correct price or cancel it at no
                        cost.
                      </p>
                    </div>
                  </section>
                </Reveal>

                {/* 6 */}
                <Reveal>
                  <section id="order-acceptance" className="scroll-mt-28">
                    <h2 className={H2}>6. Order submission and acceptance</h2>
                    <div className={`mt-5 space-y-4 ${BODY}`}>
                      <p>
                        Submitting an order on this website is an offer to buy,
                        not a completed contract. The contract forms when we
                        confirm your order and dispatch it, which allows us to
                        check stock, review any custom design and confirm your
                        delivery details first.
                      </p>
                      <p>
                        After you check out you will see an order confirmation
                        with your order number, and a copy is saved in your
                        browser so the confirmation page still works if you
                        refresh it. Because this website is a static frontend,
                        that confirmation screen is generated in your browser
                        rather than by a live order system, and our team confirms
                        the order with you by phone or email before anything is
                        produced or shipped.
                      </p>
                      <p>
                        We may decline an order where an item is out of stock,
                        where the shipping address falls outside the areas our
                        partners serve, where the contact details cannot be
                        verified, where the order appears fraudulent, or where an
                        uploaded design appears to breach the content rules
                        below. If we decline, we tell you why and nothing is owed
                        by either side.
                      </p>
                      <p>
                        You can read more about how the cart and checkout behave
                        on our{" "}
                        <Link href="/support/shopping-cart" className={LINK}>
                          shopping cart
                        </Link>{" "}
                        and{" "}
                        <Link href="/support/secure-checkout" className={LINK}>
                          secure checkout
                        </Link>{" "}
                        support pages.
                      </p>
                    </div>
                  </section>
                </Reveal>

                {/* 7 */}
                <Reveal>
                  <section id="cancellations" className="scroll-mt-28">
                    <h2 className={H2}>7. Order cancellation</h2>
                    <div className={`mt-5 space-y-4 ${BODY}`}>
                      <p>
                        You can cancel or change a standard catalogue order at no
                        cost at any point before it ships. Contact us with your
                        order number as soon as you can and our team will update
                        or cancel it right away. Because Cash on Delivery means
                        no money has changed hands yet, there is nothing to
                        refund.
                      </p>
                      <p>
                        Custom printed items are the exception, because
                        production is specific to your order. A custom order can
                        be canceled or amended only before printing begins, which
                        is usually within a few hours of the order being
                        confirmed with you. Once printing has started, the item
                        cannot be canceled.
                      </p>
                      <p>
                        Once a parcel has been handed to the carrier we can no
                        longer stop it. At that point you may either refuse the
                        delivery at the door or accept it and start a return
                        under the {RETURN_WINDOW_DAYS} day policy below,
                        whichever is easier for you, subject to the custom
                        printing restrictions.
                      </p>
                      <p>
                        We may cancel an order ourselves if an item turns out to
                        be unavailable, if the delivery address falls outside our
                        service area, if we cannot reach you to confirm the order
                        after several attempts, or if a custom design appears to
                        breach these terms. In every case we tell you what
                        happened, and where a custom order is canceled by us for
                        a content reason, any amount you have paid is refunded in
                        full.
                      </p>
                    </div>
                  </section>
                </Reveal>

                {/* 8 */}
                <Reveal>
                  <section id="payment" className="scroll-mt-28">
                    <h2 className={H2}>8. Payment methods</h2>

                    <h3 className={H3}>Cash on Delivery</h3>
                    <div className={`mt-4 space-y-4 ${BODY}`}>
                      <p>
                        Cash on Delivery is currently the only active payment
                        method. No advance payment is required, and we never ask
                        for card numbers, bank details or digital wallet
                        credentials at any stage.
                      </p>
                      <p>
                        You pay the full order total in cash to the carrier at
                        the moment your parcel is handed over. Please have the
                        exact amount ready where possible, since carriers do not
                        always carry change. The receipt for that cash is issued
                        at the time of handover.
                      </p>
                    </div>
                    <CheckList
                      items={[
                        "Nobody from Xpectra Media will ever call you to request an advance transfer or a card number. If someone does, it is not us.",
                        "You may inspect the outside of the parcel and confirm the order number before paying.",
                        "If you refuse a parcel at the door, the order is treated as canceled and the item returns to us.",
                        "Repeatedly refusing delivered orders may mean we ask for confirmation before accepting future orders.",
                      ]}
                    />

                    <h3 className={H3}>Future card payment availability</h3>
                    <div className={`mt-4 space-y-4 ${BODY}`}>
                      <p>
                        Card payment is planned but is not available yet. The
                        card form shown at checkout is a disabled preview of that
                        future option. It cannot be selected as a payment method,
                        no card details are collected, processed or stored
                        through this website today, and no payment processor is
                        connected to it.
                      </p>
                      <p>
                        When card payment is switched on, we will publish updated
                        terms and an updated privacy policy first, naming the
                        payment processor and describing what it receives. Until
                        those updates appear, Cash on Delivery is the only way to
                        pay for an order.
                      </p>
                    </div>
                  </section>
                </Reveal>

                {/* 9 */}
                <Reveal>
                  <section id="shipping" className="scroll-mt-28">
                    <h2 className={H2}>9. Shipping and delivery</h2>
                    <div className={`mt-5 space-y-4 ${BODY}`}>
                      <p>
                        We ship anywhere in the United States. Two shipping
                        methods are offered at checkout, and the charge is shown
                        in your cart before you confirm anything.
                      </p>
                    </div>
                    <CheckList
                      items={[
                        `${STANDARD_SHIPPING.name}: ${formatPrice(STANDARD_SHIPPING.price)} per order, arriving in ${STANDARD_SHIPPING.estimate}, and free once your subtotal reaches ${formatPrice(FREE_SHIPPING_THRESHOLD)}.`,
                        `${EXPRESS_SHIPPING.name}: ${formatPrice(EXPRESS_SHIPPING.price)} per order, arriving in ${EXPRESS_SHIPPING.estimate}, charged as a flat rate on every order.`,
                        `Processing takes ${PROCESSING_TIME} before the parcel is handed to the carrier, and custom printed orders may need the full processing window.`,
                      ]}
                    />
                    <div className={`mt-5 space-y-4 ${BODY}`}>
                      <p>
                        Delivery estimates are counted in business days from the
                        moment the parcel leaves us, so the total time you wait
                        is the processing time plus the delivery estimate for the
                        method you chose. Once your parcel ships we send a
                        tracking link to the email address you gave at checkout.
                      </p>
                      <p>
                        Delivery timeframes are estimates rather than guarantees.
                        Weather, carrier backlogs and holiday periods can add a
                        day or two, and we will keep you informed if your parcel
                        is running behind. Express shipping buys a faster carrier
                        service, not a guaranteed arrival date, and the express
                        charge is not refundable simply because a parcel arrived
                        a day later than estimated. If a parcel is lost in
                        transit we will replace it or cancel the order at no cost
                        to you.
                      </p>
                      <p>
                        You are responsible for the delivery address you provide.
                        If a parcel cannot be delivered because the address was
                        incorrect or incomplete, or if two delivery attempts
                        fail, the parcel returns to us and the order is canceled.
                        Reshipping to a corrected address is charged at the
                        normal rate.
                      </p>
                      <p>
                        Full details, including how tracking works, are on our{" "}
                        <Link href="/support/shipping-information" className={LINK}>
                          shipping information
                        </Link>{" "}
                        and{" "}
                        <Link href="/support/shipping-and-returns" className={LINK}>
                          shipping and returns
                        </Link>{" "}
                        pages.
                      </p>
                    </div>
                  </section>
                </Reveal>

                {/* 10 */}
                <Reveal>
                  <section id="returns-and-exchanges" className="scroll-mt-28">
                    <h2 className={H2}>
                      10. Returns, refunds and replacements
                    </h2>
                    <div className={`mt-5 space-y-4 ${BODY}`}>
                      <p>
                        You may request a return within {RETURN_WINDOW_DAYS} days
                        of delivery. That window is short and firm, so please
                        open the parcel and check the contents when it arrives
                        rather than leaving it in a hallway for a week.
                      </p>
                    </div>

                    <h3 className={H3}>Refund eligibility</h3>
                    <p className={`mt-4 ${BODY}`}>
                      To be eligible for a refund, the item must be requested
                      within {RETURN_WINDOW_DAYS} days of delivery and must come
                      back unworn, unwashed, free of odors and marks, and still
                      carrying its original tags and packaging. Once the item
                      arrives and passes inspection, the refund of the amount you
                      paid is processed within five business days. Shipping
                      charges are refunded only where the return was caused by a
                      damaged, defective or incorrect item.
                    </p>

                    <h3 className={H3}>Replacement eligibility</h3>
                    <p className={`mt-4 ${BODY}`}>
                      A replacement is available on the same conditions and
                      within the same {RETURN_WINDOW_DAYS} day window. Tell us
                      the size or color you would prefer, send the original item
                      back, and we ship the replacement as soon as the return
                      reaches us. If the replacement costs more, the difference is
                      collected on delivery. Where an item arrived damaged,
                      defective or different from what you ordered, the
                      replacement is shipped at our cost including return
                      shipping.
                    </p>

                    <h3 className={H3}>How to start a return</h3>
                    <CheckList
                      items={[
                        "Email us at the address below with your order number and the item you want to return.",
                        "Tell us whether you would like a replacement or a refund of the amount you paid.",
                        "Include a clear photograph if the item arrived damaged, defective or incorrect.",
                        "We send a return label and collection instructions within one business day.",
                        "Once the item arrives and passes inspection, the refund or replacement is processed within five business days.",
                      ]}
                    />

                    <p className={`mt-5 ${BODY}`}>
                      For hygiene reasons, baby sleepwear that has been opened
                      and any item marked as a final sale cannot be returned
                      unless it arrived faulty. Custom printed items have their
                      own rules, set out in the next section. If something
                      arrives damaged or incorrect, contact us within 48 hours
                      with a photograph and we will resolve it at our cost. Our{" "}
                      <Link href="/support/easy-returns" className={LINK}>
                        easy returns
                      </Link>{" "}
                      page walks through the whole process step by step.
                    </p>
                  </section>
                </Reveal>

                {/* 11 */}
                <Reveal>
                  <section id="custom-printing" className="scroll-mt-28">
                    <h2 className={H2}>
                      11. Custom printed product restrictions
                    </h2>

                    <div className={CARD}>
                      <p className="font-display text-base font-bold text-ink">
                        Custom printing policy
                      </p>
                      <p className={`mt-2 ${BODY}`}>{CUSTOM_PRODUCT_POLICY}</p>
                    </div>

                    <div className={`mt-6 space-y-4 ${BODY}`}>
                      <p>
                        This restriction exists because a custom shirt is
                        manufactured for you alone. A printed garment carrying
                        your artwork, your text and your chosen placement cannot
                        be resold to another customer, so it sits outside the
                        ordinary {RETURN_WINDOW_DAYS} day return window that
                        applies to catalogue products.
                      </p>
                      <p>
                        The approved order details referred to in that policy are
                        fixed at a specific moment: the point where you tick the
                        approval checkbox in the customization tool and add the
                        item to your cart. That checkbox confirms that you have
                        reviewed your design, spelling, colors, placement, size
                        and customization details. Whatever is on screen when you
                        accept it becomes the specification we print against, and
                        it is recorded with your cart line so both sides know
                        what was approved.
                      </p>
                      <p>
                        In practice that means a spelling mistake in your own
                        text, artwork uploaded at a low resolution, a placement
                        you later decide you dislike, or a size you chose
                        incorrectly are not grounds for a return, because each of
                        those was part of what you approved. We will always try
                        to help, but we cannot treat an approved detail as a
                        defect.
                      </p>
                      <p>
                        You remain fully protected where the fault is ours. A
                        custom shirt that arrives damaged, that is defective in
                        the garment or the print, or that differs from the
                        approved order details, is returned, replaced or refunded
                        at our cost. Contact us within 48 hours of delivery with
                        a photograph of the item and we will resolve it.
                      </p>
                      <p>
                        Minor variation in print position, print size and color
                        reproduction compared with the on screen preview is
                        normal for garment printing and is not a defect. The
                        preview is a visual guide, as stated in the customization
                        tool and in the product information section above.
                      </p>
                    </div>
                  </section>
                </Reveal>

                {/* 12 */}
                <Reveal>
                  <section id="uploaded-designs" className="scroll-mt-28">
                    <h2 className={H2}>
                      12. Uploaded designs and your warranty
                    </h2>
                    <div className={`mt-5 space-y-4 ${BODY}`}>
                      <p>
                        You keep ownership of any image you upload. Uploading a
                        design to the customization tool does not transfer your
                        copyright to Xpectra Media, and we do not claim any right
                        to sell, publish, license or reuse your artwork for our
                        own purposes.
                      </p>
                      <p>
                        Uploaded images are processed entirely inside your own
                        browser. They are never transmitted to us and never
                        stored on a server, and a downscaled preview is held only
                        in browser storage on your own device so that your cart
                        can show what you designed. Our{" "}
                        <Link href="/privacy-policy" className={LINK}>
                          privacy policy
                        </Link>{" "}
                        describes this in full.
                      </p>
                    </div>

                    <h3 className={H3}>What you confirm when you upload</h3>
                    <p className={`mt-4 ${BODY}`}>
                      By uploading a design and submitting a custom order, you
                      represent and warrant to us that:
                    </p>
                    <CheckList
                      items={[
                        "You own all rights in the design, or you hold express permission from the rights holder to use it in this way.",
                        "You grant Xpectra Media and our printing partners permission to reproduce and print that design on the items in your order, for the sole purpose of producing and delivering that order.",
                        "That permission is limited to fulfilling your order and ends when the order is complete, apart from any copy we must keep for a production or dispute record.",
                        "The design does not infringe anyone else's copyright, trademark, design right, privacy or publicity rights.",
                        "You have permission from any identifiable person shown in a photograph you upload, and from a parent or guardian where that person is a child.",
                        "The design complies with the prohibited content rules in the next section.",
                      ]}
                    />
                    <p className={`mt-5 ${BODY}`}>
                      You are responsible for that warranty. We do not verify
                      ownership of an uploaded image, and we cannot, so the
                      responsibility rests with the person who uploaded it. To
                      the fullest extent permitted by law, you agree to
                      indemnify Xpectra Media against any third party claim,
                      loss, damage or reasonable legal cost arising from a design
                      you supplied in breach of these warranties.
                    </p>
                    <p className={`mt-4 ${BODY}`}>
                      If you are a rights holder and believe a design printed
                      through this website infringes your rights, contact us
                      using the details below with a description of the work and
                      the order or design concerned, and we will investigate
                      promptly.
                    </p>
                  </section>
                </Reveal>

                {/* 13 */}
                <Reveal>
                  <section id="prohibited-content" className="scroll-mt-28">
                    <h2 className={H2}>13. Prohibited uploaded content</h2>
                    <p className={`mt-5 ${BODY}`}>
                      Some material cannot be printed, whatever the intended use.
                      You may not upload or ask us to print:
                    </p>
                    <CheckList
                      items={[
                        "Material that infringes copyright, including artwork, photographs, illustrations, characters, fonts or song lyrics you do not have the right to use.",
                        "Material that infringes a trademark, including copyrighted logos and trademarked logos belonging to another company, brand, sports team, school or organization, where you do not hold written authorization from the owner.",
                        "Counterfeit branding, or designs intended to make a garment look like the official product of a brand you are not authorized to represent.",
                        "Hateful or harassing content, including material that attacks or demeans a person or group on the basis of race, ethnicity, national origin, religion, sex, gender identity, sexual orientation, disability or age.",
                        "Threats of violence, incitement to violence, or content that glorifies or promotes violent extremism or terrorism.",
                        "Sexually explicit material, and any sexualized depiction of a minor, which we report rather than simply decline.",
                        "Content that is otherwise unlawful, including material that is defamatory, fraudulent, or that discloses another person's private information without consent.",
                      ]}
                    />

                    <h3 className={H3}>How we handle a suspected breach</h3>
                    <div className={`mt-4 space-y-4 ${BODY}`}>
                      <p>
                        Xpectra Media may decline or cancel any custom order that
                        appears to breach these terms. Where we do, the order is
                        refunded in full, and nothing further is owed by either
                        side.
                      </p>
                      <p>
                        We review designs at production rather than at upload,
                        since uploads never reach us in the first place, so an
                        order can be accepted at checkout and still be declined
                        afterwards on these grounds. Declining an order is a
                        judgment about whether we are willing to print something,
                        not a legal ruling, and it does not relieve you of the
                        warranty you gave in the previous section.
                      </p>
                      <p>
                        Repeated attempts to place orders that breach these rules
                        may lead us to decline future orders from the same
                        customer. Where content appears to involve a serious
                        crime, we will report it to the appropriate authorities.
                      </p>
                    </div>
                  </section>
                </Reveal>

                {/* 14 */}
                <Reveal>
                  <section id="intellectual-property" className="scroll-mt-28">
                    <h2 className={H2}>14. Intellectual property</h2>
                    <div className={`mt-5 space-y-4 ${BODY}`}>
                      <p>
                        Everything published on this website belongs to{" "}
                        {site.legalName} or to the partners who licensed it to
                        us. That includes the Xpectra Media name and logo, the
                        product photography, the written descriptions, the page
                        layouts, the graphics, the shirt mockups used in the
                        customization tool and the underlying code.
                      </p>
                      <p>
                        You are welcome to view the site, share a link to any
                        page, and print or save pages for your own personal use.
                        You may not copy our product photography or descriptions
                        into another store, resell our content, or use our brand
                        name and logo in a way that suggests we endorse or supply
                        you.
                      </p>
                      <p>
                        Artwork you upload is the clear exception to all of this.
                        It stays yours, as set out in the uploaded designs
                        section above, and nothing in this section gives us any
                        claim over it.
                      </p>
                      <p>
                        Brand names belonging to other companies that appear
                        anywhere on this site remain the property of their
                        respective owners.
                      </p>
                    </div>
                  </section>
                </Reveal>

                {/* 15 */}
                <Reveal>
                  <section id="limitation-of-liability" className="scroll-mt-28">
                    <h2 className={H2}>
                      15. Liability and website availability
                    </h2>
                    <div className={`mt-5 space-y-4 ${BODY}`}>
                      <p>
                        We take real care with the catalogue, but this website is
                        provided as it is. We do not warrant that every page will
                        always be available, that the site will be free of
                        errors, that the customization tool will work identically
                        in every browser, or that a stock figure will be correct
                        at the exact second you read it.
                      </p>
                      <p>
                        We may suspend, withdraw or change any part of the
                        website, including the shirt customization tool, without
                        notice and without liability. Because your cart, wishlist
                        and custom shirt previews are stored in your own browser
                        rather than on our servers, we are not responsible for
                        losing them if you clear your browser data, use a private
                        window or switch devices. Keep your own copy of any
                        artwork that matters to you.
                      </p>
                      <p>
                        To the fullest extent permitted by law, our total
                        liability for any claim connected to an order is limited
                        to the amount you paid for that order. We are not liable
                        for indirect or consequential losses such as lost time,
                        missed occasions, missed events or lost profits, which
                        includes a custom order that arrives after the event it
                        was intended for.
                      </p>
                      <p>
                        Nothing in these terms limits any right you have that
                        cannot be limited by law, including your rights in
                        respect of goods that are faulty, unsafe or not as
                        described. Those rights sit alongside our returns policy
                        rather than replacing it.
                      </p>
                    </div>
                  </section>
                </Reveal>

                {/* 16 */}
                <Reveal>
                  <section id="privacy" className="scroll-mt-28">
                    <h2 className={H2}>16. Privacy</h2>
                    <div className={`mt-5 space-y-4 ${BODY}`}>
                      <p>
                        We collect only the information needed to deliver your
                        order and answer your questions, we never sell it, and no
                        payment card information is collected on this website
                        because Cash on Delivery is the only active payment
                        method. Our{" "}
                        <Link href="/privacy-policy" className={LINK}>
                          privacy policy
                        </Link>{" "}
                        explains the full picture and forms part of these terms.
                      </p>
                      <p>
                        It is worth knowing that your shopping cart and your
                        wishlist are stored in your own browser using
                        localStorage rather than on our servers. They stay on the
                        device you built them on, they are never sent to us until
                        you submit an order, and you can clear them at any time
                        from your browser settings.
                      </p>
                      <p>
                        Images you upload to the customization tool are handled
                        entirely in your browser, are never transmitted to us and
                        are never stored on a server.
                      </p>
                    </div>
                  </section>
                </Reveal>

                {/* 17 */}
                <Reveal>
                  <section id="changes-to-terms" className="scroll-mt-28">
                    <h2 className={H2}>17. Changes and governing terms</h2>
                    <div className={`mt-5 space-y-4 ${BODY}`}>
                      <p>
                        We update these terms when the way we operate changes,
                        for example if we enable card payment, adjust a shipping
                        rate, change the return window or introduce customer
                        accounts. The revised version is published on this page
                        with a new last updated date at the top.
                      </p>
                      <p>
                        Any order already confirmed is governed by the terms that
                        were published when you placed it. Continuing to use the
                        website after a revision means you accept the current
                        version, so it is worth checking this page from time to
                        time.
                      </p>
                      <p>
                        These terms are governed by the laws of the State of
                        California and of the United States, and the courts of
                        California have jurisdiction over any dispute arising
                        from them. If any provision is found unenforceable, the
                        remaining provisions continue in full effect. These terms
                        and the documents they refer to are the entire agreement
                        between you and {site.legalName} in relation to your use
                        of this website.
                      </p>
                    </div>
                  </section>
                </Reveal>

                {/* 18 */}
                <Reveal>
                  <section id="contact-information" className="scroll-mt-28">
                    <h2 className={H2}>18. Contact information</h2>
                    <p className={`mt-5 ${BODY}`}>
                      If anything here is unclear, or you want to start a return,
                      change an order, ask about a custom design or raise a
                      complaint, contact us and a real member of our team will
                      reply.
                    </p>
                    <div className="mt-6 rounded-3xl border border-line bg-card p-6 shadow-[var(--shadow-soft)] sm:p-8">
                      <p className="font-display text-base font-bold text-ink">
                        {site.legalName}
                      </p>
                      <p className="mt-1 text-sm text-slate">
                        Attention: {site.contact.name}, Customer Support
                      </p>
                      <ul className={`mt-5 space-y-4 ${BODY}`}>
                        <li className="flex gap-3">
                          <Icon name="pin" size={18} className="mt-1 shrink-0 text-brand" />
                          <span>{site.contact.full}</span>
                        </li>
                        <li className="flex gap-3">
                          <Icon name="mail" size={18} className="mt-1 shrink-0 text-brand" />
                          <a href={site.contact.emailHref} className={LINK}>
                            {site.contact.email}
                          </a>
                        </li>
                        <li className="flex gap-3">
                          <Icon name="phone" size={18} className="mt-1 shrink-0 text-brand" />
                          <a href={site.contact.phoneHref} className={LINK}>
                            {site.contact.phone}
                          </a>
                        </li>
                        <li className="flex gap-3">
                          <Icon name="clock" size={18} className="mt-1 shrink-0 text-brand" />
                          <span>
                            {site.contact.hours
                              .map((slot) => `${slot.days}: ${slot.time}`)
                              .join(" | ")}
                          </span>
                        </li>
                      </ul>
                      <p className={`mt-6 ${BODY}`}>
                        For everyday questions, our support pages cover the{" "}
                        <Link href="/support/shopping-cart" className={LINK}>
                          shopping cart
                        </Link>
                        ,{" "}
                        <Link href="/support/secure-checkout" className={LINK}>
                          secure checkout
                        </Link>
                        ,{" "}
                        <Link href="/support/shipping-information" className={LINK}>
                          shipping information
                        </Link>
                        ,{" "}
                        <Link href="/support/easy-returns" className={LINK}>
                          easy returns
                        </Link>{" "}
                        and{" "}
                        <Link href="/support/shipping-and-returns" className={LINK}>
                          shipping and returns
                        </Link>
                        .
                      </p>
                      <p className={`mt-4 ${BODY}`}>
                        You may also want to read our{" "}
                        <Link href="/privacy-policy" className={LINK}>
                          privacy policy
                        </Link>{" "}
                        or visit the{" "}
                        <Link href="/contact" className={LINK}>
                          contact page
                        </Link>{" "}
                        for frequently asked questions.
                      </p>
                    </div>
                  </section>
                </Reveal>
              </div>
            </article>
          </div>
        </div>
      </div>
    </>
  );
}
