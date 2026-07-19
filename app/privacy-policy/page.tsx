import Link from "next/link";

import { Icon } from "@/components/ui/Icon";
import { PageBanner } from "@/components/ui/PageBanner";
import { Reveal } from "@/components/ui/Reveal";
import { buildMetadata } from "@/lib/seo";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_RATE, site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "Read how Xpectra Media collects, uses and protects your personal information when you shop at our online clothing store, including order details, cookies, browser storage and your privacy rights.",
  path: "/privacy-policy",
  keywords: [
    "Xpectra Media privacy policy",
    "online clothing store privacy",
    "customer data protection",
    "ecommerce privacy policy",
  ],
});

const LAST_UPDATED = "July 20, 2026";

/** Section anchors rendered in the sticky table of contents. */
const sections = [
  { id: "information-collected", label: "Information we collect" },
  { id: "use-of-information", label: "How we use your information" },
  { id: "cookies", label: "Cookies and browser storage" },
  { id: "order-information", label: "Order information" },
  { id: "customer-data", label: "Customer data we keep" },
  { id: "data-protection", label: "How we protect your data" },
  { id: "third-party-services", label: "Third party services" },
  { id: "user-rights", label: "Your rights" },
  { id: "policy-updates", label: "Updates to this policy" },
  { id: "contact-information", label: "Contact information" },
];

const H2 =
  "font-display text-xl font-bold tracking-tight text-ink sm:text-2xl";
