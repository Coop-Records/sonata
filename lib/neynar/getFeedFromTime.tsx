import 'server-only';

import {
  ErrorRes,
  FeedType,
  FilterType,
  NeynarV2APIClient as NeynarAPIClient,
} from '@neynar/nodejs-sdk/build/neynar-api/v2';

const client = new NeynarAPIClient(process.env.NEYNAR_API_KEY!);

const getFeedFromTime = async (embedUrl: string, date: Date) => {
  const entries = [];
  let cursor: undefined | string;
  let error: ErrorRes | undefined;

  mainLoop: do {
    try {
      const data = await client.fetchFeed(FeedType.Filter, {
        filterType: FilterType.EmbedUrl,
        embedUrl,
        withRecasts: false,
        limit: 100,
        cursor,
      });

      for (const entry of data.casts) {
        if (new Date(entry.timestamp) > date) entries.push(entry);
        else break mainLoop;
      }

      cursor = data.next.cursor!;
    } catch (err: any) {
      error = err;
      break;
    }
  } while (cursor);

  if (error) throw error;
  return entries;
};

export default getFeedFromTime;
