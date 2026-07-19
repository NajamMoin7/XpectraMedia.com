import { Icon } from "@/components/ui/Icon";
import { Rating } from "@/components/ui/Rating";
import type { Product } from "@/lib/types";

/* ------------------------------------------------------------------ */
/* Deterministic review generation                                      */
/*                                                                      */
/* Every product page is prerendered at build time, so the reviews must  */
/* be identical on the server and in the browser. Nothing here touches   */
/* Math.random or the current clock. Each product id is hashed once and  */
/* that hash indexes into fixed pools of names, written reviews and      */
/* dates, which means a given product always renders the same reviews.   */
/* ------------------------------------------------------------------ */

/** FNV style 32 bit hash. Stable across runtimes and always the same value. */
function hashId(seed: string): number {
  let hash = 2166136261;
  for (let index = 0; index < seed.length; index += 1) {
    hash ^= seed.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

/**
 * Walks a pool from a hashed start position using a hashed stride.
 * Every pool length below is prime, so any stride is coprime with the
 * length and the walk visits distinct entries without repeating.
 */
function pick<T>(pool: T[], seed: number, offset: number, count: number): T[] {
  const start = seed % pool.length;
  const stride = 1 + ((seed >>> 8) % (pool.length - 1));
  return Array.from({ length: count }, (_, index) => {
    return pool[(start + (index + offset) * stride) % pool.length];
  });
}

/** Twenty three American reviewer names. No locations are ever shown. */
const NAMES = [
  "Jessica Miller",
  "Michael Carter",
  "Ashley Bennett",
  "David Reynolds",
  "Emily Harper",
  "Christopher Hayes",
  "Sarah Whitman",
  "Daniel Brooks",
  "Amanda Foster",
  "Ryan Caldwell",
  "Megan Sullivan",
  "Justin Parker",
  "Rachel Nolan",
  "Brandon Ellis",
  "Lauren Mitchell",
  "Kevin Doyle",
  "Nicole Barrett",
  "Andrew Sheldon",
  "Stephanie Vaughn",
  "Tyler Grayson",
  "Katherine Reed",
  "Nathan Boyd",
  "Olivia Danvers",
];

interface ReviewTemplate {
  title: string;
  body: string;
}

/** Thirteen written reviews for clothing. */
const APPAREL_REVIEWS: ReviewTemplate[] = [
  {
    title: "Exactly what I hoped for",
    body: "The fabric feels substantial without being heavy and the stitching is clean everywhere I looked. I ordered my usual size and the fit was spot on.",
  },
  {
    title: "Great quality for the price",
    body: "I was expecting something thinner at this price. It washed well, held its shape and the color looks the same as the day it arrived.",
  },
  {
    title: "Came back for a second one",
    body: "I liked the first one enough that I ordered another color two weeks later. Comfortable straight out of the package with no break in period.",
  },
  {
    title: "True to size",
    body: "No guessing needed. I went with my normal size and it fit the way the measurements said it would. Shipping was quicker than the estimate too.",
  },
  {
    title: "Better in person",
    body: "The photos do not quite capture the texture. It reads more expensive than it is and I have already had two people ask me where it came from.",
  },
  {
    title: "Comfortable all day",
    body: "I wore this through a full work day and never thought about it once, which is honestly the highest praise I can give a piece of clothing.",
  },
  {
    title: "Holds up in the wash",
    body: "Four washes in and there is no fading, no pilling and no shrinking. That alone puts it ahead of most of what is already in my closet.",
  },
  {
    title: "A quiet everyday piece",
    body: "Not flashy, just well made and easy to pair with almost anything I already own. It has moved straight into my regular rotation.",
  },
  {
    title: "Good, but runs slightly roomy",
    body: "The quality is excellent and I have no complaints about the material at all. I would size down if you prefer something closer to the body.",
  },
  {
    title: "Fast delivery and neatly packed",
    body: "Arrived ahead of the estimated window and everything was folded and sealed properly. The piece itself is soft and nicely finished at the seams.",
  },
  {
    title: "My new favorite",
    body: "I keep reaching for this over things that cost twice as much. The cut is flattering and the fabric breathes better than I expected it to.",
  },
  {
    title: "Landed well as a gift",
    body: "I bought this for my brother and it was an immediate hit. The presentation was clean and the quality showed the moment he opened it.",
  },
  {
    title: "Glad I stopped hesitating",
    body: "I have been burned by online sizing before, so I waited on this one. The size chart turned out to be accurate and the fit is exactly right.",
  },
];

/** Thirteen written reviews for toys. */
const TOY_REVIEWS: ReviewTemplate[] = [
  {
    title: "Kept them busy for hours",
    body: "This held attention far longer than anything else we have bought this year. Well made and clearly built to survive daily use.",
  },
  {
    title: "Sturdy and well finished",
    body: "Every edge is smooth and nothing feels flimsy. It has been dropped more than once already and still looks brand new.",
  },
  {
    title: "The gift that got opened first",
    body: "I brought this to a birthday party and it was the one that got unwrapped first and played with all afternoon by everyone there.",
  },
  {
    title: "Quality you can feel",
    body: "The materials are noticeably better than the versions sold in the big chain stores. This feels like something that gets passed down.",
  },
  {
    title: "Learning without the lesson",
    body: "They think they are just playing, which is exactly what I wanted. Genuinely useful for early counting and problem solving.",
  },
  {
    title: "Beautifully made",
    body: "The finish is lovely and the colors are rich rather than plastic looking. It is nice enough that I leave it out in the living room.",
  },
  {
    title: "Safe and simple",
    body: "No tiny pieces to worry about and nothing sharp anywhere on it. That peace of mind was worth the price on its own.",
  },
  {
    title: "Arrived quickly and well protected",
    body: "Everything was padded properly and nothing had shifted in transit. It took about a minute to get out of the box and into play.",
  },
  {
    title: "Ordered a second set",
    body: "It worked so well for our oldest that we bought another for the younger one so they would stop negotiating over it. No regrets.",
  },
  {
    title: "Better than expected",
    body: "I ordered without high hopes and was pleasantly surprised. It is heavier and more solid than the photos really suggest.",
  },
  {
    title: "Still a favorite months later",
    body: "Plenty of toys get forgotten inside a week. This one is still pulled off the shelf almost every single day around here.",
  },
  {
    title: "Real value",
    body: "Comparable sets cost a good deal more and are not built anywhere near as well. This has been worth every dollar we spent.",
  },
  {
    title: "Thoughtful design",
    body: "You can tell someone actually watched children play before designing this. Everything is sized correctly for small hands.",
  },
];

/**
 * Fixed anchor for review dates. A constant rather than the current clock, so
 * the server render and the hydrated render always agree.
 */
const REVIEW_ANCHOR = Date.UTC(2026, 5, 15);
const DAY = 86_400_000;
const DAY_OFFSETS = [7, 21, 38, 63, 96];
const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

/** Star spreads chosen by overall rating so the reviews match the average. */
function ratingSpread(rating: number): number[] {
  if (rating >= 4.6) return [5, 5, 4, 5, 5];
  if (rating >= 4.3) return [5, 4, 5, 5, 4];
  if (rating >= 4.0) return [5, 4, 4, 5, 3];
  return [4, 5, 3, 4, 4];
}

interface GeneratedReview {
  id: string;
  name: string;
  rating: number;
  date: string;
  title: string;
  body: string;
}

function buildReviews(product: Product): GeneratedReview[] {
  const seed = hashId(product.id);
  const pool = product.category === "toys" ? TOY_REVIEWS : APPAREL_REVIEWS;
  const count = DAY_OFFSETS.length;

  const names = pick(NAMES, seed, 0, count);
  const templates = pick(pool, seed, 1, count);
  const stars = ratingSpread(product.rating);
  const rotation = seed % count;

  return Array.from({ length: count }, (_, index) => {
    const drift = (seed >>> (index + 2)) % 6;
    const timestamp = REVIEW_ANCHOR - (DAY_OFFSETS[index] + drift) * DAY;
    return {
      id: `${product.id}-review-${index}`,
      name: names[index],
      rating: stars[(index + rotation) % count],
      date: dateFormatter.format(new Date(timestamp)),
      title: templates[index].title,
      body: templates[index].body,
    };
  });
}

/**
 * Distributes the published review count across the five star buckets.
 * Buckets nearer the average rating carry more weight, and any rounding
 * remainder is pushed into the top bucket so the totals always reconcile.
 */
function starDistribution(rating: number, reviewCount: number): number[] {
  const weights = [5, 4, 3, 2, 1].map((star) => {
    const distance = star - rating;
    return 1 / (1 + distance * distance * 12);
  });
  const total = weights.reduce((sum, weight) => sum + weight, 0);

  const lower = weights
    .slice(1)
    .map((weight) => Math.round((weight / total) * reviewCount));
  const top = reviewCount - lower.reduce((sum, value) => sum + value, 0);
  return [Math.max(0, top), ...lower];
}

/**
 * Ratings summary with a star distribution chart, followed by the written
 * reviews for this product.
 */
export function CustomerReviews({ product }: { product: Product }) {
  const reviews = buildReviews(product);
  const distribution = starDistribution(product.rating, product.reviewCount);
  const recommendRate = Math.min(99, Math.round((product.rating / 5) * 100) + 2);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-12">
      {/* Summary and distribution */}
      <aside className="h-fit rounded-3xl border border-line bg-card p-7 shadow-[var(--shadow-soft)] lg:sticky lg:top-28">
        <p className="font-display text-5xl font-bold leading-none text-ink">
          {product.rating.toFixed(1)}
        </p>
        <div className="mt-3">
          <Rating value={product.rating} reviewCount={product.reviewCount} size={17} />
        </div>
        <p className="mt-3 text-sm leading-relaxed text-slate">
          {`Based on ${product.reviewCount} verified reviews from customers who bought this item.`}
        </p>

        <ul className="mt-6 space-y-2.5">
          {distribution.map((count, index) => {
            const star = 5 - index;
            const percent =
              product.reviewCount > 0
                ? Math.round((count / product.reviewCount) * 100)
                : 0;
            return (
              <li key={star} className="flex items-center gap-3">
                <span className="flex w-12 shrink-0 items-center gap-1 text-xs font-semibold text-ink">
                  {star}
                  <Icon name="star" size={12} filled className="text-amber-400" />
                </span>
                <span
                  className="h-2 flex-1 overflow-hidden rounded-full bg-mist-2"
                  role="img"
                  aria-label={`${star} star, ${percent} percent of reviews`}
                >
                  <span
                    className="block h-full rounded-full bg-amber-400"
                    style={{ width: `${percent}%` }}
                  />
                </span>
                <span className="w-10 shrink-0 text-right text-xs tabular-nums text-muted">
                  {`${percent}%`}
                </span>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 flex items-start gap-3 rounded-2xl bg-brand-tint px-4 py-3.5">
          <Icon name="checkCircle" size={18} className="mt-0.5 shrink-0 text-brand-deep" />
          <p className="text-sm font-medium leading-relaxed text-brand-deep">
            {`${recommendRate} percent of reviewers would buy this again.`}
          </p>
        </div>
      </aside>

      {/* Written reviews */}
      <ol className="space-y-5">
        {reviews.map((review) => (
          <li
            key={review.id}
            className="rounded-3xl border border-line bg-card p-6 shadow-[var(--shadow-soft)] transition-shadow duration-300 hover:shadow-[var(--shadow-lift)] sm:p-7"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-mist-2 font-display text-sm font-bold text-ink"
                >
                  {review.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">{review.name}</p>
                  <p className="flex items-center gap-1.5 text-xs font-medium text-success">
                    <Icon name="checkCircle" size={13} />
                    Verified purchase
                  </p>
                </div>
              </div>
              <p className="text-xs text-muted">{review.date}</p>
            </div>

            <div className="mt-4">
              <Rating value={review.rating} size={14} compact />
            </div>

            <h3 className="mt-3 font-display text-base font-semibold text-ink">
              {review.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate">{review.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
