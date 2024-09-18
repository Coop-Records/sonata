import Image from 'next/image';
import { formatBigInt } from '@/lib/utils';
import Tooltip from '../ui/tooltip';
import { Progress } from '../ui/progress';
import { useSongPageProvider } from '@/providers/SongPageProvider';
import { Skeleton } from '../ui/skeleton';

const TipSong = () => {
  const { totalNotes } = useSongPageProvider();
  return (
    <div className="w-full">
      {typeof totalNotes === 'undefined' ? (
        <Skeleton className="h-4 w-full rounded-full" />
      ) : (
        <div className="w-full pb-6 flex flex-col items-center">
          <p className="pt-2 pb-6 font-inter text-white text-sm text-center">
            Markets Open at 1M NOTES
          </p>
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
          <button
            type="button"
            className="bg-blue text-white font-sora text-sm w-[180px] h-[40px] flex items-center justify-center rounded-full mt-6"
          >
            Tip Song
          </button>
          <p className="font-inter text-xs text-white text-center pt-4">
            You have 25K/32K NOTES left
          </p>
        </div>
      )}
    </div>
  );
};

export default TipSong;
