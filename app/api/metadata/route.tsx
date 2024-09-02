import { NextRequest, NextResponse } from 'next/server';
import fetchMetadata from '@/lib/fetchMetadata';
import { SupabasePost } from '@/types/SupabasePost';
import { VERCEL_URL } from '@/lib/consts';

export async function GET(req: NextRequest) {
  const songLink = req.nextUrl.searchParams.get('songLink');
  if (!songLink) {
    return NextResponse.json({ error: 'songLink is required' }, { status: 400 });
  }

  try {
    const metadata = await fetchMetadata(songLink, { id: 1 } as SupabasePost);
    const external_url = `${VERCEL_URL}/song/${encodeURIComponent(songLink)}`;
    const animation_url = `https://test-sonata.vercel.app/song/${encodeURIComponent(songLink)}`;
    const response = {
      external_url,
      name: metadata.trackName,
      image: metadata.artworkUrl,
      description: `song market on sonata: ${external_url}`,
      animation_url,
      content: {
        mime: 'application/zip',
        uri: animation_url,
      },
    };
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Error fetching song metadata:', error);
    return NextResponse.json({ error: 'Failed to fetch song metadata' }, { status: 500 });
  }
}
