"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { siteData } from "@/data/siteData";
import { ArrowRight, Sparkles } from "lucide-react";

export function ServicesSection({ compact = false }: { compact?: boolean }) {
  const { t } = useLanguage();

  const serviceImages = [
    "/images/services/global-distribution.jpg",
    "/images/services/logistics-management.jpg",
    "/images/services/brand-entry.jpg",
    "/images/services/sourcing-development.jpg"
  ];

  return (
    <section className={`${compact ? "py-16" : "py-24"} bg-white text-[#071321] relative overflow-hidden`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto ${compact ? "mb-12" : "mb-20"} space-y-4`}>
          <div className="inline-flex items-center gap-2 rounded-full bg-[#00A884]/10 border border-[#00A884]/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#00A884]">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{t("Core Capabilities", "Capacidades Principales")}</span>
          </div>

          <h2 className="text-3xl font-semibold sm:text-5xl tracking-tight text-[#071321] leading-tight">
            {t("Our Strategic Services", "Nuestros Servicios Estratégicos")}
          </h2>

          <p className="text-base sm:text-lg text-slate-600">
            {t(
              "End-to-end B2B solutions bridging international manufacturers, duty-free operators, and global distributors.",
              "Soluciones B2B integrales que conectan a fabricantes internacionales, operadores de duty-free y distribuidores globales."
            )}
          </p>
        </div>

        {/* 4 Spacious Image-Enhanced Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {siteData.services.map((svc, index) => (
            <div
              key={svc.id}
              className="group relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-[#00A884] flex flex-col justify-between"
            >
              {/* Tall, Spacious Image Frame - No Compression */}
              <div className="relative w-full h-72 sm:h-80 overflow-hidden bg-slate-100">
                <Image
                  src={serviceImages[index]}
                  alt={svc.title.en}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105 filter saturate-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071321]/60 via-transparent to-transparent" />
                
                {/* Top Badge */}
                <span className="absolute top-4 left-4 rounded-full bg-white/95 backdrop-blur-md px-4 py-1.5 text-xs font-bold text-[#071321] uppercase tracking-wider shadow-sm border border-slate-200">
                  Service 0{index + 1}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-8 space-y-5 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="text-2xl font-semibold text-[#071321] group-hover:text-[#00A884] transition">
                    {t(svc.title.en, svc.title.es)}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {t(svc.fullDesc.en, svc.fullDesc.es)}
                  </p>
                </div>

                {/* Card Action Link */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">Valencia, Spain</span>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#00A884]"
                  >
                    <span>{t("Inquire Service", "Consultar Servicio")}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
