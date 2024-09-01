import { SupabasePost } from '@/types/SupabasePost';
import fetchSongMarketForPost from './fetchSongMarketForPost';
import createSongToken from '@/lib/zora/createSongToken';
import { MINIMUM_NOTES_FOR_SONG_MARKET } from '@/lib/consts';
import handleSongMarketCreated from '../handleSongMarketCreated';

const marketHook = async (post: SupabasePost) => {
  const { totalNotes, songLinks } = await fetchSongMarketForPost(post);
  const precheckApproved = totalNotes >= MINIMUM_NOTES_FOR_SONG_MARKET;
  console.log('SWEETS precheckApproved', precheckApproved);
  if (!precheckApproved) return;
  const response = await createSongToken();
  console.log('SWEETS response', response);

  if (!response) return;
  const { newTokenId } = response;
  await handleSongMarketCreated(Number(newTokenId), songLinks, post);
};

export default marketHook;
