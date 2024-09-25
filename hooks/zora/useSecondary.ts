import { CollectionObject } from '@/lib/sonata/song/createCollectionObject';
import useWalletClient from '../useWalletClient';
import collectorClient from '@/lib/zora/collectorClient';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/components/ui/use-toast';

export default function useSecondary(mode: 'buy' | 'sell', collection?: CollectionObject) {
  const { address, walletClient } = useWalletClient();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: secondaryData, isLoading: secondaryLoading } = useQuery({
    enabled: Boolean(collection && address),
    queryKey: ['secondaryMarket', collection, mode, address],
    async queryFn() {
      const queryFunction =
        mode === 'buy' ? collectorClient.buy1155OnSecondary : collectorClient.sell1155OnSecondary;
      const secondaryData = await queryFunction({
        contract: collection!.address,
        tokenId: BigInt(collection!.tokenId),
        quantity: 1n,
        account: address!,
      });
      return secondaryData;
    },
  });

  const { mutate: transact, isPending: transactionLoading } = useMutation({
    mutationKey: ['secondaryTransaction', collection, mode, walletClient],
    async mutationFn() {
      if (!(walletClient && secondaryData && secondaryData.parameters)) {
        throw new Error();
      }
      await walletClient.writeContract(secondaryData.parameters);
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['secondaryMarket'] });
      toast({ description: `Transaction Success!` });
    },
    onError(err) {
      toast({ description: err.message, variant: 'destructive' });
    },
  });

  const enabled = Boolean(!secondaryLoading && secondaryData && !secondaryData.error);
  const price = secondaryData?.price?.sparks.perToken;
  const loading = secondaryLoading || transactionLoading;

  return { enabled, price, transact, loading };
}
