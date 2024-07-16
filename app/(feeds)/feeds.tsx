'use client';

import { useEffect } from 'react';
import Feed from '@/components/Feed';
import Loader from '@/components/Loader';
import { useFeedProvider } from '@/providers/FeedProvider';
import InfiniteScroll from 'react-infinite-scroll-component';

const Feeds = ({ channelId }: { channelId?: string }) => {
  const { feed, fetchMore, updateFilter, filter } = useFeedProvider();
  const hasMore = false;
  useEffect(() => {
    if (!filter.channel && channelId !== '/') {
      updateFilter({ channel: channelId });
    }
  }, [channelId]);

  return (
    <InfiniteScroll
      dataLength={feed.length}
      next={() => fetchMore()}
      hasMore={hasMore}
      loader={<Loader className="w-full" />}
      endMessage={<p className="py-4 text-center text-sm">{`That's All!`}</p>}
      className="!overflow-y-hidden"
      scrollableTarget="feed-container"
    >
      <Feed feed={feed} />
    </InfiniteScroll>
  );
};

export default Feeds;
