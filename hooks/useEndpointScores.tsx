import { endpoints as defaultEndpoints } from '@/lib/getEndpointsList';
import getEndpointsWithScores from '@/lib/getEndpointsWithScores';
import { useEffect, useState } from 'react';

const useEndpointScores = () => {
  const [endpoints, setEndpoints] = useState<any[]>(defaultEndpoints);

  useEffect(() => {
    const init = async () => {
      try {
        const endpointsWithScores = await getEndpointsWithScores();
        setEndpoints(endpointsWithScores);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      }
    };

    init();
  }, []);

  return { endpoints };
};

export default useEndpointScores;
