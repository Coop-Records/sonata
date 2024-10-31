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
        hasMore={hasMore}
        next={() => fetchMore(feed.length)}
        loader={<Loader className="w-full py-2" />}
      >
        <Feed feed={feed} />
      </InfiniteScroll>
    </div>
  );
};

export default Feeds;
