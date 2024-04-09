import getCombinedFeed from '@/lib/getCombinedFeed';
import getZoraFeed from '@/lib/zora/getZoraFeed';
import { useEffect, useState } from 'react';

const useFeed = () => {
  const [feed, setFeed] = useState<any[]>([]);

  useEffect(() => {
    const init = async () => {
      const combinedFeeds = await getCombinedFeed();
      setFeed(combinedFeeds);
      const zoraResponse = await getZoraFeed();
      console.log('SWEETS ZORA RESPONSE', zoraResponse);
    };
    init();
  }, []);

  return { feed };
};

export default useFeed;
