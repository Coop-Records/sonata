import { SupabasePost } from '@/types/SupabasePost';
import { SupabaseClient } from '@supabase/supabase-js';
import getFollowing from './pinata/getFollowing';
import { fetchPostsLimit } from './consts';
import { FeedType } from '@/types/Feed';

const fetchPosts = async (
  supabaseClient: SupabaseClient,
  filter: any,
  feedType: string,
  start: number,
  fid?: number,
) => {
  let query;
  if (feedType === FeedType.Recent) {
    query = supabaseClient.from('posts').select('*').not('likes', 'is', null);
    query.order('created_at', { ascending: false });
  } else if (feedType === FeedType.Trending) {
    query = supabaseClient.from('trending_posts').select('*');
    query.order('score', { ascending: false });
  } else if (feedType === FeedType.Following) {
    query = supabaseClient.from('posts').select('*').not('likes', 'is', null);
    const following = await getFollowing(fid);
    const followingFids = following.users.map((user: { fid: number }) => user.fid);
    query.in('author->fid', followingFids);
  }

  if (!query) {
    return { posts: [] };
  }

  if (filter?.platform) {
    query.eq('platform', filter.platform);
  }

  if (filter?.channel) {
    query.eq('channelId', filter.channel);
  }

  query.range(start, start + fetchPostsLimit - 1);
  const { data: posts } = await query.returns<SupabasePost[]>();
  return { posts: posts || [] };
};

export default fetchPosts;
