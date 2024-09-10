import { createCollectorClient } from '@zoralabs/protocol-sdk';
import getPublicClient from '../viem/getPublicClient';
import { CHAIN } from '../consts';

const collectorClient = createCollectorClient({
  chainId: CHAIN.id,
  publicClient: getPublicClient(CHAIN),
});

export default collectorClient;
