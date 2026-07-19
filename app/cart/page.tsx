import { CartView } from "@/components/cart/CartView";
import { PageBanner } from "@/components/ui/PageBanner";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Shopping Cart",
  description:
    "Review the items in your Xpectra Media shopping cart, update quantities, check your subtotal and delivery charges, then continue to checkout with Cash on Delivery across Pakistan.",
  path: "/cart",
  keywords: [
    "shopping cart",
    "Xpectra Media cart",
    "online shopping in Pakistan",
    "Cash on Delivery Pakistan",
    "free delivery in Pakistan",
  ],
});

export default function CartPage() {
  return (
    <>
      <PageBanner
        eyebrow="Your Selection"
        title="Shopping Cart"
        description="Check your items, adjust quantities and review your total before you place the order. Delivery is free on every order of PKR 5,000 and above."
        crumbs={[{ name: "Shopping Cart", href: "/cart" }]}
      />

      <section className="shell py-12 md:py-16">
        <CartView />
      </section>
    </>
  );
}
