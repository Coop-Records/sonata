import getSortedFeeds from '@/lib/neynar/getCombinedFeeds';
import { useEffect, useState } from 'react';

const useFeed = () => {
  const [feed, setFeed] = useState<any[]>([]);

  useEffect(() => {
    const init = async () => {
      const sortedFeeds = await getSortedFeeds();
      setFeed(sortedFeeds);
    };
    init();
  }, []);

  return { feed };
};

export default useFeed;
