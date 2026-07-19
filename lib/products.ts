import type {
  CategorySlug,
  Product,
  SortOption,
  SubcategorySlug,
} from "@/lib/types";

/**
 * Builds the three gallery image paths for a product.
 * Artwork lives in public/assets/images/products and is generated per slug.
 */
function img(slug: string): string[] {
  return [1, 2, 3].map((n) => `/assets/images/products/${slug}-${n}.svg`);
}

/** Reusable colour swatches so palettes stay consistent across the catalogue. */
const SWATCH = {
  white: { name: "Optic White", hex: "#f4f6f8" },
  black: { name: "Jet Black", hex: "#12151a" },
  navy: { name: "Deep Navy", hex: "#1b2a44" },
  charcoal: { name: "Charcoal Grey", hex: "#3a4049" },
  sky: { name: "Sky Blue", hex: "#7db4e6" },
  electric: { name: "Electric Blue", hex: "#1e90ff" },
  beige: { name: "Sand Beige", hex: "#cbb79a" },
  olive: { name: "Olive Green", hex: "#5c6b4a" },
  maroon: { name: "Rich Maroon", hex: "#6d2434" },
  blush: { name: "Blush Pink", hex: "#e3b5bd" },
  mint: { name: "Soft Mint", hex: "#a9d6c4" },
  lilac: { name: "Lilac", hex: "#b9a7d6" },
  mustard: { name: "Mustard", hex: "#d1a53c" },
  teal: { name: "Ocean Teal", hex: "#2f7d80" },
  cream: { name: "Warm Cream", hex: "#efe4d2" },
  rust: { name: "Rust", hex: "#a8552f" },
} as const;

const ADULT_SIZES = ["Small", "Medium", "Large", "Extra Large"];
const KID_SIZES = ["2 to 3 Years", "4 to 5 Years", "6 to 7 Years", "8 to 9 Years"];
const BABY_SIZES = ["Newborn", "3 to 6 Months", "6 to 12 Months", "12 to 18 Months"];
const ONE_SIZE = ["One Size"];

const COTTON_CARE = [
  "Machine wash cold with similar colours",
  "Do not bleach",
  "Tumble dry on low heat",
  "Warm iron on the reverse side",
];

const DELICATE_CARE = [
  "Dry clean recommended for the first wash",
  "Hand wash gently in cold water afterwards",
  "Do not wring or soak for long periods",
  "Iron on low heat with a pressing cloth",
];

const TOY_CARE = [
  "Wipe clean with a soft damp cloth",
  "Keep away from direct heat and moisture",
  "Check regularly for wear before play",
  "Store in a dry place after use",
];

const PLUSH_CARE = [
  "Surface wash with mild soap and lukewarm water",
  "Air dry completely before returning to play",
  "Do not machine wash or tumble dry",
  "Brush the fur gently to keep it soft",
];

/**
 * The full Xpectra Media catalogue.
 * Prices are in PKR and every entry is realistic sample data.
 */
