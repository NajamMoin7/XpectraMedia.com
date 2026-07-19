import type { Metadata, Viewport } from "next";
import { Outfit, Space_Grotesk } from "next/font/google";

import "./globals.css";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/ui/JsonLd";
import { CartProvider } from "@/lib/cart-context";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

/** Body typeface: clean, geometric and highly readable on dark surfaces. */
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

/** Display typeface used for headings, echoing the logo lettering. */
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Xpectra Media | Online Shopping in Pakistan for Men, Women and Kids",
    template: "%s | Xpectra Media",
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "online shopping in Pakistan",
    "men clothing online",
    "women clothing online",
    "kids clothes online",
    "baby clothes in Pakistan",
    "toys online in Pakistan",
    "kurta shalwar online",
    "affordable fashion in Pakistan",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    url: "/",
    title: "Xpectra Media | Online Shopping in Pakistan for Men, Women and Kids",
    description: site.description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Xpectra Media online shopping in Pakistan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Xpectra Media | Online Shopping in Pakistan",
    description: site.description,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "shopping",
};

export const viewport: Viewport = {
  themeColor: "#04070c",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      // Keeps route changes snappy while smooth scrolling stays on for anchors.
      data-scroll-behavior="smooth"
      className={`${outfit.variable} ${spaceGrotesk.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-ink text-white antialiased">
        {/* Site wide structured data */}
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />

        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brand focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to main content
        </a>

        <CartProvider>
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
