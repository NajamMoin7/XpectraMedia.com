import Link from "next/link";

import { Icon } from "@/components/ui/Icon";
import { PageBanner } from "@/components/ui/PageBanner";
import { Reveal } from "@/components/ui/Reveal";
import { ACCEPTED_UPLOAD_LABEL, MAX_UPLOAD_BYTES } from "@/lib/custom-shirt";
import { formatPrice } from "@/lib/format";
import { buildMetadata } from "@/lib/seo";
import {
  EXPRESS_SHIPPING_RATE,
  FREE_SHIPPING_THRESHOLD,
  PROCESSING_TIME,
  RETURN_WINDOW_DAYS,
  SHIPPING_RATE,
  site,
} from "@/lib/site";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "Read how Xpectra Media collects, uses and protects your personal information when you shop at our online clothing store, including order details, custom shirt image uploads, cookies, browser storage and your privacy rights.",
  path: "/privacy-policy",
  keywords: [
    "Xpectra Media privacy policy",
    "online clothing store privacy",
    "custom shirt printing privacy",
    "customer data protection",
    "ecommerce privacy policy",
  ],
});

const LAST_UPDATED = "July 20, 2026";

const MAX_UPLOAD_MB = Math.round(MAX_UPLOAD_BYTES / (1024 * 1024));

/** Section anchors rendered in the sticky table of contents. */
const sections = [
  { id: "how-this-website-works", label: "How this website works today" },
  { id: "information-collected", label: "Information you provide" },
  { id: "custom-shirt-uploads", label: "Custom shirt images and uploads" },
  { id: "use-of-information", label: "How we use your information" },
  { id: "payment-information", label: "Payment information" },
  { id: "cookies", label: "Cookies and browser storage" },
  { id: "cookie-preferences", label: "Your cookie preferences" },
  { id: "third-party-services", label: "Third party services" },
  { id: "data-retention", label: "Data retention" },
  { id: "data-protection", label: "How we protect your data" },
  { id: "user-rights", label: "Your rights" },
  { id: "childrens-privacy", label: "Children's privacy" },
  { id: "policy-updates", label: "Updates to this policy" },
  { id: "contact-information", label: "Contact information" },
];

const H2 =
  "font-display text-xl font-bold tracking-tight text-ink sm:text-2xl";
const H3 = "mt-7 font-display text-base font-bold text-ink";
const BODY = "text-base leading-relaxed text-slate";
const LINK =
  "font-semibold text-brand underline-offset-4 transition-colors hover:text-brand-deep hover:underline";
