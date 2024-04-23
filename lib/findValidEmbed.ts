import { Cast } from '@/types/Cast';
import { EmbedUrl } from '@neynar/nodejs-sdk/build/neynar-api/v2';

export default function findValidEmbed(cast: Cast) {
  const embeds = cast.embeds as EmbedUrl[];
  return embeds.find(({ url }: { url: string }) => {
    if (!url) return false;
    let valid = false;
    if (url.includes('spotify')) {
      if (!url.match(/https:\/\/open.spotify.com\/track\//)) {
        valid = true;
      }
    } else if (url.includes('soundcloud')) {
      valid = true;
    } else if (url.includes('sound.xyz')) {
      if (!url.match(/\/post\//)) {
        valid = true;
      }
    }
    return valid;
  });
}
