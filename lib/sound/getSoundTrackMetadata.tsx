import { TrackMetadata } from '@/types/Track';
import { SupabasePost } from '@/types/SupabasePost';
import extractSoundArtistAndTrack from './extractSoundArtistAndTrack';
import getReleaseInfo from './getReleaseInfo';

const getSoundTrackMetadata = async (url: string, cast: SupabasePost) => {
  const { artist, trackName } = extractSoundArtistAndTrack(url);
  const releaseInfo = await getReleaseInfo(artist, trackName);

  return {
    id: releaseInfo.id,
    type: 'soundxyz',
    artistName: releaseInfo.artist.name,
    trackName: releaseInfo.title,
    artworkUrl: releaseInfo.coverImage.url,
    url: releaseInfo?.track?.audio?.audio128k?.url,
    feedId: cast.id,
  } as TrackMetadata;
};

export default getSoundTrackMetadata;
