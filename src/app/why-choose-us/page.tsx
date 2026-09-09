import type { Metadata } from "next";
import { InternalPageHero } from "@/components/sections/InternalPageHero";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { ContactInquirySection } from "@/components/sections/ContactInquirySection";

export const metadata: Metadata = {
  title: "Why Choose Us | Worldwide Supply 28 SL",
  description: "Why Worldwide Supply 28 SL is your trusted partner in luxury wholesale, retail distribution, and global supply.",
};

export default function WhyChooseUsPage() {
  return (
    <div>
      <InternalPageHero
        eyebrow="Why Choose Us"
        title="Built for trust, consistency, and long-term trade"
        copy="A Spain-based wholesale partner combining 15+ years of experience, premium relationships, flexible sourcing, and international logistics discipline."
        imageSrc="/images/heroes/hero-why-choose-us-banner-1.png"
      />
      <WhyChooseUs compact />
      <ContactInquirySection compact />
    </div>
  );
}
