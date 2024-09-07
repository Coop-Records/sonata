import { endpoints as defaultEndpoints } from '@/lib/getEndpointsList';
import getEndpointsWithScores from '@/lib/getEndpointsWithScores';
import { useEffect, useState } from 'react';

const useEndpointScores = () => {
  const [endpoints, setEndpoints] = useState<any[]>(defaultEndpoints);

  useEffect(() => {
    const init = async () => {
      try {
        const endpointsWithScores = await getEndpointsWithScores();
        const sortedEndpoints = endpointsWithScores.sort((a, b) => b.score - a.score);
        setEndpoints(sortedEndpoints);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      }
    };

    init();
  }, []);

  return { endpoints };
};

export default useEndpointScores;
