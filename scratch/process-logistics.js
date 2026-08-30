const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const targets = [
  {
    name: "road-freight.jpg",
    input: "New folder/image031.jpg",
  },
  {
    name: "sea-freight.jpg",
    input: "New folder/image038.jpg",
  },
  {
    name: "air-freight.jpg",
    input: "New folder/image050.jpg",
  },
  {
    name: "global-network.jpg",
    input: "New folder/image029.jpg",
  },
];

async function main() {
  const outDir = path.join(__dirname, "../public/images/logistics");
  fs.mkdirSync(outDir, { recursive: true });

  for (const t of targets) {
    const meta = await sharp(t.input).metadata();
    console.log(`${t.name}: ${meta.width}x${meta.height}`);
    
    // Resize to 3:4 aspect ratio (600x800) with center position and slight sharpening
    await sharp(t.input)
      .resize(600, 800, {
        fit: "cover",
        position: "center",
      })
      .modulate({ brightness: 1.05, saturation: 1.1 })
      .jpeg({ quality: 90 })
      .toFile(path.join(outDir, t.name));

    // Also copy to client-supplied
    const clientSuppliedDir = path.join(__dirname, "../public/images/client-supplied");
    await sharp(t.input)
      .resize(600, 800, {
        fit: "cover",
        position: "center",
      })
      .modulate({ brightness: 1.05, saturation: 1.1 })
      .jpeg({ quality: 90 })
      .toFile(path.join(clientSuppliedDir, `logistics-${t.name}`));
  }
  console.log("Logistics images generated successfully!");
}

main().catch(console.error);
