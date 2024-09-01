import { SupabasePost } from '@/types/SupabasePost';
import { generateTokenAddress } from '../generateTokenAddress';
import fetchMetadata from '../fetchMetadata';
import setSongMarketIdentity from '../stack/setSongMarketIdentity';
import trackSetupNewToken from '../stack/trackSetupNewToken';
import normalizeEmbedUrl from './song/normalizeEmbedUrl';

async function handleSongMarketCreated(tokenId: number, songLinks: string[], post: SupabasePost) {
  const account = generateTokenAddress(tokenId);
  try {
    const trackResult = await trackSetupNewToken(account, tokenId, songLinks);
    const songMetadata = await fetchMetadata(songLinks[0], post);
    const songLink = normalizeEmbedUrl(songLinks[0]);
    await setSongMarketIdentity(account, songMetadata, songLink);
    return trackResult;
  } catch (error) {
    console.error('Error tracking SetupNewToken event:', error);
    throw error;
  }
}

export default handleSongMarketCreated;