const CARD =
  "mt-6 rounded-3xl border border-line bg-mist p-6 shadow-[var(--shadow-soft)] sm:p-7";

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

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageBanner
        eyebrow="Legal"
        title="Privacy Policy"
        description="This policy explains exactly what Xpectra Media collects when you browse, customize a shirt and order, why we collect it, how long we keep it and what you can ask us to do with it."
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
                    United States. We sell clothing, toys and custom printed
                    shirts, and we ship them nationwide. We are not a bank, we do
                    not run a loyalty program and we do not sell advertising, so
                    the amount of personal information we genuinely need is
                    small. This policy sets out that information in plain
                    language rather than in legal boilerplate, and it describes
                    only what our website actually does.
                  </p>
                </Reveal>

                {/* 1 */}
                <Reveal>
                  <section id="how-this-website-works" className="scroll-mt-28">
                    <h2 className={H2}>1. How this website works today</h2>
                    <div className={`mt-5 space-y-4 ${BODY}`}>
                      <p>
                        We want to be straightforward about the current state of
                        this website before describing anything else, because it
                        changes what a privacy policy honestly means here.
                      </p>
                      <p>
                        Xpectra Media currently runs as a static website. The
                        catalogue, the product pages, the shirt customization
                        tool, the cart and the checkout screens are all rendered
                        in your own browser from files served by our host. There
                        is no customer account system, no customer database
                        attached to this website, and no payment gateway
                        connected to it.
                      </p>
                      <p>
                        Because of that, the frontend order process is
                        simulated. When you complete the checkout form, your
                        order details and order number are generated and saved
                        inside your own browser so that the confirmation page
                        can display them. That checkout submission does not
                        create a stored customer record on a server, and it does
                        not transmit your details to a payment processor.
                      </p>
                      <p>
                        Real orders, returns and support requests are handled
                        through the contact channels published at the bottom of
                        this page. Anything you send us by email or telephone
                        does reach us, and the rest of this policy explains how
                        we treat it. Where a section describes something that
                        applies only once server side order processing is
                        enabled, we say so plainly rather than implying it is
                        already running.
                      </p>
                    </div>
                  </section>
                </Reveal>

                {/* 2 */}
                <Reveal>
                  <section id="information-collected" className="scroll-mt-28">
                    <h2 className={H2}>2. Information you provide</h2>
                    <div className={`mt-5 space-y-4 ${BODY}`}>
                      <p>
                        You can browse our entire catalogue, use the search,
                        filter products, read every product page and even build
                        a custom shirt design without giving us any personal
                        information at all. Details are requested only at the
                        point where they become necessary to complete something
                        you have asked for.
                      </p>
                      <p>
                        The information involved falls into four groups.
                      </p>
                    </div>

                    <h3 className={H3}>Contact and delivery details</h3>
                    <CheckList
                      items={[
                        "Your full name, so the carrier knows who to hand the parcel to.",
                        "Your email address, used to send the order confirmation and to answer questions about the order.",
                        "Your phone number, and an optional alternate number, used to confirm the order and to resolve delivery problems.",
                        "Your shipping address, including street address, apartment or suite, city, state and ZIP code.",
                        "Your billing address, when it differs from the shipping address.",
                        "Any note you choose to add to the order, for example delivery timing preferences.",
                      ]}
                    />

                    <h3 className={H3}>Order details</h3>
                    <p className={`mt-4 ${BODY}`}>
                      The items, sizes, colors and quantities you selected, the
                      shipping method you chose, the subtotal, the shipping
                      charge and the order total. For custom shirts this also
                      includes your product customization details: the shirt
                      style, the shirt color, the size, the print placement you
                      chose, the quantity, and the position, scale and rotation
                      you set for your artwork on the shirt.
                    </p>

                    <h3 className={H3}>Uploaded custom shirt images</h3>
                    <p className={`mt-4 ${BODY}`}>
                      If you upload your own image in the shirt customization
                      tool, that image is part of your design. It is handled
                      very differently from everything else on this list, and
                      the next section explains exactly how.
                    </p>

                    <h3 className={H3}>Device, browser and storage information</h3>
                    <p className={`mt-4 ${BODY}`}>
                      Like nearly every website, our hosting provider records
                      standard technical request data such as the pages
                      requested, the date and time, the device and browser type,
                      the screen size class used to choose a layout, and the
                      network address the request came from. This keeps the site
                      running, helps us diagnose faults and shows us which
                      categories are popular. It is not used to build a profile
                      of you as an individual.
                    </p>
                    <p className={`mt-4 ${BODY}`}>
                      Separately, your cart information, wishlist, most recently
                      placed order summary and recently viewed products are
                      written to localStorage in your own browser. That storage
                      sits on your device, not on our servers.
                    </p>
                  </section>
                </Reveal>

                {/* 3 */}
                <Reveal>
                  <section id="custom-shirt-uploads" className="scroll-mt-28">
                    <h2 className={H2}>3. Custom shirt images and uploads</h2>
                    <div className={`mt-5 space-y-4 ${BODY}`}>
                      <p>
                        The shirt customization tool lets you upload your own
                        image in {ACCEPTED_UPLOAD_LABEL} format, up to{" "}
                        {MAX_UPLOAD_MB} MB, and place it on a live preview of
                        the shirt. This is the most sensitive thing the website
                        touches, so here is precisely what happens to that file.
                      </p>
                      <p>
                        Your uploaded image is processed entirely inside your
                        own browser. The file is read locally by your browser,
                        drawn onto the preview on your screen, and downscaled
                        locally to a small preview copy so that it can sit
                        beside the item in your cart without filling up your
                        browser storage. All of that happens on your device.
                      </p>
                      <p>
                        The image is never transmitted to Xpectra Media and it
                        is never stored on a server. There is no upload
                        endpoint, no image hosting bucket and no third party
                        image processing service involved. We do not receive the
                        original file, we do not receive the downscaled preview,
                        and we cannot see either of them.
                      </p>
                      <p>
                        The only copy that persists is the downscaled preview
                        held in browser storage on your own device, kept there so
                        that your customized item survives a page refresh and
                        still appears in your cart when you come back. Clearing
                        your browser data, removing the item from your cart or
                        switching to a different device removes it.
                      </p>
                      <p>
                        The practical consequence is that we cannot retrieve a
                        design for you. If you want to keep your artwork, keep
                        your own copy of the original file. When real production
                        begins, the print ready artwork will be collected from
                        you directly by our team and this section will be updated
                        to describe that process before it starts.
                      </p>
                    </div>

                    <div className={CARD}>
                      <p className="font-display text-base font-bold text-ink">
                        In one sentence
                      </p>
                      <p className={`mt-2 ${BODY}`}>
                        Your uploaded design stays on your computer or phone, is
                        resized on your computer or phone, and is stored on your
                        computer or phone. It does not travel to us.
                      </p>
                    </div>
                  </section>
                </Reveal>

                {/* 4 */}
                <Reveal>
                  <section id="use-of-information" className="scroll-mt-28">
                    <h2 className={H2}>4. How we use your information</h2>
                    <p className={`mt-5 ${BODY}`}>
                      What you send us is used for a short and specific list of
                      purposes.
                    </p>

                    <h3 className={H3}>Order processing</h3>
                    <CheckList
                      items={[
                        "To confirm the order with you and check that the items, sizes and customization details are the ones you intended.",
                        "To pack the correct items and produce the shipping label with your delivery address.",
                        `To hand the parcel to the carrier within our stated processing time of ${PROCESSING_TIME}.`,
                        `To arrange a return, a replacement or a cancellation within the ${RETURN_WINDOW_DAYS} day return window.`,
                      ]}
                    />

                    <h3 className={H3}>Customer communication</h3>
                    <CheckList
                      items={[
                        "To send the order confirmation and, once the parcel ships, a tracking link by email.",
                        "To answer your questions about sizing, stock, custom printing, shipping status, returns and cancellations.",
                        "To reach you by phone or email if something about the order needs a decision from you.",
                        "To send newsletters only to people who deliberately subscribed, with a way to stop in every message.",
                      ]}
                    />

                    <h3 className={H3}>Website improvement</h3>
                    <CheckList
                      items={[
                        "To understand in aggregate which products, categories and customization options customers are interested in, so we can stock and build better.",
                        "To find and fix layout faults, broken pages and slow loading assets across different devices and browsers.",
                      ]}
                    />

                    <h3 className={H3}>Fraud prevention</h3>
                    <CheckList
                      items={[
                        "To detect and prevent fraudulent or abusive orders, for example repeated refusals at the door under different names.",
                        "To review a custom order where the described design appears to breach our terms and conditions.",
                      ]}
                    />

                    <h3 className={H3}>Legal compliance</h3>
                    <CheckList
                      items={[
                        "To meet ordinary business record keeping and tax obligations.",
                        "To respond to a lawful request from a court or a regulator, limited strictly to what the request covers.",
                        "To establish or defend a legal claim connected to an order.",
                      ]}
                    />

                    <p className={`mt-5 ${BODY}`}>
                      We never sell, rent or trade your personal information. We
                      do not share it with advertisers or data brokers, and we
                      do not use your information to make automated decisions
                      that produce a legal effect on you.
                    </p>
                  </section>
                </Reveal>

                {/* 5 */}
                <Reveal>
                  <section id="payment-information" className="scroll-mt-28">
                    <h2 className={H2}>5. Payment information</h2>
                    <div className={`mt-5 space-y-4 ${BODY}`}>
                      <p>
                        No payment card information is collected on this
                        website. We do not collect, process, transmit or store
                        card numbers, expiration dates, security codes,
                        cardholder names entered on a card form, bank account
                        numbers or digital wallet credentials.
                      </p>
                      <p>
                        Cash on Delivery is the only active payment method.
                        You pay the order total in cash to the carrier at the
                        moment your parcel is handed over, and the receipt for
                        that cash is issued at handover. No advance payment is
                        requested at any stage.
                      </p>
                      <p>
                        The card payment form you can see on the checkout page is
                        a disabled preview of a future option. It cannot be
                        selected, it does not accept input that leaves your
                        browser, and it is not wired to any payment processor. It
                        is shown so the checkout layout reflects where card
                        payment will appear once it is genuinely available.
                      </p>
                      <p>
                        If card payment is switched on later, we will publish an
                        updated policy first, name the payment processor, and
                        explain what that processor receives. Until you see that
                        update on this page, assume no card data is being
                        handled here, because none is.
                      </p>
                      <p>
                        One safety note that follows from this. Nobody from
                        Xpectra Media will ever telephone you to ask for a card
                        number or a bank transfer. If someone does, it is not us.
                      </p>
                    </div>
                  </section>
                </Reveal>

                {/* 6 */}
                <Reveal>
                  <section id="cookies" className="scroll-mt-28">
                    <h2 className={H2}>6. Cookies and browser storage</h2>
                    <div className={`mt-5 space-y-4 ${BODY}`}>
                      <p>
                        Your shopping cart lives in your own browser, not on our
                        servers. Xpectra Media stores your cart contents,
                        including the preview image and placement of any custom
                        shirt, your wishlist, your most recently placed order
                        summary and your recently viewed products in browser
                        localStorage on your device. That is what allows you to
                        add a hoodie to your cart, close the tab, come back the
                        next day and still find it waiting for you.
                      </p>
                      <p>
                        Because that cart information sits in localStorage on
                        your own device, it is never transmitted to us on its
                        own. If you clear your browser storage, use a private
                        browsing window or switch to a different device, your
                        saved cart, wishlist and custom designs will not follow
                        you.
                      </p>
                      <p>
                        We use a small number of cookies and equivalent storage
                        entries that are strictly necessary for the site to
                        function, such as keeping the interface consistent as you
                        move between pages. We do not use advertising cookies and
                        we do not run cross site tracking pixels for advertising
                        networks.
                      </p>
                    </div>
                  </section>
                </Reveal>

                {/* 7 */}
                <Reveal>
                  <section id="cookie-preferences" className="scroll-mt-28">
                    <h2 className={H2}>7. Your cookie preferences</h2>
                    <div className={`mt-5 space-y-4 ${BODY}`}>
                      <p>
                        You are in direct control of every cookie and storage
                        entry this website creates, and you do not need to ask us
                        to exercise that control.
                      </p>
                      <p>
                        Every current browser lets you block cookies, delete
                        cookies for a single site, clear site data including
                        localStorage, or browse in a private window that discards
                        everything when you close it. Any of those options works
                        on this website and none of them requires our
                        involvement.
                      </p>
                      <p>
                        The only effect of clearing this data is functional
                        rather than punitive. Your cart, wishlist, recently
                        viewed list, saved order confirmation and any custom
                        shirt preview will be emptied, and you will need to build
                        your cart again. Nothing about the price you pay or the
                        service you receive changes.
                      </p>
                      <p>
                        If we ever introduce analytics or advertising cookies, we
                        will ask for your consent before setting them and provide
                        a preference control on the site itself. Today there is
                        nothing optional to consent to, which is why you do not
                        see a consent banner.
                      </p>
                    </div>
                  </section>
                </Reveal>

                {/* 8 */}
                <Reveal>
                  <section id="third-party-services" className="scroll-mt-28">
                    <h2 className={H2}>8. Third party services</h2>
                    <p className={`mt-5 ${BODY}`}>
                      A small number of outside services are involved in running
                      the store, and each one receives only the narrow slice of
                      information it needs.
                    </p>
                    <ul className={`mt-4 space-y-4 ${BODY}`}>
                      {[
                        {
                          title: "Shipping providers",
                          body: "Carriers receive your name, shipping address, phone number and the cash amount to collect, purely so the parcel can reach you. They never receive your custom artwork or your order history.",
                        },
                        {
                          title: "Website hosting and content delivery",
                          body: "Serve the pages and images you request and keep standard technical request logs on our behalf.",
                        },
                        {
                          title: "Email providers",
                          body: "Carry the order confirmations, tracking notifications and support emails exchanged between you and our team.",
                        },
                        {
                          title: "Analytics services",
                          body: "Not currently running on this website. If we add a privacy respecting analytics service, we will name it here and describe what it measures before it is enabled.",
                        },
                        {
                          title: "Payment services",
                          body: "Planned for the future only. No payment processor is connected to this website today, and none receives any information from it. When card payment becomes available we will name the processor in this section first.",
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
                      These providers are expected to handle your information
                      only for the task we engaged them for. Our social media
                      profiles are hosted on platforms with their own privacy
                      policies, and anything you post or send on those platforms
                      is governed by their terms rather than by this policy.
                    </p>
                  </section>
                </Reveal>

                {/* 9 */}
                <Reveal>
                  <section id="data-retention" className="scroll-mt-28">
                    <h2 className={H2}>9. Data retention</h2>
                    <div className={`mt-5 space-y-4 ${BODY}`}>
                      <p>
                        We keep information only for as long as it is doing
                        useful work, and the period depends on what the
                        information is.
                      </p>
                    </div>
                    <CheckList
                      items={[
                        `Order records are kept while the order is in progress, through the ${RETURN_WINDOW_DAYS} day return window, and afterwards for as long as ordinary business and tax record keeping requires.`,
                        "Support emails are retained while they remain relevant to an open or recent order, then removed.",
                        "Newsletter subscriptions are held separately from order records and are removed as soon as you unsubscribe.",
                        "Technical request logs held by our hosting provider are short lived and are rotated automatically.",
                        "Uploaded custom shirt images are never retained by us at all, because we never receive them. The downscaled preview lives in your browser until you clear it.",
                        "Cart information, wishlist entries and recently viewed products stay in your browser storage until you remove them or clear your browser data.",
                      ]}
                    />
                    <p className={`mt-5 ${BODY}`}>
                      When a retention period ends, records are deleted or
                      reduced to an anonymous summary that can no longer be
                      linked back to you.
                    </p>
                  </section>
                </Reveal>

                {/* 10 */}
                <Reveal>
                  <section id="data-protection" className="scroll-mt-28">
                    <h2 className={H2}>10. How we protect your data</h2>
                    <div className={`mt-5 space-y-4 ${BODY}`}>
                      <p>
                        The whole website is served over an encrypted HTTPS
                        connection, so information travelling between your
                        browser and our host cannot be read in transit. Our
                        checkout asks for the minimum set of fields needed to
                        deliver a parcel and nothing beyond that.
                      </p>
                      <p>
                        Keeping the custom shirt tool entirely in the browser is
                        itself a protection measure. Artwork that is never
                        uploaded cannot be exposed by a server breach, and a
                        payment form that is not connected to a processor cannot
                        leak card data, because there is no card data.
                      </p>
                      <p>
                        Information you send us by email or telephone is held on
                        access controlled systems, accounts are protected by
                        strong authentication, and permissions are reviewed when
                        someone joins or leaves the team. Shipping partners
                        receive only the name, address and phone number printed
                        on the label, along with the amount to collect.
                      </p>
                      <p>
                        No system connected to the internet can promise perfect
                        security, and we will not pretend otherwise. What we do
                        promise is that we collect as little as possible in the
                        first place, that we keep it no longer than we need it,
                        and that if we ever become aware of a breach affecting
                        your information we will tell you promptly and explain
                        what happened.
                      </p>
                    </div>
                  </section>
                </Reveal>

                {/* 11 */}
                <Reveal>
                  <section id="user-rights" className="scroll-mt-28">
                    <h2 className={H2}>11. Your rights</h2>
                    <p className={`mt-5 ${BODY}`}>
                      Your information belongs to you. At any time you may ask us
                      to:
                    </p>
                    <CheckList
                      items={[
                        "Tell you what personal information we hold about you and where it came from.",
                        "Correct anything that is wrong, such as a misspelled name or an out of date address.",
                        "Delete your details from our records, subject to any order still in progress or any record we are required to keep.",
                        "Stop sending you newsletters or any other marketing message.",
                        "Provide a copy of your order history in a readable format.",
                        "Confirm that we have not sold or shared your personal information, which we never do.",
                        "Limit how we use your information while we look into a complaint you have raised.",
                      ]}
                    />
                    <p className={`mt-5 ${BODY}`}>
                      Residents of states with their own consumer privacy laws,
                      including California, have these rights by statute, and we
                      extend the same rights to every customer regardless of
                      where they live. Exercising them will never affect the
                      price you pay or the service you receive.
                    </p>
                    <p className={`mt-4 ${BODY}`}>
                      Write to{" "}
                      <a href={site.contact.emailHref} className={LINK}>
                        {site.contact.email}
                      </a>{" "}
                      with your request and, where relevant, an order number so
                      we can find the right record. We aim to respond within
                      seven days. We may ask a question or two to confirm the
                      request is genuinely coming from you, which protects your
                      information from somebody else asking on your behalf.
                    </p>
                    <p className={`mt-4 ${BODY}`}>
                      Remember that anything stored in your browser through
                      localStorage, including your cart, your wishlist and any
                      custom shirt preview, is under your direct control and can
                      be cleared by you at any time without contacting us.
                    </p>
                  </section>
                </Reveal>

                {/* 12 */}
                <Reveal>
                  <section id="childrens-privacy" className="scroll-mt-28">
                    <h2 className={H2}>12. Children&apos;s privacy</h2>
                    <div className={`mt-5 space-y-4 ${BODY}`}>
                      <p>
                        This website is intended for adults. We do not knowingly
                        collect personal information from children under 13, and
                        we do not create customer accounts, run profiling or
                        serve targeted advertising to anyone.
                      </p>
                      <p>
                        Product pages for kids clothing, baby clothes and toys
                        are written for parents and guardians to shop from, and
                        checkout is intended to be completed by an adult. The
                        same applies to the shirt customization tool, including
                        the image upload, which should be used by an adult or
                        with adult supervision.
                      </p>
                      <p>
                        If you believe a child has provided us with personal
                        information, contact us using the details below and we
                        will delete it promptly. A parent or guardian may also
                        ask us to review, correct or delete anything a child
                        submitted.
                      </p>
                    </div>
                  </section>
                </Reveal>

                {/* 13 */}
                <Reveal>
                  <section id="policy-updates" className="scroll-mt-28">
                    <h2 className={H2}>13. Updates to this policy</h2>
                    <div className={`mt-5 space-y-4 ${BODY}`}>
                      <p>
                        We will revise this policy whenever our practices change,
                        for example if we add a shipping partner, enable an
                        analytics service, switch on card payment or begin
                        storing custom artwork on a server for production. When
                        that happens we will publish the revised policy on this
                        page and change the last updated date at the top.
                      </p>
                      <p>
                        If a change materially affects how we handle information
                        we have already collected from you, we will make that
                        clear rather than relying on you to notice a quiet edit.
                        Continuing to use the website after a revision is
                        published means you accept the current version, so it is
                        worth glancing at this page occasionally.
                      </p>
                    </div>
                  </section>
                </Reveal>

                {/* 14 */}
                <Reveal>
                  <section id="contact-information" className="scroll-mt-28">
                    <h2 className={H2}>14. Contact information</h2>
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
                        Standard shipping is{" "}
                        {formatPrice(SHIPPING_RATE)} and is free at{" "}
                        {formatPrice(FREE_SHIPPING_THRESHOLD)}, express shipping
                        is {formatPrice(EXPRESS_SHIPPING_RATE)}, and returns run
                        for {RETURN_WINDOW_DAYS} days. Full details live on our{" "}
                        <Link href="/support/shipping-information" className={LINK}>
                          shipping information
                        </Link>{" "}
                        and{" "}
                        <Link href="/support/easy-returns" className={LINK}>
                          easy returns
                        </Link>{" "}
                        pages.
                      </p>
                      <p className={`mt-4 ${BODY}`}>
                        You may also want to read our{" "}
                        <Link href="/terms-and-conditions" className={LINK}>
                          terms and conditions
                        </Link>
                        , learn how the{" "}
                        <Link href="/support/shopping-cart" className={LINK}>
                          shopping cart
                        </Link>{" "}
                        and{" "}
                        <Link href="/support/secure-checkout" className={LINK}>
                          secure checkout
                        </Link>{" "}
                        work, or visit the{" "}
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