const H3 = "mt-7 font-display text-base font-bold text-ink";
const BODY = "text-base leading-relaxed text-slate";
const LINK =
  "font-semibold text-brand underline-offset-4 transition-colors hover:text-brand-deep hover:underline";

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageBanner
        eyebrow="Legal"
        title="Privacy Policy"
        description="This policy explains exactly what Xpectra Media collects when you browse and order, why we collect it, how long we keep it and what you can ask us to do with it."
        crumbs={[{ name: "Privacy Policy", href: "/privacy-policy" }]}
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

            {/* Policy body */}
            <article className="max-w-3xl">
              <Reveal>
                <div className="flex flex-wrap items-center gap-4 rounded-3xl border border-line bg-card px-6 py-5 shadow-[var(--shadow-soft)]">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-tint text-brand">
                    <Icon name="lock" size={22} />
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
                    Xpectra Media is an online clothing store operating in the
                    United States. We sell clothing and toys and we ship them
                    nationwide using Cash on Delivery. We are not a bank, we do
                    not run a loyalty program and we do not sell advertising, so
                    the amount of personal information we genuinely need is small.
                    This policy sets out that information in plain language rather
                    than in legal boilerplate, and it describes only what our
                    website actually does.
                  </p>
                </Reveal>

                {/* 1 */}
                <Reveal>
                  <section id="information-collected" className="scroll-mt-28">
                    <h2 className={H2}>1. Information we collect</h2>
                    <div className={`mt-5 space-y-4 ${BODY}`}>
                      <p>
                        You can browse our entire catalogue, use the search,
                        filter products and read every product page without giving
                        us any personal information at all. We only ask for
                        details at the point where they become necessary to
                        complete something you have asked us to do.
                      </p>
                      <p>The information we collect falls into three groups.</p>
                    </div>

                    <h3 className={H3}>Information you give us at checkout</h3>
                    <ul className={`mt-4 space-y-3 ${BODY}`}>
                      {[
                        "Your full name, so the courier knows who to hand the parcel to.",
                        "Your phone number and an optional alternate number, used to confirm the order and to resolve delivery problems.",
                        "Your email address, used to send the order confirmation and to answer questions about the order.",
                        "Your shipping address, including street address, apartment or suite, city, state and ZIP code.",
                        "Any note you choose to add to the order, for example delivery timing preferences.",
                      ].map((item) => (
                        <li key={item} className="flex gap-3">
                          <Icon name="check" size={18} className="mt-1 shrink-0 text-brand" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <h3 className={H3}>Information you give us when you contact us</h3>
                    <p className={`mt-4 ${BODY}`}>
                      When you write to us through the contact form, by email or
                      through the newsletter signup, we receive whatever you
                      choose to send: your name, the contact address you wrote
                      from, your message and any order number you quote.
                    </p>

                    <h3 className={H3}>Information collected automatically</h3>
                    <p className={`mt-4 ${BODY}`}>
                      Like nearly every website, our hosting provider records
                      standard technical request data such as the pages requested,
                      the date and time, the browser and device type, and the
                      network address the request came from. This is used to keep
                      the site running, to diagnose faults and to understand which
                      categories are popular. It is not used to build a profile of
                      you as an individual.
                    </p>
                    <p className={`mt-4 ${BODY}`}>
                      We do not knowingly collect information from children under
                      13. Product pages for kids clothing online, baby clothes
                      online and toys online are intended for parents and
                      guardians to shop from. If you believe a child has provided
                      us with personal information, contact us and we will delete
                      it.
                    </p>
                  </section>
                </Reveal>

                {/* 2 */}
                <Reveal>
                  <section id="use-of-information" className="scroll-mt-28">
                    <h2 className={H2}>2. How we use your information</h2>
                    <p className={`mt-5 ${BODY}`}>
                      We use what you give us for a short and specific list of
                      purposes:
                    </p>
                    <ul className={`mt-4 space-y-3 ${BODY}`}>
                      {[
                        "To confirm your order by phone or email before it is dispatched, which is a normal step for Cash on Delivery.",
                        "To pack the correct items and print the shipping label with your delivery address.",
                        "To send you the order confirmation and, once the parcel ships, a tracking link by email.",
                        "To answer your questions about sizing, stock, shipping status, returns and cancellations.",
                        "To arrange a return, an exchange or a cancellation when you request one.",
                        "To understand in aggregate which products and categories customers are interested in, so we can stock better.",
                        "To detect and prevent fraudulent or abusive orders, for example repeated refusals at the door under different names.",
                      ].map((item) => (
                        <li key={item} className="flex gap-3">
                          <Icon name="check" size={18} className="mt-1 shrink-0 text-brand" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <p className={`mt-5 ${BODY}`}>
                      We never sell, rent or trade your personal information. We
                      do not share it with advertisers or data brokers. We only
                      send marketing messages to people who have deliberately
                      subscribed to our newsletter, and every one of those
                      messages includes a way to stop receiving them.
                    </p>
                  </section>
                </Reveal>

                {/* 3 */}
                <Reveal>
                  <section id="cookies" className="scroll-mt-28">
                    <h2 className={H2}>3. Cookies and browser storage</h2>
                    <div className={`mt-5 space-y-4 ${BODY}`}>
                      <p>
                        Your shopping cart lives in your own browser, not on our
                        servers. Xpectra Media stores your cart contents, your
                        wishlist, your most recently placed order summary and your
                        recently viewed products in browser localStorage on your
                        device. That is what allows you to add a hoodie to your
                        cart, close the tab, come back the next day and still find
                        it waiting for you.
                      </p>
                      <p>
                        Because the cart and the wishlist sit in localStorage on
                        your own device, they are never transmitted to us until
                        you actually submit an order. If you clear your browser
                        storage, use a private browsing window or switch to a
                        different device, your saved cart and wishlist will not
                        follow you.
                      </p>
                      <p>
                        We use a small number of cookies and equivalent storage
                        entries that are strictly necessary for the site to
                        function, such as keeping the interface consistent as you
                        move between pages. We do not use advertising cookies and
                        we do not run cross site tracking pixels for advertising
                        networks.
                      </p>
                      <p>
                        You can block or delete cookies and clear localStorage at
                        any time from your browser settings. Doing so is entirely
                        your choice. The only effect is that your cart, wishlist
                        and recently viewed list will be emptied and you will need
                        to build your cart again.
                      </p>
                    </div>
                  </section>
                </Reveal>

                {/* 4 */}
                <Reveal>
                  <section id="order-information" className="scroll-mt-28">
                    <h2 className={H2}>4. Order information</h2>
                    <div className={`mt-5 space-y-4 ${BODY}`}>
                      <p>
                        Xpectra Media accepts Cash on Delivery only. This matters
                        for your privacy because it removes an entire category of
                        sensitive data from the process. We do not ask for and we
                        never receive card numbers, card expiration dates,
                        security codes, bank account numbers or digital wallet
                        credentials. There is no payment gateway on this website
                        and no advance payment is required at any stage.
                      </p>
                      <p>
                        When you place an order we record the items, sizes, colors
                        and quantities you selected, the subtotal, the shipping
                        charge and the total. Standard shipping is a flat $
                        {SHIPPING_RATE.toFixed(2)} on orders below $
                        {FREE_SHIPPING_THRESHOLD}, and is free at or above that
                        amount, with delivery in three to seven business days.
                        Payment is collected in cash by the courier at your door,
                        and any receipt for that cash is issued by the courier at
                        the time of handover.
                      </p>
                      <p>
                        Your order confirmation is also written to localStorage on
                        your device so that the confirmation page still works if
                        you refresh it. You can remove that copy at any time by
                        clearing your browser storage.
                      </p>
                    </div>
                  </section>
                </Reveal>

                {/* 5 */}
                <Reveal>
                  <section id="customer-data" className="scroll-mt-28">
                    <h2 className={H2}>5. Customer data we keep</h2>
                    <div className={`mt-5 space-y-4 ${BODY}`}>
                      <p>
                        We keep order records for as long as they are useful to
                        you and to us: to handle a return within the 30 day
                        window, to resolve a delivery dispute with a carrier, to
                        answer a question about something you bought months ago,
                        and to meet ordinary business record keeping obligations.
                      </p>
                      <p>
                        Access to customer records inside Xpectra Media is limited
                        to the people who need it to do their job, which in
                        practice means our order processing and customer support
                        team. Staff are not permitted to export customer contact
                        lists or to use a customer phone number for anything other
                        than that customer order.
                      </p>
                      <p>
                        Newsletter subscriptions are kept separately from order
                        records and are removed as soon as you unsubscribe.
                        Support conversations by email are retained only while
                        they remain relevant to an open or recent order.
                      </p>
                    </div>
                  </section>
                </Reveal>

                {/* 6 */}
                <Reveal>
                  <section id="data-protection" className="scroll-mt-28">
                    <h2 className={H2}>6. How we protect your data</h2>
                    <div className={`mt-5 space-y-4 ${BODY}`}>
                      <p>
                        The whole website is served over an encrypted HTTPS
                        connection, so information travelling between your browser
                        and our servers cannot be read in transit. Our checkout
                        asks for the minimum set of fields needed to deliver a
                        parcel and nothing beyond that.
                      </p>
                      <p>
                        Internally, customer records are held on access controlled
                        systems, accounts are protected by strong authentication,
                        and permissions are reviewed when someone joins or leaves
                        the team. Shipping partners receive only the name, address
                        and phone number printed on the label, along with the
                        amount to collect.
                      </p>
                      <p>
                        No system connected to the internet can promise perfect
                        security, and we will not pretend otherwise. What we do
                        promise is that we collect as little as possible in the
                        first place, that we keep it no longer than we need it,
                        and that if we ever become aware of a breach affecting
                        your information we will tell you about it promptly and
                        explain what happened.
                      </p>
                      <p>
                        You can help by keeping your order confirmation details
                        private and by being cautious with anyone who contacts you
                        claiming to be from Xpectra Media and asking for a bank
                        transfer. We will never ask you to transfer money in
                        advance, because we only accept cash paid to the courier
                        at delivery.
                      </p>
                    </div>
                  </section>
                </Reveal>

                {/* 7 */}
                <Reveal>
                  <section id="third-party-services" className="scroll-mt-28">
                    <h2 className={H2}>7. Third party services</h2>
                    <p className={`mt-5 ${BODY}`}>
                      A small number of outside services are involved in running
                      the store, and each one receives only the narrow slice of
                      information it needs:
                    </p>
                    <ul className={`mt-4 space-y-4 ${BODY}`}>
                      {[
                        {
                          title: "Shipping and logistics partners",
                          body: "Receive your name, shipping address, phone number and the cash amount to collect, purely so the parcel can reach you.",
                        },
                        {
                          title: "Website hosting and content delivery",
                          body: "Serve the pages and images you request and keep standard technical request logs on our behalf.",
                        },
                        {
                          title: "Email providers",
                          body: "Carry the order confirmations, tracking notifications and support emails exchanged between you and our team.",
                        },
                      ].map((item) => (
                        <li key={item.title} className="flex gap-3">
                          <Icon name="check" size={18} className="mt-1 shrink-0 text-brand" />
                          <span>
                            <span className="font-semibold text-ink">
                              {item.title}:
                            </span>{" "}
                            {item.body}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <p className={`mt-5 ${BODY}`}>
                      These providers are expected to handle your information only
                      for the task we engaged them for. Our social media profiles
                      are hosted on platforms with their own privacy policies, and
                      anything you post or send on those platforms is also
                      governed by their terms rather than by this policy.
                    </p>
                  </section>
                </Reveal>

                {/* 8 */}
                <Reveal>
                  <section id="user-rights" className="scroll-mt-28">
                    <h2 className={H2}>8. Your rights</h2>
                    <p className={`mt-5 ${BODY}`}>
                      Your information belongs to you. At any time you may ask us
                      to:
                    </p>
                    <ul className={`mt-4 space-y-3 ${BODY}`}>
                      {[
                        "Tell you what personal information we hold about you and where it came from.",
                        "Correct anything that is wrong, such as a misspelled name or an out of date address.",
                        "Delete your details from our records, subject to any order that is still in progress or any record we are required to keep.",
                        "Stop sending you newsletters or any other marketing message.",
                        "Provide a copy of your order history in a readable format.",
                        "Confirm that we have not sold or shared your personal information, which we never do.",
                      ].map((item) => (
                        <li key={item} className="flex gap-3">
                          <Icon name="check" size={18} className="mt-1 shrink-0 text-brand" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <p className={`mt-5 ${BODY}`}>
                      Residents of states with their own consumer privacy laws,
                      including California, have these rights by statute, and we
                      extend the same rights to every customer regardless of where
                      they live. Exercising them will never affect the price you
                      pay or the service you receive.
                    </p>
                    <p className={`mt-4 ${BODY}`}>
                      Write to{" "}
                      <a href={site.contact.emailHref} className={LINK}>
                        {site.contact.email}
                      </a>{" "}
                      with your request and, where relevant, an order number so we
                      can find the right record. We aim to respond within 30 days.
                      We may ask a question or two to confirm that the request is
                      genuinely coming from you, which protects your information
                      from somebody else asking on your behalf.
                    </p>
                    <p className={`mt-4 ${BODY}`}>
                      Remember that anything stored in your browser through
                      localStorage, including your cart and your wishlist, is
                      under your direct control and can be cleared by you at any
                      time without contacting us.
                    </p>
                  </section>
                </Reveal>

                {/* 9 */}
                <Reveal>
                  <section id="policy-updates" className="scroll-mt-28">
                    <h2 className={H2}>9. Updates to this policy</h2>
                    <div className={`mt-5 space-y-4 ${BODY}`}>
                      <p>
                        We will revise this policy whenever our practices change,
                        for example if we add a new shipping partner, introduce an
                        additional payment method or begin offering customer
                        accounts. When that happens we will publish the revised
                        policy on this page and change the last updated date at
                        the top.
                      </p>
                      <p>
                        If a change materially affects how we handle information we
                        have already collected from you, we will make that clear
                        rather than relying on you to notice a quiet edit.
                        Continuing to use the website after a revision is published
                        means you accept the current version, so it is worth
                        glancing at this page occasionally.
                      </p>
                    </div>
                  </section>
                </Reveal>

                {/* 10 */}
                <Reveal>
                  <section id="contact-information" className="scroll-mt-28">
                    <h2 className={H2}>10. Contact information</h2>
                    <p className={`mt-5 ${BODY}`}>
                      If you have a question about this policy, want to exercise
                      any of the rights described above, or believe your
                      information has been handled incorrectly, please get in
                      touch. A real member of our team will read your message.
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
                        <Link href="/terms-and-conditions" className={LINK}>
                          terms and conditions
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
