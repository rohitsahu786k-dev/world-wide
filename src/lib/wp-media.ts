import wpMediaData from '@/data/wpMediaMap.json';

interface MediaEntry {
  id: number;
  url: string;
  filename: string;
}

const mediaMap = wpMediaData as Record<string, MediaEntry>;

/**
 * Resolves any local image path to its corresponding WordPress Media Library URL.
 * Falls back to the provided path if not found.
 *
 * Example:
 *   getWpMedia('/images/categories/perfumes-fragrances.jpg')
 *   => 'https://aquamarine-herring-353942.hostingersite.com/wp-content/uploads/2026/09/perfumes-fragrances.jpg'
 */
export function getWpMedia(path: string | undefined | null): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;

  // Normalize path (ensure leading slash, replace backslashes)
  const normalized = path.replace(/\\/g, '/');
  const key = normalized.startsWith('/') ? normalized : `/${normalized}`;

  const entry = mediaMap[key];
  if (entry && entry.url) {
    return entry.url;
  }

  // Also try matching by filename if exact key path differs slightly
  const filename = key.split('/').pop()?.toLowerCase();
  if (filename) {
    for (const [mapKey, mapVal] of Object.entries(mediaMap)) {
      if (mapKey.toLowerCase().endsWith('/' + filename) && mapVal?.url) {
        return mapVal.url;
      }
    }
  }

  return path;
}

export default getWpMedia;
