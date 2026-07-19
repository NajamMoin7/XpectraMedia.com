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
    "Learn about Xpectra Media, an online clothing store offering affordable modern fashion for men, women and kids, plus baby clothes and toys, with free shipping over $75 and easy 30 day returns.",
  path: "/about",
  keywords: [
    "about Xpectra Media",
    "online clothing store",
    "modern fashion online",
    "affordable modern fashion",
    "family shopping online",
    "everyday clothing",
    "fashion essentials",
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
      "We price for families who shop for a whole household at once, not for a single showpiece purchase. What you see on the product card is what you pay at checkout.",
  },
  {
    icon: "truck",
    title: "Free shipping over $75",
    description:
      "Standard shipping is free once your order reaches $75, and a flat $6.95 below that, with most parcels arriving in three to seven business days.",
  },
  {
    icon: "wallet",
    title: "Cash on Delivery",
    description:
      "Pay when your parcel reaches your door. No advance transfer, no card details and no online payment form to fill in before you have seen your order.",
  },
  {
    icon: "refresh",
    title: "Easy 30 day returns",
    description:
      "If a size does not work, contact us within 30 days of delivery with the item unworn and tagged, and our team arranges the return or exchange without an argument.",
  },
  {
    icon: "headset",
    title: "Support that answers properly",
    description:
      "Real people on the phone and on email during business hours, ready to check a measurement, confirm stock or update an order before it ships.",
  },
];

