import type { Faq, Testimonial } from "@/lib/types";

/** Sample customer feedback shown on the home page reviews section. */
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Emily Carter",
    rating: 5,
    purchase: "Floral Midi Dress",
    quote:
      "The product quality was even better than I expected. The fit was accurate, the packaging was neat, and the whole shopping experience felt smooth from start to finish.",
  },
  {
    id: "t2",
    name: "Michael Reed",
    rating: 5,
    purchase: "Premium Linen Blend Shirt",
    quote:
      "I ordered two shirts and a pair of jeans and everything arrived within four days. The linen shirt is now the one I reach for constantly. Sizing matched the guide exactly.",
  },
  {
    id: "t3",
    name: "Sophia Bennett",
    rating: 5,
    purchase: "Chunky Knit Sweater",
    quote:
      "This sweater is genuinely soft, which is rare at this price. No itch at the neck at all. I ordered a second one in a different color a week later.",
  },
  {
    id: "t4",
    name: "Daniel Brooks",
    rating: 4,
    purchase: "Everyday Pullover Hoodie",
    quote:
      "Heavyweight fleece that actually holds its shape, and the hood does not go flat after a few washes. Ordering was simple and the tracking updates were clear.",
  },
  {
    id: "t5",
    name: "Olivia Morgan",
    rating: 5,
    purchase: "Organic Cotton Baby Romper",
    quote:
      "The organic cotton is so soft and the full length snaps make night changes much easier. I have already ordered three more and sent one as a gift.",
  },
  {
    id: "t6",
    name: "James Parker",
    rating: 5,
    purchase: "Wooden Rainbow Stacker",
    quote:
      "My daughter plays with this every single day and has found about ten different uses for it. Solid wood, smooth edges, and it looks good left out in the living room.",
  },
  {
    id: "t7",
    name: "Ava Mitchell",
    rating: 5,
    purchase: "Seamless Activewear Set",
    quote:
      "The set fits like a second skin and the waistband genuinely does not roll. Returns were easy when I needed a different size, and the replacement shipped right away.",
  },
  {
    id: "t8",
    name: "Nathan Cole",
    rating: 5,
    purchase: "Slim Fit Stretch Jeans",
    quote:
      "These jeans have real stretch without looking like athletic wear. Comfortable from the first day with no break in period. Easily the best pair I own right now.",
  },
];

/** Questions answered on the contact page accordion. */
export const faqs: Faq[] = [
  {
    question: "How long does shipping take?",
    answer:
      "Orders are processed within one business day. Standard shipping arrives in five to seven business days depending on your address. Express delivery is available at checkout for faster arrival.",
  },
  {
    question: "Do you offer free shipping?",
    answer:
      "Yes. Standard shipping is free on every order over $75. Below that, standard shipping is a flat $6.99 anywhere in the United States.",
  },
  {
    question: "Which payment method do you accept?",
    answer:
      "We currently offer Cash on Delivery. You place your order on the website, we confirm it with you, and you pay the courier when your parcel is handed over at your door. No advance payment is required.",
  },
  {
    question: "What is your return policy?",
    answer:
      "You can return any item within 7 days of delivery as long as it is unworn, unwashed and still has the original tags attached. Return shipping is free on your first return per order.",
  },
  {
    question: "How do I choose the right size?",
    answer:
      "Every product page lists the available sizes along with a size guide. Adult clothing follows standard XS through XXL sizing, kids clothing is listed by age, and baby clothing is listed by months. If you are between sizes, our team is happy to advise.",
  },
  {
    question: "Can I change or cancel my order?",
    answer:
      "You can change or cancel your order at any time before it ships. Contact us with your order number as soon as possible and our team will update or cancel it at no cost.",
  },
  {
    question: "Are your toys safe for young children?",
    answer:
      "Yes. Our wooden toys use water based non toxic paint with hand rounded edges, our soft toys use embroidered features rather than plastic eyes so there are no small parts, and our plastic toys are made from food grade material that is free from BPA.",
  },
  {
    question: "How do I track my order?",
    answer:
      "Once your parcel ships we send a tracking link to the email address provided at checkout. You can also contact our support team with your order number and we will share the current status right away.",
  },
];

/** Reasons to shop, shown as feature cards on the home page. */
export const shoppingBenefits = [
  {
    title: "Free Shipping Over $75",
    description:
      "Standard shipping is free on every order over $75, with a flat $6.99 rate below that and express delivery available at checkout.",
    icon: "truck",
  },
  {
    title: "Easy 7 Day Returns",
    description:
      "Changed your mind or need a different size? Return any unworn item within 7 days, with free return shipping on your first return per order.",
    icon: "refresh",
  },
  {
    title: "Quality You Can Feel",
    description:
      "Every piece is checked against our fabric and construction standards before it is listed, so what arrives matches what you saw on screen.",
    icon: "shield",
  },
  {
    title: "Secure Checkout",
    description:
      "Checkout collects only the details needed to deliver your order, nothing more, and your information is never sold or shared for marketing.",
    icon: "lock",
  },
  {
    title: "Cash on Delivery",
    description:
      "Pay when your order arrives at your door. No advance payment, no card details and no online transfer needed to place an order.",
    icon: "wallet",
  },
  {
    title: "Customer Support",
    description:
      "Our team answers by phone and email during business hours, ready to help with sizing, order status, returns and exchanges.",
    icon: "headset",
  },
] as const;

/** Statistics displayed on the about page. */
export const companyStats = [
  { value: "40,000", suffix: "plus", label: "Happy Customers" },
  { value: "5", suffix: "", label: "Product Categories" },
  { value: "1,500", suffix: "plus", label: "Quality Products" },
  { value: "4.8", suffix: "of 5", label: "Average Rating" },
] as const;

/** Core values listed on the about page. */
export const coreValues = [
  {
    title: "Honesty in every listing",
    description:
      "We describe fabric, fit and construction exactly as they are. If a shirt runs slim, we say so, because a returned parcel helps nobody.",
  },
  {
    title: "Comfort before trend",
    description:
      "Trends pass quickly. We select fabrics that stay comfortable through real weeks and build the styling around that, not the other way around.",
  },
  {
    title: "Fair pricing",
    description:
      "We would rather earn a smaller margin on a customer who returns every season than a large one on a customer who never comes back.",
  },
  {
    title: "Respect for your time",
    description:
      "Quick dispatch, clear tracking and a support team that answers properly the first time instead of asking you to repeat yourself.",
  },
] as const;

/** Editorial groupings used by the Shop by Style section. */
export const styleEdits = [
  {
    title: "Everyday Basics",
    description: "The tees, hoodies and denim that carry an entire week.",
    href: "/products?type=t-shirts",
    image: "/assets/images/categories/t-shirts.jpg",
  },
  {
    title: "Workwear Ready",
    description: "Shirts and tailored pants that hold up from morning to evening.",
    href: "/products?type=shirts",
    image: "/assets/images/categories/shirts.jpg",
  },
  {
    title: "Weekend Layers",
    description: "Jackets, sweaters and fleece for shoulder season.",
    href: "/products?type=jackets",
    image: "/assets/images/categories/jackets.jpg",
  },
  {
    title: "Active and Easy",
    description: "Seamless sets and soft knits built for moving.",
    href: "/products?type=activewear",
    image: "/assets/images/categories/activewear.jpg",
  },
] as const;
