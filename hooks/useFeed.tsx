import getFeed from '@/lib/neynar/getFeed';
import { useEffect, useState } from 'react';

const useFeed = () => {
  const [feed, setFeed] = useState<any[]>([]);

  useEffect(() => {
    const init = async () => {
      const response = await getFeed('spotify.com/track');
      const soundCloud = await getFeed('soundcloud.com');
      const combinedFeeds = [...response.casts, ...soundCloud.casts];
      const sortedFeeds = combinedFeeds.sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
      );

      setFeed(sortedFeeds);
    };
    init();
  }, []);

  return { feed };
};

export default useFeed;
