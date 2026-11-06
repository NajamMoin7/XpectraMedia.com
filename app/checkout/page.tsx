import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { PageBanner } from "@/components/ui/PageBanner";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Checkout",
  description:
    "Complete your Xpectra Media order in one simple step. Enter your shipping details and pay securely by credit or debit card, or choose Cash on Delivery, anywhere in the United States.",
  path: "/checkout",
  keywords: [
    "checkout",
    "secure checkout",
    "credit card payment",
    "Cash on Delivery",
    "place an order online",
    "United States shipping",
  ],
});

/**
 * Collect.js is served by the same gateway that processes the sale, so its
 * address is derived from POST_URL. Only the public tokenization key reaches
 * the browser. SECRET_KEY stays on the server route.
 */
function collectJsUrl(): string {
  try {
    return process.env.POST_URL ? `${new URL(process.env.POST_URL).origin}/token/Collect.js` : "";
  } catch {
    return "";
  }
}

export default function CheckoutPage() {
  return (
    <>
      <PageBanner
        eyebrow="Almost There"
        title="Checkout"
        description="Fill in your shipping details and place your order. Pay securely by card now, or choose Cash on Delivery and pay once your package is in your hands."
        crumbs={[
          { name: "Shopping Cart", href: "/cart" },
          { name: "Checkout", href: "/checkout" },
        ]}
      />

      <section className="bg-mist py-12 md:py-16">
        <div className="shell">
          <CheckoutForm
            tokenizationKey={process.env.PUBLIC_KEY ?? ""}
            collectJsUrl={collectJsUrl()}
          />
        </div>
      </section>
    </>
  );
}
