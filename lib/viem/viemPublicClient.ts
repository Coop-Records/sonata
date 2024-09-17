import { Chain, createPublicClient, http } from 'viem';
import { CHAIN } from '@/lib/consts';

const viemPublicClient = createPublicClient({
  chain: CHAIN as Chain,
  transport: http(),
});

export default viemPublicClient;
