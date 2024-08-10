import { INITIAL_BLOCK_RANGE } from '@/lib/consts';
import getBlock from '@/lib/viem/getBlock';
import getRewardsDepositLogs from '@/lib/zora/getRewardsDepositLogs';
import logsToStack from './logsToStack';
import formatBigIntValues from '@/lib/formatBigIntValues';
import { bulkTrack } from '@/lib/stack/bulkTrack';
import { Address } from 'viem';

const indexNewRewards = async (address: Address, rewards: any) => {
  const lastIndexedBlock = BigInt(rewards.events[0].metadata.blockNumber);
  const startBlock = lastIndexedBlock || (await getBlock({ blockTag: 'earliest' })).number;
  const latestBlock = await getBlock({ blockTag: 'latest' });
  const rangeTo = startBlock + INITIAL_BLOCK_RANGE;
  const isFinished = latestBlock.number <= rangeTo;
  const toBlock = isFinished ? latestBlock.number : rangeTo;
  const logs = await getRewardsDepositLogs(address, startBlock, toBlock);
  if (logs?.length > 0) {
    const trackingEvents = logsToStack(logs);
    await bulkTrack(formatBigIntValues(trackingEvents));
  }
  return isFinished;
};

export default indexNewRewards;
