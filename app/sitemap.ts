import type { MetadataRoute } from "next";

import { categories, subcategories } from "@/lib/categories";
import { products } from "@/lib/products";
import { site } from "@/lib/site";

/** Fixed publication date for the static marketing and policy pages. */
const LAST_MODIFIED = new Date("2026-07-20");

/**
 * Generates sitemap.xml covering every static page, category landing page and
 * product detail page in the catalogue.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = (
    [
      { url: site.url, changeFrequency: "weekly", priority: 1 },
      { url: `${site.url}/products`, changeFrequency: "daily", priority: 0.9 },
      { url: `${site.url}/categories`, changeFrequency: "weekly", priority: 0.9 },
      { url: `${site.url}/about`, changeFrequency: "monthly", priority: 0.7 },
      { url: `${site.url}/contact`, changeFrequency: "monthly", priority: 0.7 },
      { url: `${site.url}/privacy-policy`, changeFrequency: "yearly", priority: 0.3 },
      {
        url: `${site.url}/terms-and-conditions`,
        changeFrequency: "yearly",
        priority: 0.3,
      },
    ] satisfies MetadataRoute.Sitemap
  ).map((entry) => ({ ...entry, lastModified: LAST_MODIFIED }));

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${site.url}/categories/${category.slug}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Filtered listing views for each product family are worth indexing too.
  const familyRoutes: MetadataRoute.Sitemap = subcategories.map((sub) => ({
    url: `${site.url}/products?type=${sub.slug}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${site.url}/products/${product.slug}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "weekly",
    priority: product.featured ? 0.8 : 0.7,
  }));

  return [...staticRoutes, ...categoryRoutes, ...familyRoutes, ...productRoutes];
}
