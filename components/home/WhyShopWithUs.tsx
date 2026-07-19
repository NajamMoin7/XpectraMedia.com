import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { shoppingBenefits } from "@/lib/content";

/** Maps the benefit keys in lib/content.ts onto the shared icon set. */
const ICONS: Record<string, IconName> = {
  truck: "truck",
  refresh: "refresh",
  shield: "shield",
  lock: "lock",
  wallet: "wallet",
  headset: "headset",
  tag: "tag",
  bolt: "bolt",
};

/** Six reasons to shop, presented as white cards on a light grid. */
export function WhyShopWithUs() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {shoppingBenefits.map((benefit, index) => (
        <Reveal key={benefit.title} delay={index * 70} className="h-full">
          <article className="group flex h-full flex-col rounded-3xl border border-line bg-card p-7 shadow-[var(--shadow-soft)] transition-all duration-500 hover:-translate-y-1.5 hover:border-brand/45 hover:shadow-[var(--shadow-lift)]">
            <span className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-brand-tint text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
              <Icon name={ICONS[benefit.icon] ?? "sparkle"} size={22} />
            </span>
            <h3 className="font-display text-lg font-semibold text-ink">
              {benefit.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate">
              {benefit.description}
            </p>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
