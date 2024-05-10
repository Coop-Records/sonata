import { FeedType } from '@/providers/FeedProvider';
import { SupabasePost } from '@/types/SupabasePost';
import { SupabaseClient } from '@supabase/supabase-js';

const fetchPosts = async (
  supabaseClient: SupabaseClient,
  filter: any,
  feedType: string,
  start: number,
) => {
  const query = supabaseClient.from('posts').select('*').not('likes', 'is', null);
  if (filter?.platform) {
    query.eq('platform', filter.platform);
  }

  if (filter?.channel) {
    query.eq('channelId', filter.channel);
  }

  if (feedType == FeedType.Recent) {
    query.order('created_at', { ascending: false });
    query.range(start, start + 5);
  } else {
    query.order('likes', { ascending: false });
    query.range(start, start + 20);
  }

  const { data: posts } = await query.returns<SupabasePost[]>();
  return posts || [];
};

export default fetchPosts;
