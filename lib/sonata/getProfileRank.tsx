import { Address } from 'viem';

const getProfileRank = async (wallets: Address[]) => {
  const options = {
    method: 'GET',
    headers: { accept: 'application/json' },
  } as any;

  try {
    const rankPromise = wallets.map(async (wallet) => {
      const queryParams = new URLSearchParams({
        wallet_address: wallet,
      });

      const response = await fetch(`/api/getLeaderboardRank?${queryParams}`, options);
      const data = await response.json();

      return data.leaderBoard;
    });

    const rank = await Promise.all(rankPromise);
    let lowestRank = Number.MAX_VALUE;
    rank.filter((obj: any) => {
      if (obj.rank && obj.rank < lowestRank) {
        lowestRank = obj;
      }
    });
    const rankObj: any = {
      rank: lowestRank,
    };
    return rankObj.rank;
  } catch (error) {
    console.error(error);
    return { error };
  }
};

export default getProfileRank;
