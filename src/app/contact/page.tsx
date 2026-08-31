import type { Metadata } from "next";
import { InternalPageHero } from "@/components/sections/InternalPageHero";
import { ContactInquirySection } from "@/components/sections/ContactInquirySection";

export const metadata: Metadata = {
  title: "Contact Us | Worldwide Supply 28 SL",
  description: "Contact Worldwide Supply 28 SL in Valencia, Spain. Request wholesale inquiries, distribution proposals, or sourcing partnerships.",
};

export default function ContactPage() {
  return (
    <div>
      <InternalPageHero
        eyebrow="Contact Us"
        title="Start a qualified wholesale conversation"
        copy="Send your sourcing requirement, distribution proposal, or partnership inquiry to the Worldwide Supply 28 SL team in Valencia."
        imageSrc="/images/heroes/hero-contact.jpg"
      />
      <ContactInquirySection compact />
    </div>
  );
}
