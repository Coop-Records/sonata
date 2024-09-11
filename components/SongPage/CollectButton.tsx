import { useSongPageProvider } from '@/providers/SongPageProvider';
import { Button } from '@/components/ui/button';
import Loader from '@/components/Loader';
import useMint from '@/hooks/zora/useMint';
import useMintFee from '@/hooks/zora/useMintFee';

const CollectButton = () => {
  const { collection } = useSongPageProvider();

  const { mint, loading: minting } = useMint(collection);
  const { fee, loading: feeLoading } = useMintFee(collection);

  const isLoading = feeLoading || minting;

  return (
    <Button onClick={mint} disabled={isLoading}>
      {isLoading ? (
        <Loader />
      ) : (
        <div>BUY {fee && <span className="mx-2 font-bold">{fee} ETH</span>}</div>
      )}
    </Button>
  );
};

export default CollectButton;
