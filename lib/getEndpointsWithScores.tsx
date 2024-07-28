import fetchLeaderboard from './fetchLeaderboard';
import { endpoints } from './getEndpointsList';

const getEndpointsWithScores = async () => {
  const response = await fetchLeaderboard();
  const { data } = response;
  const stackToScoreMap = data.leaderboard.reduce((acc: any, entry: any) => {
    const key = entry?.walletDetails?.linked_accounts?.[0]?.address?.split?.('@')?.[0];
    const value = entry.points;
    acc[key] = value;
    return acc;
  }, {});
  const endpointsWithScores = endpoints.map((endpoint) => ({
    ...endpoint,
    score: stackToScoreMap[endpoint.stack] || 0,
  }));
  return endpointsWithScores;
};

export default getEndpointsWithScores;
