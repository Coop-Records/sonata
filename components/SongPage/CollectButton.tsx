import { useSongPageProvider } from '@/providers/SongPageProvider';
import { Button } from '@/components/ui/button';
import collectorClient from '@/lib/zora/collectorClient';
import { REFFERAL_ADDRESS } from '@/lib/consts';
import Loader from '@/components/Loader';
import useWalletClient from '@/hooks/useWallet';
import { useCallback, useEffect, useState } from 'react';
import { formatEther } from 'viem';

const CollectButton = () => {
  const { collection } = useSongPageProvider();
  const { address, walletClient, loading: walletClientLoading } = useWalletClient();
  const [fee, setFee] = useState<string>();
  const [feeLoading, setFeeLoading] = useState(false);
  const [minting, setMinting] = useState(false);

  const handleCollect = useCallback(async () => {
    if (!(collection && walletClient && address)) return;
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
      console.log({ hash });
    } catch (err) {
      console.error(err);
    }
    setMinting(false);
  }, [collection, walletClient, address]);

  useEffect(() => {
    const fetchFee = async () => {
      if (!collection) return;
      setFeeLoading(true);
      const fee = await collectorClient.getMintCosts({
        collection: collection.address,
        quantityMinted: 1,
        mintType: '1155',
        tokenId: collection.tokenId,
      });
      if (fee) {
        setFee(formatEther(fee.totalCostEth));
      }
      setFeeLoading(false);
    };
    fetchFee();
  }, [collection]);

  const isLoading = walletClientLoading || feeLoading || minting;

  return (
    <Button onClick={handleCollect} disabled={isLoading}>
      {isLoading ? (
        <Loader />
      ) : (
        <div>BUY {fee && <span className="mx-2 font-bold">{fee} ETH</span>}</div>
      )}
    </Button>
  );
};

export default CollectButton;
