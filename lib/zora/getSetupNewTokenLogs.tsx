import { CHAIN_ID } from '../consts';
import { zoraCreator1155ImplABI } from '@zoralabs/protocol-deployments';
import { getPublicClient } from '../viem';
import { Address } from 'viem';

const getSetupNewTokenLogs = async (contractAddress: Address, blockNumber?: bigint) => {
  const publicClient = getPublicClient(CHAIN_ID);

  const contractEvents = await publicClient.getContractEvents({
    address: contractAddress,
    abi: zoraCreator1155ImplABI,
    eventName: "SetupNewToken",
    fromBlock: blockNumber ?? 'earliest',
    toBlock: "safe",
    strict: true,
  });
  return contractEvents;
};

export default getSetupNewTokenLogs;
