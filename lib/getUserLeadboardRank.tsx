import { stack } from './stack/client';

export async function getUserLeaderboardRanks(verifications: any[]) {
  const leaderboardRanks = await Promise.all(
    verifications.map(async (verification: any) => {
      const leaderboardData = await stack.getLeaderboardRank(verification);
      if (leaderboardData) {
        return leaderboardData.rank;
      }
    }),
  );
  return leaderboardRanks.filter((rank) => rank !== null && rank !== undefined);
}
