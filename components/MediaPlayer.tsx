import { cn, formatDuration } from '@/lib/utils';
import { usePlayer } from '@/providers/PlayerProvider';
import { TrackMetadata } from '@/types/Track';
import Image from 'next/image';
import { MdPauseCircle, MdPlayCircle } from 'react-icons/md';
import { Skeleton } from '@/components/ui/skeleton';
import ReactSlider from 'react-slider';
import { Button } from '@/components/ui/button';

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
    if (currentTrack) {
      dispatch({ type: 'RESUME', payload: { id: metadata.id } });
      return;
    }
    console.log('SWEETS METADATA EXAMPLE', metadata);
    dispatch({
      type: 'PLAY',
      payload: { metadata },
    });
  };

  const handlePause = () => {
    if (!metadata) return;
    dispatch({ type: 'PAUSE', payload: { id: metadata.id } });
  };

  const handleSeek = (value: number) => {
    dispatch({ type: 'SEEK', payload: { position: value } });
  };

  return (
    <div
      data-type={metadata?.type}
      className={cn(
        'flex w-full gap-4 bg-white py-2',
        currentTrack && player.loading && 'animate-pulse',
      )}
    >
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

      <div className="flex grow flex-col gap-1 text-left">
        <div className="line-clamp-2 text-lg font-semibold leading-none">
          {metadata?.trackName ? (
            <>{metadata.trackName}</>
          ) : (
            <Skeleton className="h-2 w-32 rounded-sm" />
          )}
        </div>
        <div className="line-clamp-2 text-sm font-extralight">
          {metadata?.artistName ? (
            <>{metadata.artistName}</>
          ) : (
            <Skeleton className="h-2 w-12 rounded-sm" />
          )}
        </div>
        {currentTrack && !player.loading && (
          <div className="mt-auto flex items-center gap-2 text-xs font-light">
            <span>{formatDuration(displayPosition)}</span>
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
            <span>{formatDuration(displayDuration)}</span>
          </div>
        )}
      </div>
      <div className="my-auto">
        <Button
          onClick={currentTrack && player.playing ? handlePause : handlePlay}
          variant="ghost"
          className="rounded-full p-0"
        >
          {currentTrack && player.playing ? (
            <MdPauseCircle className="text-4xl" />
          ) : (
            <MdPlayCircle className="text-4xl" />
          )}
        </Button>
      </div>
    </div>
  );
}
