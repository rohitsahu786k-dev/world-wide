const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

async function sharpnessScore(file) {
  const { data, info } = await sharp(file)
    .resize(256, 256, { fit: "inside" })
    .greyscale()
    .raw()
    .toBuffer({ resolveWithObject: true });

  let sum = 0;
  let n = 0;
  const { width: w, height: h } = info;
  for (let y = 1; y < h - 1; y += 1) {
    for (let x = 1; x < w - 1; x += 1) {
      const i = y * w + x;
      const lap = 4 * data[i] - data[i - 1] - data[i + 1] - data[i - w] - data[i + w];
      sum += lap * lap;
      n += 1;
    }
  }
  return Math.round(sum / n);
}

async function main() {
  const files = [
    ...fs.readdirSync("public/images/client-supplied").map((f) => `public/images/client-supplied/${f}`),
    ...fs.readdirSync("public/images/card-images").map((f) => `public/images/card-images/${f}`),
    "public/images/valencia-hero-waterfront.png",
    "public/images/luxury-commerce-premium-products-valencia-mobile-banner.webp",
  ];

  for (const file of files) {
    const meta = await sharp(file).metadata();
    const score = await sharpnessScore(file);
    console.log(`${path.basename(file)}\t${meta.width}x${meta.height}\t${score}\t${file}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
