import Link from "next/link";

import { Icon } from "@/components/ui/Icon";
import { PageBanner } from "@/components/ui/PageBanner";
import { Reveal } from "@/components/ui/Reveal";
import { buildMetadata } from "@/lib/seo";
import { DELIVERY_CHARGE, FREE_DELIVERY_THRESHOLD, site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Terms and Conditions",
  description:
    "The terms and conditions for shopping at Xpectra Media, covering website usage, product information, pricing, order acceptance, Cash on Delivery, shipping, exchanges, cancellations and liability.",
  path: "/terms-and-conditions",
  keywords: [
    "Xpectra Media terms and conditions",
    "online shopping terms Pakistan",
    "Cash on Delivery terms",
    "exchange and return policy Pakistan",
  ],
});

const LAST_UPDATED = "19 July 2026";

const FREE_DELIVERY = FREE_DELIVERY_THRESHOLD.toLocaleString("en-PK");

/** Section anchors rendered in the sticky table of contents. */
const sections = [
  { id: "website-usage", label: "Website usage" },
  { id: "product-information", label: "Product information" },
  { id: "pricing", label: "Pricing" },
  { id: "order-acceptance", label: "Order acceptance" },
  { id: "cash-on-delivery", label: "Cash on Delivery" },
  { id: "shipping", label: "Shipping and delivery" },
  { id: "returns-and-exchanges", label: "Returns and exchanges" },
  { id: "cancellations", label: "Cancellations" },
  { id: "intellectual-property", label: "Intellectual property" },
  { id: "limitation-of-liability", label: "Limitation of liability" },
  { id: "privacy", label: "Privacy" },
  { id: "changes-to-terms", label: "Changes to these terms" },
  { id: "contact-information", label: "Contact information" },
];

