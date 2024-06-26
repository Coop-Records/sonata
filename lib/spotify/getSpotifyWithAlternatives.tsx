import { Cast } from '@neynar/nodejs-sdk/build/neynar-api/v2';
import getSongLinksFromCasts from './getSongLinksFromCasts';

const getSpotifyWithAlternatives = async (spotify: Cast[]) => {
  try {
    const spotifySongLinks = await getSongLinksFromCasts(spotify);
    if (!spotifySongLinks) return spotify;

    return spotify.map((cast, index) => {
      const data = spotifySongLinks[index];
      if (!data) return cast;

      const alternativeEmbeds = Object.values<any>(data.linksByPlatform).map(({ url }) => url);

      return { ...cast, alternativeEmbeds };
    });
  } catch (err) {
    console.error('Error fetching Spotify URLs:', err);
    return spotify;
  }
};

export default getSpotifyWithAlternatives;
