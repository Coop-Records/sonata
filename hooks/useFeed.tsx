import { useEffect, useState } from 'react';
import { useSupabaseProvider } from '@/providers/SupabaseProvider';
import { useFeedProvider } from '@/providers/FeedProvider';
import fetchPosts from '@/lib/fetchPosts';

const useFeed = ({ feedType }: { feedType: string }) => {
  const [feed, setFeed] = useState<any[]>([]);
  const { supabaseClient } = useSupabaseProvider();
  const { filter } = useFeedProvider();

  const getFeed = async (start: number) => {
    console.log('SWEETS GETTING FEED', start);
    console.log('SWEETS filter', filter);
    const { posts } = await fetchPosts(supabaseClient, filter, feedType, start);
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
