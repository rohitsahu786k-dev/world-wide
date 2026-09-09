import { getWpMedia } from "./wp-media";

export interface WpSiteSettings {
  company: {
    name: string;
    cif: string;
    tagline: string;
    subtagline: string;
  };
  contact: {
    phone: string;
    whatsapp: string;
    whatsapp_secondary: string;
    email: string;
    address: string;
    city: string;
    country: string;
    hours: string;
  };
  logos: {
    header_logo: string;
    footer_logo: string;
    transparent_logo: string;
    favicon: string;
  };
  hero: {
    badge: string;
    title: string;
    stat_exp: string;
    stat_countries: string;
    desktop_banners: string[];
    mobile_banners: string[];
  };
  founders: {
    siddharth: {
      name: string;
      role: string;
      bio: string;
      image: string;
    };
    sakina: {
      name: string;
      role: string;
      bio: string;
      image: string;
    };
  };
  about_images: {
    hero_banner: string;
    distribution: string;
    luxury: string;
    warehouse: string;
    why_choose_us: string;
  };
  category_images: {
    perfumes: string;
    niche: string;
    cosmetics: string;
    wines: string;
    travel_sets: string;
    fashion: string;
  };
}

export const defaultSiteSettings: WpSiteSettings = {
  company: {
    name: "WORLDWIDE SUPPLY 28 SL",
    cif: "B26703769",
    tagline: "CONNECTING MARKETS, DELIVERING EXCELLENCE",
    subtagline: "Your trusted partner in luxury perfumery, cosmetics, lifestyle products and more, with reliable supply solutions worldwide.",
  },
  contact: {
    phone: "+34 614850570",
    whatsapp: "+34 614850570",
    whatsapp_secondary: "+34 614655587",
    email: "info@worldwidesupply28.com",
    address: "Calle Carlos Cervera, 14, Bajo, 46006, Valencia, Spain",
    city: "Valencia",
    country: "Spain",
    hours: "Office hours: Monday – Friday, 9:00 – 17:00 (CET). WhatsApp support available 24/7.",
  },
  logos: {
    header_logo: getWpMedia("/world-wide-logo.png"),
    footer_logo: getWpMedia("/worldwide-supply-28-logo.jpeg"),
    transparent_logo: getWpMedia("/worldwide-supply-28-logo-transparent.png"),
    favicon: getWpMedia("/favicon.ico"),
  },
  hero: {
    badge: "Global Luxury Supply",
    title: "Luxury Goods Distribution Across Global Gateways",
    stat_exp: "15+",
    stat_countries: "50+",
    desktop_banners: [
      getWpMedia("/banner-img/worldwide-supply-28-sl/desktop/worldwide-supply-28-sl-luxury-products-banner-desktop-01.png"),
      getWpMedia("/banner-img/worldwide-supply-28-sl/desktop/worldwide-supply-28-sl-premium-lifestyle-banner-desktop-02.png"),
      getWpMedia("/banner-img/worldwide-supply-28-sl/desktop/worldwide-supply-28-sl-wholesale-banner-desktop-03.png"),
    ],
    mobile_banners: [
      getWpMedia("/banner-img/worldwide-supply-28-sl/mobile/worldwide-supply-28-sl-luxury-products-banner-mobile-01.png"),
      getWpMedia("/banner-img/worldwide-supply-28-sl/mobile/worldwide-supply-28-sl-premium-collection-banner-mobile-02.png"),
      getWpMedia("/banner-img/worldwide-supply-28-sl/mobile/worldwide-supply-28-sl-wholesale-lifestyle-banner-mobile-03.png"),
    ],
  },
  founders: {
    siddharth: {
      name: "Siddharth Thakker",
      role: "Co-Founder & Managing Partner",
      bio: "Siddharth Thakker grew up surrounded by the world of duty-free and wholesale trade, as part of a family business with deep roots in the wholesale and retail distribution sector.",
      image: getWpMedia("/images/team/siddharth-thakker.jpg"),
    },
    sakina: {
      name: "Sakina Idmouhine",
      role: "Co-Founder & Managing Partner",
      bio: "Sakina Idmouhine built her career within the perfumery and luxury cosmetics industry, spending over 15 years mastering the details that make this sector unique, from brand relationships to the expectations of international retailers and distributors.",
      image: getWpMedia("/images/team/sakina-idmouhine.jpg"),
    },
  },
  about_images: {
    hero_banner: getWpMedia("/images/heroes/hero-about.jpg"),
    distribution: getWpMedia("/images/about/about-intro-distribution.jpg"),
    luxury: getWpMedia("/images/about/about-intro-luxury.jpg"),
    warehouse: getWpMedia("/images/about/about-intro-warehouse.jpg"),
    why_choose_us: getWpMedia("/images/heroes/hero-why-choose-us-banner-1.png"),
  },
  category_images: {
    perfumes: getWpMedia("/images/categories/perfumes-fragrances.jpg"),
    niche: getWpMedia("/images/categories/niche-fragrances.jpg"),
    cosmetics: getWpMedia("/images/categories/cosmetics-skincare.jpg"),
    wines: getWpMedia("/images/categories/wines-spirits.jpg"),
    travel_sets: getWpMedia("/images/categories/travel-sets-airport-kit.png"),
    fashion: getWpMedia("/images/categories/fashion-textiles.jpg"),
  },
};

