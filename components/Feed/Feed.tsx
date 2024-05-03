'use client';

import { useFeedProvider } from '@/providers/FeedProvider';
import Cast from '@/components/Cast';
import Loader from '@/components/Loader';
import useNewCasts from '@/hooks/useNewCasts';
import { SupabasePost } from '@/types/SupabasePost';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function Feed() {
  const { feed, loading, fetchMore } = useFeedProvider();
  useNewCasts();

  return (
    <div className="w-full grow space-y-6">
      {loading ? (
        <Loader className="w-full" />
      ) : (
        <InfiniteScroll
          dataLength={feed.length}
          next={fetchMore}
          hasMore={true}
          loader={<Loader className="w-full" />}
        >
          {feed.map((cast: SupabasePost) => (
            <Cast key={cast.post_hash} cast={cast} />
          ))}
        </InfiniteScroll>
      )}
    </div>
  );
}
