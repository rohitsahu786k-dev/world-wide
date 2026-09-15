"use client";

import React from "react";
import { siteData } from "@/data/siteData";
import { useSiteSettings } from "@/context/SiteSettingsContext";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export function WhatsAppWidget() {
  const { settings } = useSiteSettings();
  const phone = (settings.contact.whatsapp || settings.contact.phone || siteData.company.contact.whatsapp).replace(/[^0-9]/g, "");
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
    "Hello Worldwide Supply 28 SL, I would like to inquire about your wholesale luxury products."
  )}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-24 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-[#20ba59] active:scale-95 animate-bounce-in"
      style={{ animationDuration: "0.6s", animationFillMode: "both" }}
    >
      <WhatsAppIcon className="w-8 h-8 text-white" />

      {/* Pulsing ring */}
      <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-40 animate-ping" />
    </a>
  );
}
