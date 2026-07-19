import Image from "next/image";
import Link from "next/link";

import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { styleEdits } from "@/lib/content";

/**
 * Editorial style tiles. Image led cards that zoom gently on hover and link
 * straight into the matching product family.
 */
export function ShopByStyle() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {styleEdits.map((edit, index) => (
        <Reveal key={edit.title} delay={index * 80} className="h-full">
          <Link
            href={edit.href}
            className="group relative flex h-full min-h-[22rem] flex-col justify-end overflow-hidden rounded-3xl border border-line bg-card shadow-[var(--shadow-soft)] transition-all duration-500 hover:-translate-y-1.5 hover:border-brand/45 hover:shadow-[var(--shadow-lift)]"
          >
            <Image
              src={edit.image}
              alt={`${edit.title} edit at Xpectra Media`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />

            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/40 to-transparent transition-opacity duration-500 group-hover:from-night/95"
            />

            <div className="relative p-6">
              <h3 className="font-display text-xl font-bold tracking-tight text-white">
                {edit.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/80">
                {edit.description}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white transition-all duration-300 group-hover:gap-3">
                Shop the edit
                <Icon name="arrowRight" size={15} />
              </span>
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
