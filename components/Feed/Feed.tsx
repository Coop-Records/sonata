'use client';

import Cast from '@/components/Cast';
import { useCallback, useEffect, useRef } from 'react';
import { FeedType, useFeedProvider } from '@/providers/FeedProvider';
import { SupabasePost } from '@/types/SupabasePost';
import useFeed from '@/hooks/useFeed';
import Loader from '../Loader';

export default function Feed() {
  const { setFeed } = useFeedProvider();
  const { feed, getFeed, hasNextPage } = useFeed({
    feedType: FeedType.Trending,
  });
  const observerElem = useRef(null);

  useEffect(() => {
    setFeed(feed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [feed]);

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

  if (feed.length === 0) return <></>;

  return (
    <div className="max-w-full grow space-y-6">
      {feed.map((cast: SupabasePost) => (
        <Cast key={cast.post_hash} cast={cast} />
      ))}
      <div ref={observerElem} className="w-full h-4" />
      {hasNextPage && <Loader />}
      
    </div>
  );
}
