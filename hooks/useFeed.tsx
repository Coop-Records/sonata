import { useEffect, useState } from 'react';
import { useSupabaseProvider } from '@/providers/SupabaseProvider';
import { FeedType, useFeedProvider } from '@/providers/FeedProvider';

const useFeed = ({ feedType }: { feedType: string }) => {
  const [feed, setFeed] = useState<any[]>([]);
  const { supabaseClient } = useSupabaseProvider();
  const { filter } = useFeedProvider();

  const fetchPoints = async (start: number) => {
    if (feedType == FeedType.Recent) {
      const query = supabaseClient.from('posts').select('*').not('likes', 'is', null);

      if (filter?.platform) {
        query.eq('platform', filter.platform);
      }

      if (filter?.channel) {
        query.like('parent_url', `%${filter.channel}%`);
      }

      query.order('created_at', { ascending: false });
      query.range(start, start + 5);

      const { data: posts } = await query.returns();

      return {
        posts,
      };
    } else {
      const { data: posts } = await supabaseClient
        .from('trending_posts')
        .select('*')
        .order('score', { ascending: false })
        .range(start, start + 20); 
      return { posts };
    }
  };

  const getFeed = async (start: number) => {
    const { posts } = await fetchPoints(start);
    setFeed((prev) => {
      const mergedUnique = mergeArraysUniqueByPostHash(prev, posts);
      return mergedUnique;
    });
  };

  const mergeArraysUniqueByPostHash = (prev: any, posts: any) => {
    const map = new Map();
    const addItems = (items: any) => {
      for (const item of items) {
        if (!map.has(item.post_hash)) {
          map.set(item.post_hash, item);
        }
      }
    };
    addItems(prev);
    addItems(posts);
    return Array.from(map.values());
  };

  useEffect(() => {
    const init = async () => {
      await getFeed(0);
    };
    init();
  }, []);

  return { feed, getFeed };
};

export default useFeed;
