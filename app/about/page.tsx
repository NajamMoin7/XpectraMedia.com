import Image from "next/image";

import { CategoryCard } from "@/components/product/CategoryCard";
import { Button } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { PageBanner, SectionHeading } from "@/components/ui/PageBanner";
import { Reveal } from "@/components/ui/Reveal";
import { categories } from "@/lib/categories";
import { companyStats, coreValues } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "About Xpectra Media",
  description:
    "Learn about Xpectra Media, an online shopping destination in Pakistan offering men clothing, women clothing, kids clothes, baby clothes and toys with Cash on Delivery nationwide.",
  path: "/about",
  keywords: [
    "about Xpectra Media",
    "online shopping store in Pakistan",
    "men clothing online",
    "women clothing online",
    "kids clothes online",
    "baby clothes in Pakistan",
    "toys online in Pakistan",
    "Cash on Delivery shopping Pakistan",
  ],
});

/** Reasons shown in the "Why customers choose Xpectra Media" grid. */
const reasonsToChoose: { icon: IconName; title: string; description: string }[] = [
  {
    icon: "shield",
    title: "Fabric you can trust",
    description:
      "Every fabric is handled and washed before it reaches a product page. If a cotton pills after two washes or a dye bleeds, it never gets listed in the first place.",
  },
  {
    icon: "tag",
    title: "Prices that stay honest",
    description:
      "We price for families who shop for a whole household at once, not for a single showpiece purchase. What you see on the product card is what you pay, with no surprise additions.",
  },
  {
    icon: "wallet",
    title: "Cash on Delivery across Pakistan",
    description:
      "Pay the courier at your door once your parcel is in your hands. No advance transfer, no card details and no online payment form to fill in.",
  },
  {
    icon: "truck",
    title: "Quick dispatch and clear tracking",
    description:
      "Orders are packed within one working day and a tracking reference is sent by SMS as soon as the parcel leaves us, so you always know where it is.",
  },
  {
    icon: "refresh",
    title: "Straightforward exchanges",
    description:
      "If a size does not fit, message us within seven days of delivery with the item unused and tagged, and our team arranges the exchange without an argument.",
  },
  {
    icon: "headset",
    title: "Support that answers properly",
    description:
      "Real people on WhatsApp, phone and email during working hours, ready to check a measurement, confirm stock or update an order before it ships.",
  },
];

