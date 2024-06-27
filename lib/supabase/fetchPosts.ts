import { SupabasePost } from '@/types/SupabasePost';
import { SupabaseClient } from '@supabase/supabase-js';
import { fetchPostsLimit } from '../consts';
import { FeedType } from '@/types/Feed';
import getBaseQuery from './getBaseQuery';

const fetchPosts = async (
  supabaseClient: SupabaseClient,
  filter: any,
  feedType: string,
  start: number,
  fid?: number,
  profileFid?: number,
  limit: boolean = true,
) => {
  const followingFids = [];
  if (feedType === FeedType.Following) {
    const baseUrl = process.env.API_URL || 'http://localhost:3000';
    const followingUrl = new URL(`/api/neynar/getFollowing?fid=${fid}`, baseUrl).toString();
    const following = await fetch(followingUrl).then((response) => response.json());
    followingFids.push(...following.users.map((user: { fid: number }) => user.fid));
    followingFids.push(fid);
  }

  const query = getBaseQuery(supabaseClient, feedType, followingFids);

  if (!query) {
    return { posts: [] };
  }

  if (feedType !== FeedType.Following) {
    query.filter('author', 'cs', '{"power_badge": true}');
  }

  if (filter?.platform) {
    query.eq('platform', filter.platform);
  }
  if (filter?.channel) {
    query.eq('channelId', filter.channel);
  }
  if (profileFid) {
    query.eq('authorFid', profileFid);
  }
  if (limit) query.range(start, start + fetchPostsLimit - 1);

  const { data: posts } = await query.returns<SupabasePost[]>();
  return { posts: posts || [] };
};

export default fetchPosts;
