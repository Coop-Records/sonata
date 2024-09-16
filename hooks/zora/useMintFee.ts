import { CollectionObject } from '@/lib/sonata/song/createCollectionObject';
import { useEffect, useState } from 'react';
import collectorClient from '@/lib/zora/collectorClient';
import { formatEther } from 'viem';

export default function useMintFee(collection?: CollectionObject) {
  const [fee, setFee] = useState<string>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFee = async () => {
      if (!collection) return;
      setLoading(true);
      try {
        const fee = await collectorClient.getMintCosts({
          collection: collection.address,
          quantityMinted: 1,
          mintType: '1155',
          tokenId: collection.tokenId,
        });
        setFee(formatEther(fee.totalCostEth));
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchFee();
  }, [collection]);

  return { fee, loading };
}
