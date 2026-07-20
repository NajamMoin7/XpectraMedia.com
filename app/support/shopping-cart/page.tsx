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
import { formatPrice } from "@/lib/format";
import { buildMetadata } from "@/lib/seo";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_RATE } from "@/lib/site";
import type { Faq } from "@/lib/types";

export const metadata = buildMetadata({
  title: "Shopping Cart Guide",
  description:
    "Learn how the Xpectra Media shopping cart works. Add products, choose your size and color, update quantities, remove items, understand how cart totals and shipping charges are calculated and see how your cart is saved in your own browser.",
  path: "/support/shopping-cart",
  keywords: [
    "shopping cart guide",
    "how to use the cart",
    "update cart quantity",
    "cart totals",
    "Xpectra Media cart help",
  ],
});

const faqs: Faq[] = [
  {
    question: "Will my shopping cart still be there when I come back later?",
    answer:
      "Yes. Your cart is stored in your own browser using localStorage, so it is still waiting for you when you return on the same device and the same browser. It does not travel with you to a different device, and clearing your browsing data or using private browsing will empty it.",
  },
  {
    question: "Can I change the size or color of a product already in my cart?",
    answer:
      "Size and color are chosen on the product page, so each combination becomes its own cart line. To switch, remove the line you no longer want and add the product again with the size and color you prefer.",
  },
  {
    question: "Why do I see the same product twice in my cart?",
    answer:
      "A cart line is unique to the product, size and color you picked. If you added a medium blue tee and a large blue tee, both appear as separate lines so you can set the quantity of each one independently.",
  },
  {
    question: "How is my cart total worked out?",
    answer: `Each line is multiplied by its quantity to give the subtotal. Shipping is then added, and standard shipping is free once your subtotal reaches ${formatPrice(FREE_SHIPPING_THRESHOLD)}. Below that the standard charge is ${formatPrice(SHIPPING_RATE)}.`,
  },
  {
    question: "Do you accept discount codes at the moment?",
    answer:
      "Not yet. There is no discount code field in the cart today. When promotional codes launch, a code box will appear above the order summary and any saving will be shown as its own line before the total.",
  },
  {
    question: "Does adding a product to my cart reserve stock for me?",
    answer:
      "No. Products are only allocated when your order is placed at checkout, so a popular size can sell out while it sits in your cart. If you have set your heart on something, it is best to complete checkout promptly.",
  },
];

const steps = [
  {
    title: "Open the product page",
    detail:
      "Browse a category or use search, then open the product you like to see the full gallery, fabric details, sizing notes and price.",
  },
  {
    title: "Choose your size",
    detail:
      "Pick a size from the size selector. Sizes that are out of stock are shown as unavailable, and the size guide on the product page helps you compare measurements before you commit.",
  },
  {
    title: "Choose your color",
    detail:
      "Select a color swatch. The gallery updates so you can see exactly what you are ordering, and the color you pick is carried through to the cart and the order summary.",
  },
  {
    title: "Set the quantity and add to cart",
    detail:
      "Use the quantity stepper to choose how many you want, then select Add to Cart. A confirmation appears and the cart counter in the header updates straight away.",
  },
];

const cartActions = [
  {
    icon: "plus" as const,
    title: "Increase a quantity",
    body: "Use the plus control on a cart line to add another unit. The line total, the subtotal and the order total all recalculate immediately.",
  },
  {
    icon: "minus" as const,
    title: "Reduce a quantity",
    body: "The minus control lowers the quantity one step at a time. Reducing a line to zero removes it from your cart entirely.",
  },
  {
    icon: "trash" as const,
    title: "Remove a product",
    body: "Every line has a remove control. Removing a line takes it out of the cart at once and updates your totals, and you can always add the product again from its product page.",
  },
  {
    icon: "refresh" as const,
    title: "Keep shopping",
    body: "Continue browsing at any time. Your cart stays intact as you move around the store, so you can gather everything you want before you check out.",
  },
];

