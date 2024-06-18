import { Address } from 'viem';

const getProfileRank = async (wallets: Address[]) => {
  const options = {
    method: 'GET',
    headers: { accept: 'application/json' },
  } as any;

  try {
    const ranksPromise = wallets.map(async (wallet) => {
      const queryParams = new URLSearchParams({
        wallet_address: wallet,
      });

      const response = await fetch(`/api/getLeaderboardRank?${queryParams}`, options);
      const data = await response.json();
      return data.leaderBoard.rank;
    });

    const ranks = await Promise.all(ranksPromise);

    const validRanks = ranks.filter((rank) => rank !== null && rank !== undefined);

    if (validRanks.length === 0) {
      return null;
    }

    const highestRank = Math.min(...validRanks);
    return highestRank;
  } catch (error) {
    console.error(error);
    return { error };
  }
};

export default getProfileRank;
