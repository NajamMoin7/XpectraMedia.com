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
    "Contact the Xpectra Media customer support team by phone, email or WhatsApp. Find our Lahore office address, our working hours and answers to the questions we are asked most.",
  path: "/contact",
  keywords: [
    "contact Xpectra Media",
    "Xpectra Media customer support",
    "online shopping help in Pakistan",
    "Xpectra Media WhatsApp",
    "Xpectra Media Lahore office",
  ],
});

const { contact } = site;

/** Single line postal address reused by the map panel and the directions link. */
const fullAddress = `${contact.addressLine}, ${contact.city}, ${contact.region} ${contact.postalCode}, ${contact.country}`;

const directionsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  fullAddress,
)}`;

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
    icon: "phone",
    label: "Call our team",
    lines: [contact.phone],
    href: contact.phoneHref,
    linkText: contact.phone,
    note: "Speak to a support agent during working hours for order help and product advice.",
  },
  {
    icon: "mail",
    label: "Email us",
    lines: [contact.email],
    href: contact.emailHref,
    linkText: contact.email,
    note: "Best for exchange requests, bulk enquiries and anything that needs a written record.",
  },
  {
    icon: "pin",
    label: "Visit our office",
    lines: [
      contact.addressLine,
      `${contact.city}, ${contact.region} ${contact.postalCode}`,
      contact.country,
    ],
    note: "Our team works from here Monday to Saturday. Please message ahead before visiting.",
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />

      <PageBanner
        eyebrow="We are here to help"
        title="Contact Us"
        description="Questions about an order, a size, a delivery or a product? Our customer support team in Lahore is ready to help you by phone, email or WhatsApp, every working day."
        crumbs={[{ name: "Contact Us", href: "/contact" }]}
      />

      {/* Contact details and enquiry form */}
      <section className="shell py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-12">
          <Reveal className="flex flex-col gap-5">
            <div>
              <h2 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Ways to reach us
              </h2>
              <p className="mt-3 text-base leading-relaxed text-mist">
                Pick whichever suits you best. WhatsApp is usually the fastest
                way to get an answer.
              </p>
            </div>

            {cards.map((card) => (
              <article
                key={card.label}
                className="rounded-2xl border border-line-soft bg-surface p-6 transition-all duration-300 hover:border-brand/60 hover:shadow-[0_18px_50px_-28px_rgba(30,144,255,0.85)]"
              >
                <div className="flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-brand/40 bg-brand/10 text-brand-bright">
                    <Icon name={card.icon} size={20} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-base font-semibold tracking-tight text-white">
                      {card.label}
                    </h3>
                    {card.href ? (
                      <a
                        href={card.href}
                        className="mt-1 block break-words text-sm font-medium text-brand-bright underline-offset-4 transition-colors hover:text-white hover:underline"
                      >
                        {card.linkText}
                      </a>
                    ) : (
                      <address className="mt-1 not-italic text-sm leading-relaxed text-mist">
                        {card.lines.map((line) => (
                          <span key={line} className="block">
                            {line}
                          </span>
                        ))}
                      </address>
                    )}
                    <p className="mt-3 text-xs leading-relaxed text-mist-dim">
                      {card.note}
                    </p>
                  </div>
                </div>
              </article>
            ))}

            {/* Working hours */}
            <article className="rounded-2xl border border-line-soft bg-surface p-6 transition-all duration-300 hover:border-brand/60 hover:shadow-[0_18px_50px_-28px_rgba(30,144,255,0.85)]">
              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-brand/40 bg-brand/10 text-brand-bright">
                  <Icon name="clock" size={20} />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-base font-semibold tracking-tight text-white">
                    Working hours
                  </h3>
                  <dl className="mt-3 flex flex-col gap-2">
                    {contact.hours.map((slot) => (
                      <div
                        key={slot.days}
                        className="flex flex-col gap-0.5 border-b border-line-soft pb-2 last:border-0 last:pb-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
                      >
                        <dt className="text-sm font-medium text-white">
                          {slot.days}
                        </dt>
                        <dd className="text-sm text-mist sm:text-right">
                          {slot.time}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-3 text-xs leading-relaxed text-mist-dim">
                    All times shown are Pakistan Standard Time.
                  </p>
                </div>
              </div>
            </article>

            {/* WhatsApp call to action */}
            <div className="rounded-2xl border border-brand/40 bg-gradient-to-br from-brand/15 via-surface to-surface p-6 shadow-[0_20px_60px_-32px_rgba(30,144,255,0.9)]">
              <h3 className="font-display text-lg font-bold tracking-tight text-white">
                Chat with us on WhatsApp
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-mist">
                Send your order number or a product photo and our team will
                reply during working hours, usually within a few minutes.
              </p>
              <Button
                href={contact.whatsappHref}
                external
                size="lg"
                fullWidth
                className="mt-5"
              >
                <Icon name="whatsapp" size={18} />
                Message {contact.whatsapp} on WhatsApp
              </Button>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      {/* Location panel standing in for a map embed */}
      <section className="border-y border-line-soft bg-ink-soft py-16 md:py-20">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="Find us"
              title="Our office in Lahore"
              description="Our support and dispatch team works from Gulberg Trade Centre. Orders across Pakistan are packed and handed to our courier partners from this address."
            />
          </Reveal>

          <Reveal delay={100} className="mt-10">
            <div className="overflow-hidden rounded-2xl border border-line-soft bg-surface">
              {/* Stylised map surface. No external embed is loaded. */}
              <div
                className="relative grid h-64 place-items-center bg-surface-2 sm:h-80 md:h-96"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(30,144,255,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(30,144,255,0.10) 1px, transparent 1px)",
                  backgroundSize: "44px 44px",
                }}
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(50% 70% at 50% 50%, rgba(30,144,255,0.20) 0%, rgba(4,7,12,0.85) 75%)",
                  }}
                />
                <div className="relative flex flex-col items-center px-6 text-center">
                  <span className="grid h-16 w-16 place-items-center rounded-full border border-brand/50 bg-brand/15 text-brand-bright shadow-[0_0_0_10px_rgba(30,144,255,0.08)]">
                    <Icon name="pin" size={28} />
                  </span>
                  <p className="mt-5 font-display text-lg font-bold tracking-tight text-white sm:text-xl">
                    {site.name}
                  </p>
                  <address className="mt-2 max-w-sm not-italic text-sm leading-relaxed text-mist">
                    {fullAddress}
                  </address>
                  <p className="mt-3 text-xs uppercase tracking-[0.28em] text-mist-dim">
                    Map view
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4 border-t border-line-soft p-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-display text-sm font-semibold tracking-tight text-white">
                    Plan your visit
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-mist">
                    Parking is available on the ground floor and the office sits
                    on the second floor.
                  </p>
                </div>
                <Button
                  href={directionsHref}
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
      <section id="faq" className="shell scroll-mt-24 py-16 md:py-20">
        <Reveal>
          <SectionHeading
            eyebrow="Good to know"
            title="Frequently asked questions"
            description="Answers to the questions our customers ask most about delivery, payment, sizing and exchanges. If yours is not covered here, send us a message above."
          />
        </Reveal>

        <Reveal delay={100} className="mt-10">
          <FaqAccordion items={faqs} className="mx-auto max-w-3xl" />
        </Reveal>

        <Reveal delay={160} className="mt-10">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 rounded-2xl border border-line-soft bg-surface p-6 text-center sm:flex-row sm:justify-between sm:text-left">
            <div className="flex items-center gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-brand/40 bg-brand/10 text-brand-bright">
                <Icon name="headset" size={20} />
              </span>
              <div>
                <p className="font-display text-base font-semibold tracking-tight text-white">
                  Still need a hand?
                </p>
                <p className="mt-1 text-sm leading-relaxed text-mist">
                  Our support team answers every message personally.
                </p>
              </div>
            </div>
            <Button
              href={contact.whatsappHref}
              external
              variant="outline"
              size="md"
              className="sm:shrink-0"
            >
              <Icon name="whatsapp" size={16} />
              Chat on WhatsApp
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
