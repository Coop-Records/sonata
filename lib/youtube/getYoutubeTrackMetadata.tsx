import { TrackMetadata } from '@/types/Track';
import { SupabasePost } from '@/types/SupabasePost';
import getYoutubeVideoData from '../getYoutubeVideoData';

const getYoutubeTrackMetadata = async (url: string, cast: SupabasePost) => {
  const urlData = new URL(url);
  let videoId = urlData.searchParams.get('v');
  if (!videoId) videoId = urlData.pathname.replace('/', '');

  if (!videoId) {
    throw new Error('Could not find video id in url');
  }
  const youtubeData = await getYoutubeVideoData(videoId);
  return {
    id: youtubeData.id,
    type: 'youtube',
    artistName: youtubeData.snippet.channelTitle,
    trackName: youtubeData.snippet.title,
    artworkUrl: youtubeData.snippet.thumbnails.default.url,
    url: youtubeData.id,
    feedId: cast.id,
  } as TrackMetadata;
};

export default getYoutubeTrackMetadata;
