import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { Logo } from "@/components/layout/Logo";
import { isAdmin } from "@/lib/server/auth";

import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Admin Sign In",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  if (await isAdmin()) redirect("/admin");

  return (
    <div className="grid min-h-screen place-items-center bg-mist px-4 py-12">
      <div className="w-full max-w-sm rounded-2xl border border-line bg-card p-7 shadow-[var(--shadow-soft)]">
        <div className="mb-6 flex flex-col items-center gap-3 text-center">
          <Logo />
          <h1 className="font-display text-xl font-bold text-ink">Admin Panel</h1>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
