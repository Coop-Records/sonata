import { useEffect, useState } from 'react';
import { useSupabaseProvider } from '@/providers/SupabaseProvider';
import { useFeedProvider } from '@/providers/FeedProvider';
import fetchPosts from '@/lib/fetchPosts';
import getSortedFeed from '@/lib/getSortedFeed';

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
      console.log('SWEETS merged', mergedUnique);
      console.log('SWEETS sortedFeed', sortedFeed);
      return sortedFeed;
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

  useEffect(() => {
    if (filter.channel) {
      getFeed(0);
    } else {
      getFeed(feed.length);
    }
  }, [filter.channel]);

  // TODO: sort this feed based on feedType
  return { feed, getFeed };
};

export default useFeed;
