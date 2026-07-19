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

/** Site wide footer with brand summary, link columns and contact details. */
export function Footer() {
  return (
    <footer className="mt-auto border-t border-line-soft bg-ink-soft">
      {/* Newsletter strip */}
      <div className="border-b border-line-soft">
        <div className="shell grid gap-8 py-12 lg:grid-cols-2 lg:items-center lg:py-14">
          <div>
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
              Stay ahead of every new arrival
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-mist">
              Join the Xpectra Media list for early access to seasonal
              collections, kids clothing drops and offers made for families
              across Pakistan.
            </p>
          </div>
          <NewsletterForm className="lg:justify-self-end lg:w-full lg:max-w-md" />
        </div>
      </div>

      <div className="shell grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
        {/* Brand column */}
        <div className="lg:col-span-4">
          <Logo height={42} label="Xpectra Media home from the footer" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-mist">
            Xpectra Media brings quality fashion, comfortable clothing, baby
            essentials and exciting toys to families across Pakistan. Shop
            online with confidence and pay with Cash on Delivery.
          </p>

          <ul className="mt-6 flex items-center gap-3">
            {site.social.map((channel) => (
              <li key={channel.name}>
                <a
                  href={channel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Xpectra Media on ${channel.name}`}
                  className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface text-mist transition-all duration-300 hover:-translate-y-0.5 hover:border-brand hover:text-brand hover:shadow-[0_0_20px_-4px_rgba(30,144,255,0.6)]"
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
            <li>
              <a
                href={site.contact.phoneHref}
                className="flex items-start gap-3 text-mist transition-colors hover:text-white"
              >
                <Icon name="phone" size={16} className="mt-0.5 shrink-0 text-brand" />
                {site.contact.phone}
              </a>
            </li>
            <li>
              <a
                href={site.contact.emailHref}
                className="flex items-start gap-3 break-all text-mist transition-colors hover:text-white"
              >
                <Icon name="mail" size={16} className="mt-0.5 shrink-0 text-brand" />
                {site.contact.email}
              </a>
            </li>
            <li className="flex items-start gap-3 text-mist">
              <Icon name="pin" size={16} className="mt-0.5 shrink-0 text-brand" />
              <span>
                {site.contact.addressLine}
                <br />
                {site.contact.city}, {site.contact.country}
              </span>
            </li>
            <li className="flex items-start gap-3 text-mist">
              <Icon name="clock" size={16} className="mt-0.5 shrink-0 text-brand" />
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
      <div className="border-t border-line-soft">
        <div className="shell flex flex-col items-center justify-between gap-4 py-6 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-mist-dim">
            © 2026 Xpectra Media. All Rights Reserved.
          </p>
          <ul className="flex items-center gap-6 text-xs">
            <li>
              <Link
                href="/privacy-policy"
                className="text-mist transition-colors hover:text-brand"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/terms-and-conditions"
                className="text-mist transition-colors hover:text-brand"
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
              className="inline-block text-mist transition-all duration-200 hover:translate-x-0.5 hover:text-brand"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
