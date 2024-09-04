import { NextRequest } from 'next/server';
import { Address } from 'viem';
import trackEndpoint from '@/lib/stack/trackEndpoint';
import getZoraProfileScore from '@/lib/zora/getZoraProfileScore';
import { EVENT_ZORA_SCORE } from '@/lib/consts';
import getZoraScore from '@/lib/zora/score/getZoraScore';

export async function GET(request: NextRequest) {
  try {
    await trackEndpoint(EVENT_ZORA_SCORE);
    const address = new URL(request.url).searchParams.get('address') as Address;
    const profile = await getZoraProfileScore(address);
    const score = getZoraScore(profile);

    return Response.json({
      message: 'success',
      address,
      score,
      profile,
    });
  } catch (error) {
    console.error('Error:', error);
    return Response.json({ message: 'failed' }, { status: 400 });
  }
}
