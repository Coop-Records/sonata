import { TrackMetadata } from '@/types/Track';
import { SupabasePost } from '@/types/SupabasePost';
import getYoutubeVideoData from '../getYoutubeVideoData';

const getYoutubeTrackMetadata = async (url: string, cast: SupabasePost): Promise<TrackMetadata> => {
  try {
    const urlData = new URL(url);
    let videoId = urlData.searchParams.get('v');
    if (!videoId) videoId = urlData.pathname.replace('/', '');

    if (!videoId) {
      throw new Error('Could not find video id in url');
    }

    const youtubeData = await getYoutubeVideoData(videoId);

    if (!youtubeData || !youtubeData.id || !youtubeData.snippet) {
      throw new Error('Invalid response from YouTube API');
    }

    return {
      id: youtubeData.id,
      type: 'youtube',
      artistName: youtubeData.snippet.channelTitle,
      trackName: youtubeData.snippet.title,
      artworkUrl: youtubeData.snippet.thumbnails.default.url,
      url: youtubeData.id,
      feedId: cast.id,
    } as TrackMetadata;
  } catch (error) {
    console.error('Error fetching YouTube data:', error);
    throw error;
  }
};

export default getYoutubeTrackMetadata;
