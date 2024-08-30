import { VERCEL_URL } from '@/lib/consts';
import findValidEmbed from '@/lib/findValidEmbed';

const fetchSongMarketForPost = async (post: any): Promise<any> => {
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
      console.log('Song market creation result:', result);
      return result;
    } catch (error) {
      console.error('Error creating song market:', error);
    }
  }
};

export default fetchSongMarketForPost;
