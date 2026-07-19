import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { shoppingBenefits } from "@/lib/content";

/** Maps the benefit keys in lib/content.ts onto the shared icon set. */
const ICONS: Record<string, IconName> = {
  shield: "shield",
  tag: "tag",
  bolt: "bolt",
  wallet: "wallet",
  headset: "headset",
  lock: "lock",
};

/** Six reasons to shop, presented as a responsive card grid. */
export function WhyShopWithUs() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {shoppingBenefits.map((benefit, index) => (
        <Reveal key={benefit.title} delay={index * 70} className="h-full">
          <article className="group flex h-full flex-col rounded-2xl border border-line-soft bg-surface p-7 transition-all duration-500 hover:-translate-y-1 hover:border-brand/60 hover:shadow-[0_26px_54px_-32px_rgba(30,144,255,0.9)]">
            <span className="mb-5 grid h-12 w-12 place-items-center rounded-xl border border-line bg-surface-2 text-brand transition-colors duration-300 group-hover:border-brand group-hover:bg-brand/10">
              <Icon name={ICONS[benefit.icon] ?? "sparkle"} size={22} />
            </span>
            <h3 className="font-display text-lg font-semibold text-white">
              {benefit.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-mist">
              {benefit.description}
            </p>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
