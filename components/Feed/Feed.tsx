'use client';

import Cast from '@/components/Cast';
import { useEffect } from 'react';
import { FeedType, useFeedProvider } from '@/providers/FeedProvider';
import { SupabasePost } from '@/types/SupabasePost';
import useFeed from '@/hooks/useFeed';
import Loader from '../Loader';

export default function Feed() {
  const { setFeed } = useFeedProvider();
  const { feed, hasNextPage, observerElem } = useFeed({
    feedType: FeedType.Trending,
  });

  useEffect(() => {
    setFeed(feed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [feed]);

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
