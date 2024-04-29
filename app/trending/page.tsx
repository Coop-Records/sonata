'use client';

import Feed from '@/components/Feed';
import { useFeedProvider } from '@/providers/FeedProvider';

export default function Trending() {
  const { feed } = useFeedProvider();

  const trendingFeed =
    feed?.length &&
    feed.toSorted((cast1: any, cast2: any) => {
      return cast2.reactions.likes.length - cast1.reactions.likes.length;
    });

  return (
    <div className="container flex flex-col items-center gap-8 pt-10">
      <h1 className="text-3xl">Trending</h1>
      {trendingFeed?.length && <Feed feed={trendingFeed} />}
    </div>
  );
}
