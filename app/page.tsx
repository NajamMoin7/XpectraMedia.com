import type { Metadata } from "next";
import Image from "next/image";

import { Hero } from "@/components/home/Hero";
import { HomeRecentlyViewed } from "@/components/home/HomeRecentlyViewed";
import { PromoBanner } from "@/components/home/PromoBanner";
import { ShopByStyle } from "@/components/home/ShopByStyle";
import { Testimonials } from "@/components/home/Testimonials";
import { WhyShopWithUs } from "@/components/home/WhyShopWithUs";
import { CategoryCard } from "@/components/product/CategoryCard";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import { SectionHeading } from "@/components/ui/PageBanner";
import { Reveal } from "@/components/ui/Reveal";
import { categories } from "@/lib/categories";
import {
  countByCategory,
  getBestSellers,
  getFeaturedProducts,
  getNewArrivals,
  getProductsByCategory,
} from "@/lib/products";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Xpectra Media | Modern Clothing, Baby Essentials and Toys Online",
  description:
    "Shop modern everyday fashion at Xpectra Media. Clothing for men, women and kids, baby essentials, creative toys and custom shirts online printed with your own logo, with free shipping over $75, easy 7 day returns and secure checkout.",
  path: "/",
  keywords: [
    "online clothing store",
    "men clothing online",
    "women clothing online",
    "kids clothes online",
    "baby essentials online",
    "creative toys online",
    "custom shirts online",
    "custom logo shirts",
    "design your own shirt",
    "free shipping fashion",
  ],
});

/** Short proof points shown beside the custom shirt pitch. */
const CUSTOM_HIGHLIGHTS = [
  "Upload a logo and preview it instantly",
  "Tees, polos, long sleeve and sweatshirts",
  "Order one shirt or a full team run",
  "Bulk pricing at 10, 25 and 50 shirts",
];

