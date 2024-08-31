import getStackClient from '@/lib/stack/client';
import { SONG_MARKET_POINT_SYSTEM_ID } from '@/lib/consts';
import { generateTokenAddress } from '../generateTokenAddress';

const trackSetupNewToken = async (tokenId: number) => {
  const stack = getStackClient(SONG_MARKET_POINT_SYSTEM_ID);

  try {
    const account = generateTokenAddress(tokenId);
    console.log('Token Address:', account);
    const leaderboard = await stack.getLeaderboard();
    console.log('Leaderboard:', leaderboard);

    const result = await stack.track('SetupNewToken', {
      account,
      points: 1,
      metadata: { tokenId },
    });
    if (!result?.success) {
      throw new Error('Failed to track SetupNewToken event');
    }

    await stack.setIdentity(account, {
      identity: 'El Día De Mi Suerte',
      pfpUrl: 'https://i.ytimg.com/vi/mXZRB_al3fs/default.jpg',
      externalUrl: 'https://sonata.tips/song/https://www.youtube.com/watch?v=mXZRB_al3fs',
    });

    return result;
  } catch (error) {
    console.error('Error tracking SetupNewToken event:', error);
    throw error;
  }
};

export default trackSetupNewToken;
