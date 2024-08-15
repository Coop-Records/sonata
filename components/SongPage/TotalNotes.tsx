import { formatBigInt } from '@/lib/utils';
import { useSongPageProvider } from '@/providers/SongPageProvider';
import Image from 'next/image';
import { Skeleton } from '../ui/skeleton';

export default function TotalNotes() {
  const { totalNotes } = useSongPageProvider();
  return (
    <>
      {totalNotes == undefined ? <Skeleton className='h-10 w-20 rounded-full' /> : (
        <div className="flex items-center gap-1 rounded-full bg-grey-light px-4 py-2 font-semibold">
          <span>{totalNotes ? formatBigInt(BigInt(totalNotes)) : '-'}</span>
          <Image src='/images/notes.png' width={20} height={20} alt="notes" />
        </div>
      )}
    </>
  );
}