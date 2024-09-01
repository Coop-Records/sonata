import { REFFERAL_ADDRESS } from '@/lib/consts';
import { SetupNewTokenEvent } from './findMatchingEvent';

export interface CollectionObject {
  tokenId: string;
  chainId: number;
  address: string;
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
