import getAlternativeLinks from '../songLink/getAlternativeLinks';
import getSongLinksFromCasts from './getSongLinksFromCasts';
import mergeWithAlternatives from './mergeWithAlternatives';

const getSpotifyWithAlternatives = async (spotify: any[]) => {
  const spotifySongLinks = await getSongLinksFromCasts(spotify);
  const spotifyAlternative = getAlternativeLinks(spotifySongLinks);
  return mergeWithAlternatives(spotify, spotifyAlternative);
};

export default getSpotifyWithAlternatives;
