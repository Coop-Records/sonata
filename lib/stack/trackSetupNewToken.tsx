import { CHAIN, SONG_MARKET_CONTRACT } from '@/lib/consts';
import { songMarketStack } from './client';
import normalizeEmbedUrl from '../sonata/song/normalizeEmbedUrl';

interface TrackMetadata {
  tokenId: number;
  songLinks: string[];
  chainId: number;
  collection: string;
}

async function trackSetupNewToken(account: string, tokenId: number, songLinks: string[]) {
  const metadata: TrackMetadata = {
    tokenId,
    songLinks: [normalizeEmbedUrl(songLinks[0])],
    chainId: CHAIN.id,
    collection: SONG_MARKET_CONTRACT,
  };
  const payload = { account, points: tokenId, metadata };
  console.log('SWEETS PAYLOAD', payload);
  const result = await songMarketStack.track('SetupNewToken', payload);
  if (!result?.success) {
    throw new Error('Failed to track SetupNewToken event');
  }
  return result;
}

export default trackSetupNewToken;
