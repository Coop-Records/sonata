import { NextRequest, NextResponse } from 'next/server';
import getSongMarketCollection from '@/lib/sonata/song/getSongMarketCollection';
import getAllPostsForSongLink from '@/lib/sonata/song/getAllPostsForSongLink';

export async function GET(req: NextRequest) {
  const songLink = req.nextUrl.searchParams.get('songLink');
  if (!songLink) return NextResponse.json({ error: 'songLink is required' }, { status: 400 });
  try {
    const { posts, songLinks } = await getAllPostsForSongLink(songLink);
    const totalNotes = Array.isArray(posts)
      ? posts.reduce((prev, curr) => prev + (curr.points ?? 0), 0)
      : 0;
    const collection = await getSongMarketCollection(songLinks);
    return NextResponse.json({ totalNotes, songLinks, collection });
  } catch (error) {
    console.error('Error in /api/song/market:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;