export default function HomePage() {
  const trending = getBestSellers(4);
  const featured = getFeaturedProducts(4);
  const bestSellers = getBestSellers(8);
  const newArrivals = getNewArrivals(4);
  const kidsPicks = getProductsByCategory("kids").slice(0, 4);
  const babyPicks = getProductsByCategory("baby").slice(0, 4);
  const toyPicks = getProductsByCategory("toys").slice(0, 4);

  return (
    <>
      <Hero />

      {/* Trending now */}
      <section className="border-y border-line bg-mist py-16 md:py-20">
        <div className="shell">
          <SectionHeading
            eyebrow="Trending Now"
            title="What everyone is wearing this week"
            description="The pieces moving fastest across the store right now, chosen by customers rather than by us."
            action={
              <Button href="/products?sort=popularity" variant="outline">
                View All Best Sellers
                <Icon name="arrowRight" size={16} />
              </Button>
            }
          />
          <div className="mt-12">
            <ProductGrid products={trending} />
          </div>
        </div>
      </section>

      {/* Shop by style */}
      <section className="shell py-16 md:py-20">
        <SectionHeading
          centered
          eyebrow="Shop by Style"
          title="Four ways to build a wardrobe"
          description="Edits grouped by how you actually dress, from the basics that carry a whole week to the layers you reach for on a cool morning."
        />
        <div className="mt-12">
          <ShopByStyle />
        </div>
      </section>

      {/* Featured collections */}
      <section className="border-y border-line bg-mist py-16 md:py-20">
        <div className="shell">
          <SectionHeading
            eyebrow="Featured Collections"
            title="Six departments, one checkout"
            description="Everything is organized around how families really shop, so clothing, baby essentials, toys and custom shirts can travel in the same order."
            action={
              <Button href="/categories" variant="outline">
                All Collections
                <Icon name="arrowRight" size={16} />
              </Button>
            }
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, index) => (
              <Reveal key={category.slug} delay={index * 80} className="h-full">
                <CategoryCard
                  title={category.name}
                  description={category.tagline}
                  image={category.image}
                  href={category.href}
                  count={countByCategory(category.slug)}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Custom shirts feature band */}
      <section className="shell py-16 md:py-20">
        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-line bg-card shadow-[var(--shadow-soft)]">
            <div className="grid lg:grid-cols-2">
              {/* Pitch */}
              <div className="order-2 flex flex-col justify-center px-6 py-12 sm:px-10 lg:order-1 lg:py-16">
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-line bg-brand-tint px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-deep">
                  <Icon name="sparkle" size={14} className="text-brand" />
                  New Department
                </span>

                <h2 className="mt-6 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                  Create Your Custom Shirt
                </h2>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-slate">
                  Custom shirts online, printed with your own logo or artwork.
                  Upload a design, preview it on the shirt instantly, then pick
                  a style, color and size. Perfect for company logo shirts,
                  personalized shirts for a team and bulk custom shirts for an
                  event, with volume pricing that drops as the order grows.
                </p>

                <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                  {CUSTOM_HIGHLIGHTS.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-2.5 text-sm text-slate"
                    >
                      <Icon
                        name="check"
                        size={15}
                        className="mt-0.5 shrink-0 text-brand"
                      />
                      {highlight}
                    </li>
                  ))}
                </ul>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <Button href="/custom-shirts/design">
                    Design Your Own Shirt
                    <Icon name="arrowRight" size={16} />
                  </Button>
                  <Button href="/custom-shirts" variant="outline">
                    Explore Custom Shirts
                  </Button>
                </div>
              </div>

              {/* Imagery */}
              <div className="relative order-1 min-h-[20rem] lg:order-2 lg:min-h-full">
                <Image
                  src="/assets/images/custom/hero.jpg"
                  alt="A custom shirt printed with a company logo at Xpectra Media"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-night/45 via-transparent to-transparent lg:bg-gradient-to-r lg:from-night/25 lg:to-transparent"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* New season essentials */}
      <section className="shell py-16 md:py-20">
        <SectionHeading
          centered
          eyebrow="New Season Essentials"
          title="The pieces worth starting with"
          description="Fabric first picks that anchor everything else in your closet, cut for comfort and finished to last."
        />
        <div className="mt-12">
          <ProductGrid products={featured} />
        </div>
      </section>

      {/* Best sellers */}
      <section className="border-y border-line bg-mist py-16 md:py-20">
        <div className="shell">
          <SectionHeading
            eyebrow="Best Sellers"
            title="Customer favorites across every department"
            description="Eight pieces that keep selling out and coming back, rated highly by the people who wear them every day."
            action={
              <Button href="/products?sort=popularity" variant="outline">
                Shop Best Sellers
                <Icon name="arrowRight" size={16} />
              </Button>
            }
          />
          <div className="mt-12">
            <ProductGrid products={bestSellers} />
          </div>
        </div>
      </section>

      {/* New arrivals */}
      <section className="shell py-16 md:py-20">
        <SectionHeading
          eyebrow="New Arrivals"
          title="Just added to the collection"
          description="Fresh styles landing this month, from brushed cotton shirts to soft knits and new play sets."
          action={
            <Button href="/products?sort=latest" variant="outline">
              Shop New Arrivals
              <Icon name="arrowRight" size={16} />
            </Button>
          }
        />
        <div className="mt-12">
          <ProductGrid products={newArrivals} />
        </div>
      </section>

      {/* Kids favorites */}
      <section className="border-y border-line bg-mist py-16 md:py-20">
        <div className="shell">
          <SectionHeading
            eyebrow="Kids Favorites"
            title="Built for playgrounds and everything after"
            description="Soft, durable pieces that survive real childhoods and wash back to looking neat."
            action={
              <Button href="/categories/kids" variant="outline">
                Shop Kids
                <Icon name="arrowRight" size={16} />
              </Button>
            }
          />
          <div className="mt-12">
            <ProductGrid products={kidsPicks} />
          </div>
        </div>
      </section>

      {/* Baby essentials */}
      <section className="shell py-16 md:py-20">
        <SectionHeading
          eyebrow="Baby Essentials"
          title="Gentle cotton from the very first wear"
          description="Rompers, everyday sets and sleepwear designed around easy changing and skin that deserves care."
          action={
            <Button href="/categories/baby" variant="outline">
              Shop Baby
              <Icon name="arrowRight" size={16} />
            </Button>
          }
        />
        <div className="mt-12">
          <ProductGrid products={babyPicks} />
        </div>
      </section>

      {/* Creative toys */}
      <section className="border-y border-line bg-mist py-16 md:py-20">
        <div className="shell">
          <SectionHeading
            eyebrow="Creative Toys"
            title="Play that rewards imagination"
            description="Open ended wooden sets, soft companions and activity toys chosen for safety and genuine play value."
            action={
              <Button href="/categories/toys" variant="outline">
                Shop Toys
                <Icon name="arrowRight" size={16} />
              </Button>
            }
          />
          <div className="mt-12">
            <ProductGrid products={toyPicks} />
          </div>
        </div>
      </section>

      <PromoBanner />

      {/* Why customers choose us */}
      <section className="border-y border-line bg-mist py-16 md:py-20">
        <div className="shell">
          <SectionHeading
            centered
            eyebrow="Why Customers Choose Us"
            title="Built around trust, not guesswork"
            description="Every part of the Xpectra Media experience is designed to remove the doubt that usually comes with shopping online."
          />
          <div className="mt-12">
            <WhyShopWithUs />
          </div>
        </div>
      </section>

      {/* Customer reviews */}
      <section className="shell py-16 md:py-20">
        <SectionHeading
          centered
          eyebrow="Customer Reviews"
          title="What our customers say"
          description="Verified feedback from shoppers across the United States, alongside the piece they actually bought."
        />
        <div className="mt-12">
          <Testimonials />
        </div>
      </section>

      <HomeRecentlyViewed />

      {/* Newsletter */}
      <section className="shell py-16 md:py-20">
        <Reveal>
          <div className="brand-wash relative overflow-hidden rounded-3xl border border-line bg-card px-6 py-14 text-center shadow-[var(--shadow-soft)] sm:px-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-20 -top-24 h-72 w-72 rounded-full bg-brand/10 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-brand-bright/10 blur-3xl"
            />

            <div className="relative mx-auto max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-deep shadow-[var(--shadow-soft)] backdrop-blur">
                <Icon name="mail" size={14} className="text-brand" />
                Newsletter
              </span>
              <h2 className="mt-6 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                Be first to see every new arrival
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate">
                Subscribe for seasonal collections, early access to new drops
                and offers made for the way you already shop.
              </p>
              <NewsletterForm className="mx-auto mt-8 max-w-lg text-left" />
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
