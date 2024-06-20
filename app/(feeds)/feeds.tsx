'use client';

import { useEffect } from 'react';
import Feed from '@/components/Feed';
import Loader from '@/components/Loader';
import { useFeedProvider } from '@/providers/FeedProvider';
import InfiniteScroll from 'react-infinite-scroll-component';

import { VERCEL_URL } from '@/lib/consts';

const Feeds = ({ channelId }: { channelId?: string }) => {
  const { feed, fetchMore, hasMore, updateFilter, filter } = useFeedProvider();

  console.log(VERCEL_URL);

  useEffect(() => {
    if (!filter.channel && channelId !== '/') {
      updateFilter({ channel: channelId });
    }
  }, [channelId]);

  return (
    <InfiniteScroll
      dataLength={feed.length}
      next={() => fetchMore(feed.length)}
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
