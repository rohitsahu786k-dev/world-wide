const fs = require("fs");
const path = require("path");

const mappings = [
  // Categories (8 unique)
  { src: "image010.jpg", dest: "public/images/categories/perfumes-fragrances.jpg" },
  { src: "image004.jpg", dest: "public/images/categories/niche-fragrances.jpg" },
  { src: "image008.jpg", dest: "public/images/categories/cosmetics-skincare.jpg" },
  { src: "image034.jpg", dest: "public/images/categories/wines-spirits.jpg" },
  { src: "image016.jpg", dest: "public/images/categories/travel-sets.jpg" },
  { src: "image027.jpg", dest: "public/images/categories/fashion-textiles.jpg" },
  { src: "image047.jpg", dest: "public/images/categories/jewelry-timepieces.jpg" },
  { src: "image023.jpg", dest: "public/images/categories/accessories.jpg" },

  // Product Cards (20 unique)
  { src: "image001.jpg", dest: "public/images/card-images/perfume-classic-flacon.jpg" },
  { src: "image002.jpg", dest: "public/images/card-images/perfume-artisanal-sprayer.jpg" },
  { src: "image003.jpg", dest: "public/images/card-images/perfume-luxury-gold.jpg" },
  { src: "image005.jpg", dest: "public/images/card-images/niche-elixir-crystal.jpg" },
  { src: "image006.jpg", dest: "public/images/card-images/niche-atelier-edition.jpg" },
  { src: "image007.jpg", dest: "public/images/card-images/cosmetics-serum-dropper.jpg" },
  { src: "image009.jpg", dest: "public/images/card-images/skincare-hydration-jar.jpg" },
  { src: "image011.jpg", dest: "public/images/card-images/cosmetics-velvet-palette.jpg" },
  { src: "image012.jpg", dest: "public/images/card-images/wines-champagne-prestige.jpg" },
  { src: "image013.jpg", dest: "public/images/card-images/wines-single-malt.jpg" },
  { src: "image014.jpg", dest: "public/images/card-images/travel-deluxe-case.jpg" },
  { src: "image017.jpg", dest: "public/images/card-images/travel-miniature-kit.jpg" },
  { src: "image018.jpg", dest: "public/images/card-images/fashion-silk-scarf.jpg" },
  { src: "image019.jpg", dest: "public/images/card-images/fashion-leather-tote.jpg" },
  { src: "image020.jpg", dest: "public/images/card-images/jewelry-diamond-solitaire.jpg" },
  { src: "image021.jpg", dest: "public/images/card-images/jewelry-gold-chronograph.jpg" },
  { src: "image022.jpg", dest: "public/images/card-images/accessories-designer-eyewear.jpg" },
  { src: "image025.jpg", dest: "public/images/card-images/accessories-travel-companion.jpg" },
  { src: "image028.jpg", dest: "public/images/card-images/fashion-couture-silk.jpg" },
  { src: "image048.jpg", dest: "public/images/card-images/jewelry-gemstone-pendant.jpg" },

  // Services (6 unique)
  { src: "image032.jpg", dest: "public/images/services/global-distribution.jpg" },
  { src: "image030.jpg", dest: "public/images/services/logistics-management.jpg" },
  { src: "image029.jpg", dest: "public/images/services/brand-entry.jpg" },
  { src: "image037.jpg", dest: "public/images/services/sourcing-development.jpg" },
  { src: "image040.jpg", dest: "public/images/services/service-overview-5.jpg" },
  { src: "image041.jpg", dest: "public/images/services/service-overview-6.jpg" },

  // Logistics (4 unique)
  { src: "image031.jpg", dest: "public/images/logistics/road-freight.jpg" },
  { src: "image038.jpg", dest: "public/images/logistics/sea-freight.jpg" },
  { src: "image050.jpg", dest: "public/images/logistics/air-freight.jpg" },
  { src: "image026.jpg", dest: "public/images/logistics/global-network.jpg" },

  // About Page (3 unique)
  { src: "image024.jpg", dest: "public/images/about/about-intro-luxury.jpg" },
  { src: "image042.jpg", dest: "public/images/about/about-intro-distribution.jpg" },
  { src: "image044.jpg", dest: "public/images/about/about-intro-warehouse.jpg" },

  // Why Choose Us
  { src: "image045.jpg", dest: "public/images/client-supplied/why-us-luxury.jpg" },

  // Blog Articles (3 unique)
  { src: "image043.jpg", dest: "public/images/blog/blog-global-duty-free.jpg" },
  { src: "image046.jpg", dest: "public/images/blog/blog-niche-perfumery.jpg" },
  { src: "image049.jpg", dest: "public/images/blog/blog-brand-entry-strategy.jpg" },

  // Internal Page Heroes (5 unique page headers)
  { src: "image036.jpg", dest: "public/images/heroes/hero-categories.jpg" },
  { src: "image033.jpg", dest: "public/images/heroes/hero-services.jpg" },
  { src: "image035.jpg", dest: "public/images/heroes/hero-about.jpg" },
  { src: "image039.jpg", dest: "public/images/heroes/hero-contact.jpg" },
  { src: "image051.png", dest: "public/images/heroes/hero-logistics.jpg" },

  // Backwards compatibility sync for client-supplied folder
  { src: "image010.jpg", dest: "public/images/client-supplied/category-perfumes-fragrances.jpg" },
  { src: "image004.jpg", dest: "public/images/client-supplied/category-niche-fragrances.jpg" },
  { src: "image008.jpg", dest: "public/images/client-supplied/category-cosmetics-skincare.jpg" },
  { src: "image034.jpg", dest: "public/images/client-supplied/category-wines-spirits.jpg" },
  { src: "image016.jpg", dest: "public/images/client-supplied/category-travel-sets.jpg" },
  { src: "image027.jpg", dest: "public/images/client-supplied/category-fashion-textiles.jpg" },
  { src: "image047.jpg", dest: "public/images/client-supplied/category-jewelry-timepieces.jpg" },
  { src: "image023.jpg", dest: "public/images/client-supplied/category-accessories.jpg" },
  { src: "image032.jpg", dest: "public/images/client-supplied/service-global-distribution.jpg" },
  { src: "image030.jpg", dest: "public/images/client-supplied/service-logistics-management.jpg" },
  { src: "image029.jpg", dest: "public/images/client-supplied/service-brand-entry.jpg" },
  { src: "image037.jpg", dest: "public/images/client-supplied/service-sourcing-development.jpg" },
];

function main() {
  const sourceDir = "New folder";
  console.log("Starting unique asset deployment from 'New folder'...");

  let successCount = 0;
  mappings.forEach(({ src, dest }) => {
    const srcPath = path.join(sourceDir, src);
    const destPath = path.resolve(dest);
    const destDir = path.dirname(destPath);

    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath);
      successCount++;
      console.log(`[OK] ${src} -> ${dest}`);
    } else {
      console.warn(`[MISSING] ${srcPath}`);
    }
  });

  console.log(`Finished copying ${successCount} unique client images.`);
}

main();
