"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { siteData } from "@/data/siteData";
import { Eye, MapPin, Sparkles, Target } from "lucide-react";
import { getWpMedia } from "@/lib/wp-media";
import { useSiteSettings } from "@/context/SiteSettingsContext";

export function AboutStorySection() {
  const { t } = useLanguage();
  const { settings } = useSiteSettings();

  const founders = [
    {
      name: settings.founders.siddharth.name || "Siddharth Thakker",
      role: {
        en: settings.founders.siddharth.role || "Co-Founder & Director",
        es: "Cofundador y Director"
      },
      image: settings.founders.siddharth.image || getWpMedia("/images/team/siddharth-thakker.jpg"),
      alt: "Siddharth Thakker Co-Founder and Director Worldwide Supply 28 SL",
    },
    {
      name: settings.founders.sakina.name || "Sakina Idmouhine",
      role: {
        en: settings.founders.sakina.role || "Co-Founder & Director",
        es: "Cofundadora y Directora"
      },
      image: settings.founders.sakina.image || getWpMedia("/images/team/sakina-idmouhine.jpg"),
      alt: "Sakina Idmouhine Co-Founder and Director Worldwide Supply 28 SL",
    },
  ];

  return (
    <section className="bg-white py-14 text-[#071321] sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00A884]/20 bg-[#00A884]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#00A884]">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{t("Executive Leadership", "Liderazgo Ejecutivo")}</span>
          </div>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[#071321] sm:text-5xl">
            {t("Meet Our Founders & Directors", "Conozca a Nuestros Fundadores y Directores")}
          </h2>
          <p className="mt-4 text-base text-slate-600 sm:text-lg">
            {t(
              "Complementary expertise in luxury wholesale, duty-free distribution, perfumery, cosmetics, and logistics.",
              "Experiencia complementaria en mayorista de lujo, distribucion duty-free, perfumeria, cosmetica y logistica."
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {founders.map((founder) => (
            <article
              key={founder.name}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#00A884] hover:shadow-xl sm:p-8"
            >
              <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left">
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border-2 border-[#00A884] bg-slate-100 shadow-md">
                  <Image
                    src={founder.image}
                    alt={founder.alt}
                    fill
                    sizes="96px"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="min-w-0">
                  <span className="inline-block rounded-full bg-[#00A884]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#00A884]">
                    {t(founder.role.en, founder.role.es)}
                  </span>
                  <h3 className="mt-3 text-2xl font-semibold text-[#071321] sm:text-3xl">
                    {founder.name}
                  </h3>
                  <p className="mt-2 flex items-center justify-center gap-1 text-xs font-semibold text-slate-500 sm:justify-start">
                    <MapPin className="h-3.5 w-3.5 text-[#00A884]" />
                    Valencia, Spain
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Shared Culture & Vision Card on Light Background */}
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 sm:p-12 mb-20 shadow-sm relative overflow-hidden">
          <div className="max-w-4xl space-y-4 relative z-10">
            <span className="text-xs font-bold text-[#00A884] uppercase tracking-wider block">
              {t("Shared Philosophy & Culture", "Filosofía y Cultura Compartida")}
            </span>
            <p className="text-base sm:text-xl font-semibold leading-relaxed text-[#071321]">
              &quot;{t(siteData.about.story.together.en, siteData.about.story.together.es)}&quot;
            </p>
            <p className="text-xs sm:text-sm font-bold text-[#00A884] pt-2">
              {t(siteData.about.story.familySpirit.en, siteData.about.story.familySpirit.es)}
            </p>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-[#00A884] sm:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#00A884]/10 text-[#00A884]">
              <Target className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-2xl font-bold text-[#071321]">
              {t(siteData.about.missionVision.mission.title.en, siteData.about.missionVision.mission.title.es)}
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              {t(siteData.about.missionVision.mission.desc.en, siteData.about.missionVision.mission.desc.es)}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-[#00A884] sm:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#071321] text-white">
              <Eye className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-2xl font-bold text-[#071321]">
              {t(siteData.about.missionVision.vision.title.en, siteData.about.missionVision.vision.title.es)}
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              {t(siteData.about.missionVision.vision.desc.en, siteData.about.missionVision.vision.desc.es)}
            </p>
          </div>
        </div>

        <div className="mt-12">
          <div className="mx-auto mb-8 max-w-2xl text-center">
            <h3 className="text-3xl font-semibold text-[#071321]">
              {t("Our Core Values", "Nuestros Valores Fundamentales")}
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {siteData.about.coreValues.map((val, idx) => (
              <div
                key={val.title.en}
                className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm transition hover:border-[#00A884] hover:shadow-md"
              >
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#00A884]/10 text-sm font-bold text-[#00A884]">
                  0{idx + 1}
                </div>
                <h4 className="mt-4 text-base font-bold text-[#071321]">
                  {t(val.title.en, val.title.es)}
                </h4>
                <p className="mt-2 text-xs leading-6 text-slate-600">
                  {t(val.desc.en, val.desc.es)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
