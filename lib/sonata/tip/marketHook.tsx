import { SupabasePost } from '@/types/SupabasePost';
import fetchSongMarketForPost from './fetchSongMarketForPost';
import createSongToken from '@/lib/zora/createSongToken';
import { MINIMUM_NOTES_FOR_SONG_MARKET } from '@/lib/consts';
import handleSongMarketCreated from '../handleSongMarketCreated';

const marketHook = async (post: SupabasePost) => {
  const { totalNotes, songLinks, collection } = await fetchSongMarketForPost(post);
  const precheckApproved = totalNotes >= MINIMUM_NOTES_FOR_SONG_MARKET;
  if (!precheckApproved) return;

  if (collection?.tokenId) {
    console.log('Song market already exists, skipping creation');
    return;
  }

  const response = await createSongToken(songLinks[0]);
  if (!response) return;
  const { newTokenId } = response;
  await handleSongMarketCreated(Number(newTokenId), songLinks, post);
};

export default marketHook;
