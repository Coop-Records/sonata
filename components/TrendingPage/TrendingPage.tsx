'use client';

import Feed from '@/components/Feed';
import { useFeedProvider } from '@/providers/FeedProvider';
import { useEffect } from 'react';

const TrendingPage = () => {
  const { feed, sortTrending } = useFeedProvider();

  useEffect(() => {
    if (feed.length) {
      sortTrending(feed);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [feed]);

  return <Feed />;
};

export default TrendingPage;
