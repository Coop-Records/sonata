import { Cast } from '@neynar/nodejs-sdk/build/neynar-api/v2';
import { VERCEL_URL } from '../consts';

const getSongLinksFromCasts = async (casts: Cast[]) => {
  try {
    const spotifyLinks = casts.map((cast) => {
      const match = cast.text.match(/https:\/\/open\.spotify\.com\/track\/[a-zA-Z0-9?=._-]+/);

      return match ? match[0] : null;
    });

    const songLinks: (null | Record<string, any>)[] = await Promise.all(
      spotifyLinks.map(async (trackUrl) => {
        if (!trackUrl) return null;

        const response = await fetch(
          `${VERCEL_URL}/api/songLink/fetchLink?trackUrl=${encodeURIComponent(trackUrl)}`,
        );
        const data = await response.json();
        return data;
      }),
    );

    return songLinks;
  } catch (error) {
    console.error('Error fetching Soundcloud URLs:', error);
    return null;
  }
};

export default getSongLinksFromCasts;
