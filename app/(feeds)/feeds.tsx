'use client';

import RecentComponent from '@/components/Recent/RecentComponent';
import TrendingComponent from '@/components/Trending/TrendingComponent';
import { FeedType, useFeedProvider } from '@/providers/FeedProvider';

const Feeds = () => {
  const { feedType } = useFeedProvider();
  const isTrending = feedType === FeedType.Trending;
  const isRecent = feedType === FeedType.Recent;

  return (
    <>
      <div className={`${isRecent ? 'hidden' : ''}`}>
        <TrendingComponent />
      </div>
      <div className={`${isTrending ? 'hidden' : ''}`}>
        <RecentComponent />
      </div>
    </>
  );
};

export default Feeds;
