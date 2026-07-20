import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { PageBanner, SectionHeading } from "@/components/ui/PageBanner";
import { CUSTOM_APPROVAL_LABEL, CUSTOM_PRODUCT_POLICY } from "@/lib/custom-shirt";
import { buildMetadata } from "@/lib/seo";
import { RETURN_WINDOW_DAYS, site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Custom Product Policy",
  description:
    "How returns work on custom printed shirts. What counts as damaged, defective or different from the approved order, how to report a problem, and why the approval step matters.",
  path: "/custom-shirts/policy",
  keywords: [
    "custom shirt return policy",
    "custom product policy",
    "personalized shirts returns",
    "damaged custom shirt",
    "custom order approval",
  ],
});

const COVERED = [
  {
    title: "Damaged on arrival",
    body: "The shirt reaches you with physical damage that was not there when it left us. Torn fabric, a split seam, staining, or print that has scuffed or lifted in transit all belong here.",
  },
  {
    title: "Defective product",
    body: "Something is wrong with the shirt or the printing itself. A print that is cracked, faded, misaligned on the body, printed off center from the placement you approved, or a blank with a manufacturing fault such as a dropped stitch or a crooked collar.",
  },
  {
    title: "Different from the approved order",
    body: "What arrived does not match what you approved. The wrong style, the wrong shirt color, the wrong size, a print on the back when you ordered a front print, the wrong quantity, or artwork that is not the design attached to your order.",
  },
];

const NOT_COVERED = [
  "A change of mind about the design, the shirt color or the style after the order is placed",
  "Spelling, wording or artwork errors that were present in the file you uploaded and approved",
  "A size that does not fit, when the size delivered matches the size you selected",
  "Small differences in print position or color shade within normal production tolerance",
  "Wear, fading or shrinkage caused by washing or drying outside the care instructions",
];

const REPORT_STEPS = [
  {
    step: "One",
    title: "Contact us within 7 days of delivery",
    body: "Email or call our team as soon as you notice the problem. Include your order number so we can pull up the exact configuration you approved, including the design and its placement.",
  },
  {
    step: "Two",
    title: "Send clear photographs",
    body: "Photograph the shirt flat in good daylight, with one wide shot of the whole garment and one close shot of the issue. If the problem is a wrong item, include the neck label so the style and size are readable.",
  },
  {
    step: "Three",
    title: "Keep the shirt as it arrived",
    body: "Do not wash, iron over or alter the shirt while a claim is open. Keep the packaging if the damage looks like it happened in transit, because carriers sometimes ask to see it.",
  },
  {
    step: "Four",
    title: "We reprint or refund",
    body: "Once we confirm the problem, we reprint the affected shirts to your original approved design at no cost to you, or refund them if you would rather not wait for a reprint.",
  },
];

