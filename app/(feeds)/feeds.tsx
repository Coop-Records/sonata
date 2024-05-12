'use client';

import Feed from '@/components/Feed';
import Loader from '@/components/Loader';
import { useFeedProvider } from '@/providers/FeedProvider';
import InfiniteScroll from 'react-infinite-scroll-component';

const Feeds = () => {
  const { feed, fetchMore, hasMore } = useFeedProvider();

  return (
    <InfiniteScroll
      dataLength={feed.length}
      next={() => fetchMore(feed.length)}
      hasMore={hasMore}
      loader={<Loader className="w-full" />}
      endMessage={<p className="py-4 text-center text-sm">{`That's All!`}</p>}
      className="!overflow-y-hidden"
    >
      <Feed feed={feed} />
    </InfiniteScroll>
  );
};

export default Feeds;
