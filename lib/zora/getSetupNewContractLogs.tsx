import { CHAIN_ID } from '../consts';
import {
  zoraCreator1155FactoryImplAddress,
  zoraCreator1155FactoryImplABI,
} from '@zoralabs/protocol-deployments';
import { getPublicClient } from '../viem';
import { Address } from 'viem';

const getSetupNewContractLogs = async (creator: Address) => {
  const publicClient = getPublicClient(CHAIN_ID);
  const args = {} as any;
  if (creator) args.creator = creator;
  const contractEvents = await publicClient.getContractEvents({
    address: zoraCreator1155FactoryImplAddress[CHAIN_ID],
    abi: zoraCreator1155FactoryImplABI,
    eventName: 'SetupNewContract',
    args,
    fromBlock: 'earliest',
  });
  return contractEvents;
};

export default getSetupNewContractLogs;
