const sharp = require('sharp');
const fs = require('fs');

async function processFavicon(logoPath, outDir, publicDir) {
  if (!fs.existsSync(logoPath)) {
    console.error('Logo not found:', logoPath);
    return;
  }

  // Create a 512x512 square canvas with centered logo fit
  const size = 512;
  const iconBuffer = await sharp(logoPath)
    .resize(size, size, {
      fit: 'contain',
      background: { r: 255, g: 255, b: 255, alpha: 0 }
    })
    .png()
    .toBuffer();

  const appleBuffer = await sharp(logoPath)
    .resize(180, 180, {
      fit: 'contain',
      background: { r: 255, g: 255, b: 255, alpha: 0 }
    })
    .png()
    .toBuffer();

  const favicon32Buffer = await sharp(logoPath)
    .resize(32, 32, {
      fit: 'contain',
      background: { r: 255, g: 255, b: 255, alpha: 0 }
    })
    .png()
    .toBuffer();

  fs.writeFileSync(`${outDir}/icon.png`, iconBuffer);
  fs.writeFileSync(`${outDir}/apple-icon.png`, appleBuffer);
  fs.writeFileSync(`${outDir}/favicon.ico`, favicon32Buffer);
  fs.writeFileSync(`${publicDir}/favicon.ico`, favicon32Buffer);

  console.log(`Generated favicons for ${outDir}`);
}

async function main() {
  await processFavicon(
    'd:/onepws/world-wide/public/world-wide-logo.png',
    'd:/onepws/world-wide/src/app',
    'd:/onepws/world-wide/public'
  );

  await processFavicon(
    'D:/onepws/imperrial/public/imperial-essence-logo.png',
    'D:/onepws/imperrial/src/app',
    'D:/onepws/imperrial/public'
  );
}

main().catch(console.error);
