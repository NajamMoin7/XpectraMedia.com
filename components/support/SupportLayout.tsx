import type { ReactNode } from "react";

import { Button } from "@/components/ui/Button";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { Icon, type IconName } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageBanner, SectionHeading } from "@/components/ui/PageBanner";
import { Reveal } from "@/components/ui/Reveal";
import { faqJsonLd, type Crumb } from "@/lib/seo";
import { site } from "@/lib/site";
import type { Faq } from "@/lib/types";

const { contact } = site;

/* ------------------------------------------------------------------ */
/* Small building blocks shared by every customer support page          */
/* ------------------------------------------------------------------ */

interface SupportSectionProps {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  /** Alternates the background so long pages keep a readable rhythm. */
  tone?: "canvas" | "mist";
  children: ReactNode;
}

/** A titled block of page content on either a white or a light grey surface. */
export function SupportSection({
  id,
  eyebrow,
  title,
  description,
  tone = "canvas",
  children,
}: SupportSectionProps) {
  const surface =
    tone === "mist" ? "border-y border-line bg-mist" : "bg-canvas";

  return (
    <section id={id} className={`scroll-mt-24 py-14 md:py-18 ${surface}`}>
      <div className="shell">
        <Reveal>
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            description={description}
          />
        </Reveal>
        <Reveal delay={100} className="mt-9">
          {children}
        </Reveal>
      </div>
    </section>
  );
}

interface SupportCardProps {
  icon?: IconName;
  title: string;
  /** Optional small badge shown beside the card title. */
  badge?: string;
  children: ReactNode;
  className?: string;
}

/** White rounded card used for explanations, policies and trust points. */
export function SupportCard({
  icon,
  title,
  badge,
  children,
  className = "",
}: SupportCardProps) {
  return (
    <article
      className={`flex h-full flex-col rounded-3xl border border-line bg-card p-6 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-[var(--shadow-lift)] ${className}`}
    >
      <div className="flex items-start gap-4">
        {icon ? (
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-tint text-brand">
            <Icon name={icon} size={20} />
          </span>
        ) : null}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-base font-semibold tracking-tight text-ink">
              {title}
            </h3>
            {badge ? <SupportBadge>{badge}</SupportBadge> : null}
          </div>
        </div>
      </div>
      <div className="mt-3 text-sm leading-relaxed text-slate">{children}</div>
    </article>
  );
}

