import { SupabasePost } from '@/types/SupabasePost';
import fetchSongMarketForPost from './fetchSongMarketForPost';
import createSongToken from '@/lib/zora/createSongToken';
import { MINIMUM_NOTES_FOR_SONG_MARKET } from '@/lib/consts';

const marketHook = async (post: SupabasePost) => {
  const { totalNotes } = await fetchSongMarketForPost(post);
  console.log('totalNotes', totalNotes);

  if (totalNotes < MINIMUM_NOTES_FOR_SONG_MARKET) return;
  await createSongToken();
};

export default marketHook;
