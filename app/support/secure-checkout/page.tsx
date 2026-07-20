import {
  SupportCard,
  SupportLayout,
  SupportList,
  SupportNotice,
  SupportSection,
  SupportSteps,
} from "@/components/support/SupportLayout";
import { Button } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import type { Faq } from "@/lib/types";

export const metadata = buildMetadata({
  title: "Secure Checkout",
  description:
    "Understand how checkout works at Xpectra Media. See how your information is handled, how the form is validated, how you review your order, how Cash on Delivery works and how our support team helps if something goes wrong.",
  path: "/support/secure-checkout",
  keywords: [
    "secure checkout",
    "Cash on Delivery",
    "checkout help",
    "order confirmation",
    "Xpectra Media checkout",
  ],
});

const { contact } = site;

const CARD_NOTICE =
  "Online card payment is currently unavailable. Please use Cash on Delivery to complete your order.";

const faqs: Faq[] = [
  {
    question: "Which payment methods can I use right now?",
    answer: `${CARD_NOTICE} You pay the courier in full when your parcel reaches your door, so nothing is charged before your order arrives.`,
  },
  {
    question: "Do you collect or store my card details?",
    answer:
      "No. We do not collect card numbers, expiry dates or security codes anywhere on this website today, and there is no card field in the checkout form. Because no card data is entered, none is stored by us.",
  },
  {
    question: "Why can I not move past a step in the checkout form?",
    answer:
      "A required field is either empty or does not match the expected format. The first field with a problem is highlighted, receives focus and shows a short message underneath it explaining exactly what needs fixing.",
  },
  {
    question: "Can I check my total before I confirm the order?",
    answer:
      "Yes. The review step lists every product with its size, color, quantity and line total, followed by the subtotal, the shipping charge for the method you selected and the final order total. Nothing is placed until you confirm on that screen.",
  },
  {
    question: "What happens straight after I place my order?",
    answer:
      "An order confirmation is generated for you immediately, showing your order number, the products ordered, your delivery address, your chosen shipping method and your order total. Keep the order number safe, because it is the fastest way for our team to find your order.",
  },
  {
    question: "Will card payment be added later?",
    answer:
      "Yes, we plan to add online card payment. When it launches you will pick card as a payment method, be taken to a payment step operated by a certified payment provider and complete the payment there. Card details will be handled by that provider rather than by this website.",
  },
];

const trustCards: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "lock",
    title: "Private by design",
    body: "The details you type at checkout are used for one purpose only, which is delivering your order. We never sell your information and we never pass it to advertisers.",
  },
  {
    icon: "shield",
    title: "No card data collected",
    body: "There is no card number field anywhere on this website. Because we do not ask for card details, we hold none, which removes the risk of card data being exposed.",
  },
  {
    icon: "checkCircle",
    title: "Reviewed before it is placed",
    body: "You see a complete summary of products, quantities, address, shipping method and total, and nothing is submitted until you confirm on that final screen.",
  },
  {
    icon: "wallet",
    title: "Cash on Delivery",
    body: "You pay the courier when your parcel arrives. No money leaves your hands before the order is in them, which keeps every purchase low risk.",
  },
  {
    icon: "truck",
    title: "Clear shipping charges",
    body: "The shipping method and its charge are shown before you confirm, so the order total on your confirmation is the exact amount you pay at the door.",
  },
  {
    icon: "headset",
    title: "Real people on support",
    body: "If anything about checkout looks wrong, our support team answers every message personally and within one business day.",
  },
];

const checkoutSteps = [
  {
    title: "Enter your contact details",
    detail:
      "Give us your full name, email address and phone number. The phone number matters most, because the courier uses it to reach you on the day of delivery.",
  },
  {
    title: "Enter your delivery address",
    detail:
      "Add your street address, any apartment or unit number, your city, your state and your ZIP code. Please read it back to yourself before continuing, since the courier follows it exactly as written.",
  },
  {
    title: "Choose a shipping method",
    detail:
      "Pick standard or express shipping. The charge for the method you select is added to your subtotal straight away so the total on screen is always current.",
  },
  {
    title: "Review your order",
    detail:
      "Check every product with its size, color and quantity, then check your address, your shipping method and your order total. Anything that looks wrong can still be changed.",
  },
  {
    title: "Confirm with Cash on Delivery",
    detail:
      "Select Cash on Delivery and place the order. Your order confirmation is generated immediately with your order number and a full summary.",
  },
];

