import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CustomerReviews } from "@/components/product/CustomerReviews";
import { FrequentlyBoughtTogether } from "@/components/product/FrequentlyBoughtTogether";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ProductPurchasePanel } from "@/components/product/ProductPurchasePanel";
import { RecentlyViewed } from "@/components/product/RecentlyViewed";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Icon, type IconName } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { SectionHeading } from "@/components/ui/PageBanner";
import { Reveal } from "@/components/ui/Reveal";
import { getCategory, subcategoryLabel } from "@/lib/categories";
import { calcDiscount, deliveryWindow } from "@/lib/format";
import {
  getFrequentlyBoughtTogether,
  getProductBySlug,
  getRelatedProducts,
  productBadge,
  products,
} from "@/lib/products";
import { buildMetadata, productJsonLd } from "@/lib/seo";

/** Every product page is generated statically at build time. */
export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  const family = subcategoryLabel(product.subcategory).toLowerCase();

  return buildMetadata({
    title: product.name,
    description: product.shortDescription,
    path: `/products/${product.slug}`,
    image: product.images[0],
    keywords: [
      product.name.toLowerCase(),
      `${product.category} ${family}`,
      `buy ${family} online`,
      "online clothing store in the United States",
      "free shipping and easy returns",
    ],
  });
}

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const familyName = subcategoryLabel(product.subcategory);
  const discount = product.discount ?? calcDiscount(product.price, product.originalPrice);
  const related = getRelatedProducts(product, 4);
  const complements = getFrequentlyBoughtTogether(product, 2);
  const deliveryEstimate = deliveryWindow(new Date().toISOString());

  /** Service promises assembled from the product's own copy. */
  const servicePoints: { icon: IconName; title: string; body: string }[] = [
    { icon: "truck", title: "Shipping", body: product.shippingInfo },
    { icon: "refresh", title: "Returns and Exchanges", body: product.returnInfo },
    {
      icon: "headset",
      title: "Help With Sizing",
      body: "Not sure which size to pick? Open the size guide for full measurements, or email our team with the fit you usually wear and we will recommend a size before you order.",
    },
  ];

  return (
    <>
      <JsonLd data={productJsonLd(product)} />

      <div className="border-b border-line bg-mist">
        <div className="shell py-5">
          <Breadcrumbs
            items={[
              { name: "Products", href: "/products" },
              {
                name: category?.name ?? product.category,
                href: `/categories/${product.category}`,
              },
              { name: product.name, href: `/products/${product.slug}` },
            ]}
          />
        </div>
      </div>

      {/* Gallery and purchase panel */}
      <section className="shell grid gap-10 py-10 lg:grid-cols-2 lg:gap-16 lg:py-16">
        <ProductGallery
          images={product.images}
          productName={product.name}
          subtitle={product.subtitle}
          discount={discount}
          badge={productBadge(product)}
        />

        <ProductPurchasePanel product={product} deliveryEstimate={deliveryEstimate} />
      </section>

      {/* Bundle */}
      {complements.length > 0 ? (
        <section className="shell pb-14 md:pb-16">
          <Reveal>
            <SectionHeading
              eyebrow="Complete the Look"
              title="Frequently bought together"
              description="Pieces our customers most often add alongside this one."
            />
            <div className="mt-8">
              <FrequentlyBoughtTogether product={product} complements={complements} />
            </div>
          </Reveal>
        </section>
      ) : null}

      {/* Description, highlights, material and care */}
      <section className="border-y border-line bg-mist py-14 md:py-20">
        <div className="shell grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-14">
          <Reveal>
            <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              About this piece
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate">
              {product.detailedDescription}
            </p>

            <h3 className="mt-10 font-display text-lg font-semibold text-ink">
              Product highlights
            </h3>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {product.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 rounded-2xl border border-line bg-card p-4 text-sm leading-relaxed text-slate shadow-[var(--shadow-soft)]"
                >
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-tint text-brand-deep">
                    <Icon name="check" size={12} />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120} className="space-y-5">
            <div className="rounded-3xl border border-line bg-card p-6 shadow-[var(--shadow-soft)]">
              <h3 className="flex items-center gap-2 font-display text-base font-semibold text-ink">
                <Icon name="tag" size={17} className="text-brand" />
                Material
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate">
                {product.material}
              </p>
            </div>

            <div className="rounded-3xl border border-line bg-card p-6 shadow-[var(--shadow-soft)]">
              <h3 className="flex items-center gap-2 font-display text-base font-semibold text-ink">
                <Icon name="sparkle" size={17} className="text-brand" />
                Care instructions
              </h3>
              <ul className="mt-4 space-y-2.5">
                {product.careInstructions.map((instruction) => (
                  <li
                    key={instruction}
                    className="flex items-start gap-3 text-sm leading-relaxed text-slate"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
                    />
                    {instruction}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-line bg-card p-6 shadow-[var(--shadow-soft)]">
              <h3 className="flex items-center gap-2 font-display text-base font-semibold text-ink">
                <Icon name="list" size={17} className="text-brand" />
                At a glance
              </h3>
              <dl className="mt-4 space-y-3 text-sm">
                <SpecRow label="Department" value={category?.name ?? product.category} />
                <SpecRow label="Product type" value={familyName} />
                <SpecRow label="Available sizes" value={product.sizes.join(", ")} />
                <SpecRow
                  label="Available colors"
                  value={product.colors.map((color) => color.name).join(", ")}
                />
                <SpecRow label="Product code" value={product.id.toUpperCase()} />
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Shipping, returns and support */}
      <section className="shell py-14 md:py-20">
        <div className="grid gap-5 md:grid-cols-3">
          {servicePoints.map((point, index) => (
            <Reveal key={point.title} delay={index * 80} className="h-full">
              <article className="h-full rounded-3xl border border-line bg-card p-7 shadow-[var(--shadow-soft)] transition-shadow duration-300 hover:shadow-[var(--shadow-lift)]">
                <span className="mb-5 grid h-11 w-11 place-items-center rounded-2xl bg-brand-tint text-brand-deep">
                  <Icon name={point.icon} size={20} />
                </span>
                <h3 className="font-display text-base font-semibold text-ink">
                  {point.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate">{point.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="border-y border-line bg-mist py-14 md:py-20">
        <div className="shell">
          <SectionHeading
            eyebrow="Customer Reviews"
            title="What buyers are saying"
            description={`Real feedback from people who own the ${product.name.toLowerCase()}.`}
          />
          <div className="mt-10">
            <CustomerReviews product={product} />
          </div>
        </div>
      </section>

      {/* Related products */}
      {related.length > 0 ? (
        <section className="shell py-14 md:py-20">
          <SectionHeading
            eyebrow="You May Also Like"
            title="Related products"
            description={`More from our ${familyName.toLowerCase()} and ${product.category} range.`}
          />
          <div className="mt-10">
            <ProductGrid products={related} columns={4} />
          </div>
        </section>
      ) : null}

      <div className="border-t border-line">
        <RecentlyViewed currentId={product.id} />
      </div>
    </>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-4 border-b border-line pb-3 last:border-0 last:pb-0">
      <dt className="w-32 shrink-0 text-muted">{label}</dt>
      <dd className="font-medium text-ink">{value}</dd>
    </div>
  );
}
