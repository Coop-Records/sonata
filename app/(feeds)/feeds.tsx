'use client';

import Feed from '@/components/Feed';
import useFeed from '@/hooks/useFeed';
import { FeedType, useFeedProvider } from '@/providers/FeedProvider';
import { useMemo } from 'react';

const Feeds = () => {
  const { feed } = useFeed();
  const { feedType } = useFeedProvider();
  const isTrending = feedType === FeedType.Trending;
  const isRecent = feedType === FeedType.Recent;

  const recentFeeds = useMemo(
    () =>
      [...feed].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()),
    [feed],
  );
  const trendingFeeds = useMemo(
    () =>
      [...feed].sort((cast1: any, cast2: any) => {
        return cast2.reactions.likes.length - cast1.reactions.likes.length;
      }),
    [feed],
  );

  return (
    <>
      <div className={`${isRecent ? 'hidden' : ''}`} key="trending">
        {trendingFeeds?.length ? <Feed feed={trendingFeeds} /> : <></>}
      </div>
      <div className={`${isTrending ? 'hidden' : ''}`} key="recent">
        {recentFeeds?.length ? <Feed feed={recentFeeds} /> : <></>}
      </div>
    </>
  );
};

export default Feeds;
