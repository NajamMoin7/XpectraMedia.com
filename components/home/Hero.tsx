import Image from "next/image";
import { NavLink } from "@/components/ui/NavLink";

import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

/** Trust points shown under the hero calls to action. */
const TRUST = [
  { icon: "truck" as const, label: "Free shipping over $75" },
  { icon: "refresh" as const, label: "Easy 7 day returns" },
  { icon: "lock" as const, label: "Secure checkout" },
];

/** Small floating cards layered over the hero photography. */
const FLOATING = [
  {
    href: "/categories/women",
    image: "/assets/images/categories/dresses.jpg",
    label: "Women",
    caption: "New season dresses",
    position: "left-[-1.25rem] top-8 sm:left-[-2rem]",
    delay: "0s",
  },
  {
    href: "/categories/toys",
    image: "/assets/images/categories/wooden-toys.jpg",
    label: "Toys",
    caption: "Wooden play sets",
    position: "right-[-0.75rem] top-1/2 sm:right-[-1.75rem]",
    delay: "1.2s",
  },
  {
    href: "/categories/baby",
    image: "/assets/images/categories/rompers.jpg",
    label: "Baby",
    caption: "Organic cotton",
    position: "bottom-10 left-4 sm:left-8",
    delay: "2.4s",
  },
];

/**
 * Home page hero.
 * A light editorial layout: headline and calls to action on the left, real
 * lifestyle photography on the right with small floating category cards
 * drifting over the imagery.
 */
export function Hero() {
  return (
    <section className="brand-wash relative overflow-hidden bg-canvas">
      {/* Decorative blurred brand shapes */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-40 h-96 w-96 rounded-full bg-brand/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-1/3 h-80 w-80 rounded-full bg-brand-bright/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-brand-tint/70 blur-3xl"
      />

      <div className="shell relative grid items-center gap-14 py-16 md:py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-24">
        {/* Copy */}
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-deep shadow-[var(--shadow-soft)] backdrop-blur">
              <Icon name="sparkle" size={14} className="text-brand" />
              New season collection is live
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.06] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              Modern Style for{" "}
              <span className="text-gradient">Every Moment</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate sm:text-lg">
              Explore thoughtfully selected clothing, baby essentials, and toys
              designed for everyday comfort, confidence, and creativity.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button href="/products?sort=latest" size="lg">
                Shop New Arrivals
                <Icon name="arrowRight" size={18} />
              </Button>
              <Button href="/categories" size="lg" variant="outline">
                Explore Collections
              </Button>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <ul className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3">
              {TRUST.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center gap-2 text-sm font-medium text-slate"
                >
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-brand-tint text-brand">
                    <Icon name={item.icon} size={16} />
                  </span>
                  {item.label}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={400}>
            <div className="mt-10 flex items-center gap-4 rounded-3xl border border-line bg-card px-5 py-4 shadow-[var(--shadow-soft)] sm:max-w-sm">
              <span className="flex items-center gap-0.5" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((star) => (
                  <Icon
                    key={star}
                    name="star"
                    size={16}
                    filled
                    className="text-amber-400"
                  />
                ))}
              </span>
              <span>
                <span className="block font-display text-sm font-bold text-ink">
                  Rated 4.8 out of 5
                </span>
                <span className="block text-xs text-muted">
                  From 40,000 plus happy customers
                </span>
              </span>
            </div>
          </Reveal>
        </div>

        {/* Imagery */}
        <Reveal delay={200} className="relative">
          <div className="relative grid grid-cols-5 gap-4 sm:gap-5">
            <div className="col-span-3">
              <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-line bg-mist shadow-[var(--shadow-lift)]">
                <Image
                  src="/assets/images/hero/main.jpg"
                  alt="Woman wearing a relaxed everyday outfit from the new season collection"
                  fill
                  priority
                  sizes="(max-width: 1024px) 55vw, 340px"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="col-span-2 flex flex-col justify-end">
              <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-line bg-mist shadow-[var(--shadow-lift)]">
                <Image
                  src="/assets/images/hero/secondary.jpg"
                  alt="Soft cotton pieces styled together for a comfortable weekend look"
                  fill
                  priority
                  sizes="(max-width: 1024px) 35vw, 220px"
                  className="object-cover"
                />
              </div>

              <div className="mt-4 rounded-3xl border border-line bg-card p-4 shadow-[var(--shadow-soft)] sm:mt-5">
                <p className="font-display text-2xl font-bold text-ink">1,500</p>
                <p className="mt-1 text-xs leading-relaxed text-muted">
                  Quality pieces across five departments
                </p>
              </div>
            </div>

            {/* Floating cards drifting over the photography */}
            {FLOATING.map((card) => (
              <NavLink
                key={card.label}
                href={card.href}
                style={{ animationDelay: card.delay }}
                className={`animate-float glass absolute z-10 hidden items-center gap-3 rounded-2xl border border-line px-3 py-2.5 shadow-[var(--shadow-lift)] transition-transform duration-300 hover:scale-105 sm:flex ${card.position}`}
              >
                <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl bg-mist">
                  <Image
                    src={card.image}
                    alt=""
                    aria-hidden="true"
                    fill
                    sizes="44px"
                    className="object-cover"
                  />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-ink">
                    {card.label}
                  </span>
                  <span className="block text-xs text-muted">{card.caption}</span>
                </span>
              </NavLink>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
