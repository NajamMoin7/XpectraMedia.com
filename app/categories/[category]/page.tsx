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
import { FREE_SHIPPING_THRESHOLD } from "@/lib/site";
import type { CategorySlug } from "@/lib/types";

/**
 * Editorial copy per department. The highlight list names the specific
 * product families customers search for inside each category.
 */
const CATEGORY_CONTENT: Record<
  CategorySlug,
  {
    intro: string;
    note: string;
    highlights: string[];
    seoTitle: string;
    seoDescription: string;
  }
> = {
  men: {
    intro:
      "Menswear at Xpectra Media is built around the pieces that leave the closet every week rather than the ones that photograph well once. Heavyweight cotton tees cut a little longer through the body, premium shirts that stay presentable from a morning meeting through a late dinner, and denim with enough stretch to sit comfortably without losing its shape by Thursday.",
    note:
      "The layering runs the same way. Brushed fleece hoodies and loopback sweatshirts hold their weight through a full season of washing, cargo pants carry what you need without adding bulk, and the jackets are trimmed close enough to wear over a shirt or a knit. Sizes run from XS through XXL and every fabric is chosen for how it behaves after a dozen wears, not on the first day.",
    highlights: [
      "T Shirts",
      "Shirts",
      "Jeans",
      "Pants",
      "Cargo Pants",
      "Hoodies",
      "Jackets",
      "Sweatshirts",
    ],
    seoTitle: "Men's Clothing Online",
    seoDescription:
      "Shop men's clothing online at Xpectra Media. Heavyweight cotton tees, premium shirts, stretch denim, chino and cargo pants, fleece hoodies, sweatshirts and jackets, with free shipping over $75 and 30 day returns.",
  },
  women: {
    intro:
      "Womenswear here starts with how a fabric falls. Everyday tops in breathable knits that keep their neckline, casual dresses cut to move with you rather than hang stiffly, and high rise wide leg pants with a drape that lengthens whatever you pair them with. Nothing needs an occasion to justify it.",
    note:
      "Around those sit the pieces that make an outfit work: fine gauge and chunky sweaters in yarns picked for softness, denim and jackets that layer cleanly over a knit, and seamless activewear sets with real compression and flat seams that stay quiet through a workout. Colors are built to combine, so most of the department can be worn together without any planning.",
    highlights: [
      "Tops",
      "Dresses",
      "Wide Leg Pants",
      "Jeans",
      "Sweaters",
      "Hoodies",
      "Jackets",
      "Activewear",
    ],
    seoTitle: "Women's Clothing Online",
    seoDescription:
      "Shop women's clothing online at Xpectra Media. Everyday tops, casual dresses, high rise wide leg pants, stretch denim, knit sweaters, hoodies, jackets and seamless activewear, with free shipping over $75.",
  },
  kids: {
    intro:
      "Everything in the kids department has to survive a real childhood: school weeks, playgrounds, growth spurts and a great deal of laundry. That means soft cotton tees with reinforced necklines, zip hoodies that go on without help, and elastic waists a child can manage alone in a hurry.",
    note:
      "Matching jogger sets and denim sets take the decision out of a school morning, while everyday casual pieces mix back with almost anything already in the drawer. Knit cardigans and light outer layers handle cool mornings that turn warm by lunch. Sizes run from 2T through 7, cut with a little room so the fit lasts more than one season.",
    highlights: [
      "T Shirts",
      "Hoodies",
      "Jogger Sets",
      "Denim Sets",
      "Casual Wear",
      "Outerwear",
    ],
    seoTitle: "Kids Clothing Online",
    seoDescription:
      "Shop kids clothing online at Xpectra Media. Soft cotton tees, zip hoodies, matching jogger sets, denim sets, everyday casual outfits and knit cardigans in sizes 2T through 7, with free shipping over $75.",
  },
  baby: {
    intro:
      "Baby clothing is judged on two things here: how the fabric feels against new skin and how quickly you can get a change done at three in the morning. Organic cotton rompers use full length snaps rather than fiddly closures, and sleepwear comes with covered feet and two way zips so a night change takes seconds.",
    note:
      "The cotton sets layer together and make a genuinely useful gift instead of a single outfit worn twice. Light jackets add warmth without weight, and the accessories cover the small pieces a first wardrobe always turns out to be missing, from caps and mittens to booties. Sizes run from newborn through eighteen months, cut generously because babies rarely grow on schedule.",
    highlights: [
      "Rompers",
      "Cotton Sets",
      "Sleepwear",
      "Jackets",
      "Accessories",
    ],
    seoTitle: "Baby Clothing Online",
    seoDescription:
      "Shop baby clothing online at Xpectra Media. Organic cotton rompers with full length snaps, layered cotton sets, footed sleepwear, light jackets and accessories from newborn through eighteen months.",
  },
  toys: {
    intro:
      "Toys are chosen the same way the clothing is: by what survives daily use and what actually gets played with a month later. Educational sets turn counting, sorting and early letters into a game a child chooses on their own, and the wooden toys are solid timber with hand rounded edges and water based non toxic paint.",
    note:
      "Soft toys use embroidered features rather than small parts, so they are safe from the very first year. Activity toys build coordination and patience through repetition, while creative and building sets stay open ended, rewarding imagination instead of leading to one right answer. Every item is tested to United States safety standards and labeled with a clear age range.",
    highlights: [
      "Educational Toys",
      "Wooden Toys",
      "Soft Toys",
      "Activity Toys",
      "Creative Toys",
    ],
    seoTitle: "Toys Online",
    seoDescription:
      "Shop toys online at Xpectra Media. Educational toys, solid wooden toys with non toxic paint, soft plush companions, activity toys and open ended creative building sets, with free shipping over $75.",
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
  const stocked = families.filter((family) =>
    allProducts.some((product) => product.subcategory === family.slug),
  );

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

      {/* Introduction and product family quick links */}
      <section className="shell py-14 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-14">
          <Reveal>
            <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              What you will find in {category.name}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate">{content.intro}</p>
            <p className="mt-4 text-base leading-relaxed text-slate">{content.note}</p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {content.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-center gap-3 rounded-2xl border border-line bg-card px-4 py-3 text-sm font-medium text-ink shadow-[var(--shadow-soft)]"
                >
                  <Icon name="check" size={15} className="shrink-0 text-brand" />
                  {highlight}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120}>
            <div className="rounded-3xl border border-line bg-card p-7 shadow-[var(--shadow-soft)]">
              <h3 className="font-display text-lg font-semibold text-ink">
                Jump to a product type
              </h3>
              <p className="mt-2 text-sm text-slate">
                {allProducts.length} products available in this department.
              </p>
              <ul className="mt-6 space-y-2">
                {stocked.map((family) => (
                  <li key={family.slug}>
                    <Link
                      href={`#${family.slug}`}
                      className="group flex items-center justify-between rounded-2xl border border-line bg-mist px-4 py-3 text-sm font-medium text-slate transition-all hover:border-brand hover:bg-brand-tint hover:text-brand-deep"
                    >
                      {family.name}
                      <Icon
                        name="arrowRight"
                        size={15}
                        className="text-muted transition-all group-hover:translate-x-0.5 group-hover:text-brand"
                      />
                    </Link>
                  </li>
                ))}
              </ul>

              <Button
                href={`/products?category=${category.slug}`}
                variant="soft"
                fullWidth
                className="mt-6"
              >
                Filter the full catalog
                <Icon name="arrowRight" size={15} />
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* One section per product family inside this department */}
      {stocked.map((family, index) => {
        const items = allProducts.filter(
          (product) => product.subcategory === family.slug,
        );

        return (
          <section
            key={family.slug}
            id={family.slug}
            className={`scroll-mt-28 py-14 md:py-16 ${
              index % 2 === 0 ? "border-y border-line bg-mist" : ""
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
          <div className="rounded-3xl border border-line bg-card p-8 text-center shadow-[var(--shadow-soft)] md:p-10">
            <h2 className="font-display text-xl font-bold tracking-tight text-ink sm:text-2xl">
              Shopping for someone else too
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate">
              Add pieces from any department to the same order. Standard shipping
              is free once your order reaches ${FREE_SHIPPING_THRESHOLD}, and every
              order comes with 30 day returns.
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
