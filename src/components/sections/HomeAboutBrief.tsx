"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { siteData } from "@/data/siteData";
import { ArrowRight, BadgeCheck, Globe2, MapPin } from "lucide-react";

export function HomeAboutBrief() {
  const { t } = useLanguage();

  return (
    <section className="bg-white py-20 text-[#071321]">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00A884]/20 bg-[#00A884]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#00A884]">
            <MapPin className="h-3.5 w-3.5" />
            <span>{t("Valencia, Spain", "Valencia, Espana")}</span>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-semibold tracking-tight text-[#071321] sm:text-5xl">
              {t("A trusted international wholesale partner", "Un socio mayorista internacional de confianza")}
            </h2>
            <p className="max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
              {t(
                "Worldwide Supply 28 SL is a Spain-based B2B wholesale company supporting global retailers, duty-free operators, distributors, and strategic partners with premium perfumery, cosmetics, skincare, lifestyle products, wines and spirits, and reliable supply solutions.",
                "Worldwide Supply 28 SL es una empresa mayorista B2B con sede en Espana que apoya a minoristas globales, operadores duty-free, distribuidores y socios estrategicos con perfumeria premium, cosmetica, cuidado de la piel, productos lifestyle, vinos y licores, y soluciones de suministro fiables."
              )}
            </p>
          </div>

          <Link
            href="/about"
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md transition hover:bg-[#00A884]"
          >
            <span>{t("Read Our Story", "Leer Nuestra Historia")}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="lg:col-span-5 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <BadgeCheck className="mb-4 h-6 w-6 text-[#00A884]" />
            <p className="text-3xl font-semibold text-[#071321]">{siteData.company.highlights.yearsExperience}</p>
            <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-500">
              {t("Years in wholesale, luxury retail, and travel retail", "Anos en mayorista, retail de lujo y travel retail")}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <Globe2 className="mb-4 h-6 w-6 text-[#00A884]" />
            <p className="text-3xl font-semibold text-[#071321]">{siteData.company.highlights.countriesServed}</p>
            <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-500">
              {t("Global markets across Europe, GCC, North America, South America, Asia, Africa, and Australia", "Mercados globales en Europa, GCC, Norteamerica, Sudamerica, Asia, Africa y Australia")}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <p className="mb-4 text-xs font-bold uppercase tracking-wider text-[#00A884]">CIF</p>
            <p className="text-2xl font-semibold text-[#071321]">{siteData.company.cif}</p>
            <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-500">
              {t("Registered company in Spain", "Empresa registrada en Espana")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
