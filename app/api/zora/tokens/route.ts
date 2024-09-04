import { EVENT_SETUP_NEW_TOKEN, EVENT_ZORA_TOKENS } from '@/lib/consts';
import { stack } from '@/lib/stack/client';
import trackEndpoint from '@/lib/stack/trackEndpoint';
import trackNewTokens from '@/lib/stack/trackNewTokens';
import { SetupNewTokenStackEvent } from '@/types/Stack';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    await trackEndpoint(EVENT_ZORA_TOKENS);

    const query: Record<string, any> = { limit: 100, event: EVENT_SETUP_NEW_TOKEN };
    const creatorAddress = req.nextUrl.searchParams.get('creatorAddress');
    if (creatorAddress) query.address = creatorAddress;

    const tokens: SetupNewTokenStackEvent[] = await stack.getEvents(query);
    const blockNumber = BigInt(tokens?.[0]?.metadata?.blockNumber ?? 0) || undefined;
    const newTokens = await trackNewTokens(blockNumber);

    return Response.json({ tokens: newTokens.concat(tokens).slice(0, 100) })
  } catch (error) {
    console.error('Error:', error);
    return Response.json({ message: 'failed' }, { status: 400 });
  }
}