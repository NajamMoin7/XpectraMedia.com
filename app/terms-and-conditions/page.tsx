import Link from "next/link";

import { Icon } from "@/components/ui/Icon";
import { PageBanner } from "@/components/ui/PageBanner";
import { Reveal } from "@/components/ui/Reveal";
import { buildMetadata } from "@/lib/seo";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_RATE, site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Terms and Conditions",
  description:
    "The terms that apply when you shop at Xpectra Media, covering website usage, product information, pricing, order acceptance, Cash on Delivery, shipping, 30 day returns, cancellations and liability.",
  path: "/terms-and-conditions",
  keywords: [
    "Xpectra Media terms and conditions",
    "online clothing store terms",
    "ecommerce terms of service",
    "shipping and returns policy",
  ],
});

const LAST_UPDATED = "July 20, 2026";

/** Section anchors rendered in the sticky table of contents. */
const sections = [
  { id: "website-usage", label: "Website usage" },
  { id: "product-information", label: "Product information" },
  { id: "pricing", label: "Pricing" },
  { id: "order-acceptance", label: "Order acceptance" },
  { id: "cash-on-delivery", label: "Cash on Delivery" },
  { id: "shipping", label: "Shipping" },
  { id: "returns-and-exchanges", label: "Returns and exchanges" },
  { id: "cancellations", label: "Cancellations" },
  { id: "intellectual-property", label: "Intellectual property" },
  { id: "limitation-of-liability", label: "Limitation of liability" },
  { id: "privacy", label: "Privacy" },
  { id: "changes-to-terms", label: "Changes to these terms" },
  { id: "contact-information", label: "Contact information" },
];

const H2 = "font-display text-xl font-bold tracking-tight text-ink sm:text-2xl";
const H3 = "mt-7 font-display text-base font-bold text-ink";
const BODY = "text-base leading-relaxed text-slate";
const LINK =
  "font-semibold text-brand underline-offset-4 transition-colors hover:text-brand-deep hover:underline";

