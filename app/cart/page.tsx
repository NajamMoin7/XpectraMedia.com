import { CartView } from "@/components/cart/CartView";
import { PageBanner } from "@/components/ui/PageBanner";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Shopping Cart",
  description:
    "Review the items in your Xpectra Media shopping cart, update quantities, check your subtotal and shipping, then continue to a secure checkout with free shipping on orders over $75.",
  path: "/cart",
  keywords: [
    "shopping cart",
    "Xpectra Media cart",
    "online clothing store",
    "free shipping",
    "secure checkout",
  ],
});

export default function CartPage() {
  return (
    <>
      <PageBanner
        eyebrow="Your Selection"
        title="Shopping Cart"
        description="Check your items, adjust quantities and review your total before you place the order. Standard shipping is free on every order of $75 and above."
        crumbs={[{ name: "Shopping Cart", href: "/cart" }]}
      />

      <section className="bg-mist py-12 md:py-16">
        <div className="shell">
          <CartView />
        </div>
      </section>
    </>
  );
}
