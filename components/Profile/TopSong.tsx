import { useProfileProvider } from '@/providers/ProfileProvider';
import { Skeleton } from '../ui/skeleton';
import Image from 'next/image';

const TopSong = () => {
  const { topSongMetadata } = useProfileProvider();

  return (
    <div className="flex w-fit flex-col justify-center">
      <div className="flex items-center gap-1">
        <div className="relative my-auto aspect-square w-[24px] shrink-0 overflow-hidden rounded-sm">
          {topSongMetadata?.artworkUrl ? (
            <Image
              src={topSongMetadata.artworkUrl}
              alt=""
              fill
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              unoptimized
            />
          ) : (
            <Skeleton className="size-full" />
          )}
        </div>
        <div className="line-clamp-2 text-sm font-clashdisplay leading-none text-white">
          {topSongMetadata?.trackName ? (
            <p className="truncate max-w-16">{topSongMetadata.trackName}</p>
          ) : (
            <Skeleton className="h-2 w-16 rounded-sm" />
          )}
        </div>
      </div>
      <p className="text-sm text-grey font-sora">Top Song</p>
    </div>
  );
};

export default TopSong;
