import { useSongPageProvider } from '@/providers/SongPageProvider';
import ConnectButton from '@/components/ConnectButton';
import SellButton from '@/components/SellButton';
import CollectButton from '@/components/CollectButton';
import useSale from '@/hooks/zora/useSale';
import useBalance from '@/hooks/zora/useBalance';
import useWalletClient from '@/hooks/useWalletClient';
import TipSong from './TipSong';

const SongMarketSection = () => {
  const { collection } = useSongPageProvider();
  const { address } = useWalletClient();
  const tokenCreated = Boolean(collection && collection.zora);

  const { saleData } = useSale(collection);
  const { balance } = useBalance(collection);
  const saleEnabled = saleData?.secondaryActivated && balance;

  return (
    <div className="flex flex-col gap-2 items-center w-full px-6">
      <div className="flex items-center justify-between w-full">{!tokenCreated && <TipSong />}</div>
      {tokenCreated &&
        (!address ? (
          <ConnectButton />
        ) : (
          <div className="flex flex-col gap-2">
            <CollectButton collection={collection} />
            {saleEnabled && <SellButton collection={collection} />}
          </div>
        ))}
    </div>
  );
};

export default SongMarketSection;
