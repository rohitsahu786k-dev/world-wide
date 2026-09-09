import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { HomeAboutBrief } from "@/components/sections/HomeAboutBrief";
import { CategoryGrid } from "@/components/sections/CategoryGrid";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { LogisticsTargetMarkets } from "@/components/sections/LogisticsTargetMarkets";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { BlogSection } from "@/components/sections/BlogSection";
import { ContactInquirySection } from "@/components/sections/ContactInquirySection";

export const metadata: Metadata = {
  title: "Worldwide Supply 28 SL | Luxury Wholesale & International Distribution",
  description:
    "Official website of Worldwide Supply 28 SL based in Valencia, Spain. Supplying luxury perfumery, cosmetics, skincare, fine wines & spirits, and lifestyle products worldwide.",
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <HomeAboutBrief />
      <CategoryGrid />
      <ServicesSection compact />
      <LogisticsTargetMarkets compact />
      <WhyChooseUs />
      <BlogSection />
      <ContactInquirySection />
    </>
  );
}
