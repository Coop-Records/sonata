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
    };
  } else if (url.includes('soundcloud')) {
    const oEmbedUrl = `https://soundcloud.com/oembed?format=json&url=${encodeURIComponent(url)}`;
    const response = await fetch(oEmbedUrl);
    const embedData = await response.json();
    const srcRegex = /src="([^"]+)"/;
    const match = embedData.html.match(srcRegex);
    const src = match ? match[1] : null;

    metadata = {
      id: url,
      type: 'soundcloud',
      artistName: embedData.author_name || '',
      trackName: embedData.title.split(' - ')[0].split(' by ')[0],
      artworkUrl: embedData.thumbnail_url,
      iframeSrc: src,
    };
  } else if (url.includes('sound.xyz')) {
    const { artist, trackName } = extractSoundArtistAndTrack(url);
    const { mintedRelease: releaseInfo } = await getReleaseInfo(artist, trackName);

    metadata = {
      id: releaseInfo.id,
      type: 'soundxyz',
      artistName: releaseInfo.artist.name,
      trackName: releaseInfo.title,
      artworkUrl: releaseInfo.coverImage.url,
      audioSrc: releaseInfo?.track?.audio?.audio128k?.url,
    };
  }
  return metadata;
}
