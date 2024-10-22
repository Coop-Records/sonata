import { SupabasePost } from '@/types/SupabasePost';
import { fetchPostsLimit } from '@/lib/consts';
import { FeedType } from '@/types/Feed';
import getBaseQuery from './getBaseQuery';
import findValidEmbed from '@/lib/findValidEmbed';
import getFollowing from '@/lib/farcaster/getFollowing';

import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const feedType = params.get('feedType') as FeedType;
  const start = parseInt(params.get('start') || '0', 10);
  const channelId = params.get('channelId');
  const viewerFid = parseInt(params.get('viewerFid') || '', 10) || undefined;
  const authorFid = parseInt(params.get('authorFid') || '', 10) || undefined;

  try {
    let followingFids: number[] = [];
    if (feedType === FeedType.Following) {
      if (!viewerFid) throw new Error('Invalid viewerFid');
      followingFids = await getFollowing(viewerFid);
    }

    const query = getBaseQuery(feedType, followingFids);

    if (!query) throw new Error('Invalid query');

    if (channelId) query.eq('channelId', channelId);
    if (authorFid) query.eq('authorFid', authorFid);
    query.range(start, start + fetchPostsLimit - 1);

    let { data: posts } = await query.returns<SupabasePost[]>();
    if (!posts) posts = [];

    posts = posts.filter((post: any) => {
      const validEmbed = findValidEmbed(post);
      return !!validEmbed;
    });

    return Response.json(posts);
  } catch (error) {
    console.error('Error fetching feed', error);
    return Response.json([], { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
