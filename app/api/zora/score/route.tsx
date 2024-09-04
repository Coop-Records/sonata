import { NextRequest } from 'next/server';
import { Address } from 'viem';
import trackEndpoint from '@/lib/stack/trackEndpoint';
import getZoraProfileScore from '@/lib/zora/getZoraProfileScore';
import { EVENT_ZORA_SCORE } from '@/lib/consts';

export async function GET(request: NextRequest) {
  try {
    await trackEndpoint(EVENT_ZORA_SCORE);
    const address = new URL(request.url).searchParams.get('address') as Address;

    const profile = await getZoraProfileScore(address);
    const score = calculateScore(profile);

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

function calculateScore(profile: {
  completeness: number;
  followers: number;
  following: number;
}): number {
  const { completeness, followers, following } = profile;
  return (completeness + followers + following) / 3;
}
