import { VERCEL_URL } from '../consts';

const getSongLinksFromCasts = async (casts: any[]) => {
  try {
    const spotifyLinks = casts
      .map((cast) => {
        const match = cast.text.match(/https:\/\/open\.spotify\.com\/track\/[a-zA-Z0-9?=._-]+/);
        return match ? match[0] : null;
      })
      .filter((link) => link !== null);
    const songLinks = await Promise.all(
      spotifyLinks.map(async (trackUrl) => {
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
    return false;
  }
};

export default getSongLinksFromCasts;
