import getFeed from '@/lib/neynar/getFeed';
import { useEffect, useState } from 'react';

const useFeed = () => {
  const [feed, setFeed] = useState<any[]>([]);

  useEffect(() => {
    const init = async () => {
      const response = await getFeed('spotify.com/track');
      const soundCloud = await getFeed('soundcloud.com');
      console.log('SWEETS SOUNDCLOUD', soundCloud);
      setFeed([...response.casts, ...soundCloud.casts]);
    };
    init();
  }, []);

  return { feed };
};

export default useFeed;
