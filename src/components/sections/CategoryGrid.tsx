"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { siteData } from "@/data/siteData";
import { ArrowUpRight } from "lucide-react";

export function CategoryGrid({ compact = false }: { compact?: boolean }) {
  const { t } = useLanguage();

  return (
    <section className={`${compact ? "py-16" : "py-24"} bg-slate-50 text-[#071321] relative overflow-hidden`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className={`flex flex-col md:flex-row md:items-end justify-between ${compact ? "mb-10" : "mb-16"} gap-6`}>
          <div className="max-w-2xl space-y-4">
            <span className="inline-block rounded-full bg-[#00A884]/10 border border-[#00A884]/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#00A884]">
              {t("Product Sectors", "Sectores de Productos")}
            </span>
            <h2 className="text-3xl font-semibold sm:text-5xl tracking-tight text-[#071321]">
              {t("Luxury Sourcing Categories", "Categorías de Abastecimiento de Lujo")}
            </h2>
            <p className="text-base text-slate-600">
              {t(
                "High-volume wholesale supply solutions across premier luxury categories for international distributors and prestige retailers.",
                "Soluciones de suministro al por mayor de alto volumen en categorías de lujo principales para distribuidores internacionales y minoristas."
              )}
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#00A884] transition shadow-md"
            >
              <span>{t("Inquire All Categories", "Consultar Todas Las Categorías")}</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* 8 Bright, Clean Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteData.categories.map((cat) => (
            <Link
              key={cat.id}
              href="/contact"
              className="group relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-[#00A884] flex flex-col justify-between h-[380px]"
            >
              {/* Full Bright Background Image - No Heavy Dark Shadows */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={cat.image}
                  alt={cat.name.en}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105 filter saturate-105"
                />
                {/* Subtle light gradient ONLY at the bottom line for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#071321]/80 via-transparent to-transparent" />
              </div>

              {/* Badge Top Header */}
              <div className="relative z-10 p-5 flex justify-between items-start">
                <span className="rounded-full bg-white/95 backdrop-blur-md px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#071321] shadow-sm border border-slate-200">
                  {t(cat.badge.en, cat.badge.es)}
                </span>
                <div className="h-9 w-9 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center text-[#071321] shadow-sm transition-all group-hover:bg-[#00A884] group-hover:text-white">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>

              {/* Minimal Clean Content Bottom */}
              <div className="relative z-10 p-6 space-y-2 text-white">
                <h3 className="text-xl font-semibold text-white group-hover:text-[#00A884] transition leading-tight">
                  {t(cat.name.en, cat.name.es)}
                </h3>
                <div className="flex items-center gap-1 text-xs font-bold text-[#00A884] uppercase tracking-wider group-hover:underline pt-1">
                  <span>{t("Request Supply", "Solicitar Suministro")}</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center text-xs text-slate-500 border-t border-slate-200 pt-6 font-medium">
          <p>
            {t(
              "Note: Displaying B2B wholesale product categories. No individual retail listings.",
              "Nota: Mostrando categorías de productos mayoristas B2B. Sin listados minoristas individuales."
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
