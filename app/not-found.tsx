import type { Metadata } from "next";
import { NavLink } from "@/components/ui/NavLink";

import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { categories } from "@/lib/categories";

export const metadata: Metadata = {
  title: "Page Not Found",
  description:
    "The page you are looking for is not available. Browse the Xpectra Media collections for men, women, kids, baby and toys instead.",
  robots: { index: false, follow: true },
};

/** Shown for any route that does not exist, and by notFound() calls. */
export default function NotFound() {
  return (
    <section className="brand-wash relative overflow-hidden bg-canvas">
      <div className="shell relative grid min-h-[68vh] place-items-center py-20 text-center">
        <div className="mx-auto max-w-xl animate-fade-up">
          <p className="text-gradient font-display text-[5rem] font-bold leading-none sm:text-[7rem]">
            404
          </p>

          <h1 className="mt-4 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            We could not find that page
          </h1>

          <p className="mt-4 text-base leading-relaxed text-slate">
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
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Popular destinations
            </p>
            <ul className="mt-5 flex flex-wrap items-center justify-center gap-3">
              {categories.map((category) => (
                <li key={category.slug}>
                  <NavLink
                    href={category.href}
                    className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-5 py-2.5 text-sm font-medium text-slate shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-0.5 hover:border-brand hover:text-brand"
                  >
                    {category.name}
                    <Icon name="arrowRight" size={14} />
                  </NavLink>
                </li>
              ))}
              <li>
                <NavLink
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-5 py-2.5 text-sm font-medium text-slate shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-0.5 hover:border-brand hover:text-brand"
                >
                  Contact Us
                  <Icon name="arrowRight" size={14} />
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
