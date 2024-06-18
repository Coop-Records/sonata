import { Address } from 'viem';
import { ZoraChains } from '../consts';

export const pattern = /collect\/([^:]+):([^/]+)\/(\d+)/;

function parseCollectionUrl(input: string) {
  const match = input.match(pattern);

  if (!match) return null;

  return {
    chain: match[1] as ZoraChains,
    collectionAddress: match[2] as Address,
    tokenId: match[3]
  };
}

export default parseCollectionUrl;