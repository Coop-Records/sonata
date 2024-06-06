import { TrackMetadata } from '@/types/Track';
import extractSoundArtistAndTrack from './sound/extractSoundArtistAndTrack';
import getReleaseInfo from './sound/getReleaseInfo';
import getSpotifyTrackId from './spotify/getSpotifyTrackId';
import getYoutubeVideoData from './getYoutubeVideoData';
import { SupabasePost } from '@/types/SupabasePost';

export default async function fetchMetadata(url: string, cast:SupabasePost) {
  let metadata: TrackMetadata = {} as TrackMetadata;
  if (url?.includes('spotify')) {
    const oEmbedUrl = `https://open.spotify.com/oembed?url=${encodeURIComponent(url)}`;
    const response = await fetch(oEmbedUrl);
    const embedData = await response.json();
    const trackId = getSpotifyTrackId(embedData.iframe_url);
    metadata = {
      type: 'spotify',
      id: trackId,
      artistName: '',
      trackName: embedData.title,
      artworkUrl: embedData.thumbnail_url,
      url: `spotify:track:${trackId}`,
      feedId: cast.id
    };
  } else if (url.includes('soundcloud')) {
    const oEmbedUrl = `https://soundcloud.com/oembed?format=json&url=${encodeURIComponent(url)}`;
    const response = await fetch(oEmbedUrl);
    const embedData = await response.json();
    const iframeSrc = embedData.html.match(/src="([^"]+)"/)[1];
    const iframeUrl = new URL(iframeSrc).searchParams.get('url');

    if (!iframeUrl) {
      throw new Error('Could not find iframe url');
    }
    const soundId = String(iframeUrl.split('/').pop());

    metadata = {
      id: soundId,
      type: 'soundcloud',
      artistName: embedData.author_name || '',
      trackName: embedData.title.split(' - ')[0].split(' by ')[0],
      artworkUrl: embedData.thumbnail_url,
      url: iframeUrl,
      feedId: cast.id
    };
  } else if (url.includes('sound.xyz')) {
    const { artist, trackName } = extractSoundArtistAndTrack(url);
    const releaseInfo = await getReleaseInfo(artist, trackName);

    metadata = {
      id: releaseInfo.id,
      type: 'soundxyz',
      artistName: releaseInfo.artist.name,
      trackName: releaseInfo.title,
      artworkUrl: releaseInfo.coverImage.url,
      url: releaseInfo?.track?.audio?.audio128k?.url,
      feedId: cast.id
    };
  } else if (url.includes('youtube.com')) {
    const queryParams = new URLSearchParams(url.split('?')[1]);
    const videoId = queryParams.get('v');
    if (!videoId) {
      throw new Error('Could not find video id in url');
    }
    const youtubeData = await getYoutubeVideoData(videoId);
    metadata = {
      id: youtubeData.id,
      type: 'youtube',
      artistName: youtubeData.snippet.channelTitle,
      trackName: youtubeData.snippet.title,
      artworkUrl: youtubeData.snippet.thumbnails.default.url,
      url: youtubeData.id,
      feedId: cast.id
    };
  }
  return metadata;
}
