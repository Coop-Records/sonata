import { SupabasePost } from '@/types/SupabasePost';
import fetchSongMarketForPost from './fetchSongMarketForPost';
import creatorClient from '@/lib/zora/getCreatorClient';

const marketHook = async (post: SupabasePost) => {
  const { totalNotes } = await fetchSongMarketForPost(post);
  console.log('totalNotes', totalNotes);
  console.log('zora creatorClient', creatorClient);
};

export default marketHook;
