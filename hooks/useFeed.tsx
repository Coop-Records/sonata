import getCombinedFeeds from '@/lib/neynar/getCombinedFeeds';
import { Cast } from '@neynar/nodejs-sdk/build/neynar-api/v2';
import { useEffect, useState } from 'react';

const useFeed = () => {
  const [feed, setFeed] = useState<Cast[]>([]);
  const [sorted, setSorted] = useState<Cast[]>([]);
  const [sortOrder, setSortOrder] = useState<'trending' | 'recent'>('trending');

  const sortTrending = (originalFeed = [...feed]) => {
    originalFeed.sort((cast1: any, cast2: any) => {
      return cast2.reactions.likes.length - cast1.reactions.likes.length;
    });
    setSorted(originalFeed);
    setSortOrder('trending');
  };

  const sortRecent = (originalFeed = [...feed]) => {
    originalFeed.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    setSorted(originalFeed);
    setSortOrder('recent');
  };

  useEffect(() => {
    const init = async () => {
      const response = await getCombinedFeeds();
      setFeed(response);
      if (sortOrder === 'recent') {
        sortRecent(response);
        return;
      }
      sortTrending(response);
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { feed, sortRecent, sorted, sortTrending };
};

export default useFeed;
