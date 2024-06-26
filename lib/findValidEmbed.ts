import { SupabasePost } from '@/types/SupabasePost';
import { FeedFilter } from '@/types/Feed';
import { EmbedUrl } from '@neynar/nodejs-sdk/build/neynar-api/v2';
import isValidUrl from './isValidUrl';

export default function findValidEmbed(cast: SupabasePost, filter: FeedFilter = {}) {
  if (!cast || !cast.embeds) return null;

  const embeds = cast.embeds
    .map((embed) => {
      try {
        return JSON.parse(embed);
      } catch (error) {
        console.error('Invalid JSON in embed:', embed, error);
        return null;
      }
    })
    .filter((embed) => embed !== null);

  const validEmbed = embeds.find((embed) => {
    if (!embed || !('url' in embed)) return false;
    const url = embed.url;
    if (filter?.platform && !url.includes(filter.platform)) return false;

    return isValidUrl(url) || url?.includes('ipfs://');
  });

  return validEmbed as EmbedUrl;
}
