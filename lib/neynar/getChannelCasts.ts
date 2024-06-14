import 'server-only';

import { ErrorRes, FeedType, FilterType, NeynarV2APIClient as NeynarAPIClient } from '@neynar/nodejs-sdk/build/neynar-api/v2';
import { CONTENT_PLATFORMS } from '../consts';


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
      const found = CONTENT_PLATFORMS.some((val => entry.text.includes(val.url)));

      if (found) casts.push(entry);
    }

  } catch (err: any) {
    error = err;
  }

  if (error) return error;
  return casts;
};

export default getChannelCasts;
