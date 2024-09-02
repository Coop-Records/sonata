import { NextRequest, NextResponse } from 'next/server';
import fetchMetadata from '@/lib/fetchMetadata';
import { SupabasePost } from '@/types/SupabasePost';

export async function GET(req: NextRequest) {
  const songLink = req.nextUrl.searchParams.get('songLink');
  if (!songLink) {
    return NextResponse.json({ error: 'songLink is required' }, { status: 400 });
  }

  try {
    const metadata = await fetchMetadata(songLink, { id: 1 } as SupabasePost);
    const response = {
      external_url: `https://sonata.tips/song/${encodeURIComponent(songLink)}`,
      name: metadata.trackName,
      image: metadata.artworkUrl,
    };
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Error fetching song metadata:', error);
    return NextResponse.json({ error: 'Failed to fetch song metadata' }, { status: 500 });
  }
}
