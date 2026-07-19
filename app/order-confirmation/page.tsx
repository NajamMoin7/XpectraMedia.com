import { OrderConfirmationView } from "@/components/checkout/OrderConfirmationView";
import { PageBanner } from "@/components/ui/PageBanner";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Order Confirmation",
  description:
    "Your Xpectra Media order is confirmed. Review your order number, delivery details, estimated delivery window and Cash on Delivery payment status.",
  path: "/order-confirmation",
  keywords: [
    "order confirmation",
    "order number",
    "Cash on Delivery Pakistan",
    "delivery details",
    "online shopping in Pakistan",
  ],
});

export default function OrderConfirmationPage() {
  return (
    <>
      <PageBanner
        eyebrow="Thank You"
        title="Order Confirmation"
        description="Your order has been received. Here are the details of what you ordered and where it is going."
        crumbs={[{ name: "Order Confirmation", href: "/order-confirmation" }]}
      />

      <section className="shell py-12 md:py-16">
        <OrderConfirmationView />
      </section>
    </>
  );
}
