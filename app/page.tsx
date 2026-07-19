import type { Metadata } from "next";

import { Hero } from "@/components/home/Hero";
import { PromoBanner } from "@/components/home/PromoBanner";
import { Testimonials } from "@/components/home/Testimonials";
import { WhyShopWithUs } from "@/components/home/WhyShopWithUs";
import { CategoryCard } from "@/components/product/CategoryCard";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import { SectionHeading } from "@/components/ui/PageBanner";
import { Reveal } from "@/components/ui/Reveal";
import { categories, subcategories } from "@/lib/categories";
import {
  countByCategory,
  countBySubcategory,
  getFeaturedProducts,
  getNewArrivals,
} from "@/lib/products";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Xpectra Media | Online Shopping in Pakistan for Men, Women and Kids",
  description:
    "Shop quality fashion online in Pakistan at Xpectra Media. Men clothing, women clothing, kids clothes, baby clothes and toys with Cash on Delivery and fast nationwide delivery.",
  path: "/",
  keywords: [
    "online shopping in Pakistan",
    "men clothing online",
    "women clothing online",
    "kids clothes online",
    "baby clothes in Pakistan",
    "toys online in Pakistan",
    "affordable fashion in Pakistan",
  ],
});

export default function HomePage() {
  const featured = getFeaturedProducts(8);
  const newArrivals = getNewArrivals(4);

  // The home page highlights the three departments plus two popular families.
  const babyClothes = subcategories.find((sub) => sub.slug === "baby-clothes");
  const toys = subcategories.find((sub) => sub.slug === "toys");

  return (
    <>
      <Hero />

      {/* Featured categories */}
      <section className="shell py-16 md:py-20">
        <SectionHeading
          eyebrow="Shop by Category"
          title="Find the right pieces faster"
          description="Every department is organised around how families actually shop, from formal shirts and kurta shalwar sets to school trousers, baby essentials and toys."
          action={
            <Button href="/categories" variant="outline">
              All Categories
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
                priority={index === 0}
              />
            </Reveal>
          ))}

          {babyClothes ? (
            <Reveal delay={240} className="h-full sm:col-span-2">
              <CategoryCard
                title={babyClothes.name}
                description="Gentle cotton rompers, newborn sets and warm sleep suits made for easy changing."
                image={babyClothes.image}
                href="/products?category=kids&type=baby-clothes"
                count={countBySubcategory("baby-clothes")}
                wide
              />
            </Reveal>
          ) : null}

          {toys ? (
            <Reveal delay={320} className="h-full">
              <CategoryCard
                title={toys.name}
                description="Educational wooden blocks, activity sorters and soft toys chosen for safety."
                image={toys.image}
                href="/products?category=kids&type=toys"
                count={countBySubcategory("toys")}
              />
            </Reveal>
          ) : null}
        </div>
      </section>

      {/* Featured products */}
      <section className="border-y border-line-soft bg-ink-soft py-16 md:py-20">
        <div className="shell">
          <SectionHeading
            eyebrow="Featured Products"
            title="Chosen by our customers this season"
            description="The pieces that sell fastest across every department, selected for fabric quality, fit and value."
            action={
              <Button href="/products" variant="outline">
                View All Products
                <Icon name="arrowRight" size={16} />
              </Button>
            }
          />
          <div className="mt-12">
            <ProductGrid products={featured} />
          </div>
        </div>
      </section>

      {/* New arrivals */}
      <section className="shell py-16 md:py-20">
        <SectionHeading
          eyebrow="New Arrivals"
          title="Just added to the collection"
          description="Fresh pieces added to the catalogue this month, from brushed cotton shirts to festive embroidery and new toys."
          action={
            <Button href="/products?sort=latest" variant="outline">
              Browse Latest
              <Icon name="arrowRight" size={16} />
            </Button>
          }
        />
        <div className="mt-12">
          <ProductGrid products={newArrivals} />
        </div>
      </section>

      {/* Why shop with us */}
      <section className="border-y border-line-soft bg-ink-soft py-16 md:py-20">
        <div className="shell">
          <SectionHeading
            centered
            eyebrow="Why Shop With Us"
            title="Built around trust, not guesswork"
            description="Every part of the Xpectra Media experience is designed to remove the doubt that usually comes with shopping online."
          />
          <div className="mt-12">
            <WhyShopWithUs />
          </div>
        </div>
      </section>

      <PromoBanner />

      {/* Testimonials */}
      <section className="border-y border-line-soft bg-ink-soft py-16 md:py-20">
        <div className="shell">
          <SectionHeading
            centered
            eyebrow="Customer Stories"
            title="What families across Pakistan say"
            description="Real feedback from customers in Lahore, Karachi, Islamabad and beyond."
          />
          <div className="mt-12">
            <Testimonials />
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="shell py-16 md:py-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-line bg-surface px-6 py-14 text-center sm:px-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(60% 100% at 50% 0%, rgba(30,144,255,0.20) 0%, rgba(14,19,27,0) 70%)",
              }}
            />
            <div className="relative mx-auto max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-ink/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                <Icon name="mail" size={14} />
                Newsletter
              </span>
              <h2 className="mt-6 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Be first to see every new arrival
              </h2>
              <p className="mt-4 text-base leading-relaxed text-mist">
                Subscribe for seasonal collections, kids clothing drops and
                offers made for families shopping online in Pakistan.
              </p>
              <NewsletterForm className="mx-auto mt-8 max-w-lg text-left" />
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
