export interface CategoryItem {
  id: string;
  name: { en: string; es: string };
  description: { en: string; es: string };
  image: string;
  badge: { en: string; es: string };
}

export interface ServiceItem {
  id: string;
  title: { en: string; es: string };
  shortDesc: { en: string; es: string };
  fullDesc: { en: string; es: string };
  iconName: string;
}

export const siteData = {
  company: {
    name: "WORLDWIDE SUPPLY 28 SL",
    shortName: "Worldwide Supply 28",
    cif: "B26703769",
    tagline: {
      en: "CONNECTING MARKETS, DELIVERING EXCELLENCE",
      es: "CONECTANDO MERCADOS, ENTREGANDO EXCELENCIA"
    },
    subTagline: {
      en: "Your trusted partner in luxury perfumery, cosmetics, lifestyle products and more, with reliable supply solutions worldwide.",
      es: "Su socio de confianza en perfumería de lujo, cosmética, productos de estilo de vida y más, con soluciones de suministro fiables en todo el mundo."
    },
    location: {
      city: "Valencia",
      country: "Spain",
      address: "Calle Carlos Cervera, 14, Bajo, 46006, Valencia, Spain",
      badge: {
        en: "VALENCIA, SPAIN – Our Home, Our Inspiration",
        es: "VALENCIA, ESPAÑA – Nuestro Hogar, Nuestra Inspiración"
      }
    },
    contact: {
      phone: "+34 614 85 05 70",
      whatsapp: "+34 614 655 587",
      whatsappText: "Available 24/7",
      email: "info@worldwidesupply28.com",
      website: "www.worldwidesupply28.com",
      hours: {
        en: "Office hours: Monday – Friday, 9:00 – 17:00 (CET). WhatsApp support available 24/7.",
        es: "Horario de oficina: Lunes – Viernes, 9:00 – 17:00 (CET). Soporte por WhatsApp 24/7."
      }
    },
    highlights: {
      yearsExperience: "15+",
      countriesServed: "50+",
      brandGroups: ["LVMH", "PUIG", "L’Oréal Luxe", "COTY", "P&G"]
    }
  },

  about: {
    overview: {
      en: "Worldwide Supply 28 SL, based in Spain, has over 15 years of experience in wholesale, luxury retail, and travel retail. We work with leading international retailers, duty frees, and distributors worldwide, supplying high-end perfumery, luxury cosmetics, skincare, and niche fragrances. We represent products from major groups such as LVMH, PUIG, L’Oréal Luxe, COTY, P&G, as well as selected niche perfume houses.",
      es: "Worldwide Supply 28 SL, con sede en España, cuenta con más de 15 años de experiencia en venta al por mayor, venta al por menor de lujo y travel retail. Trabajamos con minoristas internacionales líderes, tiendas libres de impuestos (duty free) y distribuidores en todo el mundo, suministrando perfumería de alta gama, cosmética de lujo, cuidado de la piel y fragancias de nicho. Representamos productos de grandes grupos como LVMH, PUIG, L’Oréal Luxe, COTY, P&G, así como casas de perfumes de nicho seleccionadas."
    },
    story: {
      title: { en: "Company History – Our Story", es: "Historia de la Empresa – Nuestra Historia" },
      p1: {
        en: "Worldwide Supply 28 SL was born from the shared vision of two partners whose paths in the luxury and wholesale industry were destined to meet.",
        es: "Worldwide Supply 28 SL nació de la visión compartida de dos socios cuyos caminos en la industria del lujo y del comercio al por mayor estaban destinados a encontrarse."
      },
      siddharth: {
        name: "Siddharth Thakker",
        role: { en: "Co-Founder & Managing Partner", es: "Cofundador y Socio Director" },
        bio: {
          en: "Siddharth Thakker grew up surrounded by the world of duty-free and wholesale trade, as part of a family business with deep roots in the wholesale and retail distribution sector. From an early age, he learned the value of strong supplier relationships, market instinct, and the discipline required to move goods reliably across borders.",
          es: "Siddharth Thakker creció rodeado del mundo del duty-free y el comercio al por mayor, como parte de una empresa familiar con profundas raíces en el sector de la distribución mayorista y minorista. Desde temprana edad, aprendió el valor de las relaciones sólidas con los proveedores, el instinto de mercado y la disciplina requerida para mover mercancías con fiabilidad a través de las fronteras."
        }
      },
      sakina: {
        name: "Sakina Idmouhine",
        role: { en: "Co-Founder & Managing Partner", es: "Cofundadora y Socia Directora" },
        bio: {
          en: "Sakina Idmouhine built her career within the perfumery and luxury cosmetics industry, spending over 15 years mastering the details that make this sector unique, from brand relationships to the expectations of international retailers and distributors.",
          es: "Sakina Idmouhine desarrolló su carrera dentro de la industria de la perfumería y cosmética de lujo, dedicando más de 15 años a dominar los detalles que hacen único a este sector, desde las relaciones con las marcas hasta las expectativas de minoristas y distribuidores internacionales."
        }
      },
      together: {
        en: "When their paths crossed, they quickly recognized that their backgrounds were not just compatible, but complementary: one side brought deep-rooted trade and logistics experience, the other brought sector-specific expertise and a strong network within the perfumery and cosmetics world. United by a shared passion for the industry and a mutual belief in doing business the right way with reliability, transparency, and long-term relationships, they founded Worldwide Supply 28 SL.",
        es: "Cuando sus caminos se cruzaron, reconocieron rápidamente que sus trayectorias no solo eran compatibles, sino complementarias: una parte aportaba una profunda experiencia en comercio y logística, y la otra aportaba conocimientos específicos del sector y una sólida red en el mundo de la perfumería y cosmética. Unidos por una pasión compartida y la convicción mutua de hacer negocios de forma correcta con fiabilidad, transparencia y relaciones a largo plazo, fundaron Worldwide Supply 28 SL."
      },
      familySpirit: {
        en: "More than business partners, Sakina and Siddharth work together like family, sharing the same drive, ambition, and hunger to keep growing. That spirit of togetherness and continuous growth is what defines Worldwide Supply 28 SL today.",
        es: "Más que socios comerciales, Sakina y Siddharth trabajan juntos como una familia, compartiendo el mismo impulso, ambición y deseo de seguir creciendo. Ese espíritu de unión y crecimiento continuo es lo que define a Worldwide Supply 28 SL hoy en día."
      }
    },

    missionVision: {
      mission: {
        title: { en: "Our Mission", es: "Nuestra Misión" },
        desc: {
          en: "To connect global brands with trusted retail, duty-free, and distribution partners worldwide, delivering premium perfumery, cosmetics, and lifestyle products with reliability, flexibility, and consistency at every stage of the supply chain.",
          es: "Conectar marcas globales con socios minoristas, duty-free y distribuidores de confianza en todo el mundo, entregando productos de perfumería, cosmética y estilo de vida de calidad superior con fiabilidad, flexibilidad y consistencia en cada etapa de la cadena de suministro."
        }
      },
      vision: {
        title: { en: "Our Vision", es: "Nuestra Visión" },
        desc: {
          en: "To become a leading international gateway for brands seeking to enter new markets, and for retailers and distributors seeking a dependable long-term sourcing partner in the luxury and premium goods sector.",
          es: "Convertirnos en un portal internacional líder para marcas que buscan ingresar a nuevos mercados, y para minoristas y distribuidores que buscan un socio de suministro a largo plazo fiable en el sector de productos de lujo y calidad superior."
        }
      }
    },

    coreValues: [
      {
        title: { en: "Reliability", es: "Fiabilidad" },
        desc: { en: "Consistent, dependable delivery for every client, every time.", es: "Entregas constantes y fiables para cada cliente, siempre." }
      },
      {
        title: { en: "Transparency", es: "Transparencia" },
        desc: { en: "Honest, long-term relationships with partners and clients.", es: "Relaciones honestas y duraderas con socios y clientes." }
      },
      {
        title: { en: "Flexibility", es: "Flexibilidad" },
        desc: { en: "Adapting to the needs of each market and client profile.", es: "Adaptación a las necesidades de cada mercado y perfil de cliente." }
      },
      {
        title: { en: "Growth Mindset", es: "Mentalidad de Crecimiento" },
        desc: { en: "Continuous drive to expand, improve, and innovate.", es: "Impulso continuo para expandirse, mejorar e innovar." }
      },
      {
        title: { en: "Family Spirit", es: "Espíritu Familiar" },
        desc: { en: "A close-knit team culture built on trust and shared ambition.", es: "Una cultura de equipo unida basada en la confianza y la ambición compartida." }
      }
    ]
  },

  categories: [
    {
      id: "perfumes-fragrances",
      name: { en: "Perfumes & Fragrances", es: "Perfumes y Fragancias" },
      description: {
        en: "High-end luxury perfumes from premier global fashion houses and prestige beauty groups.",
        es: "Perfumes de lujo de alta gama de las principales casas de moda y grupos de belleza prestige."
      },
      image: "/images/client-supplied/category-perfumes-fragrances.jpg",
      badge: { en: "Prestige Brands", es: "Marcas Prestige" }
    },
    {
      id: "niche-fragrances",
      name: { en: "Niche Fragrances", es: "Fragancias de Nicho" },
      description: {
        en: "Exclusive, artisanal perfumery collections crafted for discerning collectors and specialized boutiques.",
        es: "Colecciones de perfumería artesanal y exclusiva diseñadas para coleccionistas exigentes y boutiques especializadas."
      },
      image: "/images/client-supplied/category-niche-fragrances.jpg",
      badge: { en: "Artisanal & Niche", es: "Artesanal y Nicho" }
    },
    {
      id: "cosmetics-skincare",
      name: { en: "Luxury Cosmetics & Skincare", es: "Cosmética de Lujo y Cuidado de la Piel" },
      description: {
        en: "Premium skincare formulations, luxury color cosmetics, and advanced beauty treatments.",
        es: "Formulaciones avanzadas para el cuidado de la piel, cosmética de color de lujo y tratamientos de belleza."
      },
      image: "/images/client-supplied/category-cosmetics-skincare.jpg",
      badge: { en: "Skincare & Beauty", es: "Belleza y Cuidado" }
    },
    {
      id: "wines-spirits",
      name: { en: "Wines, Spirits & Champagne", es: "Vinos, Licores y Champagne" },
      description: {
        en: "Curated selections of fine champagne, prestige wines, and rare spirits for duty-free and luxury retail.",
        es: "Selecciones de fino champagne, vinos prestige y licores exclusivos para duty-free y minoristas de lujo."
      },
      image: "/images/client-supplied/category-wines-spirits.jpg",
      badge: { en: "Fine Beverages", es: "Bebidas Finas" }
    },
    {
      id: "travel-sets",
      name: { en: "Travel Sets & Exclusive Kits", es: "Sets de Viaje y Kits Exclusivos" },
      description: {
        en: "Tailored travel retail exclusives, fragrance miniatures, and multi-piece gift box sets.",
        es: "Exclusivos de travel retail a medida, miniaturas de fragancias y juegos de regalos en estuches de lujo."
      },
      image: "/images/client-supplied/category-travel-sets.jpg",
      badge: { en: "Travel Retail Exclusives", es: "Exclusivos Travel Retail" }
    },
    {
      id: "fashion-textiles",
      name: { en: "Fashion & Textiles", es: "Moda y Textiles" },
      description: {
        en: "Fine silk scarves, luxury leather goods accessories, and premium textile creations.",
        es: "Pañuelos de seda fina, accesorios de marroquinería de lujo y creaciones textiles de primera calidad."
      },
      image: "/images/client-supplied/category-fashion-textiles.jpg",
      badge: { en: "Lifestyle & Apparel", es: "Estilo de Vida y Moda" }
    },
    {
      id: "jewelry",
      name: { en: "Fine Jewelry & Timepieces", es: "Joyería Fina y Relojería" },
      description: {
        en: "Elegant crafted jewelry pieces, luxury watches, and high-end statement accessories.",
        es: "Piezas de joyería elegantemente diseñadas, relojes de lujo y accesorios de alta gama."
      },
      image: "/images/client-supplied/category-jewelry-timepieces.jpg",
      badge: { en: "Luxury Accessories", es: "Accesorios de Lujo" }
    },
    {
      id: "accessories",
      name: { en: "Luxury Accessories", es: "Accesorios de Lujo" },
      description: {
        en: "Curated lifestyle accents, designer eyewear accessories, and travel companion items.",
        es: "Detalles para el estilo de vida, accesorios de diseño y artículos de transporte y viaje."
      },
      image: "/images/client-supplied/category-accessories.jpg",
      badge: { en: "Lifestyle Accents", es: "Accesorios de Estilo" }
    }
  ],

  services: [
    {
      id: "global-distribution",
      title: { en: "Global Distribution", es: "Distribución Global" },
      shortDesc: {
        en: "Bridging manufacturers and international buyers across retail, duty-free, and wholesale sectors.",
        es: "Conectando fabricantes y compradores internacionales en sectores minoristas, duty-free y mayoristas."
      },
      fullDesc: {
        en: "We supply premium perfumery, cosmetics, wines & spirits, and lifestyle products to retailers, duty-free operators, and distributors across international markets. With a strong presence in wholesale and travel retail, we act as a reliable bridge between manufacturers and buyers worldwide, ensuring products reach the right markets efficiently. Our global network allows us to serve clients across multiple continents simultaneously.",
        es: "Suministramos perfumería, cosmética, vinos y licores y productos de estilo de vida de primera calidad a minoristas, operadores de duty-free y distribuidores en mercados internacionales. Con una fuerte presencia en la venta al por mayor y travel retail, actuamos como un puente fiable entre fabricantes y compradores de todo el mundo."
      },
      iconName: "Globe"
    },
    {
      id: "logistics-management",
      title: { en: "Logistics Management", es: "Gestión Logística" },
      shortDesc: {
        en: "End-to-end multi-modal transport (Road, Sea, Air) with customs clearance & scheduling.",
        es: "Transporte multimodal integral (terrestre, marítimo, aéreo) con despacho de aduanas y programación."
      },
      fullDesc: {
        en: "Backed by more than 15 years of experience and a strong network of freight forwarders, we manage the full logistics process from origin to destination. We coordinate international shipping, customs documentation, and delivery scheduling to ensure goods arrive on time and in optimal condition, regardless of order volume.",
        es: "Con el respaldo de más de 15 años de experiencia y una sólida red de transitarios, gestionamos todo el proceso logístico desde el origen hasta el destino. Coordinamos los envíos internacionales, la documentación aduanera y la programación de las entregas."
      },
      iconName: "Truck"
    },
    {
      id: "brand-entry",
      title: { en: "Brand Introduction & Market Entry", es: "Introducción de Marcas e Ingreso al Mercado" },
      shortDesc: {
        en: "Helping brands expand into new global territories through established retail networks.",
        es: "Ayudando a las marcas a expandirse a nuevos territorios globales a través de redes minoristas consolidadas."
      },
      fullDesc: {
        en: "We help brands looking to expand internationally by introducing them to new markets and connecting them with the right retail and distribution partners. Leveraging our established relationships across the luxury sector, we support brands in building visibility and credibility where they are not yet present.",
        es: "Ayudamos a las marcas que buscan expandirse internacionalmente introduciéndolas en nuevos mercados y conectándolas con los socios minoristas y de distribución adecuados. Aprovechamos nuestras relaciones consolidadas en el sector del lujo."
      },
      iconName: "TrendingUp"
    },
    {
      id: "sourcing-development",
      title: { en: "Sourcing & Supplier Development", es: "Suministro y Desarrollo de Proveedores" },
      shortDesc: {
        en: "Continuously expanding catalogue diversity with competitive sourcing directly from brand owners.",
        es: "Ampliando continuamente el catálogo con abastecimiento competitivo directamente de los fabricantes."
      },
      fullDesc: {
        en: "We are continuously expanding our network of suppliers and product categories to better serve our clients’ evolving needs. We actively seek new partnerships with manufacturers and brand owners to diversify our offering and provide clients with a wider, more competitive product range.",
        es: "Ampliamos continuamente nuestra red de proveedores y categorías de productos para atender mejor las necesidades de nuestros clientes. Buscamos activamente nuevas alianzas con fabricantes y propietarios de marcas."
      },
      iconName: "Building2"
    }
  ],

  logistics: {
    modes: [
      { name: { en: "Road Freight", es: "Carga Terrestre" }, icon: "Truck", desc: { en: "Pan-European rapid road network", es: "Red terrestre rápida Paneuropea" } },
      { name: { en: "Sea Freight", es: "Carga Marítima" }, icon: "Ship", desc: { en: "Full Container & LCL global sea routes", es: "Rutas marítimas contenedores completos y consolidados" } },
      { name: { en: "Air Freight", es: "Carga Aérea" }, icon: "Plane", desc: { en: "Express priority air shipments worldwide", es: "Envíos aéreos expresos prioritarios a todo el mundo" } },
      { name: { en: "Global Network", es: "Red Global" }, icon: "Network", desc: { en: "Seamless hub distribution across continents", es: "Distribución fluida a través de centros en todos los continentes" } }
    ],
    targetMarkets: ["Europe", "Middle East", "North America", "South America", "Asia", "Africa", "Australia"]
  },

  whyChooseUs: [
    { en: "15+ years of experience in wholesale, luxury retail, and travel retail", es: "Más de 15 años de experiencia en venta al por mayor, retail de lujo y travel retail" },
    { en: "Strong relationships with major groups such as LVMH, PUIG, L'Oréal Luxe, and COTY", es: "Relaciones consolidadas con grandes grupos como LVMH, PUIG, L'Oréal Luxe y COTY" },
    { en: "Established international network of freight forwarders for reliable global delivery", es: "Red internacional de transitarios para entregas globales fiables" },
    { en: "Flexible, consistent supply adapted to each market's needs", es: "Suministro flexible y consistente adaptado a las necesidades de cada mercado" },
    { en: "Wide and growing product range: perfumery, cosmetics, wines & spirits, jewelry, accessories, and more", es: "Amplia gama de productos: perfumería, cosmética, vinos y licores, joyería, accesorios y más" },
    { en: "Trusted partner for brands seeking market entry and international expansion", es: "Socio de confianza para marcas que buscan la entrada en nuevos mercados y expansión internacional" }
  ]
};
