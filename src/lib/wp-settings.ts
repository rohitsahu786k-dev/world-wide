import { getWpMedia } from "./wp-media";
import { siteData } from "@/data/siteData";

// The primary env vars carry the WhatsApp line, the secondary ones the mobile
// line — the names predate that split. `phone` is the mobile line, so it reads
// the secondary chain.
const SUPPORT_PHONE =
  process.env.NEXT_PUBLIC_SUPPORT_PHONE_SECONDARY_DISPLAY ||
  process.env.NEXT_PUBLIC_SUPPORT_PHONE_SECONDARY ||
  "+34 614655587";

const SUPPORT_WHATSAPP =
  process.env.NEXT_PUBLIC_SUPPORT_PHONE_DISPLAY ||
  process.env.NEXT_PUBLIC_SUPPORT_PHONE ||
  (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
    ? `+${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER.replace(/^\+/, "")}`
    : "+34 614850570");

const SUPPORT_WHATSAPP_SECONDARY =
  process.env.NEXT_PUBLIC_SUPPORT_PHONE_SECONDARY_DISPLAY ||
  process.env.NEXT_PUBLIC_SUPPORT_PHONE_SECONDARY ||
  process.env.NEXT_PUBLIC_WHATSAPP_SECONDARY ||
  "+34 614655587";

const HERO_DESKTOP_BANNERS = [
  "/banner-img/worldwide-supply-28-sl/desktop/worldwide-supply-28-sl-luxury-showcase-banner-desktop-04.png",
  "/banner-img/worldwide-supply-28-sl/desktop/worldwide-supply-28-sl-premium-lifestyle-banner-desktop-02.png",
  "/banner-img/worldwide-supply-28-sl/desktop/worldwide-supply-28-sl-luxury-products-banner-desktop-01.png",
  "/banner-img/worldwide-supply-28-sl/desktop/worldwide-supply-28-sl-wholesale-banner-desktop-03.png",
];

const HERO_MOBILE_BANNERS = [
  "/banner-img/worldwide-supply-28-sl/mobile/worldwide-supply-28-sl-luxury-showcase-banner-mobile-04.png",
  "/banner-img/worldwide-supply-28-sl/mobile/worldwide-supply-28-sl-premium-collection-banner-mobile-02.png",
  "/banner-img/worldwide-supply-28-sl/mobile/worldwide-supply-28-sl-luxury-products-banner-mobile-01.png",
  "/banner-img/worldwide-supply-28-sl/mobile/worldwide-supply-28-sl-wholesale-lifestyle-banner-mobile-03.png",
];

/** Every visitor-facing string exists in both site languages. */
export interface BilingualText {
  en: string;
  es: string;
}

/**
 * One "Product Sectors" card. Authored in WordPress as a `product_sector` post
 * (ACF: background image, Spanish name, badge, description, link, order).
 */
export interface ProductSector {
  id: string;
  name: BilingualText;
  badge: BilingualText;
  description: BilingualText;
  image: string;
  link: string;
  order: number;
}

/** About Us copy, authored on the WordPress "Site Settings" page. */
export interface AboutContent {
  overview: BilingualText;
  story: {
    title: BilingualText;
    intro: BilingualText;
    together: BilingualText;
    family: BilingualText;
  };
  mission: { title: BilingualText; desc: BilingualText };
  vision: { title: BilingualText; desc: BilingualText };
  core_values: Array<{ title: BilingualText; desc: BilingualText }>;
}

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
  product_sectors: ProductSector[];
  about_content: AboutContent;
}

