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
    let rankLeaderBoard = rank.reduce(function (res, obj) {
      return obj.rank < res.rank ? obj : res;
    });
    return rankLeaderBoard.rank;
  } catch (error) {
    console.error(error);
    return { error };
  }
};

export default getProfileRank;
