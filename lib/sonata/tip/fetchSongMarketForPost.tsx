import { VERCEL_URL } from '@/lib/consts';
import findValidEmbed from '@/lib/findValidEmbed';
import { SupabasePost } from '@/types/SupabasePost';

const fetchSongMarketForPost = async (post: SupabasePost): Promise<any> => {
  const songLink = findValidEmbed(post)?.url;
  if (songLink) {
    try {
      const response = await fetch(
        `${VERCEL_URL}/api/song/market?songLink=${encodeURIComponent(songLink)}`,
        {
          method: 'GET',
        },
      );
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error creating song market:', error);
    }
  }
};

export default fetchSongMarketForPost;
