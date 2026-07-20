import type { Metadata, Viewport } from "next";
import { Outfit, Space_Grotesk } from "next/font/google";

import "./globals.css";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/ui/JsonLd";
import { LoadingOverlay } from "@/components/loading/LoadingOverlay";
import { NavigationProgress } from "@/components/loading/NavigationProgress";
import { RouteLoadingProvider } from "@/components/loading/RouteLoadingProvider";
import { CartProvider } from "@/lib/cart-context";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

/** Body typeface: clean, geometric and highly readable at small sizes. */
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

const TITLE = "Xpectra Media | Modern Online Clothing Store for Men, Women and Kids";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: TITLE,
    template: "%s | Xpectra Media",
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "online clothing store",
    "men clothing online",
    "women clothing online",
    "kids clothes online",
    "baby clothes online",
    "toys online",
    "everyday fashion",
    "affordable clothing online USA",
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
    title: TITLE,
    description: site.description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Xpectra Media online clothing store for men, women, kids, baby and toys",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Xpectra Media | Modern Online Clothing Store",
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
  themeColor: "#ffffff",
  colorScheme: "light",
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
      <body className="flex min-h-full flex-col bg-canvas text-slate antialiased">
        {/* Site wide structured data */}
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />

        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brand focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to main content
        </a>

        <RouteLoadingProvider>
          {/* One loader for the whole site, so two can never overlap */}
          <NavigationProgress />
          <LoadingOverlay />

          <CartProvider>
            <Header />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
          </CartProvider>
        </RouteLoadingProvider>
      </body>
    </html>
  );
}
