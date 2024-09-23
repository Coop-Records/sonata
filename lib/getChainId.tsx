import { base, baseSepolia, zora, zoraSepolia } from 'viem/chains';

const getChainId = (chain: string) => {
  switch (chain) {
    case 'base':
      return base.id;
    case 'baseSepolia':
      return baseSepolia.id;
    case 'zora':
      return zora.id;
    case 'zoraSepolia':
      return zoraSepolia.id;
    default:
      return base.id;
  }
};

export default getChainId;
