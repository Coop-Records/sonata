import { TrackMetadata } from '@/types/Track';
import { SupabasePost } from '@/types/SupabasePost';
import getSongLinks from '@/lib/songLink/getSongLinks';

const getSpotifyTrackMetadata = async (url: string, cast: SupabasePost): Promise<TrackMetadata> => {
  const { data: songLinkData } = await getSongLinks(url);
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
