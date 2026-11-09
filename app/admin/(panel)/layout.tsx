import type { Metadata } from "next";
import Link from "next/link";

import { logout } from "@/app/admin/actions";
import { AdminNav } from "@/components/admin/AdminNav";
import { Logo } from "@/components/layout/Logo";
import { Icon } from "@/components/ui/Icon";
import { requireAdmin } from "@/lib/server/auth";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | Admin" },
  robots: { index: false, follow: false },
};

/**
 * Admin pages read live orders and products on every request and must never
 * be prerendered at build time (Netlify Blobs is not available during builds).
 */
export const dynamic = "force-dynamic";

export default async function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();

  return (
    <div className="min-h-screen bg-mist lg:grid lg:grid-cols-[15rem_minmax(0,1fr)]">
      <aside className="border-b border-line bg-card px-4 py-4 lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r lg:py-6">
        <div className="flex items-center justify-between gap-3 lg:mb-8 lg:block">
          <Logo height={30} label="View the store" />
          <form action={logout} className="lg:hidden">
            <button type="submit" className="text-sm font-semibold text-slate hover:text-sale">
              Sign out
            </button>
          </form>
        </div>
        <div className="mt-4 lg:mt-0">
          <AdminNav />
        </div>
        <div className="mt-8 hidden space-y-1 border-t border-line pt-4 lg:block">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm text-slate hover:bg-mist hover:text-ink"
          >
            <Icon name="eye" size={17} />
            View store
          </Link>
          <form action={logout}>
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-left text-sm text-slate hover:bg-mist hover:text-sale"
            >
              <Icon name="arrowLeft" size={17} />
              Sign out
            </button>
          </form>
        </div>
      </aside>

      <main className="min-w-0 px-4 py-6 sm:px-6 lg:px-10 lg:py-10">{children}</main>
    </div>
  );
}
