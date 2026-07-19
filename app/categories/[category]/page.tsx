import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProductGrid } from "@/components/product/ProductGrid";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { PageBanner, SectionHeading } from "@/components/ui/PageBanner";
import { Reveal } from "@/components/ui/Reveal";
import { categories, getCategory, subcategoriesFor } from "@/lib/categories";
import { getProductsByCategory } from "@/lib/products";
import { buildMetadata } from "@/lib/seo";
import type { CategorySlug } from "@/lib/types";

/**
 * Editorial copy per department. The highlight list names the specific
 * product types customers search for inside each category.
 */
const CATEGORY_CONTENT: Record<
  CategorySlug,
  { intro: string; highlights: string[]; seoTitle: string; seoDescription: string }
> = {
  men: {
    intro:
      "Menswear at Xpectra Media is built around pieces that get worn constantly rather than pieces that look good once. Breathable cotton for the summer months, structured formal fabrics that hold a press through a working day, and traditional sets cut generously enough to sit comfortably through a long celebration.",
    highlights: [
      "Men's Shirts",
      "Casual Shirts",
      "Formal Shirts",
      "Men's Pants",
      "Men's Trousers",
      "Men's Kurta Shalwar",
    ],
    seoTitle: "Men Clothing Online in Pakistan",
    seoDescription:
      "Shop men clothing online in Pakistan at Xpectra Media. Casual shirts, formal shirts, chino pants, tailored trousers and kurta shalwar sets with Cash on Delivery nationwide.",
  },
  women: {
    intro:
      "Womenswear here starts with the fabric. Fine lawn and fluid rayon for the hottest part of the year, structured blends that keep their shape through the working week, and festive pieces with embroidery worked carefully enough to be worth keeping season after season.",
    highlights: [
      "Women's Shirts",
      "Women's Trousers",
      "Women's Pants",
      "Women's Kurta Shalwar",
      "Casual Wear",
      "Traditional Wear",
    ],
    seoTitle: "Women Clothing Online in Pakistan",
    seoDescription:
      "Shop women clothing online in Pakistan at Xpectra Media. Lawn shirts, rayon casual wear, straight and palazzo trousers, stretch pants and festive kurta shalwar sets with Cash on Delivery.",
  },
  kids: {
    intro:
      "Everything in the kids department has to survive real life: school weeks, play, growth spurts and a great deal of washing. Soft cottons that stay gentle on young skin, adjustable waists that buy an extra season, and toys chosen for safety as carefully as for play value.",
    highlights: [
      "Boys Shirts",
      "Girls Shirts",
      "Kids Pants",
      "Kids Trousers",
      "Baby Clothes",
      "Baby Sets",
      "Educational Toys",
      "Soft Toys",
      "Activity Toys",
    ],
    seoTitle: "Kids Clothes, Baby Clothes and Toys Online in Pakistan",
    seoDescription:
      "Shop kids clothes online in Pakistan at Xpectra Media. Boys and girls shirts, kids pants and trousers, baby clothes, newborn sets and toys including educational, soft and activity toys.",
  },
};

/** Pre renders one page per department at build time. */
export function generateStaticParams() {
  return categories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};

  const content = CATEGORY_CONTENT[category.slug];
  return buildMetadata({
    title: content.seoTitle,
    description: content.seoDescription,
    path: `/categories/${category.slug}`,
    image: category.image,
    keywords: content.highlights.map((item) => item.toLowerCase()),
  });
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const content = CATEGORY_CONTENT[category.slug];
  const families = subcategoriesFor(category.slug);
  const allProducts = getProductsByCategory(category.slug);

  return (
    <>
      <PageBanner
        eyebrow={category.tagline}
        title={`${category.name} Collection`}
        description={category.description}
        crumbs={[
          { name: "Categories", href: "/categories" },
          { name: category.name, href: `/categories/${category.slug}` },
        ]}
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href={`/products?category=${category.slug}`}>
            Shop All {category.name}
            <Icon name="arrowRight" size={16} />
          </Button>
          <Button href="/categories" variant="outline">
            Other Categories
          </Button>
        </div>
      </PageBanner>

      {/* Introduction and product type quick links */}
      <section className="shell py-14 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-14">
          <Reveal>
            <h2 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
              What you will find in {category.name}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-mist">{content.intro}</p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {content.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-center gap-3 rounded-xl border border-line-soft bg-surface px-4 py-3 text-sm text-white"
                >
                  <Icon name="check" size={15} className="shrink-0 text-brand" />
                  {highlight}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120}>
            <div className="rounded-2xl border border-line-soft bg-surface p-7">
              <h3 className="font-display text-lg font-semibold text-white">
                Jump to a product type
              </h3>
              <p className="mt-2 text-sm text-mist">
                {allProducts.length} products available in this category.
              </p>
              <ul className="mt-6 space-y-2">
                {families.map((family) => (
                  <li key={family.slug}>
                    <Link
                      href={`#${family.slug}`}
                      className="group flex items-center justify-between rounded-xl border border-line-soft bg-surface-2 px-4 py-3 text-sm text-mist transition-all hover:border-brand hover:text-white"
                    >
                      {family.name}
                      <Icon
                        name="arrowRight"
                        size={15}
                        className="text-mist-dim transition-all group-hover:translate-x-0.5 group-hover:text-brand"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* One section per product family inside this department */}
      {families.map((family, index) => {
        const items = allProducts.filter(
          (product) => product.subcategory === family.slug,
        );
        if (items.length === 0) return null;

        return (
          <section
            key={family.slug}
            id={family.slug}
            className={`scroll-mt-28 py-14 md:py-16 ${
              index % 2 === 0 ? "border-y border-line-soft bg-ink-soft" : ""
            }`}
          >
            <div className="shell">
              <SectionHeading
                eyebrow={`${category.name} ${family.name}`}
                title={`${family.name} for ${category.name.toLowerCase()}`}
                description={family.description}
                action={
                  <Button
                    href={`/products?category=${category.slug}&type=${family.slug}`}
                    variant="outline"
                  >
                    View All
                    <Icon name="arrowRight" size={16} />
                  </Button>
                }
              />
              <div className="mt-10">
                <ProductGrid products={items} columns={4} />
              </div>
            </div>
          </section>
        );
      })}

      {/* Cross links to the other departments */}
      <section className="shell py-14 md:py-16">
        <Reveal>
          <div className="rounded-2xl border border-line-soft bg-surface p-8 text-center">
            <h2 className="font-display text-xl font-bold text-white sm:text-2xl">
              Shopping for someone else too
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-mist">
              Add pieces from any department to the same order. Delivery is free
              once your order reaches PKR 5,000.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              {categories
                .filter((other) => other.slug !== category.slug)
                .map((other) => (
                  <Button key={other.slug} href={other.href} variant="outline">
                    {other.name} Collection
                    <Icon name="arrowRight" size={16} />
                  </Button>
                ))}
              <Button href="/products">Shop Everything</Button>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