export default function SecureCheckoutSupportPage() {
  return (
    <SupportLayout
      eyebrow="Customer support"
      title="Secure Checkout"
      path="/support/secure-checkout"
      description="A plain English explanation of what happens at checkout: which details we ask for and why, how the form checks your entries, how you review your order and how Cash on Delivery works."
      highlights={[
        { icon: "wallet", label: "Payment method", value: "Cash on Delivery" },
        { icon: "shield", label: "Card details", value: "Not collected today" },
        { icon: "checkCircle", label: "Order review", value: "Before you confirm" },
        { icon: "headset", label: "Support reply", value: "One business day" },
      ]}
      action={
        <>
          <Button href="/cart" size="lg">
            <Icon name="cart" size={18} />
            Go to My Cart
          </Button>
          <Button href={contact.phoneHref} variant="outline" size="lg">
            <Icon name="phone" size={16} />
            Call {contact.phone}
          </Button>
        </>
      }
      faqs={faqs}
      faqDescription="Payment, validation and order confirmation questions answered for the Xpectra Media checkout."
      contactNote="Stuck at checkout? Tell us which step you reached, what the screen said and the email address you were using. We will get your order placed with you."
    >
      {/* Payment notice */}
      <section className="bg-canvas pt-14 md:pt-18">
        <div className="shell">
          <SupportNotice icon="wallet" title="Please read before you check out">
            <p className="text-base font-semibold text-ink">{CARD_NOTICE}</p>
            <p className="mt-3">
              Cash on Delivery is the only payment method available today. You
              pay the courier the full order total in cash when your parcel is
              handed to you, so nothing at all is charged in advance.
            </p>
          </SupportNotice>
        </div>
      </section>

      {/* Trust cards */}
      <SupportSection
        eyebrow="What keeps checkout safe"
        title="How we protect you at checkout"
        description="Security here is mostly about what we do not do. We ask for the smallest amount of information that will get your parcel to your door, and we do not touch payment card data at all."
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {trustCards.map((card) => (
            <SupportCard key={card.title} icon={card.icon} title={card.title}>
              {card.body}
            </SupportCard>
          ))}
        </div>
      </SupportSection>

      {/* Information handling */}
      <SupportSection
        tone="mist"
        eyebrow="Your information"
        title="What we ask for and why"
        description="Every field in the checkout form exists for a practical reason. Here is what each one is used for."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-line bg-card p-6 shadow-[var(--shadow-soft)]">
            <h3 className="font-display text-lg font-bold tracking-tight text-ink">
              The details we collect
            </h3>
            <dl className="mt-5 flex flex-col gap-4">
              {[
                {
                  term: "Full name",
                  detail:
                    "Printed on the shipping label so the courier knows who to hand the parcel to.",
                },
                {
                  term: "Email address",
                  detail:
                    "Used for order related messages and so our support team can reply to you in writing.",
                },
                {
                  term: "Phone number",
                  detail:
                    "Used by the courier to arrange delivery and to call you if your address needs clarifying.",
                },
                {
                  term: "Delivery address",
                  detail:
                    "Street, unit, city, state and ZIP code. This is copied onto the label exactly as you type it.",
                },
                {
                  term: "Order notes",
                  detail:
                    "Optional. Useful for gate codes, building instructions or a safe place to leave the parcel.",
                },
              ].map((row) => (
                <div key={row.term} className="border-b border-line pb-4 last:border-0 last:pb-0">
                  <dt className="font-display text-sm font-semibold text-ink">
                    {row.term}
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-slate">
                    {row.detail}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="flex flex-col gap-5">
            <SupportCard icon="lock" title="How your details are handled">
              <p>
                Your order details are used to prepare, pack and deliver your
                parcel and to answer any support question you raise about it.
                Delivery information is shared with the courier carrying your
                parcel because there is no other way to get it to you.
              </p>
              <p className="mt-3">
                We do not sell your details, we do not pass them to advertisers
                and we do not add you to a marketing list without you asking for
                it.
              </p>
            </SupportCard>

            <SupportCard icon="shield" title="A plain statement about cards">
              <p>
                No card details are collected on this website today. There is no
                field for a card number, an expiry date or a security code, and
                no card information is processed or stored by Xpectra Media.
              </p>
              <p className="mt-3">
                If any page or message ever asks you for card details for an
                Xpectra Media order, please do not enter them and contact our
                support team instead.
              </p>
            </SupportCard>
          </div>
        </div>
      </SupportSection>

      {/* Checkout flow */}
      <SupportSection
        eyebrow="Step by step"
        title="Moving through checkout"
        description="Checkout is short and every step can be revisited before your order is placed."
      >
        <SupportSteps steps={checkoutSteps} />
      </SupportSection>

      {/* Validation */}
      <SupportSection
        tone="mist"
        eyebrow="Getting it right first time"
        title="How checkout validation works"
        description="The form checks your entries in the browser as you go, so mistakes are caught before your order is placed rather than after."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-line bg-card p-6 shadow-[var(--shadow-soft)]">
            <h3 className="font-display text-lg font-bold tracking-tight text-ink">
              What is checked
            </h3>
            <SupportList
              className="mt-4"
              items={[
                "Every required field must be filled in before the order can be placed.",
                "Your email address must follow a valid pattern such as name@example.com",
                "Your phone number must contain enough digits to be a reachable contact number.",
                "Your ZIP code must be a plausible United States postal code.",
                "A state must be chosen from the list rather than typed freely.",
                "A shipping method must be selected so the total can be calculated.",
                "Your cart must contain at least one product.",
              ]}
            />
          </div>

          <div className="flex flex-col gap-5">
            <SupportCard icon="checkCircle" title="What happens when something is wrong">
              <p>
                Any field that needs attention is outlined, described to screen
                readers as invalid and given a short message underneath telling
                you what to change. The page moves focus to the first field with
                a problem so you never have to hunt for it.
              </p>
              <p className="mt-3">
                Correcting the field clears its message straight away. Nothing
                you have already typed is lost while you fix it.
              </p>
            </SupportCard>
            <SupportCard icon="eye" title="Verifying your totals">
              <p>
                The order summary stays beside you through checkout and updates
                the moment anything changes. Compare the subtotal against your
                cart, check the shipping charge matches the method you selected
                and confirm the order total is what you expect to hand over on
                delivery.
              </p>
            </SupportCard>
          </div>
        </div>
      </SupportSection>

      {/* Payment and confirmation */}
      <SupportSection
        eyebrow="Payment and confirmation"
        title="Cash on Delivery and your order confirmation"
        description="How you pay today, how card payment will work in the future and what you receive once the order is placed."
      >
        <div className="grid gap-5 md:grid-cols-3">
          <SupportCard icon="wallet" title="Cash on Delivery today">
            <p>
              Choose Cash on Delivery at checkout and place your order. Please
              have the exact order total ready in cash, since couriers may not
              carry change.
            </p>
            <p className="mt-3">
              Payment is made to the courier at the door when your parcel is
              handed over. The amount due is always the order total shown on
              your confirmation, with nothing added afterwards.
            </p>
          </SupportCard>

          <SupportCard icon="lock" title="Card payment in the future" badge="Coming Soon">
            <p>
              We are working towards accepting card payment. When it is
              available, card will appear as a payment option, and choosing it
              will hand you to a certified payment provider to complete the
              payment on their secure page.
            </p>
            <p className="mt-3">
              Card details will be entered with that provider and will not be
              collected or stored by this website. Until then, please use Cash
              on Delivery.
            </p>
          </SupportCard>

          <SupportCard icon="checkCircle" title="Your order confirmation">
            <p>
              As soon as your order is placed, a confirmation is generated
              showing your order number, the products with sizes, colors and
              quantities, your delivery address, your shipping method, the
              shipping charge and your order total.
            </p>
            <p className="mt-3">
              Save or screenshot your order number. Quoting it lets our support
              team pull up your order without any back and forth.
            </p>
          </SupportCard>
        </div>
      </SupportSection>

      {/* Support for checkout issues */}
      <SupportSection
        tone="mist"
        eyebrow="If something goes wrong"
        title="How support can help with checkout"
        description="Most checkout problems are solved in a single message. Here is what we can do for you."
      >
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="rounded-3xl border border-line bg-card p-6 shadow-[var(--shadow-soft)]">
            <h3 className="font-display text-lg font-bold tracking-tight text-ink">
              We can help you
            </h3>
            <SupportList
              className="mt-4"
              items={[
                "Work out why a field keeps rejecting what you have typed.",
                "Correct a delivery address before your parcel leaves us.",
                "Explain a shipping charge or an order total you were not expecting.",
                "Find your order again if you closed the confirmation too quickly.",
                "Change a shipping method while your order is still being processed.",
                "Cancel an order that has not yet been handed to the courier.",
              ]}
            />
          </div>

          <div className="rounded-3xl border border-line bg-card p-6 shadow-[var(--shadow-soft)]">
            <h3 className="font-display text-lg font-bold tracking-tight text-ink">
              Please include these details
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate">
              The more you tell us in your first message, the faster we can fix
              it for you.
            </p>
            <SupportList
              className="mt-4"
              items={[
                "Your order number if the order was placed.",
                "The email address and phone number you used at checkout.",
                "The step of checkout where the problem appeared.",
                "The exact wording of any message shown on screen.",
                "The device and browser you are using.",
              ]}
            />
            <div className="mt-6 flex flex-col gap-3 border-t border-line pt-5 sm:flex-row">
              <Button href={contact.emailHref} variant="outline" size="md">
                <Icon name="mail" size={16} />
                Email support
              </Button>
              <Button href={contact.phoneHref} variant="outline" size="md">
                <Icon name="phone" size={16} />
                Call support
              </Button>
            </div>
          </div>
        </div>
      </SupportSection>
    </SupportLayout>
  );
}
