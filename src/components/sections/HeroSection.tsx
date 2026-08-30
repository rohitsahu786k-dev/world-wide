"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { siteData } from "@/data/siteData";
import { MapPin, ArrowRight } from "lucide-react";

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <div className="relative w-full bg-white pt-20">
      {/* Main Hero Banner with Responsive Mobile & Desktop Banners */}
      <section className="relative w-full min-h-[560px] overflow-hidden sm:h-[calc(100svh-5rem)] sm:min-h-[600px] sm:max-h-[760px]">
        {/* Desktop Background Image (Hidden on Mobile) */}
        <div className="absolute inset-0 z-0 hidden sm:block">
          <Image
            src="/images/valencia-hero-waterfront.png"
            alt="Luxury Products by Futuristic Waterfront Architecture Valencia Desktop"
            fill
            priority
            className="object-cover object-right lg:object-center filter saturate-105"
          />
        </div>

        {/* Mobile Background Image (Visible ONLY on Mobile Screens) */}
        <div className="absolute inset-0 z-0 block sm:hidden">
          <Image
            src="/images/luxury-commerce-premium-products-valencia-mobile-banner.webp"
            alt="Luxury Products Valencia Mobile Banner"
            fill
            priority
            className="object-cover object-top filter saturate-105"
          />
        </div>

        <div className="absolute inset-0 z-10 bg-[linear-gradient(90deg,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.84)_34%,rgba(255,255,255,0.36)_58%,rgba(255,255,255,0.06)_100%)]" aria-hidden="true" />

        {/* Hero Content Layer */}
        <div className="relative z-20 mx-auto flex h-full max-w-7xl items-center px-4 py-10 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-4 bg-transparent p-0 sm:max-w-lg sm:space-y-5 lg:max-w-2xl">
            {/* Location Tag */}
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-300/80 bg-white/95 px-3.5 sm:px-4 py-1.5 text-[11px] sm:text-xs font-bold text-[#00A884] shadow-xs">
              <MapPin className="h-3.5 sm:h-4 w-3.5 sm:w-4 shrink-0" />
              <span>{t(siteData.company.location.badge.en, siteData.company.location.badge.es)}</span>
            </div>

            {/* Main Headline - High Contrast Bold Typography on Sky */}
            <h1 className="text-3xl font-semibold tracking-tight text-[#071321] leading-[1.1] sm:text-5xl lg:text-6xl">
              {t(siteData.company.tagline.en, siteData.company.tagline.es)}
            </h1>

            {/* Sub-headline */}
            <p className="max-w-xl text-sm font-semibold leading-relaxed text-slate-700 sm:text-lg">
              {t(siteData.company.subTagline.en, siteData.company.subTagline.es)}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-1">
              <Link
                href="/categories"
                className="inline-flex items-center gap-2 rounded-full bg-[#00A884] px-6 sm:px-7 py-3 sm:py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-emerald-500/25 transition hover:bg-[#009272] hover:scale-105 active:scale-95"
              >
                <span>{t("Explore Categories", "Explorar Categorías")}</span>
                <ArrowRight className="h-3.5 sm:h-4 w-3.5 sm:w-4" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/95 px-6 sm:px-7 py-3 sm:py-3.5 text-xs font-bold uppercase tracking-wider text-slate-900 shadow-xs transition hover:bg-white hover:border-[#00A884] hover:text-[#00A884]"
              >
                <span>{t("Request Sourcing", "Solicitar Suministro")}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sub-Hero Section: Dedicated Trust & Brand Highlights Bar Below Hero */}
      <section className="relative z-30 border-y border-slate-200 bg-white py-5 shadow-sm sm:py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-5 lg:grid-cols-12 lg:gap-8">
            {/* Stats Items */}
            <div className="grid grid-cols-3 gap-4 border-b border-slate-200 pb-5 lg:col-span-5 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-8">
              <div>
                <span className="block text-2xl sm:text-3xl font-semibold text-[#00A884]">15+</span>
                <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                  {t("Years Experience", "Años Experiencia")}
                </span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-semibold text-[#00A884]">50+</span>
                <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                  {t("Global Markets", "Mercados Globales")}
                </span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-semibold text-[#071321]">CIF</span>
                <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                  {siteData.company.cif}
                </span>
              </div>
            </div>

            {/* Brand Group Highlights */}
            <div className="lg:col-span-7 space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                {t("Representing products from premier international groups:", "Representando productos de grupos internacionales principales:")}
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {siteData.company.highlights.brandGroups.map((group) => (
                  <span
                    key={group}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-bold text-slate-800 shadow-2xs"
                  >
                    {group}
                  </span>
                ))}
                <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 text-xs font-bold text-[#00A884]">
                  + Selected Niche Perfume Houses
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
