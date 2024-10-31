'use client';

import Feed from '@/components/Feed';
import Loader from '@/components/Loader';
import InfiniteScroll from '@/components/ui/infinite-scroll';
import { useFeedProvider } from '@/providers/FeedProvider';

const Feeds = () => {
  const { feed, fetchMore, hasMore } = useFeedProvider();

  return (
    <div id="feed-container">
      <InfiniteScroll
        next={() => fetchMore(feed.length)}
        hasMore={hasMore}
        loader={<Loader className="w-full py-2" />}
        endMessage={<p className="py-4 text-center text-sm">{`That's All!`}</p>}
      >
        <Feed feed={feed} />
      </InfiniteScroll>
    </div>
  );
};

export default Feeds;
