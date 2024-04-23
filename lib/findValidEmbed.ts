import { Cast } from '@/types/Cast';
import { FeedFilter } from '@/types/FeedFilter';
import { EmbedUrl, EmbeddedCast } from '@neynar/nodejs-sdk/build/neynar-api/v2';

export default function findValidEmbed(cast: Cast, filter: FeedFilter = {}) {
  const embeds = cast.embeds as EmbeddedCast[];

  const validEmbed = embeds.find((embed) => {
    if (!('url' in embed)) return false;
    const url = embed.url;
    if (filter?.platform && !url.includes(filter.platform)) {
      return false;
    }

    let valid = false;
    if (url.includes('spotify')) {
      if (url.match(/https:\/\/open.spotify.com\/track\//)) {
        valid = true;
      }
    } else if (url.includes('soundcloud')) {
      valid = true;
    } else if (url.includes('sound.xyz')) {
      if (!url.match(/(\/post\/)|(\/playlist\/)/)) {
        valid = true;
      }
    }
    return valid;
  });

  return validEmbed as EmbedUrl;
}
