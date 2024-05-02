import { Cast } from '@/types/Cast';
import { FeedFilter } from '@/types/Feed';
import { EmbedUrl } from '@neynar/nodejs-sdk/build/neynar-api/v2';

export default function findValidEmbed(cast: Cast, filter: FeedFilter = {}) {
  const embeds = cast?.embeds?.map?.(embed => {
    try {
      // Attempt to parse if embed is a string
      return typeof embed === 'string' ? JSON.parse(embed) : embed;
    } catch (error) {
      console.error("Error parsing embed:", error);
      return null;
    }
  }).filter(Boolean); // Remove any null entries from failed parses

  const validEmbed = embeds?.find?.((embed) => {
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
