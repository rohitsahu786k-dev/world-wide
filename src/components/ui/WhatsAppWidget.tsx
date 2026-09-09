"use client";

import React from "react";
import { siteData } from "@/data/siteData";
import { useSiteSettings } from "@/context/SiteSettingsContext";

export function WhatsAppWidget() {
  const { settings } = useSiteSettings();
  const phone = (settings.contact.whatsapp || siteData.company.contact.whatsapp).replace(/[^0-9]/g, "");
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
      {/* WhatsApp SVG icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        className="w-8 h-8"
        fill="white"
      >
        <path d="M16 2C8.268 2 2 8.268 2 16c0 2.49.65 4.83 1.784 6.865L2 30l7.347-1.925A13.94 13.94 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.44 11.44 0 0 1-5.83-1.594l-.418-.248-4.358 1.142 1.163-4.245-.272-.435A11.46 11.46 0 0 1 4.5 16C4.5 9.649 9.649 4.5 16 4.5S27.5 9.649 27.5 16 22.351 27.5 16 27.5zm6.29-8.617c-.345-.172-2.04-1.006-2.356-1.12-.316-.115-.546-.172-.776.172-.23.345-.89 1.12-1.09 1.35-.2.23-.4.258-.745.086-.345-.172-1.457-.537-2.775-1.712-1.026-.915-1.718-2.044-1.919-2.389-.2-.345-.021-.531.15-.703.155-.155.345-.403.518-.604.172-.2.23-.345.345-.575.115-.23.058-.432-.029-.604-.086-.172-.776-1.87-1.063-2.562-.28-.673-.564-.582-.776-.593l-.66-.011c-.23 0-.604.086-.92.432-.316.345-1.207 1.179-1.207 2.876s1.236 3.337 1.408 3.567c.172.23 2.433 3.713 5.894 5.208.824.355 1.467.567 1.968.726.827.263 1.58.226 2.174.137.663-.099 2.04-.834 2.328-1.64.287-.805.287-1.495.2-1.64-.086-.144-.316-.23-.66-.402z" />
      </svg>

      {/* Pulsing ring */}
      <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-40 animate-ping" />
    </a>
  );
}
