import { SupabasePost } from '@/types/SupabasePost';
import fetchSongMarketForPost from './fetchSongMarketForPost';
import createSongToken from '@/lib/zora/createSongToken';
import { MINIMUM_NOTES_FOR_SONG_MARKET } from '@/lib/consts';
import trackSetupNewToken from '@/lib/stack/trackSetupNewToken';

const marketHook = async (post: SupabasePost) => {
  const { totalNotes, songLinks } = await fetchSongMarketForPost(post);
  console.log('totalNotes', totalNotes);
  console.log('songLinks', songLinks);
  if (totalNotes < MINIMUM_NOTES_FOR_SONG_MARKET) return;
  const response = await createSongToken();
  if (!response) return;
  const { newTokenId } = response;
  console.log('SWEETS TOKENID', newTokenId);

  await trackSetupNewToken(Number(newTokenId), songLinks, post);
};

export default marketHook;
