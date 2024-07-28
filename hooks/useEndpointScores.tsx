import fetchLeaderboard from '@/lib/fetchLeaderboard';
import { endpoints as defaultEndpoints } from '@/lib/getEndpointsList';
import { useEffect, useState } from 'react';

const useEndpointScores = () => {
  const [endpoints, setEndpoints] = useState<any[]>(defaultEndpoints);

  useEffect(() => {
    const init = async () => {
      try {
        const response = await fetchLeaderboard();
        const { data } = response;
        const stackToScoreMap = data.leaderboard.reduce((acc: any, entry: any) => {
          const key = entry?.walletDetails?.linked_accounts?.[0]?.address?.split?.('@')?.[0];
          console.log('key:', key);
          const value = entry.points;
          console.log('value:', value);
          acc[key] = value;
          return acc;
        }, {});
        console.log('stackToScoreMap:', stackToScoreMap);

        const endpointsWithScores = defaultEndpoints.map((endpoint) => ({
          ...endpoint,
          score: stackToScoreMap[endpoint.stack] || 0,
        }));

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
