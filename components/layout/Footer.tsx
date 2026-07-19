import Link from "next/link";

import { Logo } from "@/components/layout/Logo";
import { Icon, type IconName } from "@/components/ui/Icon";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import {
  footerCategoryLinks,
  footerQuickLinks,
  footerSupportLinks,
  type NavLink,
} from "@/lib/navigation";
import { site } from "@/lib/site";

const SOCIAL_ICONS: Record<string, IconName> = {
  Facebook: "facebook",
  Instagram: "instagram",
  X: "x",
  YouTube: "youtube",
};

/**
 * Site wide footer. This is the one deliberately dark surface on the site,
 * anchoring the white canvas above it.
 */
export function Footer() {
  return (
    <footer className="mt-auto bg-night text-white/70">
      {/* Newsletter strip */}
      <div className="border-b border-white/10">
        <div className="shell grid gap-8 py-12 lg:grid-cols-2 lg:items-center lg:py-14">
          <div>
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
              Stay ahead of every new arrival
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/70">
              Join the Xpectra Media list for early access to seasonal
              collections, kids and baby drops, new toys and offers made for
              families across the United States.
            </p>
          </div>
          <NewsletterForm
            tone="dark"
            className="lg:justify-self-end lg:w-full lg:max-w-md"
          />
        </div>
      </div>

      <div className="shell grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
        {/* Brand column */}
        <div className="lg:col-span-4">
          <Logo height={38} plate={false} label="Xpectra Media home from the footer" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/70">
            Xpectra Media is a modern online clothing store bringing everyday
            fashion for men, women and kids, plus soft baby clothes and toys
            worth keeping. Free shipping over $75 and easy 30 day returns.
          </p>

          <ul className="mt-6 flex items-center gap-3">
            {site.social.map((channel) => (
              <li key={channel.name}>
                <a
                  href={channel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Xpectra Media on ${channel.name}`}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-night-soft text-white/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand hover:bg-brand hover:text-white"
                >
                  <Icon name={SOCIAL_ICONS[channel.name] ?? "sparkle"} size={17} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <FooterColumn title="Quick Links" links={footerQuickLinks} className="lg:col-span-2" />
        <FooterColumn
          title="Categories"
          links={footerCategoryLinks}
          className="lg:col-span-2"
        />
        <FooterColumn
          title="Customer Support"
          links={footerSupportLinks}
          className="lg:col-span-2"
        />

        {/* Contact column */}
        <div className="lg:col-span-2">
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-white">
            Get in Touch
          </h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3 text-white/70">
              <Icon name="headset" size={16} className="mt-0.5 shrink-0 text-brand-bright" />
              <span>{site.contact.name}</span>
            </li>
            <li>
              <a
                href={site.contact.phoneHref}
                className="flex items-start gap-3 text-white/70 transition-colors hover:text-white"
              >
                <Icon name="phone" size={16} className="mt-0.5 shrink-0 text-brand-bright" />
                {site.contact.phone}
              </a>
            </li>
            <li>
              <a
                href={site.contact.emailHref}
                className="flex items-start gap-3 break-all text-white/70 transition-colors hover:text-white"
              >
                <Icon name="mail" size={16} className="mt-0.5 shrink-0 text-brand-bright" />
                {site.contact.email}
              </a>
            </li>
            <li className="flex items-start gap-3 text-white/70">
              <Icon name="pin" size={16} className="mt-0.5 shrink-0 text-brand-bright" />
              <span>
                {site.contact.street}
                <br />
                {site.contact.unit}
                <br />
                {site.contact.city}, {site.contact.state} {site.contact.postalCode}
                <br />
                {site.contact.country}
                <br />
                <a
                  href={site.contact.mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-bright transition-colors hover:text-white"
                >
                  View on Google Maps
                  <Icon name="arrowRight" size={13} />
                </a>
              </span>
            </li>
            <li className="flex items-start gap-3 text-white/70">
              <Icon name="clock" size={16} className="mt-0.5 shrink-0 text-brand-bright" />
              <span>
                {site.contact.hours[0].days}
                <br />
                {site.contact.hours[0].time}
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Legal bar */}
      <div className="border-t border-white/10">
        <div className="shell flex flex-col items-center justify-between gap-4 py-6 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-white/50">
            © 2026 Xpectra Media. All Rights Reserved.
          </p>
          <ul className="flex items-center gap-6 text-xs">
            <li>
              <Link
                href="/privacy-policy"
                className="text-white/70 transition-colors hover:text-brand-bright"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/terms-and-conditions"
                className="text-white/70 transition-colors hover:text-brand-bright"
              >
                Terms and Conditions
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
  className = "",
}: {
  title: string;
  links: NavLink[];
  className?: string;
}) {
  return (
    <div className={className}>
      <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-white">
        {title}
      </h3>
      <ul className="space-y-3 text-sm">
        {links.map((link) => (
          <li key={`${title}-${link.href}-${link.label}`}>
            <Link
              href={link.href}
              className="inline-block text-white/70 transition-all duration-200 hover:translate-x-0.5 hover:text-brand-bright"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