export default function TermsAndConditionsPage() {
  return (
    <>
      <PageBanner
        eyebrow="Legal"
        title="Terms and Conditions"
        description="These terms describe how ordering from Xpectra Media works: what we promise, what we ask of you, and how pricing, delivery, exchanges and cancellations are handled."
        crumbs={[{ name: "Terms and Conditions", href: "/terms-and-conditions" }]}
      />

      <div className="shell py-14 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-16">
          {/* Table of contents */}
          <aside className="hidden lg:block" aria-labelledby="toc-heading">
            <nav className="sticky top-28 rounded-2xl border border-line-soft bg-surface p-6">
              <h2
                id="toc-heading"
                className="font-display text-sm font-bold uppercase tracking-[0.2em] text-white"
              >
                On this page
              </h2>
              <ol className="mt-5 space-y-3 text-sm">
                {sections.map((section, index) => (
                  <li key={section.id}>
                    <Link
                      href={`#${section.id}`}
                      className="flex gap-3 leading-relaxed text-mist transition-colors hover:text-brand-bright"
                    >
                      <span className="font-display text-xs font-bold text-mist-dim">
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
              <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-line-soft bg-surface px-6 py-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-surface-2 text-brand">
                  <Icon name="shield" size={22} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">
                    Last updated: {LAST_UPDATED}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-mist">
                    Applies to {site.url} and every order placed through it.
                  </p>
                </div>
              </div>
            </Reveal>

            <div className="mt-10 space-y-12">
              <Reveal>
                <p className="text-base leading-relaxed text-mist">
                  These terms form the agreement between you and {site.legalName},
                  an online store based in {site.contact.city},{" "}
                  {site.contact.country}, selling clothing and toys for delivery
                  across Pakistan. By browsing this website or placing an order you
                  accept the terms set out below. They are written to be read, so
                  please do read them before you order.
                </p>
              </Reveal>

              {/* 1 */}
              <Reveal>
                <section id="website-usage" className="scroll-mt-28">
                  <h2 className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
                    1. Website usage
                  </h2>
                  <div className="mt-5 space-y-4 text-base leading-relaxed text-mist">
                    <p>
                      You are welcome to browse, search, filter and share our
                      catalogue freely. You may place orders if you are able to enter
                      into a binding agreement under Pakistani law, or if you are
                      doing so with the involvement of a parent or guardian.
                    </p>
                    <p>
                      When you use this website you agree to provide accurate details
                      at checkout, particularly your phone number and delivery
                      address, since a Cash on Delivery order cannot be completed
                      without them. You also agree not to:
                    </p>
                  </div>
                  <ul className="mt-4 space-y-3 text-base leading-relaxed text-mist">
                    {[
                      "Place orders using false names, unreachable numbers or addresses that do not exist.",
                      "Attempt to disrupt, overload, scrape at scale or gain unauthorised access to the website or its systems.",
                      "Copy our product photography, descriptions or page layouts for use on another store.",
                      "Use the website for any unlawful purpose or in a way that harms other customers.",
                    ].map((item) => (
                      <li key={item} className="flex gap-3">
                        <Icon name="check" size={18} className="mt-1 shrink-0 text-brand" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 text-base leading-relaxed text-mist">
                    We may decline to serve a customer who repeatedly places orders
                    that are then refused at the door, since every such parcel costs
                    us the round trip courier charge.
                  </p>
                </section>
              </Reveal>

              {/* 2 */}
              <Reveal>
                <section id="product-information" className="scroll-mt-28">
                  <h2 className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
                    2. Product information
                  </h2>
                  <div className="mt-5 space-y-4 text-base leading-relaxed text-mist">
                    <p>
                      We describe fabric, fit, finishing and measurements as
                      accurately as we can, and we photograph products to show their
                      real colour. Even so, screens differ, and a shade of blue on one
                      phone will not look identical on another. A small variation in
                      colour between the photograph and the garment in your hands is
                      normal and is not a defect.
                    </p>
                    <p>
                      Sizes follow the guide shown on each product page. Adult
                      clothing uses standard Small, Medium, Large and Extra Large
                      sizing, kids clothing is listed by age range and baby clothing
                      is listed by months. Hand finished pieces such as embroidered
                      kurta shalwar sets may vary very slightly from one unit to the
                      next, which is a feature of the craft rather than a fault.
                    </p>
                    <p>
                      Stock levels shown on the site are kept as current as possible.
                      If an item sells out between your order and our confirmation
                      call, we will tell you immediately and offer a replacement,
                      a different size or colour, or the removal of that line from the
                      order.
                    </p>
                    <p>
                      Toys carry age guidance in their descriptions. Please follow it,
                      and supervise young children at play regardless of the guidance
                      shown.
                    </p>
                  </div>
                </section>
              </Reveal>

              {/* 3 */}
              <Reveal>
                <section id="pricing" className="scroll-mt-28">
                  <h2 className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
                    3. Pricing
                  </h2>
                  <div className="mt-5 space-y-4 text-base leading-relaxed text-mist">
                    <p>
                      All prices on this website are shown in Pakistani Rupees and
                      include any applicable taxes. The price you see on the product
                      card is the price of the item. Delivery, where it applies, is
                      shown separately in the cart and again at checkout, so the total
                      is clear before you confirm anything.
                    </p>
                    <p>
                      Where an item shows a discount, the higher figure is the
                      original price of that item at Xpectra Media and the lower
                      figure is what you pay today. Promotional prices apply for the
                      period stated and may end without notice, but a price will never
                      change after your order has been confirmed.
                    </p>
                    <p>
                      Prices may be revised as fabric and supply costs move. We make
                      every effort to keep listings correct, but if an obvious pricing
                      error appears, for example a decimal point in the wrong place, we
                      reserve the right to cancel the affected order rather than
                      fulfil it at the mistaken price. In that case we will contact
                      you first and you will owe us nothing.
                    </p>
                  </div>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-line-soft bg-surface p-5">
                      <p className="font-display text-2xl font-bold text-white">
                        PKR {DELIVERY_CHARGE}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-mist">
                        Flat delivery charge on orders below PKR {FREE_DELIVERY}.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-line-soft bg-surface p-5">
                      <p className="font-display text-2xl font-bold text-white">
                        PKR {FREE_DELIVERY}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-mist">
                        Order subtotal at which delivery becomes free anywhere in
                        Pakistan.
                      </p>
                    </div>
                  </div>
                </section>
              </Reveal>

              {/* 4 */}
              <Reveal>
                <section id="order-acceptance" className="scroll-mt-28">
                  <h2 className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
                    4. Order acceptance
                  </h2>
                  <div className="mt-5 space-y-4 text-base leading-relaxed text-mist">
                    <p>
                      Submitting the checkout form places an offer to buy. It does not
                      by itself create a contract. Your order is accepted only once we
                      have confirmed it with you, normally by a phone call or a
                      WhatsApp message on the number you provided, and confirmation is
                      a standard part of Cash on Delivery.
                    </p>
                    <p>
                      If we cannot reach you on the numbers provided after reasonable
                      attempts, the order may be held or cancelled so that stock is not
                      reserved indefinitely. We may also decline an order where the
                      item is out of stock, where the delivery address falls outside
                      our courier network, where a pricing error has occurred, or where
                      the order appears to be fraudulent.
                    </p>
                    <p>
                      Once confirmed, the order number issued to you is the reference
                      for every subsequent conversation about that purchase, so please
                      keep it.
                    </p>
                  </div>
                </section>
              </Reveal>

              {/* 5 */}
              <Reveal>
                <section id="cash-on-delivery" className="scroll-mt-28">
                  <h2 className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
                    5. Cash on Delivery
                  </h2>
                  <div className="mt-5 space-y-4 text-base leading-relaxed text-mist">
                    <p>
                      Cash on Delivery is the only payment method we accept. There is
                      no advance payment, no card entry and no online transfer at any
                      point. You pay the courier in cash when the parcel is handed to
                      you at your door, and the courier issues the receipt for that
                      payment.
                    </p>
                    <p>
                      Please have the exact total ready where possible, since couriers
                      do not always carry change. The amount due is the order total
                      shown on your confirmation, which is the subtotal plus the
                      delivery charge where one applies.
                    </p>
                    <p>
                      Xpectra Media will never ask you to send money to a personal
                      bank account or a mobile wallet before delivery. If anybody
                      contacts you claiming to be from Xpectra Media and requests an
                      advance transfer, it is not us. Please report it to our support
                      team.
                    </p>
                    <p>
                      Repeatedly refusing to accept and pay for confirmed orders may
                      result in future orders from the same number or address requiring
                      additional confirmation before dispatch.
                    </p>
                  </div>
                </section>
              </Reveal>

              {/* 6 */}
              <Reveal>
                <section id="shipping" className="scroll-mt-28">
                  <h2 className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
                    6. Shipping and delivery
                  </h2>
                  <div className="mt-5 space-y-4 text-base leading-relaxed text-mist">
                    <p>
                      We deliver throughout Pakistan. Orders are processed and
                      dispatched within one working day of confirmation. Delivery
                      itself usually takes two to three working days for major cities
                      such as Lahore, Karachi, Islamabad, Rawalpindi, Faisalabad and
                      Multan, and three to five working days for other locations, so
                      most orders arrive within two to five working days overall.
                    </p>
                    <p>
                      Delivery is charged at a flat PKR {DELIVERY_CHARGE} on orders
                      below PKR {FREE_DELIVERY}, and is completely free once your
                      order subtotal reaches PKR {FREE_DELIVERY} or more, anywhere in
                      the country.
                    </p>
                    <p>
                      Once your parcel is dispatched we send a tracking reference by
                      SMS to the phone number given at checkout. You can also message
                      us with your order number and we will check the current status
                      for you.
                    </p>
                    <p>
                      Delivery timelines are estimates in good faith and not
                      guarantees. Public holidays, weather, strikes and courier
                      backlogs during Eid and sale periods can add a day or two. Where
                      a courier is unable to reach an address after several attempts,
                      the parcel is returned to us and we will contact you to arrange
                      a fresh attempt.
                    </p>
                  </div>
                </section>
              </Reveal>

              {/* 7 */}
              <Reveal>
                <section id="returns-and-exchanges" className="scroll-mt-28">
                  <h2 className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
                    7. Returns and exchanges
                  </h2>
                  <div className="mt-5 space-y-4 text-base leading-relaxed text-mist">
                    <p>
                      You may request an exchange within seven days of receiving your
                      order. To be eligible the item must be unused, unwashed, free
                      from any marks or odours, and still carrying its original tags
                      and packaging.
                    </p>
                    <p>
                      To start an exchange, contact us on WhatsApp or by email with
                      your order number and tell us what you would like instead,
                      whether that is a different size, a different colour or another
                      item of equal value. Our team will confirm availability and
                      arrange the collection and the replacement.
                    </p>
                  </div>
                  <h3 className="mt-7 font-display text-base font-bold text-white">
                    Items we cannot exchange
                  </h3>
                  <ul className="mt-4 space-y-3 text-base leading-relaxed text-mist">
                    {[
                      "Items that have been worn, washed, altered or damaged after delivery.",
                      "Items returned without their original tags or packaging.",
                      "Innerwear and any item where hygiene prevents resale.",
                      "Requests raised more than seven days after the parcel was delivered.",
                    ].map((item) => (
                      <li key={item} className="flex gap-3">
                        <Icon name="close" size={18} className="mt-1 shrink-0 text-brand" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 text-base leading-relaxed text-mist">
                    If an item reaches you damaged, defective or simply not the product
                    you ordered, that is our error. Tell us within seven days, send a
                    photograph if you can, and we will collect the item at our cost and
                    replace it. Where a replacement is unavailable, the amount you paid
                    for that item is refunded to you.
                  </p>
                </section>
              </Reveal>

              {/* 8 */}
              <Reveal>
                <section id="cancellations" className="scroll-mt-28">
                  <h2 className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
                    8. Cancellations
                  </h2>
                  <div className="mt-5 space-y-4 text-base leading-relaxed text-mist">
                    <p>
                      You may cancel or change your order at any time before it is
                      handed to the courier, at no cost whatsoever. Contact us with
                      your order number as soon as you decide and our team will update
                      or cancel it for you. Because we dispatch quickly, the sooner you
                      tell us the more certain the change is.
                    </p>
                    <p>
                      Once a parcel has left our facility it can no longer be
                      cancelled in transit. At that point you can either accept the
                      parcel and raise an exchange within the seven day window, or
                      decline it at the door, in which case nothing is paid because
                      payment is only collected on delivery.
                    </p>
                    <p>
                      We may cancel an order ourselves if an item turns out to be
                      unavailable, if a listing carried an obvious pricing error, if
                      the delivery address cannot be served, or if we are unable to
                      reach you to confirm the order. You will not owe us anything in
                      any of these situations.
                    </p>
                  </div>
                </section>
              </Reveal>

              {/* 9 */}
              <Reveal>
                <section id="intellectual-property" className="scroll-mt-28">
                  <h2 className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
                    9. Intellectual property
                  </h2>
                  <div className="mt-5 space-y-4 text-base leading-relaxed text-mist">
                    <p>
                      The {site.name} name, logo, wordmark, product photography,
                      written descriptions, page designs, illustrations and the
                      arrangement of this website are owned by {site.legalName} or
                      used with permission. They are protected by copyright and
                      trademark law.
                    </p>
                    <p>
                      You may view, download and print pages for your own personal use
                      in connection with shopping here, and you are welcome to share
                      links to our pages. You may not copy our photography or
                      descriptions onto another store, resell our content, use our
                      brand name in a way that suggests a partnership we do not have,
                      or remove any copyright notice.
                    </p>
                    <p>
                      If you believe something on this website infringes your own
                      rights, write to us at {site.contact.email} with the details and
                      we will look into it promptly.
                    </p>
                  </div>
                </section>
              </Reveal>

              {/* 10 */}
              <Reveal>
                <section id="limitation-of-liability" className="scroll-mt-28">
                  <h2 className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
                    10. Limitation of liability
                  </h2>
                  <div className="mt-5 space-y-4 text-base leading-relaxed text-mist">
                    <p>
                      We stand behind what we sell. Our responsibility for any order is
                      limited to the value of that order, meaning the amount you
                      actually paid for the items concerned plus any delivery charge
                      applied to them.
                    </p>
                    <p>
                      We are not liable for indirect or consequential losses, such as
                      an outfit not arriving in time for a particular event where the
                      delay was caused by circumstances outside our reasonable control,
                      including courier disruption, weather, strikes or public
                      holidays.
                    </p>
                    <p>
                      We are also not responsible for damage caused by use of a product
                      contrary to its care instructions or its stated age guidance.
                      Please follow the care instructions on each product page, and
                      supervise children with toys.
                    </p>
                    <p>
                      Nothing in these terms limits any right you hold under the
                      consumer protection laws of Pakistan. Where a term here conflicts
                      with a right the law gives you, the law prevails. These terms are
                      governed by Pakistani law and any dispute falls to the courts of{" "}
                      {site.contact.city}.
                    </p>
                  </div>
                </section>
              </Reveal>

              {/* 11 */}
              <Reveal>
                <section id="privacy" className="scroll-mt-28">
                  <h2 className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
                    11. Privacy
                  </h2>
                  <div className="mt-5 space-y-4 text-base leading-relaxed text-mist">
                    <p>
                      The personal details you give us at checkout are used to confirm,
                      pack and deliver your order and to answer your questions about
                      it. Because we accept Cash on Delivery only, we never ask for and
                      never receive card numbers or bank credentials.
                    </p>
                    <p>
                      Your shopping cart, your recently viewed products and your last
                      order summary are stored in your own browser using localStorage
                      rather than on our servers, which is why your cart survives a
                      closed tab but does not follow you to another device.
                    </p>
                    <p>
                      Full detail on what we collect, how long we keep it and how to
                      ask for its removal is set out in our{" "}
                      <Link
                        href="/privacy-policy"
                        className="font-semibold text-brand transition-colors hover:text-brand-bright"
                      >
                        privacy policy
                      </Link>
                      , which forms part of these terms.
                    </p>
                  </div>
                </section>
              </Reveal>

              {/* 12 */}
              <Reveal>
                <section id="changes-to-terms" className="scroll-mt-28">
                  <h2 className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
                    12. Changes to these terms
                  </h2>
                  <div className="mt-5 space-y-4 text-base leading-relaxed text-mist">
                    <p>
                      We may revise these terms as the store changes, for example if we
                      add a payment method, adjust the delivery charge or extend the
                      exchange window. The current version always lives on this page
                      and carries the last updated date shown at the top.
                    </p>
                    <p>
                      Revisions apply to orders placed after they are published. An
                      order already confirmed continues under the terms that were in
                      force when you placed it, so a later change can never alter the
                      price, delivery charge or exchange window of a purchase you have
                      already made.
                    </p>
                  </div>
                </section>
              </Reveal>

              {/* 13 */}
              <Reveal>
                <section id="contact-information" className="scroll-mt-28">
                  <h2 className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
                    13. Contact information
                  </h2>
                  <p className="mt-5 text-base leading-relaxed text-mist">
                    Questions about these terms, an order, an exchange or a
                    cancellation are all welcome. The fastest route is WhatsApp, and
                    email is best when you need to send photographs.
                  </p>
                  <div className="mt-6 rounded-2xl border border-line-soft bg-surface p-6 sm:p-8">
                    <p className="font-display text-base font-bold text-white">
                      {site.legalName}
                    </p>
                    <ul className="mt-5 space-y-4 text-base leading-relaxed text-mist">
                      <li className="flex gap-3">
                        <Icon name="pin" size={18} className="mt-1 shrink-0 text-brand" />
                        <span>
                          {site.contact.addressLine}, {site.contact.city},{" "}
                          {site.contact.region} {site.contact.postalCode},{" "}
                          {site.contact.country}
                        </span>
                      </li>
                      <li className="flex gap-3">
                        <Icon
                          name="whatsapp"
                          size={18}
                          className="mt-1 shrink-0 text-brand"
                        />
                        <a
                          href={site.contact.whatsappHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-brand transition-colors hover:text-brand-bright"
                        >
                          WhatsApp {site.contact.whatsapp}
                        </a>
                      </li>
                      <li className="flex gap-3">
                        <Icon name="mail" size={18} className="mt-1 shrink-0 text-brand" />
                        <a
                          href={site.contact.emailHref}
                          className="font-semibold text-brand transition-colors hover:text-brand-bright"
                        >
                          {site.contact.email}
                        </a>
                      </li>
                      <li className="flex gap-3">
                        <Icon name="phone" size={18} className="mt-1 shrink-0 text-brand" />
                        <a
                          href={site.contact.phoneHref}
                          className="font-semibold text-brand transition-colors hover:text-brand-bright"
                        >
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
                    <p className="mt-6 text-base leading-relaxed text-mist">
                      You can also read the{" "}
                      <Link
                        href="/contact"
                        className="font-semibold text-brand transition-colors hover:text-brand-bright"
                      >
                        frequently asked questions on our contact page
                      </Link>{" "}
                      or start shopping from the{" "}
                      <Link
                        href="/products"
                        className="font-semibold text-brand transition-colors hover:text-brand-bright"
                      >
                        full product catalogue
                      </Link>
                      .
                    </p>
                  </div>
                </section>
              </Reveal>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
