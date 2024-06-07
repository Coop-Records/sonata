import { TrackMetadata } from '@/types/Track';
import { SupabasePost } from '@/types/SupabasePost';
import getYoutubeVideoData from '../getYoutubeVideoData';

const getYoutubeTrackMetadata = async (url: string, cast: SupabasePost) => {
  const queryParams = new URLSearchParams(url.split('?')[1]);
  const videoId = queryParams.get('v');
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
