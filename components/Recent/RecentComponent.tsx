'use client';

import useFeed from '@/hooks/useFeed';
import Feed from '../Feed';

export default function RecentComponent() {
  const { feed } = useFeed();

  feed.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return feed?.length > 0 ? <Feed feed={feed} /> : <></>;
}
