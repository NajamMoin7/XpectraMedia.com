import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { PageBanner } from "@/components/ui/PageBanner";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Checkout",
  description:
    "Complete your Xpectra Media order in one simple step. Enter your delivery details and pay with Cash on Delivery when your parcel arrives, anywhere in Pakistan.",
  path: "/checkout",
  keywords: [
    "checkout",
    "Cash on Delivery Pakistan",
    "online shopping in Pakistan",
    "place an order online",
    "home delivery in Pakistan",
  ],
});

export default function CheckoutPage() {
  return (
    <>
      <PageBanner
        eyebrow="Almost There"
        title="Checkout"
        description="Fill in your delivery details and place your order. Payment is Cash on Delivery, so you pay the courier once your parcel is in your hands."
        crumbs={[
          { name: "Shopping Cart", href: "/cart" },
          { name: "Checkout", href: "/checkout" },
        ]}
      />

      <section className="shell py-12 md:py-16">
        <CheckoutForm />
      </section>
    </>
  );
}
