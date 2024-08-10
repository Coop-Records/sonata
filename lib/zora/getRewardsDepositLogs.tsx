import { CHAIN_ID } from '../consts';
import { protocolRewardsAddress, protocolRewardsABI } from '@zoralabs/protocol-deployments';
import { getPublicClient } from '../viem';
import { Address } from 'viem';

const getRewardsDepositLogs = async (address: Address, fromBlock: bigint, toBlock: bigint) => {
  const publicClient = getPublicClient(CHAIN_ID);
  const argOptions = ['creator', 'mintReferral', 'createReferral'];
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
  const logs = logsArray.flat();
  return logs;
};

export default getRewardsDepositLogs;
