import { FeedType } from '@/providers/FeedProvider';
import { SupabaseClient } from '@supabase/supabase-js';

const fetchPosts = async (
  supabaseClient: SupabaseClient,
  filter: any,
  feedType: string,
  start: number,
) => {
  if (feedType === FeedType.Recent) {
    const query = supabaseClient.from('posts').select('*').not('likes', 'is', null);

    if (filter?.platform) {
      query.eq('platform', filter.platform);
    }

    if (filter?.channel) {
      query.eq('channelId', filter.channel);
    }

    query.order('created_at', { ascending: false });
    query.range(start, start + 5);

    const { data: posts } = await query.returns();

    return {
      posts,
    };
  } else {
    const query = supabaseClient.from('trending_posts').select('*');

    if (filter?.platform) {
      query.eq('platform', filter.platform);
    }

    if (filter?.channel) {
      query.eq('channelId', filter.channel);
    }

    query.order('score', { ascending: false });
    query.range(start, start + 20);
    const { data: posts } = await query.returns();
    return { posts };
  }
};

export default fetchPosts;
