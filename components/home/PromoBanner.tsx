import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

const HIGHLIGHTS = [
  "Free shipping on every order over $75",
  "Easy 7 day returns with free return shipping on your first return",
  "Clothing, baby essentials and toys in a single order",
];

/** Seasonal promotional band linking through to the products page. */
export function PromoBanner() {
  return (
    <section className="shell py-16 md:py-20">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-line bg-mist shadow-[var(--shadow-soft)]">
          {/* Soft blue gradient wash */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(115deg, rgba(234,243,255,0.95) 0%, rgba(255,255,255,0.9) 45%, rgba(219,236,255,0.9) 100%)",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-20 -top-24 h-72 w-72 rounded-full bg-brand/10 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 right-10 h-72 w-72 rounded-full bg-brand-bright/10 blur-3xl"
          />

          <div className="relative grid gap-10 p-8 sm:p-12 lg:grid-cols-2 lg:items-center lg:p-14">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-deep shadow-[var(--shadow-soft)] backdrop-blur">
                <Icon name="sparkle" size={14} className="text-brand" />
                Seasonal Edit
              </span>

              <h2 className="mt-6 font-display text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl lg:text-[2.6rem]">
                Refresh the whole wardrobe in one order
              </h2>

              <p className="mt-5 max-w-lg text-base leading-relaxed text-slate">
                Layer up your own everyday rotation, restock the pieces the kids
                outgrow fastest, and add a toy worth keeping. One cart, one
                secure checkout, one delivery.
              </p>

              <ul className="mt-7 space-y-3">
                {HIGHLIGHTS.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-3 text-sm text-slate"
                  >
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-tint text-brand">
                      <Icon name="check" size={12} />
                    </span>
                    {highlight}
                  </li>
                ))}
              </ul>

              <div className="mt-9 flex flex-wrap gap-3">
                <Button href="/products" size="lg">
                  Shop the Collection
                  <Icon name="arrowRight" size={18} />
                </Button>
                <Button href="/categories/kids" size="lg" variant="outline">
                  Kids and Toys
                </Button>
              </div>
            </div>

            {/* Imagery */}
            <div className="grid grid-cols-2 gap-4 sm:gap-5">
              <PromoTile
                src="/assets/images/categories/women.jpg"
                alt="Everyday women clothing from the seasonal edit"
                className="aspect-[4/5]"
              />
              <PromoTile
                src="/assets/images/categories/kids.jpg"
                alt="Kids clothing and toys from the seasonal edit"
                className="mt-8 aspect-[4/5]"
              />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function PromoTile({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-line bg-mist shadow-[var(--shadow-lift)] ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 45vw, 260px"
        className="object-cover"
      />
    </div>
  );
}
