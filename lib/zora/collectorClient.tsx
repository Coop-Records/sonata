import { createCollectorClient } from '@zoralabs/protocol-sdk';
import viemPublicClient from '@/lib/viem/viemPublicClient';
import { CHAIN } from '@/lib/consts';

const collectorClient = createCollectorClient({
  chainId: CHAIN.id,
  publicClient: viemPublicClient,
});

export default collectorClient;
