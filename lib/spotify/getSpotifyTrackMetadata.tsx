import { TrackMetadata } from '@/types/Track';
import getSpotifyTrackId from './getSpotifyTrackId';
import { SupabasePost } from '@/types/SupabasePost';
import getSoundcloudTrackMetadata from '../soundcloud/getSoundcloudTrackMetadata';
import getYoutubeTrackMetadata from '@/lib/youtube/getYoutubeTrackMetadata';

const getSpotifyTrackMetadata = async (url: string, cast: SupabasePost): Promise<TrackMetadata> => {
  const youtubeLink = cast.alternativeEmbeds?.find((link) => link.includes('youtube.com'));
  const soundcloudLink = cast.alternativeEmbeds?.find((link) => link.includes('soundcloud.com'));

  if (youtubeLink) {
    return await getYoutubeTrackMetadata(youtubeLink, cast);
  }

  if (soundcloudLink) {
    return await getSoundcloudTrackMetadata(soundcloudLink, cast);
  }

  const oEmbedUrl = `https://open.spotify.com/oembed?url=${encodeURIComponent(url)}`;
  const response = await fetch(oEmbedUrl);
  const embedData = await response.json();
  const trackId = getSpotifyTrackId(embedData.iframe_url);

  return {
    type: 'spotify',
    id: trackId,
    artistName: '',
    trackName: embedData.title,
    artworkUrl: embedData.thumbnail_url,
    url: `spotify:track:${trackId}`,
    feedId: cast.id,
  } as TrackMetadata;
};

export default getSpotifyTrackMetadata;
