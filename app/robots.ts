import type { MetadataRoute } from "next";

import { site } from "@/lib/site";

/** Generates robots.txt. Checkout and confirmation are kept out of the index. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/checkout", "/order-confirmation", "/cart"],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
