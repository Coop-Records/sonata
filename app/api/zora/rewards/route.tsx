import { NextRequest } from 'next/server';
import { Address } from 'viem';
import trackEndpoint from '@/lib/stack/trackEndpoint';
import { EVENT_ZORA_REWARDS } from '@/lib/consts';
import getRewardsPoints from '@/lib/stack/getRewardsPoints';
import indexNewRewards from '@/lib/indexNewRewards';
import formatBigIntValues from '@/lib/formatBigIntValues';

export async function GET(request: NextRequest) {
  try {
    await trackEndpoint(EVENT_ZORA_REWARDS);
    const address = new URL(request.url).searchParams.get('address') as Address;
    const rewards = await getRewardsPoints(address);
    const newLogs = await indexNewRewards(address);
    return Response.json({
      message: 'success',
      address,
      ...rewards,
      newLogs: formatBigIntValues(newLogs),
    });
  } catch (error) {
    console.error('Error:', error);
    return Response.json({ message: 'failed' }, { status: 400 });
  }
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';
