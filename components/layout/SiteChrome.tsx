"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Wraps pages in the storefront header and footer, except the admin panel,
 * which brings its own layout.
 */
export function SiteChrome({
  header,
  footer,
  children,
}: {
  header: ReactNode;
  footer: ReactNode;
  children: ReactNode;
}) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return <>{children}</>;

  return (
    <>
      {header}
      <main id="main-content" className="flex-1">
        {children}
      </main>
      {footer}
    </>
  );
}
