import wpMediaData from '@/data/wpMediaMap.json';

interface MediaEntry {
  id: number;
  url: string;
  filename: string;
}

const mediaMap = wpMediaData as Record<string, MediaEntry>;

// The map is generated against whichever WordPress host was live at the time.
// Rewrite every hit onto the currently configured origin so that moving the
// backend (e.g. to a wp.* subdomain) needs only an env change, not a re-sync.
const WP_ORIGIN = (process.env.NEXT_PUBLIC_WP_BASE_URL || '').replace(/\/+$/, '');

function withCurrentOrigin(url: string): string {
  if (!WP_ORIGIN) return url;
  try {
    const parsed = new URL(url);
    return `${WP_ORIGIN}${parsed.pathname}${parsed.search}`;
  } catch {
    return url;
  }
}

/**
 * Resolves any local image path to its corresponding WordPress Media Library URL.
 * Falls back to the provided path if not found.
 *
 * Example:
 *   getWpMedia('/images/categories/perfumes-fragrances.jpg')
 *   => '<NEXT_PUBLIC_WP_BASE_URL>/wp-content/uploads/2026/09/perfumes-fragrances.jpg'
 */
export function getWpMedia(path: string | undefined | null): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;

  // Normalize path (ensure leading slash, replace backslashes)
  const normalized = path.replace(/\\/g, '/');
  const key = normalized.startsWith('/') ? normalized : `/${normalized}`;

  const entry = mediaMap[key];
  if (entry && entry.url) {
    return withCurrentOrigin(entry.url);
  }

  // Also try matching by filename if exact key path differs slightly
  const filename = key.split('/').pop()?.toLowerCase();
  if (filename) {
    for (const [mapKey, mapVal] of Object.entries(mediaMap)) {
      if (mapKey.toLowerCase().endsWith('/' + filename) && mapVal?.url) {
        return withCurrentOrigin(mapVal.url);
      }
    }
  }

  return path;
}

export default getWpMedia;
