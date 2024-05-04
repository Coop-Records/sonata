import { Cast } from '@neynar/nodejs-sdk/build/neynar-api/v2';
import { useEffect, useState } from 'react';

const useNewCasts = () => {
  const [newCasts, setNewCasts] = useState<Cast[]>([]);

  useEffect(() => {
    const init = async () => {
      const newCastResponse = await fetch('/api/getNewCasts');
      const data = await newCastResponse.json();
      setNewCasts(data.allEntries);
    };
    init();
  }, []);

  return { newCasts };
};

export default useNewCasts;
