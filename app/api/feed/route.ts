import { NextRequest, NextResponse } from 'next/server';
import { FeedType } from '@/types/Feed';
import { getFeed } from '@/lib/feed/getFeed';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const feedType = searchParams.get('feedType') || FeedType.Trending;
    const viewerFid = searchParams.get('viewerFid');
    const channelId = searchParams.get('channelId');

    const filteredPosts = await getFeed(channelId, feedType as FeedType, Number(viewerFid)); // Cast feedType appropriately

    return NextResponse.json({ posts: filteredPosts });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
