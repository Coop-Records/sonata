import { FeedType } from '@/types/Feed';
import serverClient from '@/lib/supabase/serverClient';

export default function getBaseQuery(feedType: string, followingFids: number[]) {
  if (feedType === FeedType.Recent) {
    const query = serverClient.from('posts_with_hypersub').select('*').not('likes', 'is', null);
    query.order('created_at', { ascending: false });
    return query;
  }

  if (feedType === FeedType.Trending) {
    const query = serverClient.from('trending_posts').select('*');
    query.order('score', { ascending: false });
    return query;
  }

  if (feedType === FeedType.Following) {
    const query = serverClient.from('posts_with_hypersub').select('*').not('likes', 'is', null);
    query.in('author->fid', followingFids);
    query.order('created_at', { ascending: false });
    return query;
  }

  if (feedType === FeedType.Posts) {
    const query = serverClient.from('posts').select('*');
    query.order('created_at', { ascending: false });
    return query;
  }
}
