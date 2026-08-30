"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useLanguage } from "@/context/LanguageContext";
import { siteData } from "@/data/siteData";
import { Truck, Ship, Plane, Globe, ArrowRight, Sparkles } from "lucide-react";

// Dynamic import with SSR disabled for Vercel deployment compatibility
const WorldMap = dynamic(
  () => import("@/components/ui/WorldMap").then((mod) => mod.WorldMap),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[380px] rounded-3xl bg-slate-100 flex items-center justify-center text-slate-400 text-xs font-semibold">
        Loading interactive map...
      </div>
    )
  }
);

export function LogisticsTargetMarkets({ compact = false }: { compact?: boolean }) {
  const { t } = useLanguage();

  const transportModes = [
    {
      title: { en: "Road Freight", es: "Transporte por Carretera" },
      desc: { en: "Pan-European express & temperature-controlled trucking fleets.", es: "Flotas de camiones con control de temperatura y servicio exprés paneuropeo." },
      image: "/images/logistics/road-freight.jpg",
      icon: Truck
    },
    {
      title: { en: "Sea Freight", es: "Transporte Marítimo" },
      desc: { en: "FCL & LCL containerized global shipping lines.", es: "Líneas de transporte marítimo global en contenedores FCL y LCL." },
      image: "/images/logistics/sea-freight.jpg",
      icon: Ship
    },
    {
      title: { en: "Air Freight", es: "Transporte Aéreo" },
      desc: { en: "Priority express air cargo for high-value luxury goods.", es: "Carga aérea exprés prioritaria para mercancías de lujo de gran valor." },
      image: "/images/logistics/air-freight.jpg",
      icon: Plane
    },
    {
      title: { en: "Global Network", es: "Red Global" },
      desc: { en: "Seamless cross-border customs & bonded warehouse distribution.", es: "Aduanas transfronterizas fluidas y distribución en almacén franco." },
      image: "/images/logistics/global-network.jpg",
      icon: Globe
    }
  ];

  // Valencia Trade Connection Routes for Interactive World Map
  const valenciaTradeRoutes = [
    {
      start: { lat: 39.4699, lng: -0.3763, label: "Valencia" }, // HQ Valencia, Spain
      end: { lat: 50.1109, lng: 8.6821, label: "Europe" }
    },
    {
      start: { lat: 39.4699, lng: -0.3763, label: "Valencia" },
      end: { lat: 25.2048, lng: 55.2708, label: "Middle East (Dubai)" }
    },
    {
      start: { lat: 39.4699, lng: -0.3763, label: "Valencia" },
      end: { lat: 45.4215, lng: -75.6972, label: "North America" }
    },
    {
      start: { lat: 39.4699, lng: -0.3763, label: "Valencia" },
      end: { lat: -23.5505, lng: -46.6333, label: "South America" }
    },
    {
      start: { lat: 39.4699, lng: -0.3763, label: "Valencia" },
      end: { lat: 1.3521, lng: 103.8198, label: "Asia (Singapore)" }
    },
    {
      start: { lat: 39.4699, lng: -0.3763, label: "Valencia" },
      end: { lat: -1.2921, lng: 36.8219, label: "Africa (Nairobi)" }
    },
    {
      start: { lat: 39.4699, lng: -0.3763, label: "Valencia" },
      end: { lat: -33.8688, lng: 151.2093, label: "Australia" }
    }
  ];

  return (
    <section className={`${compact ? "py-16" : "py-24"} bg-white text-[#071321]`}>
      <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${compact ? "space-y-12" : "space-y-20"}`}>
        {/* Logistics Capabilities Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-block rounded-full bg-[#00A884]/10 border border-[#00A884]/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#00A884]">
            {t("Global Freight & Supply Chain", "Flete Global y Cadena de Suministro")}
          </span>
          <h2 className="text-3xl font-semibold sm:text-5xl tracking-tight text-[#071321]">
            {t("Logistics & Transport Modes", "Modos de Logística y Transporte")}
          </h2>
          <p className="text-base text-slate-600">
            {t(
              "Operating out of Valencia, Spain, a prime Mediterranean trade gateway, we coordinate seamless cross-border freight.",
              "Operando desde Valencia, España, una puerta comercial clave en el Mediterráneo, coordinamos fletes transfronterizos sin problemas."
            )}
          </p>
        </div>

        {/* 4 Realistic Transport Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {transportModes.map((mode, idx) => {
            const Icon = mode.icon;
            return (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:border-[#00A884] flex flex-col justify-between h-[360px]"
              >
                {/* Image Frame */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={mode.image}
                    alt={mode.title.en}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105 filter saturate-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071321] via-[#071321]/60 to-transparent" />
                </div>

                {/* Top Badge */}
                <div className="relative z-10 p-5 flex justify-between items-center">
                  <div className="h-10 w-10 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center text-[#00A884] shadow-sm">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="rounded-full bg-[#071321]/80 backdrop-blur-md px-3 py-1 text-[10px] font-bold text-white uppercase tracking-wider border border-white/10">
                    Mode 0{idx + 1}
                  </span>
                </div>

                {/* Content Area */}
                <div className="relative z-10 p-6 space-y-2 text-white">
                  <h3 className="text-xl font-semibold text-white group-hover:text-[#00A884] transition">
                    {t(mode.title.en, mode.title.es)}
                  </h3>
                  <p className="text-xs text-white/80 leading-relaxed">
                    {t(mode.desc.en, mode.desc.es)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Single Unified Merged Card Container on Pure White Background */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-sm space-y-10">
          {/* Header Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#00A884]/10 border border-[#00A884]/20 px-3.5 py-1 text-[11px] font-bold text-[#00A884] uppercase tracking-wider">
                <Sparkles className="h-3.5 w-3.5" />
                <span>{t("Global Distribution Network", "Red de Distribución Global")}</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-semibold text-[#071321] tracking-tight">
                {t("Target Markets & Distribution Routes", "Mercados Objetivo y Rutas de Distribución")}
              </h3>
              <p className="text-sm sm:text-base text-[#071321] leading-relaxed">
                {t(
                  "Emanating from our trade hub in Valencia, Spain, connecting Europe, Middle East, North America, South America, Asia, Africa, and Australia.",
                  "Desde nuestra sede comercial en Valencia, España, conectando Europa, Oriente Medio, Norteamérica, Sudamérica, Asia, África y Australia."
                )}
              </p>

              {/* Regional Badges */}
              <div className="flex flex-wrap gap-2 pt-2">
                {siteData.logistics.targetMarkets.map((reg) => (
                  <span
                    key={reg}
                    className="rounded-full bg-slate-100 border border-slate-200 px-4 py-1.5 text-xs font-semibold text-slate-800"
                  >
                    {reg}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 text-left lg:text-right space-y-3">
              <div>
                <span className="text-4xl sm:text-5xl font-semibold text-[#00A884]">50+</span>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {t("Global Destinations Serviced", "Destinos Globales Atendidos")}
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#00A884] transition shadow-md"
              >
                <span>{t("Check Shipping Routes", "Consultar Rutas de Envío")}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Merged Light World Map Canvas */}
          <div className="pt-2">
            <WorldMap dots={valenciaTradeRoutes} lineColor="#00A884" theme="light" />
          </div>
        </div>
      </div>
    </section>
  );
}
