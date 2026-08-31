import type { Metadata } from "next";
import { InternalPageHero } from "@/components/sections/InternalPageHero";
import { AboutCompanyProfile } from "@/components/sections/AboutCompanyProfile";
import { AboutStorySection } from "@/components/sections/AboutStorySection";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { ContactInquirySection } from "@/components/sections/ContactInquirySection";

export const metadata: Metadata = {
  title: "About Us | Worldwide Supply 28 SL",
  description: "Learn about Worldwide Supply 28 SL, our founders Siddharth Thakker & Sakina Idmouhine, company mission, vision, and values.",
};

export default function AboutPage() {
  return (
    <div>
      <InternalPageHero
        eyebrow="About Us"
        title="Spain-based partner for luxury wholesale"
        copy="Worldwide Supply 28 SL connects premium categories, trusted retail partners, duty-free channels, distributors, and international supply routes from Valencia."
        imageSrc="/images/heroes/hero-about.jpg"
      />
      <AboutCompanyProfile />
      <AboutStorySection />
      <WhyChooseUs compact />
      <ContactInquirySection compact />
    </div>
  );
}
