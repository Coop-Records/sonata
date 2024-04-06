import getFeed from '@/lib/neynar/getFeed';
import { useEffect, useState } from 'react';

const useFeed = () => {
  const [feed, setFeed] = useState<any[]>([]);

  useEffect(() => {
    const init = async () => {
      const [response, soundCloud, soundxyz] = await Promise.all([
        getFeed('spotify.com/track'),
        getFeed('soundcloud.com'),
        getFeed('sound.xyz'),
      ]);
      console.log('SWEETS SOUND RESPONSE', soundxyz);

      const combinedFeeds = [...response.casts, ...soundCloud.casts, ...soundxyz.casts];
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
