import type { Faq, Testimonial } from "@/lib/types";

/** Sample customer feedback shown on the home page testimonial slider. */
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Ayesha Siddiqui",
    location: "Lahore",
    rating: 5,
    quote:
      "I ordered the chikankari kurta shalwar for Eid and the embroidery is far better than I expected at this price. It arrived in three days and the fit was exactly as described on the size guide.",
  },
  {
    id: "t2",
    name: "Bilal Ahmed",
    location: "Karachi",
    rating: 5,
    quote:
      "Bought two formal shirts and a pair of tailored trousers for work. The fabric quality is genuinely good and the shirts still look sharp by the end of the day. Cash on Delivery made the whole thing simple.",
  },
  {
    id: "t3",
    name: "Fatima Noor",
    location: "Islamabad",
    rating: 5,
    quote:
      "The newborn set is so soft and the envelope shoulders make dressing my daughter much easier. I have already ordered a second one as a gift for my sister.",
  },
  {
    id: "t4",
    name: "Usman Tariq",
    location: "Rawalpindi",
    rating: 4,
    quote:
      "Ordered the wooden learning blocks for my son and he plays with them every single day. Solid wood, smooth edges and the storage box keeps everything together.",
  },
  {
    id: "t5",
    name: "Hina Raza",
    location: "Faisalabad",
    rating: 5,
    quote:
      "The lawn shirts are perfect for summer here. Light, comfortable and the colours have not faded after several washes. Customer support answered my sizing question within minutes on WhatsApp.",
  },
  {
    id: "t6",
    name: "Kamran Sheikh",
    location: "Multan",
    rating: 5,
    quote:
      "Ordering was straightforward and I paid the rider at my door. The kurta shalwar quality is excellent and I will be buying the charcoal one next.",
  },
];

/** Questions answered on the contact page accordion. */
export const faqs: Faq[] = [
  {
    question: "How long does delivery take across Pakistan?",
    answer:
      "Orders are processed within one working day. Delivery usually takes two to three working days for major cities such as Lahore, Karachi, Islamabad, Rawalpindi, Faisalabad and Multan, and three to five working days for other locations across the country.",
  },
  {
    question: "Which payment methods do you accept?",
    answer:
      "We currently offer Cash on Delivery only. You place your order on the website, we confirm it with you, and you pay the courier in cash when your parcel is handed over at your door. There is no advance payment required.",
  },
  {
    question: "What are the delivery charges?",
    answer:
      "A flat delivery charge of PKR 250 applies to orders below PKR 5,000. Once your order subtotal reaches PKR 5,000 or more, delivery is completely free anywhere in Pakistan.",
  },
  {
    question: "Can I exchange an item if the size does not fit?",
    answer:
      "Yes. You can request an exchange within seven days of receiving your order, as long as the item is unused, unwashed and still has its original tags attached. Contact us on WhatsApp or by email with your order number and we will arrange the exchange.",
  },
  {
    question: "How do I choose the right size?",
    answer:
      "Every product page lists the available sizes for that item. Adult clothing follows standard Small, Medium, Large and Extra Large sizing, kids clothing is listed by age range, and baby clothing is listed by months. If you are unsure, send us a message and our team will recommend a size.",
  },
  {
    question: "Can I cancel or change my order after placing it?",
    answer:
      "You can cancel or change your order at any time before it is handed to the courier. Contact us with your order number as soon as possible and our team will update or cancel it for you at no cost.",
  },
  {
    question: "Are your toys safe for young children?",
    answer:
      "Yes. Our wooden toys use water based non toxic paint with hand rounded edges, our soft toys use embroidered features rather than plastic eyes so there are no small parts, and our plastic toys are made from food grade material that is free from BPA.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your parcel is dispatched we send you a tracking reference by SMS on the phone number provided at checkout. You can also message us on WhatsApp with your order number and we will share the current status right away.",
  },
];

/** Reasons to shop, shown as feature cards on the home page. */
export const shoppingBenefits = [
  {
    title: "Quality Products",
    description:
      "Every item is checked against our fabric and stitching standards before it is listed, so what arrives matches what you saw on screen.",
    icon: "shield",
  },
  {
    title: "Affordable Prices",
    description:
      "We keep our range direct and our margins honest, which means premium fabrics and finishing at prices that stay realistic for families.",
    icon: "tag",
  },
  {
    title: "Fast Order Processing",
    description:
      "Orders placed before the evening cut off are packed and dispatched within one working day, so your parcel is moving quickly.",
    icon: "bolt",
  },
  {
    title: "Cash on Delivery",
    description:
      "Pay the courier in cash when your parcel reaches your door. No advance payment, no card details and no online transfer needed.",
    icon: "wallet",
  },
  {
    title: "Customer Support",
    description:
      "Our team answers on WhatsApp, phone and email during working hours, ready to help with sizing, order status and exchanges.",
    icon: "headset",
  },
  {
    title: "Secure Checkout Experience",
    description:
      "Checkout collects only the details needed to deliver your parcel, nothing more, and your information is never sold or shared for marketing.",
    icon: "lock",
  },
] as const;

/** Statistics displayed on the about page. */
export const companyStats = [
  { value: "25,000", suffix: "plus", label: "Happy Customers" },
  { value: "6", suffix: "", label: "Product Categories" },
  { value: "1,200", suffix: "plus", label: "Quality Products" },
  { value: "7", suffix: "days", label: "Customer Support" },
] as const;

/** Core values listed on the about page. */
export const coreValues = [
  {
    title: "Honesty in every listing",
    description:
      "We describe fabric, fit and finishing exactly as they are. If a shirt runs slim, we say so, because a returned parcel helps nobody.",
  },
  {
    title: "Comfort before trend",
    description:
      "Trends pass quickly. We select fabrics that stay comfortable through Pakistani summers and winters, then build the styling around that.",
  },
  {
    title: "Fair pricing",
    description:
      "We would rather earn a smaller margin on a customer who returns every season than a large one on a customer who never comes back.",
  },
  {
    title: "Respect for your time",
    description:
      "Quick dispatch, clear updates and a support team that replies properly the first time instead of asking you to repeat yourself.",
  },
] as const;
