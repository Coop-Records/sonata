import { useEffect, useState } from 'react';
import { useSupabaseProvider } from '@/providers/SupabaseProvider';
import { useFeedProvider } from '@/providers/FeedProvider';
import fetchPosts from '@/lib/fetchPosts';
import getSortedFeed from '@/lib/getSortedFeed';
import mergeArraysUniqueByPostHash from '@/lib/mergeArraysUniqueByPostHash';

const useFeed = ({ feedType }: { feedType: string }) => {
  const [feed, setFeed] = useState<any[]>([]);
  const { supabaseClient } = useSupabaseProvider();
  const { filter } = useFeedProvider();

  const getFeed = async (start: number) => {
    const { posts } = await fetchPosts(supabaseClient, filter, feedType, start);
    setFeed((prev) => {
      const filteredPrev = filter.channel
        ? prev.filter((item) => item.channelId === filter.channel)
        : prev;
      const mergedUnique = mergeArraysUniqueByPostHash(filteredPrev, posts);
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
    if (filter.channel) {
      getFeed(0);
    } else {
      getFeed(feed.length);
    }
  }, [filter.channel]);

  return { feed, getFeed };
};

export default useFeed;
