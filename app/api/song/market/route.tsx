import { NextRequest, NextResponse } from 'next/server';
import { supabaseClient } from '@/lib/supabase/client';
import getSongLinks from '@/lib/songLink/getSongLinks';
import formatSongLinks from '@/lib/songLink/formatSongLinks';
import getSongMarketCollection from '@/lib/sonata/song/getSongMarketCollection';
import { songMarketStack } from '@/lib/stack/client';

export async function GET(req: NextRequest) {
  const songLink = req.nextUrl.searchParams.get('songLink');
  if (!songLink) return NextResponse.json({ error: 'songLink is required' }, { status: 400 });
  try {
    const { data: alternatives } = await getSongLinks(songLink);
    const songLinks = formatSongLinks(songLink, alternatives);
    const embeds = Object.values(alternatives).concat(songLink);
    const { data: posts } = await supabaseClient
      .rpc('get_posts_by_embeds', { search_embeds: embeds })
      .select('*');
    const totalNotes = Array.isArray(posts)
      ? posts.reduce((prev, curr) => prev + (curr.points ?? 0), 0)
      : 0;

    const collection = await getSongMarketCollection(songLinks);
    const leaderboard = await songMarketStack.getLeaderboard();
    console.log('SWEETS leaderboard', leaderboard.pointSystem);

    return NextResponse.json({ totalNotes, songLinks, collection });
  } catch (error) {
    console.error('Error in /api/song/market:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;
