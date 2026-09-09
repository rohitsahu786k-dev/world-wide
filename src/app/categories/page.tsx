import type { Metadata } from "next";
import { InternalPageHero } from "@/components/sections/InternalPageHero";
import { CategoryGrid } from "@/components/sections/CategoryGrid";
import { ContactInquirySection } from "@/components/sections/ContactInquirySection";

export const metadata: Metadata = {
  title: "Product Categories | Worldwide Supply 28 SL",
  description: "Wholesale luxury sourcing categories: Perfumes, Niche Fragrances, Cosmetics & Skincare, Wines & Spirits, Textiles, Accessories, Jewelry, Travel Sets.",
};

export default function CategoriesPage() {
  return (
    <div>
      <InternalPageHero
        eyebrow="Product Categories"
        title="Premium categories for international wholesale"
        copy="Category-led B2B sourcing across perfumery, niche fragrances, cosmetics, skincare, wines and spirits, textiles, jewelry, accessories, and travel sets."
        imageSrc="/images/heroes/hero-categories-banner-2.png"
      />
      <CategoryGrid compact />
      <ContactInquirySection compact />
    </div>
  );
}
