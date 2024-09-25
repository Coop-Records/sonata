import { Button } from '@/components/ui/button';
import Loader from '@/components/Loader';
import useMint from '@/hooks/zora/useMint';
import { useSongPageProvider } from '@/providers/SongPageProvider';

const CollectButton = () => {
  const { collection } = useSongPageProvider();

  const { mint, loading } = useMint(collection);

  return (
    <>
      <Button
        onClick={() => mint()}
        disabled={loading}
        className="!w-[186px] !rounded-full bg-green"
      >
        {loading ? <Loader /> : <div>Mint 111 ✧</div>}
      </Button>
      <p className="text-center font-clashdisplay text-white">
        <span className="font-clashdisplay_medium">500/1000</span> Collected
      </p>
    </>
  );
};

export default CollectButton;