/** Pill label for statuses such as Coming Soon or Free. */
export function SupportBadge({
  children,
  tone = "brand",
}: {
  children: ReactNode;
  tone?: "brand" | "success" | "muted";
}) {
  const styles = {
    brand: "border-brand/30 bg-brand-tint text-brand-deep",
    success: "border-success/25 bg-mist text-success",
    muted: "border-line bg-mist text-muted",
  } as const;

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${styles[tone]}`}
    >
      {children}
    </span>
  );
}

/** Bulleted list with brand ticks, used for policies and eligibility rules. */
export function SupportList({
  items,
  icon = "check",
  tone = "brand",
  className = "",
}: {
  items: string[];
  icon?: IconName;
  tone?: "brand" | "sale";
  className?: string;
}) {
  const color = tone === "sale" ? "text-sale" : "text-brand";

  return (
    <ul className={`flex flex-col gap-3 ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <Icon
            name={icon}
            size={16}
            className={`mt-1 shrink-0 ${color}`}
          />
          <span className="text-sm leading-relaxed text-slate">{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Numbered vertical process, used for the return workflow and checkout flow. */
export function SupportSteps({
  steps,
}: {
  steps: { title: string; detail: string }[];
}) {
  return (
    <ol className="flex flex-col gap-4">
      {steps.map((step, index) => (
        <li
          key={step.title}
          className="flex gap-4 rounded-2xl border border-line bg-card p-5 shadow-[var(--shadow-soft)]"
        >
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand text-sm font-bold text-white">
            {index + 1}
          </span>
          <div className="min-w-0">
            <h3 className="font-display text-base font-semibold tracking-tight text-ink">
              {step.title}
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-slate">
              {step.detail}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Highlighted callout for policy notices that must not be missed. */
export function SupportNotice({
  icon = "bolt",
  title,
  children,
}: {
  icon?: IconName;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-start gap-4 rounded-3xl border border-brand/30 bg-brand-tint p-6 shadow-[var(--shadow-soft)]">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-canvas text-brand">
        <Icon name={icon} size={20} />
      </span>
      <div className="min-w-0">
        <p className="font-display text-base font-bold tracking-tight text-ink">
          {title}
        </p>
        <div className="mt-2 text-sm leading-relaxed text-slate">{children}</div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page shell                                                           */
/* ------------------------------------------------------------------ */

export interface SupportHighlight {
  icon: IconName;
  label: string;
  value: string;
}

interface SupportLayoutProps {
  eyebrow: string;
  title: string;
  description: string;
  /** Route of this page, used for the breadcrumb trail. */
  path: string;
  /** Compact facts pinned under the page heading. */
  highlights?: SupportHighlight[];
  /** Optional call to action rendered inside the banner. */
  action?: ReactNode;
  faqs: Faq[];
  faqTitle?: string;
  faqDescription?: string;
  /** Sentence tailored to the page inside the contact support block. */
  contactNote: string;
  children: ReactNode;
}

/**
 * Shared shell for the customer support pages. It supplies the banner with
 * breadcrumbs, the frequently asked questions block with its structured data
 * and the contact support panel, while each page keeps its own body content.
 */
export function SupportLayout({
  eyebrow,
  title,
  description,
  path,
  highlights,
  action,
  faqs,
  faqTitle = "Frequently asked questions",
  faqDescription,
  contactNote,
  children,
}: SupportLayoutProps) {
  const crumbs: Crumb[] = [{ name: title, href: path }];

  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />

      <PageBanner
        eyebrow={eyebrow}
        title={title}
        description={description}
        crumbs={crumbs}
      >
        {highlights && highlights.length > 0 ? (
          <dl className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((item) => (
              <div
                key={item.label}
                className="animate-fade-up rounded-2xl border border-line bg-card p-4 shadow-[var(--shadow-soft)]"
              >
                <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                  <Icon name={item.icon} size={16} className="text-brand" />
                  {item.label}
                </dt>
                <dd className="mt-2 font-display text-base font-bold tracking-tight text-ink">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}

        {action ? <div className="mt-8 flex flex-wrap gap-3">{action}</div> : null}
      </PageBanner>

      {children}

      {/* Page specific frequently asked questions */}
      <section id="faq" className="scroll-mt-24 border-t border-line bg-canvas py-16 md:py-20">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="Good to know"
              title={faqTitle}
              description={faqDescription}
            />
          </Reveal>
          <Reveal delay={100} className="mt-10">
            <FaqAccordion items={faqs} className="mx-auto max-w-3xl" />
          </Reveal>
        </div>
      </section>

      {/* Contact customer support */}
      <section className="border-t border-line bg-mist py-16 md:py-20">
        <div className="shell">
          <Reveal>
            <div className="mx-auto max-w-4xl rounded-3xl border border-line bg-card p-7 shadow-[var(--shadow-soft)] sm:p-9">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-5">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand-tint text-brand">
                  <Icon name="headset" size={22} />
                </span>
                <div className="min-w-0">
                  <h2 className="font-display text-xl font-bold tracking-tight text-ink sm:text-2xl">
                    Contact customer support
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate">
                    {contactNote}
                  </p>
                </div>
              </div>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <a
                  href={contact.phoneHref}
                  className="flex items-start gap-4 rounded-2xl border border-line bg-mist p-5 transition-all duration-300 hover:border-brand/40 hover:bg-brand-tint"
                >
                  <Icon name="phone" size={20} className="mt-0.5 shrink-0 text-brand" />
                  <span className="min-w-0">
                    <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                      Call us
                    </span>
                    <span className="mt-1 block break-words font-display text-base font-semibold tracking-tight text-brand">
                      {contact.phone}
                    </span>
                    <span className="mt-1 block text-xs leading-relaxed text-muted">
                      Monday to Friday, 9:00 AM to 6:00 PM PT
                    </span>
                  </span>
                </a>

                <a
                  href={contact.emailHref}
                  className="flex items-start gap-4 rounded-2xl border border-line bg-mist p-5 transition-all duration-300 hover:border-brand/40 hover:bg-brand-tint"
                >
                  <Icon name="mail" size={20} className="mt-0.5 shrink-0 text-brand" />
                  <span className="min-w-0">
                    <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                      Email us
                    </span>
                    <span className="mt-1 block break-words font-display text-base font-semibold tracking-tight text-brand">
                      {contact.email}
                    </span>
                    <span className="mt-1 block text-xs leading-relaxed text-muted">
                      Answered within one business day
                    </span>
                  </span>
                </a>
              </div>

              <div className="mt-6 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm leading-relaxed text-slate">
                  Prefer to write to us in detail? Use the enquiry form and we
                  will reply with everything you need.
                </p>
                <Button href="/contact" variant="outline" size="md" className="sm:shrink-0">
                  Go to Contact Page
                  <Icon name="arrowRight" size={16} />
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
