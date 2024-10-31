import { TrackMetadata } from '@/types/Track';
import { SupabasePost } from '@/types/SupabasePost';
import getSongLinkData from '@/lib/songLink/getSongLinkData';

const getSpotifyTrackMetadata = async (url: string, cast: SupabasePost): Promise<TrackMetadata> => {
  let songLinkData;
  {
    if (cast.alternativeEmbeds.length) {
      songLinkData = cast.alternativeEmbeds[0];
    } else {
      songLinkData = await getSongLinkData(url);
    }
  }
  const spotifyKey = songLinkData.linksByPlatform.spotify.entityUniqueId;
  const spotifyData = songLinkData.entitiesByUniqueId[spotifyKey];

  return {
    type: 'spotify',
    id: spotifyData.id,
    artistName: spotifyData.artistName,
    trackName: spotifyData.title,
    artworkUrl: spotifyData.thumbnailUrl,
    url: `spotify:track:${spotifyData.id}`,
    feedId: cast.id,
  } as TrackMetadata;
};

export default getSpotifyTrackMetadata;
