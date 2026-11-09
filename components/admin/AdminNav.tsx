"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Icon, type IconName } from "@/components/ui/Icon";

const LINKS: { href: string; label: string; icon: IconName }[] = [
  { href: "/admin", label: "Dashboard", icon: "grid" },
  { href: "/admin/orders", label: "Orders", icon: "list" },
  { href: "/admin/products", label: "Products", icon: "tag" },
  { href: "/admin/chargebacks", label: "Chargebacks", icon: "refresh" },
];

/** Sidebar on desktop, a scrolling tab row on phones. */
export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Admin" className="flex gap-1 overflow-x-auto lg:flex-col">
      {LINKS.map((link) => {
        const active =
          link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className={`flex shrink-0 items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-colors ${
              active ? "bg-brand text-white" : "text-slate hover:bg-mist hover:text-ink"
            }`}
          >
            <Icon name={link.icon} size={17} />
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
