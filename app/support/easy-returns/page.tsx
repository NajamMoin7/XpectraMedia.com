import { ReturnRequestForm } from "@/components/support/ReturnRequestForm";
import {
  SupportCard,
  SupportLayout,
  SupportList,
  SupportNotice,
  SupportSection,
  SupportSteps,
} from "@/components/support/SupportLayout";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { buildMetadata } from "@/lib/seo";
import { RETURN_WINDOW_DAYS, site } from "@/lib/site";
import type { Faq } from "@/lib/types";

export const metadata = buildMetadata({
  title: "Easy Returns",
  description:
    "Returns are accepted within 7 days of delivery at Xpectra Media. Read the eligibility rules, see which products cannot be returned, follow the eight step return process and start your return request online.",
  path: "/support/easy-returns",
  keywords: [
    "easy returns",
    "7 day returns",
    "return policy",
    "return request",
    "refund or replacement",
  ],
});

const { contact } = site;

const RETURN_HEADLINE = `Returns are accepted within ${RETURN_WINDOW_DAYS} days of delivery.`;

const faqs: Faq[] = [
  {
    question: "How long do I have to request a return?",
    answer: `${RETURN_HEADLINE} The window starts on the day your parcel is delivered, so please check your order as soon as it arrives and contact us straight away if anything is wrong.`,
  },
  {
    question: "Can I return a custom printed shirt?",
    answer:
      "Custom printed shirts and personalized products cannot be returned because they are made to your artwork and cannot be resold. The only exception is a genuine printing fault or a manufacturing defect, which we will always put right.",
  },
  {
    question: "Do I need to keep the tags and packaging?",
    answer:
      "Yes. Products must come back unused, unworn and unwashed with their original tags still attached and in their original packaging. Removing a tag or washing a product makes it ineligible for return.",
  },
  {
    question: "Can I ship my return back without approval?",
    answer:
      "Please do not. Every return must be approved first so that we can issue the correct return address and log your parcel against your order. Products sent back without approval may not be accepted or refunded.",
  },
  {
    question: "How long does a refund take once my return is received?",
    answer:
      "Your product is inspected first against the eligibility rules on this page. Inspection usually takes 2 to 3 business days from the day your parcel reaches us, and your refund or replacement is arranged as soon as it passes.",
  },
  {
    question: "What if my product arrived damaged?",
    answer:
      "Contact us within the return window with your order number and clear photographs of the damage and the packaging. Damage that happened before delivery is our responsibility and we will arrange a replacement or a refund for you.",
  },
];

const eligibility = [
  `The return is requested within ${RETURN_WINDOW_DAYS} days of delivery.`,
  "The product is unused and has not been worn beyond trying it on.",
  "The product has not been washed, dried or treated in any way.",
  "The original tags are still attached and undamaged.",
  "The product is returned in its original packaging.",
  "The order number from your confirmation is provided with the request.",
  "The product is a standard catalogue item and was not customized for you.",
];

const nonReturnable = [
  "Custom printed shirts made to your own artwork.",
  "Personalized products carrying a name, a date or a private message.",
  "Products that have been used or worn beyond trying them on.",
  "Products that have been washed or laundered.",
  "Damage caused by the customer after delivery.",
  "Products returned without their original tags attached.",
  `Products returned after the ${RETURN_WINDOW_DAYS} day window has closed.`,
  "Final sale products where that is clearly stated on the product page.",
];

const steps = [
  {
    title: "Contact customer support",
    detail: `Start your return by contacting our team, either through the request form on this page, by email at ${contact.email} or by phone on ${contact.phone}. Please get in touch within ${RETURN_WINDOW_DAYS} days of delivery.`,
  },
  {
    title: "Provide the order number",
    detail:
      "Give us the order number from your confirmation. It lets us pull up exactly what you bought, which size and color was sent and the date your parcel was delivered.",
  },
  {
    title: "Explain the return reason",
    detail:
      "Tell us why the product is coming back and add photographs if the product is damaged, faulty or clearly not what you ordered. Clear photographs almost always speed up a decision.",
  },
  {
    title: "Wait for return approval",
    detail:
      "Our team checks your request against the eligibility rules and replies within one business day. Approved requests come with a return reference and the return address to use.",
  },
  {
    title: "Pack the product securely",
    detail:
      "Place the product back in its original packaging with the tags attached, and use an outer box or mailer strong enough to protect it in transit. Include a note with your order number inside the parcel.",
  },
  {
    title: "Ship to the approved return address",
    detail:
      "Send the parcel only to the address we give you in your approval message. Use a service that gives you proof of postage, and keep that proof until your return has been processed.",
  },
  {
    title: "Wait for inspection",
    detail:
      "Once your parcel reaches us we inspect the product against the eligibility rules. Inspection usually takes 2 to 3 business days, and we contact you with the outcome either way.",
  },
  {
    title: "Receive the approved refund or replacement",
    detail:
      "If your return passes inspection we arrange the solution you chose. Replacements are dispatched subject to availability, and refunds are arranged through our support team using the details on your order.",
  },
];

