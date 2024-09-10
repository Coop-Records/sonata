import { base, baseSepolia } from 'viem/chains';

const getChainId = (chain: string) => {
  switch (chain) {
    case 'mainnet':
      return base.id;
    case 'sepolia':
      return baseSepolia.id;
    default:
      return base.id;
  }
};

export default getChainId;
