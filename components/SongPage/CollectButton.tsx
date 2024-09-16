import { useSongPageProvider } from '@/providers/SongPageProvider';
import { Button } from '@/components/ui/button';
import Loader from '@/components/Loader';
import useMint from '@/hooks/zora/useMint';
import useMintFee from '@/hooks/zora/useMintFee';

const CollectButton = () => {
  const { collection } = useSongPageProvider();

  const { mint, loading: minting } = useMint(collection);
  const { loading: feeLoading } = useMintFee(collection);

  const isLoading = feeLoading || minting;

  return (
    <>
      <Button onClick={mint} disabled={isLoading} className="bg-green !w-[186px] !rounded-full">
        {isLoading ? <Loader /> : <div>Mint 111 ✧</div>}
      </Button>
      <p className="font-clashdisplay text-white">
        <span className="font-clashdisplay_medium">500/1000</span> Collected
      </p>
    </>
  );
};

export default CollectButton;
