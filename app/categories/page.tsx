import type { Metadata } from "next";

import { CategoryCard } from "@/components/product/CategoryCard";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { PageBanner, SectionHeading } from "@/components/ui/PageBanner";
import { Reveal } from "@/components/ui/Reveal";
import { categories, getSubcategory, subcategories } from "@/lib/categories";
import { countByCategory, countBySubcategory } from "@/lib/products";
import { buildMetadata } from "@/lib/seo";
import type { CategorySlug, SubcategorySlug } from "@/lib/types";

export const metadata: Metadata = buildMetadata({
  title: "Product Categories",
  description:
    "Explore every Xpectra Media department. Shop men's clothing, women's clothing, kids clothing, baby clothing and toys across tees, shirts, denim, dresses, hoodies, jackets, rompers, sleepwear and wooden toys.",
  path: "/categories",
  keywords: [
    "product categories",
    "men's clothing online",
    "women's clothing online",
    "kids clothing online",
    "baby clothing online",
    "toys online",
  ],
});

/** Human readable department names used by the availability summary. */
const DEPARTMENT_NAMES: Record<CategorySlug, string> = {
  men: "Men",
  women: "Women",
  kids: "Kids",
  baby: "Baby",
  toys: "Toys",
};

/**
 * Product families grouped by what the piece actually is, so a customer who
 * knows the garment rather than the department still lands in one step.
 */
const FAMILY_GROUPS: {
  title: string;
  description: string;
  slugs: SubcategorySlug[];
}[] = [
  {
    title: "Tops and Tees",
    description:
      "The layer closest to you. Heavyweight cotton tees, crisp shirts, soft knits and everyday tops that carry the rest of the outfit.",
    slugs: ["t-shirts", "shirts", "tops", "sweatshirts", "sweaters"],
  },
  {
    title: "Denim and Bottoms",
    description:
      "Denim with real stretch, clean twill pants, utility cargos and fluid wide leg shapes cut for a full day of wear.",
    slugs: ["jeans", "pants", "cargo-pants", "wide-leg-pants"],
  },
  {
    title: "Layers and Outerwear",
    description:
      "Brushed fleece hoodies, bomber and denim jackets and light cardigans for the weeks when the forecast cannot decide.",
    slugs: ["hoodies", "jackets", "outerwear"],
  },
  {
    title: "Dresses and Activewear",
    description:
      "Easy casual dresses in fabrics that move, plus seamless activewear sets with genuine compression and a smooth finish.",
    slugs: ["dresses", "activewear"],
  },
  {
    title: "Kids Sets",
    description:
      "Matching sets that take the thinking out of a school morning and hold up through recess, sport and everything after.",
    slugs: ["jogger-sets", "denim-sets", "casual-wear"],
  },
  {
    title: "Baby Essentials",
    description:
      "Soft cotton rompers, layered gift sets, gentle sleepwear and the small accessories a first wardrobe actually needs.",
    slugs: ["rompers", "cotton-sets", "sleepwear", "accessories"],
  },
  {
    title: "The Toy Shop",
    description:
      "Educational sets, solid wood classics, plush companions and open ended building toys chosen for safety and play value.",
    slugs: [
      "educational-toys",
      "wooden-toys",
      "soft-toys",
      "activity-toys",
      "creative-toys",
    ],
  },
];

export default function CategoriesPage() {
  return (
    <>
      <PageBanner
        eyebrow="Browse the Store"
        title="Product Categories"
        description="Five departments and twenty six product families, organized so you can move from a general idea to the exact piece in a couple of steps."
        crumbs={[{ name: "Categories", href: "/categories" }]}
      />

      {/* Main departments */}
      <section className="shell py-14 md:py-20">
        <SectionHeading
          eyebrow="Main Departments"
          title="Shop by who you are buying for"
          description="Start with the person, then narrow down by the type of piece you need."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                wide={index === 3}
              />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Product families, grouped by the kind of piece */}
      <section className="border-y border-line bg-mist py-14 md:py-20">
        <div className="shell">
          <SectionHeading
            eyebrow="Product Types"
            title="Shop by what you are looking for"
            description="Every product family we carry, gathered into groups so a specific search takes one click rather than three."
            action={
              <Button href="/products" variant="outline">
                View All Products
                <Icon name="arrowRight" size={16} />
              </Button>
            }
          />

          <div className="mt-12 space-y-14">
            {FAMILY_GROUPS.map((group) => (
              <div key={group.title}>
                <div className="max-w-2xl">
                  <h3 className="font-display text-xl font-bold tracking-tight text-ink sm:text-2xl">
                    {group.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate">
                    {group.description}
                  </p>
                </div>

                <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {group.slugs.map((slug, index) => {
                    const sub = getSubcategory(slug);
                    if (!sub) return null;
                    return (
                      <Reveal key={slug} delay={index * 70} className="h-full">
                        <CategoryCard
                          title={sub.name}
                          description={sub.description}
                          image={sub.image}
                          href={`/products?type=${sub.slug}`}
                          count={countBySubcategory(sub.slug)}
                          buttonLabel={`Shop ${sub.name}`}
                        />
                      </Reveal>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Availability summary keeps the relationship between the two
          groupings obvious for customers and for search engines. */}
      <section className="shell py-14 md:py-20">
        <Reveal>
          <div className="rounded-3xl border border-line bg-card p-7 shadow-[var(--shadow-soft)] md:p-9">
            <h2 className="font-display text-xl font-bold tracking-tight text-ink sm:text-2xl">
              Where each product type is available
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate">
              Several families run across more than one department, so a filter
              on the products page will show every version we carry.
            </p>

            <ul className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {subcategories.map((sub) => (
                <li
                  key={sub.slug}
                  className="flex items-start gap-3 rounded-2xl border border-line bg-mist px-4 py-3 text-sm"
                >
                  <Icon name="check" size={15} className="mt-0.5 shrink-0 text-brand" />
                  <span>
                    <span className="block font-semibold text-ink">{sub.name}</span>
                    <span className="mt-0.5 block text-slate">
                      {sub.categories
                        .map((slug) => DEPARTMENT_NAMES[slug])
                        .join(", ")}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>
    </>
  );
}