export const defaultSiteSettings: WpSiteSettings = {
  company: {
    name: "WORLDWIDE SUPPLY 28 SL",
    cif: "B26703769",
    tagline: "CONNECTING MARKETS, DELIVERING EXCELLENCE",
    subtagline: "Your trusted partner in luxury perfumery, cosmetics, lifestyle products and more, with reliable supply solutions worldwide.",
  },
  contact: {
    phone: SUPPORT_PHONE,
    whatsapp: SUPPORT_WHATSAPP,
    whatsapp_secondary: SUPPORT_WHATSAPP_SECONDARY,
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
    desktop_banners: HERO_DESKTOP_BANNERS,
    mobile_banners: HERO_MOBILE_BANNERS,
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
  // Fallbacks only — the live cards come from the WordPress `product_sector`
  // post type, so an editor can add, reorder or retire one without a deploy.
  product_sectors: siteData.categories.map((category, index) => ({
    id: category.id,
    name: category.name,
    badge: category.badge,
    description: category.description,
    image: category.image,
    link: "/contact",
    order: (index + 1) * 10,
  })),
  about_content: {
    overview: siteData.about.overview,
    story: {
      title: siteData.about.story.title,
      intro: siteData.about.story.p1,
      together: siteData.about.story.together,
      family: siteData.about.story.familySpirit,
    },
    mission: {
      title: siteData.about.missionVision.mission.title,
      desc: siteData.about.missionVision.mission.desc,
    },
    vision: {
      title: siteData.about.missionVision.vision.title,
      desc: siteData.about.missionVision.vision.desc,
    },
    core_values: siteData.about.coreValues.map((value) => ({
      title: value.title,
      desc: value.desc,
    })),
  },
};

const WP_ORIGIN = (process.env.NEXT_PUBLIC_WP_BASE_URL || "").replace(/\/+$/, "");
const WP_SETTINGS_API = `${WP_ORIGIN}/wp-json/worldwide/v1/settings`;

/**
 * Budget for a build-time call to WordPress. Static generation aborts a page
 * that takes over 60s, so an unreachable or throttled backend must fail fast
 * and fall back to the defaults rather than take the whole build down with it.
 * The browser refetches on load anyway, so a missed build-time read is only a
 * stale first paint, never missing content.
 */
const WP_FETCH_TIMEOUT_MS = 8000;

type Loose = Record<string, any>;

/**
 * A bilingual pair from WordPress, with the Spanish side falling back to the
 * English one so a half-translated field never renders empty.
 */
function bilingual(value: Loose | undefined, fallback: BilingualText): BilingualText {
  const en = value?.en || fallback.en;
  return { en, es: value?.es || fallback.es || en };
}

/**
 * Normalises the `product_sectors` payload. Sectors without an image or a name
 * are dropped; if nothing usable survives we keep the baked-in defaults rather
 * than render an empty grid.
 */
export function normalizeProductSectors(
  raw: unknown,
  fallback: ProductSector[] = defaultSiteSettings.product_sectors
): ProductSector[] {
  if (!Array.isArray(raw)) return fallback;

  const sectors = raw
    .filter((sector: Loose) => sector?.image && (sector?.name?.en || sector?.name?.es))
    .map((sector: Loose, index: number) => ({
      id: String(sector.id || `sector-${index}`),
      name: bilingual(sector.name, { en: "", es: "" }),
      badge: bilingual(sector.badge, { en: "", es: "" }),
      description: bilingual(sector.description, { en: "", es: "" }),
      image: String(sector.image),
      link: sector.link || "/contact",
      order: Number(sector.order ?? (index + 1) * 10),
    }))
    .sort((a, b) => a.order - b.order);

  return sectors.length > 0 ? sectors : fallback;
}

/** Normalises the `about_content` payload, field by field, against defaults. */
export function normalizeAboutContent(
  raw: unknown,
  fallback: AboutContent = defaultSiteSettings.about_content
): AboutContent {
  const data = (raw || {}) as Loose;

  const values = Array.isArray(data.core_values)
    ? data.core_values
        .filter((value: Loose) => value?.title?.en || value?.title?.es)
        .map((value: Loose) => ({
          title: bilingual(value.title, { en: "", es: "" }),
          desc: bilingual(value.desc, { en: "", es: "" }),
        }))
    : [];

  return {
    overview: bilingual(data.overview, fallback.overview),
    story: {
      title: bilingual(data.story?.title, fallback.story.title),
      intro: bilingual(data.story?.intro, fallback.story.intro),
      together: bilingual(data.story?.together, fallback.story.together),
      family: bilingual(data.story?.family, fallback.story.family),
    },
    mission: {
      title: bilingual(data.mission?.title, fallback.mission.title),
      desc: bilingual(data.mission?.desc, fallback.mission.desc),
    },
    vision: {
      title: bilingual(data.vision?.title, fallback.vision.title),
      desc: bilingual(data.vision?.desc, fallback.vision.desc),
    },
    core_values: values.length > 0 ? values : fallback.core_values,
  };
}

/**
 * Fetch dynamic ACF site settings from WordPress with robust fallback
 */
export async function getWpSiteSettings(): Promise<WpSiteSettings> {
  // Without an origin the URL would be relative, which cannot be fetched from
  // the build. Skip straight to the defaults instead of throwing per page.
  if (!WP_ORIGIN) return defaultSiteSettings;

  try {
    const res = await fetch(WP_SETTINGS_API, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(WP_FETCH_TIMEOUT_MS),
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
        phone: SUPPORT_PHONE,
        whatsapp: SUPPORT_WHATSAPP,
        whatsapp_secondary: SUPPORT_WHATSAPP_SECONDARY || data.contact?.whatsapp_secondary || "",
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
        desktop_banners: defaultSiteSettings.hero.desktop_banners,
        mobile_banners: defaultSiteSettings.hero.mobile_banners,
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
      product_sectors: normalizeProductSectors(data.product_sectors),
      about_content: normalizeAboutContent(data.about_content),
    };
  } catch {
    return defaultSiteSettings;
  }
}
