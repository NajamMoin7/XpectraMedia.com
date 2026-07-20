import type {
  CategorySlug,
  Product,
  ProductBadge,
  SortOption,
  SubcategorySlug,
} from "@/lib/types";

/** Builds the three gallery image paths for a product. */
function img(slug: string): string[] {
  return [1, 2, 3].map((n) => `/assets/images/products/${slug}-${n}.jpg`);
}

/** Reusable color swatches so palettes stay consistent across the catalogue. */
const C = {
  white: { name: "White", hex: "#f7f8fa" },
  black: { name: "Black", hex: "#15181d" },
  navy: { name: "Navy", hex: "#1e2c47" },
  charcoal: { name: "Charcoal", hex: "#3c424b" },
  heather: { name: "Heather Grey", hex: "#a9b0ba" },
  sand: { name: "Sand", hex: "#cbb79a" },
  olive: { name: "Olive", hex: "#5c6b4a" },
  coral: { name: "Coral", hex: "#e78a80" },
  blush: { name: "Blush", hex: "#e5bcc2" },
  sage: { name: "Sage", hex: "#a9c4b3" },
  cream: { name: "Cream", hex: "#efe6d6" },
  rust: { name: "Rust", hex: "#a8552f" },
  indigo: { name: "Indigo", hex: "#31496e" },
  lightWash: { name: "Light Wash", hex: "#9db4cd" },
  midWash: { name: "Mid Wash", hex: "#5a7796" },
  teal: { name: "Teal", hex: "#2f7d80" },
  mustard: { name: "Mustard", hex: "#d1a53c" },
  lilac: { name: "Lilac", hex: "#b9a7d6" },
  natural: { name: "Natural Wood", hex: "#d8b183" },
  multi: { name: "Multicolor", hex: "#7ab8f5" },
} as const;

const ADULT = ["XS", "S", "M", "L", "XL", "XXL"];
const ADULT_SHORT = ["S", "M", "L", "XL"];
const KID = ["2T", "3T", "4T", "5T", "6", "7"];
const BABY = ["Newborn", "0 to 3 Months", "3 to 6 Months", "6 to 12 Months", "12 to 18 Months"];
const ONE = ["One Size"];

const COTTON_CARE = [
  "Machine wash cold with like colors",
  "Do not bleach",
  "Tumble dry low",
  "Warm iron on the reverse side",
];

const DELICATE_CARE = [
  "Machine wash cold on a gentle cycle",
  "Wash inside out to protect the finish",
  "Lay flat or hang to dry",
  "Cool iron if needed",
];

const KNIT_CARE = [
  "Hand wash cold or use the wool cycle",
  "Do not wring or twist",
  "Dry flat away from direct heat",
  "Store folded rather than hung",
];

const TOY_CARE = [
  "Wipe clean with a soft damp cloth",
  "Keep away from direct heat and moisture",
  "Check regularly for wear before play",
  "Store in a dry place after use",
];

const PLUSH_CARE = [
  "Surface wash with mild soap and lukewarm water",
  "Air dry fully before returning to play",
  "Do not machine wash or tumble dry",
  "Brush the fur gently to keep it soft",
];

const CUSTOM_SIZES = [
  "Small",
  "Medium",
  "Large",
  "Extra Large",
  "Double Extra Large",
];

const CUSTOM_CARE = [
  "Machine wash cold inside out",
  "Do not bleach",
  "Tumble dry low",
  "Do not iron directly on the print",
];

const CUSTOM_SHIPPING =
  "Custom shirts are printed to order and ship in 3 to 5 business days. Standard shipping is $6.99 and free on orders of $75 or more. Express shipping is $14.99.";

const CUSTOM_RETURN =
  "Custom printed shirts are made specifically for your order and cannot be returned or exchanged unless the product arrives damaged, defective, or different from the approved order details.";

const SHIP_STANDARD =
  "Free standard shipping on orders over $75. Standard shipping is $6.99 and arrives in five to seven business days. Express delivery is available at checkout.";
const SHIP_LIGHT =
  "Ships free on orders over $75. Standard shipping is $6.99 and typically arrives in five to seven business days.";
const RETURN_STANDARD =
  "Easy returns within 7 days of delivery. Items must be unworn, unwashed and have the original tags attached. Return shipping is free on your first return per order.";
const RETURN_TOYS =
  "Easy returns within 7 days of delivery. Toys must be unused and returned in the original packaging. Return shipping is free on your first return per order.";

/**
 * The full Xpectra Media catalogue.
 * Prices are in USD and every entry is realistic sample data.
 */
