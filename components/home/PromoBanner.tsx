import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

const HIGHLIGHTS = [
  "Kids clothing and toys in one order",
  "Seasonal fabrics chosen for Pakistani weather",
  "Free delivery once your order reaches PKR 5,000",
];

/** Seasonal promotional band linking through to the products page. */
export function PromoBanner() {
  return (
    <section className="shell py-16 md:py-20">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-line bg-surface">
          {/* Brand wash */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(115deg, rgba(11,99,197,0.35) 0%, rgba(4,7,12,0.9) 48%, rgba(4,7,12,0.98) 100%)",
            }}
          />

          <div className="relative grid gap-10 p-8 sm:p-12 lg:grid-cols-2 lg:items-center lg:p-14">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-bright">
                <Icon name="sparkle" size={14} />
                Seasonal Edit
              </span>

              <h2 className="mt-6 font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
                Upgrade Your Family&apos;s Style
              </h2>

              <p className="mt-5 max-w-lg text-base leading-relaxed text-mist">
                One order can dress the whole household. Refresh your own
                wardrobe, sort the school week for the children, and add a toy
                worth keeping, all with Cash on Delivery at your door.
              </p>

              <ul className="mt-7 space-y-3">
                {HIGHLIGHTS.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3 text-sm text-mist">
                    <Icon
                      name="check"
                      size={16}
                      className="mt-0.5 shrink-0 text-brand"
                    />
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
            <div className="grid grid-cols-2 gap-4">
              <PromoTile
                src="/assets/images/categories/kids.svg"
                alt="Kids clothing collection at Xpectra Media"
                className="aspect-[4/5]"
              />
              <PromoTile
                src="/assets/images/categories/toys.svg"
                alt="Toys collection at Xpectra Media"
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
      className={`relative overflow-hidden rounded-2xl border border-line-soft bg-ink ${className}`}
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
