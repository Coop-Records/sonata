import { SupabasePost } from '@/types/SupabasePost';
import fetchSongMarketForPost from './fetchSongMarketForPost';
import createSongToken from '@/lib/zora/createSongToken';
import { MINIMUM_NOTES_FOR_SONG_MARKET } from '@/lib/consts';
import trackSetupNewToken from '@/lib/stack/trackSetupNewToken';

const marketHook = async (post: SupabasePost) => {
  const { totalNotes, songLinks } = await fetchSongMarketForPost(post);
  const precheckApproved = totalNotes >= MINIMUM_NOTES_FOR_SONG_MARKET;
  if (!precheckApproved) return;
  const response = await createSongToken();
  if (!response) return;
  const { newTokenId } = response;
  await trackSetupNewToken(Number(newTokenId), songLinks, post);
};

export default marketHook;