export const products: Product[] = [
  /* ------------------------------------------------------------- MEN */
  {
    id: "xm101",
    name: "Essential Oversized Cotton Tee",
    slug: "essential-oversized-cotton-tee",
    category: "men",
    subcategory: "t-shirts",
    subtitle: "Heavyweight jersey with a relaxed drop shoulder",
    shortDescription:
      "A heavyweight oversized tee with a clean drop shoulder that keeps its shape wash after wash.",
    detailedDescription:
      "This is the tee that quietly becomes the most worn thing you own. It is cut from heavyweight combed cotton jersey with enough body that it hangs away from the frame instead of clinging, and the drop shoulder gives it the relaxed line that makes an oversized fit look deliberate rather than accidental. The neckline is ribbed and double stitched so it stays flat after months of wear, and the hem sits at the perfect length to wear out or tucked.",
    price: 28.99,
    originalPrice: 39.99,
    discount: 28,
    rating: 4.7,
    reviewCount: 412,
    stock: 84,
    sizes: ADULT,
    colors: [C.white, C.black, C.heather, C.sand],
    images: img("essential-oversized-cotton-tee"),
    material: "100 percent combed cotton jersey, 240 GSM",
    features: [
      "Heavyweight 240 GSM cotton jersey",
      "Relaxed drop shoulder silhouette",
      "Ribbed double stitched neckline",
      "Pre shrunk so the fit stays true",
      "Side seamed to prevent twisting",
    ],
    careInstructions: COTTON_CARE,
    shippingInfo: SHIP_LIGHT,
    returnInfo: RETURN_STANDARD,
    featured: true,
    newArrival: false,
    bestSeller: true,
    limitedStock: false,
  },
  {
    id: "xm102",
    name: "Heavyweight Boxy Tee",
    slug: "heavyweight-boxy-tee",
    category: "men",
    subcategory: "t-shirts",
    subtitle: "Structured boxy cut in dense cotton",
    shortDescription:
      "A structured boxy tee in dense cotton that holds a clean square line through the day.",
    detailedDescription:
      "Boxy fits live or die on fabric weight, and this one is built on dense cotton that stands up rather than collapsing. The body is cut wide and short through the torso so it sits cleanly over denim without bunching, and the sleeves finish just above the elbow for a balanced proportion. It is a simple piece that reads considered because the construction is right.",
    price: 32.99,
    originalPrice: 44.99,
    discount: 27,
    rating: 4.6,
    reviewCount: 268,
    stock: 61,
    sizes: ADULT,
    colors: [C.black, C.white, C.olive],
    images: img("heavyweight-boxy-tee"),
    material: "100 percent cotton, 260 GSM",
    features: [
      "Dense 260 GSM cotton with real structure",
      "Boxy body with a shorter length",
      "Reinforced shoulder taping",
      "Colorfast dye that resists fading",
      "Clean single needle hems",
    ],
    careInstructions: COTTON_CARE,
    shippingInfo: SHIP_LIGHT,
    returnInfo: RETURN_STANDARD,
    featured: false,
    newArrival: true,
    bestSeller: false,
    limitedStock: false,
  },
  {
    id: "xm103",
    name: "Coral Relaxed Fit Tee",
    slug: "coral-relaxed-fit-tee",
    category: "men",
    subcategory: "t-shirts",
    subtitle: "Soft washed cotton in a warm seasonal tone",
    shortDescription:
      "A soft washed relaxed tee in a warm coral tone that works on its own or as a layer.",
    detailedDescription:
      "Garment washing is what gives this tee its handfeel. The finished piece is washed before it ever reaches you, which softens the cotton and settles the fit so there is no shrinking surprise after the first laundry cycle. The relaxed body leaves room through the chest without looking loose, and the coral tone has been dialed warm enough to wear year round.",
    price: 26.99,
    originalPrice: 34.99,
    discount: 23,
    rating: 4.5,
    reviewCount: 187,
    stock: 9,
    sizes: ADULT,
    colors: [C.coral, C.cream, C.sage],
    images: img("coral-relaxed-fit-tee"),
    material: "100 percent garment washed cotton, 220 GSM",
    features: [
      "Garment washed for immediate softness",
      "Relaxed body with room through the chest",
      "Minimal shrinkage after washing",
      "Ribbed crew neckline",
      "Warm seasonal color palette",
    ],
    careInstructions: COTTON_CARE,
    shippingInfo: SHIP_LIGHT,
    returnInfo: RETURN_STANDARD,
    featured: false,
    newArrival: false,
    bestSeller: false,
    limitedStock: true,
  },
  {
    id: "xm104",
    name: "Premium Linen Blend Shirt",
    slug: "premium-linen-blend-shirt",
    category: "men",
    subcategory: "shirts",
    subtitle: "Breathable linen blend with a soft collar",
    shortDescription:
      "A breathable linen blend shirt with a soft collar that dresses up or down without effort.",
    detailedDescription:
      "Linen breathes beautifully but creases hard, so this shirt blends it with cotton to keep the airflow while calming the wrinkles. The collar is soft and unfused, which lets it sit naturally whether you button it to the neck or leave it open over a tee. The cut is clean through the body with a slight taper, and the sleeves roll neatly and stay put.",
    price: 54.99,
    originalPrice: 74.99,
    discount: 27,
    rating: 4.8,
    reviewCount: 331,
    stock: 47,
    sizes: ADULT,
    colors: [C.navy, C.white, C.sand],
    images: img("premium-linen-blend-shirt"),
    material: "55 percent linen with 45 percent cotton",
    features: [
      "Breathable linen and cotton blend",
      "Soft unfused collar that sits naturally",
      "Slight taper through the body",
      "Sleeves roll cleanly and hold",
      "Mother of pearl style buttons",
    ],
    careInstructions: DELICATE_CARE,
    shippingInfo: SHIP_STANDARD,
    returnInfo: RETURN_STANDARD,
    featured: true,
    newArrival: false,
    bestSeller: true,
    limitedStock: false,
  },
  {
    id: "xm105",
    name: "Classic Poplin Dress Shirt",
    slug: "classic-poplin-dress-shirt",
    category: "men",
    subcategory: "shirts",
    subtitle: "Crisp poplin with a wrinkle resistant finish",
    shortDescription:
      "A crisp poplin dress shirt with a wrinkle resistant finish that still looks sharp at six in the evening.",
    detailedDescription:
      "A dress shirt does its hardest work in the last two hours of the day. This one is woven from tightly spun poplin with a wrinkle resistant finish, so it holds a pressed appearance through meetings, commutes and long dinners. The collar band is reinforced to sit correctly under a tie, the placket lies flat, and the side seams are double stitched to survive frequent laundering.",
    price: 59.99,
    originalPrice: 79.99,
    discount: 25,
    rating: 4.7,
    reviewCount: 254,
    stock: 52,
    sizes: ADULT,
    colors: [C.white, C.lightWash, C.navy],
    images: img("classic-poplin-dress-shirt"),
    material: "Cotton rich poplin with a wrinkle resistant finish",
    features: [
      "Wrinkle resistant easy care finish",
      "Reinforced collar band for tie wear",
      "Flat lying front placket",
      "Double stitched side seams",
      "Opaque weave suited to formal settings",
    ],
    careInstructions: COTTON_CARE,
    shippingInfo: SHIP_STANDARD,
    returnInfo: RETURN_STANDARD,
    featured: false,
    newArrival: false,
    bestSeller: true,
    limitedStock: false,
  },
  {
    id: "xm106",
    name: "Brushed Flannel Check Shirt",
    slug: "brushed-flannel-check-shirt",
    category: "men",
    subcategory: "shirts",
    subtitle: "Brushed cotton flannel in a muted check",
    shortDescription:
      "A brushed cotton flannel in a muted check that feels warm from the very first wear.",
    detailedDescription:
      "Flannel is all about the brushing, and this cotton is brushed on both faces so it feels warm the moment you put it on. The check has been scaled down and kept muted so it reads as texture from across a room, which makes it far easier to wear than a loud plaid. Wear it buttoned with denim or open over a heavyweight tee when the temperature drops.",
    price: 49.99,
    originalPrice: 64.99,
    discount: 23,
    rating: 4.6,
    reviewCount: 176,
    stock: 38,
    sizes: ADULT,
    colors: [C.rust, C.charcoal, C.olive],
    images: img("brushed-flannel-check-shirt"),
    material: "100 percent brushed cotton flannel, 180 GSM",
    features: [
      "Brushed on both faces for warmth",
      "Muted small scale check",
      "Chest pocket with a clean finish",
      "Relaxed fit made for layering",
      "Pattern matched across the placket",
    ],
    careInstructions: COTTON_CARE,
    shippingInfo: SHIP_STANDARD,
    returnInfo: RETURN_STANDARD,
    featured: false,
    newArrival: true,
    bestSeller: false,
    limitedStock: false,
  },
  {
    id: "xm107",
    name: "Slim Fit Stretch Jeans",
    slug: "slim-fit-stretch-jeans",
    category: "men",
    subcategory: "jeans",
    subtitle: "Comfort stretch denim with a clean slim leg",
    shortDescription:
      "Slim fit denim with genuine comfort stretch and a soft wash that feels broken in on day one.",
    detailedDescription:
      "Slim jeans fail when the denim has no give, so these are woven with elastane that recovers instead of bagging out at the knee. The wash is done at the garment stage, which softens the fabric and settles the color so there is no stiff break in period. The leg is slim without being tight, the rise sits comfortably, and the pockets are deep enough to be genuinely useful.",
    price: 64.99,
    originalPrice: 89.99,
    discount: 28,
    rating: 4.7,
    reviewCount: 389,
    stock: 66,
    sizes: ADULT,
    colors: [C.midWash, C.indigo, C.black],
    images: img("slim-fit-stretch-jeans"),
    material: "98 percent cotton with 2 percent elastane denim, 12 ounce",
    features: [
      "Comfort stretch denim that recovers its shape",
      "Garment washed for a soft handfeel",
      "Slim leg with a comfortable rise",
      "Deep functional front pockets",
      "Copper rivets at the stress points",
    ],
    careInstructions: DELICATE_CARE,
    shippingInfo: SHIP_STANDARD,
    returnInfo: RETURN_STANDARD,
    featured: true,
    newArrival: false,
    bestSeller: true,
    limitedStock: false,
  },
  {
    id: "xm108",
    name: "Utility Cargo Pants",
    slug: "utility-cargo-pants",
    category: "men",
    subcategory: "cargo-pants",
    subtitle: "Reinforced cargo pockets with a tapered leg",
    shortDescription:
      "Durable cargo pants with reinforced pockets and a tapered leg that keeps the look modern.",
    detailedDescription:
      "Cargo pants earn their place on the days that involve a lot of moving. Heavier cotton twill takes the wear without thinning, and every cargo pocket is bar tacked at the corners so it carries weight without sagging. The leg tapers toward the ankle to keep the silhouette current rather than bulky, and a partially elasticated back waist adds real comfort on long days.",
    price: 68.99,
    originalPrice: 92.99,
    discount: 26,
    rating: 4.5,
    reviewCount: 203,
    stock: 43,
    sizes: ADULT,
    colors: [C.olive, C.charcoal, C.sand],
    images: img("utility-cargo-pants"),
    material: "100 percent cotton twill, 280 GSM",
    features: [
      "Durable cotton twill construction",
      "Bar tacked reinforced cargo pockets",
      "Tapered ankle for a modern line",
      "Part elasticated back waistband",
      "Secure flap closures on side pockets",
    ],
    careInstructions: COTTON_CARE,
    shippingInfo: SHIP_STANDARD,
    returnInfo: RETURN_STANDARD,
    featured: false,
    newArrival: true,
    bestSeller: false,
    limitedStock: false,
  },
  {
    id: "xm109",
    name: "Relaxed Twill Pants",
    slug: "relaxed-twill-pants",
    category: "men",
    subcategory: "pants",
    subtitle: "Soft twill with a straight relaxed leg",
    shortDescription:
      "Relaxed twill pants with a straight leg that carry from the office to the weekend.",
    detailedDescription:
      "These pants sit right between tailored trousers and denim, which is exactly why they get worn so often. The cotton twill is soft from the first wear and has a touch of stretch so it moves through commutes and long meetings. The straight leg falls cleanly over shoes without pooling at the ankle, and the finished waistband stays flat under a tucked shirt.",
    price: 58.99,
    originalPrice: 76.99,
    discount: 23,
    rating: 4.6,
    reviewCount: 158,
    stock: 55,
    sizes: ADULT,
    colors: [C.sand, C.navy, C.olive, C.charcoal],
    images: img("relaxed-twill-pants"),
    material: "97 percent cotton with 3 percent elastane twill",
    features: [
      "Soft cotton twill with comfort stretch",
      "Straight relaxed leg with a clean break",
      "Flat finished waistband",
      "Deep front and secure back pockets",
      "Colorfast dye that resists fading",
    ],
    careInstructions: COTTON_CARE,
    shippingInfo: SHIP_STANDARD,
    returnInfo: RETURN_STANDARD,
    featured: false,
    newArrival: false,
    bestSeller: false,
    limitedStock: false,
  },
  {
    id: "xm110",
    name: "Everyday Pullover Hoodie",
    slug: "everyday-pullover-hoodie",
    category: "men",
    subcategory: "hoodies",
    subtitle: "Brushed fleece with a structured hood",
    shortDescription:
      "A brushed fleece pullover hoodie with a structured hood that holds its shape properly.",
    detailedDescription:
      "Most hoodies fail at the hood, which collapses flat after a month. This one uses a double layer hood with a proper stand, so it frames rather than droops. The body is heavyweight brushed fleece that stays soft inside and smooth outside, the kangaroo pocket is deep and reinforced at both openings, and the ribbing at the cuffs and hem has enough recovery to stay snug.",
    price: 62.99,
    originalPrice: 84.99,
    discount: 26,
    rating: 4.8,
    reviewCount: 476,
    stock: 72,
    sizes: ADULT,
    colors: [C.white, C.heather, C.black, C.navy],
    images: img("everyday-pullover-hoodie"),
    material: "80 percent cotton with 20 percent polyester brushed fleece, 340 GSM",
    features: [
      "Double layer hood with a proper stand",
      "Heavyweight 340 GSM brushed fleece",
      "Deep kangaroo pocket with reinforced openings",
      "High recovery ribbed cuffs and hem",
      "Flat drawcords that stay tied",
    ],
    careInstructions: COTTON_CARE,
    shippingInfo: SHIP_STANDARD,
    returnInfo: RETURN_STANDARD,
    featured: true,
    newArrival: false,
    bestSeller: true,
    limitedStock: false,
  },
  {
    id: "xm111",
    name: "Classic Bomber Jacket",
    slug: "classic-bomber-jacket",
    category: "men",
    subcategory: "jackets",
    subtitle: "Insulated bomber with a ribbed collar",
    shortDescription:
      "An insulated bomber jacket with a ribbed collar and a clean line that works over anything.",
    detailedDescription:
      "The bomber is the most useful jacket shape there is, and this version keeps the proportions right. Light insulation makes it genuinely warm without adding bulk, the ribbed collar, cuffs and hem seal out drafts, and the body is cut to sit just below the waist so it layers over a hoodie without riding up. Two zipped side pockets and a smooth full length zip finish it cleanly.",
    price: 118.99,
    originalPrice: 159.99,
    discount: 26,
    rating: 4.8,
    reviewCount: 214,
    stock: 28,
    sizes: ADULT_SHORT,
    colors: [C.navy, C.black, C.olive],
    images: img("classic-bomber-jacket"),
    material: "Polyester shell with recycled insulation and a soft lining",
    features: [
      "Light insulation that adds warmth without bulk",
      "Ribbed collar, cuffs and hem",
      "Two zipped side pockets",
      "Smooth full length front zip",
      "Cut to layer over a hoodie",
    ],
    careInstructions: DELICATE_CARE,
    shippingInfo: SHIP_STANDARD,
    returnInfo: RETURN_STANDARD,
    featured: true,
    newArrival: true,
    bestSeller: false,
    limitedStock: false,
  },
  {
    id: "xm112",
    name: "Crewneck Fleece Sweatshirt",
    slug: "crewneck-fleece-sweatshirt",
    category: "men",
    subcategory: "sweatshirts",
    subtitle: "Loopback cotton with a classic crew neck",
    shortDescription:
      "A loopback cotton crewneck that layers cleanly and softens beautifully over time.",
    detailedDescription:
      "Loopback cotton is the reason this sweatshirt gets better with age. The inside face is left as soft loops rather than being brushed flat, so it stays breathable and grows softer with every wash instead of pilling. The crew neck is ribbed and reinforced with a taped shoulder seam, and the fit is clean enough to layer under a jacket without bulk.",
    price: 54.99,
    originalPrice: 72.99,
    discount: 25,
    rating: 4.7,
    reviewCount: 296,
    stock: 64,
    sizes: ADULT,
    colors: [C.white, C.black, C.heather, C.sage],
    images: img("crewneck-fleece-sweatshirt"),
    material: "100 percent loopback cotton, 320 GSM",
    features: [
      "Loopback cotton that softens with age",
      "Ribbed crew neck with taped shoulders",
      "Clean fit that layers under a jacket",
      "Resists pilling far better than brushed fleece",
      "Side panels for a tidy silhouette",
    ],
    careInstructions: COTTON_CARE,
    shippingInfo: SHIP_STANDARD,
    returnInfo: RETURN_STANDARD,
    featured: false,
    newArrival: false,
    bestSeller: false,
    limitedStock: false,
  },

  /* ----------------------------------------------------------- WOMEN */
  {
    id: "xm201",
    name: "Ribbed Knit Crop Top",
    slug: "ribbed-knit-crop-top",
    category: "women",
    subcategory: "tops",
    subtitle: "Stretch rib knit with a clean neckline",
    shortDescription:
      "A stretch rib knit crop top with a clean neckline that layers under everything.",
    detailedDescription:
      "Rib knits work because they move with you, and this one is knitted with enough elastane to hug without gripping. The rib is fine rather than chunky, which keeps the line smooth under an open shirt or jacket, and the neckline is bound rather than hemmed so it lies completely flat. The length has been set to sit at the natural waist with high rise denim.",
    price: 24.99,
    originalPrice: 32.99,
    discount: 24,
    rating: 4.6,
    reviewCount: 342,
    stock: 78,
    sizes: ADULT_SHORT,
    colors: [C.white, C.black, C.sage, C.blush],
    images: img("ribbed-knit-crop-top"),
    material: "92 percent cotton with 8 percent elastane rib knit",
    features: [
      "Fine rib knit with real stretch",
      "Bound neckline that lies flat",
      "Length set for high rise denim",
      "Smooth under open layers",
      "Holds shape through repeated wear",
    ],
    careInstructions: DELICATE_CARE,
    shippingInfo: SHIP_LIGHT,
    returnInfo: RETURN_STANDARD,
    featured: true,
    newArrival: false,
    bestSeller: true,
    limitedStock: false,
  },
  {
    id: "xm202",
    name: "Floral Midi Dress",
    slug: "floral-midi-dress",
    category: "women",
    subcategory: "dresses",
    subtitle: "Flowing midi with an adjustable strap",
    shortDescription:
      "A flowing floral midi dress with adjustable straps and a skirt that moves beautifully.",
    detailedDescription:
      "This dress is built around the way the fabric falls. A lightweight woven with a soft drape gives the skirt real movement without adding weight, so it stays comfortable through warm afternoons and long evenings. The straps adjust properly, which means the bodice sits where it should across different frames, and the seams are finished cleanly inside so nothing rubs.",
    price: 68.99,
    originalPrice: 94.99,
    discount: 27,
    rating: 4.8,
    reviewCount: 287,
    stock: 34,
    sizes: ADULT_SHORT,
    colors: [C.coral, C.navy, C.cream],
    images: img("floral-midi-dress"),
    material: "Viscose blend woven, fully lined bodice",
    features: [
      "Lightweight woven with a soft drape",
      "Fully adjustable shoulder straps",
      "Lined bodice for comfort and opacity",
      "Clean finished inner seams",
      "Skirt cut for genuine movement",
    ],
    careInstructions: DELICATE_CARE,
    shippingInfo: SHIP_STANDARD,
    returnInfo: RETURN_STANDARD,
    featured: true,
    newArrival: true,
    bestSeller: true,
    limitedStock: false,
  },
  {
    id: "xm203",
    name: "Linen Blend Summer Dress",
    slug: "linen-blend-summer-dress",
    category: "women",
    subcategory: "dresses",
    subtitle: "Breathable linen blend with a button front",
    shortDescription:
      "A breathable linen blend dress with a button front that works from beach to dinner.",
    detailedDescription:
      "Linen keeps you genuinely cool, and blending it with viscose softens the handfeel and calms the creasing that pure linen brings. The button front runs the full length, so it wears closed as a dress or open over swimwear, and the waist ties adjust to define the shape or leave it loose. Deep side pockets are set into the seam so they disappear when not in use.",
    price: 74.99,
    originalPrice: 99.99,
    discount: 25,
    rating: 4.7,
    reviewCount: 168,
    stock: 26,
    sizes: ADULT_SHORT,
    colors: [C.white, C.sand, C.sage],
    images: img("linen-blend-summer-dress"),
    material: "60 percent linen with 40 percent viscose",
    features: [
      "Breathable linen blend that stays cool",
      "Full length button front",
      "Adjustable waist ties",
      "Deep pockets set into the side seams",
      "Softer and less prone to creasing than pure linen",
    ],
    careInstructions: DELICATE_CARE,
    shippingInfo: SHIP_STANDARD,
    returnInfo: RETURN_STANDARD,
    featured: false,
    newArrival: true,
    bestSeller: false,
    limitedStock: true,
  },
  {
    id: "xm204",
    name: "Classic Denim Jacket",
    slug: "classic-denim-jacket",
    category: "women",
    subcategory: "jackets",
    subtitle: "Rigid denim with a cropped modern cut",
    shortDescription:
      "A classic denim jacket in rigid cotton with a cropped cut that sits well over everything.",
    detailedDescription:
      "A denim jacket should improve for years, which means starting with denim that has somewhere to go. This one uses a rigid cotton that fades honestly along the seams and creases with wear, developing a finish specific to you. The cut is cropped to sit at the natural waist so it layers over dresses and high rise denim, and the chest pockets are functional rather than decorative.",
    price: 84.99,
    originalPrice: 114.99,
    discount: 26,
    rating: 4.8,
    reviewCount: 359,
    stock: 41,
    sizes: ADULT_SHORT,
    colors: [C.midWash, C.lightWash, C.black],
    images: img("classic-denim-jacket"),
    material: "100 percent rigid cotton denim, 12 ounce",
    features: [
      "Rigid denim that fades honestly with wear",
      "Cropped cut that sits at the natural waist",
      "Functional chest and side pockets",
      "Adjustable button tabs at the hem",
      "Sturdy tack buttons and rivets",
    ],
    careInstructions: DELICATE_CARE,
    shippingInfo: SHIP_STANDARD,
    returnInfo: RETURN_STANDARD,
    featured: true,
    newArrival: false,
    bestSeller: true,
    limitedStock: false,
  },
  {
    id: "xm205",
    name: "High Rise Wide Leg Pants",
    slug: "high-rise-wide-leg-pants",
    category: "women",
    subcategory: "wide-leg-pants",
    subtitle: "Fluid drape with a defined high waist",
    shortDescription:
      "High rise wide leg pants with a fluid drape that lengthen the whole silhouette.",
    detailedDescription:
      "Wide leg pants only work when the fabric drapes rather than holds, and this blend was chosen specifically for the way it falls from the hip. The raised waistband defines the natural waist and stays put through the day, while the leg opens gradually rather than abruptly so the line stays elegant. A hidden side zip keeps the front completely smooth.",
    price: 72.99,
    originalPrice: 96.99,
    discount: 25,
    rating: 4.7,
    reviewCount: 231,
    stock: 37,
    sizes: ADULT_SHORT,
    colors: [C.olive, C.black, C.cream, C.navy],
    images: img("high-rise-wide-leg-pants"),
    material: "Viscose and polyester blend with a soft drape",
    features: [
      "High rise waistband that stays in place",
      "Fluid drape that falls cleanly from the hip",
      "Gradual leg opening for an elegant line",
      "Hidden side zip for a smooth front",
      "Functional side pockets",
    ],
    careInstructions: DELICATE_CARE,
    shippingInfo: SHIP_STANDARD,
    returnInfo: RETURN_STANDARD,
    featured: true,
    newArrival: false,
    bestSeller: false,
    limitedStock: false,
  },
  {
    id: "xm206",
    name: "Oversized Fleece Hoodie",
    slug: "oversized-fleece-hoodie",
    category: "women",
    subcategory: "hoodies",
    subtitle: "Soft brushed fleece with a relaxed body",
    shortDescription:
      "An oversized brushed fleece hoodie with a relaxed body made for genuine comfort.",
    detailedDescription:
      "This is the hoodie that gets pulled on the moment the day ends. The fleece is brushed on the inside to a soft finish and the body is cut deliberately oversized, with dropped shoulders and a generous sleeve that never feels tight. The hood is lined in the same fleece, and the ribbed hem sits at the hip so it works over leggings or denim.",
    price: 58.99,
    originalPrice: 78.99,
    discount: 25,
    rating: 4.8,
    reviewCount: 404,
    stock: 69,
    sizes: ADULT_SHORT,
    colors: [C.blush, C.heather, C.sage, C.black],
    images: img("oversized-fleece-hoodie"),
    material: "Cotton rich brushed fleece, 320 GSM",
    features: [
      "Soft brushed fleece inner face",
      "Deliberately oversized with dropped shoulders",
      "Fleece lined hood",
      "Ribbed hem that sits at the hip",
      "Generous sleeve with a relaxed cuff",
    ],
    careInstructions: COTTON_CARE,
    shippingInfo: SHIP_STANDARD,
    returnInfo: RETURN_STANDARD,
    featured: false,
    newArrival: false,
    bestSeller: true,
    limitedStock: false,
  },
  {
    id: "xm207",
    name: "Chunky Knit Sweater",
    slug: "chunky-knit-sweater",
    category: "women",
    subcategory: "sweaters",
    subtitle: "Soft chunky gauge with a relaxed shape",
    shortDescription:
      "A soft chunky knit sweater with a relaxed shape and a yarn that never feels scratchy.",
    detailedDescription:
      "Chunky knits often trade softness for warmth. This one does not, because the yarn is spun with a brushed finish that stays kind against the skin even at the neck. The gauge is genuinely chunky so it delivers real warmth, and the shape is relaxed through the body with a slightly cropped length that balances well over high rise pants.",
    price: 79.99,
    originalPrice: 104.99,
    discount: 24,
    rating: 4.8,
    reviewCount: 276,
    stock: 32,
    sizes: ADULT_SHORT,
    colors: [C.cream, C.sand, C.sage, C.charcoal],
    images: img("chunky-knit-sweater"),
    material: "Acrylic and wool blend chunky knit",
    features: [
      "Brushed yarn that stays soft at the neck",
      "Genuinely chunky gauge for real warmth",
      "Relaxed body with a balanced cropped length",
      "Ribbed neck, cuffs and hem",
      "Holds shape without stretching out",
    ],
    careInstructions: KNIT_CARE,
    shippingInfo: SHIP_STANDARD,
    returnInfo: RETURN_STANDARD,
    featured: true,
    newArrival: true,
    bestSeller: false,
    limitedStock: false,
  },
  {
    id: "xm208",
    name: "Seamless Activewear Set",
    slug: "seamless-activewear-set",
    category: "women",
    subcategory: "activewear",
    subtitle: "Compressive seamless knit in a matching set",
    shortDescription:
      "A seamless activewear set with real compression and a smooth second skin feel.",
    detailedDescription:
      "Seamless knitting means there are no side seams to rub, which is exactly what you want across a long session. The fabric is knitted with zoned compression that supports through the waist and thigh while staying breathable across the back, and the high rise waistband stays put through squats and running without rolling. The set includes both the top and the leggings.",
    price: 89.99,
    originalPrice: 119.99,
    discount: 25,
    rating: 4.7,
    reviewCount: 318,
    stock: 44,
    sizes: ADULT_SHORT,
    colors: [C.teal, C.black, C.blush],
    images: img("seamless-activewear-set"),
    material: "Nylon and elastane seamless knit",
    features: [
      "Seamless construction with no side seams to rub",
      "Zoned compression through the waist and thigh",
      "High rise waistband that does not roll",
      "Breathable knit panels across the back",
      "Matching top and leggings included",
    ],
    careInstructions: DELICATE_CARE,
    shippingInfo: SHIP_STANDARD,
    returnInfo: RETURN_STANDARD,
    featured: true,
    newArrival: true,
    bestSeller: false,
    limitedStock: false,
  },
  {
    id: "xm209",
    name: "Relaxed Everyday Top",
    slug: "relaxed-everyday-top",
    category: "women",
    subcategory: "tops",
    subtitle: "Soft woven with a flattering V neckline",
    shortDescription:
      "A soft woven everyday top with a flattering V neckline and an easy relaxed shape.",
    detailedDescription:
      "Some pieces earn their keep by going with everything, and this is one of them. The woven fabric has a gentle sheen and enough weight to drape rather than cling, the V neckline is cut to a flattering depth that stays workplace appropriate, and the relaxed body skims the frame. It tucks neatly into high rise pants or wears loose over denim.",
    price: 39.99,
    originalPrice: 52.99,
    discount: 25,
    rating: 4.6,
    reviewCount: 194,
    stock: 58,
    sizes: ADULT_SHORT,
    colors: [C.coral, C.white, C.navy, C.lilac],
    images: img("relaxed-everyday-top"),
    material: "Viscose blend woven with a soft sheen",
    features: [
      "Soft woven fabric with a gentle sheen",
      "Flattering V neckline at a considered depth",
      "Relaxed body that skims rather than clings",
      "Tucks neatly or wears loose",
      "Finished with a clean rolled hem",
    ],
    careInstructions: DELICATE_CARE,
    shippingInfo: SHIP_LIGHT,
    returnInfo: RETURN_STANDARD,
    featured: false,
    newArrival: false,
    bestSeller: false,
    limitedStock: false,
  },
  {
    id: "xm210",
    name: "Vintage Wash Straight Jeans",
    slug: "vintage-wash-straight-jeans",
    category: "women",
    subcategory: "jeans",
    subtitle: "High rise straight leg in a vintage wash",
    shortDescription:
      "High rise straight leg jeans in a vintage wash with an authentic rigid denim feel.",
    detailedDescription:
      "These jeans are cut from a firmer denim than most, which is what gives the straight leg its clean vertical line instead of collapsing at the knee. The vintage wash has been done by hand at the whisker points so the fading looks earned rather than printed. The high rise sits at the natural waist and the leg is cut straight from hip to hem.",
    price: 78.99,
    originalPrice: 104.99,
    discount: 25,
    rating: 4.7,
    reviewCount: 262,
    stock: 39,
    sizes: ADULT_SHORT,
    colors: [C.lightWash, C.midWash, C.black],
    images: img("vintage-wash-straight-jeans"),
    material: "100 percent cotton rigid denim, 12.5 ounce",
    features: [
      "Firmer denim that holds a clean straight line",
      "Hand finished vintage wash",
      "High rise that sits at the natural waist",
      "Straight leg from hip to hem",
      "Five pocket construction with tack buttons",
    ],
    careInstructions: DELICATE_CARE,
    shippingInfo: SHIP_STANDARD,
    returnInfo: RETURN_STANDARD,
    featured: false,
    newArrival: false,
    bestSeller: true,
    limitedStock: false,
  },

  /* ------------------------------------------------------------ KIDS */
  {
    id: "xm301",
    name: "Kids Graphic Cotton Tee",
    slug: "kids-graphic-cotton-tee",
    category: "kids",
    subcategory: "t-shirts",
    subtitle: "Soft cotton with a water based print",
    shortDescription:
      "A soft cotton tee with a water based print that stays bright through constant washing.",
    detailedDescription:
      "Kids clothing lives or dies in the laundry, so this tee is printed with water based inks that bond into the fabric rather than sitting on top as a plastic layer. That keeps the print soft to the touch and stops it cracking after a dozen washes. The cotton is combed for softness against young skin, and the neckline has enough stretch to pull on easily without going slack.",
    price: 18.99,
    originalPrice: 24.99,
    discount: 24,
    rating: 4.7,
    reviewCount: 246,
    stock: 92,
    sizes: KID,
    colors: [C.white, C.mustard, C.sage, C.coral],
    images: img("kids-graphic-cotton-tee"),
    material: "100 percent combed cotton, 180 GSM",
    features: [
      "Water based print that stays soft and does not crack",
      "Combed cotton that is gentle on young skin",
      "Stretch neckline that pulls on easily",
      "Double stitched hems for active play",
      "Holds color through frequent washing",
    ],
    careInstructions: COTTON_CARE,
    shippingInfo: SHIP_LIGHT,
    returnInfo: RETURN_STANDARD,
    featured: true,
    newArrival: false,
    bestSeller: true,
    limitedStock: false,
  },
  {
    id: "xm302",
    name: "Kids Everyday Tee Set",
    slug: "kids-everyday-tee-set",
    category: "kids",
    subcategory: "t-shirts",
    subtitle: "Three cotton tees that mix and match",
    shortDescription:
      "A three piece cotton tee set in coordinated colors that mix and match all week.",
    detailedDescription:
      "Buying tees one at a time never quite works, so this set solves the school week in a single order. Three tees arrive in coordinated tones chosen to work with the same pants, which makes getting dressed faster for everyone. Each one is cut from the same soft combed cotton with reinforced shoulder seams, and the colors have been picked to hide the realities of lunchtime.",
    price: 42.99,
    originalPrice: 59.99,
    discount: 28,
    rating: 4.6,
    reviewCount: 178,
    stock: 57,
    sizes: KID,
    colors: [C.multi, C.heather],
    images: img("kids-everyday-tee-set"),
    material: "100 percent combed cotton, 180 GSM",
    features: [
      "Three coordinated tees in one set",
      "Colors chosen to work with the same pants",
      "Reinforced shoulder seams",
      "Soft combed cotton throughout",
      "Practical tones that wear well",
    ],
    careInstructions: COTTON_CARE,
    shippingInfo: SHIP_LIGHT,
    returnInfo: RETURN_STANDARD,
    featured: false,
    newArrival: true,
    bestSeller: false,
    limitedStock: false,
  },
  {
    id: "xm303",
    name: "Kids Zip Up Hoodie",
    slug: "kids-zip-up-hoodie",
    category: "kids",
    subcategory: "hoodies",
    subtitle: "Fleece backed with a chin guard zip",
    shortDescription:
      "A fleece backed zip hoodie with a chin guard so the zip never catches.",
    detailedDescription:
      "A zip hoodie is the layer kids can manage without help, which is the whole point. This one runs a smooth chunky zip with a fabric chin guard at the top so nothing pinches, and the pull is oversized enough for small hands. The fleece backing keeps it warm without weight, and the hood is cut generously so it still fits over a head of wet hair after swim practice.",
    price: 39.99,
    originalPrice: 52.99,
    discount: 25,
    rating: 4.7,
    reviewCount: 203,
    stock: 63,
    sizes: KID,
    colors: [C.navy, C.coral, C.sage, C.heather],
    images: img("kids-zip-up-hoodie"),
    material: "Cotton rich fleece backed knit, 300 GSM",
    features: [
      "Smooth zip with a fabric chin guard",
      "Oversized zip pull sized for small hands",
      "Fleece backing that is warm without weight",
      "Generously cut hood",
      "Two front pockets with secure seams",
    ],
    careInstructions: COTTON_CARE,
    shippingInfo: SHIP_STANDARD,
    returnInfo: RETURN_STANDARD,
    featured: true,
    newArrival: false,
    bestSeller: false,
    limitedStock: false,
  },
  {
    id: "xm304",
    name: "Kids Jogger Set",
    slug: "kids-jogger-set",
    category: "kids",
    subcategory: "jogger-sets",
    subtitle: "Matching fleece top and jogger",
    shortDescription:
      "A matching fleece jogger set with an elastic waist kids can pull on themselves.",
    detailedDescription:
      "This set is the one that gets picked first, because it is comfortable and because a child can put it on without help. The waist is fully elasticated with an inner drawcord that adjusts as they grow, the ankle cuffs are ribbed to keep the hem clear of the ground, and the matching top layers over anything. Both pieces handle the washing machine as often as the week demands.",
    price: 46.99,
    originalPrice: 64.99,
    discount: 28,
    rating: 4.8,
    reviewCount: 289,
    stock: 71,
    sizes: KID,
    colors: [C.charcoal, C.navy, C.blush],
    images: img("kids-jogger-set"),
    material: "Cotton fleece blend, 280 GSM",
    features: [
      "Matching top and jogger in one set",
      "Elastic waist with an adjustable inner drawcord",
      "Ribbed ankle cuffs",
      "Deep secure side pockets",
      "Built for frequent machine washing",
    ],
    careInstructions: COTTON_CARE,
    shippingInfo: SHIP_STANDARD,
    returnInfo: RETURN_STANDARD,
    featured: true,
    newArrival: true,
    bestSeller: true,
    limitedStock: false,
  },
  {
    id: "xm305",
    name: "Kids Denim Two Piece Set",
    slug: "kids-denim-two-piece-set",
    category: "kids",
    subcategory: "denim-sets",
    subtitle: "Stretch denim with an adjustable waist",
    shortDescription:
      "A stretch denim two piece set with an adjustable waist that grows with them.",
    detailedDescription:
      "Denim for children has to move, so this set is cut from stretch denim that bends instead of restricting. The knees are reinforced with a second layer where the wear actually happens, and the internal adjustable waist tab means one size can carry through a growth spurt rather than being outgrown in a season. The matching jacket layers over a tee or a hoodie.",
    price: 62.99,
    originalPrice: 84.99,
    discount: 26,
    rating: 4.6,
    reviewCount: 154,
    stock: 45,
    sizes: KID,
    colors: [C.midWash, C.lightWash],
    images: img("kids-denim-two-piece-set"),
    material: "Cotton denim with elastane, 10 ounce",
    features: [
      "Stretch denim that moves with active play",
      "Reinforced double layer knees",
      "Internal adjustable waist tab",
      "Matching jacket and pants",
      "Soft washed from the first wear",
    ],
    careInstructions: COTTON_CARE,
    shippingInfo: SHIP_STANDARD,
    returnInfo: RETURN_STANDARD,
    featured: false,
    newArrival: false,
    bestSeller: false,
    limitedStock: false,
  },
  {
    id: "xm306",
    name: "Kids Everyday Casual Outfit",
    slug: "kids-everyday-casual-outfit",
    category: "kids",
    subcategory: "casual-wear",
    subtitle: "Coordinated pieces for the whole week",
    shortDescription:
      "A coordinated casual outfit in soft cotton that handles school days and weekends alike.",
    detailedDescription:
      "This outfit was put together to remove a decision from every morning. The pieces are cut from the same soft cotton in tones that work together and with the rest of the drawer, so nothing clashes and nothing has to be saved for a special occasion. Everything is finished with flat seams and covered elastic, which is what keeps it comfortable for a child who is wearing it all day.",
    price: 48.99,
    originalPrice: 66.99,
    discount: 27,
    rating: 4.5,
    reviewCount: 131,
    stock: 52,
    sizes: KID,
    colors: [C.cream, C.sage, C.coral],
    images: img("kids-everyday-casual-outfit"),
    material: "100 percent cotton, 200 GSM",
    features: [
      "Coordinated pieces that work together",
      "Flat seams that avoid rubbing",
      "Covered elastic at the waist",
      "Tones that mix with the rest of the drawer",
      "Soft cotton suited to all day wear",
    ],
    careInstructions: COTTON_CARE,
    shippingInfo: SHIP_STANDARD,
    returnInfo: RETURN_STANDARD,
    featured: false,
    newArrival: false,
    bestSeller: false,
    limitedStock: true,
  },
  {
    id: "xm307",
    name: "Kids Knit Cardigan",
    slug: "kids-knit-cardigan",
    category: "kids",
    subcategory: "outerwear",
    subtitle: "Soft knit layer for changeable days",
    shortDescription:
      "A soft knit cardigan that layers easily over anything when the morning turns cool.",
    detailedDescription:
      "Mornings and afternoons rarely agree, which is exactly what a cardigan is for. This one is knitted from a soft yarn with no scratch at the neck or cuff, and the buttons are sized large enough for a child to manage independently. It is light enough to push into a backpack without taking up the whole bag, and it holds its shape rather than stretching at the front.",
    price: 44.99,
    originalPrice: 59.99,
    discount: 25,
    rating: 4.7,
    reviewCount: 118,
    stock: 40,
    sizes: KID,
    colors: [C.cream, C.blush, C.sage],
    images: img("kids-knit-cardigan"),
    material: "Cotton blend knit",
    features: [
      "Soft yarn with no scratch at the neck",
      "Buttons sized for small hands",
      "Light enough to pack into a backpack",
      "Holds shape without stretching at the front",
      "Ribbed cuffs and hem",
    ],
    careInstructions: KNIT_CARE,
    shippingInfo: SHIP_STANDARD,
    returnInfo: RETURN_STANDARD,
    featured: false,
    newArrival: true,
    bestSeller: false,
    limitedStock: false,
  },

  /* ------------------------------------------------------------ BABY */
  {
    id: "xm401",
    name: "Organic Cotton Baby Romper",
    slug: "organic-cotton-baby-romper",
    category: "baby",
    subcategory: "rompers",
    subtitle: "Certified organic cotton with full snaps",
    shortDescription:
      "An organic cotton romper with full length snaps that make changing genuinely quick.",
    detailedDescription:
      "Everything about this romper is designed around the first months. The cotton is certified organic and dyed without harsh chemicals, so it stays kind to new skin, and every seam is flat and turned outward to prevent any rubbing. Snaps run the full length of both legs, which makes a change at three in the morning a matter of seconds, and the shoulder opening widens so nothing has to be pulled over a small head.",
    price: 22.99,
    originalPrice: 29.99,
    discount: 23,
    rating: 4.9,
    reviewCount: 367,
    stock: 96,
    sizes: BABY,
    colors: [C.white, C.sage, C.blush, C.cream],
    images: img("organic-cotton-baby-romper"),
    material: "100 percent certified organic cotton, 180 GSM",
    features: [
      "Certified organic cotton dyed without harsh chemicals",
      "Full length leg snaps for quick changes",
      "Widening shoulder opening",
      "Flat outward facing seams",
      "Pre washed for immediate softness",
    ],
    careInstructions: COTTON_CARE,
    shippingInfo: SHIP_LIGHT,
    returnInfo: RETURN_STANDARD,
    featured: true,
    newArrival: false,
    bestSeller: true,
    limitedStock: false,
  },
  {
    id: "xm402",
    name: "Baby Cotton Essentials Set",
    slug: "baby-cotton-essentials-set",
    category: "baby",
    subcategory: "cotton-sets",
    subtitle: "Five pieces that cover the first weeks",
    shortDescription:
      "A five piece cotton set covering bodysuits, pants, a cap and mittens for the first weeks.",
    detailedDescription:
      "A newborn set takes the guesswork out of the earliest weeks. This one includes two bodysuits, soft pants, a cap and a pair of scratch mittens, all cut from the same gentle cotton so every piece layers with the others. The bodysuits use envelope shoulders for easy dressing, the pants have a rolled soft waist that never presses on the tummy, and the mittens are sized to actually stay on.",
    price: 48.99,
    originalPrice: 68.99,
    discount: 29,
    rating: 4.8,
    reviewCount: 284,
    stock: 58,
    sizes: BABY,
    colors: [C.white, C.sage, C.blush],
    images: img("baby-cotton-essentials-set"),
    material: "100 percent cotton interlock, 190 GSM",
    features: [
      "Five pieces including bodysuits, pants, cap and mittens",
      "Envelope shoulders for easy dressing",
      "Soft rolled waistband that avoids pressure",
      "Mittens sized to stay in place",
      "Arrives ready to give as a gift",
    ],
    careInstructions: COTTON_CARE,
    shippingInfo: SHIP_STANDARD,
    returnInfo: RETURN_STANDARD,
    featured: true,
    newArrival: false,
    bestSeller: true,
    limitedStock: false,
  },
  {
    id: "xm403",
    name: "Baby Knit Jacket",
    slug: "baby-knit-jacket",
    category: "baby",
    subcategory: "jackets",
    subtitle: "Fine knit layer with covered buttons",
    shortDescription:
      "A fine knit baby jacket with covered buttons and a soft finish for cool days.",
    detailedDescription:
      "This little jacket is knitted from a fine soft yarn that adds warmth without bulk, which matters when a baby is already in several layers. The buttons are fabric covered so there is no hard edge against the skin, and the sleeves are cut slightly generous so they slide on easily rather than catching at the wrist. It works over a romper or a full set.",
    price: 36.99,
    originalPrice: 49.99,
    discount: 26,
    rating: 4.7,
    reviewCount: 142,
    stock: 34,
    sizes: BABY,
    colors: [C.cream, C.sage, C.blush],
    images: img("baby-knit-jacket"),
    material: "Cotton blend fine knit",
    features: [
      "Fine knit that adds warmth without bulk",
      "Fabric covered buttons with no hard edges",
      "Generous sleeves that slide on easily",
      "Layers over a romper or a full set",
      "Soft finish throughout",
    ],
    careInstructions: KNIT_CARE,
    shippingInfo: SHIP_STANDARD,
    returnInfo: RETURN_STANDARD,
    featured: false,
    newArrival: true,
    bestSeller: false,
    limitedStock: false,
  },
  {
    id: "xm404",
    name: "Baby Sleepwear Set",
    slug: "baby-sleepwear-set",
    category: "baby",
    subcategory: "sleepwear",
    subtitle: "Two way zip with covered feet",
    shortDescription:
      "A soft sleepwear set with covered feet and a two way zip for easier night changes.",
    detailedDescription:
      "Night changes are much easier when you do not have to undress the whole baby, which is why this set uses a two way zip that opens from the ankle up. The feet are fully covered so there are no gaps at the ankle, a protective guard sits over the zip pull at the chin, and the fabric is brushed soft on the inside face. It is cut with room to move without being loose enough to bunch.",
    price: 32.99,
    originalPrice: 44.99,
    discount: 27,
    rating: 4.8,
    reviewCount: 219,
    stock: 47,
    sizes: BABY,
    colors: [C.sage, C.cream, C.lilac, C.charcoal],
    images: img("baby-sleepwear-set"),
    material: "Cotton with a brushed inner face",
    features: [
      "Two way zip that opens from the ankle",
      "Fully covered feet with no ankle gaps",
      "Protective guard over the zip pull",
      "Brushed soft inner face",
      "Room to move without bunching",
    ],
    careInstructions: COTTON_CARE,
    shippingInfo: SHIP_STANDARD,
    returnInfo: RETURN_STANDARD,
    featured: false,
    newArrival: false,
    bestSeller: false,
    limitedStock: false,
  },
  {
    id: "xm405",
    name: "Baby Accessories Gift Set",
    slug: "baby-accessories-gift-set",
    category: "baby",
    subcategory: "accessories",
    subtitle: "Caps, booties and mittens in one box",
    shortDescription:
      "A gift ready accessories set with caps, booties and mittens in matching soft cotton.",
    detailedDescription:
      "The small pieces are the ones that go missing first, so this set gathers them in one box. Caps, booties and scratch mittens arrive in matching soft cotton, cut and sized so they genuinely stay on rather than working loose within the hour. It is presented ready to give, which makes it one of the more useful gifts a new family can receive.",
    price: 28.99,
    originalPrice: 38.99,
    discount: 26,
    rating: 4.7,
    reviewCount: 163,
    stock: 61,
    sizes: BABY,
    colors: [C.cream, C.blush, C.sage],
    images: img("baby-accessories-gift-set"),
    material: "100 percent cotton",
    features: [
      "Caps, booties and mittens in one box",
      "Sized to genuinely stay on",
      "Matching soft cotton throughout",
      "Presented ready to give as a gift",
      "Gentle elastic that never marks the skin",
    ],
    careInstructions: COTTON_CARE,
    shippingInfo: SHIP_LIGHT,
    returnInfo: RETURN_STANDARD,
    featured: false,
    newArrival: false,
    bestSeller: false,
    limitedStock: false,
  },

  /* ------------------------------------------------------------ TOYS */
  {
    id: "xm501",
    name: "Wooden Rainbow Stacker",
    slug: "wooden-rainbow-stacker",
    category: "toys",
    subcategory: "wooden-toys",
    subtitle: "Open ended stacking in solid wood",
    shortDescription:
      "A solid wood rainbow stacker that works as a puzzle, a building set and a play scene.",
    detailedDescription:
      "The rainbow stacker earns its place because it never has just one use. Younger children stack and nest the arches, older ones turn them into tunnels, bridges and enclosures for other toys, which is why it stays in rotation for years rather than months. Each arch is cut from solid wood, sanded smooth by hand and finished with water based non toxic paint in colors that hold up to daylight.",
    price: 42.99,
    originalPrice: 56.99,
    discount: 25,
    rating: 4.9,
    reviewCount: 331,
    stock: 38,
    sizes: ONE,
    colors: [C.multi, C.natural],
    images: img("wooden-rainbow-stacker"),
    material: "Solid beech wood with water based paint",
    features: [
      "Open ended design that grows with the child",
      "Solid wood arches sanded smooth by hand",
      "Water based non toxic paint",
      "Colors that resist fading in daylight",
      "Nests compactly for storage",
    ],
    careInstructions: TOY_CARE,
    shippingInfo: SHIP_STANDARD,
    returnInfo: RETURN_TOYS,
    featured: true,
    newArrival: false,
    bestSeller: true,
    limitedStock: false,
  },
  {
    id: "xm502",
    name: "Wooden Alphabet Blocks Set",
    slug: "wooden-alphabet-blocks-set",
    category: "toys",
    subcategory: "educational-toys",
    subtitle: "Letters, numbers and shapes in solid wood",
    shortDescription:
      "A solid wood block set with letters, numbers and shapes that supports early learning through play.",
    detailedDescription:
      "This set turns early learning into something a child chooses to do rather than something they are asked to do. Fifty smooth blocks carry letters, numbers, colors and simple shapes, so the same box supports counting, spelling and building as a child develops. The wood is solid rather than composite, the edges are rounded by hand, and it all packs into a sturdy storage box that makes tidying part of the game.",
    price: 38.99,
    originalPrice: 52.99,
    discount: 26,
    rating: 4.8,
    reviewCount: 276,
    stock: 44,
    sizes: ONE,
    colors: [C.multi, C.natural],
    images: img("wooden-alphabet-blocks-set"),
    material: "Solid rubberwood with water based paint",
    features: [
      "Fifty blocks with letters, numbers and shapes",
      "Solid wood rather than composite",
      "Hand rounded edges throughout",
      "Supports counting, spelling and building",
      "Sturdy storage box included",
    ],
    careInstructions: TOY_CARE,
    shippingInfo: SHIP_STANDARD,
    returnInfo: RETURN_TOYS,
    featured: true,
    newArrival: false,
    bestSeller: false,
    limitedStock: false,
  },
  {
    id: "xm503",
    name: "Classic Plush Teddy Bear",
    slug: "classic-plush-teddy-bear",
    category: "toys",
    subcategory: "soft-toys",
    subtitle: "Embroidered features with no small parts",
    shortDescription:
      "A soft plush teddy bear with embroidered features, safe for the youngest children.",
    detailedDescription:
      "A good teddy becomes part of the household, so this one is built to last that long. The plush is exceptionally soft and the filling is evenly distributed, which keeps the shape after years of being carried around by one arm. There are no plastic eyes or small parts anywhere: every feature is embroidered directly into the fabric, and all seams are double locked so the filling stays exactly where it should.",
    price: 34.99,
    originalPrice: 46.99,
    discount: 26,
    rating: 4.9,
    reviewCount: 418,
    stock: 67,
    sizes: ONE,
    colors: [C.sand, C.cream, C.blush],
    images: img("classic-plush-teddy-bear"),
    material: "Polyester plush with hypoallergenic fiber filling",
    features: [
      "Exceptionally soft plush outer",
      "Embroidered features with no small parts",
      "Evenly distributed hypoallergenic filling",
      "Double locked seams throughout",
      "Holds its shape over years of use",
    ],
    careInstructions: PLUSH_CARE,
    shippingInfo: SHIP_STANDARD,
    returnInfo: RETURN_TOYS,
    featured: true,
    newArrival: true,
    bestSeller: true,
    limitedStock: false,
  },
  {
    id: "xm504",
    name: "Wooden Counting Abacus",
    slug: "wooden-counting-abacus",
    category: "toys",
    subcategory: "educational-toys",
    subtitle: "Ten rows of smooth counting beads",
    shortDescription:
      "A wooden counting abacus with ten bead rows that makes early math visible and physical.",
    detailedDescription:
      "Numbers become much easier when a child can move them with their hands. This abacus sets ten rows of smooth wooden beads in a solid frame that stays put on a table rather than sliding around, so counting, grouping and simple addition all become something you can see happening. The beads run freely without rattling loose, and the frame is finished with the same rounded edges as the rest of our wooden range.",
    price: 36.99,
    originalPrice: 48.99,
    discount: 24,
    rating: 4.7,
    reviewCount: 187,
    stock: 41,
    sizes: ONE,
    colors: [C.multi, C.natural],
    images: img("wooden-counting-abacus"),
    material: "Solid wood frame with painted wooden beads",
    features: [
      "Ten rows of smooth counting beads",
      "Stable frame that stays put on a table",
      "Makes grouping and addition visible",
      "Beads run freely without working loose",
      "Rounded edges throughout",
    ],
    careInstructions: TOY_CARE,
    shippingInfo: SHIP_STANDARD,
    returnInfo: RETURN_TOYS,
    featured: false,
    newArrival: false,
    bestSeller: false,
    limitedStock: false,
  },
  {
    id: "xm505",
    name: "Creative Building Blocks Set",
    slug: "creative-building-blocks-set",
    category: "toys",
    subcategory: "activity-toys",
    subtitle: "Interlocking blocks for open ended building",
    shortDescription:
      "An interlocking block set that rewards imagination rather than a single right answer.",
    detailedDescription:
      "Building sets are at their best when there is no picture on the box telling a child what they are supposed to make. This set is deliberately open ended: a generous mix of shapes and colors that interlock securely enough to hold a tall structure, and separate easily enough that small hands do not need help. It builds patience and spatial reasoning without ever feeling like a lesson.",
    price: 44.99,
    originalPrice: 59.99,
    discount: 25,
    rating: 4.7,
    reviewCount: 232,
    stock: 49,
    sizes: ONE,
    colors: [C.multi],
    images: img("creative-building-blocks-set"),
    material: "Food grade ABS plastic, free from BPA",
    features: [
      "Generous mix of shapes and colors",
      "Interlocks securely enough for tall builds",
      "Separates easily for small hands",
      "Builds patience and spatial reasoning",
      "Free from BPA and safety tested",
    ],
    careInstructions: TOY_CARE,
    shippingInfo: SHIP_STANDARD,
    returnInfo: RETURN_TOYS,
    featured: false,
    newArrival: true,
    bestSeller: false,
    limitedStock: false,
  },
  {
    id: "xm506",
    name: "Wooden Toy Vehicle Set",
    slug: "wooden-toy-vehicle-set",
    category: "toys",
    subcategory: "creative-toys",
    subtitle: "Smooth rolling vehicles in solid wood",
    shortDescription:
      "A solid wood vehicle set with smooth rolling wheels and no sharp edges anywhere.",
    detailedDescription:
      "Wooden vehicles survive the kind of play that ends plastic ones. Each piece in this set is turned from solid wood with wheels mounted on steel axles so they roll properly across a floor rather than sticking after a week. Every edge is rounded and every surface is sanded before finishing, and the paint is water based and non toxic throughout. They are sized for a toddler grip.",
    price: 39.99,
    originalPrice: 52.99,
    discount: 25,
    rating: 4.8,
    reviewCount: 196,
    stock: 36,
    sizes: ONE,
    colors: [C.natural, C.multi],
    images: img("wooden-toy-vehicle-set"),
    material: "Solid wood with steel axles and water based paint",
    features: [
      "Wheels on steel axles that keep rolling",
      "Turned from solid wood throughout",
      "Every edge rounded and sanded",
      "Water based non toxic paint",
      "Sized for a toddler grip",
    ],
    careInstructions: TOY_CARE,
    shippingInfo: SHIP_STANDARD,
    returnInfo: RETURN_TOYS,
    featured: false,
    newArrival: false,
    bestSeller: true,
    limitedStock: true,
  },

  /* ---------------------------------------------------- CUSTOM SHIRTS */
  {
    id: "xm601",
    name: "Classic Custom T Shirt",
    slug: "classic-custom-t-shirt",
    category: "custom-shirts",
    subcategory: "custom-tees",
    subtitle: "Heavyweight cotton tee printed with your design",
    shortDescription: "A heavyweight cotton tee printed with your own logo or artwork, ready from a single shirt upward.",
    detailedDescription:
      "This is the shirt most custom orders start with, because the blank itself is worth printing on. The body is heavyweight combed cotton with a smooth face that holds fine detail cleanly, so a logo with small type stays legible rather than filling in. Upload your artwork, position it inside the safe print area, and the preview shows exactly how it will sit before you commit. Front printing is included in the price, and back or double sided printing can be added inside the customization tool.",
    price: 24.99,
    rating: 4.8,
    reviewCount: 246,
    stock: 500,
    sizes: CUSTOM_SIZES,
    colors: [C.white, C.black, C.navy, C.heather, C.midWash, C.coral],
    images: img("classic-custom-t-shirt"),
    material: "100 percent combed cotton jersey, 240 GSM",
    features: [
      "Heavyweight cotton that holds fine print detail",
      "Front print included in the shirt price",
      "Six shirt colors and five sizes",
      "Instant preview before you order",
      "Volume pricing from ten shirts",
    ],
    careInstructions: CUSTOM_CARE,
    shippingInfo: CUSTOM_SHIPPING,
    returnInfo: CUSTOM_RETURN,
    featured: true,
    newArrival: false,
    bestSeller: true,
    limitedStock: false,
  },
  {
    id: "xm602",
    name: "Premium Custom Polo Shirt",
    slug: "premium-custom-polo-shirt",
    category: "custom-shirts",
    subcategory: "custom-polos",
    subtitle: "Structured pique polo for client facing teams",
    shortDescription: "A structured pique polo printed with your logo, cut for uniforms and client facing teams.",
    detailedDescription:
      "A polo reads more formal than a tee without asking anyone to wear a jacket, which is why it is the default for storefronts, service teams and trade shows. The pique knit has enough structure to keep its shape through a long shift and a hot wash, the two button placket sits flat, and the collar holds up rather than curling by lunchtime. A left chest logo is the usual placement, and the preview lets you position it precisely.",
    price: 32.99,
    rating: 4.8,
    reviewCount: 184,
    stock: 500,
    sizes: CUSTOM_SIZES,
    colors: [C.white, C.black, C.navy, C.heather, C.midWash, C.coral],
    images: img("premium-custom-polo-shirt"),
    material: "100 percent cotton pique knit, 220 GSM",
    features: [
      "Structured pique that keeps its shape",
      "Collar stays flat through repeated washing",
      "Ideal for a left chest logo",
      "Consistent color across a full team order",
      "Volume pricing from ten shirts",
    ],
    careInstructions: CUSTOM_CARE,
    shippingInfo: CUSTOM_SHIPPING,
    returnInfo: CUSTOM_RETURN,
    featured: true,
    newArrival: false,
    bestSeller: true,
    limitedStock: false,
  },
  {
    id: "xm603",
    name: "Custom Long Sleeve Shirt",
    slug: "custom-long-sleeve-shirt",
    category: "custom-shirts",
    subcategory: "custom-long-sleeve",
    subtitle: "Full sleeve cotton with room for a large back print",
    shortDescription: "A full sleeve cotton shirt with space for a chest logo and a larger design across the back.",
    detailedDescription:
      "Long sleeves give a design more room to work with, which matters when the artwork is detailed or the back is the main event. The cotton is the same weight as our classic tee so the print behaves identically, and ribbed cuffs keep the sleeves in place through a working day. It is a common pick for crews, outdoor events and anywhere a short sleeve shirt would leave people cold.",
    price: 29.99,
    rating: 4.7,
    reviewCount: 132,
    stock: 500,
    sizes: CUSTOM_SIZES,
    colors: [C.white, C.black, C.navy, C.heather, C.midWash, C.coral],
    images: img("custom-long-sleeve-shirt"),
    material: "100 percent cotton jersey with ribbed cuffs, 240 GSM",
    features: [
      "Generous back print area",
      "Ribbed cuffs that stay in place",
      "Same print surface as the classic tee",
      "Works for outdoor events and crews",
      "Volume pricing from ten shirts",
    ],
    careInstructions: CUSTOM_CARE,
    shippingInfo: CUSTOM_SHIPPING,
    returnInfo: CUSTOM_RETURN,
    featured: false,
    newArrival: true,
    bestSeller: false,
    limitedStock: false,
  },
  {
    id: "xm604",
    name: "Custom Company Uniform Shirt",
    slug: "custom-company-uniform-shirt",
    category: "custom-shirts",
    subcategory: "custom-uniforms",
    subtitle: "Consistent branded shirts across a whole team",
    shortDescription: "A branded uniform shirt built for consistency across a whole team and for repeat reorders.",
    detailedDescription:
      "Uniforms live or die on consistency, so this shirt is held to a tighter color standard than the rest of the range. Order more next quarter and the shade will match what your team is already wearing, which is the part most custom printing gets wrong. The fabric is chosen to survive daily wear and frequent washing without the print cracking, and sizing runs true across the full range so a mixed team order fits properly.",
    price: 34.99,
    rating: 4.9,
    reviewCount: 167,
    stock: 500,
    sizes: CUSTOM_SIZES,
    colors: [C.white, C.black, C.navy, C.heather, C.midWash, C.coral],
    images: img("custom-company-uniform-shirt"),
    material: "Cotton rich blend with a color matched finish, 200 GSM",
    features: [
      "Held to a tight color standard for reorders",
      "Built for daily wear and frequent washing",
      "Print resists cracking over time",
      "True sizing across the full range",
      "Volume pricing from ten shirts",
    ],
    careInstructions: CUSTOM_CARE,
    shippingInfo: CUSTOM_SHIPPING,
    returnInfo: CUSTOM_RETURN,
    featured: true,
    newArrival: false,
    bestSeller: false,
    limitedStock: false,
  },
  {
    id: "xm605",
    name: "Custom Event Shirt",
    slug: "custom-event-shirt",
    category: "custom-shirts",
    subcategory: "custom-tees",
    subtitle: "Soft everyday tee for conferences and fundraisers",
    shortDescription: "A soft everyday tee for conferences, fundraisers and launches that people keep wearing afterward.",
    detailedDescription:
      "The measure of a good event shirt is whether anyone wears it a month later, so this one is cut and finished like a shirt someone would buy on its own. The cotton is softer than a typical giveaway blank, the fit is modern rather than boxy, and the print sits flat instead of forming a stiff panel across the chest. Order in volume and the per shirt price drops automatically at ten, twenty five and fifty.",
    price: 26.99,
    rating: 4.7,
    reviewCount: 143,
    stock: 500,
    sizes: CUSTOM_SIZES,
    colors: [C.white, C.black, C.navy, C.heather, C.midWash, C.coral],
    images: img("custom-event-shirt"),
    material: "Ring spun cotton, 200 GSM",
    features: [
      "Softer than a standard giveaway blank",
      "Modern fit rather than boxy",
      "Print stays flat and flexible",
      "Automatic volume pricing",
      "Ready in 3 to 5 business days",
    ],
    careInstructions: CUSTOM_CARE,
    shippingInfo: CUSTOM_SHIPPING,
    returnInfo: CUSTOM_RETURN,
    featured: false,
    newArrival: true,
    bestSeller: false,
    limitedStock: false,
  },
  {
    id: "xm606",
    name: "Custom Team Shirt",
    slug: "custom-team-shirt",
    category: "custom-shirts",
    subcategory: "custom-tees",
    subtitle: "Durable tee for squads, clubs and school teams",
    shortDescription: "A durable tee for squads, clubs and school teams, with room for a crest and a back number.",
    detailedDescription:
      "Team shirts take more abuse than most custom printing, so this blank is built around durability. The cotton is tightly knitted to resist snagging, the shoulder seams are taped so they hold through repeated pulling, and the back print area is sized to carry a name and number alongside a front crest. Front and back printing is the usual choice here and can be selected in the customization tool.",
    price: 27.99,
    rating: 4.8,
    reviewCount: 198,
    stock: 500,
    sizes: CUSTOM_SIZES,
    colors: [C.white, C.black, C.navy, C.heather, C.midWash, C.coral],
    images: img("custom-team-shirt"),
    material: "Tightly knitted cotton with taped shoulders, 220 GSM",
    features: [
      "Taped shoulder seams for durability",
      "Back area sized for a name and number",
      "Resists snagging through heavy use",
      "Front and back printing available",
      "Volume pricing from ten shirts",
    ],
    careInstructions: CUSTOM_CARE,
    shippingInfo: CUSTOM_SHIPPING,
    returnInfo: CUSTOM_RETURN,
    featured: false,
    newArrival: false,
    bestSeller: true,
    limitedStock: false,
  },
  {
    id: "xm607",
    name: "Custom Sweatshirt",
    slug: "custom-sweatshirt",
    category: "custom-shirts",
    subcategory: "custom-sweatshirts",
    subtitle: "Brushed fleece crewneck that carries a large print",
    shortDescription: "A brushed fleece crewneck that carries a large print beautifully and wears well all season.",
    detailedDescription:
      "Fleece gives a print real presence. The surface is broad and flat, so large artwork lands with impact instead of curving away at the edges the way it can on a fitted tee. Inside, the fleece is brushed soft and heavy enough to wear on its own through cooler months, and the ribbed neck, cuffs and hem have the recovery to stay snug rather than stretching out. It is the piece staff and teams tend to keep longest.",
    price: 39.99,
    rating: 4.9,
    reviewCount: 176,
    stock: 500,
    sizes: CUSTOM_SIZES,
    colors: [C.white, C.black, C.navy, C.heather, C.midWash, C.coral],
    images: img("custom-sweatshirt"),
    material: "Cotton rich brushed fleece, 340 GSM",
    features: [
      "Broad flat surface for large artwork",
      "Brushed soft fleece inner face",
      "High recovery ribbed neck, cuffs and hem",
      "Warm enough to wear on its own",
      "Volume pricing from ten shirts",
    ],
    careInstructions: CUSTOM_CARE,
    shippingInfo: CUSTOM_SHIPPING,
    returnInfo: CUSTOM_RETURN,
    featured: true,
    newArrival: true,
    bestSeller: false,
    limitedStock: false,
  },
  {
    id: "xm608",
    name: "Bulk Custom Shirt Package",
    slug: "bulk-custom-shirt-package",
    category: "custom-shirts",
    subcategory: "bulk-custom",
    subtitle: "Best per shirt pricing for large orders",
    shortDescription: "The best per shirt pricing for large orders, with discounts applied automatically as quantity grows.",
    detailedDescription:
      "When an order runs to dozens of shirts the per shirt price should reflect that, and here it does so without a quote or a phone call. Discounts apply automatically inside the customization tool: five percent from ten shirts, ten percent from twenty five, and fifteen percent from fifty. Mixed sizes are welcome within a single order at the same price, and the running total updates live as you change the quantity so there are no surprises at checkout.",
    price: 22.99,
    rating: 4.8,
    reviewCount: 211,
    stock: 500,
    sizes: CUSTOM_SIZES,
    colors: [C.white, C.black, C.navy, C.heather, C.midWash, C.coral],
    images: img("bulk-custom-shirt-package"),
    material: "Cotton jersey, 200 GSM",
    features: [
      "Five percent off from ten shirts",
      "Ten percent off from twenty five shirts",
      "Fifteen percent off from fifty shirts",
      "Mixed sizes at the same price",
      "Live total as quantity changes",
    ],
    careInstructions: CUSTOM_CARE,
    shippingInfo: CUSTOM_SHIPPING,
    returnInfo: CUSTOM_RETURN,
    featured: false,
    newArrival: false,
    bestSeller: true,
    limitedStock: false,
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

export function getBestSellers(limit = 8): Product[] {
  return products.filter((product) => product.bestSeller).slice(0, limit);
}

export function getLimitedStock(limit = 4): Product[] {
  return products.filter((product) => product.limitedStock).slice(0, limit);
}

/** Products currently discounted, sorted by the deepest saving first. */
export function getSaleProducts(limit = 8): Product[] {
  return products
    .filter((product) => (product.discount ?? 0) > 0)
    .sort((a, b) => (b.discount ?? 0) - (a.discount ?? 0))
    .slice(0, limit);
}

export function countByCategory(category: CategorySlug): number {
  return getProductsByCategory(category).length;
}

export function countBySubcategory(sub: SubcategorySlug): number {
  return getProductsBySubcategory(sub).length;
}

/** The badge shown on a product card, in priority order. */
export function productBadge(product: Product): ProductBadge | null {
  if (product.limitedStock) return "limited";
  if (product.newArrival) return "new";
  if (product.bestSeller) return "bestseller";
  if ((product.discount ?? 0) >= 25) return "sale";
  return null;
}

/**
 * Related products prefer the same subcategory, then fall back to the same
 * department so the section is never left short of items.
 */
export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const sameSub = products.filter(
    (item) => item.id !== product.id && item.subcategory === product.subcategory,
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

/** Complementary picks used by the frequently bought together module. */
export function getFrequentlyBoughtTogether(product: Product, limit = 2): Product[] {
  const sameDepartment = products.filter(
    (item) => item.id !== product.id && item.category === product.category,
  );
  const complements = sameDepartment.filter(
    (item) => item.subcategory !== product.subcategory,
  );
  return (complements.length >= limit ? complements : sameDepartment).slice(0, limit);
}

export function getProductsByIds(ids: string[]): Product[] {
  return ids
    .map((id) => products.find((product) => product.id === id))
    .filter((product): product is Product => Boolean(product));
}

/** Lowest and highest price in the catalogue, used to seed the price filter. */
export const PRICE_BOUNDS = {
  min: Math.floor(Math.min(...products.map((product) => product.price))),
  max: Math.ceil(Math.max(...products.map((product) => product.price))),
};

/** Every size offered anywhere in the catalogue, used by the size filter. */
export const ALL_SIZES = Array.from(
  new Set(products.flatMap((product) => product.sizes)),
);

/** Every color name offered anywhere, used by the color filter. */
export const ALL_COLORS = Array.from(
  new Map(
    products
      .flatMap((product) => product.colors)
      .map((color) => [color.name, color]),
  ).values(),
);

/** Sorts a list without mutating the input. */
export function sortProducts(list: Product[], sort: SortOption): Product[] {
  const sorted = [...list];
  switch (sort) {
    case "price-low":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-high":
      return sorted.sort((a, b) => b.price - a.price);
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating);
    case "popularity":
      return sorted.sort(
        (a, b) => b.rating * b.reviewCount - a.rating * a.reviewCount,
      );
    case "latest":
      return sorted.sort((a, b) => {
        if (a.newArrival !== b.newArrival) return a.newArrival ? -1 : 1;
        return b.id.localeCompare(a.id);
      });
    case "featured":
    default:
      return sorted.sort((a, b) => {
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        if (a.bestSeller !== b.bestSeller) return a.bestSeller ? -1 : 1;
        return b.rating - a.rating;
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
      product.subtitle,
      product.shortDescription,
      product.material,
    ]
      .join(" ")
      .toLowerCase()
      .includes(query),
  );
}

/** Every shirt in the Custom Shirts department. */
export function getCustomShirts(): Product[] {
  return products.filter((product) => product.category === "custom-shirts");
}
