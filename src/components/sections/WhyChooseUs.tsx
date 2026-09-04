"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { siteData } from "@/data/siteData";
import { ArrowRight, BadgeCheck, Boxes, Globe2, Handshake, ShieldCheck, Sparkles, Truck } from "lucide-react";

const capabilityCards = [
  {
    icon: Handshake,
    label: "Premier Groups",
    title: { en: "Prestige Group Partnerships", es: "Alianzas con grupos prestige" },
    copy: {
      en: "Relationships across LVMH, PUIG, L'Oreal Luxe, COTY, P&G, and selected niche perfume houses.",
      es: "Relaciones con LVMH, PUIG, L'Oreal Luxe, COTY, P&G y casas de perfume nicho seleccionadas.",
    },
  },
  {
    icon: Truck,
    label: "Logistics",
    title: { en: "Cross-Border Supply Discipline", es: "Disciplina de suministro internacional" },
    copy: {
      en: "Practical coordination for duty-free operators, distributors, retailers, and buying offices.",
      es: "Coordinacion practica para operadores duty-free, distribuidores, minoristas y oficinas de compra.",
    },
  },
  {
    icon: Boxes,
    label: "Sourcing",
    title: { en: "Flexible B2B Sourcing", es: "Suministro B2B flexible" },
    copy: {
      en: "Category-led supply conversations across beauty, lifestyle, wines, spirits, and premium goods.",
      es: "Conversaciones de suministro por categoria en belleza, lifestyle, vinos, licores y productos premium.",
    },
  },
];

export function WhyChooseUs({ compact = false }: { compact?: boolean }) {
  const { t } = useLanguage();

  return (
    <section className={`${compact ? "py-14" : "py-20"} bg-slate-50 text-[#071321]`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-stretch gap-8 lg:grid-cols-12">
          <div className="flex flex-col justify-between rounded-[8px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:col-span-7">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#00A884]/20 bg-[#00A884]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#00A884]">
                <Sparkles className="h-3.5 w-3.5" />
                <span>{t("Why Worldwide Supply 28 SL", "Por que Worldwide Supply 28 SL")}</span>
              </div>

              <h2 className="mt-5 max-w-3xl text-3xl font-semibold leading-tight tracking-normal text-[#071321] sm:text-5xl">
                {t("Reliable wholesale support for serious international buyers", "Soporte mayorista fiable para compradores internacionales")}
              </h2>

              <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
                {t(
                  "We combine sector relationships, category knowledge, and logistics coordination from Valencia, Spain to support retailers, duty-free operators, distributors, and strategic partners.",
                  "Combinamos relaciones sectoriales, conocimiento de categoria y coordinacion logistica desde Valencia, Espana para apoyar a minoristas, operadores duty-free, distribuidores y socios estrategicos."
                )}
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="border-t border-slate-200 pt-4">
                <p className="text-3xl font-semibold text-[#00A884]">{siteData.company.highlights.yearsExperience}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-500">
                  {t("Industry experience", "Experiencia sectorial")}
                </p>
              </div>
              <div className="border-t border-slate-200 pt-4">
                <p className="text-3xl font-semibold text-[#071321]">{siteData.company.highlights.countriesServed}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-500">
                  {t("Markets supported", "Mercados atendidos")}
                </p>
              </div>
              <div className="border-t border-slate-200 pt-4">
                <p className="text-2xl font-semibold text-[#071321]">{siteData.company.cif}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-500">
                  {t("Spanish CIF", "CIF espanol")}
                </p>
              </div>
            </div>
          </div>

          <div className="relative min-h-[340px] overflow-hidden rounded-[8px] border border-slate-200 bg-[#071321] shadow-sm lg:col-span-5">
            <Image
              src="/images/client-supplied/why-us-luxury.jpg"
              alt="Worldwide Supply 28 SL wholesale and logistics operations"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071321]/80 via-[#071321]/25 to-transparent" aria-hidden="true" />
            <div className="relative z-10 flex h-full min-h-[340px] flex-col justify-between p-6 text-white sm:p-8">
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/92 px-3.5 py-1.5 text-xs font-bold text-[#071321]">
                  <ShieldCheck className="h-4 w-4 text-[#00A884]" />
                  CIF verified
                </span>
                <Globe2 className="h-6 w-6 text-white/75" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#8CE6D1]">
                  {t("Valencia-based B2B partner", "Socio B2B desde Valencia")}
                </p>
                <h3 className="mt-3 text-2xl font-semibold leading-tight text-white sm:text-3xl">
                  {t("Built for repeat supply, not one-off transactions", "Preparados para suministro recurrente, no operaciones aisladas")}
                </h3>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {capabilityCards.map((card) => {
            const Icon = card.icon;
            return (
              <article key={card.label} className="rounded-[8px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#00A884]/60 hover:shadow-md">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#00A884]/10 text-[#00A884]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{card.label}</span>
                </div>
                <h3 className="mt-6 text-xl font-semibold leading-tight text-[#071321]">
                  {t(card.title.en, card.title.es)}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {t(card.copy.en, card.copy.es)}
                </p>
              </article>
            );
          })}
        </div>

        <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-[8px] border border-[#00A884]/25 bg-[#071321] p-6 text-white sm:flex-row sm:items-center">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#00A884]">
              <BadgeCheck className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">
                {t("Ready to discuss a wholesale requirement?", "Listo para hablar de una necesidad mayorista?")}
              </h3>
              <p className="mt-1 text-sm leading-6 text-white/74">
                {t("Share your category, market, and volume requirements with our Valencia team.", "Comparta su categoria, mercado y volumen con nuestro equipo en Valencia.")}
              </p>
            </div>
          </div>
          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#071321] transition hover:bg-[#00A884] hover:text-white"
          >
            <span>{t("Start Inquiry", "Iniciar consulta")}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
