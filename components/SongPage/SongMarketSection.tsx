import { Progress } from '../ui/progress';
import CollectButton from './CollectButton';
import { MINIMUM_NOTES_FOR_SONG_MARKET } from '@/lib/consts';
import { useSongPageProvider } from '@/providers/SongPageProvider';
import { usePrivy } from '@privy-io/react-auth';
import ConnectButton from '../ConnectButton';
import { Skeleton } from '../ui/skeleton';
import Image from 'next/image';
import { formatBigInt } from '@/lib/utils';
import Tooltip from '../ui/tooltip';

const SongMarketSection = () => {
  const { totalNotes, collection } = useSongPageProvider();
  const { authenticated } = usePrivy();
  const progressPercentage = totalNotes ? (totalNotes / MINIMUM_NOTES_FOR_SONG_MARKET) * 100 : 0;
  const tokenCreated = Boolean(collection && collection.zora);

  return (
    <div className="flex flex-col gap-2 items-center w-full px-6">
      <p className="py-2 font-clashdisplay_medium text-white text-sm">Markets Open at 1M NOTES</p>
      <div className="flex items-center justify-between w-full">
        {totalNotes == undefined ? (
          <Skeleton className="h-10 w-20 rounded-full" />
        ) : (
          <div className="w-full">
            <section className="w-full relative">
              <div className="flex justify-between pt-2 text-grey font-clashdisplay_medium text-sm">
                <p>0</p>
                <p>1M</p>
              </div>
              <Tooltip
                id="percentage"
                content={() => (
                  <div className="flex items-center gap-1 rounded-full bg-blue px-3 py-1">
                    <span className="text-xs">
                      {totalNotes ? formatBigInt(BigInt(totalNotes)) : '-'}
                    </span>
                    <Image src="/images/notes.png" width={10} height={10} alt="notes" />
                  </div>
                )}
                tipClasses="!bg-blue !rounded-full !p-0"
              >
                <Progress value={totalNotes / 10000} className="w-full" />
              </Tooltip>
            </section>
          </div>
        )}
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
