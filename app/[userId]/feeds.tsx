'use client';

import Feed from '@/components/Feed';
import Loader from '@/components/Loader';
import Tabs from '@/components/Tabs'
import { useFeedProvider } from '@/providers/FeedProvider';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Post } from '@/lib/consts';
import { Separator } from '@/components/ui/separator';

const Feeds = () => {
  const { feed, fetchMore, hasMore } = useFeedProvider();
  return (
    <div className='max-w-3xl'>
        <div className="justify-left flex">
            <Tabs tabs={Post} />
            
        </div>
        <Separator />
        <br></br>

    
        <InfiniteScroll
        dataLength={feed.length}
        next={() => fetchMore(feed.length)}
        hasMore={hasMore}
        loader={<Loader className="w-full" />}
        endMessage={<p className="py-4 text-center text-sm">{`That's All!`}</p>}
        className="!overflow-y-hidden"
        scrollableTarget="feed-container"
        >
        <Feed  feed={feed} />
        </InfiniteScroll>
    </div>
  );
};

export default Feeds;
