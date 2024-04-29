'use client';
import Feed from '../Feed';
import { useFeedProvider } from '@/providers/FeedProvider';

const RecentPage = () => {
  const { feed } = useFeedProvider();

  feed.sort(
    (a: { timestamp: string | number | Date }, b: { timestamp: string | number | Date }) =>
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  );

  return (
    <div className="container flex justify-center py-12 font-helvetica bg-blend-color-burn">
      {feed?.length > 0 && <Feed feed={feed} />}
    </div>
  );
};

export default RecentPage;
