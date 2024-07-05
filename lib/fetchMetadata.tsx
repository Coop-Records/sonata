import { SupabasePost } from '@/types/SupabasePost';
import getSpotifyTrackMetadata from './spotify/getSpotifyTrackMetadata';
import getSoundcloudTrackMetadata from './soundcloud/getSoundcloudTrackMetadata';
import getSoundTrackMetadata from './sound/getSoundTrackMetadata';
import getYoutubeTrackMetadata from './youtube/getYoutubeTrackMetadata';
import getZoraTrackMetadata from './zora/getZoraTrackMetadata';

export default async function fetchMetadata(url: string, cast: SupabasePost) {
  if (url?.includes('spotify')) return await getSpotifyTrackMetadata(url, cast);
  if (url.includes('soundcloud')) return await getSoundcloudTrackMetadata(url, cast);
  if (url.includes('sound.xyz')) return await getSoundTrackMetadata(url, cast);
  if (url.includes('youtube.com')) return await getYoutubeTrackMetadata(url, cast);
  if (url.includes('youtu.be')) return await getYoutubeTrackMetadata(url, cast);
  if (url.includes('ipfs://')) return await getZoraTrackMetadata(url, cast);
}
