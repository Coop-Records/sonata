import useCopyToClipboard from '@/hooks/useCopyToClipboard';
import { useSongPageProvider } from '@/providers/SongPageProvider';
import { Separator } from '@radix-ui/react-separator';
import { ShareIcon } from 'lucide-react';
import MediaPlayer from '../MediaPlayer';
import { Button } from '../ui/button';
import SongAlternatives from './Alternatives';
import SongPostsFeed from './SongPostsFeed';
import TotalNotes from './TotalNotes';
import { Progress } from '../ui/progress';
import { MINIMUM_NOTES_FOR_SONG_MARKET } from '@/lib/consts';

export default function SongPage() {
  const { metadata, totalNotes, collection } = useSongPageProvider();
  const { copy } = useCopyToClipboard();
  const handleShare = () => copy(window.location.href);
  console.log('SWEETS collection', collection);
  const progressPercentage = totalNotes ? (totalNotes / MINIMUM_NOTES_FOR_SONG_MARKET) * 100 : 0;
  const formattedPercentage = progressPercentage.toFixed(2);

  return (
    <main className="flex grow items-center justify-center">
      <div className="w-full space-y-4">
        <MediaPlayer metadata={metadata} />
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TotalNotes />
              <span className="text-sm text-muted-foreground">({formattedPercentage}%)</span>
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
          {collection?.zora ? (
            <Button onClick={() => window.open(collection?.zora, '_blank')}>Buy on Zora</Button>
          ) : (
            <Progress value={progressPercentage} className="w-full" />
          )}
        </div>
        <Separator className="h-px bg-muted" />
        <SongAlternatives />
        <SongPostsFeed />
      </div>
    </main>
  );
}