export const products: Product[] = [
  /* ---------------------------------------------------------------- MEN */
  {
    id: "xm-001",
    name: "Classic Oxford Casual Shirt",
    slug: "classic-oxford-casual-shirt",
    category: "men",
    subcategory: "shirts",
    shortDescription:
      "A breathable oxford cotton casual shirt built for everyday comfort and easy layering.",
    detailedDescription:
      "The Classic Oxford Casual Shirt is the piece you reach for when the day could go anywhere. Woven from breathable oxford cotton with a soft finish, it holds a clean shape through long hours without feeling stiff. The regular fit leaves room across the shoulders and chest, the buttoned cuffs roll neatly for warm afternoons, and the collar sits well whether you wear it open or fastened. Pair it with chinos for the office or with denim on the weekend and it works both ways.",
    price: 2290,
    originalPrice: 3190,
    discount: 28,
    rating: 4.6,
    reviewCount: 184,
    stock: 42,
    sizes: ADULT_SIZES,
    colors: [SWATCH.white, SWATCH.sky, SWATCH.navy, SWATCH.charcoal],
    images: img("classic-oxford-casual-shirt"),
    features: [
      "Breathable oxford cotton weave",
      "Regular fit through the chest and shoulders",
      "Reinforced button stitching",
      "Curved hem that stays tidy untucked",
      "Colour retention after repeated washing",
    ],
    material: "100 percent combed cotton oxford, 140 GSM",
    careInstructions: COTTON_CARE,
    featured: true,
    newArrival: false,
  },
  {
    id: "xm-002",
    name: "Midnight Formal Dress Shirt",
    slug: "midnight-formal-dress-shirt",
    category: "men",
    subcategory: "shirts",
    shortDescription:
      "A sharp formal shirt in a deep tone with a crisp collar that holds its shape all day.",
    detailedDescription:
      "Some occasions ask for a shirt that simply looks correct. The Midnight Formal Dress Shirt answers with a smooth poplin weave, a structured collar and a slim placket that sits flat under a jacket. The tailored cut tapers gently at the waist without restricting movement, and the fabric carries a soft sheen that photographs beautifully under evening light. It is an easy choice for interviews, weddings, formal dinners and every meeting that matters.",
    price: 2790,
    originalPrice: 3890,
    discount: 28,
    rating: 4.7,
    reviewCount: 141,
    stock: 33,
    sizes: ADULT_SIZES,
    colors: [SWATCH.navy, SWATCH.black, SWATCH.white],
    images: img("midnight-formal-dress-shirt"),
    features: [
      "Smooth poplin weave with a subtle sheen",
      "Structured collar that resists creasing",
      "Tailored fit through the waist",
      "Single button barrel cuffs",
      "Sits flat under a blazer",
    ],
    material: "Cotton rich poplin blend, 120 GSM",
    careInstructions: COTTON_CARE,
    featured: true,
    newArrival: false,
  },
  {
    id: "xm-003",
    name: "Slate Checked Casual Shirt",
    slug: "slate-checked-casual-shirt",
    category: "men",
    subcategory: "shirts",
    shortDescription:
      "A soft brushed check shirt that layers well over a tee and works right through the season.",
    detailedDescription:
      "Checks never really leave, and this one earns its place through fabric rather than noise. The Slate Checked Casual Shirt uses a brushed cotton weave that feels warm to the touch from the very first wear. The pattern is scaled down so it reads as texture from a distance, which makes it far easier to style than a loud check. Wear it buttoned with trousers, or open over a plain tee when the evening cools down.",
    price: 2490,
    originalPrice: 3290,
    discount: 24,
    rating: 4.5,
    reviewCount: 98,
    stock: 27,
    sizes: ADULT_SIZES,
    colors: [SWATCH.charcoal, SWATCH.olive, SWATCH.maroon],
    images: img("slate-checked-casual-shirt"),
    features: [
      "Brushed cotton with a warm handfeel",
      "Small scale check that pairs easily",
      "Chest pocket with a clean finish",
      "Relaxed fit for layering",
      "Matched pattern across the placket",
    ],
    material: "100 percent brushed cotton, 160 GSM",
    careInstructions: COTTON_CARE,
    featured: false,
    newArrival: true,
  },
  {
    id: "xm-004",
    name: "Executive White Formal Shirt",
    slug: "executive-white-formal-shirt",
    category: "men",
    subcategory: "shirts",
    shortDescription:
      "A wardrobe essential in clean white with a wrinkle resistant finish for long working days.",
    detailedDescription:
      "A white formal shirt is the hardest working piece a man owns, so this one is built to last. The Executive White Formal Shirt uses a tightly woven cotton blend with a wrinkle resistant finish, which means it still looks presentable at six in the evening. The opaque weave keeps it professional, the reinforced collar band holds a tie neatly, and the double stitched side seams survive daily wear and frequent washing.",
    price: 2590,
    originalPrice: 3490,
    discount: 26,
    rating: 4.8,
    reviewCount: 233,
    stock: 51,
    sizes: ADULT_SIZES,
    colors: [SWATCH.white, SWATCH.sky],
    images: img("executive-white-formal-shirt"),
    features: [
      "Wrinkle resistant easy care finish",
      "Opaque weave suited to formal settings",
      "Reinforced collar band for tie wear",
      "Double stitched side seams",
      "Holds shape through frequent washing",
    ],
    material: "Cotton polyester blend, 130 GSM",
    careInstructions: COTTON_CARE,
    featured: true,
    newArrival: false,
  },
  {
    id: "xm-005",
    name: "Urban Chino Pants",
    slug: "urban-chino-pants",
    category: "men",
    subcategory: "pants",
    shortDescription:
      "Stretch cotton chinos with a clean straight leg that carries from the office to the weekend.",
    detailedDescription:
      "Urban Chino Pants sit right between formal trousers and denim, which is exactly why they get worn so often. A touch of elastane in the twill lets the fabric move with you through commutes, long meetings and evenings out. The straight leg falls cleanly over shoes without pooling, deep front pockets hold a phone securely, and the finished waistband stays flat under a tucked shirt.",
    price: 2890,
    originalPrice: 3990,
    discount: 28,
    rating: 4.6,
    reviewCount: 167,
    stock: 38,
    sizes: ADULT_SIZES,
    colors: [SWATCH.beige, SWATCH.navy, SWATCH.charcoal, SWATCH.olive],
    images: img("urban-chino-pants"),
    features: [
      "Cotton twill with comfort stretch",
      "Straight leg with a clean break",
      "Deep front pockets and secure back pockets",
      "Flat finished waistband",
      "Colourfast dye that resists fading",
    ],
    material: "97 percent cotton with 3 percent elastane twill",
    careInstructions: COTTON_CARE,
    featured: true,
    newArrival: false,
  },
  {
    id: "xm-006",
    name: "Cotton Cargo Pants",
    slug: "cotton-cargo-pants",
    category: "men",
    subcategory: "pants",
    shortDescription:
      "Rugged cargo pants with reinforced pockets, built for travel days and casual weekends.",
    detailedDescription:
      "Cotton Cargo Pants are made for the days that involve a lot of moving. Heavier cotton canvas takes on the wear without thinning, and the side pockets are reinforced at the stress points so they carry weight without sagging. The tapered ankle keeps the silhouette modern rather than bulky, and a partially elasticated back waist adds comfort on long journeys.",
    price: 3190,
    originalPrice: 4290,
    discount: 26,
    rating: 4.4,
    reviewCount: 76,
    stock: 24,
    sizes: ADULT_SIZES,
    colors: [SWATCH.olive, SWATCH.charcoal, SWATCH.beige],
    images: img("cotton-cargo-pants"),
    features: [
      "Durable cotton canvas construction",
      "Reinforced cargo pockets with flaps",
      "Tapered ankle for a modern line",
      "Part elasticated back waistband",
      "Bar tacked stress points",
    ],
    material: "100 percent cotton canvas, 260 GSM",
    careInstructions: COTTON_CARE,
    featured: false,
    newArrival: true,
  },
  {
    id: "xm-007",
    name: "Tailored Formal Trousers",
    slug: "tailored-formal-trousers",
    category: "men",
    subcategory: "trousers",
    shortDescription:
      "Sharply cut formal trousers with a pressed crease that holds through a full working day.",
    detailedDescription:
      "Tailored Formal Trousers give an outfit its structure. The fabric is a fine poly viscose blend chosen for the way it drapes, falling straight from the hip without clinging. A permanent centre crease keeps the leg looking sharp, the extended hook and bar closure sits flush under a shirt, and the half lining through the seat adds comfort while preventing the fabric from stretching out of shape.",
    price: 3290,
    originalPrice: 4590,
    discount: 28,
    rating: 4.7,
    reviewCount: 129,
    stock: 31,
    sizes: ADULT_SIZES,
    colors: [SWATCH.black, SWATCH.navy, SWATCH.charcoal],
    images: img("tailored-formal-trousers"),
    features: [
      "Fine poly viscose blend with a soft drape",
      "Permanent centre crease",
      "Extended hook and bar closure",
      "Half lined through the seat",
      "Slanted side pockets that lie flat",
    ],
    material: "Poly viscose suiting blend, 210 GSM",
    careInstructions: DELICATE_CARE,
    featured: false,
    newArrival: false,
  },
  {
    id: "xm-008",
    name: "Relaxed Denim Trousers",
    slug: "relaxed-denim-trousers",
    category: "men",
    subcategory: "trousers",
    shortDescription:
      "Mid weight denim trousers with a relaxed leg and a soft wash that feels broken in already.",
    detailedDescription:
      "Relaxed Denim Trousers skip the stiff break in period. The mid weight denim arrives with a soft enzyme wash, so it moves comfortably from the very first wear while keeping the depth of colour that makes good denim worth owning. The relaxed leg gives room through the thigh, the rise sits comfortably at the natural waist, and copper rivets reinforce the pockets that take the most strain.",
    price: 3490,
    originalPrice: 4790,
    discount: 27,
    rating: 4.5,
    reviewCount: 112,
    stock: 29,
    sizes: ADULT_SIZES,
    colors: [SWATCH.navy, SWATCH.black, SWATCH.sky],
    images: img("relaxed-denim-trousers"),
    features: [
      "Mid weight denim with a soft enzyme wash",
      "Relaxed leg with room through the thigh",
      "Copper rivets at the pocket corners",
      "Comfortable natural waist rise",
      "Chain stitched hem",
    ],
    material: "Cotton denim with light stretch, 12 ounce",
    careInstructions: COTTON_CARE,
    featured: false,
    newArrival: true,
  },
  {
    id: "xm-009",
    name: "Signature White Kurta Shalwar",
    slug: "signature-white-kurta-shalwar",
    category: "men",
    subcategory: "kurta-shalwar",
    shortDescription:
      "A refined white kurta shalwar in soft cotton, cut for comfort through long celebrations.",
    detailedDescription:
      "The Signature White Kurta Shalwar is the traditional set that belongs in every wardrobe. Soft breathable cotton keeps you cool through long gatherings, while the clean band collar and neatly finished placket give it a quietly formal presence. The shalwar is cut generously with a drawstring waist for genuine comfort, and the kurta length has been balanced so it looks right whether you are standing at a wedding or seated at a family dinner. It carries Eid, Jumma prayers and evening functions with equal ease.",
    price: 4990,
    originalPrice: 6990,
    discount: 29,
    rating: 4.9,
    reviewCount: 276,
    stock: 45,
    sizes: ADULT_SIZES,
    colors: [SWATCH.white, SWATCH.cream, SWATCH.sky],
    images: img("signature-white-kurta-shalwar"),
    features: [
      "Soft breathable cotton suited to warm weather",
      "Clean band collar with a neat placket",
      "Generously cut shalwar with a drawstring waist",
      "Balanced kurta length",
      "Side pockets finished with tidy seams",
    ],
    material: "100 percent cotton, 150 GSM",
    careInstructions: COTTON_CARE,
    featured: true,
    newArrival: false,
  },
  {
    id: "xm-010",
    name: "Charcoal Wash and Wear Kurta Shalwar",
    slug: "charcoal-wash-and-wear-kurta-shalwar",
    category: "men",
    subcategory: "kurta-shalwar",
    shortDescription:
      "An easy care kurta shalwar in deep charcoal that needs very little ironing after washing.",
    detailedDescription:
      "Wash and wear fabric solves a real problem, which is why this set has become a favourite. The Charcoal Wash and Wear Kurta Shalwar dries quickly and settles smooth with only a light press, making it ideal for travel and for anyone who wears traditional clothing daily. The deep charcoal tone is forgiving, the weave holds its colour through repeated washing, and the tailoring keeps a clean vertical line from shoulder to hem.",
    price: 4490,
    originalPrice: 5990,
    discount: 25,
    rating: 4.6,
    reviewCount: 158,
    stock: 36,
    sizes: ADULT_SIZES,
    colors: [SWATCH.charcoal, SWATCH.black, SWATCH.navy],
    images: img("charcoal-wash-and-wear-kurta-shalwar"),
    features: [
      "Wash and wear fabric that needs minimal ironing",
      "Quick drying weave suited to travel",
      "Deep colour that resists fading",
      "Clean vertical tailoring",
      "Reinforced side slits",
    ],
    material: "Poly cotton wash and wear blend, 170 GSM",
    careInstructions: COTTON_CARE,
    featured: false,
    newArrival: false,
  },

  /* -------------------------------------------------------------- WOMEN */
  {
    id: "xm-011",
    name: "Flowing Rayon Casual Shirt",
    slug: "flowing-rayon-casual-shirt",
    category: "women",
    subcategory: "shirts",
    shortDescription:
      "A softly draping rayon shirt with a relaxed silhouette that moves beautifully all day.",
    detailedDescription:
      "The Flowing Rayon Casual Shirt is built around the way the fabric falls. Rayon drapes rather than holds, so the relaxed silhouette skims the body instead of clinging, which keeps it comfortable in warm weather and flattering across sizes. Dropped shoulders soften the line, the button through front lets you wear it open as a light layer, and the slightly longer back hem pairs neatly with trousers or palazzos.",
    price: 2190,
    originalPrice: 2990,
    discount: 27,
    rating: 4.6,
    reviewCount: 192,
    stock: 47,
    sizes: ADULT_SIZES,
    colors: [SWATCH.blush, SWATCH.mint, SWATCH.white, SWATCH.teal],
    images: img("flowing-rayon-casual-shirt"),
    features: [
      "Soft rayon with a fluid drape",
      "Relaxed silhouette with dropped shoulders",
      "Button through front for open layering",
      "Longer back hem",
      "Lightweight and breathable",
    ],
    material: "100 percent viscose rayon, 110 GSM",
    careInstructions: DELICATE_CARE,
    featured: true,
    newArrival: false,
  },
  {
    id: "xm-012",
    name: "Embroidered Lawn Shirt",
    slug: "embroidered-lawn-shirt",
    category: "women",
    subcategory: "shirts",
    shortDescription:
      "Fine lawn fabric with detailed neckline embroidery, made for warm days and easy elegance.",
    detailedDescription:
      "Lawn is the fabric that carries Pakistani summers, and this shirt shows why. The weave is fine enough to stay cool through the hottest part of the afternoon while remaining opaque and comfortable. Thread embroidery runs across the neckline and shoulder in a pattern drawn by hand before it was digitised, giving it a warmth that machine standard motifs rarely have. It is the shirt that works for a family lunch and an evening visit without a change of clothes.",
    price: 2690,
    originalPrice: 3790,
    discount: 29,
    rating: 4.8,
    reviewCount: 214,
    stock: 39,
    sizes: ADULT_SIZES,
    colors: [SWATCH.cream, SWATCH.lilac, SWATCH.mint, SWATCH.blush],
    images: img("embroidered-lawn-shirt"),
    features: [
      "Fine lawn weave that stays cool",
      "Detailed thread embroidery at the neckline",
      "Opaque despite the light weight",
      "Comfortable straight cut",
      "Finished inner seams",
    ],
    material: "100 percent cotton lawn, 100 GSM",
    careInstructions: DELICATE_CARE,
    featured: true,
    newArrival: true,
  },
  {
    id: "xm-013",
    name: "Silk Blend Formal Shirt",
    slug: "silk-blend-formal-shirt",
    category: "women",
    subcategory: "shirts",
    shortDescription:
      "A polished formal shirt with a gentle sheen, tailored for office wear and evening occasions.",
    detailedDescription:
      "The Silk Blend Formal Shirt brings a quiet sheen to workwear. The blended fabric carries the softness of silk with the resilience of a modern weave, so it holds a pressed finish far longer than pure silk would. A concealed placket keeps the front line clean, the collar sits neatly under a jacket, and the gently tapered cut is professional without being restrictive.",
    price: 3290,
    originalPrice: 4490,
    discount: 27,
    rating: 4.7,
    reviewCount: 88,
    stock: 22,
    sizes: ADULT_SIZES,
    colors: [SWATCH.navy, SWATCH.white, SWATCH.maroon],
    images: img("silk-blend-formal-shirt"),
    features: [
      "Silk blend fabric with a soft sheen",
      "Concealed placket for a clean front",
      "Gently tapered professional cut",
      "Holds a pressed finish",
      "Sits neatly under a jacket",
    ],
    material: "Silk and viscose blend, 120 GSM",
    careInstructions: DELICATE_CARE,
    featured: false,
    newArrival: false,
  },
  {
    id: "xm-014",
    name: "High Waist Straight Trousers",
    slug: "high-waist-straight-trousers",
    category: "women",
    subcategory: "trousers",
    shortDescription:
      "Straight cut trousers with a high waist and a clean line that lengthens every outfit.",
    detailedDescription:
      "High Waist Straight Trousers do a lot of quiet work in a wardrobe. The raised waistband defines the natural waist and the straight leg falls without interruption, which lengthens the whole silhouette. The fabric holds enough structure to stay smooth while carrying just enough stretch for a full day of sitting, walking and moving. Wear them with a tucked shirt for the office or with a longer kameez for a softer look.",
    price: 2790,
    originalPrice: 3690,
    discount: 24,
    rating: 4.7,
    reviewCount: 156,
    stock: 34,
    sizes: ADULT_SIZES,
    colors: [SWATCH.black, SWATCH.beige, SWATCH.navy, SWATCH.charcoal],
    images: img("high-waist-straight-trousers"),
    features: [
      "High rise waistband that stays in place",
      "Straight leg with an uninterrupted line",
      "Structured fabric with comfort stretch",
      "Hidden side zip closure",
      "Functional side pockets",
    ],
    material: "Cotton blend twill with elastane, 200 GSM",
    careInstructions: COTTON_CARE,
    featured: true,
    newArrival: false,
  },
  {
    id: "xm-015",
    name: "Printed Palazzo Trousers",
    slug: "printed-palazzo-trousers",
    category: "women",
    subcategory: "trousers",
    shortDescription:
      "Wide leg palazzo trousers in a soft print, cut loose and cool for summer comfort.",
    detailedDescription:
      "Printed Palazzo Trousers are the answer to hot afternoons. The wide leg lets air move freely and the lightweight fabric never sticks, which makes them genuinely wearable when the temperature climbs. A fully elasticated waist means no adjusting through the day, and the print has been scaled so it reads clearly without overwhelming a simple top. They fold down small, which makes them a favourite for travel.",
    price: 2390,
    originalPrice: 3290,
    discount: 27,
    rating: 4.5,
    reviewCount: 103,
    stock: 41,
    sizes: ADULT_SIZES,
    colors: [SWATCH.teal, SWATCH.mustard, SWATCH.blush],
    images: img("printed-palazzo-trousers"),
    features: [
      "Wide leg that allows airflow",
      "Fully elasticated comfort waist",
      "Lightweight fabric that does not cling",
      "Balanced print scale",
      "Folds compactly for travel",
    ],
    material: "Viscose blend, 105 GSM",
    careInstructions: DELICATE_CARE,
    featured: false,
    newArrival: true,
  },
  {
    id: "xm-016",
    name: "Stretch Cotton Pants",
    slug: "stretch-cotton-pants",
    category: "women",
    subcategory: "pants",
    shortDescription:
      "Everyday cotton pants with real stretch and a smooth waistband that never digs in.",
    detailedDescription:
      "Stretch Cotton Pants were designed around the way most days actually go. The cotton is blended with elastane so the fabric recovers its shape instead of bagging at the knee, and the wide flat waistband sits smoothly without pressing. The slim straight leg keeps the look tidy under a kameez or a longer shirt, and the fabric weight is chosen to stay opaque while remaining light enough for daily wear.",
    price: 2190,
    originalPrice: 2890,
    discount: 24,
    rating: 4.6,
    reviewCount: 178,
    stock: 52,
    sizes: ADULT_SIZES,
    colors: [SWATCH.black, SWATCH.white, SWATCH.navy, SWATCH.beige],
    images: img("stretch-cotton-pants"),
    features: [
      "Cotton with elastane for shape recovery",
      "Wide flat waistband that lies smooth",
      "Slim straight leg",
      "Opaque yet lightweight",
      "Reinforced inner seams",
    ],
    material: "95 percent cotton with 5 percent elastane",
    careInstructions: COTTON_CARE,
    featured: false,
    newArrival: false,
  },
  {
    id: "xm-017",
    name: "Festive Chikankari Kurta Shalwar",
    slug: "festive-chikankari-kurta-shalwar",
    category: "women",
    subcategory: "kurta-shalwar",
    shortDescription:
      "A festive kurta shalwar with delicate chikankari work across the bodice and sleeves.",
    detailedDescription:
      "Chikankari is patient work, and it shows. This festive kurta shalwar carries fine white thread embroidery across the bodice and along the sleeves, worked so the pattern catches light as you move. The base fabric is a soft georgette with a full lining, which keeps the embroidery comfortable against the skin and gives the kurta a gentle weight that falls beautifully. The matching shalwar completes a set made for Eid, mehndi functions and evening celebrations.",
    price: 6990,
    originalPrice: 9490,
    discount: 26,
    rating: 4.9,
    reviewCount: 241,
    stock: 18,
    sizes: ADULT_SIZES,
    colors: [SWATCH.white, SWATCH.mint, SWATCH.blush, SWATCH.lilac],
    images: img("festive-chikankari-kurta-shalwar"),
    features: [
      "Fine chikankari thread embroidery",
      "Soft georgette base with a full lining",
      "Matching shalwar included",
      "Gentle weight that falls smoothly",
      "Finished with a neat inner facing",
    ],
    material: "Georgette with cotton lining and cotton thread embroidery",
    careInstructions: DELICATE_CARE,
    featured: true,
    newArrival: true,
  },
  {
    id: "xm-018",
    name: "Everyday Cotton Kurta Shalwar",
    slug: "everyday-cotton-kurta-shalwar",
    category: "women",
    subcategory: "kurta-shalwar",
    shortDescription:
      "A comfortable cotton kurta shalwar for daily wear, easy to wash and easy to keep neat.",
    detailedDescription:
      "Not every kurta needs to be an occasion. The Everyday Cotton Kurta Shalwar is made for the ordinary days that make up most of the year: school runs, work, errands and family visits. Pure cotton keeps it breathable, the straight cut moves freely, and side slits at the hem make sitting and walking easy. It washes well, dries quickly and comes back looking neat, which is exactly what a daily set needs to do.",
    price: 3490,
    originalPrice: 4690,
    discount: 26,
    rating: 4.7,
    reviewCount: 197,
    stock: 44,
    sizes: ADULT_SIZES,
    colors: [SWATCH.sky, SWATCH.cream, SWATCH.mint, SWATCH.charcoal],
    images: img("everyday-cotton-kurta-shalwar"),
    features: [
      "Pure breathable cotton",
      "Straight cut that moves freely",
      "Side slits for easy movement",
      "Quick drying and simple to press",
      "Matching shalwar included",
    ],
    material: "100 percent cotton, 145 GSM",
    careInstructions: COTTON_CARE,
    featured: false,
    newArrival: false,
  },
  {
    id: "xm-019",
    name: "Traditional Velvet Kurta Shalwar",
    slug: "traditional-velvet-kurta-shalwar",
    category: "women",
    subcategory: "kurta-shalwar",
    shortDescription:
      "A rich velvet kurta shalwar with a warm hand feel, made for winter weddings and functions.",
    detailedDescription:
      "Velvet carries an occasion the moment you walk in. This traditional kurta shalwar uses a soft pile velvet with real depth of colour, cut long and lined throughout so it hangs with weight rather than stiffness. Subtle tonal detailing runs along the neckline and cuffs, keeping the focus on the fabric itself. It is a winter piece in the truest sense: warm enough for December evenings and formal enough for the largest gathering on the calendar.",
    price: 8490,
    originalPrice: 11990,
    discount: 29,
    rating: 4.8,
    reviewCount: 132,
    stock: 14,
    sizes: ADULT_SIZES,
    colors: [SWATCH.maroon, SWATCH.navy, SWATCH.black, SWATCH.teal],
    images: img("traditional-velvet-kurta-shalwar"),
    features: [
      "Soft pile velvet with deep colour",
      "Fully lined for a smooth hang",
      "Tonal detailing at the neckline and cuffs",
      "Warm enough for winter functions",
      "Matching shalwar included",
    ],
    material: "Cotton backed velvet with a silk touch lining",
    careInstructions: DELICATE_CARE,
    featured: true,
    newArrival: false,
  },

  /* --------------------------------------------------------------- KIDS */
  {
    id: "xm-020",
    name: "Boys Cotton Casual Shirt",
    slug: "boys-cotton-casual-shirt",
    category: "kids",
    subcategory: "shirts",
    shortDescription:
      "A soft cotton casual shirt for boys with smooth seams and buttons that are easy to manage.",
    detailedDescription:
      "Children are hard on clothes, so this shirt was made with that in mind. Soft cotton keeps it gentle against young skin, while double stitched seams and firmly anchored buttons hold up to real play. The buttons are sized so a child can manage them without help, which matters more than it sounds. The fit leaves room to grow without looking oversized, and the fabric keeps its colour through the frequent washing that kids clothes always need.",
    price: 1390,
    originalPrice: 1890,
    discount: 26,
    rating: 4.6,
    reviewCount: 124,
    stock: 58,
    sizes: KID_SIZES,
    colors: [SWATCH.sky, SWATCH.white, SWATCH.olive, SWATCH.mustard],
    images: img("boys-cotton-casual-shirt"),
    features: [
      "Soft cotton that is gentle on young skin",
      "Buttons sized for small hands",
      "Double stitched seams for active play",
      "Room to grow without looking loose",
      "Colour holds through frequent washing",
    ],
    material: "100 percent cotton, 140 GSM",
    careInstructions: COTTON_CARE,
    featured: true,
    newArrival: false,
  },
  {
    id: "xm-021",
    name: "Girls Floral Print Shirt",
    slug: "girls-floral-print-shirt",
    category: "kids",
    subcategory: "shirts",
    shortDescription:
      "A cheerful floral shirt for girls in breathable cotton with a comfortable relaxed fit.",
    detailedDescription:
      "The Girls Floral Print Shirt is bright without being fussy. The print is applied with skin safe dyes onto breathable cotton, so it stays comfortable through a full day at school or out with family. A relaxed fit means nothing pulls when she reaches or runs, the neckline is cut wide enough to pull on easily, and the hem is finished flat so it never irritates. It pairs just as well with kids trousers as it does with a skirt.",
    price: 1490,
    originalPrice: 1990,
    discount: 25,
    rating: 4.7,
    reviewCount: 147,
    stock: 49,
    sizes: KID_SIZES,
    colors: [SWATCH.blush, SWATCH.mint, SWATCH.lilac, SWATCH.white],
    images: img("girls-floral-print-shirt"),
    features: [
      "Skin safe dyes on breathable cotton",
      "Relaxed fit for free movement",
      "Wide neckline that pulls on easily",
      "Flat finished hem",
      "Print stays bright after washing",
    ],
    material: "100 percent cotton, 135 GSM",
    careInstructions: COTTON_CARE,
    featured: true,
    newArrival: true,
  },
  {
    id: "xm-022",
    name: "Boys Formal Shirt",
    slug: "boys-formal-shirt",
    category: "kids",
    subcategory: "shirts",
    shortDescription:
      "A smart formal shirt for boys, ready for weddings, school events and family functions.",
    detailedDescription:
      "A boys formal shirt has to look sharp and still be comfortable enough that it stays on all evening. This one uses a smooth cotton blend with a soft collar that sits neatly without stiffness, so there is nothing scratching at the neck halfway through a function. The tucked in fit stays clean, the cuffs button securely, and the fabric releases creases quickly, which helps when the shirt has been folded in a bag before the event.",
    price: 1690,
    originalPrice: 2290,
    discount: 26,
    rating: 4.5,
    reviewCount: 86,
    stock: 37,
    sizes: KID_SIZES,
    colors: [SWATCH.white, SWATCH.navy, SWATCH.sky],
    images: img("boys-formal-shirt"),
    features: [
      "Smooth cotton blend with a soft collar",
      "Comfortable enough for a full evening",
      "Clean tucked in fit",
      "Securely buttoned cuffs",
      "Releases creases quickly",
    ],
    material: "Cotton polyester blend, 130 GSM",
    careInstructions: COTTON_CARE,
    featured: false,
    newArrival: false,
  },
  {
    id: "xm-023",
    name: "Kids Jogger Pants",
    slug: "kids-jogger-pants",
    category: "kids",
    subcategory: "pants",
    shortDescription:
      "Soft fleece backed jogger pants with an elastic waist that children can pull on themselves.",
    detailedDescription:
      "Kids Jogger Pants earn their keep by being the pair a child picks first. The fleece backed cotton is warm without weight, the fully elasticated waist has an inner drawcord so it can be adjusted as they grow, and the ribbed ankle cuffs keep the hem clear of the ground. Deep side pockets hold small treasures securely, and the fabric handles the washing machine as often as the week demands.",
    price: 1590,
    originalPrice: 2190,
    discount: 27,
    rating: 4.7,
    reviewCount: 163,
    stock: 55,
    sizes: KID_SIZES,
    colors: [SWATCH.charcoal, SWATCH.navy, SWATCH.electric, SWATCH.blush],
    images: img("kids-jogger-pants"),
    features: [
      "Fleece backed cotton that is warm and light",
      "Elastic waist with an adjustable inner drawcord",
      "Ribbed ankle cuffs",
      "Deep secure side pockets",
      "Handles frequent machine washing",
    ],
    material: "Cotton fleece blend, 260 GSM",
    careInstructions: COTTON_CARE,
    featured: false,
    newArrival: true,
  },
  {
    id: "xm-024",
    name: "Kids Denim Trousers",
    slug: "kids-denim-trousers",
    category: "kids",
    subcategory: "trousers",
    shortDescription:
      "Durable stretch denim trousers for kids with an adjustable waist that grows with them.",
    detailedDescription:
      "Kids Denim Trousers are built for climbing, cycling and everything in between. Stretch denim moves instead of restricting, and reinforced knees take the impact that ordinary denim gives up to. The internal adjustable waist tab means one pair can fit through a growth spurt rather than being outgrown in a season, and the soft wash keeps them comfortable from the very first day.",
    price: 1890,
    originalPrice: 2590,
    discount: 27,
    rating: 4.6,
    reviewCount: 108,
    stock: 43,
    sizes: KID_SIZES,
    colors: [SWATCH.navy, SWATCH.sky, SWATCH.black],
    images: img("kids-denim-trousers"),
    features: [
      "Stretch denim that moves with active play",
      "Reinforced knee panels",
      "Internal adjustable waist tab",
      "Soft wash finish from the first wear",
      "Secure front and back pockets",
    ],
    material: "Cotton denim with elastane, 10 ounce",
    careInstructions: COTTON_CARE,
    featured: true,
    newArrival: false,
  },
  {
    id: "xm-025",
    name: "Kids Cotton Trousers",
    slug: "kids-cotton-trousers",
    category: "kids",
    subcategory: "trousers",
    shortDescription:
      "Lightweight cotton trousers for school and everyday wear with a comfortable elastic back.",
    detailedDescription:
      "These cotton trousers were made for the school week. The fabric is light enough for warm classrooms yet sturdy enough to survive break time, and the part elasticated back waist gives a comfortable fit without a tight button pressing at the front. The straight leg keeps a neat uniform appearance, and the colourfast dye means they still look presentable in month five rather than fading after a few washes.",
    price: 1690,
    originalPrice: 2290,
    discount: 26,
    rating: 4.5,
    reviewCount: 94,
    stock: 47,
    sizes: KID_SIZES,
    colors: [SWATCH.charcoal, SWATCH.navy, SWATCH.beige],
    images: img("kids-cotton-trousers"),
    features: [
      "Light yet sturdy cotton twill",
      "Part elasticated back waist",
      "Neat straight leg for uniform wear",
      "Colourfast dye that resists fading",
      "Reinforced seat seam",
    ],
    material: "100 percent cotton twill, 180 GSM",
    careInstructions: COTTON_CARE,
    featured: false,
    newArrival: false,
  },
  {
    id: "xm-026",
    name: "Baby Soft Cotton Romper",
    slug: "baby-soft-cotton-romper",
    category: "kids",
    subcategory: "baby-clothes",
    shortDescription:
      "An ultra soft cotton romper with press studs along the legs for quick and easy changes.",
    detailedDescription:
      "Everything about this romper is designed around a baby comfort first. The cotton is finished to an extra soft handle and dyed without harsh chemicals, so it stays kind to new skin. Press studs run the full length of both legs, which makes changing quick even at three in the morning, and the shoulder opening widens so the neckline never has to be pulled over a small head. Flat seams sit outside the body to prevent any rubbing.",
    price: 1190,
    originalPrice: 1590,
    discount: 25,
    rating: 4.9,
    reviewCount: 211,
    stock: 62,
    sizes: BABY_SIZES,
    colors: [SWATCH.cream, SWATCH.mint, SWATCH.blush, SWATCH.sky],
    images: img("baby-soft-cotton-romper"),
    features: [
      "Extra soft cotton finished for new skin",
      "Full length leg press studs for quick changes",
      "Widening shoulder opening",
      "Flat outer seams that avoid rubbing",
      "Dyed without harsh chemicals",
    ],
    material: "100 percent combed cotton, 180 GSM",
    careInstructions: COTTON_CARE,
    featured: true,
    newArrival: true,
  },
  {
    id: "xm-027",
    name: "Newborn Baby Clothing Set",
    slug: "newborn-baby-clothing-set",
    category: "kids",
    subcategory: "baby-clothes",
    shortDescription:
      "A five piece newborn set including bodysuits, pants, a cap and mittens in soft cotton.",
    detailedDescription:
      "A newborn set takes the guesswork out of the first weeks. This one includes two bodysuits, a pair of soft pants, a cap and a pair of scratch mittens, all cut from the same gentle cotton so everything layers together. The bodysuits use envelope shoulders for easy dressing, the pants have a rolled soft waist that never presses on the tummy, and the mittens are sized to actually stay on. It also makes a genuinely practical gift for a new family.",
    price: 2290,
    originalPrice: 3190,
    discount: 28,
    rating: 4.8,
    reviewCount: 176,
    stock: 40,
    sizes: BABY_SIZES,
    colors: [SWATCH.white, SWATCH.mint, SWATCH.blush],
    images: img("newborn-baby-clothing-set"),
    features: [
      "Five pieces including bodysuits, pants, cap and mittens",
      "Envelope shoulders for easy dressing",
      "Soft rolled waistband that avoids pressure",
      "Mittens sized to stay in place",
      "Presented ready to give as a gift",
    ],
    material: "100 percent cotton interlock, 190 GSM",
    careInstructions: COTTON_CARE,
    featured: true,
    newArrival: false,
  },
  {
    id: "xm-028",
    name: "Baby Winter Sleep Suit",
    slug: "baby-winter-sleep-suit",
    category: "kids",
    subcategory: "baby-clothes",
    shortDescription:
      "A cosy fleece lined sleep suit with covered feet, made to keep babies warm through the night.",
    detailedDescription:
      "Cold nights need more than an extra blanket that gets kicked off. The Baby Winter Sleep Suit keeps warmth where it belongs with a soft fleece lining and fully covered feet, so there are no gaps at the ankles. A two way zip runs from the neck to the ankle, which means night changes do not require undressing the whole baby, and a protective chin guard sits over the zip pull. The outer fabric is brushed soft to prevent any scratching.",
    price: 1890,
    originalPrice: 2590,
    discount: 27,
    rating: 4.8,
    reviewCount: 139,
    stock: 35,
    sizes: BABY_SIZES,
    colors: [SWATCH.sky, SWATCH.cream, SWATCH.lilac, SWATCH.charcoal],
    images: img("baby-winter-sleep-suit"),
    features: [
      "Soft fleece lining for cold nights",
      "Fully covered feet with no ankle gaps",
      "Two way zip for easy night changes",
      "Protective chin guard over the zip",
      "Brushed soft outer fabric",
    ],
    material: "Cotton outer with polyester fleece lining",
    careInstructions: COTTON_CARE,
    featured: false,
    newArrival: true,
  },
  {
    id: "xm-029",
    name: "Wooden Learning Blocks Set",
    slug: "wooden-learning-blocks-set",
    category: "kids",
    subcategory: "toys",
    shortDescription:
      "An educational wooden block set with letters, numbers and shapes for early learning through play.",
    detailedDescription:
      "The Wooden Learning Blocks Set turns early learning into something a child chooses to do. Fifty smooth sanded blocks carry letters, numbers, colours and simple shapes, so the same box supports counting, spelling and building as a child develops. The wood is solid rather than composite, finished with water based non toxic paint, and every edge is rounded by hand. It arrives in a sturdy storage box that makes tidying up part of the game.",
    price: 2490,
    originalPrice: 3490,
    discount: 29,
    rating: 4.8,
    reviewCount: 187,
    stock: 30,
    sizes: ONE_SIZE,
    colors: [SWATCH.mustard, SWATCH.electric, SWATCH.mint],
    images: img("wooden-learning-blocks-set"),
    features: [
      "Fifty solid wood blocks with letters, numbers and shapes",
      "Water based non toxic paint",
      "Hand rounded edges throughout",
      "Supports counting, spelling and building",
      "Sturdy storage box included",
    ],
    material: "Solid rubberwood with water based paint",
    careInstructions: TOY_CARE,
    featured: true,
    newArrival: false,
  },
  {
    id: "xm-030",
    name: "Cuddly Teddy Bear Soft Toy",
    slug: "cuddly-teddy-bear-soft-toy",
    category: "kids",
    subcategory: "toys",
    shortDescription:
      "A huggably soft teddy bear with securely stitched features, safe for younger children.",
    detailedDescription:
      "A good teddy becomes a member of the household, so this one is built to last that long. The plush outer is exceptionally soft and the filling is evenly distributed, which keeps the shape after years of being carried around by one arm. There are no plastic eyes or small parts: every feature is embroidered directly into the fabric, making it safe for younger children. All seams are double locked so the stuffing stays exactly where it should.",
    price: 1790,
    originalPrice: 2490,
    discount: 28,
    rating: 4.9,
    reviewCount: 254,
    stock: 46,
    sizes: ONE_SIZE,
    colors: [SWATCH.beige, SWATCH.cream, SWATCH.blush],
    images: img("cuddly-teddy-bear-soft-toy"),
    features: [
      "Exceptionally soft plush outer",
      "Embroidered features with no small parts",
      "Evenly distributed hypoallergenic filling",
      "Double locked seams",
      "Holds its shape over years of use",
    ],
    material: "Polyester plush with hypoallergenic fibre filling",
    careInstructions: PLUSH_CARE,
    featured: true,
    newArrival: true,
  },
  {
    id: "xm-031",
    name: "Shape Sorter Activity Toy",
    slug: "shape-sorter-activity-toy",
    category: "kids",
    subcategory: "toys",
    shortDescription:
      "A colourful activity toy that builds shape recognition and hand coordination through play.",
    detailedDescription:
      "The Shape Sorter Activity Toy works on two things at once: recognising shapes and controlling small movements. Twelve chunky pieces are sized for a toddler grip and matched to openings cut into the sorter body, so success is obvious and repeatable, which is what keeps a young child engaged. The moulded body is smooth throughout with no sharp corners, and the lid lifts off easily so a child can restart the game without help.",
    price: 1590,
    originalPrice: 2190,
    discount: 27,
    rating: 4.6,
    reviewCount: 118,
    stock: 38,
    sizes: ONE_SIZE,
    colors: [SWATCH.electric, SWATCH.mustard, SWATCH.mint],
    images: img("shape-sorter-activity-toy"),
    features: [
      "Twelve chunky pieces sized for a toddler grip",
      "Builds shape recognition and coordination",
      "Smooth moulded body with no sharp corners",
      "Lift off lid so play restarts easily",
      "Made from durable food grade plastic",
    ],
    material: "Food grade ABS plastic, free from BPA",
    careInstructions: TOY_CARE,
    featured: false,
    newArrival: false,
  },
];

