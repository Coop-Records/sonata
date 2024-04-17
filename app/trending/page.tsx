'use client';

import Feed from '@/components/Feed';
import { useFeedProvider } from '@/providers/FeedProvider';

export default function Trending() {
  const { feed } = useFeedProvider();

  const trendingFeed = feed.sort((cast1: any, cast2: any) => {
    return (
      cast2.reactions.likes.length +
      cast2.reactions.recasts.length -
      (cast1.reactions.likes.length + cast1.reactions.recasts.length)
    );
  });

  return (
    <div className="container pt-10 flex flex-col gap-8 items-center">
      <h1 className="text-3xl">Trending</h1>
      <Feed feed={trendingFeed} />
    </div>
  );
}
