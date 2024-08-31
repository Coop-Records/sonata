import { createCreatorClient } from '@zoralabs/protocol-sdk';
import getPublicClient from '../viem/getPublicClient';
import { CHAIN } from '../consts';

const creatorClient = createCreatorClient({
  chainId: CHAIN.id,
  publicClient: getPublicClient(CHAIN),
});

export default creatorClient;