export default function ShoppingCartSupportPage() {
  return (
    <SupportLayout
      eyebrow="Customer support"
      title="Shopping Cart Guide"
      path="/support/shopping-cart"
      description="Everything you need to know about building your Xpectra Media cart: adding products, picking a size and color, adjusting quantities, reading your totals and moving through to checkout."
      highlights={[
        { icon: "cart", label: "Cart storage", value: "Saved in your browser" },
        { icon: "truck", label: "Standard shipping", value: formatPrice(SHIPPING_RATE) },
        {
          icon: "gift",
          label: "Free shipping from",
          value: formatPrice(FREE_SHIPPING_THRESHOLD),
        },
        { icon: "wallet", label: "Payment", value: "Cash on Delivery" },
      ]}
      action={
        <>
          <Button href="/cart" size="lg">
            <Icon name="cart" size={18} />
            View My Cart
          </Button>
          <Button href="/products" variant="outline" size="lg">
            Browse Products
            <Icon name="arrowRight" size={16} />
          </Button>
        </>
      }
      faqs={faqs}
      faqDescription="The questions our customers ask most often about building and managing a cart at Xpectra Media."
      contactNote="If a product will not add to your cart, a quantity refuses to update or your totals look wrong, tell us what you are seeing and which browser you are using. We will walk you through it."
    >
      {/* Adding products */}
      <SupportSection
        eyebrow="Getting started"
        title="How to add a product to your cart"
        description="Adding a product takes four short steps, and every choice you make on the product page is carried through to your cart and your order summary."
      >
        <SupportSteps steps={steps} />
      </SupportSection>

      {/* Managing the cart */}
      <SupportSection
        tone="mist"
        eyebrow="Managing your cart"
        title="Update quantities and remove products"
        description="Your cart page lists every product you have chosen, with its image, size, color, unit price, quantity and line total. Each line can be changed on its own."
      >
        <div className="grid gap-5 sm:grid-cols-2">
          {cartActions.map((action) => (
            <SupportCard key={action.title} icon={action.icon} title={action.title}>
              {action.body}
            </SupportCard>
          ))}
        </div>
      </SupportSection>

      {/* Totals */}
      <SupportSection
        eyebrow="Your money"
        title="How your cart total is calculated"
        description="There are no surprise charges. Your total is built from the products you chose plus the shipping method applied at checkout."
      >
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div className="rounded-3xl border border-line bg-card p-6 shadow-[var(--shadow-soft)]">
            <h3 className="font-display text-lg font-bold tracking-tight text-ink">
              The order summary line by line
            </h3>
            <dl className="mt-5 flex flex-col gap-4">
              <div className="border-b border-line pb-4">
                <dt className="font-display text-sm font-semibold text-ink">
                  Line total
                </dt>
                <dd className="mt-1 text-sm leading-relaxed text-slate">
                  The unit price of a product multiplied by the quantity on that
                  line. A tee at {formatPrice(24.99)} with a quantity of two
                  shows a line total of {formatPrice(49.98)}.
                </dd>
              </div>
              <div className="border-b border-line pb-4">
                <dt className="font-display text-sm font-semibold text-ink">
                  Subtotal
                </dt>
                <dd className="mt-1 text-sm leading-relaxed text-slate">
                  Every line total added together. This is the figure used to
                  decide whether your order qualifies for free standard
                  shipping.
                </dd>
              </div>
              <div className="border-b border-line pb-4">
                <dt className="font-display text-sm font-semibold text-ink">
                  Shipping
                </dt>
                <dd className="mt-1 text-sm leading-relaxed text-slate">
                  Standard shipping is {formatPrice(SHIPPING_RATE)} and becomes
                  free once your subtotal reaches{" "}
                  {formatPrice(FREE_SHIPPING_THRESHOLD)}. Express shipping is a
                  flat rate on every order and is chosen at checkout.
                </dd>
              </div>
              <div>
                <dt className="font-display text-sm font-semibold text-ink">
                  Order total
                </dt>
                <dd className="mt-1 text-sm leading-relaxed text-slate">
                  Subtotal plus shipping. This is the amount you pay on delivery,
                  and it is the figure repeated on your order confirmation.
                </dd>
              </div>
            </dl>
          </div>

          <div className="flex flex-col gap-5">
            <SupportCard icon="truck" title="Where shipping appears">
              Your cart shows the standard shipping charge so you always know
              where you stand, along with a message telling you how much more
              you need to spend to reach free standard shipping. If you upgrade
              to express shipping at checkout, the summary updates before you
              confirm your order.
            </SupportCard>
            <SupportCard icon="tag" title="Discount codes in the future" badge="Coming Soon">
              Discount codes are not accepted yet, so you will not find a code
              field in the cart today. When they arrive, you will enter your
              code above the order summary, we will check that it is valid and
              still active, and any saving will appear as its own clearly
              labelled line between the subtotal and the total. Only one code
              will apply per order.
            </SupportCard>
          </div>
        </div>
      </SupportSection>

      {/* Storage */}
      <SupportSection
        tone="mist"
        eyebrow="Privacy and storage"
        title="How your cart is saved"
        description="Your cart lives on your own device. Nothing about it is sent to a server while you shop."
      >
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <SupportNotice icon="lock" title="Your cart never leaves your browser">
            <p>
              Xpectra Media saves your cart using localStorage, a small storage
              area built into your web browser. The products, sizes, colors and
              quantities you choose are written there and read back when you
              return to the store.
            </p>
            <p className="mt-3">
              We do not copy your cart to a server, we do not share it with any
              third party, and no account is needed to keep it.
            </p>
          </SupportNotice>

          <div className="rounded-3xl border border-line bg-card p-6 shadow-[var(--shadow-soft)]">
            <h3 className="font-display text-lg font-bold tracking-tight text-ink">
              What that means in practice
            </h3>
            <SupportList
              className="mt-4"
              items={[
                "Your cart survives a page refresh, a closed tab and even a restarted computer.",
                "Your cart is tied to one browser on one device, so a cart built on a laptop will not appear on a phone.",
                "Private or incognito windows forget the cart as soon as the window is closed.",
                "Clearing your browsing data or site storage empties the cart permanently.",
                "Because nothing is uploaded, no one at Xpectra Media can see your cart until you place an order.",
              ]}
            />
          </div>
        </div>
      </SupportSection>

      {/* Checkout and empty cart */}
      <SupportSection
        eyebrow="Next steps"
        title="Checking out and the empty cart"
        description="When you are happy with your selection, checkout is one step away. And if your cart is empty, you are only ever a click from the catalogue."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <SupportCard icon="checkCircle" title="Proceeding to checkout">
            <p>
              Select Proceed to Checkout on the cart page. You will be asked for
              your delivery details, you will choose a shipping method, and you
              will see a final review of every product, the subtotal, the
              shipping charge and the order total before anything is confirmed.
            </p>
            <p className="mt-3">
              Nothing is placed until you confirm on that final review, so you
              can go back to your cart and adjust it at any point.
            </p>
          </SupportCard>

          <SupportCard icon="cart" title="When your cart is empty">
            <p>
              An empty cart shows a friendly message rather than a blank page,
              along with a shortcut back to the full product catalogue and to
              our most popular categories.
            </p>
            <p className="mt-3">
              Your cart may be empty because you have not added anything yet,
              because you removed the last line, because you completed an order
              and the cart was cleared, or because your browser storage was
              cleared.
            </p>
          </SupportCard>
        </div>

        <div className="mt-8 flex flex-col items-center gap-4 rounded-3xl border border-line bg-brand-tint p-7 text-center shadow-[var(--shadow-soft)] sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="font-display text-lg font-bold tracking-tight text-ink">
              Ready to review your selection?
            </p>
            <p className="mt-1 text-sm leading-relaxed text-slate">
              Open your cart to check sizes, colors, quantities and your running
              total before you check out.
            </p>
          </div>
          <Button href="/cart" size="lg" className="sm:shrink-0">
            <Icon name="cart" size={18} />
            View My Cart
          </Button>
        </div>
      </SupportSection>
    </SupportLayout>
  );
}
