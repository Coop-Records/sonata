import { CHAIN, SONG_MARKET_CONTRACT } from '@/lib/consts';
import { songMarketStack } from './client';

interface TrackMetadata {
  tokenId: number;
  songLinks: string[];
  chainId: number;
  collection: string;
}

async function trackSetupNewToken(account: string, tokenId: number, songLinks: string[]) {
  const metadata: TrackMetadata = {
    tokenId,
    songLinks,
    chainId: CHAIN.id,
    collection: SONG_MARKET_CONTRACT,
  };
  const result = await songMarketStack.track('SetupNewToken', { account, points: 1, metadata });
  if (!result?.success) {
    throw new Error('Failed to track SetupNewToken event');
  }
  return result;
}

export default trackSetupNewToken;
