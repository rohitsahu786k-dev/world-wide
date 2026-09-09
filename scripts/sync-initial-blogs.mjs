import fs from 'node:fs';
import path from 'node:path';

const WP_URL = 'https://aquamarine-herring-353942.hostingersite.com';
const AUTH = 'Basic c3RoYWtrZXIzMkBnbWFpbC5jb206WEpCTSBZNklNIFRua3IgTDhNRiBLSDZWIFNVd3Q=';
const MAP_FILE = path.join(process.cwd(), 'src/data/wpMediaMap.json');

const INITIAL_ARTICLES = [
  {
    title: "Opening African Wholesale Markets from Valencia",
    excerpt: "How Spain-based sourcing, logistics coordination, and partner qualification can support new distributor and retailer collaborations across Africa.",
    imagePath: "/images/blog/blog-global-duty-free.jpg",
    content: `
<p class="lead">Valencia's strategic location on the Mediterranean makes it one of Europe's premier gateways for luxury wholesale distribution into North, West, and Sub-Saharan Africa. Through rigorous partner qualification and bonded logistics, Worldwide Supply 28 SL bridges European prestige brands with qualified regional distributors.</p>

<h2>Strategic Maritime & Air Connectivity</h2>
<p>Positioned along major global shipping lanes, Valencia offers rapid transit times to key North African ports such as Tangier Med, Casablanca, and Alexandria, as well as air freight corridors through Madrid-Barajas directly into Lagos, Nairobi, and Johannesburg. For temperature-sensitive cosmetics and luxury fragrances, this geographic proximity translates into reduced lead times and protected product integrity.</p>

<h2>Navigating Regulatory and Import Compliance</h2>
<p>Each African market presents distinct customs protocols, pre-shipment inspection requirements (such as SONCAP in Nigeria or PVOC in Kenya), and certificate of origin standards. Working with a dedicated Spain-based partner ensures that batch documentation, EUR.1 certificates, and compliant labelling are flawlessly executed before dispatch.</p>

<h2>Preserving Brand Equity in High-Growth Retail</h2>
<p>Africa's growing middle and upper classes are driving unprecedented demand for niche fragrances, prestige skincare, and luxury lifestyle accessories. Our model focuses on selective distribution: vetting partners for authorized store footprints, verified retail creditworthiness, and strict adherence to brand positioning guidelines.</p>
`
  },
  {
    title: "Travel Retail Categories Built for B2B Growth",
    excerpt: "Fragrance, beauty, travel sets, accessories, and premium gifting categories can strengthen duty-free and destination retail assortments.",
    imagePath: "/images/blog/blog-niche-perfumery.jpg",
    content: `
<p class="lead">Travel retail and duty-free environments demand high-turnover, high-margin product assortments that capture impulse spend. We analyze the specific merchandise categories driving revenue across international airport hubs, cruise terminals, and cross-border commercial corridors.</p>

<h2>The Dominance of Prestige Perfumery</h2>
<p>Fragrance continues to represent the cornerstone of travel retail revenue. High-concentration extraits de parfum, artisanal niche formulations, and regional exclusives command premium price points while delivering exceptional revenue per square meter in boutique footprints.</p>

<h2>Compact Luxury: Travel Sets & Airport Kits</h2>
<p>Airport security restrictions and carry-on convenience have made pre-packaged travel kits a consumer favorite. Multi-item sets featuring 30ml and 50ml flacons, accompanied by hydration serums and luxury atomizers, provide both accessible luxury entry points and turnkey gifting solutions.</p>

<h2>Merchandising for Destination Retail</h2>
<p>Successful duty-free operators balance heritage global powerhouses with high-margin curated niche lines. Worldwide Supply 28 facilitates flexible minimum order quantities (MOQs) and consolidated multi-brand shipments, enabling retail operators to maintain fresh assortments without excessive inventory capital lockup.</p>
`
  },
  {
    title: "Luxury Wholesale Without E-Commerce Noise",
    excerpt: "Why serious wholesale websites should focus on partner qualification, availability conversations, sourcing fit, and long-term relationships.",
    imagePath: "/images/blog/blog-brand-entry-strategy.jpg",
    content: `
<p class="lead">In the luxury and prestige goods sector, mass e-commerce shopping carts can erode brand equity and trigger price deflation. A disciplined wholesale architecture prioritizes confidential pricing, verified buyer qualification, and relationship-driven trade.</p>

<h2>Protecting Authorized Distribution Networks</h2>
<p>Open-cart pricing in the luxury domain invites gray-market arbitrage and undermines brand relationships with authorized department stores and duty-free concessionaires. Professional B2B procurement operates through confidential allocation sheets, authenticated batch registries, and direct negotiation.</p>

<h2>Vetting Buyers for Long-Term Value</h2>
<p>Sustainable distribution requires aligning with retail partners who share a commitment to visual presentation, customer experience, and post-sales support. Worldwide Supply 28 SL evaluates potential partners based on retail infrastructure, commercial reputation, and territorial focus rather than transactional spot buying.</p>

<h2>Stability and Transparency in the Supply Chain</h2>
<p>Long-term commercial partnerships thrive on predictability. By maintaining transparent communication regarding harvest cycles, production batch schedules, and freight lead times, we ensure our retail and distribution clients receive dependable supply throughout peak commercial seasons.</p>
`
  }
];

async function main() {
  console.log('1. Checking media map...');
  let mediaMap = {};
  if (fs.existsSync(MAP_FILE)) {
    try {
      mediaMap = JSON.parse(fs.readFileSync(MAP_FILE, 'utf8'));
    } catch {}
  }

  console.log('2. Checking existing posts in WordPress...');
  const existingRes = await fetch(`${WP_URL}/wp-json/wp/v2/posts?per_page=50`, {
    headers: { Authorization: AUTH },
  });
  const existingPosts = await existingRes.json();
  const existingTitles = new Set(
    (Array.isArray(existingPosts) ? existingPosts : []).map(p => p.title?.rendered?.toLowerCase().trim())
  );

  console.log(`Found ${existingTitles.size} existing posts in WordPress.`);

  for (const article of INITIAL_ARTICLES) {
    if (existingTitles.has(article.title.toLowerCase().trim())) {
      console.log(`- Post "${article.title}" already exists. Skipping.`);
      continue;
    }

    const mediaEntry = mediaMap[article.imagePath];
    const featuredMediaId = mediaEntry?.id;

    console.log(`- Creating post: "${article.title}" (Media ID: ${featuredMediaId || 'none'})...`);

    const payload = {
      title: article.title,
      content: article.content,
      excerpt: article.excerpt,
      status: 'publish',
      ...(featuredMediaId ? { featured_media: featuredMediaId } : {}),
    };

    const res = await fetch(`${WP_URL}/wp-json/wp/v2/posts`, {
      method: 'POST',
      headers: {
        Authorization: AUTH,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      console.error(`  FAILED (${res.status}):`, await res.text());
    } else {
      const created = await res.json();
      console.log(`  SUCCESS -> ID ${created.id}`);
    }
  }

  console.log('\nInitial blog synchronization complete!');
}

main().catch(console.error);
