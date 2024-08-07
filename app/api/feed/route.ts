import { NextRequest, NextResponse } from 'next/server';
import { FeedType } from '@/types/Feed';
import qs from 'qs';
import getFeed from '@/lib/feed/getFeed';
import { supabaseClient } from '@/lib/supabase/client';

export async function GET(req: NextRequest) {
  try {
    const query = qs.parse(req.nextUrl.search.split('?')[1]);
    const { feedType, start, channelId, viewerFid, authorFid } = query as {
      feedType: FeedType;
      start: string;
      channelId: string;
      viewerFid: string;
      authorFid: string;
    };

    const posts = await getFeed(
      supabaseClient,
      feedType,
      Number(start),
      channelId,
      Number(viewerFid),
      Number(authorFid),
    );
    return NextResponse.json({ posts });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error', posts: [] }, { status: 500 });
  }
}

export const revalidate = 0;
