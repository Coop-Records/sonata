import { Chain, createPublicClient, http } from 'viem';

const getPublicClient = (chain: Chain) =>
  createPublicClient({
    chain,
    transport: http(),
  });

export default getPublicClient;
