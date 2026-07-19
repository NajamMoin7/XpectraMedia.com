import type { Metadata } from "next";

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
    "Shop modern everyday fashion at Xpectra Media. Clothing for men, women and kids, plus baby essentials and creative toys, with free shipping over $75, easy 30 day returns and secure checkout.",
  path: "/",
  keywords: [
    "online clothing store",
    "men clothing online",
    "women clothing online",
    "kids clothes online",
    "baby essentials online",
    "creative toys online",
    "free shipping fashion",
  ],
});

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
            title="Five departments, one checkout"
            description="Everything is organized around how families really shop, so clothing, baby essentials and toys can travel in the same order."
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
                  wide={index === 4}
                />
              </Reveal>
            ))}
          </div>
        </div>
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
