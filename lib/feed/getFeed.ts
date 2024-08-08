'use server';
import { SupabasePost } from '@/types/SupabasePost';
import { SupabaseClient } from '@supabase/supabase-js';
import { fetchPostsLimit } from '@/lib/consts';
import { FeedType } from '@/types/Feed';
import getBaseQuery from './getBaseQuery';
import findValidEmbed from '@/lib/findValidEmbed';
import getFollowing from '@/lib/neynar/getFollowing';

const getFeed = async (
  supabaseClient: SupabaseClient,
  feedType: FeedType,
  start: number,
  channelId: string,
  viewerFid?: number,
  authorFid?: number,
  limit: boolean = true,
): Promise<SupabasePost[]> => {
  try {
    const followingFids = [];
    if (feedType === FeedType.Following) {
      if (!viewerFid) throw new Error('Invalid viewerFid');

      const following = await getFollowing(viewerFid);
      followingFids.push(...following.map((user) => user.fid), viewerFid);
    }

    const query = getBaseQuery(supabaseClient, feedType, followingFids);

    if (!query) return [];

    if (![FeedType.Following, FeedType.Posts].includes(feedType)) {
      query.filter('author', 'cs', '{"power_badge": true}');
    }

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
