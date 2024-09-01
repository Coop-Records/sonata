import { SupabasePost } from '@/types/SupabasePost';
import { generateTokenAddress } from '../generateTokenAddress';
import fetchMetadata from '../fetchMetadata';
import setSongMarketIdentity from '../stack/setSongMarketIdentity';
import trackSetupNewToken from '../stack/trackSetupNewToken';

async function handleSongMarketCreated(tokenId: number, songLinks: string[], post: SupabasePost) {
  const account = generateTokenAddress(tokenId);
  try {
    const trackResult = await trackSetupNewToken(account, tokenId, songLinks);
    console.log('SWEETS TRACK INCLUDES METADATA???', trackResult);
    const songMetadata = await fetchMetadata(songLinks[0], post);
    await setSongMarketIdentity(account, songMetadata, songLinks[0]);
    return trackResult;
  } catch (error) {
    console.error('Error tracking SetupNewToken event:', error);
    throw error;
  }
}

export default handleSongMarketCreated;
