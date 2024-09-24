import { useSongPageProvider } from '@/providers/SongPageProvider';
import ConnectButton from '@/components/ConnectButton';
import SecondaryButton from './SecondaryButton';
import CollectButton from './CollectButton';
import useWalletClient from '@/hooks/useWalletClient';
import TipSong from '../TipSong';
import useMint from '@/hooks/zora/useMint';
import useSecondary from '@/hooks/zora/useSecondary';

const SongMarketSection = () => {
  const { collection } = useSongPageProvider();
  const { address } = useWalletClient();
  const tokenCreated = Boolean(collection?.zora);

  const { enabled: mintEnabled } = useMint(collection);
  const { enabled: buyEnabled } = useSecondary('buy', collection);
  const { enabled: sellEnabled } = useSecondary('sell', collection);

  return (
    <div className="flex w-full flex-col items-center gap-2 px-6">
      <div className="flex w-full items-center justify-between">{!tokenCreated && <TipSong />}</div>
      {tokenCreated &&
        (!address ? (
          <ConnectButton />
        ) : (
          <div className="flex flex-col gap-2">
            {mintEnabled && <CollectButton />}
            {buyEnabled && <SecondaryButton mode="buy" />}
            {sellEnabled && <SecondaryButton mode="sell" />}
          </div>
        ))}
    </div>
  );
};

export default SongMarketSection;
