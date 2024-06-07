import { TrackMetadata } from '@/types/Track';
import { SupabasePost } from '@/types/SupabasePost';

const getSoundcloudTrackMetadata = async (url: string, cast: SupabasePost) => {
  const oEmbedUrl = `https://soundcloud.com/oembed?format=json&url=${encodeURIComponent(url)}`;
  const response = await fetch(oEmbedUrl);
  const embedData = await response.json();
  const iframeSrc = embedData.html.match(/src="([^"]+)"/)[1];
  const iframeUrl = new URL(iframeSrc).searchParams.get('url');

  if (!iframeUrl) {
    throw new Error('Could not find iframe url');
  }
  const soundId = String(iframeUrl.split('/').pop());

  return {
    id: soundId,
    type: 'soundcloud',
    artistName: embedData.author_name || '',
    trackName: embedData.title.split(' - ')[0].split(' by ')[0],
    artworkUrl: embedData.thumbnail_url,
    url: iframeUrl,
    feedId: cast.id,
  } as TrackMetadata;
};

export default getSoundcloudTrackMetadata;