export default function TermsAndConditionsPage() {
  return (
    <>
      <PageBanner
        eyebrow="Legal"
        title="Terms and Conditions"
        description="These terms set out how our online clothing store works: what we promise, what we ask of you, and exactly how orders, shipping, returns and cancellations are handled."
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
                    items to your cart or placing an order, you agree to the terms
                    below. They form the agreement between you and{" "}
                    {site.legalName}, a United States business selling everyday
                    clothing, baby clothes and toys online. We have written them to
                    be read rather than skimmed past, so they are in plain language
                    and they describe only what this store actually does.
                  </p>
                </Reveal>

                {/* 1 */}
                <Reveal>
                  <section id="website-usage" className="scroll-mt-28">
                    <h2 className={H2}>1. Website usage</h2>
                    <div className={`mt-5 space-y-4 ${BODY}`}>
                      <p>
                        You may browse, search, filter and read every page of this
                        website freely, and you may place orders as long as you are
                        at least 18 years old, or have the permission of a parent
                        or guardian who accepts these terms on your behalf.
                      </p>
                      <p>
                        You agree to give accurate information at checkout,
                        particularly your name, phone number and shipping address,
                        because an order that cannot be delivered helps nobody. You
                        also agree not to interfere with the website, attempt to
                        access parts of it that are not published, scrape the
                        catalogue at scale, or place orders you have no intention
                        of accepting.
                      </p>
                      <p>
                        We may decline to serve a customer where we see repeated
                        abuse, such as orders that are consistently refused at the
                        door under different names. We would much rather never have
                        to.
                      </p>
                    </div>
                  </section>
                </Reveal>

                {/* 2 */}
                <Reveal>
                  <section id="product-information" className="scroll-mt-28">
                    <h2 className={H2}>2. Product information</h2>
                    <div className={`mt-5 space-y-4 ${BODY}`}>
                      <p>
                        We describe every product as accurately as we can. Fabric
                        composition, fit, available sizes and colors, care
                        instructions and the measurements on the size guide are all
                        taken from the actual item rather than copied from a
                        supplier sheet. If a shirt runs slim or a knit is a heavy
                        weight, we say so on the product page.
                      </p>
                      <p>
                        Colors can still vary slightly between screens. A monitor,
                        a phone and a tablet will each render the same photograph a
                        little differently, so a small difference in shade between
                        the image and the item you receive is not a fault. If the
                        difference is more than small, that is covered by our
                        returns policy below.
                      </p>
                      <p>
                        Stock levels are updated as orders come in, but on a busy
                        day an item can sell out between the moment you add it to
                        your cart and the moment you check out. If that happens we
                        contact you before dispatch and offer an alternative, a
                        partial shipment or a full cancellation.
                      </p>
                      <p>
                        Toys carry age guidance on the product page. Please follow
                        it, keep packaging away from small children, and supervise
                        play with any item that includes small components.
                      </p>
                    </div>
                  </section>
                </Reveal>

                {/* 3 */}
                <Reveal>
                  <section id="pricing" className="scroll-mt-28">
                    <h2 className={H2}>3. Pricing</h2>
                    <div className={`mt-5 space-y-4 ${BODY}`}>
                      <p>
                        All prices on this website are shown in United States
                        dollars. The price displayed on the product card and the
                        product page is the price you pay for that item. Where a
                        product shows a struck through regular price, that is the
                        price the item sold at before the current promotion.
                      </p>
                      <p>
                        Your cart shows the subtotal, the shipping charge and the
                        order total before you confirm anything. Sales tax, where
                        it applies to your delivery address, is shown separately at
                        checkout so the amount the courier collects is never a
                        surprise.
                      </p>
                      <p>
                        We may change prices, add products or end a promotion at
                        any time. A change never applies to an order we have
                        already confirmed. If a product is listed at an obviously
                        incorrect price because of a technical or human error, we
                        will contact you before dispatch and you may either confirm
                        the order at the correct price or cancel it at no cost.
                      </p>
                    </div>
                  </section>
                </Reveal>

                {/* 4 */}
                <Reveal>
                  <section id="order-acceptance" className="scroll-mt-28">
                    <h2 className={H2}>4. Order acceptance</h2>
                    <div className={`mt-5 space-y-4 ${BODY}`}>
                      <p>
                        Placing an order on this website is an offer to buy, not a
                        completed contract. The contract forms when we confirm your
                        order and dispatch it, which allows us to check stock and
                        confirm your delivery details first.
                      </p>
                      <p>
                        After you check out you will see an order confirmation with
                        your order number, and a copy is stored in your browser so
                        the confirmation page still works if you refresh it. Our
                        team then confirms the order with you by phone or email,
                        which is a normal step for Cash on Delivery.
                      </p>
                      <p>
                        We may decline an order where an item is out of stock,
                        where the shipping address falls outside the areas our
                        partners serve, where the contact details cannot be
                        verified, or where the order appears fraudulent. If we
                        decline, we tell you why and nothing is owed by either
                        side.
                      </p>
                    </div>
                  </section>
                </Reveal>

                {/* 5 */}
                <Reveal>
                  <section id="cash-on-delivery" className="scroll-mt-28">
                    <h2 className={H2}>5. Cash on Delivery</h2>
                    <div className={`mt-5 space-y-4 ${BODY}`}>
                      <p>
                        Cash on Delivery is currently the only payment method we
                        offer. There is no payment gateway on this website, no
                        advance payment is required, and we never ask for card
                        numbers, bank details or digital wallet credentials at any
                        stage.
                      </p>
                      <p>
                        You pay the full order total in cash to the courier at the
                        moment your parcel is handed over. Please have the exact
                        amount ready where possible, since couriers do not always
                        carry change. The courier issues the receipt for that cash
                        at the time of handover.
                      </p>
                    </div>
                    <h3 className={H3}>What this means in practice</h3>
                    <ul className={`mt-4 space-y-3 ${BODY}`}>
                      {[
                        "Nobody from Xpectra Media will ever call you to request an advance transfer. If someone does, it is not us.",
                        "You may inspect the outside of the parcel and confirm the order number before paying.",
                        "If you refuse a parcel at the door, the order is treated as canceled and the item returns to us.",
                        "Repeatedly refusing delivered orders may mean we ask for confirmation before accepting future orders.",
                      ].map((item) => (
                        <li key={item} className="flex gap-3">
                          <Icon name="check" size={18} className="mt-1 shrink-0 text-brand" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                </Reveal>

                {/* 6 */}
                <Reveal>
                  <section id="shipping" className="scroll-mt-28">
                    <h2 className={H2}>6. Shipping</h2>
                    <div className={`mt-5 space-y-4 ${BODY}`}>
                      <p>
                        We ship anywhere in the United States. Standard shipping is
                        a flat ${SHIPPING_RATE.toFixed(2)} per order and becomes
                        free once your subtotal reaches ${FREE_SHIPPING_THRESHOLD}.
                        Express delivery is available at checkout for an additional
                        charge shown before you confirm.
                      </p>
                      <p>
                        Orders are processed within one business day. Standard
                        delivery then takes three to seven business days depending
                        on your address. Once your parcel ships we send a tracking
                        link to the email address you gave at checkout.
                      </p>
                      <p>
                        Delivery timeframes are estimates rather than guarantees.
                        Weather, carrier backlogs and holiday periods can add a day
                        or two, and we will keep you informed if your parcel is
                        running behind. If a parcel is lost in transit we will
                        replace it or cancel the order at no cost to you.
                      </p>
                      <p>
                        Please make sure somebody is available at the delivery
                        address to receive the parcel and pay the courier. If two
                        delivery attempts fail, the parcel returns to us and the
                        order is canceled.
                      </p>
                    </div>
                  </section>
                </Reveal>

                {/* 7 */}
                <Reveal>
                  <section id="returns-and-exchanges" className="scroll-mt-28">
                    <h2 className={H2}>7. Returns and exchanges</h2>
                    <div className={`mt-5 space-y-4 ${BODY}`}>
                      <p>
                        You may return any item within 30 days of delivery. Return
                        shipping is free on your first return per order. To be
                        accepted, the item must be unworn, unwashed, free of odors
                        and marks, and still carry its original tags and packaging.
                      </p>
                      <p>
                        Exchanges work the same way. Tell us the size or color you
                        would prefer, send the original item back, and we ship the
                        replacement as soon as the return reaches us. If the
                        replacement costs more, the difference is collected on
                        delivery.
                      </p>
                    </div>
                    <h3 className={H3}>How to start a return</h3>
                    <ul className={`mt-4 space-y-3 ${BODY}`}>
                      {[
                        "Email us at the address below with your order number and the item you want to return.",
                        "Tell us whether you would like a replacement or a refund of the amount you paid.",
                        "We send a return label and collection instructions within one business day.",
                        "Once the item arrives and passes inspection, the refund or replacement is processed within five business days.",
                      ].map((item) => (
                        <li key={item} className="flex gap-3">
                          <Icon name="check" size={18} className="mt-1 shrink-0 text-brand" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <p className={`mt-5 ${BODY}`}>
                      For hygiene reasons, baby sleepwear that has been opened and
                      any item marked as a final sale cannot be returned unless it
                      arrived faulty. If something arrives damaged or incorrect,
                      contact us within 48 hours with a photograph and we will
                      resolve it at our cost, including return shipping.
                    </p>
                  </section>
                </Reveal>

                {/* 8 */}
                <Reveal>
                  <section id="cancellations" className="scroll-mt-28">
                    <h2 className={H2}>8. Cancellations</h2>
                    <div className={`mt-5 space-y-4 ${BODY}`}>
                      <p>
                        You can cancel or change an order at no cost at any point
                        before it ships. Contact us with your order number as soon
                        as you can and our team will update or cancel it right
                        away. Because Cash on Delivery means no money has changed
                        hands yet, there is nothing to refund.
                      </p>
                      <p>
                        Once a parcel has been handed to the courier we can no
                        longer stop it. At that point you may either refuse the
                        delivery at the door or accept it and start a return under
                        the 30 day policy above, whichever is easier for you.
                      </p>
                      <p>
                        We may cancel an order ourselves if an item turns out to be
                        unavailable, if the delivery address falls outside our
                        service area, or if we cannot reach you to confirm the
                        order after several attempts. In every case we tell you
                        what happened.
                      </p>
                    </div>
                  </section>
                </Reveal>

                {/* 9 */}
                <Reveal>
                  <section id="intellectual-property" className="scroll-mt-28">
                    <h2 className={H2}>9. Intellectual property</h2>
                    <div className={`mt-5 space-y-4 ${BODY}`}>
                      <p>
                        Everything published on this website belongs to{" "}
                        {site.legalName} or to the partners who licensed it to us.
                        That includes the Xpectra Media name and logo, the product
                        photography, the written descriptions, the page layouts,
                        the graphics and the underlying code.
                      </p>
                      <p>
                        You are welcome to view the site, share a link to any page,
                        and print or save pages for your own personal use. You may
                        not copy our product photography or descriptions into
                        another store, resell our content, or use our brand name
                        and logo in a way that suggests we endorse or supply you.
                      </p>
                      <p>
                        Brand names belonging to other companies that appear
                        anywhere on this site remain the property of their
                        respective owners.
                      </p>
                    </div>
                  </section>
                </Reveal>

                {/* 10 */}
                <Reveal>
                  <section id="limitation-of-liability" className="scroll-mt-28">
                    <h2 className={H2}>10. Limitation of liability</h2>
                    <div className={`mt-5 space-y-4 ${BODY}`}>
                      <p>
                        We take real care with the catalogue, but this website is
                        provided as it is. We do not warrant that every page will
                        always be available, that the site will be free of errors,
                        or that a stock figure will be correct at the exact second
                        you read it.
                      </p>
                      <p>
                        To the fullest extent permitted by law, our total liability
                        for any claim connected to an order is limited to the
                        amount you paid for that order. We are not liable for
                        indirect or consequential losses such as lost time, missed
                        occasions or lost profits.
                      </p>
                      <p>
                        Nothing in these terms limits any right you have that
                        cannot be limited by law, including your rights in respect
                        of goods that are faulty, unsafe or not as described. Those
                        rights sit alongside our returns policy rather than
                        replacing it.
                      </p>
                    </div>
                  </section>
                </Reveal>

                {/* 11 */}
                <Reveal>
                  <section id="privacy" className="scroll-mt-28">
                    <h2 className={H2}>11. Privacy</h2>
                    <div className={`mt-5 space-y-4 ${BODY}`}>
                      <p>
                        We collect only the information needed to deliver your
                        order and answer your questions, we never sell it, and we
                        never receive card or bank details because we only accept
                        Cash on Delivery. Our{" "}
                        <Link href="/privacy-policy" className={LINK}>
                          privacy policy
                        </Link>{" "}
                        explains the full picture and forms part of these terms.
                      </p>
                      <p>
                        It is worth knowing that your shopping cart and your
                        wishlist are stored in your own browser using localStorage
                        rather than on our servers. They stay on the device you
                        built them on, they are never sent to us until you submit
                        an order, and you can clear them at any time from your
                        browser settings.
                      </p>
                    </div>
                  </section>
                </Reveal>

                {/* 12 */}
                <Reveal>
                  <section id="changes-to-terms" className="scroll-mt-28">
                    <h2 className={H2}>12. Changes to these terms</h2>
                    <div className={`mt-5 space-y-4 ${BODY}`}>
                      <p>
                        We update these terms when the way we operate changes, for
                        example if we add a payment method, adjust the shipping
                        rate or introduce customer accounts. The revised version is
                        published on this page with a new last updated date at the
                        top.
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
                        California and of the United States.
                      </p>
                    </div>
                  </section>
                </Reveal>

                {/* 13 */}
                <Reveal>
                  <section id="contact-information" className="scroll-mt-28">
                    <h2 className={H2}>13. Contact information</h2>
                    <p className={`mt-5 ${BODY}`}>
                      If anything here is unclear, or you want to start a return,
                      change an order or raise a complaint, contact us and a real
                      member of our team will reply.
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
                        You may also want to read our{" "}
                        <Link href="/privacy-policy" className={LINK}>
                          privacy policy
                        </Link>{" "}
                        or visit the{" "}
                        <Link href="/contact" className={LINK}>
                          contact page
                        </Link>{" "}
                        for frequently asked questions about shipping and returns.
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
