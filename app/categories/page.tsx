import type { Metadata } from "next";

import { CategoryCard } from "@/components/product/CategoryCard";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { PageBanner, SectionHeading } from "@/components/ui/PageBanner";
import { Reveal } from "@/components/ui/Reveal";
import { categories, subcategories } from "@/lib/categories";
import { countByCategory, countBySubcategory } from "@/lib/products";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Product Categories",
  description:
    "Explore every Xpectra Media category. Shop men clothing, women clothing and kids clothes across shirts, pants, trousers, kurta shalwar, baby clothes and toys online in Pakistan.",
  path: "/categories",
  keywords: [
    "product categories",
    "men clothing online",
    "women clothing online",
    "kids clothes online",
    "baby clothes in Pakistan",
    "toys online in Pakistan",
  ],
});

export default function CategoriesPage() {
  return (
    <>
      <PageBanner
        eyebrow="Browse the Store"
        title="Product Categories"
        description="Three departments and six product families, organised so you can move from a general idea to the exact piece in a couple of steps."
        crumbs={[{ name: "Categories", href: "/categories" }]}
      />

      {/* Main departments */}
      <section className="shell py-14 md:py-20">
        <SectionHeading
          eyebrow="Main Departments"
          title="Shop by who you are buying for"
          description="Start with the person, then narrow down by the type of piece you need."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {categories.map((category, index) => (
            <Reveal key={category.slug} delay={index * 90} className="h-full">
              <CategoryCard
                title={category.name}
                description={category.description}
                image={category.image}
                href={category.href}
                count={countByCategory(category.slug)}
                buttonLabel={`Explore ${category.name}`}
                priority={index === 0}
              />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Product families */}
      <section className="border-y border-line-soft bg-ink-soft py-14 md:py-20">
        <div className="shell">
          <SectionHeading
            eyebrow="Product Types"
            title="Shop by what you are looking for"
            description="Every product family we stock, from everyday shirts and trousers to festive kurta shalwar sets, baby clothes and toys."
            action={
              <Button href="/products" variant="outline">
                View All Products
                <Icon name="arrowRight" size={16} />
              </Button>
            }
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {subcategories.map((sub, index) => (
              <Reveal key={sub.slug} delay={index * 70} className="h-full">
                <CategoryCard
                  title={sub.name}
                  description={sub.description}
                  image={sub.image}
                  href={`/products?type=${sub.slug}`}
                  count={countBySubcategory(sub.slug)}
                  buttonLabel={`Shop ${sub.name}`}
                />
              </Reveal>
            ))}
          </div>

          {/* Availability summary keeps the relationship between the two
              groupings obvious for customers and for search engines. */}
          <Reveal>
            <div className="mt-12 rounded-2xl border border-line-soft bg-surface p-7">
              <h3 className="font-display text-lg font-semibold text-white">
                Where each product type is available
              </h3>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {subcategories.map((sub) => (
                  <li
                    key={sub.slug}
                    className="flex items-start gap-3 rounded-xl border border-line-soft bg-surface-2 px-4 py-3 text-sm"
                  >
                    <Icon name="check" size={15} className="mt-0.5 shrink-0 text-brand" />
                    <span>
                      <span className="block font-semibold text-white">{sub.name}</span>
                      <span className="mt-0.5 block capitalize text-mist">
                        {sub.categories.join(", ")}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
