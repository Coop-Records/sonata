'use client';

import Cast from '@/components/Cast';
import { useEffect } from 'react';
import { useFeedProvider } from '@/providers/FeedProvider';
import { SupabasePost } from '@/types/SupabasePost';

export default function Feed({ feed }: { feed: SupabasePost[] }) {
  const { setFeed } = useFeedProvider();

  useEffect(() => {
    setFeed(feed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [feed]);

  return (
    <div className="max-w-full grow space-y-6">
      {feed.map((cast: SupabasePost) => (
        <Cast key={cast.post_hash} cast={cast} />
      ))}
    </div>
  );
}
