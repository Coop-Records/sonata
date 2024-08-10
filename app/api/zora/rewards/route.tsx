import { NextRequest } from 'next/server';
import { Address } from 'viem';
import trackEndpoint from '@/lib/stack/trackEndpoint';
import getRewardsDepositLogs from '@/lib/zora/getRewardsDepositLogs';
import getBlock from '@/lib/viem/getBlock';
import formatBigIntValues from '@/lib/formatBigIntValues';
import logsToStack from './logsToStack';
import { EVENT_ZORA_REWARDS, INITIAL_BLOCK_RANGE } from '@/lib/consts';
import { bulkTrack } from '@/lib/stack/bulkTrack';
import getRewardsPoints from './getRewardsPoints';

export async function GET(request: NextRequest) {
  try {
    await trackEndpoint(EVENT_ZORA_REWARDS);
    const address = new URL(request.url).searchParams.get('address') as Address;
    const rewards = await getRewardsPoints(address);
    console.log('SWEETS rewards', rewards);
    const lastIndexedBlock = BigInt(rewards.events[0].metadata.blockNumber);
    const startBlock = lastIndexedBlock || (await getBlock({ blockTag: 'earliest' })).number;
    const latestBlock = await getBlock({ blockTag: 'latest' });
    const rangeTo = startBlock + INITIAL_BLOCK_RANGE;
    const isFinished = latestBlock.number <= rangeTo;
    const toBlock = isFinished ? latestBlock.number : rangeTo;
    const logs = await getRewardsDepositLogs(address, startBlock, toBlock);
    if (logs?.length > 0) {
      const trackingEvents = logsToStack(logs);
      console.log('SWEETS trackingEvents', trackingEvents);
      await bulkTrack(formatBigIntValues(trackingEvents));
    }
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
