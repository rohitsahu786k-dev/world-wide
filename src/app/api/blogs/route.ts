import { NextRequest, NextResponse } from 'next/server';
import { getPosts, createPost } from '@/lib/wordpress';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || undefined;
    const status = searchParams.get('status') || undefined;
    const page = parseInt(searchParams.get('page') || '1', 10);
    const per_page = parseInt(searchParams.get('per_page') || '50', 10);

    const posts = await getPosts({ search, status, page, per_page });
    return NextResponse.json({ success: true, posts });
  } catch (error: any) {
    console.error('API GET /api/blogs error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, excerpt, status, featured_media } = body;

    if (!title || !content) {
      return NextResponse.json(
        { success: false, message: 'Title and content are required' },
        { status: 400 }
      );
    }

    const post = await createPost({
      title,
      content,
      excerpt,
      status: status || 'publish',
      featured_media: featured_media ? Number(featured_media) : undefined,
    });

    return NextResponse.json({ success: true, post }, { status: 201 });
  } catch (error: any) {
    console.error('API POST /api/blogs error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to create post' },
      { status: 500 }
    );
  }
}
