'use server';
import { SupabasePost } from '@/types/SupabasePost';
import { fetchPostsLimit } from '@/lib/consts';
import { FeedType } from '@/types/Feed';
import getBaseQuery from './getBaseQuery';
import findValidEmbed from '@/lib/findValidEmbed';
import getFollowing from '@/lib/farcaster/getFollowing';

const getFeed = async (
  feedType: FeedType,
  start: number,
  channelId: string,
  viewerFid?: number | null,
  authorFid?: number | null,
  limit: boolean = true,
): Promise<SupabasePost[]> => {
  try {
    let followingFids: number[] = [];
    if (feedType === FeedType.Following) {
      if (!viewerFid) throw new Error('Invalid viewerFid');
      followingFids = await getFollowing(viewerFid);
    }

    const query = getBaseQuery(feedType, followingFids);

    if (!query) return [];

    if (channelId) query.eq('channelId', channelId);
    if (authorFid) query.eq('authorFid', authorFid);
    if (limit) query.range(start, start + fetchPostsLimit - 1);

    let { data: posts } = await query.returns<SupabasePost[]>();
    if (!posts) posts = [];

    posts = posts.filter((post: any) => {
      const validEmbed = findValidEmbed(post);
      return !!validEmbed;
    });

    return posts;
  } catch (error) {
    console.error('Error fetching feed', error);
    return [];
  }
};

export default getFeed;
