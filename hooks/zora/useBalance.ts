import useWalletClient from '@/hooks/useWalletClient';
import viemPublicClient from '@/lib/viem/viemPublicClient';
import { CollectionObject } from '@/lib/sonata/song/createCollectionObject';
import { useCallback, useEffect, useState } from 'react';
import { zoraCreator1155ImplABI } from '@zoralabs/protocol-deployments';

export default function useBalance(collection?: CollectionObject) {
  const { address, loading: walletClientLoading } = useWalletClient();
  const [balance, setBalance] = useState<any>();
  const [fetchingBalance, setFetchingBalance] = useState(false);
  const loading = fetchingBalance || walletClientLoading;

  const fetchBalance = useCallback(async () => {
    if (!collection || !address) return;
    setFetchingBalance(true);
    try {
      const balance = await viemPublicClient.readContract({
        address: collection.address,
        abi: zoraCreator1155ImplABI,
        functionName: 'balanceOf',
        args: [address, BigInt(collection.tokenId)],
      });
      setBalance(balance);
    } catch (e) {
      console.error('Error fetching balance:', e);
      setBalance(undefined);
    }
    setFetchingBalance(false);
  }, [collection, address]);

  useEffect(() => {
    fetchBalance();
  }, [collection, fetchBalance]);

  return { balance, loading, refetch: fetchBalance };
}
