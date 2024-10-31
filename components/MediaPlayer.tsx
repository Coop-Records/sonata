import { cn } from '@/lib/utils';
import { usePlayer } from '@/providers/audio/PlayerProvider';
import { TrackMetadata } from '@/types/Track';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { FaPause, FaPlay } from 'react-icons/fa';

type MediaPlayerProps = {
  metadata?: TrackMetadata;
};

export default function MediaPlayer({ metadata }: MediaPlayerProps) {
  const [player, dispatch] = usePlayer();
  const currentTrack = player?.metadata?.feedId === metadata?.feedId;

  const handlePlay = () => {
    if (!metadata) return;

    if (currentTrack) {
      dispatch({ type: 'RESUME', payload: { id: metadata.id } });
      return;
    }
    dispatch({
      type: 'PLAY',
      payload: { metadata, feedId: metadata.feedId },
    });
  };

  const handlePause = () => {
    if (!metadata) return;
    dispatch({ type: 'PAUSE', payload: { id: metadata.id } });
  };

  return (
    <div
      data-type={metadata?.type}
      className={cn(
        'flex w-full gap-4 py-2 items-center',
        currentTrack && player.loading && 'animate-pulse',
      )}
    >
      <div className="relative my-auto aspect-square w-14 shrink-0 overflow-hidden rounded-lg shadow-md">
        {metadata?.artworkUrl ? (
          <Image
            src={metadata.artworkUrl}
            alt=""
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            unoptimized
          />
        ) : (
          <Skeleton className="size-full" />
        )}
      </div>

      <div className="flex grow flex-col gap-1 text-left">
        <div className="line-clamp-2 text-lg font-semibold leading-none">
          {metadata?.trackName ? (
            <>{metadata.trackName}</>
          ) : (
            <Skeleton className="h-2 w-32 rounded-sm" />
          )}
        </div>
        <div className="line-clamp-2 text-sm font-extralight text-muted-foreground">
          {metadata?.artistName ? (
            <>{metadata.artistName}</>
          ) : (
            <Skeleton className="h-2 w-12 rounded-sm" />
          )}
        </div>
      </div>
      <div className="my-auto">
        <button
          className="rounded-full bg-secondary p-2"
          onClick={currentTrack && player.playing ? handlePause : handlePlay}
          title={player.playing ? 'Pause' : 'Play'}
        >
          {currentTrack && player.playing ? (
            <FaPause className="size-3" />
          ) : (
            <FaPlay className="size-3" />
          )}
        </button>
      </div>
    </div>
  );
}
