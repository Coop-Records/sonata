import {
  zoraTimedSaleStrategyAddress,
  zoraTimedSaleStrategyABI,
} from '@zoralabs/protocol-deployments';
import viemPublicClient from '@/lib/viem/viemPublicClient';
import { CollectionObject } from '@/lib/sonata/song/createCollectionObject';
import { useEffect, useState } from 'react';
import { CHAIN } from '@/lib/consts';

export default function useSale(collection?: CollectionObject) {
  const [saleData, setSaleData] = useState<any>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSaleData = async () => {
      if (!collection) return;
      setLoading(true);
      try {
        const saleData = await viemPublicClient.readContract({
          address: zoraTimedSaleStrategyAddress[CHAIN.id],
          abi: zoraTimedSaleStrategyABI,
          functionName: 'saleV2',
          args: [collection.address, BigInt(collection.tokenId)],
        });
        setSaleData(saleData);
      } catch (error) {
        console.error('Error fetching sale data:', error);
      }
      setLoading(false);
    };

    fetchSaleData();
  }, [collection]);

  return { saleData, loading };
}