import { SupabasePost } from '@/types/SupabasePost';
import getIpfsLink from '../getIpfsLink';
import { TrackMetadata } from '@/types/Track';

interface ZoraMetadata {
  name: string;
  description: string;
  image: string;
  animation_url: string;
  content: {
    mime: string;
    uri: string;
  };
}

async function getZoraTrackMetadata(url: string, cast: SupabasePost) {
  const response = await fetch(getIpfsLink(url));
  const metadata: ZoraMetadata = await response.json();

  return {
    id: url,
    type: 'zora',
    artistName: '',
    trackName: metadata.name,
    artworkUrl: getIpfsLink(metadata.image),
    url: getIpfsLink(metadata.content.uri),
    feedId: cast.id,
  } as TrackMetadata;
}

export default getZoraTrackMetadata;
