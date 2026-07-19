import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { categories } from "@/lib/categories";

export const metadata: Metadata = {
  title: "Page Not Found",
  description:
    "The page you are looking for is not available. Browse the Xpectra Media collections for men, women and kids instead.",
  robots: { index: false, follow: true },
};

/** Shown for any route that does not exist, and by notFound() calls. */
export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 80% at 50% 0%, rgba(30,144,255,0.18) 0%, rgba(4,7,12,0) 65%)",
        }}
      />

      <div className="shell relative grid min-h-[68vh] place-items-center py-20 text-center">
        <div className="mx-auto max-w-xl">
          <p className="font-display text-[5rem] font-bold leading-none text-gradient sm:text-[7rem]">
            404
          </p>

          <h1 className="mt-4 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
            We could not find that page
          </h1>

          <p className="mt-4 text-base leading-relaxed text-mist">
            The link may be out of date, or the page may have moved. Everything
            in the store is still one click away, so let us get you back to
            shopping.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button href="/" size="lg">
              <Icon name="arrowLeft" size={17} />
              Return to Home
            </Button>
            <Button href="/products" size="lg" variant="outline">
              Browse All Products
            </Button>
          </div>

          {/* Quick routes back into the catalogue */}
          <div className="mt-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mist-dim">
              Popular destinations
            </p>
            <ul className="mt-5 flex flex-wrap items-center justify-center gap-3">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={category.href}
                    className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-2.5 text-sm text-mist transition-all hover:border-brand hover:text-white"
                  >
                    {category.name}
                    <Icon name="arrowRight" size={14} />
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-2.5 text-sm text-mist transition-all hover:border-brand hover:text-white"
                >
                  Contact Us
                  <Icon name="arrowRight" size={14} />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
