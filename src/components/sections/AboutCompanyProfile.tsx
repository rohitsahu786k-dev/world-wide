"use client";

import { useLanguage } from "@/context/LanguageContext";
import { siteData } from "@/data/siteData";
import { Building2, FileText, Globe2, Handshake, ShieldCheck, Truck } from "lucide-react";

const highlights = [
  {
    icon: Globe2,
    title: { en: "Global Reach", es: "Alcance Global" },
    desc: {
      en: "Serving wholesale, luxury retail, and travel retail clients across Europe, Asia, the GCC, Africa, North America, South America, and Australia.",
      es: "Atendiendo a clientes mayoristas, retail de lujo y travel retail en Europa, Asia, GCC, Africa, Norteamerica, Sudamerica y Australia."
    }
  },
  {
    icon: Truck,
    title: { en: "Distribution Network", es: "Red de Distribucion" },
    desc: {
      en: "An established international network of freight forwarders supports reliable global delivery from origin to destination.",
      es: "Una red internacional establecida de transitarios apoya entregas globales fiables desde origen hasta destino."
    }
  },
  {
    icon: Handshake,
    title: { en: "Premium Relationships", es: "Relaciones Premium" },
    desc: {
      en: "Strong relationships with major groups including LVMH, PUIG, L'Oreal Luxe, COTY, P&G, and selected niche perfume houses.",
      es: "Relaciones solidas con grandes grupos como LVMH, PUIG, L'Oreal Luxe, COTY, P&G y casas de perfume nicho seleccionadas."
    }
  },
  {
    icon: ShieldCheck,
    title: { en: "Registered in Spain", es: "Registrada en Espana" },
    desc: {
      en: `Spanish registered company with Tax ID (CIF): ${siteData.company.cif}. Registration certificate available upon request.`,
      es: `Empresa registrada en Espana con Tax ID (CIF): ${siteData.company.cif}. Certificado de registro disponible bajo solicitud.`
    }
  }
];

export function AboutCompanyProfile() {
  const { t } = useLanguage();

  return (
    <section className="bg-white py-16 text-[#071321] sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00A884]/20 bg-[#00A884]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#00A884]">
              <Building2 className="h-3.5 w-3.5" />
              <span>{t("Business Information", "Informacion de Empresa")}</span>
            </div>
            <div className="space-y-4">
              <h1 className="text-3xl font-semibold tracking-tight text-[#071321] sm:text-5xl">
                {t("About Worldwide Supply 28 SL", "Sobre Worldwide Supply 28 SL")}
              </h1>
              <p className="text-base leading-8 text-slate-600 sm:text-lg">
                {t(siteData.about.overview.en, siteData.about.overview.es)}
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <FileText className="mb-4 h-6 w-6 text-[#00A884]" />
              <h2 className="text-lg font-semibold text-[#071321]">
                {t("Company Profile / Brochure", "Perfil de Empresa / Brochure")}
              </h2>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                {t(
                  "A downloadable company profile PDF can be prepared separately once final branding assets are ready.",
                  "Se puede preparar un perfil de empresa descargable en PDF una vez que los activos finales de marca esten listos."
                )}
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title.en} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-[#00A884] hover:shadow-md">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#00A884]/10 text-[#00A884]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#071321]">
                    {t(item.title.en, item.title.es)}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {t(item.desc.en, item.desc.es)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
