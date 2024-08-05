import { SupabasePost } from '@/types/SupabasePost';
import { EmbedUrl } from '@neynar/nodejs-sdk/build/neynar-api/v2';
import isValidUrl from './isValidUrl';

export default function findValidEmbed(cast: SupabasePost) {
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
    return isValidUrl(url) || url?.includes('ipfs://');
  });

  return validEmbed as EmbedUrl;
}
