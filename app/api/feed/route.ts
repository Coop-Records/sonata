import { NextRequest, NextResponse } from 'next/server';
import fetchPosts from '@/lib/supabase/fetchPosts';
import { supabaseClient } from '@/lib/supabase/client';
import findValidEmbed from '@/lib/findValidEmbed';
import { FeedType, FeedFilter } from '@/types/Feed';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const feedType = searchParams.get('feedType') || FeedType.Trending;
    const viewerFid: any = searchParams.get('viewerFid');
    const channelId = searchParams.get('channelId');

    const filter: FeedFilter = {};
    if (channelId) {
      filter.channel = channelId;
    }

    const { posts } = await fetchPosts(
      supabaseClient,
      filter,
      feedType,
      0,
      viewerFid,
      viewerFid,
      false,
    );

    const filteredPosts = posts.filter((post) => {
      if (channelId && !(post.channelId && post.channelId.includes(channelId))) {
        return false;
      }

      const validEmbed = findValidEmbed(post);
      return !!validEmbed;
    });

    return NextResponse.json({ posts: filteredPosts });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
