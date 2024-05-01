'use client';
import { Cast as CastType } from '@/types/Cast';
import { useEffect, useMemo } from 'react';
import { useFeedProvider } from '@/providers/FeedProvider';
import Cast from '@/components/Cast';
import filterFeed from '@/lib/filterFeed';

export default function Feed({ feed }: { feed: CastType[] }) {
  const { filter, setFeed } = useFeedProvider();

  useEffect(() => {
    setFeed(feed);
  }, [feed, setFeed]);

  const filteredFeed: any = useMemo(() => filterFeed(feed, filter), [filter, feed]);

  return (
    <div className="max-w-full grow space-y-6">
      {filteredFeed.map((cast: CastType) => (
        <Cast key={cast.hash} cast={cast} />
      ))}
    </div>
  );
}
