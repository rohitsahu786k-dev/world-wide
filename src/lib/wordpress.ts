const WP_BASE = 'https://aquamarine-herring-353942.hostingersite.com/wp-json/wp/v2';
const WP_AUTH = 'Basic c3RoYWtrZXIzMkBnbWFpbC5jb206WEpCTSBZNklNIFRua3IgTDhNRiBLSDZWIFNVd3Q=';

export interface WordPressMedia {
  id: number;
  source_url: string;
  alt_text?: string;
  media_details?: {
    sizes?: Record<string, { source_url: string }>;
  };
}

export interface WordPressPost {
  id: number;
  date: string;
  modified: string;
  slug: string;
  status: 'publish' | 'draft' | 'future' | 'trash';
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  featured_media: number;
  categories?: number[];
  _embedded?: {
    'wp:featuredmedia'?: Array<WordPressMedia>;
    author?: Array<{ id: number; name: string }>;
  };
}

export interface BlogPostFormatted {
  id: number;
  title: string;
  description: string;
  content: string;
  image: string;
  href: string;
  date: string;
  status: string;
  author: string;
  category: string;
}

/**
 * Extracts the featured image URL from an embedded WordPress post.
 */
export function getFeaturedImageUrl(post: WordPressPost, fallback = '/images/blog/blog-global-duty-free.jpg'): string {
  const media = post._embedded?.['wp:featuredmedia']?.[0];
  return media?.source_url || fallback;
}

/**
 * Strips HTML tags from rendered WordPress strings.
 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>?/gm, '').trim();
}

/**
 * Formats a raw WordPress post into the frontend BlogPost representation.
 */
export function formatWordPressPost(post: WordPressPost): BlogPostFormatted {
  const cleanExcerpt = stripHtml(post.excerpt?.rendered || '');
  const cleanTitle = stripHtml(post.title?.rendered || 'Untitled Post');
  const imageUrl = getFeaturedImageUrl(post);
  const author = post._embedded?.author?.[0]?.name || 'Worldwide Supply 28';
  const category = 'Blog';

  return {
    id: post.id,
    title: cleanTitle,
    description: cleanExcerpt || cleanTitle,
    content: post.content?.rendered || '',
    image: imageUrl,
    href: `/blog/${post.id}`,
    date: post.date,
    status: post.status,
    author,
    category,
  };
}

/**
 * Fetch list of posts from WordPress REST API.
 */
export async function getPosts(params: {
  per_page?: number;
  page?: number;
  status?: string;
  search?: string;
} = {}): Promise<BlogPostFormatted[]> {
  const query = new URLSearchParams();
  query.set('_embed', '1');
  query.set('per_page', String(params.per_page || 20));
  query.set('page', String(params.page || 1));
  if (params.status) query.set('status', params.status);
  if (params.search) query.set('search', params.search);

  try {
    const res = await fetch(`${WP_BASE}/posts?${query.toString()}`, {
      headers: { Authorization: WP_AUTH },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error(`WordPress API getPosts error: ${res.status} ${res.statusText}`);
      return [];
    }

    const posts: WordPressPost[] = await res.json();
    return posts.map(formatWordPressPost);
  } catch (err) {
    console.error('Failed to fetch posts from WordPress:', err);
    return [];
  }
}

/**
 * Fetch a single post by ID.
 */
export async function getPost(id: number | string): Promise<BlogPostFormatted | null> {
  try {
    const res = await fetch(`${WP_BASE}/posts/${id}?_embed=1`, {
      headers: { Authorization: WP_AUTH },
      next: { revalidate: 30 },
    });

    if (!res.ok) return null;
    const post: WordPressPost = await res.json();
    return formatWordPressPost(post);
  } catch (err) {
    console.error(`Failed to fetch post ${id}:`, err);
    return null;
  }
}

/**
 * Create a new post in WordPress.
 */
export async function createPost(data: {
  title: string;
  content: string;
  excerpt?: string;
  status?: 'publish' | 'draft';
  featured_media?: number;
  categories?: number[];
}): Promise<WordPressPost> {
  const res = await fetch(`${WP_BASE}/posts`, {
    method: 'POST',
    headers: {
      Authorization: WP_AUTH,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: data.title,
      content: data.content,
      excerpt: data.excerpt,
      status: data.status || 'publish',
      categories: data.categories || [2], // 2 = 'Blog' category in WordPress
      ...(data.featured_media ? { featured_media: data.featured_media } : {}),
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Failed to create post (${res.status}): ${error}`);
  }

  return res.json();
}

/**
 * Update an existing post in WordPress.
 */
export async function updatePost(
  id: number | string,
  data: {
    title?: string;
    content?: string;
    excerpt?: string;
    status?: 'publish' | 'draft';
    featured_media?: number;
    categories?: number[];
  }
): Promise<WordPressPost> {
  const res = await fetch(`${WP_BASE}/posts/${id}`, {
    method: 'POST',
    headers: {
      Authorization: WP_AUTH,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...data,
      categories: data.categories || [2], // Retain 'Blog' category
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Failed to update post ${id} (${res.status}): ${error}`);
  }

  return res.json();
}

/**
 * Delete a post from WordPress.
 */
export async function deletePost(id: number | string, force = true): Promise<boolean> {
  const res = await fetch(`${WP_BASE}/posts/${id}?force=${force}`, {
    method: 'DELETE',
    headers: { Authorization: WP_AUTH },
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Failed to delete post ${id} (${res.status}): ${error}`);
  }

  return true;
}
