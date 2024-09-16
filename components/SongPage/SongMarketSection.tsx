import { ShareIcon } from 'lucide-react';
import { Button } from '../ui/button';
import TotalNotes from './TotalNotes';
import { Progress } from '../ui/progress';
import { MINIMUM_NOTES_FOR_SONG_MARKET } from '@/lib/consts';
import useCopyToClipboard from '@/hooks/useCopyToClipboard';
import { useSongPageProvider } from '@/providers/SongPageProvider';
import ConnectButton from '@/components/ConnectButton';
import SellButton from '@/components/SellButton';
import CollectButton from '@/components/CollectButton';
import useSale from '@/hooks/zora/useSale';
import useBalance from '@/hooks/zora/useBalance';
import useWalletClient from '@/hooks/useWalletClient';

const SongMarketSection = () => {
  const { totalNotes, collection } = useSongPageProvider();
  const { address } = useWalletClient();
  const { copy } = useCopyToClipboard();
  const handleShare = () => copy(window.location.href);
  const progressPercentage = totalNotes ? (totalNotes / MINIMUM_NOTES_FOR_SONG_MARKET) * 100 : 0;
  const formattedPercentage = progressPercentage.toFixed(2);
  const tokenCreated = Boolean(collection && collection.zora);

  const { saleData } = useSale(collection);
  const { balance } = useBalance(collection);
  const saleEnabled = saleData?.secondaryActivated && balance;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TotalNotes />
          {!tokenCreated && (
            <span className="text-sm text-muted-foreground">({formattedPercentage}%)</span>
          )}
        </div>
        <Button
          className="h-auto w-9 p-0 text-muted-foreground outline-none hover:bg-transparent"
          onClick={handleShare}
          variant="ghost"
          title="share"
        >
          <ShareIcon />
        </Button>
      </div>
      {!tokenCreated ? (
        <Progress value={progressPercentage > 100 ? 100 : progressPercentage} className="w-full" />
      ) : !address ? (
        <ConnectButton />
      ) : (
        <div className="flex flex-col gap-2">
          <CollectButton collection={collection} />
          {saleEnabled && <SellButton collection={collection} />}
        </div>
      )}
    </div>
  );
};

export default SongMarketSection;
