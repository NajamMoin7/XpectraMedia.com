import type { Metadata } from "next";

import { calcDiscount } from "@/lib/format";
import { site } from "@/lib/site";
import type { Product } from "@/lib/types";

interface PageSeo {
  title: string;
  description: string;
  /** Route path beginning with a slash, used for the canonical URL. */
  path: string;
  /** Optional absolute or root relative social share image. */
  image?: string;
  keywords?: string[];
}

/**
 * Builds a consistent metadata object for a page, including canonical URL,
 * Open Graph and Twitter card data. metadataBase is set in the root layout,
 * so relative paths resolve to absolute URLs automatically.
 */
export function buildMetadata({
  title,
  description,
  path,
  image = "/opengraph-image",
  keywords,
}: PageSeo): Metadata {
  const fullTitle =
    path === "/" ? title : `${title} | ${site.name}`;

  return {
    title: fullTitle,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: site.locale,
      title: fullTitle,
      description,
      url: path,
      images: [{ url: image, width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}

/** Absolute URL helper for structured data, which requires full URLs. */
export function absoluteUrl(path: string): string {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}

/* ------------------------------------------------------------------ */
/* JSON LD structured data builders                                     */
/* ------------------------------------------------------------------ */

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "OnlineStore",
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    logo: absoluteUrl(site.logo),
    description: site.description,
    email: site.contact.email,
    telephone: site.contact.phone,
    currenciesAccepted: site.currency,
    paymentAccepted: "Cash on Delivery",
    areaServed: { "@type": "Country", name: "Pakistan" },
    address: {
      "@type": "PostalAddress",
      streetAddress: site.contact.addressLine,
      addressLocality: site.contact.city,
      addressRegion: site.contact.region,
      postalCode: site.contact.postalCode,
      addressCountry: "PK",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: site.contact.phone,
      contactType: "customer support",
      email: site.contact.email,
      areaServed: "PK",
      availableLanguage: ["English", "Urdu"],
    },
    sameAs: site.social.map((channel) => channel.href),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${site.url}/products?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function productJsonLd(product: Product) {
  const discount = product.discount ?? calcDiscount(product.price, product.originalPrice);

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    sku: product.id.toUpperCase(),
    image: product.images.map((image) => absoluteUrl(image)),
    brand: { "@type": "Brand", name: site.name },
    category: `${product.category} / ${product.subcategory.replace(/-/g, " ")}`,
    material: product.material,
    color: product.colors.map((color) => color.name).join(", "),
    offers: {
      "@type": "Offer",
      url: absoluteUrl(`/products/${product.slug}`),
      priceCurrency: site.currency,
      price: product.price,
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@type": "Organization", name: site.name },
      ...(discount > 0 && product.originalPrice
        ? {
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              priceType: "https://schema.org/ListPrice",
              price: product.originalPrice,
              priceCurrency: site.currency,
            },
          }
        : {}),
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
  };
}

export interface Crumb {
  name: string;
  href: string;
}

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.href),
    })),
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
