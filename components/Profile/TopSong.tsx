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
        <div className="line-clamp-2 text-[14px] font-semibold leading-none">
          {topSongMetadata?.trackName ? (
            <>{topSongMetadata.trackName}</>
          ) : (
            <Skeleton className="h-2 w-32 rounded-sm" />
          )}
        </div>
      </div>
      <p className="text-[14px] text-grey">Top Song</p>
    </div>
  );
};

export default TopSong;
