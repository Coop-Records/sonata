import { Address } from 'viem';

export const pattern = /collect\/([^:]+):([^/]+)\/(\d+)/;

function parseCollectionUrl(input: string) {
  const match = input.match(pattern);

  if (!match) return null;

  return {
    chain: match[1],
    collectionAddress: match[2] as Address,
    tokenId: match[3]
  };
}

export default parseCollectionUrl;