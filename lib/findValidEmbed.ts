import { Cast } from '@/types/Cast';
import { FeedFilter } from '@/types/Feed';
import { EmbedUrl } from '@neynar/nodejs-sdk/build/neynar-api/v2';
import isValidUrl from './isValidUrl';

export default function findValidEmbed(cast: Cast, filter: FeedFilter = {}) {
  const embeds = cast.embeds;
  const validEmbed = embeds.find((embed) => {
    if (!('url' in embed)) return false;
    const url = embed.url;
    const isValid = isValidUrl(url)
    if (filter?.platform && !url.includes(filter.platform)) {
      return false;
    }
    return isValid
  });

  return validEmbed as EmbedUrl;
}