/** Imagery used in the departments collage. */
const storyImages = [
  {
    src: "/assets/images/categories/men.jpg",
    alt: "Men's clothing at Xpectra Media including cotton shirts, tees and denim",
  },
  {
    src: "/assets/images/categories/women.jpg",
    alt: "Women's clothing at Xpectra Media including everyday tops, dresses and knitwear",
  },
  {
    src: "/assets/images/categories/kids.jpg",
    alt: "Kids clothing at Xpectra Media including graphic tees, hoodies and jogger sets",
  },
  {
    src: "/assets/images/categories/baby.jpg",
    alt: "Baby clothes at Xpectra Media in soft cotton, including rompers and everyday sets",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageBanner
        eyebrow="About Us"
        title="Modern style for every moment, and for everyone at home"
        description="Xpectra Media is an online clothing store built around one simple idea: one cart, one delivery, everything the people in your home actually wear and play with."
        crumbs={[{ name: "About Us", href: "/about" }]}
      />

      {/* Company introduction */}
      <section
        aria-labelledby="introduction"
        className="scroll-mt-24 bg-canvas py-16 md:py-20"
      >
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <Reveal>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-brand">
                Who we are
              </p>
              <h2
                id="introduction"
                className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl lg:text-4xl"
              >
                An online store for the whole household
              </h2>
              <div className="mt-6 space-y-5 text-base leading-relaxed text-slate">
                <p>
                  Xpectra Media brings men&apos;s clothing online, women&apos;s
                  clothing online, kids clothing online, baby clothes online and
                  toys online together in a single catalogue, so a family can
                  dress everybody and pick up a gift for a child in one order.
                </p>
                <p>
                  Our range covers everyday fashion essentials: oversized tees,
                  premium cotton shirts, stretch denim and cargo pants, casual
                  dresses, wide leg pants, knit sweaters and activewear sets,
                  soft cotton pieces for newborns, and toys chosen for safety as
                  much as for play value. Each department is curated rather than
                  endless, because a short list of genuinely good pieces is more
                  useful than thousands of listings you have to sift through.
                </p>
                <p>
                  Checkout is Cash on Delivery. You place the order, we confirm
                  it with you, and you pay the courier once the parcel is in your
                  hands. Standard shipping is a flat $6.95 and becomes free once
                  your subtotal reaches $75.
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
                    className={`relative overflow-hidden rounded-3xl border border-line bg-card shadow-[var(--shadow-soft)] ${
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
        className="scroll-mt-24 border-y border-line bg-mist py-14 md:py-16"
      >
        <div className="shell">
          <h2 id="by-the-numbers" className="sr-only">
            Xpectra Media by the numbers
          </h2>
          <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
            {companyStats.map((stat, index) => (
              <Reveal key={stat.label} delay={index * 90}>
                <div className="rounded-3xl border border-line bg-card px-5 py-7 text-center shadow-[var(--shadow-soft)] sm:px-6">
                  <p className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                    {stat.value}
                    {stat.suffix ? (
                      <span className="ml-1.5 align-middle text-base font-semibold text-brand sm:text-lg">
                        {stat.suffix}
                      </span>
                    ) : null}
                  </p>
                  <p className="mt-3 text-sm font-medium text-slate">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Brand story */}
      <section aria-labelledby="our-story" className="scroll-mt-24 bg-canvas py-16 md:py-20">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="Our story"
              title="Built out of frustration with online shopping"
              description="Xpectra Media began with a complaint almost every online shopper will recognize, and a stubborn belief that it did not have to be that way."
            />
          </Reveal>

          <div className="mt-10 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <Reveal>
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-line bg-card shadow-[var(--shadow-soft)]">
                <Image
                  src="/assets/images/about/team.jpg"
                  alt="The Xpectra Media team reviewing new season samples together"
                  fill
                  sizes="(max-width: 1024px) 100vw, 38vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="grid gap-6 sm:grid-cols-2">
                <article className="h-full rounded-3xl border border-line bg-card p-6 shadow-[var(--shadow-soft)] sm:p-7">
                  <h3 className="font-display text-lg font-bold text-ink">
                    The problem we kept running into
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-slate">
                    A shirt photographed under studio lights arrives in a
                    completely different shade. A pant listed as regular fit
                    turns out to be cut for somebody else entirely. The size
                    chart is a stock image borrowed from another store, and
                    nobody answers the email afterwards.
                  </p>
                </article>

                <article className="h-full rounded-3xl border border-line bg-card p-6 shadow-[var(--shadow-soft)] sm:p-7">
                  <h3 className="font-display text-lg font-bold text-ink">
                    How we decided to do it differently
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-slate">
                    We started small, with a handful of tees and cotton shirts we
                    had worn ourselves through a full season. We wrote the
                    descriptions the way we would explain a garment to a friend,
                    listed the real fabric composition, and photographed the
                    actual color rather than a flattering one.
                  </p>
                </article>

                <article className="h-full rounded-3xl border border-line bg-card p-6 shadow-[var(--shadow-soft)] sm:p-7">
                  <h3 className="font-display text-lg font-bold text-ink">
                    Where we are today
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-slate">
                    That handful of pieces grew into five departments covering
                    everyday clothing for men, women and kids, gentle baby
                    clothes and a carefully chosen toy range, shipped to
                    customers right across the country.
                  </p>
                </article>

                <article className="h-full rounded-3xl border border-line bg-card p-6 shadow-[var(--shadow-soft)] sm:p-7">
                  <h3 className="font-display text-lg font-bold text-ink">
                    What has not changed
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-slate">
                    The catalogue is larger and the shipping network is wider,
                    but the rule is exactly the same one we started with: if we
                    would not buy it ourselves, it does not go on the website.
                  </p>
                </article>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Mission and vision */}
      <section
        aria-labelledby="mission-and-vision"
        className="scroll-mt-24 border-y border-line bg-mist py-16 md:py-20"
      >
        <div className="shell">
          <h2 id="mission-and-vision" className="sr-only">
            Our mission and vision
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Reveal>
              <article className="h-full rounded-3xl border border-line bg-card p-7 shadow-[var(--shadow-soft)] sm:p-9">
                <span className="mb-6 grid h-12 w-12 place-items-center rounded-2xl border border-line bg-brand-tint text-brand">
                  <Icon name="bolt" size={24} />
                </span>
                <h3 className="font-display text-xl font-bold tracking-tight text-ink sm:text-2xl">
                  Our mission
                </h3>
                <p className="mt-4 text-base leading-relaxed text-slate">
                  To make dependable everyday clothing and safe, well made toys
                  available to every household at a price that does not require a
                  second thought, described honestly enough that ordering online
                  feels as certain as picking the item up in a store.
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    "Describe every product exactly as it is, including its limitations",
                    "Keep shipping fast and affordable, and free once an order reaches $75",
                    "Answer every customer message with a real, useful reply",
                  ].map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-slate">
                      <Icon name="check" size={18} className="mt-0.5 shrink-0 text-brand" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>

            <Reveal delay={120}>
              <article className="h-full rounded-3xl border border-line bg-card p-7 shadow-[var(--shadow-soft)] sm:p-9">
                <span className="mb-6 grid h-12 w-12 place-items-center rounded-2xl border border-line bg-brand-tint text-brand">
                  <Icon name="sparkle" size={24} />
                </span>
                <h3 className="font-display text-xl font-bold tracking-tight text-ink sm:text-2xl">
                  Our vision
                </h3>
                <p className="mt-4 text-base leading-relaxed text-slate">
                  To become the store a family opens first, whether they are
                  buying school clothes in August, a winter coat in November or a
                  birthday gift on a Tuesday evening, and to prove that modern
                  fashion online can be affordable without feeling disposable.
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    "One trusted catalogue covering men, women, kids, baby and toys",
                    "A shopping experience judged by repeat customers, not by one time sales",
                    "Fashion essentials that stay in the wardrobe well past a single season",
                  ].map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-slate">
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
      <section aria-labelledby="core-values" className="scroll-mt-24 bg-canvas py-16 md:py-20">
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
                <article className="h-full rounded-3xl border border-line bg-card p-6 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-[var(--shadow-lift)] sm:p-7">
                  <span className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-tint font-display text-sm font-bold text-brand-deep">
                    {index + 1}
                  </span>
                  <h3 className="font-display text-lg font-bold text-ink">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-slate">
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
        className="scroll-mt-24 border-y border-line bg-mist py-16 md:py-20"
      >
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <Reveal>
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-line bg-card shadow-[var(--shadow-soft)] sm:aspect-[4/3] lg:aspect-[4/5]">
                <Image
                  src="/assets/images/about/studio.jpg"
                  alt="Fabric and finish being checked in the Xpectra Media studio before a product goes live"
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
                className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl lg:text-4xl"
              >
                Checked before it is listed, not after you complain
              </h2>
              <div className="mt-6 space-y-5 text-base leading-relaxed text-slate">
                <p>
                  Before any garment joins the catalogue it goes through the same
                  routine. We check the fabric weight and composition, wash a
                  sample to see how the color and shape hold, inspect the seams
                  and stitching density at the stress points, and try the piece on
                  to confirm that the measurements on the size guide are the real
                  ones.
                </p>
                <p>
                  Toys are held to a separate standard because children put them
                  in their mouths. Our wooden toys use water based non toxic paint
                  with hand rounded edges, our soft toys use embroidered features
                  instead of plastic eyes so there are no small parts to come
                  loose, and our plastic toys are made from food grade material
                  that is free from BPA.
                </p>
              </div>
              <ul className="mt-7 grid gap-4 sm:grid-cols-2">
                {[
                  {
                    title: "Fabric first",
                    body: "Composition and weight are chosen for real summers and real winters before styling is considered.",
                  },
                  {
                    title: "Wash tested",
                    body: "Samples are washed to check shrinkage, color hold and pilling before a listing goes live.",
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
                    className="rounded-2xl border border-line bg-card p-5 shadow-[var(--shadow-soft)]"
                  >
                    <h3 className="font-display text-sm font-bold text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate">{item.body}</p>
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
        className="scroll-mt-24 bg-canvas py-16 md:py-20"
      >
        <div className="shell">
          <Reveal>
            <div className="grid gap-10 overflow-hidden rounded-3xl border border-line bg-card p-7 shadow-[var(--shadow-soft)] sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:p-14">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-brand">
                  Customer satisfaction
                </p>
                <h2
                  id="customer-satisfaction"
                  className="max-w-2xl font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl lg:text-4xl"
                >
                  Your order is not finished until you are happy with it
                </h2>
                <div className="mt-6 space-y-5 text-base leading-relaxed text-slate">
                  <p>
                    We treat the moment the parcel opens as the real test. If the
                    color is not what the photograph promised, if the size runs
                    differently to our guide, or if something arrived damaged in
                    transit, that is our problem to fix and we would rather hear
                    about it than have you quietly stop shopping with us.
                  </p>
                  <p>
                    Returns and exchanges stay open for 30 days from the day your
                    parcel arrives, provided the item is unworn, unwashed and
                    still carries its original tags. Send us your order number by
                    email or through the contact form and we arrange the return
                    label and the replacement.
                  </p>
                  <p>
                    Orders can be canceled or changed at no cost at any point
                    before the parcel is handed to the courier, so a change of
                    mind about a size or a color never has to become a
                    complicated process. Our support team answers{" "}
                    {site.contact.hours[0].days} from {site.contact.hours[0].time}
                    , and {site.contact.hours[1].days} from{" "}
                    {site.contact.hours[1].time}.
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button href="/contact">Contact our support team</Button>
                  <Button href="/contact#faq" variant="outline">
                    Read the FAQ
                  </Button>
                </div>
              </div>

              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line lg:aspect-[3/4]">
                <Image
                  src="/assets/images/hero/store.jpg"
                  alt="A shopper browsing the Xpectra Media collection of everyday clothing"
                  fill
                  sizes="(max-width: 1024px) 100vw, 32vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why customers choose Xpectra Media */}
      <section
        aria-labelledby="why-choose-us"
        className="scroll-mt-24 border-y border-line bg-mist py-16 md:py-20"
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
                <article className="h-full rounded-3xl border border-line bg-card p-6 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-[var(--shadow-lift)] sm:p-7">
                  <span className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-brand-tint text-brand">
                    <Icon name={reason.icon} size={22} />
                  </span>
                  <h3 className="font-display text-lg font-bold text-ink">
                    {reason.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-slate">
                    {reason.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Departments */}
      <section aria-labelledby="departments" className="scroll-mt-24 bg-canvas py-16 md:py-20">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="Explore the store"
              title="Five departments, one delivery"
              description="Shop for everybody in the household in a single order and let the whole parcel arrive together."
            />
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, index) => (
              <Reveal key={category.slug} delay={(index % 3) * 90}>
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
      <section aria-labelledby="about-cta" className="scroll-mt-24 bg-canvas pb-20 md:pb-24">
        <div className="shell">
          <Reveal>
            <div className="brand-wash relative overflow-hidden rounded-3xl border border-line bg-card p-8 text-center shadow-[var(--shadow-soft)] sm:p-12 lg:p-16">
              <div className="relative">
                <h2
                  id="about-cta"
                  className="mx-auto max-w-2xl font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl lg:text-4xl"
                >
                  Ready to see what we have picked for this season
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate">
                  Browse the full catalogue of clothing and toys, or talk to our
                  team first if you want help with sizing, fabric or gift ideas.
                  Shipping is free on orders of $75 and above, and every order is
                  covered by 30 day returns.
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
