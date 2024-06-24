import { FeedType } from '@/types/Feed';
import { SupabaseClient } from '@supabase/supabase-js';

export default function getBaseQuery(
  supabaseClient: SupabaseClient,
  feedType: string,
  followingFids: number[],
) {
  if (feedType === FeedType.Recent) {
    const query = supabaseClient.from('posts_with_hypersub').select('*').not('likes', 'is', null);
    query.order('created_at', { ascending: false });
    return query;
  }

  if (feedType === FeedType.Trending) {
    const query = supabaseClient.from('trending_posts').select('*');
    query.order('score', { ascending: false });
    return query;
  }

  if (feedType === FeedType.Following) {
    const query = supabaseClient.from('posts_with_hypersub').select('*').not('likes', 'is', null);
    query.in('author->fid', followingFids);
    query.order('created_at', { ascending: false });
    return query;
  }

  if (feedType === FeedType.Posts) {
    const query = supabaseClient.from('posts').select('*');
    query.order('created_at', { ascending: false });
    return query;
  }
}
