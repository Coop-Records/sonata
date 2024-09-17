import { Button } from '@/components/ui/button';
import Loader from '@/components/Loader';
import useMint from '@/hooks/zora/useMint';
import useMintFee from '@/hooks/zora/useMintFee';
import { CollectionObject } from '@/lib/sonata/song/createCollectionObject';

const CollectButton = ({ collection }: { collection?: CollectionObject }) => {
  const { mint, loading: minting } = useMint(collection);
  const { loading: feeLoading } = useMintFee(collection);

  const isLoading = feeLoading || minting;

  return (
    <>
      <Button onClick={mint} disabled={isLoading} className="bg-green !w-[186px] !rounded-full">
        {isLoading ? <Loader /> : <div>Mint 111 ✧</div>}
      </Button>
      <p className="font-clashdisplay text-white text-center">
        <span className="font-clashdisplay_medium">500/1000</span> Collected
      </p>
    </>
  );
};

export default CollectButton;
