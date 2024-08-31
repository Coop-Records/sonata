import getStackClient from '@/lib/stack/client';
import { CHAIN, SONG_MARKET_CONTRACT, SONG_MARKET_POINT_SYSTEM_ID } from '@/lib/consts';
import { generateTokenAddress } from '../generateTokenAddress';
import fetchMetadata from '../fetchMetadata';
import { SupabasePost } from '@/types/SupabasePost';

const trackSetupNewToken = async (tokenId: number, songLinks: string[], post: SupabasePost) => {
  const stack = getStackClient(SONG_MARKET_POINT_SYSTEM_ID);
  try {
    const account = generateTokenAddress(tokenId);
    console.log('Token Address:', account);

    const result = await stack.track('SetupNewToken', {
      account,
      points: 1,
      metadata: { tokenId, songLinks, chainId: CHAIN.id, collection: SONG_MARKET_CONTRACT },
    });
    if (!result?.success) {
      throw new Error('Failed to track SetupNewToken event');
    }

    const metadata = await fetchMetadata(songLinks[0], post);
    console.log('stack track result', result);
    console.log('find title in metadata', metadata);

    await stack.setIdentity(account, {
      identity: metadata.trackName,
      pfpUrl: metadata.artworkUrl,
      externalUrl: `https://sonata.tips/song/${songLinks[0]}`,
    });

    return result;
  } catch (error) {
    console.error('Error tracking SetupNewToken event:', error);
    throw error;
  }
};

export default trackSetupNewToken;
