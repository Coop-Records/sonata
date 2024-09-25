import { EVENT_ZORA_TOKENS, TOKEN_INDEXER_POINT_ID } from '@/lib/consts';
import { createStackClient } from '@/lib/stack/client';
import trackEndpoint from '@/lib/stack/trackEndpoint';
import { NextRequest } from 'next/server';

const stack = createStackClient(TOKEN_INDEXER_POINT_ID);

export async function GET(req: NextRequest) {
  try {
    await trackEndpoint(EVENT_ZORA_TOKENS);
    const query: Record<string, any> = { limit: 100 };
    const creatorAddress = req.nextUrl.searchParams.get('creatorAddress');
    if (creatorAddress) query.address = creatorAddress;

    const tokens = await stack.getEvents(query);

    return Response.json({ tokens });
  } catch (error) {
    console.error('Error:', error);
    return Response.json({ message: 'failed' }, { status: 400 });
  }
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';
