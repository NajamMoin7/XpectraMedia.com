import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { products } from "@/lib/products";

/** Three catalogue pieces arranged as the hero collage. */
const COLLAGE = [
  { slug: "signature-white-kurta-shalwar", label: "Kurta Shalwar for men" },
  { slug: "embroidered-lawn-shirt", label: "Embroidered lawn shirt for women" },
  { slug: "cuddly-teddy-bear-soft-toy", label: "Soft toys for kids" },
];

const TRUST = [
  { icon: "truck" as const, label: "Delivery across Pakistan" },
  { icon: "wallet" as const, label: "Cash on Delivery" },
  { icon: "refresh" as const, label: "Seven day exchange" },
];

/**
 * Home page hero. A headline block sits beside a staggered product collage
 * built from real catalogue imagery rather than a generic stock banner.
 */
export function Hero() {
  const collage = COLLAGE.map((entry) => {
    const product = products.find((item) => item.slug === entry.slug);
    return { ...entry, image: product?.images[0] ?? "", name: product?.name ?? "" };
  });

  return (
    <section className="relative overflow-hidden bg-ink">
      {/* Ambient brand glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 90% at 15% 10%, rgba(30,144,255,0.20) 0%, rgba(4,7,12,0) 60%), radial-gradient(50% 70% at 90% 80%, rgba(30,144,255,0.14) 0%, rgba(4,7,12,0) 65%)",
        }}
      />

      <div className="shell relative grid items-center gap-14 py-16 md:py-24 lg:grid-cols-2 lg:gap-12 lg:py-28">
        {/* Copy */}
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-4 py-2 text-xs font-medium text-mist backdrop-blur">
              <Icon name="sparkle" size={14} className="text-brand" />
              New season collection is live
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Style for <span className="text-gradient">Every Generation</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-mist sm:text-lg">
              Discover quality fashion, comfortable clothing, baby essentials
              and exciting toys for men, women and kids. Shop online in
              Pakistan with fabrics chosen for real weather and prices built
              for real families.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button href="/products" size="lg">
                Shop Now
                <Icon name="arrowRight" size={18} />
              </Button>
              <Button href="/categories" size="lg" variant="outline">
                Explore Categories
              </Button>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <ul className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3">
              {TRUST.map((item) => (
                <li key={item.label} className="flex items-center gap-2 text-sm text-mist">
                  <Icon name={item.icon} size={17} className="text-brand" />
                  {item.label}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Collage */}
        <Reveal delay={200} className="relative">
          <div className="grid grid-cols-2 gap-4 sm:gap-5">
            <div className="col-span-1 space-y-4 sm:space-y-5">
              <CollageTile item={collage[0]} className="aspect-[3/4]" priority />
              <CollageTile item={collage[2]} className="aspect-square" />
            </div>
            <div className="col-span-1 pt-10 sm:pt-14">
              <CollageTile item={collage[1]} className="aspect-[3/5]" priority />
            </div>
          </div>

          {/* Floating rating badge */}
          <div className="glass absolute -bottom-4 left-2 flex items-center gap-3 rounded-2xl border border-line px-4 py-3 shadow-[0_24px_50px_-30px_rgba(0,0,0,1)] sm:left-6">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand/15 text-brand">
              <Icon name="star" size={19} />
            </span>
            <span>
              <span className="block font-display text-base font-bold text-white">
                4.8 out of 5
              </span>
              <span className="block text-xs text-mist">
                From 25,000 plus happy customers
              </span>
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CollageTile({
  item,
  className,
  priority = false,
}: {
  item: { image: string; label: string; name: string };
  className: string;
  priority?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-line-soft bg-surface ${className}`}
    >
      <Image
        src={item.image}
        alt={`${item.name}, ${item.label} at Xpectra Media`}
        fill
        priority={priority}
        sizes="(max-width: 1024px) 45vw, 280px"
        className="object-cover transition-transform duration-700 ease-out hover:scale-105"
      />
      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent px-4 pb-3 pt-10 text-xs font-medium text-white">
        {item.label}
      </span>
    </div>
  );
}
