import { Suspense } from "react";

import { ShirtCustomizer } from "@/components/custom/ShirtCustomizer";
import { PageBanner } from "@/components/ui/PageBanner";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Design Your Own Shirt",
  description:
    "Upload your logo or artwork, position it on the shirt, choose your style, color, size and print placement, and see a live preview before you order.",
  path: "/custom-shirts/design",
  keywords: [
    "design your own shirt",
    "upload logo on shirt",
    "custom shirt design tool",
    "personalized shirts",
    "custom logo shirts",
    "shirt preview tool",
  ],
});

/** Skeleton shown while the client side tool loads. */
function CustomizerFallback() {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="aspect-[520/660] w-full max-w-[430px] animate-pulse rounded-3xl border border-line bg-mist" />
      <div className="flex flex-col gap-6">
        {[0, 1, 2].map((block) => (
          <div
            key={block}
            className="h-56 animate-pulse rounded-3xl border border-line bg-mist"
          />
        ))}
      </div>
    </div>
  );
}

export default function CustomShirtDesignPage() {
  return (
    <>
      <PageBanner
        eyebrow="Customization Tool"
        title="Design Your Own Shirt"
        description="Upload your design, place it exactly where you want it, and watch the preview update as you go. Choose your shirt style, color, size, quantity and print placement, then add your finished shirt straight to your cart."
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Custom Shirts", href: "/custom-shirts" },
          { name: "Design Your Own Shirt", href: "/custom-shirts/design" },
        ]}
      />

      <section className="bg-canvas py-12 md:py-16">
        <div className="shell">
          <Suspense fallback={<CustomizerFallback />}>
            <ShirtCustomizer />
          </Suspense>
        </div>
      </section>
    </>
  );
}
