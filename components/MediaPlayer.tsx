import { cn, formatDuration } from '@/lib/utils';
import { usePlayer } from '@/providers/PlayerProvider';
import { TrackMetadata } from '@/types/Track';
import Image from 'next/image';
import { MdPauseCircle, MdPlayCircle } from 'react-icons/md';
import { Skeleton } from '@/components/ui/skeleton';
import ReactSlider from 'react-slider';

type MediaPlayerProps = {
  metadata?: TrackMetadata;
};

export default function MediaPlayer({ metadata }: MediaPlayerProps) {
  const [player, dispatch] = usePlayer();

  const currentTrack = player?.metadata?.id === metadata?.id;
  const displayPosition = currentTrack ? player.position : 0;
  const displayDuration = player?.duration || 0;

  const handlePlay = () => {
    if (!metadata) return;
    dispatch({
      type: 'PLAY',
      payload: { metadata },
    });
  };

  const handlePause = () => {
    dispatch({ type: 'PAUSE' });
  };

  const handleSeek = (value: number) => {
    dispatch({ type: 'SEEK', payload: { position: value } });
  };

  return (
    <div
      data-type={metadata?.type}
      className={cn(
        'flex w-full flex-col gap-4 rounded-lg border bg-white p-2',
        currentTrack && player.loading && 'animate-pulse',
      )}
    >
      <div className="flex gap-4">
        <div className="relative my-auto aspect-square w-16 shrink-0 overflow-hidden rounded-lg shadow-md">
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

        <div className="flex grow flex-col gap-1 pt-2 text-left">
          <div className="line-clamp-2 font-inter text-sm font-bold">
            {metadata?.trackName ? (
              <>{metadata.trackName}</>
            ) : (
              <Skeleton className="h-2 w-32 rounded-sm" />
            )}
          </div>
          <div className="line-clamp-2 font-inter text-xs font-extralight">
            {metadata?.artistName ? (
              <>{metadata.artistName}</>
            ) : (
              <Skeleton className="h-2 w-12 rounded-sm" />
            )}
          </div>
        </div>
        <div className="my-auto">
          {currentTrack && player.playing ? (
            <button onClick={handlePause}>
              <MdPauseCircle className="text-4xl" />
            </button>
          ) : (
            <button onClick={handlePlay}>
              <MdPlayCircle className="text-4xl" />
            </button>
          )}
        </div>
      </div>
      {currentTrack && !player.loading && (
        <div className="flex flex-col gap-1">
          <div className="flex justify-between font-inter text-xs font-light">
            <span>{formatDuration(displayPosition)}</span>
            <span>{formatDuration(displayDuration)}</span>
          </div>
          <ReactSlider
            className="scrub h-1 w-full bg-gray-300"
            thumbClassName={`${metadata?.type === 'spotify' ? '' : 'scrub-thumb'}`}
            trackClassName="scrub-track"
            value={
              displayPosition && displayDuration ? (displayPosition / displayDuration) * 100 : 0
            }
            disabled={metadata?.type === 'spotify'}
            onChange={(value) => handleSeek((value / 100) * displayDuration)}
          />
        </div>
      )}
    </div>
  );
}
