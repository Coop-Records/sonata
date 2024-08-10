import { NextRequest } from 'next/server';
import { Address } from 'viem';
import trackEndpoint from '@/lib/stack/trackEndpoint';
import { EVENT_ZORA_REWARDS } from '@/lib/consts';
import getRewardsPoints from '@/lib/stack/getRewardsPoints';
import indexNewRewards from '@/lib/indexNewRewards';

export async function GET(request: NextRequest) {
  try {
    await trackEndpoint(EVENT_ZORA_REWARDS);
    const address = new URL(request.url).searchParams.get('address') as Address;
    const rewards = await getRewardsPoints(address);
    const isFinished = await indexNewRewards(address, rewards);
    return Response.json({
      message: 'success',
      address,
      ...rewards,
      isFinished,
    });
  } catch (error) {
    console.error('Error:', error);
    return Response.json({ message: 'failed' }, { status: 400 });
  }
}

export const revalidate = 0;