export default function EasyReturnsPage() {
  return (
    <SupportLayout
      eyebrow="Customer support"
      title="Easy Returns"
      path="/support/easy-returns"
      description="Something not right? Our returns process is short, clearly written and handled by real people. Here is exactly what qualifies, what does not and how to start your return."
      highlights={[
        {
          icon: "clock",
          label: "Return window",
          value: `${RETURN_WINDOW_DAYS} days from delivery`,
        },
        { icon: "checkCircle", label: "Approval reply", value: "One business day" },
        { icon: "refresh", label: "Solutions", value: "Refund or replacement" },
        { icon: "shield", label: "Inspection", value: "2 to 3 business days" },
      ]}
      action={
        <Button href="#return-request" size="lg">
          <Icon name="refresh" size={18} />
          Start My Return
        </Button>
      }
      faqs={faqs}
      faqDescription="The questions customers ask most about returning a product to Xpectra Media."
      contactNote={`Not sure whether your product qualifies? Send us your order number and a short description and we will tell you before you pack anything. Returns must be requested within ${RETURN_WINDOW_DAYS} days of delivery.`}
    >
      {/* Headline policy */}
      <section className="bg-canvas pt-14 md:pt-18">
        <div className="shell">
          <SupportNotice icon="clock" title="Our return window">
            <p className="text-base font-semibold text-ink">{RETURN_HEADLINE}</p>
            <p className="mt-3">
              The {RETURN_WINDOW_DAYS} day window starts on the day your parcel
              is delivered. Please open your order and check the size, color and
              condition of everything inside as soon as it arrives, so there is
              plenty of time to contact us if something is not right.
            </p>
          </SupportNotice>
        </div>
      </section>

      {/* Eligibility */}
      <SupportSection
        eyebrow="Before you request"
        title="What qualifies for a return"
        description="Every condition below must be met for a return to be approved. They exist so that returned products can be checked properly and, where possible, offered to another customer."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-line bg-card p-7 shadow-[var(--shadow-soft)]">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-tint text-brand">
                <Icon name="checkCircle" size={20} />
              </span>
              <h3 className="font-display text-lg font-bold tracking-tight text-ink">
                Return eligibility
              </h3>
            </div>
            <SupportList className="mt-5" items={eligibility} />
          </div>

          <div className="rounded-3xl border border-line bg-card p-7 shadow-[var(--shadow-soft)]">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-mist-2 text-sale">
                <Icon name="close" size={20} />
              </span>
              <h3 className="font-display text-lg font-bold tracking-tight text-ink">
                Non returnable products
              </h3>
            </div>
            <SupportList className="mt-5" tone="sale" icon="close" items={nonReturnable} />
            <p className="mt-5 border-t border-line pt-4 text-xs leading-relaxed text-muted">
              A genuine manufacturing fault or a printing error on a custom
              product is always our responsibility, whatever this list says.
              Contact us with photographs and we will make it right.
            </p>
          </div>
        </div>
      </SupportSection>

      {/* Process */}
      <SupportSection
        tone="mist"
        eyebrow="The full process"
        title="Eight steps from request to resolution"
        description="Follow these steps in order. Skipping the approval step is the most common reason a return runs into trouble."
      >
        <SupportSteps steps={steps} />
      </SupportSection>

      {/* Refund and replacement */}
      <SupportSection
        eyebrow="Your outcome"
        title="Refunds and replacements"
        description="Choose the solution that suits you when you raise your request. You can change your mind before your parcel is shipped back to us."
      >
        <div className="grid gap-5 md:grid-cols-3">
          <SupportCard icon="wallet" title="Refunds">
            <p>
              An approved refund covers the price you paid for the returned
              product. Because orders are paid by Cash on Delivery, our support
              team arranges your refund with you directly using the contact
              details on your order.
            </p>
            <p className="mt-3">
              Refunds are arranged once your product has passed inspection,
              which usually takes 2 to 3 business days after your parcel reaches
              us.
            </p>
          </SupportCard>

          <SupportCard icon="refresh" title="Replacements">
            <p>
              A replacement sends you the same product again in the size and
              color you expected, subject to stock. If your size has sold out we
              will tell you promptly and offer a refund instead.
            </p>
            <p className="mt-3">
              Replacements are processed and shipped using the same processing
              and delivery timings as a new order.
            </p>
          </SupportCard>

          <SupportCard icon="truck" title="Return shipping">
            <p>
              Send your approved return only to the address given in your
              approval message. Use a service with proof of postage and keep the
              receipt until your return is settled.
            </p>
            <p className="mt-3">
              If a product reached you damaged, faulty or simply wrong, tell us
              and we will cover the cost of putting it right.
            </p>
          </SupportCard>
        </div>
      </SupportSection>

      {/* Form */}
      <section id="return-request" className="scroll-mt-24 border-y border-line bg-mist py-16 md:py-20">
        <div className="shell">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-brand">
              Request a return
            </p>
            <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Send us your return request
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate">
              Complete the form below and our customer support team will review
              your request and reply within one business day with an approval
              decision and, if approved, the return address to use.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-3xl">
            <ReturnRequestForm />
          </div>
        </div>
      </section>
    </SupportLayout>
  );
}
