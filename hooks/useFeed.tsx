import { useCallback, useEffect, useRef, useState } from 'react';
import { useSupabaseProvider } from '@/providers/SupabaseProvider';
import { useFeedProvider } from '@/providers/FeedProvider';
import fetchPosts from '@/lib/fetchPosts';
import getSortedFeed from '@/lib/getSortedFeed';
import mergeArraysUniqueByPostHash from '@/lib/mergeArraysUniqueByPostHash';

const useFeed = ({ feedType }: { feedType: string }) => {
  const [feed, setFeed] = useState<any[]>([]);
  const { supabaseClient } = useSupabaseProvider();
  const { filter, activeFeed } = useFeedProvider();
  const [hasNextPage, setHasNextPage] = useState(true);
  const observerElem = useRef(null);

  const getFeed = async (start: number) => {
    const { posts } = (await fetchPosts(supabaseClient, filter, feedType, start)) as any;
    setHasNextPage(posts.length > 0);
    setFeed((prev) => {
      const filteredPrev = filter.channel
        ? prev.filter((item) => item.channelId === filter.channel)
        : prev;
      if (activeFeed) filteredPrev.push(activeFeed);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (filter.channel) {
      getFeed(0);
    } else {
      getFeed(feed.length);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter.channel]);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting && hasNextPage) {
        getFeed(feed.length);
      }
    },
    [feed, hasNextPage],
  );

  useEffect(() => {
    if (!observerElem.current) return;
    const element: HTMLDivElement = observerElem.current;
    const option = { threshold: 0 };

    const observer = new IntersectionObserver(handleObserver, option);
    observer.observe(element);
    return () => observer.unobserve(element);
  }, [handleObserver]);

  return { feed, getFeed, hasNextPage, observerElem };
};

export default useFeed;
