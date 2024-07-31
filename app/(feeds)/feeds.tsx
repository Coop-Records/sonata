'use client';

import { useEffect } from 'react';
import Feed from '@/components/Feed';
import Loader from '@/components/Loader';
import { useFeedProvider } from '@/providers/FeedProvider';
import InfiniteScroll from 'react-infinite-scroll-component';
import { FeedType } from '@/types/Feed';
import FeedStakes from '@/components/Feed/FeedStakes';
import useStakeFeed from '@/hooks/useStakeFeed';
import { useProfileProvider } from '@/providers/ProfileProvider';

const Feeds = ({ channelId }: { channelId?: string }) => {
  const { feed, fetchMore, hasMore, updateFilter, filter, feedType } = useFeedProvider();
  const { profile } = useProfileProvider();
  const { loading, feedStake } = useStakeFeed(feedType, profile?.fid);
  const isStake = feedType === FeedType.Stakes;

  useEffect(() => {
    if (!filter.channel && channelId !== '/') {
      updateFilter({ channel: channelId });
    }
  }, [channelId]);

  return (
    <InfiniteScroll
      dataLength={isStake ? feedStake.length : feed.length}
      next={() => fetchMore(feed.length)}
      hasMore={isStake ? loading : hasMore}
      loader={<Loader className="w-full" />}
      endMessage={<p className="py-4 text-center text-sm">{isStake ? "" : "That's All!"}</p>}
      className="!overflow-y-hidden"
      scrollableTarget="feed-container"
    >
      {isStake ? <FeedStakes feed={feedStake} /> : <Feed feed={feed} />}
    </InfiniteScroll>
  );
};

export default Feeds;
