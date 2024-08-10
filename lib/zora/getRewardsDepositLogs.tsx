import {
  CHAIN_ID,
  INITIAL_BLOCK_RANGE,
  MAX_RECORDS_THRESHOLD,
  MAX_RETRIES,
  MIN_BLOCK_RANGE,
} from '../consts';
import { protocolRewardsAddress, protocolRewardsABI } from '@zoralabs/protocol-deployments';
import { getPublicClient } from '../viem';
import { Address } from 'viem';

const getRewardsDepositLogs = async (address: Address, fromBlock: bigint) => {
  const publicClient = getPublicClient(CHAIN_ID);
  const argOptions = ['creator', 'mintReferral', 'createReferral'];

  let logs = [] as any;
  let retries = 0;
  let currentBlockRange = INITIAL_BLOCK_RANGE;
  let toBlock = fromBlock + currentBlockRange;

  while (logs.length === 0 && retries < MAX_RETRIES) {
    const logPromises = argOptions.map((argOption) =>
      publicClient.getContractEvents({
        address: protocolRewardsAddress[CHAIN_ID],
        abi: protocolRewardsABI,
        eventName: 'RewardsDeposit',
        args: {
          [argOption]: address,
        },
        fromBlock,
        toBlock,
      }),
    );

    const logsArray = await Promise.all(logPromises);
    logs = logsArray.flat();

    if (logs.length === 0) {
      currentBlockRange *= 2n;
      fromBlock = toBlock + 1n;
      toBlock = fromBlock + currentBlockRange;
    } else if (logs.length > MAX_RECORDS_THRESHOLD) {
      currentBlockRange = currentBlockRange / 2n;
      if (currentBlockRange < MIN_BLOCK_RANGE) {
        currentBlockRange = MIN_BLOCK_RANGE;
      }
      fromBlock = toBlock - currentBlockRange + 1n;
      toBlock = fromBlock + currentBlockRange;
      logs = [];
    } else {
      break;
    }

    retries++;
  }

  return logs;
};

export default getRewardsDepositLogs;
