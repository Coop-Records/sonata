import { NextRequest } from 'next/server';
import trackEndpoint from '@/lib/stack/trackEndpoint';
import {
  EVENT_UPDATED_PERMISSIONS,
  EVENT_ZORA_COLLECTIONS,
  TOKEN_INDEXER_POINT_ID,
} from '@/lib/consts';
import { createStackClient } from '@/lib/stack/client';
import { TOKEN_EVENT_TYPE } from '@/types/token';

const stack = createStackClient(TOKEN_INDEXER_POINT_ID);

export async function GET(request: NextRequest) {
  try {
    await trackEndpoint(EVENT_ZORA_COLLECTIONS);
    const query: Record<string, any> = { limit: 100, event: EVENT_UPDATED_PERMISSIONS };
    const creatorAddress = request.nextUrl.searchParams.get('creatorAddress');
    if (creatorAddress) query.address = creatorAddress;

    const tokens: TOKEN_EVENT_TYPE[] = (await stack.getEvents(query)) as any;

    const aggregatedData = tokens.reduce((acc: any, curr: TOKEN_EVENT_TYPE) => {
      const { collection } = curr.metadata;
      const key = collection;

      if (!acc[key]) {
        acc[key] = { ...curr, count: 1 };
      } else {
        acc[key].count += 1;
        acc[key].points += curr.points;
      }

      return acc;
    }, {});

    const collections = Object.values(aggregatedData).map((collection: any) => ({
      points: collection.points,
      collection: collection.metadata.collection,
    }));
    return Response.json({ collections });
  } catch (error) {
    console.error('Error:', error);
    return Response.json({ message: 'failed' }, { status: 400 });
  }
}
