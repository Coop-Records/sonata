import { TrackMetadata } from '@/types/Track';
import extractSoundArtistAndTrack from './sound/extractSoundArtistAndTrack';
import getReleaseInfo from './sound/getReleaseInfo';
import getSpotifyTrackId from './spotify/getSpotifyTrackId';

export default async function fetchMetadata(url: string) {
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

    metadata = {
      id: iframeUrl,
      type: 'soundcloud',
      artistName: embedData.author_name || '',
      trackName: embedData.title.split(' - ')[0].split(' by ')[0],
      artworkUrl: embedData.thumbnail_url,
      url: iframeUrl,
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
    };
  }
  return metadata;
}
