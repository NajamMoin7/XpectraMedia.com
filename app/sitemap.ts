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

      // Custom Shirts department. The landing page and the design tool are the
      // two entry points worth ranking, so they carry the highest priority.
      { url: `${site.url}/custom-shirts`, changeFrequency: "weekly", priority: 1 },
      {
        url: `${site.url}/custom-shirts/design`,
        changeFrequency: "weekly",
        priority: 0.95,
      },
      {
        url: `${site.url}/custom-shirts/pricing`,
        changeFrequency: "monthly",
        priority: 0.8,
      },
      {
        url: `${site.url}/custom-shirts/bulk-orders`,
        changeFrequency: "monthly",
        priority: 0.8,
      },
      {
        url: `${site.url}/custom-shirts/upload-guidelines`,
        changeFrequency: "monthly",
        priority: 0.6,
      },
      {
        url: `${site.url}/custom-shirts/policy`,
        changeFrequency: "yearly",
        priority: 0.4,
      },

      // Customer support pages, one route per topic.
      {
        url: `${site.url}/support/shopping-cart`,
        changeFrequency: "monthly",
        priority: 0.5,
      },
      {
        url: `${site.url}/support/secure-checkout`,
        changeFrequency: "monthly",
        priority: 0.5,
      },
      {
        url: `${site.url}/support/shipping-information`,
        changeFrequency: "monthly",
        priority: 0.6,
      },
      {
        url: `${site.url}/support/easy-returns`,
        changeFrequency: "monthly",
        priority: 0.6,
      },
      {
        url: `${site.url}/support/shipping-and-returns`,
        changeFrequency: "monthly",
        priority: 0.6,
      },

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

  // Custom Shirts is a department with its own top level page, so it has no
  // /categories/custom-shirts route and must not be emitted here.
  const categoryRoutes: MetadataRoute.Sitemap = categories
    .filter((category) => category.href === `/categories/${category.slug}`)
    .map((category) => ({
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
