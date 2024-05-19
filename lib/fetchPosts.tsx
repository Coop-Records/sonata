import { FeedType } from '@/providers/FeedProvider';
import { SupabasePost } from '@/types/SupabasePost';
import { SupabaseClient } from '@supabase/supabase-js';
import getFollowing from './pinata/getFollowing';

const fetchPosts = async (
  supabaseClient: SupabaseClient,
  filter: any,
  feedType: string,
  start: number,
  fid?: number,
) => {
  const isFollowing = feedType === FeedType.Following;
  if (feedType === FeedType.Recent || isFollowing) {
    const query = supabaseClient.from('posts').select('*').not('likes', 'is', null);

    if (filter?.platform) {
      query.eq('platform', filter.platform);
    }

    if (filter?.channel) {
      query.eq('channelId', filter.channel);
    }

    query.order('created_at', { ascending: false });
    const size = isFollowing ? 333 : 20;
    query.range(start, start + size);

    let { data: posts } = await query.returns<SupabasePost[]>();

    if (isFollowing) {
      const following = await getFollowing(fid);
      const followingFids = following.users.map((user: { fid: number }) => user.fid);
      posts = posts?.filter((post: SupabasePost) =>
        followingFids.includes(post.author.fid),
      ) as SupabasePost[];
    }
    return {
      posts,
    };
  }

  const query = supabaseClient.from('trending_posts').select('*');

  if (filter?.platform) {
    query.eq('platform', filter.platform);
  }

  if (filter?.channel) {
    query.eq('channelId', filter.channel);
  }

  query.order('score', { ascending: false });
  query.range(start, start + 20);
  const { data: posts } = await query.returns<SupabasePost[]>();
  return { posts };
};

export default fetchPosts;
