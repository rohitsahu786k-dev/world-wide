"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { siteData } from "@/data/siteData";
import { MapPin, ArrowRight } from "lucide-react";
import { getWpMedia } from "@/lib/wp-media";
import { useSiteSettings } from "@/context/SiteSettingsContext";

const heroDesktopDefault = getWpMedia("/banner-img/worldwide-supply-28-sl/desktop/worldwide-supply-28-sl-premium-lifestyle-banner-desktop-02.png");
const heroMobileDefault = getWpMedia("/banner-img/worldwide-supply-28-sl/mobile/worldwide-supply-28-sl-premium-collection-banner-mobile-02.png");

export function HeroSection() {
  const { t } = useLanguage();
  const { settings } = useSiteSettings();

  const heroDesktopImage = settings.hero.desktop_banners[0] || heroDesktopDefault;
  const heroMobileImage = settings.hero.mobile_banners[0] || heroMobileDefault;

  return (
    <div className="relative w-full bg-white pt-20">
      {/* Main Hero Banner with Responsive Mobile & Desktop Banners */}
      <section className="relative w-full min-h-[590px] overflow-hidden sm:h-[calc(100svh-5rem)] sm:min-h-[600px] sm:max-h-[760px]">
        {/* Desktop Background Image (Hidden on Mobile) */}
        <div className="absolute inset-0 z-0 hidden sm:block">
          <Image
            src={heroDesktopImage}
            alt="Worldwide Supply 28 SL premium lifestyle banner desktop"
            fill
            priority
            sizes="(min-width: 640px) 100vw, 0vw"
            className="object-cover object-[center_58%] filter saturate-105"
          />
        </div>

        {/* Mobile Background Image (Visible ONLY on Mobile Screens) */}
        <div className="absolute inset-0 z-0 block sm:hidden">
          <Image
            src={heroMobileImage}
            alt="Worldwide Supply 28 SL premium collection banner mobile"
            fill
            priority
            sizes="(max-width: 639px) 100vw, 0vw"
            className="object-cover object-center filter saturate-105"
          />
        </div>

        <div
          className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.82)_28%,rgba(255,255,255,0.16)_52%,rgba(255,255,255,0)_100%)] sm:bg-[linear-gradient(90deg,rgba(255,255,255,0.9)_0%,rgba(255,255,255,0.78)_28%,rgba(255,255,255,0.28)_54%,rgba(255,255,255,0)_76%)]"
          aria-hidden="true"
        />

        {/* Hero Content Layer */}
        <div className="relative z-20 mx-auto flex h-full max-w-7xl items-start px-4 pb-8 pt-7 sm:items-center sm:px-6 sm:py-10 lg:px-8">
          <div className="w-full max-w-md space-y-3 bg-transparent p-0 sm:max-w-lg sm:space-y-5 lg:max-w-2xl">
            {/* Location / Badge Tag */}
            <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-300/80 bg-white/95 px-3 py-1 text-[10px] font-bold text-[#00A884] shadow-xs sm:gap-2 sm:px-4 sm:py-1.5 sm:text-xs">
              <MapPin className="h-3 w-3 shrink-0 sm:h-4 sm:w-4" />
              <span>{settings.hero.badge || t(siteData.company.location.badge.en, siteData.company.location.badge.es)}</span>
            </div>

            {/* Main Headline - High Contrast Bold Typography on Sky */}
            <h1 className="max-w-sm text-[26px] font-semibold tracking-tight text-[#071321] leading-[1.04] drop-shadow-[0_2px_8px_rgba(255,255,255,0.9)] sm:max-w-none sm:text-5xl sm:leading-[1.08] lg:text-6xl">
              {settings.hero.title || t(siteData.company.tagline.en, siteData.company.tagline.es)}
            </h1>

            {/* Sub-headline */}
            <p className="max-w-sm text-xs font-bold leading-5 text-slate-800 drop-shadow-[0_1px_8px_rgba(255,255,255,0.9)] sm:max-w-xl sm:text-lg sm:leading-relaxed">
              {settings.company.subtagline || t(siteData.company.subTagline.en, siteData.company.subTagline.es)}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-nowrap items-center gap-2 pt-0.5 sm:flex-wrap sm:gap-3 sm:pt-1">
              <Link
                href="/categories"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#00A884] px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg shadow-emerald-500/25 transition hover:bg-[#009272] hover:scale-105 active:scale-95 sm:gap-2 sm:px-7 sm:py-3.5 sm:text-xs"
              >
                <span>{t("Explore Categories", "Explorar Categorías")}</span>
                <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white/95 px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider text-slate-900 shadow-xs transition hover:bg-white hover:border-[#00A884] hover:text-[#00A884] sm:gap-2 sm:px-7 sm:py-3.5 sm:text-xs"
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
                <span className="block text-2xl sm:text-3xl font-semibold text-[#00A884]">
                  {settings.hero.stat_exp || "15+"}
                </span>
                <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                  {t("Years Experience", "Años Experiencia")}
                </span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-semibold text-[#00A884]">
                  {settings.hero.stat_countries || "50+"}
                </span>
                <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                  {t("Global Markets", "Mercados Globales")}
                </span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-semibold text-[#071321]">CIF</span>
                <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                  {settings.company.cif || siteData.company.cif}
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
