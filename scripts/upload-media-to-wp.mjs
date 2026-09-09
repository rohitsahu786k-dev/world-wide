import fs from 'node:fs';
import path from 'node:path';

const WP_URL = 'https://aquamarine-herring-353942.hostingersite.com';
const AUTH = 'Basic c3RoYWtrZXIzMkBnbWFpbC5jb206WEpCTSBZNklNIFRua3IgTDhNRiBLSDZWIFNVd3Q=';
const MAP_FILE = path.join(process.cwd(), 'src/data/wpMediaMap.json');

const MIME_TYPES = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.gif': 'image/gif',
};

function getAllImages(dir, results = []) {
  if (!fs.existsSync(dir)) return results;
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      getAllImages(full, results);
    } else {
      const ext = path.extname(item).toLowerCase();
      if (MIME_TYPES[ext]) {
        const relFromPublic = path.relative('public', full).replace(/\\/g, '/');
        const webPath = '/' + relFromPublic;
        results.push({
          fullPath: full,
          filename: item,
          webPath,
          mime: MIME_TYPES[ext],
          size: stat.size,
        });
      }
    }
  }
  return results;
}

async function fetchExistingMedia() {
  const map = new Map();
  try {
    let page = 1;
    while (true) {
      const res = await fetch(`${WP_URL}/wp-json/wp/v2/media?per_page=100&page=${page}`, {
        headers: { Authorization: AUTH },
      });
      if (!res.ok) break;
      const list = await res.json();
      if (!Array.isArray(list) || list.length === 0) break;
      for (const item of list) {
        const title = item.title?.rendered?.toLowerCase();
        const slug = item.slug?.toLowerCase();
        const sourceUrl = item.source_url;
        const id = item.id;
        if (sourceUrl) {
          map.set(item.source_url.split('/').pop().toLowerCase(), { id, sourceUrl });
          if (title) map.set(title, { id, sourceUrl });
          if (slug) map.set(slug, { id, sourceUrl });
        }
      }
      if (list.length < 100) break;
      page++;
    }
  } catch (err) {
    console.warn('Failed to fetch existing media, continuing:', err.message);
  }
  return map;
}

async function uploadImage(image) {
  const buf = fs.readFileSync(image.fullPath);
  const res = await fetch(`${WP_URL}/wp-json/wp/v2/media`, {
    method: 'POST',
    headers: {
      Authorization: AUTH,
      'Content-Type': image.mime,
      'Content-Disposition': `attachment; filename="${encodeURIComponent(image.filename)}"`,
    },
    body: buf,
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Upload failed (${res.status}): ${errText.slice(0, 150)}`);
  }

  const data = await res.json();
  return { id: data.id, url: data.source_url };
}

async function main() {
  console.log('1. Scanning public/ for images...');
  const images = getAllImages('public');
  console.log(`Found ${images.length} images.`);

  console.log('2. Checking existing media in WordPress...');
  const existing = await fetchExistingMedia();
  console.log(`Loaded ${existing.size} existing media keys.`);

  let mapping = {};
  if (fs.existsSync(MAP_FILE)) {
    try {
      mapping = JSON.parse(fs.readFileSync(MAP_FILE, 'utf8'));
    } catch {}
  }

  let uploaded = 0;
  let reused = 0;
  let failed = 0;

  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    const cleanFilename = img.filename.toLowerCase();
    
    // Check if already mapped
    if (mapping[img.webPath] && mapping[img.webPath].url) {
      reused++;
      continue;
    }

    // Check if filename exists in WP
    if (existing.has(cleanFilename)) {
      const match = existing.get(cleanFilename);
      mapping[img.webPath] = {
        id: match.id,
        url: match.sourceUrl,
        filename: img.filename,
      };
      reused++;
      continue;
    }

    // Upload
    process.stdout.write(`[${i + 1}/${images.length}] Uploading ${img.filename}... `);
    try {
      const res = await uploadImage(img);
      mapping[img.webPath] = {
        id: res.id,
        url: res.url,
        filename: img.filename,
      };
      uploaded++;
      console.log(`DONE -> ID ${res.id}`);
    } catch (err) {
      failed++;
      console.log(`FAILED: ${err.message}`);
    }

    // Brief pause to avoid rate limiting
    await new Promise((r) => setTimeout(r, 150));
  }

  // Ensure target directory exists
  fs.mkdirSync(path.dirname(MAP_FILE), { recursive: true });
  fs.writeFileSync(MAP_FILE, JSON.stringify(mapping, null, 2), 'utf8');

  console.log('\n=======================================');
  console.log(`Total images: ${images.length}`);
  console.log(`Uploaded new: ${uploaded}`);
  console.log(`Reused existing: ${reused}`);
  console.log(`Failed: ${failed}`);
  console.log(`Media map saved to: ${MAP_FILE}`);
  console.log('=======================================');
}

main().catch(console.error);
