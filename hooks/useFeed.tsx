import getFeed from '@/lib/neynar/getFeed';
import { useEffect, useState } from 'react';

const useFeed = () => {
  const [feed, setFeed] = useState<any[]>([]);

  useEffect(() => {
    const init = async () => {
      const [response, soundCloud, soundxyz, zora] = await Promise.all([
        getFeed('spotify.com/track'),
        getFeed('soundcloud.com'),
        getFeed('sound.xyz'),
        getFeed('zora.co'),
      ]);

      const combinedFeeds = [
        ...response.casts,
        ...soundCloud.casts,
        ...soundxyz.casts,
        ...zora.casts,
      ];
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
