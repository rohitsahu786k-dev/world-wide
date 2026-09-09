import { getWpMedia } from "@/lib/wp-media";

export const site = {
  name: "Worldwide Supply 28",
  tagline: "A Legacy of Trust. A World of Opportunities.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.worldwidesupply28.com",
  email: "trading@worldwidesupply28.com",
  phone: "+34 614850570",
  phoneHref: "tel:+34614850570",
  address: "Calle Carlos Cervera, 14, Bajo, 46006 Valencia, Spain",
  city: "Valencia, Spain",
  director: "Sakina Idmouhine",
  directorTitle: "Directora General",
  logo: getWpMedia("/world-wide-logo.png"),
  description:
    "Worldwide Supply 28 is a Spain-based international wholesale company specializing in luxury goods, travel retail, FMCG products, global sourcing, and premium distribution solutions.",
};

export const navItems = [
  { label: "About", href: "/about" },
  { label: "Categories", href: "/categories" },
  { label: "Services", href: "/services" },
  { label: "Global Distribution", href: "/global-distribution" },
  { label: "Partners", href: "/partners" },
  { label: "Contact", href: "/contact" },
];

export const stats = [
  { value: "15+", label: "Years Experience" },
  { value: "50+", label: "Global Markets" },
  { value: "100+", label: "Premium Brands" },
  { value: "24/7", label: "Support" },
];
