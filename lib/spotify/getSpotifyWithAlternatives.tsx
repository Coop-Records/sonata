import getAlternativeLinks from '../songLink/getAlternativeLinks';
import getSongLinksFromCasts from './getSongLinksFromCasts';
import mergeWithAlternatives from './mergeWithAlternatives';

const getSpotifyWithAlternatives = async (spotify: any[]) => {
  try {
    const spotifySongLinks = await getSongLinksFromCasts(spotify);
    if (!spotifySongLinks) return spotify;
    const spotifyAlternative = getAlternativeLinks(spotifySongLinks);
    return mergeWithAlternatives(spotify, spotifyAlternative);
  } catch (err) {
    console.error('Error fetching Spotify URLs:', err);
    return spotify;
  }
};

export default getSpotifyWithAlternatives;
