'use client';

import { Cast as CastType } from '@/types/Cast';
import Cast from '@/components/Cast';
import useNewCasts from '@/hooks/useNewCasts';
import { useEffect } from 'react';
import { useFeedProvider } from '@/providers/FeedProvider';

export default function Feed({ feed }: { feed: CastType[] }) {
  const { setFeed } = useFeedProvider();
  useNewCasts();

  useEffect(() => {
    setFeed(feed);
  }, [feed]);

  return (
    <div className="max-w-full grow space-y-6">
      {feed.map((cast: CastType) => (
        <Cast key={cast.hash} cast={cast} />
      ))}
    </div>
  );
}
