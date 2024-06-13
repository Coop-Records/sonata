import 'server-only';

import { ErrorRes, FeedType, FilterType, NeynarV2APIClient as NeynarAPIClient } from '@neynar/nodejs-sdk/build/neynar-api/v2';


const getChannelCasts = async (
  channelId: string,
  lastChecked = new Date(new Date().getTime() - 2 * 60 * 1000),
  limit = 100
) => {
  const client = new NeynarAPIClient(process.env.NEYNAR_API_KEY!);

  const casts = [];
  let error: ErrorRes | undefined;
  let cursor: string | null | undefined = undefined;

  mainLoop: do {
    try {
      const result = await client.fetchFeed(
        FeedType.Filter,
        {
          filterType: FilterType.ChannelId,
          withRecasts: false,
          channelId,
          limit,
          cursor,
        }
      );

      for (const entry of result.casts) {
        if (new Date(entry.timestamp) > lastChecked) {

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
        else break mainLoop;
      }

      cursor = result.next.cursor;

    } catch (err: any) {
      error = err;
      break;
    }
  } while (cursor);

  if (error) return error;
  return casts;
};

export default getChannelCasts;
