'use client';

import useFeed from '@/hooks/useFeed';
import Feed from '../Feed';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from '../Loader';
import { FeedType } from '@/providers/FeedProvider';

export default function TrendingComponent() {
  const { feed, getFeed } = useFeed({ feedType: FeedType.Trending });

  return feed?.length > 0 ? (
    <InfiniteScroll
      dataLength={feed.length}
      next={getFeed}
      hasMore={true}
      loader={<Loader className="w-full" />}
      className="!overflow-y-hidden"
    >
      <Feed feed={feed} />
    </InfiniteScroll>
  ) : (
    <></>
  );
}