const WP_SETTINGS_API = "https://aquamarine-herring-353942.hostingersite.com/wp-json/worldwide/v1/settings";

/**
 * Fetch dynamic ACF site settings from WordPress with robust fallback
 */
export async function getWpSiteSettings(): Promise<WpSiteSettings> {
  try {
    const res = await fetch(WP_SETTINGS_API, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return defaultSiteSettings;
    }

    const data = await res.json();
    return {
      company: {
        name: data.company?.name || defaultSiteSettings.company.name,
        cif: data.company?.cif || defaultSiteSettings.company.cif,
        tagline: data.company?.tagline || defaultSiteSettings.company.tagline,
        subtagline: data.company?.subtagline || defaultSiteSettings.company.subtagline,
      },
      contact: {
        phone: data.contact?.phone || defaultSiteSettings.contact.phone,
        whatsapp: data.contact?.whatsapp || defaultSiteSettings.contact.whatsapp,
        whatsapp_secondary: data.contact?.whatsapp_secondary || defaultSiteSettings.contact.whatsapp_secondary,
        email: data.contact?.email || defaultSiteSettings.contact.email,
        address: data.contact?.address || defaultSiteSettings.contact.address,
        city: data.contact?.city || defaultSiteSettings.contact.city,
        country: data.contact?.country || defaultSiteSettings.contact.country,
        hours: data.contact?.hours || defaultSiteSettings.contact.hours,
      },
      logos: {
        header_logo: data.logos?.header_logo || defaultSiteSettings.logos.header_logo,
        footer_logo: data.logos?.footer_logo || defaultSiteSettings.logos.footer_logo,
        transparent_logo: data.logos?.transparent_logo || defaultSiteSettings.logos.transparent_logo,
        favicon: data.logos?.favicon || defaultSiteSettings.logos.favicon,
      },
      hero: {
        badge: data.hero?.badge || defaultSiteSettings.hero.badge,
        title: data.hero?.title || defaultSiteSettings.hero.title,
        stat_exp: data.hero?.stat_exp || defaultSiteSettings.hero.stat_exp,
        stat_countries: data.hero?.stat_countries || defaultSiteSettings.hero.stat_countries,
        desktop_banners: data.hero?.desktop_banners?.length
          ? data.hero.desktop_banners
          : defaultSiteSettings.hero.desktop_banners,
        mobile_banners: data.hero?.mobile_banners?.length
          ? data.hero.mobile_banners
          : defaultSiteSettings.hero.mobile_banners,
      },
      founders: {
        siddharth: {
          name: data.founders?.siddharth?.name || defaultSiteSettings.founders.siddharth.name,
          role: data.founders?.siddharth?.role || defaultSiteSettings.founders.siddharth.role,
          bio: data.founders?.siddharth?.bio || defaultSiteSettings.founders.siddharth.bio,
          image: data.founders?.siddharth?.image || defaultSiteSettings.founders.siddharth.image,
        },
        sakina: {
          name: data.founders?.sakina?.name || defaultSiteSettings.founders.sakina.name,
          role: data.founders?.sakina?.role || defaultSiteSettings.founders.sakina.role,
          bio: data.founders?.sakina?.bio || defaultSiteSettings.founders.sakina.bio,
          image: data.founders?.sakina?.image || defaultSiteSettings.founders.sakina.image,
        },
      },
      about_images: {
        hero_banner: data.about_images?.hero_banner || defaultSiteSettings.about_images.hero_banner,
        distribution: data.about_images?.distribution || defaultSiteSettings.about_images.distribution,
        luxury: data.about_images?.luxury || defaultSiteSettings.about_images.luxury,
        warehouse: data.about_images?.warehouse || defaultSiteSettings.about_images.warehouse,
        why_choose_us: data.about_images?.why_choose_us || defaultSiteSettings.about_images.why_choose_us,
      },
      category_images: {
        perfumes: data.category_images?.perfumes || defaultSiteSettings.category_images.perfumes,
        niche: data.category_images?.niche || defaultSiteSettings.category_images.niche,
        cosmetics: data.category_images?.cosmetics || defaultSiteSettings.category_images.cosmetics,
        wines: data.category_images?.wines || defaultSiteSettings.category_images.wines,
        travel_sets: data.category_images?.travel_sets || defaultSiteSettings.category_images.travel_sets,
        fashion: data.category_images?.fashion || defaultSiteSettings.category_images.fashion,
      },
    };
  } catch {
    return defaultSiteSettings;
  }
}
