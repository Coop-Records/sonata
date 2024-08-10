import { INITIAL_BLOCK_RANGE } from '@/lib/consts';
import getBlock from '@/lib/viem/getBlock';
import getRewardsDepositLogs from '@/lib/zora/getRewardsDepositLogs';
import logsToStack from './logsToStack';
import formatBigIntValues from '@/lib/formatBigIntValues';
import { bulkTrack } from '@/lib/stack/bulkTrack';
import { Address } from 'viem';

const indexNewRewards = async (address: Address) => {
  const toBlock = (await getBlock({ blockTag: 'latest' })).number;
  const startBlock = toBlock - INITIAL_BLOCK_RANGE;
  const logs = await getRewardsDepositLogs(address, startBlock, toBlock);
  if (logs?.length > 0) {
    const trackingEvents = logsToStack(logs);
    await bulkTrack(formatBigIntValues(trackingEvents));
  }
  return logs;
};

export default indexNewRewards;