/* ------------------------------------------------------------------ */
/* Query helpers. All data is static, so these are plain array reads.  */
/* ------------------------------------------------------------------ */

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getProductsByCategory(category: CategorySlug): Product[] {
  return products.filter((product) => product.category === category);
}

export function getProductsBySubcategory(sub: SubcategorySlug): Product[] {
  return products.filter((product) => product.subcategory === sub);
}

export function getFeaturedProducts(limit = 8): Product[] {
  return products.filter((product) => product.featured).slice(0, limit);
}

export function getNewArrivals(limit = 8): Product[] {
  return products.filter((product) => product.newArrival).slice(0, limit);
}

/** Counts products in a department, used by the category cards. */
export function countByCategory(category: CategorySlug): number {
  return getProductsByCategory(category).length;
}

export function countBySubcategory(sub: SubcategorySlug): number {
  return getProductsBySubcategory(sub).length;
}

/**
 * Related products prefer the same subcategory, then fall back to the same
 * department so the section is never left short of items.
 */
export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const sameSub = products.filter(
    (item) =>
      item.id !== product.id &&
      item.subcategory === product.subcategory &&
      item.category === product.category,
  );
  const sameCategory = products.filter(
    (item) =>
      item.id !== product.id &&
      item.category === product.category &&
      !sameSub.includes(item),
  );
  const rest = products.filter(
    (item) =>
      item.id !== product.id &&
      !sameSub.includes(item) &&
      !sameCategory.includes(item),
  );
  return [...sameSub, ...sameCategory, ...rest].slice(0, limit);
}

