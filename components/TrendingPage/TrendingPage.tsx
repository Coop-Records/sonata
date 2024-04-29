'use client';
import Feed from '../Feed';
import { useFeedProvider } from '@/providers/FeedProvider';

const TrendingPage = () => {
  const { feed } = useFeedProvider();

  feed.sort((cast1: any, cast2: any) => {
    return cast2.reactions.likes.length - cast1.reactions.likes.length;
  });

  return (
    <div className="container flex justify-center py-12 font-helvetica bg-blend-color-burn">
      {feed?.length > 0 && <Feed feed={feed} />}
    </div>
  );
};

export default TrendingPage;
