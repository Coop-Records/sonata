import { useEffect, useState } from 'react';
import { useSupabaseProvider } from '@/providers/SupabaseProvider';
import fetchPosts from '@/lib/fetchPosts';
import getSortedFeed from '@/lib/getSortedFeed';
import mergeArraysUniqueByPostHash from '@/lib/mergeArraysUniqueByPostHash';

const useFeed = ({ feedType }: { feedType: string }) => {
  const [feed, setFeed] = useState<any[]>([]);
  const { supabaseClient } = useSupabaseProvider();

  const getFeed = async (start: number) => {
    const { posts } = await fetchPosts(supabaseClient, feedType, start);
    setFeed((prev) => {
      const mergedUnique = mergeArraysUniqueByPostHash(prev, posts);
      const sortedFeed = getSortedFeed(mergedUnique, feedType);
      return sortedFeed;
    });
  };

  useEffect(() => {
    const init = async () => {
      await getFeed(0);
    };
    init();
  }, []);

  useEffect(() => {
    getFeed(0);
  }, []);

  return { feed, getFeed };
};

export default useFeed;
