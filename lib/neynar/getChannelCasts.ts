import 'server-only';

import { ErrorRes, FeedType, FilterType, NeynarV2APIClient as NeynarAPIClient } from '@neynar/nodejs-sdk/build/neynar-api/v2';


const getChannelCasts = async (channelId: string, limit = 100) => {
  const client = new NeynarAPIClient(process.env.NEYNAR_API_KEY!);

  const casts = [];
  let error: ErrorRes | undefined;

  try {
    const result = await client.fetchFeed(
      FeedType.Filter,
      {
        filterType: FilterType.ChannelId,
        withRecasts: false,
        channelId,
        limit
      }
    );

    for (const entry of result.casts) {
      const found = entry.embeds.some((embed: any): boolean => {
        const url = embed?.url as string | undefined;

        if (!url) return false;

        return (
          url.includes('youtube.com/watch') ||
          url.includes('soundcloud.com') ||
          url.includes('sound.xyz') ||
          url.includes('spotify.com/track')
        );
      });

      if (found) casts.push(entry);
    }

  } catch (err: any) {
    error = err;
  }

  if (error) return error;
  return casts;
};

export default getChannelCasts;
