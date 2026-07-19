import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { PageBanner } from "@/components/ui/PageBanner";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Checkout",
  description:
    "Complete your Xpectra Media order in one simple step. Enter your shipping details and pay with Cash on Delivery when your package arrives, anywhere in the United States.",
  path: "/checkout",
  keywords: [
    "checkout",
    "secure checkout",
    "Cash on Delivery",
    "place an order online",
    "United States shipping",
  ],
});

export default function CheckoutPage() {
  return (
    <>
      <PageBanner
        eyebrow="Almost There"
        title="Checkout"
        description="Fill in your shipping details and place your order. Payment is Cash on Delivery, so you pay only once your package is in your hands."
        crumbs={[
          { name: "Shopping Cart", href: "/cart" },
          { name: "Checkout", href: "/checkout" },
        ]}
      />

      <section className="bg-mist py-12 md:py-16">
        <div className="shell">
          <CheckoutForm />
        </div>
      </section>
    </>
  );
}
