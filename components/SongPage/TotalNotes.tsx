import { formatBigInt } from '@/lib/utils';
import { useSongPageProvider } from '@/providers/SongPageProvider';
import { Skeleton } from '@/components/ui/skeleton';
import NotesIcon from '@/components/NotesIcon';

export default function TotalNotes() {
  const { totalNotes } = useSongPageProvider();
  return (
    <div className="flex items-center gap-1">
      {totalNotes ? (
        <span className="font-clashDisplay text-xl font-semibold">
          {formatBigInt(BigInt(totalNotes))}
        </span>
      ) : (
        <Skeleton className="h-10 w-20 rounded-sm" />
      )}
      <NotesIcon size={16} />
    </div>
  );
}
