'use client';

import getCombinedFeeds from '@/lib/neynar/getCombinedFeeds';
import Feed from '@/components/Feed';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function Trending() {
  const [feed, setFeed] = useState([]) as any;
  const params = useSearchParams();
  const type = params.get('type');

  useEffect(() => {
    const init = async () => {
      const response = (await getCombinedFeeds()) as any;
      setFeed(response);
    };
    init();
  }, []);

  const recent = [...feed].sort(
    (a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  );
  const trending = [...feed].sort((cast1: any, cast2: any) => {
    return cast2.reactions.likes.length - cast1.reactions.likes.length;
  });

  return (
    <>
      <div className={`${type === 'trending' && 'hidden'}`}>
        <Feed feed={recent} />
      </div>
      <div className={`${type === 'recent' && 'hidden'}`}>
        <Feed feed={trending} />
      </div>
    </>
  );
}