export default function CustomShirtPolicyPage() {
  return (
    <>
      <PageBanner
        eyebrow="Custom Shirts"
        title="Custom Product Policy"
        description="Custom shirts are made one order at a time, which changes how returns work. This page explains exactly where you stand."
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Custom Shirts", href: "/custom-shirts" },
          { name: "Custom Product Policy", href: "/custom-shirts/policy" },
        ]}
      />

      {/* ------------------------------------------------ The policy */}
      <section className="bg-canvas py-12 md:py-16">
        <div className="shell">
          <div className="flex flex-col gap-5 rounded-3xl border border-brand/30 bg-brand-tint p-6 sm:flex-row sm:items-start sm:p-8">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-canvas text-brand shadow-[var(--shadow-soft)]">
              <Icon name="shield" size={22} />
            </span>
            <div>
              <h2 className="font-display text-lg font-semibold tracking-tight text-ink">
                The policy in full
              </h2>
              <p className="mt-2 text-base leading-relaxed text-slate">
                {CUSTOM_PRODUCT_POLICY}
              </p>
            </div>
          </div>

          <p className="mt-8 max-w-3xl text-base leading-relaxed text-slate">
            The reason is straightforward. A standard shirt that comes back to us can go
            to the next customer who wants that style and size. A shirt printed with your
            logo, your team name or your family reunion date cannot go to anyone else. It
            was manufactured the moment you approved it and it has exactly one possible
            owner. That is why the customization tool puts an approval step in front of
            the cart rather than behind it.
          </p>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate">
            What that limit does not do is leave you carrying the cost of our mistakes.
            If the shirt arrives damaged, if the printing is defective, or if what you
            received is not what you approved, we put it right. The sections below set out
            precisely what each of those means.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------- Covered */}
      <section className="border-y border-line bg-mist py-12 md:py-16">
        <div className="shell">
          <SectionHeading
            eyebrow="Covered"
            title="What counts as damaged, defective or different"
            description="If your order falls into any of these three, contact us and we will reprint or refund it."
          />

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {COVERED.map((item) => (
              <div
                key={item.title}
                className="flex flex-col rounded-3xl border border-line bg-card p-6 shadow-[var(--shadow-soft)]"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-tint text-brand">
                  <Icon name="checkCircle" size={20} />
                </span>
                <h3 className="mt-4 font-display text-base font-semibold tracking-tight text-ink">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-3xl border border-line bg-card p-6 shadow-[var(--shadow-soft)] sm:p-8">
            <h3 className="font-display text-base font-semibold tracking-tight text-ink">
              What is not covered
            </h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {NOT_COVERED.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm leading-relaxed text-slate"
                >
                  <Icon name="close" size={16} className="mt-0.5 shrink-0 text-muted" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ------------------------------------------ How to report */}
      <section className="bg-canvas py-12 md:py-16">
        <div className="shell">
          <SectionHeading
            eyebrow="Reporting A Problem"
            title="How to raise a claim on a custom order"
            description="Four steps, and the whole thing usually resolves in a single exchange of messages."
          />

          <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {REPORT_STEPS.map((item) => (
              <li
                key={item.step}
                className="flex flex-col rounded-3xl border border-line bg-card p-6 shadow-[var(--shadow-soft)]"
              >
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-brand">
                  Step {item.step}
                </p>
                <h3 className="mt-2 font-display text-base font-semibold tracking-tight text-ink">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate">{item.body}</p>
              </li>
            ))}
          </ol>

          <div className="mt-8 flex flex-col gap-4 rounded-3xl border border-line bg-mist p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <h3 className="font-display text-base font-semibold tracking-tight text-ink">
                Contact our team
              </h3>
              <p className="mt-1.5 text-sm text-slate">
                {site.contact.name} and the support team handle every custom order claim.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button href={site.contact.emailHref} variant="primary">
                <Icon name="mail" size={16} />
                {site.contact.email}
              </Button>
              <Button href={site.contact.phoneHref} variant="outline">
                <Icon name="phone" size={16} />
                {site.contact.phone}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------ Approval step */}
      <section className="border-y border-line bg-mist-2 py-12 md:py-16">
        <div className="shell">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-line bg-card p-6 shadow-[var(--shadow-soft)] sm:p-8">
              <h2 className="font-display text-xl font-bold tracking-tight text-ink">
                About the approval checkbox
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate">
                Before a custom shirt can be added to your cart, the tool asks you to tick
                a single box that reads:
              </p>
              <p className="mt-4 rounded-2xl border border-line bg-mist px-5 py-4 text-sm font-medium leading-relaxed text-ink">
                {CUSTOM_APPROVAL_LABEL}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-slate">
                That box is not a formality. It is the moment your design becomes the
                specification we print to. Once it is ticked and the shirt is in your
                cart, the artwork, its position, its size, its rotation, the shirt style,
                the color, the size and the print placement are all locked to what you saw
                in the preview.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-slate">
                So spend a moment there. Read the text on your design back to yourself
                letter by letter, because a misspelled name is the single most common
                problem on custom orders and it is one we cannot catch for you. Check the
                design against both a light and a dark shirt if you are undecided on
                color. Confirm the print placement is on the side you meant.
              </p>
            </div>

            <div className="rounded-3xl border border-line bg-card p-6 shadow-[var(--shadow-soft)] sm:p-8">
              <h2 className="font-display text-xl font-bold tracking-tight text-ink">
                How this differs from standard returns
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate">
                Everything else in the store carries our standard {RETURN_WINDOW_DAYS} day
                returns. If a jacket does not fit or a dress is not what you pictured, you
                contact us within {RETURN_WINDOW_DAYS} days of delivery with the item
                unworn and tagged, and we arrange the return or exchange.
              </p>

              <div className="mt-6 overflow-hidden rounded-2xl border border-line">
                <table className="w-full text-left text-sm">
                  <caption className="sr-only">
                    Standard products compared with custom printed shirts
                  </caption>
                  <thead className="bg-mist text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                    <tr>
                      <th scope="col" className="px-4 py-3">Situation</th>
                      <th scope="col" className="px-4 py-3">Standard item</th>
                      <th scope="col" className="px-4 py-3">Custom shirt</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {[
                      ["Changed your mind", "Return within 7 days", "Not returnable"],
                      ["Wrong size chosen", "Exchange within 7 days", "Not returnable"],
                      ["Arrived damaged", "Replaced or refunded", "Reprinted or refunded"],
                      ["Defective product", "Replaced or refunded", "Reprinted or refunded"],
                      ["Wrong item sent", "Replaced or refunded", "Reprinted or refunded"],
                    ].map((row) => (
                      <tr key={row[0]}>
                        <th scope="row" className="px-4 py-3 font-medium text-ink">
                          {row[0]}
                        </th>
                        <td className="px-4 py-3 text-slate">{row[1]}</td>
                        <td className="px-4 py-3 text-slate">{row[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-slate">
                For the full store wide terms, see our{" "}
                <Link
                  href="/terms-and-conditions"
                  className="font-semibold text-brand hover:text-brand-deep"
                >
                  terms and conditions
                </Link>
                .
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/custom-shirts/design" variant="primary" size="lg">
              Back To The Design Tool
              <Icon name="arrowRight" size={18} />
            </Button>
            <Button href="/custom-shirts/upload-guidelines" variant="outline" size="lg">
              Upload Guidelines
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
