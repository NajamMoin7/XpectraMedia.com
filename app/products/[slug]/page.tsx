import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ProductPurchasePanel } from "@/components/product/ProductPurchasePanel";
import { RecentlyViewed } from "@/components/product/RecentlyViewed";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Icon, type IconName } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { SectionHeading } from "@/components/ui/PageBanner";
import { Rating } from "@/components/ui/Rating";
import { Reveal } from "@/components/ui/Reveal";
import { getCategory, subcategoryLabel } from "@/lib/categories";
import { calcDiscount, formatPrice } from "@/lib/format";
import { getProductBySlug, getRelatedProducts, products } from "@/lib/products";
import { buildMetadata, productJsonLd } from "@/lib/seo";
import { DELIVERY_CHARGE, FREE_DELIVERY_THRESHOLD } from "@/lib/site";

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

  return buildMetadata({
    title: product.name,
    description: product.shortDescription,
    path: `/products/${product.slug}`,
    image: product.images[0],
    keywords: [
      product.name.toLowerCase(),
      `${product.category} ${subcategoryLabel(product.subcategory).toLowerCase()}`,
      "online shopping in Pakistan",
    ],
  });
}

/** Delivery and returns information shown beneath the purchase panel. */
const SERVICE_POINTS: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "truck",
    title: "Delivery Information",
    body: `Dispatched within one working day. Delivery takes two to three working days in major cities and three to five working days elsewhere in Pakistan. Delivery costs ${formatPrice(
      DELIVERY_CHARGE,
    )} and becomes free once your order reaches ${formatPrice(FREE_DELIVERY_THRESHOLD)}.`,
  },
  {
    icon: "refresh",
    title: "Returns and Exchanges",
    body: "Request an exchange within seven days of delivery, provided the item is unused, unwashed and still carries its original tags. Message us with your order number and our team will arrange collection.",
  },
  {
    icon: "headset",
    title: "Help With Sizing",
    body: "Not sure which size to choose? Send us a message on WhatsApp with your usual measurements and our team will recommend the right fit before you order.",
  },
];

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
  const saving = product.originalPrice ? product.originalPrice - product.price : 0;

  return (
    <>
      <JsonLd data={productJsonLd(product)} />

      <div className="shell pt-8">
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

      {/* Gallery and purchase panel */}
      <section className="shell grid gap-10 py-10 lg:grid-cols-2 lg:gap-14 lg:py-14">
        <ProductGallery
          images={product.images}
          productName={product.name}
          discount={discount}
          newArrival={product.newArrival}
        />

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            {familyName}
            <span className="ml-2 capitalize text-mist-dim">{product.category}</span>
          </p>

          <h1 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
            {product.name}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-4">
            <Rating value={product.rating} reviewCount={product.reviewCount} size={16} />
            <span
              className={`inline-flex items-center gap-1.5 text-sm font-medium ${
                product.stock > 0 ? "text-emerald-400" : "text-red-400"
              }`}
            >
              <Icon name={product.stock > 0 ? "checkCircle" : "close"} size={15} />
              {product.stock > 0 ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          {/* Pricing */}
          <div className="mt-6 flex flex-wrap items-baseline gap-3">
            <span className="font-display text-3xl font-bold text-white">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice ? (
              <>
                <span className="text-lg text-mist-dim line-through">
                  {formatPrice(product.originalPrice)}
                </span>
                <span className="rounded-full bg-brand/15 px-3 py-1 text-xs font-semibold text-brand-bright">
                  You save {formatPrice(saving)}
                </span>
              </>
            ) : null}
          </div>

          <p className="mt-5 text-base leading-relaxed text-mist">
            {product.shortDescription}
          </p>

          <hr className="my-8 border-line-soft" />

          <ProductPurchasePanel product={product} />
        </div>
      </section>

      {/* Description, features and care */}
      <section className="border-y border-line-soft bg-ink-soft py-14 md:py-16">
        <div className="shell grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-14">
          <Reveal>
            <h2 className="font-display text-2xl font-bold tracking-tight text-white">
              Product Details
            </h2>
            <p className="mt-5 text-base leading-relaxed text-mist">
              {product.detailedDescription}
            </p>

            <h3 className="mt-10 font-display text-lg font-semibold text-white">
              Product Features
            </h3>
            <ul className="mt-4 space-y-3">
              {product.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm text-mist">
                  <Icon name="check" size={16} className="mt-0.5 shrink-0 text-brand" />
                  {feature}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120} className="space-y-5">
            <div className="rounded-2xl border border-line-soft bg-surface p-6">
              <h3 className="font-display text-base font-semibold text-white">
                Material
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-mist">
                {product.material}
              </p>
            </div>

            <div className="rounded-2xl border border-line-soft bg-surface p-6">
              <h3 className="font-display text-base font-semibold text-white">
                Care Instructions
              </h3>
              <ul className="mt-4 space-y-2.5">
                {product.careInstructions.map((instruction) => (
                  <li
                    key={instruction}
                    className="flex items-start gap-3 text-sm text-mist"
                  >
                    <Icon
                      name="sparkle"
                      size={14}
                      className="mt-1 shrink-0 text-brand"
                    />
                    {instruction}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-line-soft bg-surface p-6">
              <h3 className="font-display text-base font-semibold text-white">
                At a Glance
              </h3>
              <dl className="mt-4 space-y-3 text-sm">
                <SpecRow label="Category" value={category?.name ?? product.category} />
                <SpecRow label="Product Type" value={familyName} />
                <SpecRow label="Available Sizes" value={product.sizes.join(", ")} />
                <SpecRow
                  label="Available Colours"
                  value={product.colors.map((colour) => colour.name).join(", ")}
                />
                <SpecRow
                  label="Product Code"
                  // Displayed with a space so visible copy stays free of dashes.
                  value={product.id.toUpperCase().replace(/-/g, " ")}
                />
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Delivery, returns and support */}
      <section className="shell py-14 md:py-16">
        <div className="grid gap-5 md:grid-cols-3">
          {SERVICE_POINTS.map((point, index) => (
            <Reveal key={point.title} delay={index * 80} className="h-full">
              <article className="h-full rounded-2xl border border-line-soft bg-surface p-7">
                <span className="mb-5 grid h-11 w-11 place-items-center rounded-xl border border-line bg-surface-2 text-brand">
                  <Icon name={point.icon} size={20} />
                </span>
                <h3 className="font-display text-base font-semibold text-white">
                  {point.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-mist">{point.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Related products */}
      {related.length > 0 ? (
        <section className="border-y border-line-soft bg-ink-soft py-14 md:py-16">
          <div className="shell">
            <SectionHeading
              eyebrow="You May Also Like"
              title="Related products"
              description={`More pieces from our ${familyName.toLowerCase()} and ${product.category} range.`}
            />
            <div className="mt-10">
              <ProductGrid products={related} columns={4} />
            </div>
          </div>
        </section>
      ) : null}

      <RecentlyViewed currentId={product.id} />
    </>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-4 border-b border-line-soft pb-3 last:border-0 last:pb-0">
      <dt className="w-32 shrink-0 text-mist-dim">{label}</dt>
      <dd className="text-white">{value}</dd>
    </div>
  );
}
