const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const outDir = "public/images/curated";

const assets = [
  {
    name: "hero-luxury-wholesale.webp",
    source: "public/images/valencia-hero-waterfront.png",
    width: 1920,
    height: 1072,
    fit: "cover",
    position: "center",
  },
  {
    name: "hero-mobile-luxury-wholesale.webp",
    source: "public/images/luxury-commerce-premium-products-valencia-mobile-banner.webp",
    width: 1080,
    height: 1600,
    fit: "cover",
    position: "top",
  },
  {
    name: "category-perfumes-fragrances.webp",
    source: "C:/Users/Rohit Sahu/Downloads/image010.jpg",
    width: 1254,
    height: 1254,
    fit: "cover",
    position: "center",
  },
  {
    name: "category-niche-fragrances.webp",
    source: "C:/Users/Rohit Sahu/Downloads/image004.jpg",
    width: 1254,
    height: 1254,
    fit: "cover",
    position: "center",
  },
  {
    name: "category-cosmetics-skincare.webp",
    source: "C:/Users/Rohit Sahu/Downloads/image008.jpg",
    width: 1254,
    height: 1254,
    fit: "cover",
    position: "center",
  },
  {
    name: "category-wines-spirits.webp",
    source: "C:/Users/Rohit Sahu/Downloads/image034.jpg",
    width: 1254,
    height: 1254,
    fit: "cover",
    position: "center",
  },
  {
    name: "category-travel-sets.webp",
    source: "C:/Users/Rohit Sahu/Downloads/image024.jpg",
    width: 1254,
    height: 1254,
    fit: "cover",
    position: "center",
  },
  {
    name: "category-fashion-textiles.webp",
    source: "C:/Users/Rohit Sahu/Downloads/image027.jpg",
    width: 1254,
    height: 1254,
    fit: "cover",
    position: "top",
  },
  {
    name: "category-jewelry-timepieces.webp",
    source: "C:/Users/Rohit Sahu/Downloads/image047.jpg",
    width: 1254,
    height: 1254,
    fit: "cover",
    position: "center",
  },
  {
    name: "category-accessories.webp",
    source: "C:/Users/Rohit Sahu/Downloads/image023.jpg",
    width: 1254,
    height: 1254,
    fit: "cover",
    position: "center",
  },
  {
    name: "service-global-distribution.webp",
    source: "C:/Users/Rohit Sahu/Downloads/image032.jpg",
    width: 1400,
    height: 900,
    fit: "cover",
    position: "center",
  },
  {
    name: "service-logistics-management.webp",
    source: "C:/Users/Rohit Sahu/Downloads/image030.jpg",
    width: 1400,
    height: 900,
    fit: "cover",
    position: "center",
  },
  {
    name: "service-brand-entry.webp",
    source: "C:/Users/Rohit Sahu/Downloads/image029.jpg",
    width: 1400,
    height: 900,
    fit: "cover",
    position: "center",
  },
  {
    name: "service-sourcing-development.webp",
    source: "C:/Users/Rohit Sahu/Downloads/image037.jpg",
    width: 1400,
    height: 900,
    fit: "cover",
    position: "center",
  },
  {
    name: "logistics-road-freight.webp",
    source: "C:/Users/Rohit Sahu/Downloads/image031.jpg",
    width: 1254,
    height: 1254,
    fit: "cover",
    position: "center",
  },
  {
    name: "logistics-sea-freight.webp",
    source: "C:/Users/Rohit Sahu/Downloads/image038.jpg",
    width: 1254,
    height: 1254,
    fit: "cover",
    position: "center",
  },
  {
    name: "logistics-air-freight.webp",
    source: "C:/Users/Rohit Sahu/Downloads/image050.jpg",
    width: 1254,
    height: 1254,
    fit: "cover",
    position: "center",
  },
  {
    name: "logistics-global-network.webp",
    source: "C:/Users/Rohit Sahu/Downloads/image029.jpg",
    width: 1254,
    height: 1254,
    fit: "cover",
    position: "center",
  },
  {
    name: "why-us-luxury.webp",
    source: "C:/Users/Rohit Sahu/Downloads/image024.jpg",
    width: 1200,
    height: 900,
    fit: "cover",
    position: "center",
  },
];

async function main() {
  fs.mkdirSync(outDir, { recursive: true });

  for (const asset of assets) {
    await sharp(asset.source)
      .rotate()
      .resize(asset.width, asset.height, {
        fit: asset.fit,
        position: asset.position,
        withoutEnlargement: false,
      })
      .modulate({ saturation: 1.04, brightness: 1.01 })
      .sharpen({ sigma: 0.7, m1: 0.8, m2: 1.8 })
      .webp({ quality: 88, effort: 5 })
      .toFile(path.join(outDir, asset.name));

    console.log(`${asset.name} <- ${asset.source}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
