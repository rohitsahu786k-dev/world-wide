"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { WpSiteSettings, defaultSiteSettings } from "@/lib/wp-settings";

interface SiteSettingsContextValue {
  settings: WpSiteSettings;
  isLoading: boolean;
  refresh: () => Promise<void>;
}

const SiteSettingsContext = createContext<SiteSettingsContextValue>({
  settings: defaultSiteSettings,
  isLoading: false,
  refresh: async () => {},
});

export function SiteSettingsProvider({
  children,
  initialSettings,
}: {
  children: React.ReactNode;
  initialSettings?: WpSiteSettings;
}) {
  const [settings, setSettings] = useState<WpSiteSettings>(initialSettings || defaultSiteSettings);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSettings = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("https://aquamarine-herring-353942.hostingersite.com/wp-json/worldwide/v1/settings");
      if (res.ok) {
        const data = await res.json();
        setSettings((prev) => ({
          company: {
            name: data.company?.name || prev.company.name,
            cif: data.company?.cif || prev.company.cif,
            tagline: data.company?.tagline || prev.company.tagline,
            subtagline: data.company?.subtagline || prev.company.subtagline,
          },
          contact: {
            phone: data.contact?.phone || prev.contact.phone,
            whatsapp: data.contact?.whatsapp || prev.contact.whatsapp,
            whatsapp_secondary: data.contact?.whatsapp_secondary || prev.contact.whatsapp_secondary,
            email: data.contact?.email || prev.contact.email,
            address: data.contact?.address || prev.contact.address,
            city: data.contact?.city || prev.contact.city,
            country: data.contact?.country || prev.contact.country,
            hours: data.contact?.hours || prev.contact.hours,
          },
          logos: {
            header_logo: data.logos?.header_logo || prev.logos.header_logo,
            footer_logo: data.logos?.footer_logo || prev.logos.footer_logo,
            transparent_logo: data.logos?.transparent_logo || prev.logos.transparent_logo,
            favicon: data.logos?.favicon || prev.logos.favicon,
          },
          hero: {
            badge: data.hero?.badge || prev.hero.badge,
            title: data.hero?.title || prev.hero.title,
            stat_exp: data.hero?.stat_exp || prev.hero.stat_exp,
            stat_countries: data.hero?.stat_countries || prev.hero.stat_countries,
            desktop_banners: data.hero?.desktop_banners?.length ? data.hero.desktop_banners : prev.hero.desktop_banners,
            mobile_banners: data.hero?.mobile_banners?.length ? data.hero.mobile_banners : prev.hero.mobile_banners,
          },
          founders: {
            siddharth: {
              name: data.founders?.siddharth?.name || prev.founders.siddharth.name,
              role: data.founders?.siddharth?.role || prev.founders.siddharth.role,
              bio: data.founders?.siddharth?.bio || prev.founders.siddharth.bio,
              image: data.founders?.siddharth?.image || prev.founders.siddharth.image,
            },
            sakina: {
              name: data.founders?.sakina?.name || prev.founders.sakina.name,
              role: data.founders?.sakina?.role || prev.founders.sakina.role,
              bio: data.founders?.sakina?.bio || prev.founders.sakina.bio,
              image: data.founders?.sakina?.image || prev.founders.sakina.image,
            },
          },
          about_images: {
            hero_banner: data.about_images?.hero_banner || prev.about_images.hero_banner,
            distribution: data.about_images?.distribution || prev.about_images.distribution,
            luxury: data.about_images?.luxury || prev.about_images.luxury,
            warehouse: data.about_images?.warehouse || prev.about_images.warehouse,
            why_choose_us: data.about_images?.why_choose_us || prev.about_images.why_choose_us,
          },
          category_images: {
            perfumes: data.category_images?.perfumes || prev.category_images.perfumes,
            niche: data.category_images?.niche || prev.category_images.niche,
            cosmetics: data.category_images?.cosmetics || prev.category_images.cosmetics,
            wines: data.category_images?.wines || prev.category_images.wines,
            travel_sets: data.category_images?.travel_sets || prev.category_images.travel_sets,
            fashion: data.category_images?.fashion || prev.category_images.fashion,
          },
        }));
      }
    } catch (err) {
      console.warn("Could not fetch ACF site settings from WordPress:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <SiteSettingsContext.Provider value={{ settings, isLoading, refresh: fetchSettings }}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext);
}
