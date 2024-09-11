import { REFFERAL_ADDRESS } from '@/lib/consts';
import { SetupNewTokenEvent } from './findMatchingEvent';
import { Address } from 'viem';

export interface CollectionObject {
  tokenId: string;
  chainId: number;
  address: Address;
  zora: string;
}

function createCollectionObject(event: SetupNewTokenEvent): CollectionObject {
  const { tokenId, chainId, collection } = event.metadata;
  return {
    tokenId,
    chainId,
    address: collection,
    zora: `https://testnet.zora.co/collect/bsep:${collection}/${tokenId}?referrer=${REFFERAL_ADDRESS}`,
  };
}

export default createCollectionObject;
