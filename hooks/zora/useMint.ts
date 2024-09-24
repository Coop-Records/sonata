import { CollectionObject } from '@/lib/sonata/song/createCollectionObject';
import useWalletClient from '@/hooks/useWalletClient';
import { REFFERAL_ADDRESS } from '@/lib/consts';
import collectorClient from '@/lib/zora/collectorClient';
import { useMutation, useQuery } from '@tanstack/react-query';

export default function useMint(collection?: CollectionObject) {
  const { address, walletClient, loading: walletClientLoading } = useWalletClient();

  const { data: fee, isLoading: feeLoading } = useQuery({
    async queryFn() {
      if (!collection) return;
      const fee = await collectorClient.getMintCosts({
        collection: collection.address,
        quantityMinted: 1,
        mintType: '1155',
        tokenId: collection.tokenId,
      });
      return fee;
    },
    queryKey: [collection],
  });

  const { mutate: mint, isPending: minting } = useMutation({
    async mutationFn() {
      if (!collection) {
        throw new Error('No collection provided');
      }
      if (!(walletClient && address)) {
        throw new Error('No wallet client or address provided');
      }
      const { parameters } = await collectorClient.mint({
        tokenContract: collection.address,
        quantityToMint: 1,
        mintType: '1155',
        minterAccount: address,
        tokenId: collection.tokenId,
        mintReferral: REFFERAL_ADDRESS,
      });

      await walletClient.writeContract(parameters);
    },
    mutationKey: [collection, walletClient, address],
  });

  const loading = walletClientLoading || minting || feeLoading;
  const enabled = !loading && fee;
  return { mint, fee, loading, enabled };
}
