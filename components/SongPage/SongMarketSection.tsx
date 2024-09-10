import { ShareIcon } from 'lucide-react';
import { Button } from '../ui/button';
import TotalNotes from './TotalNotes';
import { Progress } from '../ui/progress';
import CollectButton from './CollectButton';
import { MINIMUM_NOTES_FOR_SONG_MARKET } from '@/lib/consts';
import useCopyToClipboard from '@/hooks/useCopyToClipboard';
import { useSongPageProvider } from '@/providers/SongPageProvider';
import { usePrivy } from '@privy-io/react-auth';
import ConnectButton from '../ConnectButton';

const SongMarketSection = () => {
  const { totalNotes, collection } = useSongPageProvider();
  const { authenticated } = usePrivy();
  const { copy } = useCopyToClipboard();
  const handleShare = () => copy(window.location.href);
  const progressPercentage = totalNotes ? (totalNotes / MINIMUM_NOTES_FOR_SONG_MARKET) * 100 : 0;
  const formattedPercentage = progressPercentage.toFixed(2);
  const tokenCreated = Boolean(collection && collection.zora);

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
      ) : !authenticated ? (
        <ConnectButton />
      ) : (
        <CollectButton />
      )}
    </div>
  );
};

export default SongMarketSection;
