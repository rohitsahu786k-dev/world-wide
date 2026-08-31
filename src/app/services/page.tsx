import type { Metadata } from "next";
import { InternalPageHero } from "@/components/sections/InternalPageHero";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { LogisticsTargetMarkets } from "@/components/sections/LogisticsTargetMarkets";
import { ContactInquirySection } from "@/components/sections/ContactInquirySection";

export const metadata: Metadata = {
  title: "Services & Logistics | Worldwide Supply 28 SL",
  description: "Global Distribution, Logistics Management, Brand Introduction, and Sourcing & Supplier Development.",
};

export default function ServicesPage() {
  return (
    <div>
      <InternalPageHero
        eyebrow="Services"
        title="Wholesale, logistics, and market-entry support"
        copy="End-to-end B2B capabilities for global distribution, logistics management, brand introduction, and supplier development."
        imageSrc="/images/heroes/hero-services.jpg"
      />
      <ServicesSection compact />
      <LogisticsTargetMarkets compact />
      <ContactInquirySection compact />
    </div>
  );
}