/** Imagery used in the brand story collage. */
const storyImages = [
  {
    src: "/assets/images/categories/men.svg",
    alt: "Men clothing collection at Xpectra Media featuring shirts, trousers and kurta shalwar",
  },
  {
    src: "/assets/images/categories/women.svg",
    alt: "Women clothing collection at Xpectra Media featuring lawn shirts and festive sets",
  },
  {
    src: "/assets/images/categories/kids.svg",
    alt: "Kids clothes collection at Xpectra Media including school wear and baby clothes",
  },
  {
    src: "/assets/images/categories/toys.svg",
    alt: "Toys collection at Xpectra Media including wooden educational toys and soft toys",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageBanner
        eyebrow="About Us"
        title="Style for every generation, delivered across Pakistan"
        description="Xpectra Media is an online clothing and toy store built for Pakistani households. One cart, one delivery, everything for the men, women and children in your home."
        crumbs={[{ name: "About Us", href: "/about" }]}
      />

      {/* Company introduction */}
      <section aria-labelledby="introduction" className="scroll-mt-24 py-16 md:py-20">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <Reveal>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-brand">
                Who we are
              </p>
              <h2
                id="introduction"
                className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl"
              >
                An online store for the whole household
              </h2>
              <div className="mt-6 space-y-5 text-base leading-relaxed text-mist">
                <p>
                  Xpectra Media is an online shopping destination serving customers
                  in every province of Pakistan. We bring men clothing, women
                  clothing, kids clothes, baby clothes and toys together in one
                  catalogue so that a family can dress everybody and pick up a gift
                  for a child in a single order.
                </p>
                <p>
                  Our range covers casual and formal shirts, chinos and cargos,
                  tailored trousers and palazzos, everyday and festive kurta shalwar
                  sets, gentle cotton pieces for newborns, and toys chosen for
                  safety as much as for play value. Each department is curated
                  rather than endless, because a short list of genuinely good
                  pieces is more useful than thousands of listings you have to sift
                  through.
                </p>
                <p>
                  Everything is paid for with Cash on Delivery. You place the order,
                  we confirm it with you, and you hand the money to the courier once
                  the parcel is at your door. Delivery is a flat PKR 250 and becomes
                  free once your subtotal reaches PKR 5,000.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/products">Browse all products</Button>
                <Button href="/categories" variant="outline">
                  View categories
                </Button>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="grid grid-cols-2 gap-4">
                {storyImages.map((image, index) => (
                  <div
                    key={image.src}
                    className={`relative overflow-hidden rounded-2xl border border-line-soft bg-surface ${
                      index % 2 === 0 ? "aspect-[3/4]" : "mt-6 aspect-[3/4]"
                    }`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 1024px) 45vw, 22vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Statistics band */}
      <section
        aria-labelledby="by-the-numbers"
        className="scroll-mt-24 border-y border-line-soft bg-ink-soft py-14 md:py-16"
      >
        <div className="shell">
          <h2 id="by-the-numbers" className="sr-only">
            Xpectra Media by the numbers
          </h2>
          <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
            {companyStats.map((stat, index) => (
              <Reveal key={stat.label} delay={index * 90}>
                <div className="rounded-2xl border border-line-soft bg-surface px-5 py-7 text-center sm:px-6">
                  <p className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    {stat.value}
                    {stat.suffix ? (
                      <span className="ml-1.5 align-middle text-base font-semibold text-brand sm:text-lg">
                        {stat.suffix}
                      </span>
                    ) : null}
                  </p>
                  <p className="mt-3 text-sm font-medium text-mist">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Brand story */}
      <section aria-labelledby="our-story" className="scroll-mt-24 py-16 md:py-20">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="Our story"
              title="Built out of frustration with online shopping"
            />
          </Reveal>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <Reveal>
              <article className="h-full rounded-2xl border border-line-soft bg-surface p-6 sm:p-7">
                <h3 className="font-display text-lg font-bold text-white">
                  The problem we kept running into
                </h3>
                <p className="mt-4 text-base leading-relaxed text-mist">
                  Xpectra Media started with a simple complaint that most people in
                  Pakistan will recognise. A shirt photographed under studio lights
                  arrives in a completely different shade. A trouser listed as
                  regular fit turns out to be cut for someone else entirely. The
                  size chart is a stock image copied from another store. Nobody
                  answers the phone afterwards.
                </p>
              </article>
            </Reveal>
            <Reveal delay={100}>
              <article className="h-full rounded-2xl border border-line-soft bg-surface p-6 sm:p-7">
                <h3 className="font-display text-lg font-bold text-white">
                  How we decided to do it differently
                </h3>
                <p className="mt-4 text-base leading-relaxed text-mist">
                  We began small, with a handful of shirts and kurta shalwar sets
                  that we had worn ourselves through a Lahore summer. We wrote the
                  descriptions the way we would explain the garment to a friend,
                  listed the actual fabric composition, and photographed the real
                  colour rather than a flattering one. Customers noticed, and they
                  came back.
                </p>
              </article>
            </Reveal>
            <Reveal delay={200}>
              <article className="h-full rounded-2xl border border-line-soft bg-surface p-6 sm:p-7">
                <h3 className="font-display text-lg font-bold text-white">
                  Where we are today
                </h3>
                <p className="mt-4 text-base leading-relaxed text-mist">
                  That handful of pieces grew into six product families across three
                  departments, dispatched from our Lahore office to customers from
                  Karachi to Gilgit. The catalogue is larger, the courier network is
                  wider, but the rule has not changed: if we would not buy it
                  ourselves, it does not go on the website.
                </p>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Mission and vision */}
      <section
        aria-labelledby="mission-and-vision"
        className="scroll-mt-24 border-y border-line-soft bg-ink-soft py-16 md:py-20"
      >
        <div className="shell">
          <h2 id="mission-and-vision" className="sr-only">
            Our mission and vision
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Reveal>
              <article className="h-full rounded-2xl border border-line-soft bg-surface p-7 sm:p-9">
                <span className="mb-6 grid h-12 w-12 place-items-center rounded-2xl border border-line bg-surface-2 text-brand">
                  <Icon name="bolt" size={24} />
                </span>
                <h3 className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
                  Our mission
                </h3>
                <p className="mt-4 text-base leading-relaxed text-mist">
                  To make dependable clothing and safe, well made toys available to
                  every household in Pakistan at a price that does not require a
                  second thought, described honestly enough that ordering online
                  feels as certain as picking the item up in a shop.
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    "Describe every product exactly as it is, including its limitations",
                    "Keep delivery fast, affordable and free once the order reaches PKR 5,000",
                    "Answer every customer message with a real, useful reply",
                  ].map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-mist">
                      <Icon name="check" size={18} className="mt-0.5 shrink-0 text-brand" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>

            <Reveal delay={120}>
              <article className="h-full rounded-2xl border border-line-soft bg-surface p-7 sm:p-9">
                <span className="mb-6 grid h-12 w-12 place-items-center rounded-2xl border border-line bg-surface-2 text-brand">
                  <Icon name="sparkle" size={24} />
                </span>
                <h3 className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
                  Our vision
                </h3>
                <p className="mt-4 text-base leading-relaxed text-mist">
                  To become the store a Pakistani family opens first, whether they
                  are buying school trousers in August, an Eid kurta shalwar in
                  spring or a birthday gift on a Tuesday evening, and to prove that
                  a home grown online store can match international standards of
                  service.
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    "One trusted catalogue covering men, women, kids, babies and toys",
                    "Nationwide reach that treats smaller cities as well as the largest ones",
                    "A shopping experience judged by repeat customers, not by one time sales",
                  ].map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-mist">
                      <Icon name="check" size={18} className="mt-0.5 shrink-0 text-brand" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Core values */}
      <section aria-labelledby="core-values" className="scroll-mt-24 py-16 md:py-20">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="What we stand for"
              title="Our core values"
              description="Four principles that decide what we stock, how we price it and how we treat you after the parcel has been delivered."
            />
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {coreValues.map((value, index) => (
              <Reveal key={value.title} delay={index * 90}>
                <article className="h-full rounded-2xl border border-line-soft bg-surface p-6 sm:p-7">
                  <span className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-surface-2 font-display text-sm font-bold text-brand">
                    {index + 1}
                  </span>
                  <h3 className="font-display text-lg font-bold text-white">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-mist">
                    {value.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Product quality commitment */}
      <section
        aria-labelledby="quality-commitment"
        className="scroll-mt-24 border-y border-line-soft bg-ink-soft py-16 md:py-20"
      >
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <Reveal>
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line-soft bg-surface sm:aspect-[4/3] lg:aspect-[4/5]">
                <Image
                  src="/assets/images/categories/women.svg"
                  alt="Lawn and rayon fabric from the Xpectra Media women clothing range checked for colour and finish"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <Reveal delay={120}>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-brand">
                Quality commitment
              </p>
              <h2
                id="quality-commitment"
                className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl"
              >
                Checked before it is listed, not after you complain
              </h2>
              <div className="mt-6 space-y-5 text-base leading-relaxed text-mist">
                <p>
                  Before any garment joins the catalogue it goes through the same
                  routine. We check the fabric weight and composition, wash a sample
                  to see how the colour and shape hold, inspect the seams and
                  stitching density at the stress points, and try the piece on to
                  confirm that the measurements on the size guide are the real ones.
                </p>
                <p>
                  Toys are held to a separate standard because children put them in
                  their mouths. Our wooden toys use water based non toxic paint with
                  hand rounded edges, our soft toys use embroidered features instead
                  of plastic eyes so there are no small parts to come loose, and our
                  plastic toys are made from food grade material that is free from
                  BPA.
                </p>
              </div>
              <ul className="mt-7 grid gap-4 sm:grid-cols-2">
                {[
                  {
                    title: "Fabric first",
                    body: "Composition and weight are chosen for Pakistani summers and winters before styling is considered.",
                  },
                  {
                    title: "Wash tested",
                    body: "Samples are washed to check shrinkage, colour hold and pilling before a listing goes live.",
                  },
                  {
                    title: "Stitch inspected",
                    body: "Seams, hems and stress points are reviewed piece by piece as stock is received.",
                  },
                  {
                    title: "Measured honestly",
                    body: "Size guides carry the measurements we recorded ourselves, not a generic chart.",
                  },
                ].map((item) => (
                  <li
                    key={item.title}
                    className="rounded-2xl border border-line-soft bg-surface p-5"
                  >
                    <h3 className="font-display text-sm font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-mist">{item.body}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Customer satisfaction */}
      <section
        aria-labelledby="customer-satisfaction"
        className="scroll-mt-24 py-16 md:py-20"
      >
        <div className="shell">
          <Reveal>
            <div className="rounded-2xl border border-line-soft bg-surface p-7 sm:p-10 lg:p-14">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-brand">
                Customer satisfaction
              </p>
              <h2
                id="customer-satisfaction"
                className="max-w-3xl font-display text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl"
              >
                Your order is not finished until you are happy with it
              </h2>
              <div className="mt-6 grid gap-6 text-base leading-relaxed text-mist lg:grid-cols-2 lg:gap-10">
                <div className="space-y-5">
                  <p>
                    We treat the moment the parcel opens as the real test. If the
                    colour is not what the photograph promised, if the size runs
                    differently to our guide, or if something arrived damaged in
                    transit, that is our problem to fix and we would rather hear
                    about it than have you quietly stop shopping with us.
                  </p>
                  <p>
                    Exchanges are open for seven days from the day your parcel
                    arrives, provided the item is unused, unwashed and still carries
                    its original tags. Send us your order number on WhatsApp or by
                    email and we arrange the collection and the replacement.
                  </p>
                </div>
                <div className="space-y-5">
                  <p>
                    Orders can be cancelled or changed at no cost at any point before
                    the parcel is handed to the courier, so a change of mind about a
                    size or a colour never has to become a complicated process.
                  </p>
                  <p>
                    Our support team is reachable {site.contact.hours[0].days} from{" "}
                    {site.contact.hours[0].time}, on {site.contact.hours[1].days}{" "}
                    from {site.contact.hours[1].time}, and on WhatsApp for urgent
                    questions outside those hours.
                  </p>
                </div>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/contact">Contact our support team</Button>
                <Button href={site.contact.whatsappHref} variant="outline" external>
                  <Icon name="whatsapp" size={18} />
                  Message us on WhatsApp
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why customers choose Xpectra Media */}
      <section
        aria-labelledby="why-choose-us"
        className="scroll-mt-24 border-y border-line-soft bg-ink-soft py-16 md:py-20"
      >
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="Why shop with us"
              title="Why customers choose Xpectra Media"
              description="Six reasons that come up again and again when customers tell us why they ordered a second time."
            />
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reasonsToChoose.map((reason, index) => (
              <Reveal key={reason.title} delay={(index % 3) * 90}>
                <article className="h-full rounded-2xl border border-line-soft bg-surface p-6 sm:p-7">
                  <span className="mb-5 grid h-11 w-11 place-items-center rounded-xl border border-line bg-surface-2 text-brand">
                    <Icon name={reason.icon} size={22} />
                  </span>
                  <h3 className="font-display text-lg font-bold text-white">
                    {reason.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-mist">
                    {reason.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Departments */}
      <section aria-labelledby="departments" className="scroll-mt-24 py-16 md:py-20">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="Explore the store"
              title="Three departments, one delivery"
              description="Shop for everybody in the household in a single order and let the whole parcel arrive together."
            />
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, index) => (
              <Reveal key={category.slug} delay={index * 90}>
                <CategoryCard
                  title={category.name}
                  description={category.tagline}
                  image={category.image}
                  href={category.href}
                  buttonLabel={`Shop ${category.name}`}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section aria-labelledby="about-cta" className="scroll-mt-24 pb-20 md:pb-24">
        <div className="shell">
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl border border-line-soft bg-surface p-8 text-center sm:p-12 lg:p-16">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(70% 120% at 50% 0%, rgba(30,144,255,0.20) 0%, rgba(30,144,255,0) 70%)",
                }}
              />
              <div className="relative">
                <h2
                  id="about-cta"
                  className="mx-auto max-w-2xl font-display text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl"
                >
                  Ready to see what we have picked for this season
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-mist">
                  Browse the full catalogue of clothing and toys, or talk to our team
                  first if you want help with sizing, fabric or gift ideas. Cash on
                  Delivery is available everywhere in Pakistan and delivery is free
                  on orders of PKR 5,000 and above.
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                  <Button href="/products" size="lg">
                    Shop all products
                    <Icon name="arrowRight" size={18} />
                  </Button>
                  <Button href="/contact" size="lg" variant="outline">
                    Contact Xpectra Media
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
