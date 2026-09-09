import { getWpMedia } from "@/lib/wp-media";

export const blogPosts = [
  {
    title: "Opening African Wholesale Markets from Valencia",
    description:
      "How Spain-based sourcing, logistics coordination, and partner qualification can support new distributor and retailer collaborations across Africa.",
    image: getWpMedia("/images/blog/blog-global-duty-free.jpg"),
    href: "/blog/113",
    category: "Blog",
  },
  {
    title: "Travel Retail Categories Built for B2B Growth",
    description:
      "Fragrance, beauty, travel sets, accessories, and premium gifting categories can strengthen duty-free and destination retail assortments.",
    image: getWpMedia("/images/blog/blog-niche-perfumery.jpg"),
    href: "/blog/114",
    category: "Blog",
  },
  {
    title: "Luxury Wholesale Without E-Commerce Noise",
    description:
      "Why serious wholesale websites should focus on partner qualification, availability conversations, sourcing fit, and long-term relationships.",
    image: getWpMedia("/images/blog/blog-brand-entry-strategy.jpg"),
    href: "/blog/115",
    category: "Blog",
  },
];
