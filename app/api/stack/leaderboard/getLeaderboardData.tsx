import getAllEndpointWallets from '@/lib/privy/getAllEndpointWallets';
import { stack } from '@/lib/stack/client';

const getLeaderboardData = async () => {
  const stackData = await stack.getLeaderboard();
  const wallets = await getAllEndpointWallets();

  const walletMap = wallets.reduce((map, wallet) => {
    wallet.linked_accounts.forEach((account: any) => {
      if (account.type === 'wallet') {
        map[account.address.toLowerCase()] = wallet;
      }
    });
    return map;
  }, {});

  const mergedLeaderboard = stackData.leaderboard.map((entry) => {
    const walletDetails = walletMap[entry.address.toLowerCase()] || {};
    return { ...entry, walletDetails };
  });

  return {
    leaderboard: mergedLeaderboard,
    metadata: stackData.metadata,
    stats: stackData.stats,
    pointSystem: (stackData as any)?.pointSystem,
  };
};

export default getLeaderboardData;
