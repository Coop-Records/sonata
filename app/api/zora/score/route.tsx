import { NextRequest } from 'next/server';
import { Address } from 'viem';
import trackEndpoint from '@/lib/stack/trackEndpoint';
import getZoraProfileScore from '@/lib/zora/score/getZoraProfileScore';
import { EVENT_ZORA_SCORE, TOKEN_INDEXER_POINT_ID } from '@/lib/consts';
import getZoraScore from '@/lib/zora/score/getZoraScore';
import { createStackClient } from '@/lib/stack/client';
import { getCreateScore } from '@/lib/zora/score/getCreateScore';

const stack = createStackClient(TOKEN_INDEXER_POINT_ID);

export async function GET(request: NextRequest) {
  try {
    await trackEndpoint(EVENT_ZORA_SCORE);
    const address = new URL(request.url).searchParams.get('address') as Address;
    const profile = await getZoraProfileScore(address);
    const query: Record<string, any> = { limit: 100 };
    if (address) {
      query.address = address;
    }
    const events = await stack.getEvents(query);
    const tokensCreated = events.filter((event) => event.address === address).length;
    const createScore = getCreateScore(tokensCreated);
    const score = getZoraScore({ profileScore: profile.score as number, createScore });

    return Response.json({
      message: 'success',
      address,
      score,
      profile,
      createScore,
    });
  } catch (error) {
    console.error('Error:', error);
    return Response.json({ message: 'failed', error }, { status: 400 });
  }
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';
