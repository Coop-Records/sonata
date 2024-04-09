import { base, mainnet, optimism, zora } from 'viem/chains';

const getChainIdForNetwork = (network: string) => {
  switch (network) {
    case mainnet.name.toLowerCase():
      return mainnet.id;
    case zora.name.toLowerCase():
      return zora.id;
    case base.name.toLowerCase():
      return base.id;
    case optimism.name.toLowerCase():
      return optimism.id;
    default:
      throw new Error(`Unsupported network: ${network}`);
  }
};

export default getChainIdForNetwork;
