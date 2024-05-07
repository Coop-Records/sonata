import { FeedType } from '@/providers/FeedProvider';
import { SupabaseClient } from '@supabase/supabase-js';

const fetchPosts = async (supabaseClient: SupabaseClient, feedType: string, start: number) => {
  const query = supabaseClient.from('posts').select('*').not('likes', 'is', null);

  if (feedType == FeedType.Recent) {
    query.order('created_at', { ascending: false });
    query.range(start, start + 5);
  } else {
    query.order('likes', { ascending: false });
    query.range(start, start + 20);
  }

  const { data: posts } = await query.returns();

  return {
    posts,
  };
};

export default fetchPosts;
