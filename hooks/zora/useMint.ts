import { CollectionObject } from '@/lib/sonata/song/createCollectionObject';
import { useCallback, useState } from 'react';
import useWalletClient from '@/hooks/useWalletClient';
import { REFFERAL_ADDRESS } from '@/lib/consts';
import collectorClient from '@/lib/zora/collectorClient';

export default function useMint(collection?: CollectionObject) {
  const { address, walletClient, loading: walletClientLoading } = useWalletClient();
  const [minting, setMinting] = useState(false);
  const loading = walletClientLoading || minting;

  const mint = useCallback(async () => {
    if (!collection) {
      throw new Error('No collection provided');
    }
    if (!(walletClient && address)) {
      throw new Error('No wallet client or address provided');
    }
    setMinting(true);
    try {
      const { parameters } = await collectorClient.mint({
        tokenContract: collection.address,
        quantityToMint: 1,
        mintType: '1155',
        minterAccount: address,
        tokenId: collection.tokenId,
        mintReferral: REFFERAL_ADDRESS,
      });

      const hash = await walletClient.writeContract(parameters);
      return hash;
    } catch (err) {
      console.error(err);
    } finally {
      setMinting(false);
    }
  }, [collection, walletClient, address]);

  return { mint, loading };
}