export function getProductsByIds(ids: string[]): Product[] {
  return ids
    .map((id) => products.find((product) => product.id === id))
    .filter((product): product is Product => Boolean(product));
}

/** Lowest and highest price in the catalogue, used to seed the price filter. */
export const PRICE_BOUNDS = {
  min: Math.min(...products.map((product) => product.price)),
  max: Math.max(...products.map((product) => product.price)),
};

/**
 * Sorts a list without mutating the input.
 * Latest uses catalogue order reversed, since newer entries are appended.
 */
export function sortProducts(list: Product[], sort: SortOption): Product[] {
  const sorted = [...list];
  switch (sort) {
    case "price-low":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-high":
      return sorted.sort((a, b) => b.price - a.price);
    case "popularity":
      return sorted.sort(
        (a, b) => b.rating * b.reviewCount - a.rating * a.reviewCount,
      );
    case "latest":
    default:
      return sorted.sort((a, b) => {
        // New arrivals first, then by descending catalogue id.
        if (a.newArrival !== b.newArrival) return a.newArrival ? -1 : 1;
        return b.id.localeCompare(a.id);
      });
  }
}

/** Simple case insensitive match across name, category and description. */
export function searchProducts(list: Product[], term: string): Product[] {
  const query = term.trim().toLowerCase();
  if (!query) return list;
  return list.filter((product) =>
    [
      product.name,
      product.category,
      product.subcategory.replace(/-/g, " "),
      product.shortDescription,
      product.material,
    ]
      .join(" ")
      .toLowerCase()
      .includes(query),
  );
}
