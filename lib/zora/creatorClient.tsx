import { createCreatorClient } from '@zoralabs/protocol-sdk';
import viemPublicClient from '@/lib/viem/viemPublicClient';
import { CHAIN } from '@/lib/consts';

const creatorClient = createCreatorClient({
  chainId: CHAIN.id,
  publicClient: viemPublicClient,
});

export default creatorClient;
