import { ContactForm } from "@/components/contact/ContactForm";
import { Button } from "@/components/ui/Button";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { Icon, type IconName } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageBanner, SectionHeading } from "@/components/ui/PageBanner";
import { Reveal } from "@/components/ui/Reveal";
import { faqs } from "@/lib/content";
import { buildMetadata, faqJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Contact Us",
  description:
    "Contact the Xpectra Media customer support team by phone or email for help with orders, sizing, shipping, returns and exchanges. Find our business address, working hours and answers to the questions we are asked most.",
  path: "/contact",
  keywords: [
    "contact Xpectra Media",
    "Xpectra Media customer support",
    "online clothing store support",
    "order help",
    "returns and exchanges",
  ],
});

const { contact } = site;

interface ContactCard {
  icon: IconName;
  label: string;
  lines: string[];
  href?: string;
  linkText?: string;
  note: string;
}

const cards: ContactCard[] = [
  {
    icon: "headset",
    label: "Your point of contact",
    lines: [contact.name],
    note: "Gerard leads our customer support team and makes sure every message reaches the right person.",
  },
  {
    icon: "phone",
    label: "Call our team",
    lines: [contact.phone],
    href: contact.phoneHref,
    linkText: contact.phone,
    note: "Speak to a support agent during business hours for order help and product advice.",
  },
  {
    icon: "mail",
    label: "Email us",
    lines: [contact.email],
    href: contact.emailHref,
    linkText: contact.email,
    note: "Best for return requests, bulk enquiries and anything that needs a written record.",
  },
  {
    icon: "pin",
    label: "Our business address",
    lines: [
      contact.street,
      contact.unit,
      `${contact.city}, ${contact.state} ${contact.postalCode}`,
      contact.country,
    ],
    note: "Our support and dispatch team works from here. Please email ahead before visiting in person.",
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />

      <PageBanner
        eyebrow="We are here to help"
        title="Contact Us"
        description="Questions about an order, a size, a shipment or a product? Our customer support team is ready to help you by phone or email every business day."
        crumbs={[{ name: "Contact Us", href: "/contact" }]}
      />

      {/* Contact details and enquiry form */}
      <section className="shell bg-canvas py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-12">
          <Reveal className="flex flex-col gap-5">
            <div>
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                Ways to reach us
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate">
                Pick whichever suits you best. Email is usually the fastest way
                to get a written answer, and the phone is best for anything
                urgent.
              </p>
            </div>

            {cards.map((card) => (
              <article
                key={card.label}
                className="rounded-3xl border border-line bg-card p-6 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-[var(--shadow-lift)]"
              >
                <div className="flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-tint text-brand">
                    <Icon name={card.icon} size={20} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-base font-semibold tracking-tight text-ink">
                      {card.label}
                    </h3>
                    {card.href ? (
                      <a
                        href={card.href}
                        className="mt-1 block break-words text-sm font-semibold text-brand underline-offset-4 transition-colors hover:text-brand-deep hover:underline"
                      >
                        {card.linkText}
                      </a>
                    ) : (
                      <address className="mt-1 not-italic text-sm leading-relaxed text-slate">
                        {card.lines.map((line) => (
                          <span key={line} className="block">
                            {line}
                          </span>
                        ))}
                      </address>
                    )}
                    <p className="mt-3 text-xs leading-relaxed text-muted">
                      {card.note}
                    </p>
                  </div>
                </div>
              </article>
            ))}

            {/* Working hours */}
            <article className="rounded-3xl border border-line bg-card p-6 shadow-[var(--shadow-soft)]">
              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-tint text-brand">
                  <Icon name="clock" size={20} />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-base font-semibold tracking-tight text-ink">
                    Working hours
                  </h3>
                  <dl className="mt-3 flex flex-col gap-2">
                    {contact.hours.map((slot) => (
                      <div
                        key={slot.days}
                        className="flex flex-col gap-0.5 border-b border-line pb-2 last:border-0 last:pb-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
                      >
                        <dt className="text-sm font-medium text-ink">{slot.days}</dt>
                        <dd className="text-sm text-slate sm:text-right">
                          {slot.time}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-3 text-xs leading-relaxed text-muted">
                    All times shown are Pacific Time. Messages sent outside these
                    hours are answered on the next business day.
                  </p>
                </div>
              </div>
            </article>

            {/* Support promise */}
            <div className="rounded-3xl border border-line bg-brand-tint p-6 shadow-[var(--shadow-soft)]">
              <h3 className="font-display text-lg font-bold tracking-tight text-ink">
                One business day, every time
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">
                Every message is read by a real member of our team and answered
                within one business day. Include your order number and we will
                have the full history in front of us before we reply.
              </p>
              <Button href={contact.emailHref} size="lg" fullWidth className="mt-5">
                <Icon name="mail" size={18} />
                Email {contact.email}
              </Button>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      {/* Location panel standing in for a map embed */}
      <section className="border-y border-line bg-mist py-16 md:py-20">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="Find us"
              title="Where to find Xpectra Media"
              description="Our support and dispatch team works from the address below. Orders are packed and handed to our shipping partners from here every business day."
            />
          </Reveal>

          <Reveal delay={100} className="mt-10">
            <div className="overflow-hidden rounded-3xl border border-line bg-card shadow-[var(--shadow-soft)]">
              {/* Stylised map surface. No external embed or API is loaded. */}
              <div
                className="relative grid h-64 place-items-center bg-mist-2 sm:h-80 md:h-96"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(13,127,242,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(13,127,242,0.10) 1px, transparent 1px)",
                  backgroundSize: "44px 44px",
                }}
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(50% 70% at 50% 50%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.35) 75%)",
                  }}
                />
                <div className="relative flex flex-col items-center px-6 text-center">
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-brand text-white shadow-[var(--shadow-brand)]">
                    <Icon name="pin" size={28} />
                  </span>
                  <p className="mt-5 font-display text-lg font-bold tracking-tight text-ink sm:text-xl">
                    {site.name}
                  </p>
                  <address className="mt-2 max-w-sm not-italic text-sm leading-relaxed text-slate">
                    {contact.full}
                  </address>
                  <p className="mt-3 text-xs uppercase tracking-[0.28em] text-muted">
                    Map view
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4 border-t border-line p-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-display text-sm font-semibold tracking-tight text-ink">
                    Plan your visit
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-slate">
                    Open the address in Google Maps for turn by turn directions
                    and current parking information.
                  </p>
                </div>
                <Button
                  href={contact.mapsHref}
                  external
                  variant="outline"
                  size="md"
                  className="sm:shrink-0"
                >
                  Get Directions
                  <Icon name="arrowRight" size={16} />
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Frequently asked questions */}
      <section id="faq" className="shell scroll-mt-24 bg-canvas py-16 md:py-20">
        <Reveal>
          <SectionHeading
            eyebrow="Good to know"
            title="Frequently asked questions"
            description="Answers to the questions our customers ask most about shipping, payment, sizing and returns. If yours is not covered here, send us a message above."
          />
        </Reveal>

        <Reveal delay={100} className="mt-10">
          <FaqAccordion items={faqs} className="mx-auto max-w-3xl" />
        </Reveal>

        <Reveal delay={160} className="mt-10">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 rounded-3xl border border-line bg-card p-6 text-center shadow-[var(--shadow-soft)] sm:flex-row sm:justify-between sm:text-left">
            <div className="flex items-center gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-tint text-brand">
                <Icon name="headset" size={20} />
              </span>
              <div>
                <p className="font-display text-base font-semibold tracking-tight text-ink">
                  Still need a hand?
                </p>
                <p className="mt-1 text-sm leading-relaxed text-slate">
                  Our support team answers every message personally.
                </p>
              </div>
            </div>
            <Button
              href={contact.phoneHref}
              variant="outline"
              size="md"
              className="sm:shrink-0"
            >
              <Icon name="phone" size={16} />
              Call {contact.phone}
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
